import { prisma } from "./prisma";

let started = false;

const VIDEO_ID = "niKAylKNIEI";
const INTERVAL_MS = 30 * 60 * 1000; // 30分ごと
const MAX_PER_RUN = 5000; // 1回の取得数を減らす

function parsePublishedTime(text: string): Date | null {
  if (!text || text.trim() === "") return null;
  const now = new Date();
  // Support both English ("2 hours ago") and Japanese ("2時間前")
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
          parentCommentId: null,
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
              parentCommentId: c.comment_id,
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
            update: { content: op.content, likeCount: op.likeCount, replyCount: op.replyCount, authorName: op.authorName, authorChannelId: op.authorChannelId, authorThumb: op.authorThumb, publishedAt: op.publishedAt, parentCommentId: op.parentCommentId },
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
