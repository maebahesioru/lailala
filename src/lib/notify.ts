import { createNotification } from "@/lib/notifications";

type NotifyParams = Parameters<typeof createNotification>[0];

/**
 * 通知の作成を「本処理を壊さない」形で包む。
 *
 * これまでは `await createNotification(...)` を直接呼んでいたため、
 * 通知側で例外（DB エラー・ユニーク競合など）が出ると、YouTube 側では
 * 既に成功している「いいね」「返信」まで 500 で失敗したように見えていた。
 * また、作成できなかった理由がどこにも残らず「通知が来ない」の調査ができなかった。
 */
export async function safeNotify(params: NotifyParams): Promise<void> {
  try {
    const created = await createNotification(params);
    if (!created) {
      // 宛先がサイト未登録 / 設定でオフ / 重複排除 などで「静かに落ちる」ケース。
      // 返信だけは件数が少ないのでログに残す（いいねは量が多いので出さない）。
      if (params.type === "reply" || params.type === "mention") {
        console.log(
          `[notify] skipped type=${params.type} recipient=${params.recipientChannelId} comment=${params.commentId ?? "-"} (宛先未登録・設定オフ・重複のいずれか)`
        );
      }
    }
  } catch (e) {
    console.error(`[notify] failed type=${params.type} recipient=${params.recipientChannelId}`, e);
  }
}

/**
 * 旧ユーザーは `channelId` が空のまま `email: yt:<channelId>` だけを持つことがある。
 * 送信者側の channelId が無いと通知を丸ごと諦めていたので、そこを埋める。
 */
export function actorChannelIdOf(user: { channelId?: string | null; email?: string | null } | null): string | null {
  if (!user) return null;
  if (user.channelId) return user.channelId;
  if (user.email && user.email.startsWith("yt:")) return user.email.slice(3);
  return null;
}
