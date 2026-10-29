import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { internalError } from "@/lib/api-error";

// 1 人が 13 万行のうち何割を占めるかは分からないので、集計対象に上限を置く。
// （無制限だと、たくさん書き込む配信者 1 人で毎リクエスト数秒かかる）
const MAX_ROWS = 20_000;

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const channelId = searchParams.get("channelId");
  const authorName = searchParams.get("authorName");
  if (!channelId) return NextResponse.json({ error: "channelId required" }, { status: 400 });

  const map = new Map<string, number>();

  const query = async (where: { authorChannelId?: string; authorName?: string }) =>
    prisma.commentCache.findMany({
      where,
      select: { publishedAt: true },
      orderBy: { publishedAt: "desc" },
      take: MAX_ROWS,
    });

  try {
    // まず channelId で引く。無ければ authorName でフォールバックする。
    // 以前はフォールバックが 2 段あり、条件によっては同一クエリを 2 回投げていた。
    let comments = await query({ authorChannelId: channelId });
    if (comments.length === 0 && authorName) {
      comments = await query({ authorName });
    }

    for (const c of comments) {
      const key = c.publishedAt.toISOString().split("T")[0];
      map.set(key, (map.get(key) || 0) + 1);
    }

    return NextResponse.json({
      heatmap: Object.fromEntries(map),
      count: comments.length,
      truncated: comments.length >= MAX_ROWS,
    });
  } catch (e) {
    return internalError("api/profile/heatmap", e);
  }
}
