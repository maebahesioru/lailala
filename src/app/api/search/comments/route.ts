import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function getRelativeTimeString(date: Date): string {
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffSec = Math.floor(diffMs / 1000);
  const diffMin = Math.floor(diffSec / 60);
  const diffHour = Math.floor(diffMin / 60);
  const diffDay = Math.floor(diffHour / 24);
  const diffMonth = Math.floor(diffDay / 30);
  const diffYear = Math.floor(diffDay / 365);

  if (diffYear > 0) return `${diffYear} year${diffYear > 1 ? "s" : ""} ago`;
  if (diffMonth > 0) return `${diffMonth} month${diffMonth > 1 ? "s" : ""} ago`;
  if (diffDay > 0) return `${diffDay} day${diffDay > 1 ? "s" : ""} ago`;
  if (diffHour > 0) return `${diffHour} hour${diffHour > 1 ? "s" : ""} ago`;
  if (diffMin > 0) return `${diffMin} minute${diffMin > 1 ? "s" : ""} ago`;
  return "just now";
}

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
        publishedTime: getRelativeTimeString(c.publishedAt),
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
