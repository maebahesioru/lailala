import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "プロフィール",
  description: "ユーザープロフィール",
};

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
