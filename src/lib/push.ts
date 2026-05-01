import webpush from "web-push";
import { prisma } from "./prisma";

const vapidPublicKey = process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!;
const vapidPrivateKey = process.env.VAPID_PRIVATE_KEY!;
const vapidSubject = process.env.VAPID_SUBJECT || "mailto:admin@example.com";

webpush.setVapidDetails(vapidSubject, vapidPublicKey, vapidPrivateKey);

interface PushPayload {
  title: string;
  body: string;
  icon?: string;
  url?: string;
}

export async function sendPushNotification(userId: string, payload: PushPayload) {
  const subs = await prisma.pushSubscription.findMany({ where: { userId } });
  if (!subs.length) return;

  const data = JSON.stringify(payload);
  const results = await Promise.allSettled(
    subs.map((sub) =>
      webpush.sendNotification(
        {
          endpoint: sub.endpoint,
          keys: {
            p256dh: sub.p256dh,
            auth: sub.auth,
          },
        },
        data
      )
    )
  );

  // Remove invalid subscriptions
  const toDelete: string[] = [];
  results.forEach((result, i) => {
    if (result.status === "rejected") {
      const err = result.reason as webpush.WebPushError;
      if (err.statusCode === 410 || err.statusCode === 404) {
        toDelete.push(subs[i].endpoint);
      }
    }
  });

  if (toDelete.length) {
    await prisma.pushSubscription.deleteMany({
      where: { userId, endpoint: { in: toDelete } },
    });
  }
}

export { webpush };
