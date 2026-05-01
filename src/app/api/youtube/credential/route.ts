import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { encrypt } from "@/lib/crypto";
import { z } from "zod";

const schema = z.object({
  credential: z.string().min(1),
  type: z.enum(["cookie", "oauth"]),
});

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await req.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid body" }, { status: 400 });
  }

  const { credential, type } = parsed.data;
  const encrypted = encrypt(credential);

  await prisma.ytCredential.upsert({
    where: { userId: session.user.id },
    update: { credential: encrypted, type },
    create: { userId: session.user.id, credential: encrypted, type },
  });

  return NextResponse.json({ success: true });
}

export async function DELETE() {
  const session = await auth();
  if (!session?.user?.id) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.ytCredential.deleteMany({
    where: { userId: session.user.id },
  });

  return NextResponse.json({ success: true });
}
