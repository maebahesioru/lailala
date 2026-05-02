import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getInnertube } from "@/lib/youtube";
import { tokenizeKuromoji } from "@/lib/tokenizer";

const VIDEO_ID = "niKAylKNIEI";

interface TrendWord {
  word: string;
  count: number;
}

const STOP_WORDS = new Set([
  "こと", "これ", "それ", "あれ", "もの", "よう", "そう", "ああ",
  "わたし", "あなた", "おれ", "ぼく", "きみ", "われ", "わい", "お前",
  "彼", "彼女", "自分", "俺", "僕", "私",
  "ここ", "そこ", "あそこ", "どこ",
  "こっち", "そっち", "あっち", "どっち",
  "みんな", "皆", "皆さん", "僕ら", "俺ら", "我々",
  "今日", "昨日", "明日", "今", "前", "後", "時", "時間", "時期",
  "人", "人間", "方", "誰", "何", "どれ", "どの",
  "感じ", "気", "所", "事", "的", "中", "上", "下", "方",
  "する", "やる", "なる", "ある", "いる", "できる", "出来る",
  "ない", "無い", "良い", "いい", "好き", "嫌い", "欲しい",
  "てる", "たい", "たら", "だろ", "でしょ", "ます", "です", "した",
  "して", "してる", "され", "られ",
  "おはよう", "おやすみ", "こんにちは", "こんばんは", "ただいま", "おかえり",
  "ありがとう", "すみません", "ごめん", "よろしく", "お願い",
  "うお", "わら", "笑", "草", "www", "w",
  "初見", "初見です", "こん", "こーん",
  "いいね", "最高", "大好き", "神", "楽しみ",
  "コメ", "コメント", "投稿", "返信", "リプ", "リプライ",
  "高評価", "低評価", "ブックマーク",
  "秒", "分", "時間", "日", "週間", "月", "年",
]);

async function extractTrendWords(contents: string[]): Promise<TrendWord[]> {
  const wordCounts = new Map<string, number>();
  for (const content of contents) {
    const hashtags = content.match(/#[^\s#]+/g) || [];
    const mentions = content.match(/@[^\s@]+/g) || [];
    const words = await tokenizeKuromoji(content.replace(/[#@]/g, ""));
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
  const hours = parseInt(searchParams.get("hours") || "168", 10);

  try {
    const since = new Date(Date.now() - hours * 60 * 60 * 1000);

    const comments = await prisma.$queryRaw<{ content: string }[]>`
      SELECT content FROM comment_cache
      WHERE video_id = ${VIDEO_ID} AND published_at >= ${since}
    `;

    let contents = comments.map((c) => c.content);

    // Fallback: if cache is empty, fetch from YouTube API
    if (contents.length === 0) {
      try {
        const innertube = await getInnertube();
        let ytComments = await innertube.getComments(VIDEO_ID, "NEWEST_FIRST");
        const ytContents: string[] = [];
        for (const thread of ytComments.contents) {
          if (thread.comment?.content?.text) ytContents.push(thread.comment.content.text);
        }
        for (let i = 0; i < 5 && ytComments.has_continuation; i++) {
          ytComments = await ytComments.getContinuation();
          for (const thread of ytComments.contents) {
            if (thread.comment?.content?.text) ytContents.push(thread.comment.content.text);
          }
        }
        contents = ytContents;
      } catch {}
    }

    const words = contents.length > 0 ? await extractTrendWords(contents) : [];
    return NextResponse.json({ words, total: contents.length });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
