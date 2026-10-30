import { NextRequest, NextResponse } from "next/server";
import { internalError } from "@/lib/api-error";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  try {
    const posts = await prisma.scheduledPost.findMany({
      where: {
        userId,
        posted: false,
        ...(videoId ? { videoId } : {}),
      },
      orderBy: { scheduledAt: "asc" },
    });
    return NextResponse.json({ posts });
  } catch (e: any) {
    return internalError("api/scheduled-posts", e);
  }
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }

  const limit = await rateLimit(`schedule:${userId}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const scheduledAt = new Date(body.scheduledAt);
    if (isNaN(scheduledAt.getTime()) || scheduledAt <= new Date()) {
      return NextResponse.json({ error: "未来の日時を指定してください" }, { status: 400 });
    }

    const videoId = typeof body.videoId === "string" ? body.videoId.trim() : "";
    const text = typeof body.text === "string" ? body.text.trim() : "";
    // 返信の予約投稿では親コメントIDを受け取る（未指定なら通常のコメント投稿）。
    const parentCommentId =
      typeof body.parentCommentId === "string" && body.parentCommentId.trim().length > 0
        ? body.parentCommentId.trim()
        : null;

    if (!videoId) {
      return NextResponse.json({ error: "動画IDが必要です。" }, { status: 400 });
    }
    if (!text) {
      return NextResponse.json({ error: "本文を入力してください。" }, { status: 400 });
    }
    if (text.length > 5000) {
      return NextResponse.json({ error: "本文は5000文字以内にしてください。" }, { status: 400 });
    }

    const post = await prisma.scheduledPost.create({
      data: {
        userId,
        videoId,
        text,
        parentCommentId,
        scheduledAt,
      },
    });
    return NextResponse.json({ post });
  } catch (e: any) {
    return internalError("api/scheduled-posts", e);
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }

  const limit = await rateLimit(`schedule-delete:${userId}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "リクエストが多すぎます。しばらく待ってから再試行してください。" }, { status: 429 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) {
    return NextResponse.json({ error: "id が必要です。" }, { status: 400 });
  }

  try {
    await prisma.scheduledPost.deleteMany({
      where: { id, userId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return internalError("api/scheduled-posts", e);
  }
}
