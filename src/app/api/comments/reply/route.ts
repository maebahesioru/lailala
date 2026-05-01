import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  videoId: z.string(),
  commentId: z.string(),
  text: z.string().min(1).max(5000),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await rateLimit(`reply:${session.user.id}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { videoId, commentId, text } = parsed.data;

  try {
    const innertube = await getInnertubeWithAuth(session.user.id);
    const comments = await innertube.getComments(videoId, "TOP_COMMENTS", commentId);

    let targetComment: any = null;
    for (const thread of comments.contents) {
      if (thread.comment?.comment_id === commentId) {
        targetComment = thread.comment;
        break;
      }
      if (thread.replies) {
        for (const reply of thread.replies) {
          if (reply.comment_id === commentId) {
            targetComment = reply;
            break;
          }
        }
      }
      if (targetComment) break;
    }

    if (!targetComment) {
      return NextResponse.json({ error: "Comment not found" }, { status: 404 });
    }

    targetComment.setActions(innertube.actions);
    const response = await targetComment.reply(text);

    await prisma.userAction.create({
      data: {
        userId: session.user.id,
        videoId,
        commentId,
        actionType: "reply",
        content: text,
      },
    });

    return NextResponse.json({ success: true, data: response });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to reply" }, { status: 500 });
  }
}
