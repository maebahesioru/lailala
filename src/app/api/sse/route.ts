import { NextRequest } from "next/server";
import { getCommentSnapshot } from "@/lib/comment-poll-cache";

export const dynamic = "force-dynamic";

// 同一インスタンスで同時に張れる SSE 接続の上限。
// 未認証の公開エンドポイントなので、1 クライアントが大量に張って
// YouTube へのリクエストを増やすのを防ぐための安全弁。
const MAX_CONNECTIONS = 200;
let activeConnections = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const commentIds = searchParams.getAll("commentId");

  if (!videoId || commentIds.length === 0) {
    return new Response(JSON.stringify({ error: "videoId と commentId が必要です" }), {
      status: 400,
      headers: { "Content-Type": "application/json" },
    });
  }

  if (activeConnections >= MAX_CONNECTIONS) {
    return new Response(JSON.stringify({ error: "接続が混み合っています。しばらくしてから再試行してください" }), {
      status: 429,
      headers: { "Content-Type": "application/json", "Retry-After": "30" },
    });
  }

  activeConnections++;

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      let closed = false;
      const send = (data: unknown) => {
        if (closed) return;
        try {
          controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
        } catch {
          closed = true;
        }
      };

      // 20 秒ごとに「共有スナップショット」から差分を拾う。
      // YouTube へのリクエストは動画 ID 単位で 20 秒に 1 回に集約される。
      const interval = setInterval(async () => {
        try {
          const snapshot = await getCommentSnapshot(videoId);
          for (const commentId of commentIds) {
            const update = snapshot.get(commentId);
            if (!update) continue;
            send({
              type: "update",
              commentId,
              likeCount: update.likeCount,
              content: update.content,
            });
          }
        } catch (e) {
          console.error("[SSE] Failed to refresh comments:", e);
        }
      }, 20000);

      const keepAlive = setInterval(() => send({ type: "ping" }), 30000);

      const cleanup = () => {
        if (closed) return;
        closed = true;
        activeConnections = Math.max(0, activeConnections - 1);
        clearInterval(interval);
        clearInterval(keepAlive);
        try {
          controller.close();
        } catch {
          /* already closed */
        }
      };

      req.signal.addEventListener("abort", cleanup);
    },
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    },
  });
}
