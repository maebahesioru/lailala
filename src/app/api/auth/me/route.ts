import { NextResponse } from "next/server";
import { getCurrentUser, destroySession } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const user = await getCurrentUser();
  if (!user) {
    return NextResponse.json({ user: null }, { status: 401 });
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
