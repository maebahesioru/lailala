import { prisma } from "./prisma";

let started = false;

const VIDEO_ID = "niKAylKNIEI";
const INTERVAL_MS = 15 * 60 * 1000;
const MAX_PER_RUN = 10000;

function parsePublishedTime(text: string): Date | null {
  if (!text || text.trim() === "") return null;
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

async function cacheVideoComments(videoId: string, maxItems?: number) {
  try {
    const { getInnertube } = await import("./youtube");
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "NEWEST_FIRST");
    let count = 0;

    const saveComment = async (c: any) => {
      if (!c || !c.comment_id) return;
      const publishedText = c.published_time?.text || String(c.published_time || "");
      const publishedAt = parsePublishedTime(publishedText) || new Date();
      const likeCount = parseInt((c.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const replyCount = parseInt((c.reply_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const authorName = typeof c.author?.name === "string" ? c.author.name : (c.author?.name?.text || "Unknown");
      const authorThumb = c.author?.thumbnails?.[0]?.url || c.author?.thumbnail?.url || null;

      await prisma.commentCache.upsert({
        where: { commentId: c.comment_id },
        update: { content: c.content?.text || "", likeCount, replyCount, authorName, authorChannelId: c.author?.id || null, authorThumb, publishedAt },
        create: { commentId: c.comment_id, videoId, content: c.content?.text || "", likeCount, replyCount, authorName, authorChannelId: c.author?.id || null, authorThumb, publishedAt },
      });
      count++;
    };

    const saveBatch = async (batch: any[]) => {
      for (const thread of batch) {
        if (maxItems && count >= maxItems) return;
        const c = thread.comment;
        if (!c) continue;
        await saveComment(c);
        if (thread.replies) {
          for (const reply of thread.replies) await saveComment(reply);
        }
      }
    };

    await saveBatch(comments.contents);

    while (comments.has_continuation && (!maxItems || count < maxItems)) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    console.log(`[CommentCacheWorker] Cached ${count} comments for ${videoId}`);
    return count;
  } catch (e: any) {
    console.error(`[CommentCacheWorker] Failed to cache ${videoId}:`, e.message);
    return 0;
  }
}

async function run() {
  await cacheVideoComments(VIDEO_ID, MAX_PER_RUN);
}

export function startCommentCacheWorker() {
  if (started) return;
  started = true;

  (async () => {
    // Full scan on startup (50000)
    console.log(`[CommentCacheWorker] Starting full scan...`);
    await cacheVideoComments(VIDEO_ID, 50000);
    console.log(`[CommentCacheWorker] Full scan done, starting periodic updates`);

    // Periodic updates every 15 min
    setInterval(run, INTERVAL_MS);
    // Also run immediately
    await run();
  })();

  console.log(`[CommentCacheWorker] Started for ${VIDEO_ID}, interval ${INTERVAL_MS / 1000}s`);
}
