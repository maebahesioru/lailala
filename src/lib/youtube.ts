import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "./prisma";
import { decrypt } from "./crypto";

/**
 * 閲覧用: 認証不要。CookieなしでInnertubeインスタンスを作成。
 */
export async function getInnertube() {
  const innertube = await Innertube.create({
    cache: new UniversalCache(false),
  });
  return innertube;
}

/**
 * 書き込み操作用: 認証が必要。
 * 指定ユーザーのCredentialのみ使用。フォールバックは一切なし。
 */
export async function getInnertubeWithAuth(credentialId: string) {
  const cred = await prisma.ytCredential.findUnique({
    where: { userId: credentialId },
  });

  if (!cred) {
    const error = new Error("YOUTUBE_AUTH_REQUIRED");
    (error as any).code = "YOUTUBE_AUTH_REQUIRED";
    throw error;
  }

  const cookie = decrypt(cred.credential);

  const innertube = await Innertube.create({
    cache: new UniversalCache(false),
    cookie,
  });

  return innertube;
}

export async function getInnertubeWithCookie(cookieString: string) {
  const innertube = await Innertube.create({
    cache: new UniversalCache(false),
    cookie: cookieString,
  });
  return innertube;
}
