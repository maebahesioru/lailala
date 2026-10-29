/**
 * YouTube の「いいね数」「返信数」文字列を数値に変換する。
 *
 * 以前は `parseInt(text.replace(/[^0-9]/g, ""))` で数字だけ抜き出していたため、
 * 「3.9K」→ 39、「49K」→ 49、「1.2万」→ 12 のように 1000 分の 1 で保存され、
 * 検索の人気順・プロフィール集計・エクスポートがすべて壊れていた。
 * ここでは K/M/B と 万/億 を桁として解釈する。
 */
const MULTIPLIERS: Record<string, number> = {
  K: 1_000,
  M: 1_000_000,
  B: 1_000_000_000,
  万: 10_000,
  億: 100_000_000,
};

function toHalfWidthDigits(value: string): string {
  return value.replace(/[０-９．]/g, (ch) => {
    if (ch === "．") return ".";
    return String.fromCharCode(ch.charCodeAt(0) - 0xfee0);
  });
}

export function parseCount(value: unknown): number {
  if (value === null || value === undefined) return 0;
  const text = String(value).trim();
  if (!text) return 0;

  // 全角数字・桁区切りカンマ・空白を落としてから最初の数値＋単位を読む
  const normalized = toHalfWidthDigits(text).replace(/,/g, "").replace(/\s+/g, "");
  const match = /(\d+(?:\.\d+)?)(万|億|[KkMmBb])?/.exec(normalized);
  if (!match) return 0;

  const base = parseFloat(match[1]);
  if (!Number.isFinite(base)) return 0;

  const unit = match[2]?.toUpperCase();
  const multiplier = unit ? MULTIPLIERS[unit] ?? 1 : 1;
  const result = Math.round(base * multiplier);
  return Number.isFinite(result) && result >= 0 ? result : 0;
}
