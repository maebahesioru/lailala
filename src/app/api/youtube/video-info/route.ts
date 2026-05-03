import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";

interface YoutubeDataApiResponse {
  items?: Array<{
    statistics?: {
      commentCount?: string;
      viewCount?: string;
      likeCount?: string;
    };
  }>;
}

async function fetchAccurateStats(videoId: string) {
  const apiKey = process.env.YOUTUBE_DATA_API_KEY;
  if (!apiKey) return null;
  try {
    const res = await fetch(
      `https://www.googleapis.com/youtube/v3/videos?part=statistics&id=${videoId}&key=${apiKey}`,
      { next: { revalidate: 60 } }
    );
    if (!res.ok) return null;
    const data: YoutubeDataApiResponse = await res.json();
    const stats = data.items?.[0]?.statistics;
    if (!stats) return null;
    return {
      commentCount: stats.commentCount ? parseInt(stats.commentCount, 10) : null,
      viewCount: stats.viewCount ? parseInt(stats.viewCount, 10) : null,
      likeCount: stats.likeCount ? parseInt(stats.likeCount, 10) : null,
    };
  } catch (e) {
    console.error("YouTube Data API error:", e);
    return null;
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    const innertube = await getInnertube();
    const info = await innertube.getInfo(videoId);

    // Fetch accurate stats from YouTube Data API v3 (if key is available)
    const accurateStats = await fetchAccurateStats(videoId);

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

    // Calculate days since upload
    let daysSinceUpload: number | null = null;
    const publishedDate = info.basic_info.publish_date || info.basic_info.date;
    if (publishedDate) {
      const upload = new Date(publishedDate);
      const now = new Date();
      daysSinceUpload = (now.getTime() - upload.getTime()) / (1000 * 60 * 60 * 24);
    }

    // Try to get channel subscriber count
    let subscriberCount: number | null = null;
    try {
      const channelId = info.basic_info.channel_id;
      if (channelId) {
        const channel = await innertube.getChannel(channelId);
        const metadata = (channel as any).metadata;
        const subsText = metadata?.subscriber_count?.text || metadata?.subscriber_count;
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

    // Get comment count from multiple sources
    let commentCount: string | null = null;
    if (accurateStats?.commentCount != null) {
      commentCount = accurateStats.commentCount.toString();
    } else if (info.comments_entry_point_header?.comment_count) {
      commentCount = info.comments_entry_point_header.comment_count.toString();
    } else {
      commentCount = (info.basic_info as any).comment_count ?? null;
    }

    return NextResponse.json({
      title: info.basic_info.title,
      author: info.basic_info.author,
      thumbnail: info.basic_info.thumbnail?.[0]?.url,
      viewCount: accurateStats?.viewCount ?? info.basic_info.view_count,
      likeCount: accurateStats?.likeCount ?? info.basic_info.like_count,
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
