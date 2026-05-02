import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  const authorName = searchParams.get("authorName");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  const map = new Map<string, number>();

  // Query by authorChannelId first
  let comments = await prisma.commentCache.findMany({
    where: { authorChannelId: channelId },
    select: { publishedAt: true },
  });

  // Fallback: if channelId looks like a handle (@...) and no results, try matching by authorName
  if (comments.length === 0 && channelId.startsWith("@") && authorName) {
    comments = await prisma.commentCache.findMany({
      where: { authorName },
      select: { publishedAt: true },
    });
  }

  // Also try exact name match as last resort for any channelId
  if (comments.length === 0 && authorName) {
    comments = await prisma.commentCache.findMany({
      where: { authorName },
      select: { publishedAt: true },
    });
  }

  for (const c of comments) {
    const key = c.publishedAt.toISOString().split("T")[0];
    map.set(key, (map.get(key) || 0) + 1);
  }

  return NextResponse.json({ heatmap: Object.fromEntries(map), count: comments.length });
}
