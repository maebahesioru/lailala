import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "リスト",
  description: "作成したコメントリスト",
};

export default function ListsLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
