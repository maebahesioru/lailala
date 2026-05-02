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

    const saveBatch = async (batch: any[]) => {
      const operations: any[] = [];
      for (const thread of batch) {
        if (maxItems && count >= maxItems) break;
        const c = thread.comment;
        if (!c) continue;

        const publishedText = c.published_time?.text || String(c.published_time || "");
        const publishedAt = parsePublishedTime(publishedText) || new Date();
        const likeCount = parseInt((c.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
        const replyCount = parseInt((c.reply_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
        const authorName = typeof c.author?.name === "string" ? c.author.name : (c.author?.name?.text || "Unknown");
        const authorThumb = c.author?.thumbnails?.[0]?.url || c.author?.thumbnail?.url || null;

        operations.push({
          commentId: c.comment_id,
          videoId,
          content: c.content?.text || "",
          likeCount,
          replyCount,
          authorName,
          authorChannelId: c.author?.id || null,
          authorThumb,
          publishedAt,
        });
        count++;

        if (thread.replies) {
          for (const reply of thread.replies) {
            if (!reply?.comment_id) continue;
            const rPublishedText = reply.published_time?.text || String(reply.published_time || "");
            const rPublishedAt = parsePublishedTime(rPublishedText) || new Date();
            const rLikeCount = parseInt((reply.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
            const rAuthorName = typeof reply.author?.name === "string" ? reply.author.name : (reply.author?.name?.text || "Unknown");
            const rAuthorThumb = reply.author?.thumbnails?.[0]?.url || reply.author?.thumbnail?.url || null;

            operations.push({
              commentId: reply.comment_id,
              videoId,
              content: reply.content?.text || "",
              likeCount: rLikeCount,
              replyCount: 0,
              authorName: rAuthorName,
              authorChannelId: reply.author?.id || null,
              authorThumb: rAuthorThumb,
              publishedAt: rPublishedAt,
            });
            count++;
          }
        }
      }

      // Batch upsert all at once
      if (operations.length > 0) {
        for (const op of operations) {
          await prisma.commentCache.upsert({
            where: { commentId: op.commentId },
            update: { content: op.content, likeCount: op.likeCount, replyCount: op.replyCount, authorName: op.authorName, authorChannelId: op.authorChannelId, authorThumb: op.authorThumb, publishedAt: op.publishedAt },
            create: op,
          });
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
    console.log(`[CommentCacheWorker] Starting full initial scan...`);
    // One big continuous scan - single Comments object, many getContinuation()
    await cacheVideoComments(VIDEO_ID);
    console.log(`[CommentCacheWorker] Initial scan complete`);

    // Switch to periodic updates
    console.log(`[CommentCacheWorker] Switching to periodic mode (${INTERVAL_MS / 1000}s)`);
    setInterval(() => cacheVideoComments(VIDEO_ID, MAX_PER_RUN), INTERVAL_MS);
  })();

  console.log(`[CommentCacheWorker] Started for ${VIDEO_ID}`);
}
