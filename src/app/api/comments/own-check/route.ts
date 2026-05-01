import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ isOwn: false });
  }

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");
  if (!commentId) {
    return NextResponse.json({ isOwn: false });
  }

  const action = await prisma.userAction.findFirst({
    where: {
      userId,
      commentId,
      actionType: { in: ["comment", "reply"] },
    },
  });

  return NextResponse.json({ isOwn: !!action });
}
