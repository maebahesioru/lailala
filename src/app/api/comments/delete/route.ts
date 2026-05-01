import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { z } from "zod";

const schema = z.object({
  videoId: z.string(),
  commentId: z.string(),
});

export async function DELETE(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const limit = await rateLimit(`delete:${session.user.id}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const parsed = schema.safeParse({
    videoId: searchParams.get("videoId"),
    commentId: searchParams.get("commentId"),
  });
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid query" }, { status: 400 });
  }

  const { videoId, commentId } = parsed.data;

  try {
    const innertube = await getInnertube(session.user.id);

    // Delete via direct innerTube action payload
    // This is a best-effort implementation based on common InnerTube patterns.
    // YouTube may change the exact payload.
    await (innertube as any).actions.execute("/comment/perform_comment_action", {
      action: "DELETE",
      targetId: commentId,
    });

    await prisma.userAction.create({
      data: {
        userId: session.user.id,
        videoId,
        commentId,
        actionType: "delete",
      },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to delete" }, { status: 500 });
  }
}
