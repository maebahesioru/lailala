/**
 * サイトの正規URL。
 *
 * 旧ドメイン `lailala.hikamer.f5.si` は f5.si 側のドメイン停止に伴い失効したため、
 * 2026-10-28 に `lailala.hikamers.app` へ移行した。
 * OGP / canonical / JSON-LD / sitemap / robots は必ずここを参照すること
 * （旧ドメインを直書きすると、共有カードや検索インデックスが死んだホストを指す）。
 *
 * 上書きしたい場合は環境変数 `NEXT_PUBLIC_SITE_URL` を設定する。
 */
const FALLBACK_SITE_URL = "https://lailala.hikamers.app";

function normalize(url: string): string {
  return url.replace(/\/+$/, "");
}

export const SITE_URL = normalize(
  process.env.NEXT_PUBLIC_SITE_URL?.trim() || FALLBACK_SITE_URL,
);
