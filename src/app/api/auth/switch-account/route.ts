import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { channelId } = await req.json();
    if (!channelId) {
      return NextResponse.json({ error: "channelId required" }, { status: 400 });
    }

    // Verify the account belongs to this user
    const cred = await prisma.ytCredential.findFirst({
      where: { userId, accountChannelId: channelId },
    });
    if (!cred) {
      return NextResponse.json({ error: "Account not found" }, { status: 404 });
    }

    await prisma.user.update({
      where: { id: userId },
      data: { selectedAccountId: channelId },
    });

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
