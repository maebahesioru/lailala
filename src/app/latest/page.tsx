import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { CommentFeed } from "@/components/comment-feed";

export const metadata: Metadata = {
  title: "新着",
  description: "YouTubeのコメントを新着順で閲覧。",
};

export default function LatestPage() {
  return (
    <MainLayout>
      <CommentFeed videoId="niKAylKNIEI" defaultSort="NEWEST_FIRST" />
    </MainLayout>
  );
}
