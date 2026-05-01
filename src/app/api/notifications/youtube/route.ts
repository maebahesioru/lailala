import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { getInnertubeWithAuth } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { createNotification } from "@/lib/notifications";

const VIDEO_ID = "niKAylKNIEI";

// GET: fetch YouTube notifications and sync to our DB
export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const innertube = await getInnertubeWithAuth(userId);
    const menu = await innertube.getNotifications();

    const ytNotifications: any[] = [];
    for (const n of menu.contents) {
      const data = (n as any);
      ytNotifications.push({
        id: data.notification_id,
        title: data.title?.text || "",
        shortMessage: data.short_message?.text || "",
        sentTime: data.sent_time?.text || "",
        thumbnail: data.thumbnail?.[0]?.url || null,
        videoThumbnail: data.video_thumbnail?.[0]?.url || null,
      });
    }

    // Also try to fetch unseen count
    let unseenCount = 0;
    try {
      unseenCount = await innertube.getUnseenNotificationsCount();
    } catch {}

    return NextResponse.json({ notifications: ytNotifications, unseenCount });
  } catch (e: any) {
    const msg = e.code === "YOUTUBE_AUTH_REQUIRED" ? "YouTube認証が必要です" : e.message || "Failed";
    return NextResponse.json({ error: msg }, { status: e.code === "YOUTUBE_AUTH_REQUIRED" ? 401 : 500 });
  }
}
