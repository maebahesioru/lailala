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

    // If user has UUID as channelId, try to fix it from YouTube
    let fixedChannelId = user?.channelId || null;
    if (fixedChannelId && /^[0-9a-f-]+$/.test(fixedChannelId)) {
      try {
        const { getInnertubeWithAuth } = await import("@/lib/youtube");
        const innertube = await getInnertubeWithAuth(userId);
        const info = await innertube.account.getInfo();
        const page = (info as any).page;
        const sections = page?.contents?.array?.();
        if (sections) {
          for (const section of sections) {
            const footers = section?.footers;
            if (footers) {
              for (const footer of footers) {
                const cid = footer?.endpoint?.payload?.browseEndpoint?.browseId;
                if (cid && cid.startsWith("UC")) {
                  fixedChannelId = cid;
                  await prisma.user.update({ where: { id: userId }, data: { channelId: cid } });
                  break;
                }
              }
            }
            if (fixedChannelId && fixedChannelId.startsWith("UC")) break;
          }
        }
      } catch {}
    }

    let cachedComments: any[] = [];
    if (fixedChannelId?.startsWith("UC")) {
      // Only if we have a real UC channel ID (not UUID)
      const cache = await prisma.commentCache.findMany({
        where: { authorChannelId: fixedChannelId, videoId: "niKAylKNIEI" },
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
