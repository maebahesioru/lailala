import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

function escapeCsv(val: string): string {
  if (/[",\n\r]/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

export async function GET(req: NextRequest) {
  try {
    const comments = await prisma.commentCache.findMany({
      orderBy: { publishedAt: "desc" },
    });

    const headers = ["commentId", "videoId", "authorName", "authorChannelId", "content", "likeCount", "replyCount", "publishedAt"];
    const rows = comments.map((c) => [
      c.commentId,
      c.videoId,
      c.authorName,
      c.authorChannelId || "",
      c.content,
      String(c.likeCount),
      String(c.replyCount),
      c.publishedAt.toISOString(),
    ]);

    const csv = [headers.join(","), ...rows.map((r) => r.map(escapeCsv).join(","))].join("\n");

    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="lailala_comments.csv"',
      },
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
