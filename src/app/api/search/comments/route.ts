import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);

  if (!q.trim()) {
    return NextResponse.json({ threads: [] });
  }

  try {
    const comments = await prisma.commentCache.findMany({
      where: {
        OR: [
          { content: { contains: q, mode: "insensitive" } },
          { authorName: { contains: q, mode: "insensitive" } },
        ],
      },
      orderBy: { likeCount: "desc" },
      take: limit,
    });

    const threads = comments.map((c) => ({
      comment: {
        commentId: c.commentId,
        author: {
          name: c.authorName,
          thumbnail: c.authorThumb || undefined,
          isChannelOwner: false,
          isMember: false,
        },
        content: c.content,
        publishedTime: c.publishedAt.toLocaleString("ja-JP", {
          year: "numeric",
          month: "short",
          day: "numeric",
        }),
        likeCount: String(c.likeCount),
        replyCount: String(c.replyCount),
        isLiked: false,
        isDisliked: false,
        isPinned: false,
        isHearted: false,
      },
      replies: [],
      hasRepliesContinuation: false,
      videoId: c.videoId,
    }));

    return NextResponse.json({ threads });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
