import crypto from "crypto";

const ALGO = "aes-256-gcm";
const KEY = process.env.ENCRYPTION_KEY || "";

function getKey(): Buffer {
  if (!KEY) {
    throw new Error("ENCRYPTION_KEY is required");
  }
  // Support both hex (64 chars) and raw string keys
  const buf = KEY.length === 64 ? Buffer.from(KEY, "hex") : Buffer.from(KEY);
  if (buf.length !== 32) {
    throw new Error(`ENCRYPTION_KEY must be exactly 32 bytes (got ${buf.length})`);
  }
  return buf;
}

export function encrypt(text: string): string {
  const iv = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv(ALGO, getKey(), iv);
  const encrypted = Buffer.concat([cipher.update(text, "utf8"), cipher.final()]);
  const authTag = cipher.getAuthTag();
  return iv.toString("hex") + ":" + authTag.toString("hex") + ":" + encrypted.toString("hex");
}

export function decrypt(text: string): string {
  const [ivHex, authTagHex, encryptedHex] = text.split(":");
  const iv = Buffer.from(ivHex, "hex");
  const authTag = Buffer.from(authTagHex, "hex");
  const encrypted = Buffer.from(encryptedHex, "hex");
  const decipher = crypto.createDecipheriv(ALGO, getKey(), iv);
  decipher.setAuthTag(authTag);
  const decrypted = Buffer.concat([decipher.update(encrypted), decipher.final()]);
  return decrypted.toString("utf8");
}
