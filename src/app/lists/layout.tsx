import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "リスト",
  description: "作成したリストやフォロー中のリストを管理",
};

export default function ListsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
