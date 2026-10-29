/**
 * スレッドページの URL を組み立てる。
 *
 * YouTube の返信コメントIDは「親ID.子ID」の形でドットを含む。next.config の
 * `trailingSlash: true` は「最後のセグメントにドット＝拡張子付きファイル」と
 * みなして末尾スラッシュを**外す**ため、ドット入りIDにスラッシュを付けると
 * 必ず 308 リダイレクトになる（実測: `/thread/A.B/` → 308 → `/thread/A.B`）。
 * 逆にドット無しIDはスラッシュが必須（`/thread/A` → 308 → `/thread/A/`）。
 * canonical がリダイレクト先を指さないよう、ID の形で分岐する。
 */
export function threadPath(commentId: string): string {
  const id = encodeURIComponent(commentId);
  return id.includes(".") ? `/thread/${id}` : `/thread/${id}/`;
}

/** 共有用の絶対URL（origin 付き）。 */
export function threadUrl(origin: string, commentId: string): string {
  return `${origin}${threadPath(commentId)}`;
}
