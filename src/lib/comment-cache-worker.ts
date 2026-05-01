import { prisma } from "./prisma";

let started = false;

const VIDEO_IDS = process.env.TREND_VIDEO_IDS?.split(",").map((s) => s.trim()).filter(Boolean) || [];
const INTERVAL_MS = 10 * 60 * 1000; // 10分ごと
const MAX_PER_VIDEO = 500;

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

async function cacheVideoComments(videoId: string) {
  try {
    const { getInnertube } = await import("./youtube");
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "NEWEST_FIRST");
    let count = 0;

    const saveComment = async (c: any, isReply = false, parentCommentId?: string) => {
      if (count >= MAX_PER_VIDEO) return;
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
        if (count >= MAX_PER_VIDEO) return;
        const c = thread.comment;
        if (!c) continue;
        await saveComment(c, false);
        if (thread.replies && Array.isArray(thread.replies)) {
          for (const reply of thread.replies) {
            await saveComment(reply, true, c.comment_id);
          }
        }
      }
    };

    await saveBatch(comments.contents);
    while (comments.has_continuation && count < MAX_PER_VIDEO) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    console.log(`[CommentCacheWorker] Cached ${count} comments for ${videoId}`);
  } catch (e: any) {
    console.error(`[CommentCacheWorker] Failed to cache ${videoId}:`, e.message);
  }
}

async function run() {
  if (VIDEO_IDS.length === 0) {
    console.log("[CommentCacheWorker] No TREND_VIDEO_IDS configured, skipping");
    return;
  }
  for (const videoId of VIDEO_IDS) {
    await cacheVideoComments(videoId);
    await new Promise((r) => setTimeout(r, 2000));
  }
}

export function startCommentCacheWorker() {
  if (started) return;
  started = true;

  run();
  setInterval(run, INTERVAL_MS);
  console.log(`[CommentCacheWorker] Started with ${VIDEO_IDS.length} videos, interval ${INTERVAL_MS / 1000}s`);
}
