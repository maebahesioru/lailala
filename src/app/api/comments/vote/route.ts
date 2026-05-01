import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  videoId: z.string(),
  commentId: z.string(),
  action: z.enum(["like", "dislike", "unlike", "undislike"]),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await rateLimit(`vote:${session.user.id}`, 30, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { videoId, commentId, action } = parsed.data;

  try {
    const innertube = await getInnertube(session.user.id);
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

    if (action === "like") await targetComment.like();
    else if (action === "dislike") await targetComment.dislike();
    else if (action === "unlike") await targetComment.unlike();
    else if (action === "undislike") await targetComment.undislike();

    if (action === "like" || action === "dislike") {
      await prisma.commentLike.upsert({
        where: {
          commentId_userId: { commentId, userId: session.user.id },
        },
        update: { type: action },
        create: {
          commentId,
          videoId,
          userId: session.user.id,
          type: action,
        },
      });
    } else {
      await prisma.commentLike.deleteMany({
        where: { commentId, userId: session.user.id },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
