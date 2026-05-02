import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
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
  const type = searchParams.get("type") || "top";
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 200);
  const period = searchParams.get("period") || "all"; // today / week / month / all
  const minLikes = parseInt(searchParams.get("minLikes") || "0", 10);
  const sort = searchParams.get("sort") || "relevance"; // relevance / newest / likes
  const userFilter = searchParams.get("user") || ""; // channelId or author name

  if (!q.trim() && !userFilter.trim()) {
    return NextResponse.json({ threads: [] });
  }

  try {
    const userId = await getSessionUserId();
    let blockedIds = new Set<string>();
    if (userId) {
      const [blocked, muted] = await Promise.all([
        prisma.blockedUser.findMany({ where: { userId }, select: { channelId: true } }),
        prisma.mutedUser.findMany({ where: { userId }, select: { channelId: true } }),
      ]);
      blockedIds = new Set([...blocked.map((b) => b.channelId), ...muted.map((m) => m.channelId)]);
    }

    // Date range filter
    let dateFilter: any = {};
    const now = new Date();
    if (period === "today") {
      dateFilter = { gte: new Date(now.getTime() - 24 * 60 * 60 * 1000) };
    } else if (period === "week") {
      dateFilter = { gte: new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000) };
    } else if (period === "month") {
      dateFilter = { gte: new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000) };
    }

    if (type === "accounts") {
      const comments = await prisma.commentCache.findMany({
        where: {
          authorName: { contains: q, mode: "insensitive" },
          ...(blockedIds.size > 0 ? { NOT: { authorChannelId: { in: Array.from(blockedIds) } } } : {}),
        },
        select: { authorChannelId: true, authorName: true, authorThumb: true },
        orderBy: { publishedAt: "desc" },
        take: 500,
      });

      const grouped = new Map<string, AccountResult>();
      for (const c of comments) {
        if (!c.authorChannelId) continue;
        const existing = grouped.get(c.authorChannelId);
        if (existing) {
          existing.count++;
        } else {
          grouped.set(c.authorChannelId, {
            channelId: c.authorChannelId,
            authorName: c.authorName,
            authorThumb: c.authorThumb,
            count: 1,
          });
        }
      }
      const accounts = Array.from(grouped.values())
        .sort((a, b) => b.count - a.count)
        .slice(0, 20);

      return NextResponse.json({ accounts });
    }

    // Build where clause for comments
    const where: any = {
      ...(blockedIds.size > 0 ? { NOT: { authorChannelId: { in: Array.from(blockedIds) } } } : {}),
      ...(minLikes > 0 ? { likeCount: { gte: minLikes } } : {}),
      ...(Object.keys(dateFilter).length > 0 ? { publishedAt: dateFilter } : {}),
    };

    if (userFilter.trim()) {
      where.authorName = { contains: userFilter, mode: "insensitive" };
    }

    if (q.trim()) {
      where.OR = [
        { content: { contains: q, mode: "insensitive" } },
        { authorName: { contains: q, mode: "insensitive" } },
      ];
    }

    // Sort order based on tab type
    let orderBy: any = {};
    if (type === "latest") {
      orderBy = { publishedAt: "desc" };
    } else if (type === "accounts") {
      orderBy = { likeCount: "desc" };
    } else if (sort === "newest") {
      orderBy = { publishedAt: "desc" };
    } else if (sort === "likes") {
      orderBy = { likeCount: "desc" };
    } else {
      // top / relevance: prioritize like count
      orderBy = { likeCount: "desc" };
    }

    const comments = await prisma.commentCache.findMany({
      where,
      orderBy,
      take: limit,
    });

    const threads = comments.map((c) => ({
      comment: {
        commentId: c.commentId,
        author: {
          name: c.authorName,
          channelId: c.authorChannelId || undefined,
          thumbnail: c.authorThumb || undefined,
          isChannelOwner: false,
          isMember: false,
        },
        content: c.content,
        publishedTime: getRelativeTimeString(c.publishedAt),
        timestamp: c.timestamp || undefined,
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

interface AccountResult {
  channelId: string;
  authorName: string;
  authorThumb: string | null;
  count: number;
}
