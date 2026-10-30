import { NextRequest, NextResponse } from "next/server";
import { internalError } from "@/lib/api-error";
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
        pushNotifyLikes: true,
        pushNotifyDislikes: true,
        pushNotifyBookmarks: true,
        pushNotifyReplies: true,
        pushNotifyMentions: true,
        dataSaver: true,
      },
    });
    return NextResponse.json(user);
  } catch (e: any) {
    return internalError("api/user/privacy", e);
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
        ...(body.pushNotifyLikes !== undefined && { pushNotifyLikes: body.pushNotifyLikes }),
        ...(body.pushNotifyDislikes !== undefined && { pushNotifyDislikes: body.pushNotifyDislikes }),
        ...(body.pushNotifyBookmarks !== undefined && { pushNotifyBookmarks: body.pushNotifyBookmarks }),
        ...(body.pushNotifyReplies !== undefined && { pushNotifyReplies: body.pushNotifyReplies }),
        ...(body.pushNotifyMentions !== undefined && { pushNotifyMentions: body.pushNotifyMentions }),
        ...(body.dataSaver !== undefined && { dataSaver: body.dataSaver }),
      },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return internalError("api/user/privacy", e);
  }
}
