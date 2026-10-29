import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "検索",
  description: "YouTubeコメントをキーワードで検索できる。",
  path: "/search/",
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      {/* Suspense の内側だと初期HTMLに出ないので、シェル側に読み上げ用の h1 を置く */}
      <h1 className="sr-only">検索</h1>
      {children}
    </>
  );
}
