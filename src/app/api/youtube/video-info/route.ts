import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    const innertube = await getInnertube();
    const info = await innertube.getInfo(videoId);

    // RYD APIで低評価を取得
    let rydData: { dislikes?: number; rating?: number } = {};
    try {
      const rydRes = await fetch(`https://returnyoutubedislikeapi.com/votes?videoId=${videoId}`, {
        next: { revalidate: 60 },
      });
      if (rydRes.ok) {
        rydData = await rydRes.json();
      }
    } catch {
      // RYD API エラーは無視
    }

    // RYD rating は 0-5 のスコア。分かりやすく 0-100% の「高評価率」に変換
    const likeRatio = rydData.rating != null
      ? Math.round((rydData.rating / 5) * 100)
      : null;

    return NextResponse.json({
      title: info.basic_info.title,
      author: info.basic_info.author,
      thumbnail: info.basic_info.thumbnail?.[0]?.url,
      viewCount: info.basic_info.view_count,
      likeCount: info.basic_info.like_count,
      dislikeCount: rydData.dislikes ?? null,
      likeRatio,
      duration: info.basic_info.duration,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
