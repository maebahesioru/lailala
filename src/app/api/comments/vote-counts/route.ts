import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const commentIds = searchParams.getAll("commentId");

  if (commentIds.length === 0) {
    return NextResponse.json({});
  }

  const counts = await prisma.commentLike.groupBy({
    by: ["commentId", "type"],
    where: {
      commentId: { in: commentIds },
    },
    _count: { commentId: true },
  });

  const result: Record<string, { likes: number; dislikes: number }> = {};
  for (const c of counts) {
    if (!result[c.commentId]) {
      result[c.commentId] = { likes: 0, dislikes: 0 };
    }
    if (c.type === "like") {
      result[c.commentId].likes = c._count.commentId;
    } else {
      result[c.commentId].dislikes = c._count.commentId;
    }
  }

  return NextResponse.json(result);
}
