import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertube, getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";
import { YT, YTNodes } from "youtubei.js";
import { unwrapReplies } from "@/lib/youtube-comment-shape";
import { parseCount } from "@/lib/parse-count";
import { getFeedPoll } from "@/lib/feed-poll-cache";

const postSchema = z.object({
  videoId: z.string(),
  text: z.string().min(1).max(5000),
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
    replies: unwrapReplies(thread.replies).map((r: any) => ({
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

  const { videoId, text } = parsed.data;

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
  // 並び順は列挙値のみ受け付ける。以前は未知の値をそのまま youtubei.js へ
  // 渡しており、"invalid int32: undefined" という 500 がそのまま画面に出ていた。
  const sortByRaw = searchParams.get("sortBy");
  if (sortByRaw && sortByRaw !== "TOP_COMMENTS" && sortByRaw !== "NEWEST_FIRST") {
    return NextResponse.json(
      { error: "sortBy には TOP_COMMENTS か NEWEST_FIRST を指定してください。" },
      { status: 400 }
    );
  }
  const sortBy = (sortByRaw as "TOP_COMMENTS" | "NEWEST_FIRST") || "TOP_COMMENTS";
  const continuationToken = searchParams.get("continuationToken");
  // 1年フィルタは既定でオフ。以前は既定で掛けていたため、上位100件のうち
  // 65% が理由も表示されずに消えていた。filter=year を明示した時だけ絞る。
  const filterYear = searchParams.get("filter") === "year";

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
    let servedFromPollCache = false;

    if (continuationToken) {
      // Use NavigationEndpoint to fetch next batch via continuation token
      const cmd = new YTNodes.NavigationEndpoint({
        continuationCommand: {
          request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
          token: continuationToken,
        },
      });

      // 失効した・壊れたトークンを渡されると上流は空のレスポンスを返す
      // （以前は 500 + "Unexpected response" をそのまま画面に出していた）。
      // クライアント側で再読み込みすれば直る種類の失敗なので 400 にする。
      let response: any = null;
      try {
        response = await cmd.call(innertube.actions, { parse: true });
      } catch (e) {
        console.error("[comments] continuation failed:", e);
      }

      if (!response?.on_response_received_endpoints?.length) {
        return NextResponse.json(
          { error: "続きのコメントを読み込めませんでした。ページを再読み込みしてください。" },
          { status: 400 }
        );
      }

      // 18.x の Comments は「ヘッダ + 本文」の2要素を前提に組み立てられている。
      // 続きのレスポンスは本文1要素だけなので同じ形に詰め替えて渡す。
      // こうすると本文側の ContinuationItem（＝一覧の次ページ）を
      // 各スレッド内の返信トークンと取り違えずに済む。
      const page = new YT.Comments(
        innertube.actions,
        { on_response_received_endpoints: [undefined, response.on_response_received_endpoints[0]] },
        true
      );

      threads = page.contents
        .filter((thread: any) => thread.comment != null && !thread.comment.is_pinned)
        .map(parseCommentThread)
        .filter(Boolean)
        .filter((t: any) => !filterYear || !isOlderThanOneYear(t.comment.publishedTime));

      nextToken = page.continuation_token;
      hasContinuation = page.has_continuation && !!nextToken;
    } else {
      // 初回ページの取得。新着チェックのポーリングからは 60 秒共有キャッシュ越しに呼ばれる。
      const loadFirstPage = async () => {
        const comments = await innertube.getComments(videoId, sortBy);

        const pageThreads = comments.contents
          .filter((thread: any) => thread.comment != null && !thread.comment.is_pinned)
          .map(parseCommentThread)
          .filter(Boolean)
          .filter((t: any) => !filterYear || !isOlderThanOneYear(t.comment.publishedTime));

        const token = comments.continuation_token;
        const hasMore = comments.has_continuation && !!token;
        let count: string | null = null;

        // Extract comment count from header - try multiple sources for the most accurate number
        const headerCount = (comments as any).header?.comments_count;
        if (headerCount) {
          // Try to get full text from runs first (may contain exact number)
          const runsText = headerCount.runs?.map((r: any) => r.text).join("");
          count = runsText || headerCount.text || headerCount.toString?.() || null;
        }
        // If still null, try video info fallback
        if (!count) {
          try {
            const info = await innertube.getInfo(videoId);
            count = info.comments_entry_point_header?.comment_count?.toString?.()
              || (info.basic_info as any).comment_count?.toString?.()
              || null;
          } catch {
            // ignore fallback error
          }
        }

        return { threads: pageThreads, nextToken: token, hasContinuation: hasMore, commentCount: count };
      };

      // 新着チェック（poll=1）だけは 60 秒の共有キャッシュを通す。
      // キャッシュが無いと、開いているタブ数だけ YouTube 取得が毎分走っていた。
      const isPoll = searchParams.get("poll") === "1";
      const firstPage = isPoll
        ? (await getFeedPoll(`comments:${videoId}:${sortBy}:${filterYear ? "y" : "a"}`, loadFirstPage)).value
        : await loadFirstPage();

      threads = firstPage.threads;
      nextToken = firstPage.nextToken;
      hasContinuation = firstPage.hasContinuation;
      commentCount = firstPage.commentCount;
      servedFromPollCache = isPoll;
    }

    threads = filterBlockedThreads(threads, blockedIds);

    // Fire-and-forget: cache fetched comments to DB
    // （ポーリングのキャッシュヒット時は同じ行を書き直すだけなので省く）
    if (!servedFromPollCache) Promise.resolve().then(async () => {
      for (const t of threads) {
        const c = t.comment;
        if (!c?.commentId) continue;
        try {
          const publishedAt = parsePublishedTime(c.publishedTime) || new Date();
          await prisma.commentCache.upsert({
            where: { commentId: c.commentId },
            update: {
              content: c.content || "",
              likeCount: parseCount(c.likeCount),
              replyCount: parseCount(c.replyCount),
              authorName: c.author?.name || "Unknown",
              authorChannelId: c.author?.channelId || null,
              authorThumb: c.author?.thumbnail || null,
              publishedAt,
            },
            create: {
              commentId: c.commentId,
              videoId,
              content: c.content || "",
              likeCount: parseCount(c.likeCount),
              replyCount: parseCount(c.replyCount),
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
    // 上流(youtubei)の生メッセージをそのまま出すと
    // "Comments page did not have any content." 等が UI に漏れるため言い換える。
    const raw = e?.message || "";
    if (/unavailable|did not have any content|private|removed/i.test(raw)) {
      return NextResponse.json(
        { error: "この動画のコメントは取得できませんでした（非公開・削除・コメント無効の可能性があります）" },
        { status: 404 }
      );
    }
    if (/Unexpected response/i.test(raw)) {
      return NextResponse.json(
        { error: "続きを読み込めませんでした。ページを再読み込みしてください。" },
        { status: 400 }
      );
    }
    // 上流の生メッセージをそのまま返すと "invalid int32: undefined" のような
    // 内部文言が画面に出るため、ログに残してから定型文に置き換える。
    console.error("[comments] fetch failed:", e);
    return NextResponse.json(
      { error: "コメントの取得に失敗しました。時間をおいて再試行してください。" },
      { status: 502 }
    );
  }
}
