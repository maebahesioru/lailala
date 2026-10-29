import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";

export async function POST(_req: NextRequest) {
  // DB を書き換える管理用処理のため、未ログインでは実行させない
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const users = await prisma.user.findMany({
      where: {
        OR: [
          { channelId: null },
          { channelId: "" },
        ],
      },
      select: {
        id: true,
        email: true,
        selectedAccountId: true,
      },
    });

    let fixed = 0;
    for (const user of users) {
      let channelId: string | null = null;

      if (user.selectedAccountId) {
        channelId = user.selectedAccountId;
      } else if (user.email?.startsWith("yt:")) {
        channelId = user.email.slice(3);
      } else {
        const cred = await prisma.ytCredential.findFirst({
          where: { userId: user.id },
          select: { accountChannelId: true },
        });
        if (cred?.accountChannelId) channelId = cred.accountChannelId;
      }

      if (channelId) {
        await prisma.user.update({
          where: { id: user.id },
          data: { channelId },
        });
        fixed++;
      }
    }

    return NextResponse.json({ fixed, total: users.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
