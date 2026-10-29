import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { pageMetadata } from "@/lib/page-metadata";
import { CommentFeed } from "@/components/comment-feed";

export const metadata: Metadata = pageMetadata({
  title: "人気",
  description: "YouTubeのコメントを人気順で閲覧できる。",
  path: "/popular/",
});

export default function PopularPage() {
  return (
    <MainLayout>
      <CommentFeed videoId="niKAylKNIEI" defaultSort="TOP_COMMENTS" />
    </MainLayout>
  );
}
