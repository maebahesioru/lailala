import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ブックマーク",
  description: "保存したYouTubeコメントのブックマーク一覧",
};

export default function BookmarksLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
