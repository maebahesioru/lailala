import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "./prisma";
import { decrypt } from "./crypto";

export async function getInnertube() {
  const innertube = await Innertube.create({
    cache: new UniversalCache(false),
  });
  return innertube;
}

export async function getInnertubeWithAuth(userId: string) {
  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: { id: true, selectedAccountId: true },
  });

  const selectedAccountId = user?.selectedAccountId;

  // Try matching by selectedAccountId first, then any credential
  const cred = await prisma.ytCredential.findFirst({
    where: selectedAccountId
      ? { userId, accountChannelId: selectedAccountId }
      : { userId },
    orderBy: { updatedAt: "desc" },
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

  return Innertube.create({ cache: new UniversalCache(false), cookie: raw });
}

export async function getInnertubeWithCookie(cookieString: string) {
  return Innertube.create({ cache: new UniversalCache(false), cookie: cookieString });
}
