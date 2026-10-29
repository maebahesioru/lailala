import { threadPath } from "@/lib/thread-url";
import { prisma } from "./prisma";
import { sendPushNotification } from "./push";

export type NotificationType = "like" | "dislike" | "reply" | "bookmark" | "mention" | "youtube";

interface CreateNotificationParams {
  recipientChannelId: string;
  type: NotificationType;
  actorName: string;
  actorChannelId?: string;
  actorThumb?: string;
  commentId?: string;
  videoId: string;
  content?: string;
  /** 同じ相手・同じ対象への通知をこの期間内は重複して作らない（ミリ秒） */
  dedupeWindowMs?: number;
}

const TYPE_LABELS: Record<NotificationType, string> = {
  like: "いいね",
  dislike: "低評価",
  reply: "返信",
  bookmark: "ブックマーク",
  mention: "メンション",
  youtube: "YouTube",
};

/**
 * Create a notification for a user.
 * Respects user's notification settings and privacy preferences.
 */
export async function createNotification(params: CreateNotificationParams) {
  // Find user by channelId
  let user = await prisma.user.findFirst({
    where: { channelId: params.recipientChannelId },
    select: {
      id: true, name: true,
      notifyLikes: true, notifyDislikes: true, notifyBookmarks: true, notifyReplies: true,
      pushNotifyLikes: true, pushNotifyDislikes: true, pushNotifyBookmarks: true, pushNotifyReplies: true, pushNotifyMentions: true,
    },
  });

  // Fallback for legacy users whose channelId wasn't saved on login
  if (!user && params.recipientChannelId) {
    user = await prisma.user.findFirst({
      where: { email: `yt:${params.recipientChannelId}` },
      select: {
        id: true, name: true,
        notifyLikes: true, notifyDislikes: true, notifyBookmarks: true, notifyReplies: true,
        pushNotifyLikes: true, pushNotifyDislikes: true, pushNotifyBookmarks: true, pushNotifyReplies: true, pushNotifyMentions: true,
      },
    });
  }

  if (!user) return null;

  // 同一の操作を繰り返したときの通知スパムを防ぐ（例: いいねの付け外し）。
  if (params.dedupeWindowMs && params.actorChannelId && params.commentId) {
    const existing = await prisma.notification.findFirst({
      where: {
        userId: user.id,
        type: params.type,
        actorChannelId: params.actorChannelId,
        commentId: params.commentId,
        createdAt: { gte: new Date(Date.now() - params.dedupeWindowMs) },
      },
      select: { id: true },
    });
    if (existing) return null;
  }

  // Check per-type notification privacy settings (in-app)
  if (params.type === "like" && !user.notifyLikes) return null;
  if (params.type === "dislike" && !user.notifyDislikes) return null;
  if (params.type === "bookmark" && !user.notifyBookmarks) return null;
  if (params.type === "reply" && !user.notifyReplies) return null;

  // Check notification settings (channel-specific)
  const setting = await prisma.notificationSetting.findUnique({
    where: {
      userId_channelId: {
        userId: user.id,
        channelId: params.actorChannelId || "",
      },
    },
  });

  const preference = setting?.preference || "all";
  if (preference === "none") return null;
  if (preference === "mentions" && params.type !== "reply" && params.type !== "mention") return null;

  const notification = await prisma.notification.create({
    data: {
      userId: user.id,
      type: params.type,
      actorName: params.actorName,
      actorChannelId: params.actorChannelId,
      actorThumb: params.actorThumb,
      commentId: params.commentId,
      videoId: params.videoId,
      content: params.content?.slice(0, 500),
    },
  });

  // Check per-type push notification settings
  const shouldPush =
    (params.type === "like" && user.pushNotifyLikes) ||
    (params.type === "dislike" && user.pushNotifyDislikes) ||
    (params.type === "bookmark" && user.pushNotifyBookmarks) ||
    (params.type === "reply" && user.pushNotifyReplies) ||
    (params.type === "mention" && user.pushNotifyMentions) ||
    params.type === "youtube";

  if (shouldPush) {
    const pushBody = params.content
      ? `${params.actorName}さんが${TYPE_LABELS[params.type]}しました\n${params.content.slice(0, 100)}`
      : `${params.actorName}さんが${TYPE_LABELS[params.type]}しました`;

    await sendPushNotification(user.id, {
      title: `Lailala - ${TYPE_LABELS[params.type]}`,
      body: pushBody,
      icon: params.actorThumb || "/icon-192x192.png",
      url: params.commentId ? threadPath(params.commentId) : `/`,
    }).catch(() => {});
  }

  return notification;
}

/**
 * Get notification count for a user.
 */
export async function getUnreadNotificationCount(userId: string): Promise<number> {
  return prisma.notification.count({
    where: { userId, isRead: false },
  });
}

/**
 * Mark notifications as read.
 */
export async function markNotificationsAsRead(userId: string, notificationIds?: string[]) {
  const where: any = { userId };
  if (notificationIds?.length) {
    where.id = { in: notificationIds };
  }
  return prisma.notification.updateMany({
    where,
    data: { isRead: true },
  });
}
