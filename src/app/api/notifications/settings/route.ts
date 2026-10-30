import { NextRequest, NextResponse } from "next/server";
import { internalError } from "@/lib/api-error";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

// GET: fetch notification setting for a channel
export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  try {
    const setting = await prisma.notificationSetting.findUnique({
      where: { userId_channelId: { userId, channelId } },
    });
    return NextResponse.json({ preference: setting?.preference || "all" });
  } catch (e: any) {
    return internalError("api/notifications/settings", e);
  }
}

// POST: update notification setting
export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const body = await req.json();
    const { channelId, preference } = body;
    if (!channelId || !preference || !["all", "mentions", "none"].includes(preference)) {
      return NextResponse.json({ error: "Invalid body" }, { status: 400 });
    }

    const setting = await prisma.notificationSetting.upsert({
      where: { userId_channelId: { userId, channelId } },
      update: { preference },
      create: { userId, channelId, preference },
    });

    return NextResponse.json({ setting });
  } catch (e: any) {
    return internalError("api/notifications/settings", e);
  }
}
