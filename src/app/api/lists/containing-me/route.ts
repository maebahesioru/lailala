import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { channelId: true },
    });
    const channelId = user?.channelId;
    if (!channelId) {
      return NextResponse.json({ lists: [] });
    }

    // Find lists that contain comments from this user's channel
    const items = await prisma.listItem.findMany({
      where: {
        list: { isPublic: true },
        OR: [
          { authorName: { contains: channelId, mode: "insensitive" } },
        ],
      },
      select: { listId: true },
      distinct: ["listId"],
    });

    const listIds = items.map((i) => i.listId);
    const lists = await prisma.list.findMany({
      where: { id: { in: listIds }, isPublic: true },
      include: {
        user: { select: { name: true, image: true } },
        _count: { select: { items: true, followers: true } },
      },
    });

    const follows = await prisma.listFollow.findMany({
      where: { userId },
      select: { listId: true },
    });
    const followSet = new Set(follows.map((f) => f.listId));

    return NextResponse.json({
      lists: lists.map((l) => ({ ...l, isFollowing: followSet.has(l.id) })),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
