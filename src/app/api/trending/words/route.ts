import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import redis from "@/lib/redis";

const CACHE_TTL = 300; // 5 minutes
const VIDEO_ID = "niKAylKNIEI"; // default video for trends

interface TrendWord {
  word: string;
  count: number;
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

    for (const h of hashtags) {
      wordCounts.set(h, (wordCounts.get(h) || 0) + 3);
    }
    for (const m of mentions) {
      wordCounts.set(m, (wordCounts.get(m) || 0) + 2);
    }
    for (const w of words) {
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

  try {
    const cached = await redis.get(cacheKey);
    if (cached) {
      return NextResponse.json({ words: JSON.parse(cached) as TrendWord[], cached: true });
    }
  } catch {
    // Redis unavailable, continue
  }

  try {
    const innertube = await getInnertube();
    let comments = await innertube.getComments(videoId, "NEWEST_FIRST");

    const contents: string[] = [];
    let batchCount = 0;
    const maxBatches = 5; // Fetch up to 5 batches for better accuracy

    while (batchCount < maxBatches) {
      for (const thread of comments.contents) {
        if (thread.comment?.content?.text) {
          contents.push(thread.comment.content.text);
        }
        if (thread.replies) {
          for (const reply of thread.replies) {
            if (reply.content?.text) {
              contents.push(reply.content.text);
            }
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

    const words = extractTrendWords(contents);

    try {
      await redis.setex(cacheKey, CACHE_TTL, JSON.stringify(words));
    } catch {
      // Redis unavailable
    }

    return NextResponse.json({ words, cached: false, samples: contents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed to fetch trends" }, { status: 500 });
  }
}
