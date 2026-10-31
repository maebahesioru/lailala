import { prisma } from "@/lib/prisma";

/**
 * 「YouTube 側で付いた返信」を通知にするワーカー。
 *
 * これまでの通知はアプリ内の操作（いいね・返信）でしか作られなかったため、
 * YouTube 上で自分のコメントに返信が付いてもサイトには何も出なかった。
 * 同期済みの comment_cache には parentCommentId と投稿者IDが入っているので、
 * 「自分のチャンネルが投稿したコメントへの返信」を DB から直接拾える。
 */

/** 返信を拾う対象期間（日）。dedupeKey で重複は防ぐので毎回同じ範囲を走査してよい。 */
const WINDOW_DAYS = 14;
const MAX_PER_RUN = 30;
const INTERVAL_MS = 5 * 60 * 1000;
const START_DELAY_MS = 60 * 1000;

type CandidateRow = {
  comment_id: string;
  video_id: string;
  parent_comment_id: string | null;
  content: string | null;
  author_name: string | null;
  author_channel_id: string | null;
  author_thumb: string | null;
  published_at: Date | null;
  parent_content: string | null;
};

/**
 * 通知の宛先ユーザーごとに、自分の YouTube チャンネルID（UC…）を集める。
 *
 * 注意: YtCredential.accountChannelId は UC… でないことがある（ログイン時に
 * YouTube のチャンネルIDを取れず sessionId の UUID を保存してしまう経路がある）。
 * そのため「サイトから投稿したコメントの author_channel_id」も突き合わせて補完する。
 */
async function channelIdsOfUser(userId: string): Promise<string[]> {
  const ids = new Set<string>();

  const creds = await prisma.ytCredential.findMany({
    where: { userId },
    select: { accountChannelId: true },
  });
  for (const c of creds) {
    const id = (c.accountChannelId || "").trim();
    if (id.startsWith("UC")) ids.add(id);
  }

  if (ids.size === 0) {
    const rows = await prisma.$queryRaw<Array<{ channel_id: string | null }>>`
      SELECT DISTINCT c.author_channel_id AS channel_id
      FROM user_action a
      JOIN comment_cache c ON c.comment_id = a.comment_id
      WHERE a.user_id = ${userId}
        AND a.action_type = 'comment'
        AND c.author_channel_id LIKE 'UC%'
      LIMIT 5
    `;
    for (const r of rows) if (r.channel_id) ids.add(r.channel_id);
  }

  return [...ids];
}

/** 指定チャンネル宛の「他人からの返信」を新しい順に取る。 */
export async function findRepliesToChannel(channelId: string, limit = MAX_PER_RUN): Promise<CandidateRow[]> {
  const since = new Date(Date.now() - WINDOW_DAYS * 86_400_000);
  return prisma.$queryRaw<CandidateRow[]>`
    SELECT r.comment_id,
           r.video_id,
           r.parent_comment_id,
           r.content,
           r.author_name,
           r.author_channel_id,
           r.author_thumb,
           r.published_at,
           p.content AS parent_content
    FROM comment_cache r
    JOIN comment_cache p ON p.comment_id = r.parent_comment_id
    WHERE p.author_channel_id = ${channelId}
      AND r.author_channel_id IS NOT NULL
      AND r.author_channel_id <> ${channelId}
      AND r.published_at >= ${since}
    ORDER BY r.published_at DESC
    LIMIT ${limit}
  `;
}

export type ScanResult = {
  channelId: string;
  userId: string;
  candidates: number;
  created: number;
  sample?: { commentId: string; content: string | null; authorName: string | null };
};

/** 1ユーザーぶん走査して通知を作る。dryRun なら作らずに件数だけ返す。 */
export async function scanUserReplies(userId: string, dryRun = false): Promise<ScanResult[]> {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, notifyReplies: true },
  });
  if (!user) return [];

  const channels = await channelIdsOfUser(userId);
  const results: ScanResult[] = [];

  for (const channelId of channels) {
    const rows = await findRepliesToChannel(channelId);
    let created = 0;

    if (!dryRun && user.notifyReplies && rows.length > 0) {
      const data = rows.map((r) => ({
        userId,
        type: "reply",
        actorName: r.author_name || "Unknown",
        actorChannelId: r.author_channel_id,
        actorThumb: r.author_thumb,
        // 通知から開くのは「返信が付いた自分のコメント」のスレッド
        commentId: r.parent_comment_id,
        videoId: r.video_id,
        content: (r.content || "").slice(0, 500),
        // 同じ返信で二重に通知しない（DB のユニーク制約で保証）
        dedupeKey: `ytreply:${userId}:${r.comment_id}`,
      }));
      const res = await prisma.notification.createMany({ data, skipDuplicates: true });
      created = res.count;
    }

    results.push({
      channelId,
      userId,
      candidates: rows.length,
      created,
      sample: rows[0]
        ? { commentId: rows[0].comment_id, content: rows[0].content, authorName: rows[0].author_name }
        : undefined,
    });
  }
  return results;
}

let started = false;

/** 常駐ワーカー。instrumentation から起動する。 */
export function startYoutubeReplyNotifyWorker() {
  if (started) return;
  if (process.env.YOUTUBE_REPLY_NOTIFY_ENABLED === "false") return;
  started = true;

  const runOnce = async () => {
    try {
      const users = await prisma.user.findMany({
        where: { notifyReplies: true },
        select: { id: true },
        take: 200,
      });
      let total = 0;
      for (const u of users) {
        try {
          const res = await scanUserReplies(u.id);
          total += res.reduce((n, r) => n + r.created, 0);
        } catch (e) {
          console.warn(`[YtReplyNotify] skip user ${u.id}:`, e);
        }
      }
      if (total > 0) console.log(`[YtReplyNotify] created ${total} notification(s)`);
    } catch (e) {
      console.error("[YtReplyNotify] run failed:", e);
    }
  };

  setTimeout(runOnce, START_DELAY_MS);
  setInterval(runOnce, INTERVAL_MS);
  console.log("[YtReplyNotify] worker started (every 5min)");
}
