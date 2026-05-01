import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "./prisma";
import { decrypt } from "./crypto";

export async function getInnertube(credentialId?: string) {
  let cookie: string | undefined;

  // 1. 指定されたユーザーの認証情報
  if (credentialId) {
    const cred = await prisma.ytCredential.findUnique({
      where: { userId: credentialId },
    });
    if (cred) {
      const decrypted = decrypt(cred.credential);
      if (cred.type === "cookie") {
        cookie = decrypted;
      }
    }
  }

  // 2. フォールバック: 管理者Cookie（env）
  if (!cookie) {
    cookie = process.env.YOUTUBE_COOKIE || undefined;
  }

  // 3. 最終フォールバック: DB内で最初に見つかったCookie
  if (!cookie) {
    const firstCred = await prisma.ytCredential.findFirst({
      where: { type: "cookie" },
    });
    if (firstCred) {
      cookie = decrypt(firstCred.credential);
    }
  }

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
