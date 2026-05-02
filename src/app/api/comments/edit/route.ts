import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { rateLimit } from "@/lib/rate-limit";

export async function PATCH(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = await rateLimit(`edit:${userId}`, 10, 60);
  if (!limit.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  try {
    const body = await req.json();
    const { videoId, commentId, text } = body;
    if (!videoId || !commentId || !text?.trim()) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const innertube = await getInnertubeWithAuth(userId);
    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);

    let targetComment: any = null;
    for (const thread of comments.contents) {
      if (thread.comment?.comment_id === commentId) { targetComment = thread.comment; break; }
      if (thread.replies) {
        for (const reply of thread.replies) {
          if (reply.comment_id === commentId) { targetComment = reply; break; }
        }
      }
      if (targetComment) break;
    }

    if (!targetComment) return NextResponse.json({ error: "Comment not found" }, { status: 404 });

    targetComment.setActions(innertube.actions);
    await targetComment.edit(text.trim());

    return NextResponse.json({ success: true });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : e.message || "Failed to edit";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}
