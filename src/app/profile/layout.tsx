import type { Metadata } from "next";
import { pageMetadata } from "@/lib/page-metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ channelId: string }>;
}): Promise<Metadata> {
  const { channelId } = await params;
  return pageMetadata({
    title: "プロフィール",
    description: "このチャンネルのライララ(仮)での投稿・いいね・ブックマークを表示。",
    path: `/profile/${encodeURIComponent(channelId)}/`,
  });
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
