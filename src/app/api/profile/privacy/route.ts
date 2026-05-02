import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  try {
    const user = await prisma.user.findFirst({
      where: { channelId },
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

    if (!user) {
      return NextResponse.json({
        showLikesTab: true,
        showDislikesTab: true,
        showBookmarksTab: true,
      });
    }

    return NextResponse.json(user);
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
