import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        showLikesTab: true,
        showDislikesTab: true,
        showBookmarksTab: true,
        notifyLikes: true,
        notifyDislikes: true,
        notifyBookmarks: true,
        notifyReplies: true,
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PATCH(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const user = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(body.showLikesTab !== undefined && { showLikesTab: body.showLikesTab }),
        ...(body.showDislikesTab !== undefined && { showDislikesTab: body.showDislikesTab }),
        ...(body.showBookmarksTab !== undefined && { showBookmarksTab: body.showBookmarksTab }),
        ...(body.notifyLikes !== undefined && { notifyLikes: body.notifyLikes }),
        ...(body.notifyDislikes !== undefined && { notifyDislikes: body.notifyDislikes }),
        ...(body.notifyBookmarks !== undefined && { notifyBookmarks: body.notifyBookmarks }),
        ...(body.notifyReplies !== undefined && { notifyReplies: body.notifyReplies }),
      },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
