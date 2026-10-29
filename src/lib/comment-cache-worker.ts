import { prisma } from "./prisma";
import { unwrapReplies } from "@/lib/youtube-comment-shape";
import { parseCount } from "@/lib/parse-count";

let started = false;

const VIDEO_ID = "niKAylKNIEI";
const INTERVAL_MS = 30 * 60 * 1000; // 30分ごと
const MAX_PER_RUN = 5000; // 1回の取得数を減らす
// 起動時の全件スキャンは無制限だと十数万件を何時間もかけて取りに行き、
// YouTube 側のレート制限を誘発するため上限を設ける（残りは定期実行で追いつく）。
const MAX_INITIAL = 20000;

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
        const likeCount = parseCount(c.like_count);
        const replyCount = parseCount(c.reply_count);
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
          for (const reply of unwrapReplies(thread.replies)) {
            if (!reply?.comment_id) continue;
            const rPublishedText = reply.published_time?.text || String(reply.published_time || "");
            const rPublishedAt = parsePublishedTime(rPublishedText) || new Date();
            const rLikeCount = parseCount(reply.like_count);
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

      // 1件ずつ upsert すると数千回のラウンドトリップになり、接続プールを
      // 長時間占有して P2024（connection pool timeout）を誘発していた。
      // 50件ずつのトランザクションにまとめ、プール枯渇時は1回だけ再試行する。
      const CHUNK = 50;
      for (let i = 0; i < operations.length; i += CHUNK) {
        const chunk = operations.slice(i, i + CHUNK);
        const run = () =>
          prisma.$transaction(
            chunk.map((op: any) =>
              prisma.commentCache.upsert({
                where: { commentId: op.commentId },
                update: { content: op.content, likeCount: op.likeCount, replyCount: op.replyCount, authorName: op.authorName, authorChannelId: op.authorChannelId, authorThumb: op.authorThumb, publishedAt: op.publishedAt, parentCommentId: op.parentCommentId },
                create: op,
              })
            ) as any,
            { timeout: 30_000 }
          );
        try {
          await run();
        } catch (e: any) {
          if (e?.code === "P2024") {
            await new Promise((r) => setTimeout(r, 1_000));
            await run();
          } else {
            throw e;
          }
        }
      }
    };

    await saveBatch(comments.contents);

    // 上流の Comments.getContinuation() は ContinuationItem の endpoint を直接叩くが、
    // 一覧の続きは endpoint 側が空で token を採れず
    // 「Invalid reponse format, missing on_response_received_endpoints」で落ちていた
    // （＝全件スキャンが1ページ目で終わり、DB が更新されていなかった）。
    // API ルートと同じく token から NavigationEndpoint を組み直して続きを取得する。
    const { YT, YTNodes } = await import("youtubei.js");
    let page: any = comments;
    const seenTokens = new Set<string>();
    while (page.has_continuation && (!maxItems || count < maxItems)) {
      const token = page.continuation_token;
      if (!token || seenTokens.has(token)) break;
      seenTokens.add(token);

      let response: any = null;
      try {
        const cmd = new YTNodes.NavigationEndpoint({
          continuationCommand: {
            request: "CONTINUATION_REQUEST_TYPE_WATCH_NEXT",
            token,
          },
        });
        response = await cmd.call(innertube.actions, { parse: true });
      } catch (e: any) {
        console.error(`[CommentCacheWorker] continuation failed:`, e?.message || e);
        break;
      }
      if (!response?.on_response_received_endpoints?.length) break;

      page = new YT.Comments(
        innertube.actions,
        { on_response_received_endpoints: [undefined, response.on_response_received_endpoints[0]] },
        true
      );
      if (!page.contents?.length) break;
      await saveBatch(page.contents);
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
    await cacheVideoComments(VIDEO_ID, MAX_INITIAL);
    console.log(`[CommentCacheWorker] Initial scan complete`);

    // Switch to periodic updates
    console.log(`[CommentCacheWorker] Switching to periodic mode (${INTERVAL_MS / 1000}s)`);
    setInterval(() => cacheVideoComments(VIDEO_ID, MAX_PER_RUN), INTERVAL_MS);
  })();

  console.log(`[CommentCacheWorker] Started for ${VIDEO_ID}`);
}
