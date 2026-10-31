/**
 * 画面に出す「@ハンドル」を決める。
 *
 * YouTube ログインのユーザーは内部IDを `email = "yt:<channelId or UUID>"` に
 * 入れているため、そのまま表示すると `@yt:16cda6bb-...` のような内部IDが
 * 画面に出てしまう。表示用に整形し、出せるものが無ければ null を返す。
 */
export function displayHandle(user?: {
  name?: string | null;
  email?: string | null;
  channelId?: string | null;
} | null): string | null {
  if (!user) return null;
  const email = (user.email ?? "").trim();
  if (email && !email.startsWith("yt:")) {
    // 通常のメールアドレスなら @ローカル部
    return `@${email.split("@")[0]}`;
  }
  if (user.channelId && user.channelId.startsWith("UC")) {
    return `@${user.channelId}`;
  }
  if (user.name) {
    return `@${user.name.trim().replace(/\s+/g, "_")}`;
  }
  return null;
}
