import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

// 以前は全件を1回の findMany で取得していたため、Prisma の Rust→napi 変換で
// "Failed to convert rust String into napi string" になり 40 秒以上かけて 500、
// 公開URL経由では Cloudflare 側がタイムアウトしていた。
// id カーソルで分割取得し、逐次ストリーミングで書き出す。
const BATCH_SIZE = 2_000;
const MAX_ROWS = 100_000;

const HEADERS = [
  "commentId",
  "videoId",
  "authorName",
  "authorChannelId",
  "content",
  "likeCount",
  "replyCount",
  "publishedAt",
];

function escapeCsv(val: string): string {
  if (/[",\n\r]/.test(val)) {
    return `"${val.replace(/"/g, '""')}"`;
  }
  return val;
}

function toRow(c: {
  commentId: string;
  videoId: string;
  authorName: string;
  authorChannelId: string | null;
  content: string;
  likeCount: number;
  replyCount: number;
  publishedAt: Date;
}): string {
  return [
    c.commentId,
    c.videoId,
    c.authorName,
    c.authorChannelId || "",
    c.content,
    String(c.likeCount),
    String(c.replyCount),
    c.publishedAt.toISOString(),
  ]
    .map(escapeCsv)
    .join(",");
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const requested = parseInt(searchParams.get("limit") || String(MAX_ROWS), 10);
  const limit = Math.min(
    Number.isFinite(requested) && requested > 0 ? requested : MAX_ROWS,
    MAX_ROWS
  );

  const encoder = new TextEncoder();
  let lastId: string | null = null;
  let sent = 0;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      // Excel が UTF-8 と判別できるよう BOM を付ける
      const push = (line: string) => controller.enqueue(encoder.encode(line));
      try {
        push(`\uFEFF${HEADERS.join(",")}\n`);

        while (sent < limit) {
          const batch = await prisma.commentCache.findMany({
            where: videoId ? { videoId } : undefined,
            orderBy: { id: "asc" },
            take: Math.min(BATCH_SIZE, limit - sent),
            ...(lastId ? { cursor: { id: lastId }, skip: 1 } : {}),
          });

          if (batch.length === 0) break;

          let chunk = "";
          for (const c of batch) chunk += `${toRow(c)}\n`;
          push(chunk);

          sent += batch.length;
          lastId = batch[batch.length - 1].id;
          if (batch.length < BATCH_SIZE) break;
        }

        controller.close();
      } catch (e: any) {
        console.error("[export/comments] failed:", e?.message || e);
        controller.error(e);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": "text/csv; charset=utf-8",
      "Content-Disposition": 'attachment; filename="lailala_comments.csv"',
      "Cache-Control": "no-store",
    },
  });
}
