import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Get app actions
    const actions = await prisma.userAction.findMany({
      where: { userId, actionType: { in: ["comment", "reply"] } },
      orderBy: { createdAt: "desc" },
      take: 100,
    });

    // Also get YouTube-native comments from cache
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { channelId: true },
    });

    let cachedComments: any[] = [];
    if (user?.channelId && !user.channelId.includes("-")) {
      // Only if we have a real UC channel ID (not UUID)
      const cache = await prisma.commentCache.findMany({
        where: { authorChannelId: user.channelId, videoId: "niKAylKNIEI" },
        orderBy: { publishedAt: "desc" },
        take: 100,
      });
      cachedComments = cache.map(c => ({
        id: `cache_${c.commentId}`,
        videoId: c.videoId,
        commentId: c.commentId,
        actionType: (c as any).parentCommentId ? "reply" : "comment",
        content: c.content,
        createdAt: c.publishedAt.toISOString(),
      }));
    }

    // Merge and sort by date
    const allActions = [...actions, ...cachedComments]
      .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
      .slice(0, 100);

    return NextResponse.json({ actions: allActions });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
