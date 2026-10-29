import type { Metadata } from "next";
import { MainLayout } from "@/components/main-layout";
import { pageMetadata } from "@/lib/page-metadata";
import { CommentFeed } from "@/components/comment-feed";

export const metadata: Metadata = pageMetadata({
  title: "新着",
  description: "YouTubeのコメントを新着順で閲覧できる。",
  path: "/latest/",
});

export default function LatestPage() {
  return (
    <MainLayout>
      <h1 className="sr-only">新着コメント</h1>
      <CommentFeed videoId="niKAylKNIEI" defaultSort="NEWEST_FIRST" />
    </MainLayout>
  );
}
