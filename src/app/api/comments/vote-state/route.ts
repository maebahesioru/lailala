import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({});
  }

  const { searchParams } = new URL(req.url);
  const commentIds = searchParams.getAll("commentId");

  if (commentIds.length === 0) {
    return NextResponse.json({});
  }

  const likes = await prisma.commentLike.findMany({
    where: {
      userId: session.user.id,
      commentId: { in: commentIds },
    },
  });

  const result: Record<string, { type: string }> = {};
  for (const like of likes) {
    result[like.commentId] = { type: like.type };
  }

  return NextResponse.json(result);
}
