import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  // Get user by channelId
  const user = await prisma.user.findFirst({
    where: { channelId },
    select: { id: true },
  });
  if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

  const oneYearAgo = new Date();
  oneYearAgo.setFullYear(oneYearAgo.getFullYear() - 1);

  // Count actions per day
  const actions = await prisma.userAction.groupBy({
    by: ["createdAt"],
    where: {
      userId: user.id,
      createdAt: { gte: oneYearAgo },
    },
    _count: { id: true },
  });

  // Format as YYYY-MM-DD -> count
  const map = new Map<string, number>();
  for (const a of actions) {
    const key = a.createdAt.toISOString().split("T")[0];
    map.set(key, (map.get(key) || 0) + a._count.id);
  }

  // Also count cached comments by this author
  const comments = await prisma.commentCache.findMany({
    where: { authorChannelId: channelId, publishedAt: { gte: oneYearAgo } },
    select: { publishedAt: true },
  });
  for (const c of comments) {
    const key = c.publishedAt.toISOString().split("T")[0];
    map.set(key, (map.get(key) || 0) + 1);
  }

  return NextResponse.json({ heatmap: Object.fromEntries(map) });
}
