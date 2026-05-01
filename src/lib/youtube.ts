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
 * 指定ユーザーのCredentialのみ使用。Cookie または OAuth トークン。
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

  const raw = decrypt(cred.credential);

  if (cred.type === "oauth") {
    const tokens = JSON.parse(raw);
    const innertube = await Innertube.create({
      cache: new UniversalCache(false),
    });
    await innertube.session.signIn(tokens);
    return innertube;
  }

  // cookie type
  const innertube = await Innertube.create({
    cache: new UniversalCache(false),
    cookie: raw,
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
