// アイコン画像が無い/壊れているときの代替表示（名前の頭文字＋決まった色）
const COLORS = ["#1d9bf0", "#7856ff", "#f91880", "#00ba7c", "#ff7a00", "#536471", "#c2410c", "#0f766e"];

export function avatarLetter(name: string | null | undefined): string {
  const trimmed = (name || "").replace(/^@+/, "").trim();
  if (trimmed.length === 0) return "?";
  const first = Array.from(trimmed)[0];
  return /[a-zA-Z0-9]/.test(first) ? first.toUpperCase() : first;
}

export function avatarColor(name: string | null | undefined): string {
  const value = name || "?";
  let hash = 0;
  for (let i = 0; i < value.length; i += 1) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return COLORS[hash % COLORS.length];
}
