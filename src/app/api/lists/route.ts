import { NextRequest, NextResponse } from "next/server";
import { getSessionUserId } from "@/lib/session";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = await getSessionUserId();
  const { searchParams } = new URL(req.url);
  const listId = searchParams.get("listId");
  const search = searchParams.get("search");

  try {
    if (listId) {
      const list = await prisma.list.findUnique({
        where: { id: listId },
        include: {
          items: {
            orderBy: { createdAt: "desc" },
            where: search
              ? {
                  OR: [
                    { content: { contains: search, mode: "insensitive" } },
                    { authorName: { contains: search, mode: "insensitive" } },
                  ],
                }
              : undefined,
          },
          user: { select: { name: true, image: true } },
          _count: { select: { followers: true } },
        },
      });
      if (!list) {
        return NextResponse.json({ error: "Not found" }, { status: 404 });
      }
      // Only owner or public lists are viewable
      const isOwner = list.userId === userId;
      const isFollowing = userId
        ? !!(await prisma.listFollow.findUnique({
            where: { userId_listId: { userId, listId } },
          }))
        : false;
      if (!isOwner && !list.isPublic) {
        return NextResponse.json({ error: "Forbidden" }, { status: 403 });
      }
      return NextResponse.json({ list: { ...list, isOwner, isFollowing } });
    }

    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
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
      const list = await prisma.list.create({
        data: {
          userId,
          name: body.name,
          description: body.description || null,
          isPublic: body.isPublic === true,
        },
      });
      return NextResponse.json({ list });
    }

    if (body.listId && body.commentId) {
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

    if (body.listId && body.userId) {
      // Add user/channel to list via profile
      const list = await prisma.list.findFirst({
        where: { id: body.listId, userId },
      });
      if (!list) return NextResponse.json({ error: "Not found" }, { status: 404 });

      // Find comments by this user and add them
      const comments = await prisma.commentCache.findMany({
        where: { authorChannelId: body.userId },
        take: 100,
      });

      let added = 0;
      for (const c of comments) {
        await prisma.listItem.upsert({
          where: { listId_commentId: { listId: body.listId, commentId: c.commentId } },
          update: {},
          create: {
            listId: body.listId,
            commentId: c.commentId,
            videoId: c.videoId,
            authorName: c.authorName,
            authorThumb: c.authorThumb,
            content: c.content,
            likeCount: String(c.likeCount),
            replyCount: String(c.replyCount),
            publishedTime: c.publishedAt.toISOString(),
          },
        });
        added++;
      }
      return NextResponse.json({ added });
    }

    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  const userId = await getSessionUserId();
  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { listId, name, description, isPublic } = await req.json();
  if (!listId) return NextResponse.json({ error: "listId required" }, { status: 400 });

  try {
    const list = await prisma.list.updateMany({
      where: { id: listId, userId },
      data: {
        ...(name !== undefined ? { name } : {}),
        ...(description !== undefined ? { description } : {}),
        ...(isPublic !== undefined ? { isPublic } : {}),
      },
    });
    return NextResponse.json({ success: true, list });
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
