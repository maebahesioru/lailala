import { NextRequest } from "next/server";
import { getInnertube } from "@/lib/youtube";

export const dynamic = "force-dynamic";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const commentIds = searchParams.getAll("commentId");

  const encoder = new TextEncoder();
  const stream = new ReadableStream({
    start(controller) {
      const send = (data: any) => {
        controller.enqueue(encoder.encode(`data: ${JSON.stringify(data)}\n\n`));
      };

      // Polling interval: check every 20 seconds
      const interval = setInterval(async () => {
        if (!videoId || commentIds.length === 0) return;
        try {
          const innertube = await getInnertube();
          // Fetch top comments and look for the ones we're watching
          const comments = await innertube.getComments(videoId, "TOP_COMMENTS");
          const watched = new Set(commentIds);

          for (const thread of comments.contents) {
            const c = thread.comment;
            if (c && watched.has(c.comment_id)) {
              send({
                type: "update",
                commentId: c.comment_id,
                likeCount: c.like_count || "0",
                content: c.content?.text || null,
              });
            }
            if (thread.replies) {
              for (const reply of thread.replies) {
                if (reply && watched.has(reply.comment_id)) {
                  send({
                    type: "update",
                    commentId: reply.comment_id,
                    likeCount: reply.like_count || "0",
                    content: reply.content?.text || null,
                  });
                }
              }
            }
          }
        } catch {
          // ignore polling errors
        }
      }, 20000);

      // Keep-alive
      const keepAlive = setInterval(() => {
        send({ type: "ping" });
      }, 30000);

      req.signal.addEventListener("abort", () => {
        clearInterval(interval);
        clearInterval(keepAlive);
        controller.close();
      });
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
