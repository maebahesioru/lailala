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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "ライララ(仮)",
    url: "https://lailala.vercel.app",
    description: "YouTubeコメントをX/Twitter風に",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://lailala.vercel.app/search?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  };

  return (
    <MainLayout>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <CommentFeed videoId="niKAylKNIEI" />
    </MainLayout>
  );
}
