import { prisma } from "./prisma";

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
          // Lazy import to avoid bundling youtubei.js at startup
          const { getInnertubeWithAuth } = await import("./youtube");
          const innertube = await getInnertubeWithAuth(post.userId);
          await innertube.comment(post.videoId, post.text);
          await prisma.scheduledPost.update({
            where: { id: post.id },
            data: { posted: true },
          });
          console.log(`[ScheduledPost] Posted ${post.id} for video ${post.videoId}`);
        } catch (e: any) {
          console.error(`[ScheduledPost] Failed to post ${post.id}:`, e.message);
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
