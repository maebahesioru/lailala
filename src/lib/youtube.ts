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
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { selectedAccountId: true },
  });

  if (!user?.selectedAccountId) {
    const error = new Error("YOUTUBE_AUTH_REQUIRED");
    (error as any).code = "YOUTUBE_AUTH_REQUIRED";
    throw error;
  }

  const cred = await prisma.ytCredential.findFirst({
    where: { userId, accountChannelId: user.selectedAccountId },
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
