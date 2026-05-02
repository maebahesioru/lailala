import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertube, getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { YTNodes } from "youtubei.js";

const postSchema = z.object({
  videoId: z.string(),
  text: z.string().min(1).max(5000),
  timestamp: z.string().optional(),
});

function isOlderThanOneYear(publishedTime: string): boolean {
  if (!publishedTime) return false;
  return /(\d+)\s*(年|year)/.test(publishedTime);
}

function parsePublishedTime(text: string): Date | null {
  if (!text || text.trim() === "") return null;
  const now = new Date();
  const match = text.match(/(\d+)\s*(年|ヶ月|週間|日|時間|分|秒|year|month|week|day|hour|minute|second)s?\s*(前|ago)?/);
  if (!match) return now;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const d = new Date(now);
  switch (unit) {
    case "year": case "年": d.setFullYear(d.getFullYear() - num); break;
    case "month": case "ヶ月": d.setMonth(d.getMonth() - num); break;
    case "week": case "週間": d.setDate(d.getDate() - num * 7); break;
    case "day": case "日": d.setDate(d.getDate() - num); break;
    case "hour": case "時間": d.setHours(d.getHours() - num); break;
    case "minute": case "分": d.setMinutes(d.getMinutes() - num); break;
    case "second": case "秒": d.setSeconds(d.getSeconds() - num); break;
  }
  return d;
}

function parseCommentThread(thread: any) {
  const c = thread.comment;
  if (!c) return null;
  return {
    comment: {
      commentId: c.comment_id,
      author: {
        name: typeof c.author?.name === "string" ? c.author.name : (c.author?.name?.text || "Unknown"),
        channelId: c.author?.id,
        thumbnail: c.author?.thumbnails?.[0]?.url,
        isChannelOwner: c.author_is_channel_owner || false,
        isMember: c.is_member || false,
      },
      content: c.content?.text || "",
      publishedTime: c.published_time || "",
      likeCount: c.like_count || "0",
      replyCount: c.reply_count || "0",
      isLiked: c.is_liked || false,
      isDisliked: c.is_disliked || false,
      isPinned: c.is_pinned || false,
      isHearted: c.is_hearted || false,
    },
    replies: thread.replies?.map((r: any) => ({
      commentId: r.comment_id,
      author: {
        name: typeof r.author?.name === "string" ? r.author.name : (r.author?.name?.text || "Unknown"),
        channelId: r.author?.id,
        thumbnail: r.author?.thumbnails?.[0]?.url,
        isChannelOwner: r.author_is_channel_owner || false,
        isMember: r.is_member || false,
      },
      content: r.content?.text || "",
      publishedTime: r.published_time || "",
      likeCount: r.like_count || "0",
      replyCount: r.reply_count || "0",
      isLiked: r.is_liked || false,
      isDisliked: r.is_disliked || false,
      isPinned: r.is_pinned || false,
      isHearted: r.is_hearted || false,
    })) || [],
    hasRepliesContinuation: thread.comment_replies_data != null,
  };
}

// POST: コメント投稿
export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await rateLimit(`comment:${userId}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = postSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { videoId, text, timestamp } = parsed.data;

  try {
    const innertube = await getInnertubeWithAuth(userId);
    const response = await innertube.interact.comment(videoId, text);

    await prisma.userAction.create({
      data: {
        userId,
        videoId,
        commentId: "pending",
        actionType: "comment",
        content: text,
        timestamp,
      },
    });

    return NextResponse.json({ success: true, data: response });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : e.message || "Failed to post comment";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}

async function getBlockedAndMutedChannelIds(userId: string | null): Promise<Set<string>> {
  if (!userId) return new Set();
  const [blocked, muted] = await Promise.all([
    prisma.blockedUser.findMany({ where: { userId }, select: { channelId: true } }),
    prisma.mutedUser.findMany({ where: { userId }, select: { channelId: true } }),
  ]);
  return new Set([...blocked.map((b) => b.channelId), ...muted.map((m) => m.channelId)]);
}

function filterBlockedThreads(threads: any[], blockedIds: Set<string>) {
  if (blockedIds.size === 0) return threads;
  return threads.filter((t) => {
    const authorId = t.comment?.author?.channelId;
    return authorId && !blockedIds.has(authorId);
  });
}

// GET: コメント取得 (サーバーサイドプロキシ)
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const sortBy = (searchParams.get("sortBy") as "TOP_COMMENTS" | "NEWEST_FIRST") || "TOP_COMMENTS";
  const continuationToken = searchParams.get("continuationToken");

  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    const userId = await getSessionUserId();
    const blockedIds = await getBlockedAndMutedChannelIds(userId);

    const innertube = await getInnertube();

    let threads: any[] = [];
    let hasContinuation = false;
    let nextToken: string | null = null;

    let commentCount: string | null = null;

    if (continuationToken) {
      // Use NavigationEndpoint to fetch next batch via continuation token
      const cmd = new YTNodes.NavigationEndpoint({
        continuationCommand: {
          request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
          token: continuationToken,
        },
      });

      const response = await cmd.call(innertube.actions, { parse: true });

      if (!response.on_response_received_endpoints_memo) {
        return NextResponse.json({ error: "Unexpected response" }, { status: 500 });
      }

      const commentThreads = response.on_response_received_endpoints_memo.getType(YTNodes.CommentThread);
      threads = commentThreads.map(parseCommentThread).filter(Boolean).filter((t: any) => !isOlderThanOneYear(t.comment.publishedTime));

      const cont = response.on_response_received_endpoints_memo.getType(YTNodes.ContinuationItem)?.[0];
      if (cont) {
        const payload = (cont as any).endpoint?.payload;
        nextToken = payload?.continuationCommand?.token || payload?.token || null;
        hasContinuation = !!nextToken;
      }
    } else {
      const comments = await innertube.getComments(videoId, sortBy);

      threads = comments.contents
        .filter((thread: any) => thread.comment != null && !thread.comment.is_pinned)
        .map(parseCommentThread)
        .filter(Boolean)
        .filter((t: any) => !isOlderThanOneYear(t.comment.publishedTime));

      hasContinuation = comments.has_continuation;
      nextToken = (comments as any).continuation_token || null;

      // Extract comment count from header
      commentCount = (comments as any).header?.comments_count?.text || (comments as any).header?.comments_count?.toString?.() || null;
    }

    threads = filterBlockedThreads(threads, blockedIds);

    // Merge timestamps from DB for display
    const commentIds = threads.map((t: any) => t.comment?.commentId).filter(Boolean);
    if (commentIds.length > 0) {
      const cached = await prisma.commentCache.findMany({
        where: { commentId: { in: commentIds } },
        select: { commentId: true, timestamp: true },
      });
      const tsMap = new Map(cached.map((c) => [c.commentId, c.timestamp]));
      for (const t of threads) {
        if (t.comment?.commentId && tsMap.has(t.comment.commentId)) {
          t.comment.timestamp = tsMap.get(t.comment.commentId) || undefined;
        }
      }
    }

    // Fire-and-forget: cache fetched comments to DB
    Promise.resolve().then(async () => {
      for (const t of threads) {
        const c = t.comment;
        if (!c?.commentId) continue;
        try {
          const publishedAt = parsePublishedTime(c.publishedTime) || new Date();
          await prisma.commentCache.upsert({
            where: { commentId: c.commentId },
            update: {
              content: c.content || "",
              likeCount: parseInt(String(c.likeCount).replace(/[^0-9]/g, ""), 10) || 0,
              replyCount: parseInt(String(c.replyCount).replace(/[^0-9]/g, ""), 10) || 0,
              authorName: c.author?.name || "Unknown",
              authorChannelId: c.author?.channelId || null,
              authorThumb: c.author?.thumbnail || null,
              publishedAt,
            },
            create: {
              commentId: c.commentId,
              videoId,
              content: c.content || "",
              likeCount: parseInt(String(c.likeCount).replace(/[^0-9]/g, ""), 10) || 0,
              replyCount: parseInt(String(c.replyCount).replace(/[^0-9]/g, ""), 10) || 0,
              authorName: c.author?.name || "Unknown",
              authorChannelId: c.author?.channelId || null,
              authorThumb: c.author?.thumbnail || null,
              publishedAt,
            },
          });
        } catch (e) { console.error(e); }
      }
    }).catch((e) => { console.error(e); });

    return NextResponse.json({
      threads,
      hasContinuation,
      continuationToken: nextToken,
      videoInfo: {
        commentCount: commentCount || "0",
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch comments" }, { status: 500 });
  }
}
