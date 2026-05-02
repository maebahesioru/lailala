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
  // Simply find any credential for this user
  const cred = await prisma.ytCredential.findFirst({
    where: { userId },
    orderBy: { updatedAt: "desc" },
  });

  if (!cred) {
    console.error(`[YouTube] No credential found for user ${userId}`);
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
