export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startScheduledPostWorker } = await import("@/lib/scheduled-posts");
    startScheduledPostWorker();
    const { startCommentCacheWorker } = await import("@/lib/comment-cache-worker");
    startCommentCacheWorker();
  }
}
