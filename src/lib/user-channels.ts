import { prisma } from "@/lib/prisma";

/**
 * ログインユーザーに紐づく YouTube チャンネルID（UC…）の一覧。
 *
 * `User.channelId` / `YtCredential.accountChannelId` にはログイン経路の都合で
 * UUID が入っていることがあり、素直には引けない。そのため
 * ①`replyWatchChannelId`（本人が登録した値）
 * ②`ytCredential.accountChannelId`
 * ③投稿記録（user_actions × comment_cache）
 * ④表示名一致（comment_cache）
 * の順に、UC… 形式のものだけを集める。
 */
export async function channelIdsOfUser(userId: string): Promise<string[]> {
  const ids = new Set<string>();

  const me = await prisma.user.findUnique({
    where: { id: userId },
    select: { replyWatchChannelId: true, name: true },
  });
  const watch = (me?.replyWatchChannelId || "").trim();
  if (watch.startsWith("UC")) ids.add(watch);

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
      FROM user_actions a
      JOIN comment_cache c ON c.comment_id = a.comment_id
      WHERE a.user_id = ${userId}
        AND a.action_type = 'comment'
        AND c.author_channel_id LIKE 'UC%'
      LIMIT 5
    `;
    for (const r of rows) if (r.channel_id) ids.add(r.channel_id);
  }

  if (ids.size === 0) {
    const name = (me?.name || "").trim();
    if (name.length >= 2) {
      const rows = await prisma.$queryRaw<Array<{ channel_id: string | null }>>`
        SELECT author_channel_id AS channel_id
        FROM comment_cache
        WHERE author_name = ${name}
          AND author_channel_id LIKE 'UC%'
        GROUP BY author_channel_id
        ORDER BY COUNT(*) DESC
        LIMIT 1
      `;
      for (const r of rows) if (r.channel_id) ids.add(r.channel_id);
    }
  }

  return [...ids];
}

/** そのコメントをこのユーザーが書いたものとして扱えるか。 */
export function ownsComment(channelIds: Iterable<string>, commentAuthorChannelId?: string | null): boolean {
  const author = (commentAuthorChannelId || "").trim();
  if (!author.startsWith("UC")) return false;
  for (const id of channelIds) if (id === author) return true;
  return false;
}
