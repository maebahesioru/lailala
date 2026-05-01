import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import redis from "@/lib/redis";

const CACHE_TTL = 1800;
const VIDEO_ID = "niKAylKNIEI";
const INITIAL_BATCHES = 5;  // fast first response (~2.5s)
const FULL_BATCHES = 30;    // background full scan

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

async function collectBatches(innertube: any, videoId: string, maxBatches: number): Promise<string[]> {
  let comments = await innertube.getComments(videoId, "NEWEST_FIRST");
  const contents: string[] = [];
  let batchCount = 0;

  while (batchCount < maxBatches) {
    for (const thread of comments.contents) {
      if (thread.comment?.content?.text) contents.push(thread.comment.content.text);
      if (thread.replies) {
        for (const reply of thread.replies) {
          if (reply.content?.text) contents.push(reply.content.text);
        }
      }
    }
    if (!comments.has_continuation) break;
    try {
      comments = await comments.getContinuation();
      batchCount++;
    } catch {
      break;
    }
  }
  return contents;
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
  const videoId = searchParams.get("videoId") || VIDEO_ID;
  const cacheKey = `trending:words:${videoId}`;

  // Return cached data if available (already full accuracy)
  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json({ words: JSON.parse(cached) as TrendWord[], cached: true });
    }
  } catch {}

  // No cache: quick first response + trigger background full scan
  try {
    const innertube = await getInnertube();

    // 1. Fetch initial batches for fast response
    const quickContents = await collectBatches(innertube, videoId, INITIAL_BATCHES);
    const quickWords = extractTrendWords(quickContents);

    // Save initial result to cache immediately
    try {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(quickWords));
    } catch {}

    // 2. Fire background full scan (don't await - runs after response)
    collectBatches(innertube, videoId, FULL_BATCHES - INITIAL_BATCHES)
      .then(async (moreContents) => {
        const allContents = [...quickContents, ...moreContents];
        const fullWords = extractTrendWords(allContents);
        try {
          await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(fullWords));
        } catch {}
      })
      .catch(() => {});

    return NextResponse.json({
      words: quickWords,
      cached: false,
      samples: quickContents.length,
      updating: true,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}

export async function DELETE(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId") || VIDEO_ID;
  try {
    await redis.del(`trending:words:${videoId}`);
    return NextResponse.json({ success: true });
  } catch {
    return NextResponse.json({ error: "Redis unavailable" }, { status: 500 });
  }
}
