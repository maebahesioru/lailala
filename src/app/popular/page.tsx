import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { CommentFeed } from "@/components/comment-feed";

export const metadata: Metadata = {
  title: "人気",
  description: "YouTubeのコメントを人気順で閲覧。",
};

export default function PopularPage() {
  return (
    <MainLayout>
      <CommentFeed videoId="niKAylKNIEI" defaultSort="TOP_COMMENTS" />
    </MainLayout>
  );
}
