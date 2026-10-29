import { NextRequest, NextResponse } from "next/server";
import { getInnertube } from "@/lib/youtube";
import { YTNodes } from "youtubei.js";
import { getFeedPoll } from "@/lib/feed-poll-cache";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const videoId = searchParams.get("videoId");

  if (!videoId) {
    return NextResponse.json({ error: "videoId required" }, { status: 400 });
  }

  try {
    // 同じ動画の情報は 60 秒だけ共有する。フィードはタブを開くたびにこの
    // エンドポイントを叩くが、素で毎回 getInfo() を呼ぶと上流へ 1 秒級の
    // リクエストがそのまま出ていく（実測 0.81〜1.25 秒/回）。同時多発も
    // in-flight で 1 本に畳まれる。
    const { value } = await getFeedPoll(`videoinfo:${videoId}`, async () => {
      const innertube = await getInnertube();
      const info = await innertube.getInfo(videoId);

      // RYD APIで低評価を取得
      let rydData: { likes?: number; dislikes?: number; rating?: number } = {};
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

      // 「高評価率」は likes / (likes + dislikes) で出す。RYD の rating は 0-5 の
      // 推定スコアで、同じレスポンスの likes/dislikes から計算した比率とズレる
      // （実測: rating 5→4.8945 = 97.89% だが 621500/(621500+16837) は 97.36%）。
      // 画面には高評価/低評価の実数も並べて出しているので、数字と食い違って
      // 見えないよう実数から算出し、無いときだけ rating にフォールバックする。
      const rydLikes = typeof rydData.likes === "number" ? rydData.likes : null;
      const rydDislikes = typeof rydData.dislikes === "number" ? rydData.dislikes : null;
      const likeRatio =
        rydLikes != null && rydDislikes != null && rydLikes + rydDislikes > 0
          ? Math.round((rydLikes / (rydLikes + rydDislikes)) * 100)
          : rydData.rating != null
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

      function parseSubscriberCount(text: string | undefined): number | null {
        if (!text || text === "N/A") return null;
        const match = String(text).match(/([\d,\.]+)/);
        if (!match) return null;
        const num = parseFloat(match[1].replace(/,/g, ""));
        const upper = text.toUpperCase();
        let unit = 1;
        if (text.includes("億")) unit = 100000000;
        else if (text.includes("万")) unit = 10000;
        else if (text.includes("千")) unit = 1000;
        else if (upper.includes("M")) unit = 1000000;
        else if (upper.includes("K")) unit = 1000;
        return Math.round(num * unit);
      }

      // Get channel subscriber count from video secondary info (VideoOwner)
      let subscriberCount: number | null = null;
      const subsText = info.secondary_info?.owner?.subscriber_count?.toString();
      if (subsText) {
        subscriberCount = parseSubscriberCount(subsText);
      }

      // Fallback: try fetching from channel page directly
      if (subscriberCount == null) {
        try {
          const channelId = info.basic_info.channel_id;
          if (channelId) {
            const channel = await innertube.getChannel(channelId);
            const header = (channel as any).header;
            const channelSubsText = header?.subscribers?.toString?.() || header?.subscriber_count?.toString?.();
            if (channelSubsText) {
              subscriberCount = parseSubscriberCount(channelSubsText);
            }
          }
        } catch (e) {
          console.error("Failed to get subscriber count from channel:", e);
        }
      }

      // Get comment count from InnerTube sources
      let commentCount: string | null = null;
      if (info.comments_entry_point_header?.comment_count) {
        commentCount = info.comments_entry_point_header.comment_count.toString();
      } else {
        commentCount = (info.basic_info as any).comment_count ?? null;
      }

      return {
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
      };
    });

    return NextResponse.json(value);
  } catch (e: any) {
    const raw = e?.message || "";
    // 上流の生メッセージ（"This video is unavailable" 等）を 500 で返すと
    // UI に英語のまま出るので、原因別に振り分けて日本語で返す。
    if (/unavailable|private|removed|did not have any content|no longer available/i.test(raw)) {
      return NextResponse.json(
        { error: "この動画は取得できませんでした（非公開・削除・地域制限の可能性があります）" },
        { status: 404 }
      );
    }
    console.error("[video-info] failed:", raw);
    return NextResponse.json(
      { error: "動画情報の取得に失敗しました。時間をおいて再試行してください。" },
      { status: 502 }
    );
  }
}
