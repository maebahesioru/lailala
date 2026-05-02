import { NextResponse } from "next/server";
import { getCurrentUser, destroySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  let user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  // Auto-fix legacy users missing channelId or selectedAccountId
  if (!user.channelId || !user.selectedAccountId) {
    let channelId: string | null = null;
    if (user.selectedAccountId) {
      channelId = user.selectedAccountId;
    } else if (user.email?.startsWith("yt:")) {
      channelId = user.email.slice(3);
    } else {
      const cred = await prisma.ytCredential.findFirst({
        where: { userId: user.id },
        select: { accountChannelId: true },
        orderBy: { updatedAt: "desc" },
      });
      if (cred?.accountChannelId) channelId = cred.accountChannelId;
    }

    if (channelId) {
      const data: any = {};
      if (!user.channelId) data.channelId = channelId;
      if (!user.selectedAccountId) data.selectedAccountId = channelId;
      user = await prisma.user.update({
        where: { id: user.id },
        data,
      });
    }
  }

  const accounts = await prisma.ytCredential.findMany({
    where: { userId: user.id },
    select: { id: true, accountName: true, accountThumb: true, accountChannelId: true },
    orderBy: { updatedAt: "desc" },
  });

  return NextResponse.json({
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      image: user.image,
      channelId: user.channelId,
      selectedAccountId: user.selectedAccountId,
      accounts: accounts.map((a) => ({
        id: a.id,
        name: a.accountName || "YouTube User",
        image: a.accountThumb,
        channelId: a.accountChannelId,
      })),
    },
  });
}

export async function POST() {
  await destroySession();
  return NextResponse.json({ success: true });
}
