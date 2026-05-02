import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  const page = parseInt(searchParams.get("page") || "1", 10);
  const limit = Math.min(parseInt(searchParams.get("limit") || "20", 10), 50);
  const type = searchParams.get("type") || "all"; // 'comment' | 'reply' | 'likes' | 'dislikes' | 'bookmarks'

  if (!channelId) {
    return NextResponse.json({ error: "channelId required" }, { status: 400 });
  }

  try {
    const skip = (page - 1) * limit;

    // For likes/dislikes/bookmarks, we need the user's internal ID
    let userId: string | null = null;
    if (["likes", "dislikes", "bookmarks"].includes(type)) {
      const user = await prisma.user.findFirst({ where: { channelId }, select: { id: true } });
      if (!user) {
        return NextResponse.json({ comments: [], total: 0, page, totalPages: 0 });
      }
      userId = user.id;
    }

    if (type === "likes" || type === "dislikes") {
      const [likes, total] = await Promise.all([
        prisma.commentLike.findMany({
          where: { userId: userId!, type: type === "likes" ? "like" : "dislike" },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.commentLike.count({ where: { userId: userId!, type: type === "likes" ? "like" : "dislike" } }),
      ]);

      // Fetch comment details from cache
      const commentIds = likes.map((l) => l.commentId);
      const cachedComments = await prisma.commentCache.findMany({
        where: { commentId: { in: commentIds } },
      });
      const commentMap = new Map(cachedComments.map((c) => [c.commentId, c]));

      const comments = likes.map((l) => {
        const c = commentMap.get(l.commentId);
        return {
          commentId: l.commentId,
          videoId: l.videoId,
          authorName: c?.authorName || "Unknown",
          authorChannelId: c?.authorChannelId || null,
          authorThumb: c?.authorThumb || null,
          content: c?.content || "",
          likeCount: c?.likeCount || 0,
          replyCount: c?.replyCount || 0,
          publishedAt: c?.publishedAt || l.createdAt,
        };
      });

      return NextResponse.json({ comments, total, page, totalPages: Math.ceil(total / limit) });
    }

    if (type === "bookmarks") {
      const [bookmarks, total] = await Promise.all([
        prisma.bookmark.findMany({
          where: { userId: userId! },
          orderBy: { createdAt: "desc" },
          skip,
          take: limit,
        }),
        prisma.bookmark.count({ where: { userId: userId! } }),
      ]);

      const comments = bookmarks.map((b) => ({
        commentId: b.commentId,
        videoId: b.videoId,
        authorName: b.authorName,
        authorChannelId: null,
        authorThumb: b.authorThumb,
        content: b.content,
        likeCount: parseInt(b.likeCount, 10) || 0,
        replyCount: parseInt(b.replyCount, 10) || 0,
        publishedAt: b.createdAt,
      }));

      return NextResponse.json({ comments, total, page, totalPages: Math.ceil(total / limit) });
    }

    // Default: comments / replies from commentCache
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
