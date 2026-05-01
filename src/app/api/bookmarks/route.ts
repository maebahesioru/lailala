import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get("folderId");

  try {
    const bookmarks = await prisma.bookmark.findMany({
      where: { userId, ...(folderId ? { folderId } : { folderId: null }) },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ bookmarks });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();

    // Folder move only: no videoId means updating existing bookmark
    if (body.folderId !== undefined && body.videoId === undefined) {
      await prisma.bookmark.updateMany({
        where: { userId, commentId: body.commentId },
        data: { folderId: body.folderId || null },
      });
      return NextResponse.json({ action: "moved" });
    }

    const bookmark = await prisma.bookmark.upsert({
      where: {
        userId_commentId: {
          userId,
          commentId: body.commentId,
        },
      },
      update: {
        folderId: body.folderId || null,
      },
      create: {
        userId,
        folderId: body.folderId || null,
        commentId: body.commentId,
        videoId: body.videoId,
        authorName: body.authorName,
        authorThumb: body.authorThumb,
        content: body.content,
        likeCount: body.likeCount,
        replyCount: body.replyCount,
        publishedTime: body.publishedTime,
      },
    });
    return NextResponse.json({ bookmark, action: "added" });
  } catch (e: any) {
    console.error("[Bookmarks POST]", e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId");
  if (!commentId) {
    return NextResponse.json({ error: "commentId required" }, { status: 400 });
  }

  try {
    await prisma.bookmark.deleteMany({
      where: { userId, commentId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
