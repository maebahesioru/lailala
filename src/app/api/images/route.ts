import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";
import { rateLimit } from "@/lib/rate-limit";
import { internalError } from "@/lib/api-error";
import { MAX_IMAGES_PER_COMMENT, MAX_UPLOAD_BYTES, sniffImage } from "@/lib/uploads";
import { channelIdsOfUser, ownsComment } from "@/lib/user-channels";

export const runtime = "nodejs";

type ImageRow = { id: string; commentId: string; size: number; mimeType: string };

function toDto(row: ImageRow) {
  return { id: row.id, commentId: row.commentId, url: `/api/images/${row.id}/`, mimeType: row.mimeType, size: row.size };
}

// コメントに紐付いた画像の一覧
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const commentId = searchParams.get("commentId")?.trim();
  if (!commentId) {
    return NextResponse.json({ error: "commentId が必要です。" }, { status: 400 });
  }
  try {
    const userId = await getSessionUserId();
    const rows = await prisma.commentImage.findMany({
      where: { commentId },
      orderBy: { createdAt: "asc" },
      take: 20,
      select: { id: true, commentId: true, size: true, mimeType: true, userId: true },
    });
    return NextResponse.json({
      images: rows.map((r) => ({ ...toDto(r), mine: !!userId && r.userId === userId })),
    });
  } catch (e) {
    return internalError("api/images", e);
  }
}

// 画像のアップロード（ログインユーザーのみ・1コメント3枚まで）
export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }

  const limit = await rateLimit(`image-upload:${userId}`, 10, 600);
  if (!limit.success) {
    return NextResponse.json(
      { error: "画像のアップロードが多すぎます。しばらく待ってから再試行してください。" },
      { status: 429, headers: { "Retry-After": String(Math.max(1, limit.reset)) } }
    );
  }

  try {
    const form = await req.formData();
    const file = form.get("file");
    const commentId = String(form.get("commentId") ?? "").trim();
    if (!commentId) {
      return NextResponse.json({ error: "commentId が必要です。" }, { status: 400 });
    }
    if (!(file instanceof File)) {
      return NextResponse.json({ error: "画像ファイルが指定されていません。" }, { status: 400 });
    }
    if (file.size > MAX_UPLOAD_BYTES) {
      return NextResponse.json({ error: "画像は 3MB までです。" }, { status: 413 });
    }

    const buf = Buffer.from(await file.arrayBuffer());
    const sig = sniffImage(buf);
    if (!sig) {
      return NextResponse.json(
        { error: "画像ファイル（png / jpeg / webp / gif）を指定してください。" },
        { status: 415 }
      );
    }

    const comment = await prisma.commentCache.findUnique({
      where: { commentId },
      select: { commentId: true, authorChannelId: true },
    });
    if (!comment) {
      return NextResponse.json({ error: "対象のコメントが見つかりません。" }, { status: 404 });
    }

    // 画像を付けられるのは自分のコメントだけ。
    // （以前は誰でも他人のコメントに画像を貼れてしまっていた）
    const myChannels = await channelIdsOfUser(userId);
    if (!ownsComment(myChannels, comment.authorChannelId)) {
      return NextResponse.json(
        { error: "画像を添付できるのは自分のコメントだけです。" },
        { status: 403 }
      );
    }

    const existing = await prisma.commentImage.count({ where: { commentId } });
    if (existing >= MAX_IMAGES_PER_COMMENT) {
      return NextResponse.json(
        { error: `1つのコメントに添付できる画像は ${MAX_IMAGES_PER_COMMENT} 枚までです。` },
        { status: 400 }
      );
    }

    // 画像は DB（bytea）に保存する。コンテナのボリュームは権限の問題で書けず、
    // またホスト側に書き出すと再デプロイで消えるため。
    const row = await prisma.commentImage.create({
      data: { commentId, userId, data: new Uint8Array(buf), mimeType: sig.mime, size: buf.length },
      select: { id: true, commentId: true, size: true, mimeType: true },
    });
    return NextResponse.json({ image: toDto(row) }, { status: 201 });
  } catch (e) {
    return internalError("api/images", e);
  }
}

// 自分が添付した画像の削除
export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }
  try {
    const body = await req.json().catch(() => ({}));
    const id = typeof body?.id === "string" ? body.id : "";
    if (!id) {
      return NextResponse.json({ error: "id が必要です。" }, { status: 400 });
    }
    const row = await prisma.commentImage.findUnique({ where: { id }, select: { userId: true } });
    if (!row) {
      return NextResponse.json({ error: "画像が見つかりません。" }, { status: 404 });
    }
    if (row.userId !== userId) {
      return NextResponse.json({ error: "この画像を削除する権限がありません。" }, { status: 403 });
    }
    await prisma.commentImage.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (e) {
    return internalError("api/images", e);
  }
}
