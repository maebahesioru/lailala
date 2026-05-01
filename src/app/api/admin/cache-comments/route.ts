import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const { videoId, max = 100 } = await req.json();
  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "TOP_COMMENTS");
    let count = 0;

    const saveBatch = async (batch: any[]) => {
      for (const thread of batch) {
        const c = thread.comment;
        if (!c) continue;
        const likeCount = parseInt((c.like_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
        const replyCount = parseInt((c.reply_count || "0").replace(/[^0-9]/g, ""), 10) || 0;
        await prisma.commentCache.upsert({
          where: { commentId: c.comment_id },
          update: {
            content: c.content?.text || "",
            likeCount,
            replyCount,
            authorName: c.author?.name?.text || "Unknown",
            authorChannelId: c.author?.id || null,
            authorThumb: c.author?.thumbnails?.[0]?.url,
          },
          create: {
            commentId: c.comment_id,
            videoId,
            content: c.content?.text || "",
            likeCount,
            replyCount,
            authorName: c.author?.name?.text || "Unknown",
            authorChannelId: c.author?.id || null,
            authorThumb: c.author?.thumbnails?.[0]?.url,
            publishedAt: new Date(),
          },
        });
        count++;
      }
    };

    await saveBatch(comments.contents);

    while (comments.has_continuation && count < max) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    return NextResponse.json({ success: true, cached: count });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
