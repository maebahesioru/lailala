import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const commentIds = searchParams.getAll("commentId");
  if (commentIds.length === 0) return NextResponse.json({});

  const likes = await prisma.commentLike.findMany({
    where: { userId, commentId: { in: commentIds } },
  });

  const result: Record<string, { type: string }> = {};
  for (const like of likes) {
    result[like.commentId] = { type: like.type };
  }
  return NextResponse.json(result);
}
