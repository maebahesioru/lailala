export async function register() {
  if (process.env.NEXT_RUNTIME === "nodejs") {
    const { startScheduledPostWorker } = await import("@/lib/scheduled-posts");
    startScheduledPostWorker();
  }
}
