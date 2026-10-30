import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export const metadata: Metadata = pageMetadata({
  title: "エゴサ",
  description: "登録した語を含むコメントを YouTube のコメント欄から拾って新しい順に並べます。",
  path: "/ego/",
  noIndex: true,
});

export default function EgoLayout({ children }: { children: React.ReactNode }) {
  return children;
}
