import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const listId = searchParams.get("listId");

  try {
    if (listId) {
      const list = await prisma.list.findUnique({
        where: { id: listId, userId },
        include: { items: { orderBy: { createdAt: "desc" } } },
      });
      if (!list) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      return NextResponse.json({ list });
    }

    const lists = await prisma.list.findMany({
      where: { userId },
      orderBy: { updatedAt: "desc" },
    });
    return NextResponse.json({ lists });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    if (body.name) {
      // Create list
      const list = await prisma.list.create({
        data: {
          userId,
          name: body.name,
          description: body.description || null,
        },
      });
      return NextResponse.json({ list });
    }

    if (body.listId && body.commentId) {
      // Add item to list
      const item = await prisma.listItem.upsert({
        where: {
          listId_commentId: {
            listId: body.listId,
            commentId: body.commentId,
          },
        },
        update: {},
        create: {
          listId: body.listId,
          commentId: body.commentId,
          videoId: body.videoId,
          authorName: body.authorName,
          authorThumb: body.authorThumb,
          content: body.content,
          likeCount: body.likeCount,
          replyCount: body.replyCount,
          publishedTime: body.publishedTime,
        },
      });
      return NextResponse.json({ item, action: "added" });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const listId = searchParams.get("listId");
  const commentId = searchParams.get("commentId");

  try {
    if (commentId && listId) {
      await prisma.listItem.deleteMany({
        where: { list: { id: listId, userId }, commentId },
      });
      return NextResponse.json({ success: true });
    }

    if (listId) {
      await prisma.list.deleteMany({
        where: { id: listId, userId },
      });
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: "listId required" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
