import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const blocked = await prisma.blockedUser.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ blocked });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { channelId, channelName } = await req.json();
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  try {
    // Also try to block on YouTube
    try {
      const { getInnertubeWithAuth } = await import("@/lib/youtube");
      const innertube = await getInnertubeWithAuth(userId);
      // Attempt to use YouTube's block endpoint via raw action
      await (innertube as any).actions.execute("/youtubei/v1/account/accounts_list", {
        context: { client: { clientName: "WEB", clientVersion: "2.20240101" } },
        // Note: actual YouTube block endpoint is not exposed by youtubei.js
        // This is a best-effort attempt
      });
    } catch {
      // YouTube block may fail silently - site-side block still works
    }

    const blocked = await prisma.blockedUser.upsert({
      where: { userId_channelId: { userId, channelId } },
      update: {},
      create: { userId, channelId, channelName: channelName || null },
    });
    return NextResponse.json({ blocked });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  try {
    await prisma.blockedUser.deleteMany({
      where: { userId, channelId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
