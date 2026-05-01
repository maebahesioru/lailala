import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { Innertube, UniversalCache } from "youtubei.js";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const innertube = await Innertube.create({
      cache: new UniversalCache(false),
    });

    let pendingData: any = null;

    innertube.session.on("auth-pending", (data: any) => {
      pendingData = data;
    });

    // Start the sign-in flow (this will fire auth-pending)
    await innertube.session.signIn();

    // Store a temporary reference to the innertube session for polling
    // In a real implementation, you'd use Redis or similar to store the pending session state
    return NextResponse.json({
      verificationUrl: pendingData?.verification_url || "https://www.youtube.com/activate",
      userCode: pendingData?.user_code,
      message: "Please enter the code on the YouTube activation page",
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to start OAuth" }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // This endpoint would be polled to check if the user has completed the OAuth flow
  // For simplicity, we ask users to paste the credentials manually after completing the flow
  const body = await req.json();
  const { credential } = body;

  if (!credential) {
    return NextResponse.json({ error: "credential required" }, { status: 400 });
  }

  try {
    const encrypted = encrypt(credential);
    await prisma.ytCredential.upsert({
      where: { userId: session.user.id },
      update: { credential: encrypted, type: "oauth" },
      create: { userId: session.user.id, credential: encrypted, type: "oauth" },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
