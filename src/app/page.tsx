import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { CommentFeed } from "@/components/comment-feed";

export const metadata: Metadata = {
  title: "ホーム",
  description: "YouTubeのコメントをX/Twitter風のタイムラインで閲覧。人気順・新着順でコメントをチェックしよう。",
  openGraph: {
    title: "ホーム | ライララ(仮)",
    description: "YouTubeのコメントをX/Twitter風のタイムラインで閲覧。人気順・新着順でコメントをチェックしよう。",
  },
};

export default function Home() {

  return (
    <MainLayout>
      <CommentFeed videoId="niKAylKNIEI" />
    </MainLayout>
  );
}
