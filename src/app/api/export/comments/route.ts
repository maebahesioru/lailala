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

// Excel / LibreOffice / Google スプレッドシートは先頭が = + - @ のセルを
// 数式として評価する。コメント本文は第三者が書けるので、CSV に素で出すと
// 開いた人の環境で数式が走る（CSV インジェクション）。
// 先頭にアポストロフィを足して「文字列」として固定する。
function neutraliseFormula(val: string): string {
  return /^[=+\-@\t\r]/.test(val) ? `'${val}` : val;
}

function escapeCsv(val: string): string {
  const safe = neutraliseFormula(val);
  if (/[",\n\r]/.test(safe)) {
    return `"${safe.replace(/"/g, '""')}"`;
  }
  return safe;
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


function toJsonRow(c: {
  commentId: string;
  videoId: string;
  authorName: string;
  authorChannelId: string | null;
  content: string;
  likeCount: number;
  replyCount: number;
  publishedAt: Date;
}) {
  return {
    commentId: c.commentId,
    videoId: c.videoId,
    authorName: c.authorName,
    authorChannelId: c.authorChannelId || null,
    content: c.content,
    likeCount: c.likeCount,
    replyCount: c.replyCount,
    publishedAt: c.publishedAt.toISOString(),
  };
}
export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  // 以前は parseInt("abc")=NaN を「未指定」と同じ扱いにして MAX_ROWS へ
  // フォールバックしていたため、limit=abc で全件（17MB・約5秒）が出ていた。
  // 明示された値が壊れている場合は 400 にする。
  const rawLimit = searchParams.get("limit");
  const requested = rawLimit === null ? MAX_ROWS : Number(rawLimit);
  if (rawLimit !== null && (!Number.isFinite(requested) || requested < 1)) {
    return NextResponse.json(
      { error: "limit には 1 以上の数値を指定してください。" },
      { status: 400 }
    );
  }
  const limit = Math.min(
    Math.floor(requested),
    MAX_ROWS
  );

  // 以前は format を一切見ておらず、format=json でも CSV を返していた。
  const rawFormat = (searchParams.get("format") || "csv").toLowerCase();
  if (rawFormat !== "csv" && rawFormat !== "json") {
    return NextResponse.json(
      { error: "format には csv か json を指定してください。" },
      { status: 400 }
    );
  }
  const asJson = rawFormat === "json";

  const encoder = new TextEncoder();
  let lastId: string | null = null;
  let sent = 0;

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const push = (line: string) => controller.enqueue(encoder.encode(line));
      try {
        // CSV は Excel が UTF-8 と判別できるよう BOM を付ける
        push(asJson ? "[" : `\uFEFF${HEADERS.join(",")}\n`);

        let first = true;
        while (sent < limit) {
          const batch = await prisma.commentCache.findMany({
            where: videoId ? { videoId } : undefined,
            orderBy: { id: "asc" },
            take: Math.min(BATCH_SIZE, limit - sent),
            ...(lastId ? { cursor: { id: lastId }, skip: 1 } : {}),
          });

          if (batch.length === 0) break;

          let chunk = "";
          for (const c of batch) {
            if (asJson) {
              chunk += `${first ? "" : ",\n"}${JSON.stringify(toJsonRow(c))}`;
              first = false;
            } else {
              chunk += `${toRow(c)}\n`;
            }
          }
          push(chunk);

          sent += batch.length;
          lastId = batch[batch.length - 1].id;
          if (batch.length < BATCH_SIZE) break;
        }

        if (asJson) push("]");
        controller.close();
      } catch (e: any) {
        console.error("[export/comments] failed:", e?.message || e);
        controller.error(e);
      }
    },
  });

  return new NextResponse(stream, {
    headers: {
      "Content-Type": asJson
        ? "application/json; charset=utf-8"
        : "text/csv; charset=utf-8",
      "Content-Disposition": `attachment; filename="lailala_comments.${asJson ? "json" : "csv"}"`,
      "Cache-Control": "no-store",
    },
  });
}
