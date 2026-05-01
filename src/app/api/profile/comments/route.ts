import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
  const type = searchParams.get("type") || "all"; // 'comment' | 'reply' | 'all'

  if (!channelId) {
    return NextResponse.json({ error: "channelId required" }, { status: 400 });
  }

  try {
    const skip = (page - 1) * limit;
    const where: any = { authorChannelId: channelId };
    if (type === "comment") {
      where.parentCommentId = null;
    } else if (type === "reply") {
      where.parentCommentId = { not: null };
    }

    const [comments, total] = await Promise.all([
      prisma.commentCache.findMany({
        where,
        orderBy: { publishedAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.commentCache.count({ where }),
    ]);

    return NextResponse.json({
      comments,
      total,
      page,
      totalPages: Math.ceil(total / limit),
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch profile comments" }, { status: 500 });
  }
}
