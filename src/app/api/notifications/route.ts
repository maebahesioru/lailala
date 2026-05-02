import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { markNotificationsAsRead } from "@/lib/notifications";

// GET: fetch notifications
export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // 'all' | 'mentions'
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
  const offset = parseInt(searchParams.get("offset") || "0", 10);
  const videoId = searchParams.get("videoId");

  try {
    const where: any = { userId };
    if (type === "mentions") {
      where.type = { in: ["reply", "mention"] };
    }
    if (videoId) {
      where.videoId = videoId;
    } else {
      // Default: filter to the main video only
      where.videoId = "niKAylKNIEI";
    }

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({
        where,
        orderBy: { createdAt: "desc" },
        take: limit,
        skip: offset,
      }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    return NextResponse.json({ notifications, total, unreadCount });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// PATCH: mark as read
export async function PATCH(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = await rateLimit(`notification-patch:${userId}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { notificationIds, all } = body;

    if (all) {
      await markNotificationsAsRead(userId);
    } else if (Array.isArray(notificationIds) && notificationIds.length > 0) {
      await markNotificationsAsRead(userId, notificationIds);
    }

    const unreadCount = await prisma.notification.count({ where: { userId, isRead: false } });
    return NextResponse.json({ success: true, unreadCount });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

// DELETE: remove notifications
export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const limit = await rateLimit(`notification-delete:${userId}`, 10, 60);
  if (!limit.success) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }

  try {
    const body = await req.json();
    const { notificationIds, all } = body;

    if (all) {
      await prisma.notification.deleteMany({ where: { userId } });
    } else if (Array.isArray(notificationIds) && notificationIds.length > 0) {
      await prisma.notification.deleteMany({
        where: { userId, id: { in: notificationIds } },
      });
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
