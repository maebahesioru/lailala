import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { tokenizeKuromoji } from "@/lib/tokenizer";

const VIDEO_ID = "niKAylKNIEI";

interface TrendWord {
  word: string;
  count: number;
}

const STOP_WORDS = new Set([
  "こと", "これ", "それ", "あれ", "もの", "よう", "そう", "ああ",
  "わたし", "あなた", "おれ", "ぼく", "きみ",
]);

async function extractTrendWords(contents: string[]): Promise<TrendWord[]> {
  const wordCounts = new Map<string, number>();
  for (const content of contents) {
    const hashtags = content.match(/#[^\s#]+/g) || [];
    const mentions = content.match(/@[^\s@]+/g) || [];

    // Use kuromoji morphological analysis for high-quality tokenization
    const words = await tokenizeKuromoji(content.replace(/[#@]/g, ""));

    // Deduplicate per-comment so one comment cannot spam the same word
    const uniqueWords = new Set<string>();
    for (const h of hashtags) uniqueWords.add(h);
    for (const m of mentions) uniqueWords.add(m);
    for (const w of words) {
      if (STOP_WORDS.has(w)) continue;
      uniqueWords.add(w);
    }

    for (const word of uniqueWords) {
      const weight = word.startsWith("#") ? 3 : word.startsWith("@") ? 2 : 1;
      wordCounts.set(word, (wordCounts.get(word) || 0) + weight);
    }
  }

  return Array.from(wordCounts.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([word, count]) => ({ word, count }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hours = parseInt(searchParams.get("hours") || "168", 10); // default 7 days

  try {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    // Fetch ALL comments within the time range (no limit) using raw query for efficiency
    const comments = await prisma.$queryRaw<{ content: string }[]>`
      SELECT content FROM comment_cache
      WHERE video_id = ${VIDEO_ID} AND published_at >= ${since}
    `;

    const contents = comments.map((c) => c.content);
    const words = await extractTrendWords(contents);

    return NextResponse.json({ words, total: contents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
