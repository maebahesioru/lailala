import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "検索",
  description: "YouTubeコメントをキーワードで検索できる。",
  path: "/search/",
});

export default function SearchLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
