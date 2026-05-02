import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET() {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const words = await prisma.mutedWord.findMany({
    where: { userId },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ words });
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { word, mode = "partial" } = await req.json();
  if (!word || typeof word !== "string" || word.trim().length === 0) {
    return NextResponse.json({ error: "Word is required" }, { status: 400 });
  }

  try {
    const muted = await prisma.mutedWord.create({
      data: {
        userId,
        word: word.trim(),
        mode: ["partial", "exact", "regex"].includes(mode) ? mode : "partial",
      },
    });
    return NextResponse.json({ muted });
  } catch {
    return NextResponse.json({ error: "Already exists" }, { status: 409 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");
  if (!id) return NextResponse.json({ error: "ID required" }, { status: 400 });

  await prisma.mutedWord.deleteMany({
    where: { id, userId },
  });

  return NextResponse.json({ success: true });
}
