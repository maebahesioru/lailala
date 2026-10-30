import { prisma } from "./prisma";

let started = false;

/** 1件あたりの最大試行回数。到達したら諦めてログにだけ残す。 */
const MAX_ATTEMPTS = 5;
/** 失敗後の待ち時間（指数バックオフ）。 */
const BASE_BACKOFF_MS = 60_000;
const MAX_BACKOFF_MS = 30 * 60_000;

function backoffFor(attempts: number): number {
  const exponent = Math.max(0, attempts - 1);
  return Math.min(BASE_BACKOFF_MS * 2 ** exponent, MAX_BACKOFF_MS);
}

/**
 * 予約投稿ワーカー。
 *
 * 以前は失敗しても `posted: false` のまま30秒ごとに無限リトライしていたため、
 * リフレッシュトークンが失効した投稿が延々とログを埋め続けていた
 * （`[ScheduledPost] Failed to post ...` が30秒間隔で永続）。
 * 失敗回数と最終試行時刻を記録し、指数バックオフ＋試行上限で必ず収束させる。
 */
export function startScheduledPostWorker() {
  if (started) return;
  started = true;

  const INTERVAL_MS = 30_000; // 30秒ごとにチェック

  async function processDuePosts() {
    try {
      const now = new Date();
      const due = await prisma.scheduledPost.findMany({
        where: {
          posted: false,
          scheduledAt: { lte: now },
          attempts: { lt: MAX_ATTEMPTS },
        },
        orderBy: { scheduledAt: "asc" },
        take: 10,
      });

      for (const post of due) {
        // バックオフ中ならスキップ
        if (post.lastAttemptAt) {
          const wait = backoffFor(post.attempts);
          if (now.getTime() - post.lastAttemptAt.getTime() < wait) continue;
        }

        try {
          // Lazy import to avoid bundling youtubei.js at startup
          const { getInnertubeWithAuth } = await import("./youtube");
          const innertube = await getInnertubeWithAuth(post.userId);
          if (post.parentCommentId) {
            // 返信の予約投稿: 親コメントを引き当ててから reply する
            const { unwrapComment } = await import("./youtube-comment-shape");
            const comments = await innertube.getComments(
              post.videoId,
              "TOP_COMMENTS",
              post.parentCommentId,
            );
            let target: any = null;
            for (const thread of comments.contents as any[]) {
              if (thread.comment?.comment_id === post.parentCommentId) {
                target = thread.comment;
                break;
              }
              for (const reply of thread.replies ?? []) {
                const c = unwrapComment(reply);
                if (c?.comment_id === post.parentCommentId) { target = c; break; }
              }
              if (target) break;
            }
            if (!target) throw new Error("parent comment not found");
            target.setActions(innertube.actions);
            await target.reply(post.text);
          } else {
            await innertube.interact.comment(post.videoId, post.text);
          }
          await prisma.scheduledPost.update({
            where: { id: post.id },
            data: { posted: true, lastAttemptAt: new Date() },
          });
          console.log(`[ScheduledPost] Posted ${post.id} for video ${post.videoId}${post.parentCommentId ? ` (reply to ${post.parentCommentId})` : ""}`);
        } catch (e: any) {
          const attempts = post.attempts + 1;
          await prisma.scheduledPost
            .update({
              where: { id: post.id },
              data: { attempts, lastAttemptAt: new Date() },
            })
            .catch(() => {});
          if (attempts >= MAX_ATTEMPTS) {
            console.error(
              `[ScheduledPost] Giving up on ${post.id} after ${attempts} attempts:`,
              e.message,
            );
          } else {
            console.error(
              `[ScheduledPost] Failed to post ${post.id} (attempt ${attempts}/${MAX_ATTEMPTS}):`,
              e.message,
            );
          }
        }
      }
    } catch (e: any) {
      console.error("[ScheduledPost] Worker error:", e.message);
    }
  }

  // 初回実行
  processDuePosts();

  // 定期実行
  setInterval(processDuePosts, INTERVAL_MS);

  console.log("[ScheduledPost] Worker started");
}
