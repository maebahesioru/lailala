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
      {/* 見出しが1つも無いページだったので、読み上げ用の h1 を置く */}
      <h1 className="sr-only">人気のコメント</h1>
      <CommentFeed videoId="niKAylKNIEI" defaultSort="TOP_COMMENTS" />
    </MainLayout>
  );
}
