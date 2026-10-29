/**
 * クエリ文字列の数値パラメータを安全に読む。
 *
 * `parseInt("abc", 10)` は NaN を返し、それがそのまま Prisma の `take` / `skip` /
 * 生SQLの引数に入ると 500（しかも内部エラーメッセージがそのまま返る）になる。
 * ここを通すことで「壊れた値は既定値・範囲外はクランプ」に統一する。
 */
export function intParam(
  params: URLSearchParams,
  name: string,
  fallback: number,
  min: number = 0,
  max: number = Number.MAX_SAFE_INTEGER
): number {
  const raw = params.get(name);
  const parsed = raw === null ? NaN : Number.parseInt(raw, 10);
  const value = Number.isFinite(parsed) ? parsed : fallback;
  if (!Number.isFinite(value)) return min;
  return Math.min(Math.max(value, min), max);
}
