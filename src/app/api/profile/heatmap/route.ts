import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  const map = new Map<string, number>();

  // Also count cached comments by this author (all time, no date filter)
  const comments = await prisma.commentCache.findMany({
    where: { authorChannelId: channelId },
    select: { publishedAt: true },
  });
  for (const c of comments) {
    const key = c.publishedAt.toISOString().split("T")[0];
    map.set(key, (map.get(key) || 0) + 1);
  }

  return NextResponse.json({ heatmap: Object.fromEntries(map) });
}
