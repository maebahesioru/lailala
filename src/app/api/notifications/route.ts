import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";
import { rateLimit } from "@/lib/rate-limit";
import { markNotificationsAsRead } from "@/lib/notifications";

// GET: fetch notifications (app + YouTube)
export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type"); // 'all' | 'mentions'
  const limit = Math.min(parseInt(searchParams.get("limit") || "50", 10), 100);
  const offset = parseInt(searchParams.get("offset") || "0", 10);

  try {
    const where: any = { userId };
    if (type === "mentions") {
      where.type = { in: ["reply", "mention"] };
    }

    const [notifications, total, unreadCount] = await Promise.all([
      prisma.notification.findMany({ where, orderBy: { createdAt: "desc" }, take: limit, skip: offset }),
      prisma.notification.count({ where: { userId } }),
      prisma.notification.count({ where: { userId, isRead: false } }),
    ]);

    // Fetch YouTube replies from CommentCache (works without YouTube API)
    const youtubeNotifications: any[] = [];
    try {
      const user = await prisma.user.findUnique({
        where: { id: userId },
        select: { channelId: true },
      });
      if (user?.channelId && /^UC/.test(user.channelId)) {
        // Find replies to this user's comments from the cache
        const replies = await prisma.$queryRaw<{
          comment_id: string; author_name: string; author_thumb: string | null;
          content: string; like_count: number; reply_count: number;
          published_at: Date; parent_comment_id: string; video_id: string;
        }[]>`
          SELECT c.comment_id, c.author_name, c.author_thumb, c.content,
                 c.like_count, c.reply_count, c.published_at, c.parent_comment_id, c.video_id
          FROM comment_cache c
          WHERE c.parent_comment_id IS NOT NULL
            AND c.video_id = 'niKAylKNIEI'
            AND c.parent_comment_id IN (
              SELECT comment_id FROM comment_cache
              WHERE author_channel_id = ${user.channelId} AND video_id = 'niKAylKNIEI'
            )
          ORDER BY c.published_at DESC
          LIMIT 20
        `;

        for (const r of replies) {
          youtubeNotifications.push({
            id: `reply_${r.comment_id}`,
            type: "reply",
            actorName: r.author_name,
            actorThumb: r.author_thumb,
            content: r.content,
            commentId: r.comment_id,
            videoId: r.video_id,
            createdAt: r.published_at.toISOString(),
            isRead: false,
            source: "youtube",
          });
        }
      }
    } catch (e: any) {
      console.error(`[Notifications] CommentCache reply check failed: ${e.message}`);
    }

    return NextResponse.json({
      notifications,
      youtubeNotifications,
      total,
      unreadCount: unreadCount + youtubeNotifications.length,
    });
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
