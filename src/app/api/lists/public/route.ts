import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get("q") || "";

  try {
    const lists = await prisma.list.findMany({
      where: {
        isPublic: true,
        ...(q
          ? {
              name: { contains: q, mode: "insensitive" },
            }
          : {}),
      },
      include: {
        user: { select: { name: true, image: true } },
        _count: { select: { items: true, followers: true } },
      },
      orderBy: { updatedAt: "desc" },
      take: 50,
    });
    return NextResponse.json({ lists });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
