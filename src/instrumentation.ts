export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startScheduledPostWorker } = await import("@/lib/scheduled-posts");
    startScheduledPostWorker();

    // Skip heavy full scan in development to save memory
    if (process.env.NODE_ENV !== "development") {
      const { startCommentCacheWorker } = await import("@/lib/comment-cache-worker");
      startCommentCacheWorker();

      // YouTube のコメントを最後まで辿る全件同期（続きトークンを DB に保存して再開可能）
      if (process.env.COMMENT_SYNC_ENABLED !== "false") {
        const { startCommentSyncWorker } = await import("@/lib/comment-sync-worker");
        startCommentSyncWorker();
      }

      // 返信チェーンは親コメントごとに独立なので、こちらは並列に掘る
      if (process.env.COMMENT_REPLY_SYNC_ENABLED !== "false") {
        const { startCommentReplySyncWorker } = await import("@/lib/comment-reply-sync-worker");
        startCommentReplySyncWorker();
      }
    }
  }
}
