import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import crypto from "node:crypto";

export const MAX_UPLOAD_BYTES = 3 * 1024 * 1024;
export const MAX_IMAGES_PER_COMMENT = 3;

// 既定はコンテナ内の ./uploads。docker-compose で永続ボリュームに載せる。
export const UPLOAD_DIR = process.env.UPLOAD_DIR || path.join(process.cwd(), "uploads");

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

export function mimeForFilename(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() ?? "";
  return SIGNATURES.find((s) => s.ext === ext)?.mime ?? "application/octet-stream";
}

export async function saveImage(buf: Buffer, ext: string): Promise<string> {
  await mkdir(UPLOAD_DIR, { recursive: true });
  const filename = `${Date.now().toString(36)}-${crypto.randomBytes(8).toString("hex")}.${ext}`;
  await writeFile(path.join(UPLOAD_DIR, filename), buf);
  return filename;
}

export async function readImage(filename: string): Promise<Buffer | null> {
  // パストラバーサル防止: 保存時に生成した形式のみ許可する。
  if (!/^[a-z0-9]+-[a-f0-9]{16}\.(png|jpg|gif|webp)$/.test(filename)) return null;
  try {
    return await readFile(path.join(UPLOAD_DIR, filename));
  } catch {
    return null;
  }
}
