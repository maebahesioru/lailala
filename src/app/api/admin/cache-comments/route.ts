import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { unwrapReplies } from "@/lib/youtube-comment-shape";
import { parseCount } from "@/lib/parse-count";
import { rateLimit } from "@/lib/rate-limit";

function parsePublishedTime(text: string): Date | null {
  if (!text) return null;
  const now = new Date();
  const match = text.match(/(\d+)\s*(year|month|week|day|hour|minute|second)s?\s*ago/);
  if (!match) return now;
  const num = parseInt(match[1], 10);
  const unit = match[2];
  const d = new Date(now);
  switch (unit) {
    case "year": d.setFullYear(d.getFullYear() - num); break;
    case "month": d.setMonth(d.getMonth() - num); break;
    case "week": d.setDate(d.getDate() - num * 7); break;
    case "day": d.setDate(d.getDate() - num); break;
    case "hour": d.setHours(d.getHours() - num); break;
    case "minute": d.setMinutes(d.getMinutes() - num); break;
    case "second": d.setSeconds(d.getSeconds() - num); break;
  }
  return d;
}

export async function GET() {
  // 副作用のある処理を GET で起動できないようにする（POST のみ）。
  return NextResponse.json(
    { error: "このエンドポイントは POST のみです。" },
    { status: 405, headers: { Allow: "POST" } }
  );
}

async function runCache(videoId: string, max: number) {
  try {
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "NEWEST_FIRST");
    let count = 0;

    const saveComment = async (c: any) => {
      if (!c || !c.comment_id) return;
      const publishedText = c.published_time?.text || String(c.published_time || "");
      const publishedAt = parsePublishedTime(publishedText) || new Date();
      const likeCount = parseCount(c.like_count);
      const replyCount = parseCount(c.reply_count);

      await prisma.commentCache.upsert({
        where: { commentId: c.comment_id },
        update: { content: c.content?.text || "", likeCount, replyCount, authorName: c.author?.name?.text || "Unknown", authorChannelId: c.author?.id || null, authorThumb: c.author?.thumbnails?.[0]?.url, publishedAt },
        create: { commentId: c.comment_id, videoId, content: c.content?.text || "", likeCount, replyCount, authorName: c.author?.name?.text || "Unknown", authorChannelId: c.author?.id || null, authorThumb: c.author?.thumbnails?.[0]?.url, publishedAt },
      });
      count++;
    };

    const saveBatch = async (batch: any[]) => {
      for (const thread of batch) {
        if (count >= max) return;
        const c = thread.comment;
        if (!c) continue;
        await saveComment(c);
        if (thread.replies) {
          for (const reply of unwrapReplies(thread.replies)) await saveComment(reply);
        }
      }
    };

    await saveBatch(comments.contents);

    while (comments.has_continuation && count < max) {
      comments = await comments.getContinuation();
      await saveBatch(comments.contents);
    }

    const total = await prisma.commentCache.count({ where: { videoId } });
    const nextToken = (comments as any).continuation_token || null;

    return NextResponse.json({ success: true, cached: count, total, nextToken });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  const denied = await requireAdmin();
  if (denied) return denied;

  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  const limit = await rateLimit(`admin-cache-comments:${ip}`, 6, 60);
  if (!limit.success) {
    return NextResponse.json(
      { error: "キャッシュ更新の実行が多すぎます。少し待ってから再試行してください。" },
      { status: 429, headers: { "Retry-After": String(Math.max(1, limit.reset)) } }
    );
  }

  let payload: { videoId?: string; max?: number | string } = {};
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ error: "JSON ボディが必要です。" }, { status: 400 });
  }

  const videoId = payload.videoId || "niKAylKNIEI";
  const max = Number.parseInt(String(payload.max ?? "500"), 10);
  if (!Number.isFinite(max) || max < 1) {
    return NextResponse.json({ error: "max には 1 以上の数値を指定してください。" }, { status: 400 });
  }

  return runCache(videoId, Math.min(max, 2000));
}
