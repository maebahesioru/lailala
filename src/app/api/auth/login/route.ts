import { NextRequest, NextResponse } from "next/server";
import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import { createSession } from "@/lib/session";

const oauthStates = new Map<string, Promise<string>>();

export async function POST(_req: NextRequest) {
  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(false) });
    const sessionId = crypto.randomUUID();
    const timeout = 600_000;

    // Wait for auth-pending with timeout
    const pendingData = await new Promise<any>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("OAuth flow timed out before auth-pending")), 15000);

      innertube.session.on("auth-pending", (data: any) => {
        clearTimeout(timer);
        resolve(data);
      });

      innertube.session.on("error", (err: any) => {
        clearTimeout(timer);
        reject(err instanceof Error ? err : new Error(String(err)));
      });

      // Start the sign-in flow AFTER listeners are set
      innertube.session.signIn().catch((e: any) => {
        clearTimeout(timer);
        reject(e instanceof Error ? e : new Error(String(e)));
      });
    });

    const verificationUrl = pendingData?.verification_url || "https://www.google.com/device";
    const userCode = pendingData?.user_code || "";

    if (!userCode) {
      return NextResponse.json({ error: "Failed to get verification code" }, { status: 500 });
    }

    // Build auth promise: just wait for credentials
    const authPromise = new Promise<any>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("OAuth timed out")), timeout);

      innertube.session.on("auth", ({ credentials }: any) => {
        clearTimeout(timer);
        resolve({ sessionId, credentials, innertube });
      });

      innertube.session.on("auth-error", (err: any) => {
        clearTimeout(timer);
        reject(err instanceof Error ? err : new Error(String(err)));
      });
    });

    oauthStates.set(sessionId, authPromise);
    setTimeout(() => oauthStates.delete(sessionId), timeout + 5000);

    return NextResponse.json({
      sessionId,
      verificationUrl,
      userCode,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to start OAuth" }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const sessionId = searchParams.get("sessionId");
  if (!sessionId) return NextResponse.json({ status: "error", message: "sessionId required" }, { status: 400 });

  const promise = oauthStates.get(sessionId);
  if (!promise) return NextResponse.json({ status: "expired" });

  try {
    const timeout = new Promise<never>((_, reject) =>
      setTimeout(() => reject(new Error("TIMEOUT")), 5000)
    );
    const result = await Promise.race([promise, timeout]);

    // Auth succeeded: extract credentials and account info
    const { credentials, innertube } = result;
    const encryptedCred = encrypt(JSON.stringify(credentials));

    let channelId = sessionId;
    let name = "YouTube User";
    let thumbnail: string | null = null;
    let accountError: string | null = null;

    try {
      const info = await innertube.account.getInfo();
      const page = (info as any).page;
      const sections = page?.contents?.array?.();
      let debugParts: string[] = [];
      if (sections) {
        for (let si = 0; si < sections.length; si++) {
          const section = sections[si];
          const items = section?.contents;
          debugParts.push(`s${si}:type=${section?.type},contentsLen=${items?.length || 0}`);
          if (items) {
            for (let ii = 0; ii < items.length; ii++) {
              const item = items[ii];
              debugParts.push(`  i${ii}:type=${item?.type},name=${!!item?.account_name?.text},photo=${!!item?.account_photo?.[0]},handle=${!!item?.channel_handle?.text}`);
              if (item?.account_name?.text && name === "YouTube User") name = item.account_name.text;
              if (item?.account_photo?.[0]?.url && !thumbnail) thumbnail = item.account_photo[0].url;
              if (item?.channel_handle?.text && channelId === sessionId) channelId = item.channel_handle.text;
            }
          }
        }
      }
      if (channelId === sessionId) {
        accountError = `no channel found. debug: ${debugParts.join(" | ")}`;
      }
    } catch (e: any) {
      accountError = e.message || "getInfo failed";
    }

    if (channelId === sessionId) {
      accountError = accountError || "channel handle not found in account items";
    }

    const email = `yt:${channelId}`;

    let user = await prisma.user.findFirst({ where: { email } });
    if (user) {
      user = await prisma.user.update({ where: { id: user.id }, data: { name, image: thumbnail } });
    } else {
      user = await prisma.user.create({ data: { name, email, image: thumbnail } });
    }

    await prisma.ytCredential.upsert({
      where: { userId: user.id },
      update: { credential: encryptedCred, type: "oauth" },
      create: { userId: user.id, credential: encryptedCred, type: "oauth" },
    });

    // Delete only after all DB work succeeds
    oauthStates.delete(sessionId);
    await createSession(user.id);
    return NextResponse.json({
      status: "complete",
      accountError,
      name,
      thumbnail,
    });
  } catch (e: any) {
    if (e.message === "TIMEOUT") return NextResponse.json({ status: "pending" });
    oauthStates.delete(sessionId);
    return NextResponse.json({ status: "error", message: e.message || "認証に失敗しました" }, { status: 500 });
  }
}
