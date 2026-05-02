import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";

function parsePublishedTime(text: string): Date | null {
  if (!text) return null;
  const now = new Date();
  const match = text.match(/(\d+)\s*(year|month|week|day|hour|minute|second)s?\s*ago/);
  if (!match) return now;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const d = new Date(now);
  switch (unit) {
    case "year": d.setFullYear(d.getFullYear() - num); break;
    case "month": d.setMonth(d.getMonth() - num); break;
    case "week": d.setDate(d.getDate() - num * 7); break;
    case "day": d.setDate(d.getDate() - num); break;
    case "hour": d.setHours(d.getHours() - num); break;
    case "minute": d.setMinutes(d.getMinutes() - num); break;
    case "second": d.setSeconds(d.getSeconds() - num); break;
  }
  return d;
}

export async function POST(req: NextRequest) {
  const { videoId, max = 500 } = await req.json();
  if (!videoId) return NextResponse.json({ error: "videoId required" }, { status: 400 });
  return runCache(videoId, max);
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId") || "niKAylKNIEI";
  const max = parseInt(searchParams.get("max") || "500", 10);
  return runCache(videoId, max);
}

async function runCache(videoId: string, max: number) {
  try {
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "NEWEST_FIRST");
    let count = 0;

    const saveComment = async (c: any, isReply = false, parentCommentId?: string) => {
      if (count >= max) return;
      if (!c || !c.comment_id) return;

      const publishedText = c.published_time?.text || String(c.published_time || "");
      const publishedAt = parsePublishedTime(publishedText) || new Date();

      const likeCount = parseInt((c.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const replyCount = isReply ? 0 : parseInt((c.reply_count || "0").replace(/[^0-9]/g, ""), 10) || 0;

      await prisma.commentCache.upsert({
        where: { commentId: c.comment_id },
        update: {
          content: c.content?.text || "",
          likeCount,
          replyCount,
          authorName: c.author?.name?.text || "Unknown",
          authorChannelId: c.author?.id || null,
          authorThumb: c.author?.thumbnails?.[0]?.url,
          publishedAt,
          parentCommentId: parentCommentId || null,
        },
        create: {
          commentId: c.comment_id,
          videoId,
          content: c.content?.text || "",
          likeCount,
          replyCount,
          authorName: c.author?.name?.text || "Unknown",
          authorChannelId: c.author?.id || null,
          authorThumb: c.author?.thumbnails?.[0]?.url,
          publishedAt,
          parentCommentId: parentCommentId || null,
        },
      });
      count++;
    };

    const saveBatch = async (batch: any[]) => {
      for (const thread of batch) {
        if (count >= max) return;
        const c = thread.comment;
        if (!c) continue;

        await saveComment(c, false);

        // Cache replies too
        if (thread.replies && Array.isArray(thread.replies)) {
          for (const reply of thread.replies) {
            await saveComment(reply, true, c.comment_id);
          }
        }
      }
    };

    await saveBatch(comments.contents);

    while (comments.has_continuation && count < max) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    return NextResponse.json({ success: true, cached: count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
