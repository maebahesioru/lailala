import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const folders = await prisma.bookmarkFolder.findMany({
      where: { userId },
      include: {
        _count: { select: { bookmarks: true } },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ folders });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { name } = await req.json();
  if (!name?.trim()) return NextResponse.json({ error: "name required" }, { status: 400 });

  try {
    const folder = await prisma.bookmarkFolder.create({
      data: { userId, name: name.trim() },
    });
    return NextResponse.json({ folder });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const folderId = searchParams.get("folderId");
  if (!folderId) return NextResponse.json({ error: "folderId required" }, { status: 400 });

  try {
    await prisma.bookmarkFolder.deleteMany({
      where: { id: folderId, userId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
