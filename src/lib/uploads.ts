import crypto from "node:crypto";

export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
export const MAX_IMAGES_PER_COMMENT = 3;

type Signature = { ext: string; mime: string; test: (b: Buffer) => boolean };

const SIGNATURES: Signature[] = [
  { ext: "png", mime: "image/png", test: (b) => b.length > 8 && b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47 },
  { ext: "jpg", mime: "image/jpeg", test: (b) => b.length > 3 && b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff },
  {
    ext: "gif",
    mime: "image/gif",
    test: (b) => b.length > 6 && ["GIF87a", "GIF89a"].includes(b.subarray(0, 6).toString("ascii")),
  },
  {
    ext: "webp",
    mime: "image/webp",
    test: (b) =>
      b.length > 12 &&
      b.subarray(0, 4).toString("ascii") === "RIFF" &&
      b.subarray(8, 12).toString("ascii") === "WEBP",
  },
];

/** 中身の先頭バイトから実際の画像形式を判定する（拡張子や Content-Type は信用しない）。 */
export function sniffImage(buf: Buffer): Signature | null {
  return SIGNATURES.find((s) => s.test(buf)) ?? null;
}

/** 認証用のハッシュ（同一画像の重複検知に使えるように残しておく）。 */
export function hashImage(buf: Buffer): string {
  return crypto.createHash("sha256").update(buf).digest("hex");
}
