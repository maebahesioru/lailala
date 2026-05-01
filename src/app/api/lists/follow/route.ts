import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { listId } = await req.json();
  if (!listId) return NextResponse.json({ error: "listId required" }, { status: 400 });

  try {
    await prisma.listFollow.upsert({
      where: { userId_listId: { userId, listId } },
      update: {},
      create: { userId, listId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { searchParams } = new URL(req.url);
  const listId = searchParams.get("listId");
  if (!listId) return NextResponse.json({ error: "listId required" }, { status: 400 });

  try {
    await prisma.listFollow.deleteMany({
      where: { userId, listId },
    });
    return NextResponse.json({ success: true });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  try {
    const follows = await prisma.listFollow.findMany({
      where: { userId },
      include: {
        list: {
          include: {
            user: { select: { name: true } },
            _count: { select: { items: true } },
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json({ follows: follows.map((f) => f.list) });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
