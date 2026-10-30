import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { destroySession, getSessionUserId } from "@/lib/session";
import { SITE_URL } from "@/lib/site-url";

async function signOut(): Promise<NextResponse> {
  const userId = await getSessionUserId();

  if (userId) {
    // セッションだけでなく、保存している YouTube の認証情報（暗号化トークン）も削除する。
    // 再ログインすれば取り直せるので、ログアウト時に残す理由がない。
    try {
      await prisma.ytCredential.deleteMany({ where: { userId } });
    } catch (error) {
      console.error("[api/auth/signout] failed to delete credentials:", error);
    }
  }

  await destroySession();
  return NextResponse.redirect(`${SITE_URL}/popular/`, 303);
}

// サイドバー / モバイルナビは window.location.href で遷移するので GET も受ける。
export async function GET() {
  return signOut();
}

export async function POST() {
  return signOut();
}
