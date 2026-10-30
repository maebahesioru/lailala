import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getSessionUserId } from "@/lib/session";

/**
 * 管理系エンドポイントの入口ガード。
 *
 * 以前は /api/admin/* に一切の認可が無く、未ログインの第三者が
 * コメントキャッシュ生成（YouTube 取得＋DB 書き込み）や
 * チャンネルID一括修復を外部から起動できてしまっていた。
 *
 * - 未ログイン: 401
 * - ADMIN_CHANNEL_IDS が設定済み: その中の channelId のみ許可（それ以外 403）
 * - ADMIN_CHANNEL_IDS 未設定: 403（fail closed。設定漏れで全ログインユーザーに開放しない）
 *
 * ガードを通った場合は null を返す。
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "ログインが必要です。" }, { status: 401 });
  }

  const allowList = (process.env.ADMIN_CHANNEL_IDS || "")
    .split(",")
    .map((id) => id.trim())
    .filter(Boolean);

  if (allowList.length === 0) {
    return NextResponse.json(
      { error: "管理用の設定がされていません（ADMIN_CHANNEL_IDS が未設定です）。" },
      { status: 403 }
    );
  }

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { channelId: true },
  });

  if (!user?.channelId || !allowList.includes(user.channelId)) {
    return NextResponse.json({ error: "Forbidden" }, { status: 403 });
  }

  return null;
}
