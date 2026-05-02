export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startScheduledPostWorker } = await import("@/lib/scheduled-posts");
    startScheduledPostWorker();

    // Skip heavy full scan in development to save memory
    if (process.env.NODE_ENV !== "development") {
      const { startCommentCacheWorker } = await import("@/lib/comment-cache-worker");
      startCommentCacheWorker();
    }
  }
}
