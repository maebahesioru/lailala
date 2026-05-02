import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ users: [] });

  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  // 1. Users from followed lists (list creators)
  const listFollows = await prisma.listFollow.findMany({
    where: { userId },
    select: { list: { select: { user: { select: { name: true, channelId: true, image: true } } } } },
  });

  // 2. Recent comment authors from comment cache (authors we interacted with)
  const recentActions = await prisma.userAction.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
    take: 100,
    select: { commentId: true },
  });

  const commentIds = recentActions.map((a) => a.commentId);
  const relatedComments = await prisma.commentCache.findMany({
    where: { commentId: { in: commentIds } },
    select: { authorName: true, authorChannelId: true, authorThumb: true },
    take: 50,
  });

  const seen = new Set<string>();
  const users: { name: string; channelId: string; image?: string | null }[] = [];

  const addUser = (name: string | null, channelId: string | null, image?: string | null) => {
    if (!name || !channelId) return;
    const key = channelId;
    if (seen.has(key)) return;
    seen.add(key);
    users.push({ name, channelId, image });
  };

  for (const lf of listFollows) {
    addUser(lf.list.user.name, lf.list.user.channelId, lf.list.user.image);
  }

  for (const c of relatedComments) {
    addUser(c.authorName, c.authorChannelId, c.authorThumb);
  }

  // Filter by query
  const filtered = q
    ? users.filter((u) => u.name.toLowerCase().includes(q.toLowerCase()))
    : users;

  return NextResponse.json({ users: filtered.slice(0, 10) });
}
