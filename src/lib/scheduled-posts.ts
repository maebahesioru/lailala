import { prisma } from "./prisma";
import { getInnertubeWithAuth } from "./youtube";

let started = false;

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
        },
        take: 10,
      });

      for (const post of due) {
        try {
          const innertube = await getInnertubeWithAuth(post.userId);
          await innertube.comment(post.videoId, post.text);
          await prisma.scheduledPost.update({
            where: { id: post.id },
            data: { posted: true },
          });
          console.log(`[ScheduledPost] Posted ${post.id} for video ${post.videoId}`);
        } catch (e: any) {
          console.error(`[ScheduledPost] Failed to post ${post.id}:`, e.message);
          // 失敗してもposted=trueにしない（リトライの可能性を残す）
          // ただし無限ループを防ぐため、一定回数リトライ後に諦める機能が必要な場合がある
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
