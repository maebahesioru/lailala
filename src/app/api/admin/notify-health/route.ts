import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { internalError } from "@/lib/api-error";

export const dynamic = "force-dynamic";

/**
 * 通知の取りこぼし調査用の読み取り専用メトリクス（管理のみ）。
 */
export async function GET() {
  const denied = await requireAdmin();
  if (denied) return denied;

  try {
    const [
      notificationByType, actionByType, usersTotal, usersNoChannel, usersLegacyEmail, replyOff, settingsByPref,
      commentLikes, bookmarks, notificationsTotal, recentActions,
    ] = await Promise.all([
        prisma.notification.groupBy({ by: ["type"], _count: { _all: true } }),
        prisma.userAction.groupBy({ by: ["actionType"], _count: { _all: true } }),
        prisma.user.count(),
        prisma.user.count({ where: { channelId: null } }),
        prisma.user.count({ where: { email: { contains: "yt:" } } }),
        prisma.user.count({ where: { notifyReplies: false } }),
        prisma.notificationSetting.groupBy({ by: ["preference"], _count: { _all: true } }),
        prisma.commentLike.count(),
        prisma.bookmark.count(),
        prisma.notification.count(),
        prisma.userAction.findMany({ orderBy: { createdAt: "desc" }, take: 5, select: { actionType: true, createdAt: true } }),
      ]);

    return NextResponse.json({
      notifications: Object.fromEntries(notificationByType.map((r) => [r.type, r._count._all])),
      userActions: Object.fromEntries(actionByType.map((r) => [r.actionType, r._count._all])),
      users: {
        total: usersTotal,
        channelIdNull: usersNoChannel,
        legacyEmail: usersLegacyEmail,
        replyNotificationsOff: replyOff,
      },
      notificationSettings: Object.fromEntries(settingsByPref.map((r) => [r.preference, r._count._all])),
      totals: { notificationsTotal, commentLikes, bookmarks },
      recentActions,
    });
  } catch (e) {
    return internalError("api/admin/notify-health", e);
  }
}
