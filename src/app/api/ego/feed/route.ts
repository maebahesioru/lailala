import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { escapeLike } from "@/lib/like-escape";
import { internalError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

const PER_WORD = 20;
const MAX_ITEMS = 50;

export type EgoFeedItem = {
  commentId: string;
  videoId: string;
  word: string;
  content: string;
  authorName: string;
  authorThumb: string | null;
  likeCount: number;
  replyCount: number;
  publishedAt: string;
  isNew: boolean;
};

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const markSeen = searchParams.get("markSeen") === "1";

  try {
    const keywords = await prisma.egoKeyword.findMany({
      where: { userId },
      orderBy: { createdAt: "asc" },
    });
    if (keywords.length === 0) {
      return NextResponse.json({ items: [], keywords: [], unread: 0 });
    }

    const perWord = await Promise.all(
      keywords.map(async (keyword) => {
        const rows = await prisma.commentCache.findMany({
          where: { content: { contains: escapeLike(keyword.word), mode: "insensitive" } },
          orderBy: { publishedAt: "desc" },
          take: PER_WORD,
          select: {
            commentId: true,
            videoId: true,
            content: true,
            authorName: true,
            authorThumb: true,
            likeCount: true,
            replyCount: true,
            publishedAt: true,
          },
        });
        return rows.map<EgoFeedItem>((row) => ({
          commentId: row.commentId,
          videoId: row.videoId,
          word: keyword.word,
          content: row.content,
          authorName: row.authorName,
          authorThumb: row.authorThumb,
          likeCount: row.likeCount,
          replyCount: row.replyCount,
          publishedAt: row.publishedAt.toISOString(),
          isNew: keyword.lastSeenAt ? row.publishedAt > keyword.lastSeenAt : true,
        }));
      })
    );

    const seen = new Set<string>();
    const items: EgoFeedItem[] = [];
    for (const row of perWord.flat()) {
      if (seen.has(row.commentId)) continue;
      seen.add(row.commentId);
      items.push(row);
    }
    items.sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : -1));

    const trimmed = items.slice(0, MAX_ITEMS);
    const unread = trimmed.filter((item) => item.isNew).length;

    if (markSeen) {
      const now = new Date();
      await prisma.egoKeyword.updateMany({ where: { userId }, data: { lastSeenAt: now } });
    }

    return NextResponse.json({ items: trimmed, unread, keywords });
  } catch (e) {
    return internalError("api/ego/feed", e);
  }
}
