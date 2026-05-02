import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getInnertube } from "@/lib/youtube";

const VIDEO_ID = "niKAylKNIEI";

interface TrendWord { word: string; count: number; }

const STOP_WORDS = new Set([
  "こと", "これ", "それ", "あれ", "もの", "よう", "そう",
  "わたし", "あなた", "おれ", "ぼく", "きみ", "彼", "彼女", "自分", "俺", "僕", "私",
  "ここ", "そこ", "あそこ", "どこ", "みんな", "皆",
  "今日", "昨日", "明日", "今", "前", "後", "時", "時間",
  "人", "人間", "方", "誰", "何",
  "する", "やる", "なる", "ある", "いる", "できる", "ない",
  "ます", "です", "した", "して", "され", "られ",
  "おはよう", "おやすみ", "こんにちは", "ありがとう",
  "うお", "わら", "笑", "草", "www", "w",
  "いいね", "最高", "大好き", "神",
  "コメ", "コメント", "投稿", "返信", "リプ",
]);

function simpleExtract(contents: string[]): TrendWord[] {
  const wordCounts = new Map<string, number>();
  for (const content of contents) {
    const hashtags = content.match(/#[^\s#]+/g) || [];
    const mentions = content.match(/@[^\s@]+/g) || [];
    const words = content.replace(/[#@]/g, "").split(/[\s\n\p{P}]+/u).filter(w => w.length >= 2);
    const seen = new Set<string>();
    for (const h of hashtags) seen.add(h);
    for (const m of mentions) seen.add(m);
    for (const w of words) {
      if (STOP_WORDS.has(w)) continue;
      if (!/[\u3040-\u309F\u30A0-\u30FF\u4E00-\u9FFF]/.test(w) && !w.startsWith("#") && !w.startsWith("@")) continue;
      seen.add(w);
    }
    for (const word of seen) {
      const weight = word.startsWith("#") ? 3 : word.startsWith("@") ? 2 : 1;
      wordCounts.set(word, (wordCounts.get(word) || 0) + weight);
    }
  }
  return Array.from(wordCounts.entries()).sort((a, b) => b[1] - a[1]).slice(0, 10).map(([word, count]) => ({ word, count }));
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const hours = parseInt(searchParams.get("hours") || "168", 10);
  const since = new Date(Date.now() - hours * 60 * 60 * 1000);

  try {
    const comments = await prisma.$queryRaw<{ content: string }[]>`
      SELECT content FROM comment_cache WHERE video_id = ${VIDEO_ID} AND published_at >= ${since}
    `;
    let contents = comments.map(c => c.content);

    if (contents.length === 0) {
      try {
        const innertube = await getInnertube();
        let yt = await innertube.getComments(VIDEO_ID, "NEWEST_FIRST");
        const arr: string[] = [];
        for (const t of yt.contents) if (t.comment?.content?.text) arr.push(t.comment.content.text);
        for (let i = 0; i < 5 && yt.has_continuation; i++) {
          yt = await yt.getContinuation();
          for (const t of yt.contents) if (t.comment?.content?.text) arr.push(t.comment.content.text);
        }
        contents = arr;
      } catch {}
    }

    const words = simpleExtract(contents);
    return NextResponse.json({ words, total: contents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
