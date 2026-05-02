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
 * 指定ユーザーの選択中アカウントのCredentialを使用。Cookie または OAuth トークン。
 */
export async function getInnertubeWithAuth(userId: string) {
  let user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, selectedAccountId: true },
  });

  let selectedAccountId = user?.selectedAccountId;

  // Fallback: if no selected account, pick the most recent credential
  if (!selectedAccountId) {
    const fallbackCred = await prisma.ytCredential.findFirst({
      where: { userId },
      orderBy: { updatedAt: "desc" },
      select: { accountChannelId: true },
    });
    if (fallbackCred?.accountChannelId) {
      selectedAccountId = fallbackCred.accountChannelId;
      // Persist for next time
      await prisma.user.update({
        where: { id: userId },
        data: { selectedAccountId },
      });
    }
  }

  if (!selectedAccountId) {
    const error = new Error("YOUTUBE_AUTH_REQUIRED");
    (error as any).code = "YOUTUBE_AUTH_REQUIRED";
    throw error;
  }

  const cred = await prisma.ytCredential.findFirst({
    where: { userId, accountChannelId: selectedAccountId },
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
      client_type: "TVHTML5" as any,
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
