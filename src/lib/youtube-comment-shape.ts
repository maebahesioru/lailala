/**
 * youtubei.js 18.x では返信が `CommentThread`（comment を内包するラッパー）で
 * 返ってくる。16/17 系は `CommentView` がそのまま入っていたため、呼び出し側が
 * `reply.author` や `reply.comment_id` を直接読むと全部 undefined になる
 * （＝UI が「Unknown」「本文なし」になる）。
 *
 * 実体（CommentView）を取り出すための正規化ヘルパー。
 *   - 18.x:  { comment: CommentView, replies: [...] } -> CommentView
 *   - 16/17: CommentView                              -> CommentView（そのまま）
 */

export function unwrapComment<T = any>(item: any): T | null {
  if (!item) return null;
  return (item.comment ?? item) as T;
}

/** 返信配列を CommentView[] に正規化する（comment_id を持たない要素は捨てる）。 */
export function unwrapReplies(items: any): any[] {
  if (!Array.isArray(items)) return [];
  const out: any[] = [];
  for (const item of items) {
    const comment = unwrapComment(item);
    if (comment?.comment_id) out.push(comment);
  }
  return out;
}
