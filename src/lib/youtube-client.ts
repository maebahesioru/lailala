import { CommentThread } from "@/types/youtube";

export async function fetchComments(
  videoId: string,
  sortBy: "TOP_COMMENTS" | "NEWEST_FIRST" | "OLDEST_FIRST" = "TOP_COMMENTS",
  continuationToken?: string
): Promise<{ threads: CommentThread[]; hasContinuation: boolean; continuationToken: string | null }> {
  let url = `/api/comments?videoId=${encodeURIComponent(videoId)}&sortBy=${sortBy}`;
  if (continuationToken) {
    url += `&continuationToken=${encodeURIComponent(continuationToken)}`;
  }
  const res = await fetch(url);
  if (!res.ok) {
    const err = await res.json().catch(() => ({ error: "Unknown error" }));
    throw new Error(err.error || `HTTP ${res.status}`);
  }
  const data = await res.json();
  return {
    threads: data.threads,
    hasContinuation: data.hasContinuation,
    continuationToken: data.continuationToken || null,
  };
}
