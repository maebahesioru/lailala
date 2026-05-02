import { prisma } from "./prisma";

let started = false;
let fullScanDone = false;

const VIDEO_ID = "niKAylKNIEI";
const INTERVAL_MS = 15 * 60 * 1000; // 15分ごと
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

    const saveComment = async (c: any, isReply = false, parentCommentId?: string) => {
      if (maxItems && count >= maxItems) return;
      if (!c || !c.comment_id) return;

      const publishedText = c.published_time?.text || String(c.published_time || "");
      const publishedAt = parsePublishedTime(publishedText) || new Date();

      const likeCount = parseInt((c.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
      const replyCount = isReply ? 0 : parseInt((c.reply_count || "0").replace(/[^0-9]/g, ""), 10) || 0;

      const authorName = typeof c.author?.name === "string" ? c.author.name : (c.author?.name?.text || "Unknown");
      const authorThumb = c.author?.thumbnails?.[0]?.url || c.author?.thumbnail?.url || c.author?.thumbnail || null;

      await prisma.commentCache.upsert({
        where: { commentId: c.comment_id },
        update: {
          content: c.content?.text || "",
          likeCount,
          replyCount,
          authorName,
          authorChannelId: c.author?.id || null,
          authorThumb,
          publishedAt,
          parentCommentId: parentCommentId || null,
        },
        create: {
          commentId: c.comment_id,
          videoId,
          content: c.content?.text || "",
          likeCount,
          replyCount,
          authorName,
          authorChannelId: c.author?.id || null,
          authorThumb,
          publishedAt,
          parentCommentId: parentCommentId || null,
        },
      });
      count++;
    };

    const saveBatch = async (batch: any[]) => {
      for (const thread of batch) {
        if (maxItems && count >= maxItems) return;
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
    while (comments.has_continuation && (!maxItems || count < maxItems)) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    console.log(`[CommentCacheWorker] Cached ${count} comments for ${videoId}${maxItems ? ` (limit=${maxItems})` : ""}`);
    return count;
  } catch (e: any) {
    console.error(`[CommentCacheWorker] Failed to cache ${videoId}:`, e.message);
    return 0;
  }
}

async function run() {
  await cacheVideoComments(VIDEO_ID, MAX_PER_RUN);
}

async function runFullScan() {
  if (fullScanDone) return;
  console.log(`[CommentCacheWorker] Starting full scan for ${VIDEO_ID}...`);
  const count = await cacheVideoComments(VIDEO_ID);
  fullScanDone = true;
  console.log(`[CommentCacheWorker] Full scan completed: ${count} comments`);
}

export function startCommentCacheWorker() {
  if (started) return;
  started = true;

  // Run full scan first, then start periodic updates
  (async () => {
    await runFullScan();
    await run();
    setInterval(run, INTERVAL_MS);
  })();

  console.log(`[CommentCacheWorker] Started for ${VIDEO_ID}, interval ${INTERVAL_MS / 1000}s`);
}
