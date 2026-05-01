import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = await rateLimit(`delete:${userId}`, 10, 60);
  if (!limit.success) return NextResponse.json({ error: "Rate limit exceeded" }, { status: 429 });

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const commentId = searchParams.get("commentId");
  if (!videoId || !commentId) return NextResponse.json({ error: "Invalid query" }, { status: 400 });

  try {
    const innertube = await getInnertubeWithAuth(userId);
    await (innertube as any).actions.execute("/comment/perform_comment_action", {
      action: "DELETE",
      targetId: commentId,
    });

    await prisma.userAction.create({
      data: { userId, videoId, commentId, actionType: "delete" },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : e.message || "Failed to delete";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}
