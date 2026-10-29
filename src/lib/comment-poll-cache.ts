import { getInnertube } from "@/lib/youtube";
import { unwrapComment } from "@/lib/youtube-comment-shape";

/**
 * コメントのライブ更新（SSE）用の共有スナップショット。
 *
 * 以前は SSE 接続 1 本ごとに 20 秒間隔で `getComments()` を叩いていたため、
 * 視聴者が増えるほど YouTube へのリクエストが線形に増えていた
 * （未認証のエンドポイントなので、外から大量接続されるとレート制限を誘発する）。
 * ここで動画 ID 単位に 20 秒キャッシュし、同時リクエストは in-flight で 1 本に畳む。
 */

export type CommentSnapshot = Map<string, { likeCount: string; content: string | null }>;

const TTL_MS = 20_000;
const MAX_VIDEOS = 20;

const cache = new Map<string, { at: number; data: CommentSnapshot }>();
const inflight = new Map<string, Promise<CommentSnapshot>>();

async function fetchSnapshot(videoId: string): Promise<CommentSnapshot> {
  const innertube = await getInnertube();
  const comments = await innertube.getComments(videoId, "TOP_COMMENTS");
  const snapshot: CommentSnapshot = new Map();

  const add = (comment: any) => {
    if (!comment?.comment_id) return;
    snapshot.set(comment.comment_id, {
      likeCount: comment.like_count || "0",
      content: comment.content?.text || null,
    });
  };

  for (const thread of comments.contents) {
    add(thread.comment);
    if (thread.replies) {
      for (const reply of thread.replies) add(unwrapComment(reply));
    }
  }

  return snapshot;
}

function evictOldest() {
  if (cache.size <= MAX_VIDEOS) return;
  const oldest = [...cache.entries()].sort((a, b) => a[1].at - b[1].at)[0];
  if (oldest) cache.delete(oldest[0]);
}

export async function getCommentSnapshot(videoId: string): Promise<CommentSnapshot> {
  const hit = cache.get(videoId);
  if (hit && Date.now() - hit.at < TTL_MS) return hit.data;

  const pending = inflight.get(videoId);
  if (pending) return pending;

  const promise = fetchSnapshot(videoId)
    .then((data) => {
      cache.set(videoId, { at: Date.now(), data });
      evictOldest();
      return data;
    })
    .finally(() => {
      inflight.delete(videoId);
    });

  inflight.set(videoId, promise);
  return promise;
}
