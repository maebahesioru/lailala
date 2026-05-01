import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

const VIDEO_ID = "niKAylKNIEI";

interface TrendWord {
  word: string;
  count: number;
}

const STOP_WORDS = new Set([
  "は", "が", "の", "に", "を", "で", "と", "も", "か", "な", "や", "へ", "ば",
  "た", "だ", "て", "し", "じ", "す", "ず", "せ", "ぜ", "そ", "ぞ",
  "ます", "です", "した", "ない", "いる", "する", "ある", "こと", "これ", "それ", "あれ",
  "この", "その", "あの", "から", "まで", "だけ", "ほど", "より", "など",
  "ました", "でしょう", "ましょう", "いました",
]);

function isJapaneseWord(w: string): boolean {
  return /[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(w)
    || w.startsWith("#")
    || w.startsWith("@");
}

function extractTrendWords(contents: string[]): TrendWord[] {
  const wordCounts = new Map<string, number>();
  for (const content of contents) {
    const hashtags = content.match(/#[^\s#]+/g) || [];
    const mentions = content.match(/@[^\s@]+/g) || [];
    const words = content
      .replace(/[#@]/g, "")
      .split(/[\s\n\p{P}]+/u)
      .filter((w: string) => w.length >= 2 && !/^[\d\.]+$/.test(w));
    for (const h of hashtags) wordCounts.set(h, (wordCounts.get(h) || 0) + 3);
    for (const m of mentions) wordCounts.set(m, (wordCounts.get(m) || 0) + 2);
    for (const w of words) {
      if (STOP_WORDS.has(w)) continue;
      if (!isJapaneseWord(w)) continue;
      wordCounts.set(w, (wordCounts.get(w) || 0) + 1);
    }
  }
  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");
  const hours = parseInt(searchParams.get("hours") || "24", 10);

  try {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);
    const where: any = {
      publishedAt: { gte: since },
    };
    if (videoId) {
      where.videoId = videoId;
    }

    const comments = await prisma.commentCache.findMany({
      where,
      select: { content: true },
      orderBy: { publishedAt: "desc" },
      take: 10000,
    });

    const contents = comments.map((c) => c.content);
    const words = extractTrendWords(contents);

    return NextResponse.json({ words, total: contents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
