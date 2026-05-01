import { NextRequest, NextResponse } from "next/server";
import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import { createSession } from "@/lib/session";

const oauthStates = new Map<string, Promise<string>>();

// POST /api/auth/login - Start YouTube OAuth TV flow
export async function POST(_req: NextRequest) {
  try {
    const innertube = await Innertube.create({ cache: new UniversalCache(false) });
    const sessionId = crypto.randomUUID();
    const timeout = 600_000;

    // Collect verification data
    let verificationUrl = "https://www.google.com/device";
    let userCode = "";

    innertube.session.on("auth-pending", (data: any) => {
      verificationUrl = data?.verification_url || verificationUrl;
      userCode = data?.user_code || "";
    });

    // Build auth promise
    const authPromise = new Promise<string>((resolve, reject) => {
      const timer = setTimeout(() => reject(new Error("OAuth timed out")), timeout);

      innertube.session.on("auth", async ({ credentials }: any) => {
        clearTimeout(timer);
        try {
          const info = await innertube.account.getInfo();
          const channelId = (info as any).channel_id || (info as any).id || sessionId;
          const name = (info as any).name || (info as any).display_name || "YouTube User";
          const thumbnail = (info as any).thumbnails?.[0]?.url || null;

          const encryptedCred = encrypt(JSON.stringify(credentials));
          const email = `yt:${channelId}`;

          let user = await prisma.user.findFirst({ where: { email } });
          if (user) {
            user = await prisma.user.update({ where: { id: user.id }, data: { name, image: thumbnail } });
          } else {
            user = await prisma.user.create({ data: { name, email, image: thumbnail } });
          }

          await prisma.ytCredential.upsert({
            where: { userId: user.id },
            update: { credential: encryptedCred, type: "cookie" },
            create: { userId: user.id, credential: encryptedCred, type: "cookie" },
          });

          resolve(user.id);
        } catch (e) {
          reject(e);
        }
      });

      innertube.session.on("error", (err: any) => {
        clearTimeout(timer);
        reject(err instanceof Error ? err : new Error(String(err)));
      });
    });

    // Start sign-in (don't await - it resolves only when auth completes)
    innertube.session.signIn().catch((e: any) => {
      // If signIn rejects before auth-pending fires, clean up
      if (!oauthStates.has(sessionId)) return;
      oauthStates.delete(sessionId);
    });

    // Wait briefly for auth-pending to fire
    await new Promise((resolve) => setTimeout(resolve, 100));

    if (!userCode) {
      oauthStates.delete(sessionId);
      return NextResponse.json({ error: "Failed to start OAuth flow. Please try again." }, { status: 500 });
    }

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

// GET /api/auth/login/poll?sessionId=xxx - Poll completion
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
    const userId = await Promise.race([promise, timeout]);
    oauthStates.delete(sessionId);
    await createSession(userId);
    return NextResponse.json({ status: "complete" });
  } catch (e: any) {
    if (e.message === "TIMEOUT") return NextResponse.json({ status: "pending" });
    oauthStates.delete(sessionId);
    return NextResponse.json({ status: "error", message: e.message }, { status: 500 });
  }
}
