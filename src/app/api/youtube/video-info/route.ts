import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import { YTNodes } from "youtubei.js";

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
    } catch (e) {
      console.error(e);
    }

    // RYD rating は 0-5 のスコア。分かりやすく 0-100% の「高評価率」に変換
    const likeRatio = rydData.rating != null
      ? Math.round((rydData.rating / 5) * 100)
      : null;

    // Calculate days since upload from PlayerMicroformat
    let daysSinceUpload: number | null = null;
    const playerResponse = info.page[0];
    const microformat = playerResponse.microformat;
    if (microformat?.is(YTNodes.PlayerMicroformat)) {
      const publishedDate = microformat.publish_date || microformat.upload_date;
      if (publishedDate) {
        const upload = new Date(publishedDate);
        const now = new Date();
        daysSinceUpload = (now.getTime() - upload.getTime()) / (1000 * 60 * 60 * 24);
      }
    }

    // Try to get channel subscriber count from channel header
    let subscriberCount: number | null = null;
    try {
      const channelId = info.basic_info.channel_id;
      if (channelId) {
        const channel = await innertube.getChannel(channelId);
        const header = (channel as any).header;
        const subsText = header?.subscribers?.toString?.() || header?.subscriber_count?.toString?.();
        if (subsText) {
          const match = String(subsText).match(/([\d,\.]+)/);
          if (match) {
            const num = parseFloat(match[1].replace(/,/g, ""));
            const unit = String(subsText).includes("万") ? 10000 : String(subsText).includes("億") ? 100000000 : 1;
            subscriberCount = Math.round(num * unit);
          }
        }
      }
    } catch (e) {
      console.error("Failed to get subscriber count:", e);
    }

    // Get comment count from InnerTube sources
    let commentCount: string | null = null;
    if (info.comments_entry_point_header?.comment_count) {
      commentCount = info.comments_entry_point_header.comment_count.toString();
    } else {
      commentCount = (info.basic_info as any).comment_count ?? null;
    }

    return NextResponse.json({
      title: info.basic_info.title,
      author: info.basic_info.author,
      thumbnail: info.basic_info.thumbnail?.[0]?.url,
      viewCount: info.basic_info.view_count,
      likeCount: info.basic_info.like_count,
      dislikeCount: rydData.dislikes ?? null,
      commentCount,
      likeRatio,
      duration: info.basic_info.duration,
      daysSinceUpload,
      subscriberCount,
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message || "Failed" }, { status: 500 });
  }
}
