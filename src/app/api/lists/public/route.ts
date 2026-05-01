import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    const lists = await prisma.list.findMany({
      where: {
        isPublic: true,
        ...(q
          ? {
              name: { contains: q, mode: "insensitive" },
            }
          : {}),
      },
      include: {
        user: { select: { name: true, image: true } },
        _count: { select: { items: true, followers: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 50,
    });

    if (!userId) {
      return NextResponse.json({ lists });
    }

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
