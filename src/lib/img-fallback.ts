// 削除済みチャンネルのアバターなど、404 になる画像をそのまま <img> に
// 入れると alt テキストや壊れアイコンが出てしまう。読み込み失敗時は
// 中間色の人物プレースホルダ（SVG data URI）へ差し替える。
const PLACEHOLDER =
  "data:image/svg+xml;utf8," +
  encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" width="96" height="96">' +
      '<rect width="96" height="96" fill="#2f3336"/>' +
      '<circle cx="48" cy="36" r="16" fill="#71767b"/>' +
      '<rect x="18" y="60" width="60" height="28" rx="14" fill="#71767b"/>' +
      "</svg>"
  );

export function onImgError(e: { currentTarget: HTMLImageElement }) {
  const img = e.currentTarget;
  // src を差し替えても失敗する場合の無限ループを防ぐ
  if (img.dataset.fallback === "1") return;
  img.dataset.fallback = "1";
  img.src = PLACEHOLDER;
}
