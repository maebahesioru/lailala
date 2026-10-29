import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { pageMetadata } from "@/lib/page-metadata";

// YouTube のチャンネルIDは「UC + 22文字」、ハンドルは「@name」。
// それ以外の形（/profile/INVALIDCHANNEL/ など）は中身が空のまま 200 を
// 返していた（ソフト404）。metadata はストリーミング開始前に解決されるため、
// ここで notFound() を呼べばステータスコードが 404 になる。
const CHANNEL_ID = /^UC[\w-]{22}$/;
const HANDLE = /^@[\w.\-]{3,30}$/;

function isValidChannelParam(raw: string): boolean {
  let v = raw;
  try {
    v = decodeURIComponent(raw);
  } catch {
    // 不正なパーセントエンコードはそのまま判定する
  }
  return CHANNEL_ID.test(v) || HANDLE.test(v);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ channelId: string }>;
}): Promise<Metadata> {
  const { channelId } = await params;
  if (!isValidChannelParam(channelId)) notFound();
  return pageMetadata({
    title: "プロフィール",
    description: "このチャンネルのライララ(仮)での投稿・いいね・ブックマークを表示。",
    path: `/profile/${encodeURIComponent(channelId)}/`,
  });
}

export default function ProfileLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
