import type { Metadata } from "next";
import { notFound } from "next/navigation";
import ProfileView from "./profile-view";
import { pageMetadata } from "@/lib/page-metadata";

// YouTube のチャンネルIDは「UC + 22文字」、ハンドルは「@name」。
// それ以外の形（/profile/INVALIDCHANNEL/ のようなURL）は
// 中身が空のまま 200 を返していた（ソフト404）のでここで 404 にする。
const CHANNEL_ID = /^UC[\w-]{22}$/;
const HANDLE = /^@[\w.\-]{3,30}$/;

function decodeParam(value: string): string {
  try {
    return decodeURIComponent(value);
  } catch {
    return value;
  }
}

// 動的セグメントを持たない profile/layout.tsx では params.channelId が
// 入らず、canonical が `/profile/undefined/` になっていた。
// params を受け取れるこのページ側でメタデータを作る。
export async function generateMetadata({
  params,
}: {
  params: Promise<{ channelId: string }>;
}): Promise<Metadata> {
  const { channelId } = await params;
  const decoded = decodeParam(channelId);
  if (!CHANNEL_ID.test(decoded) && !HANDLE.test(decoded)) {
    return { title: "ページが見つかりません", robots: { index: false, follow: false } };
  }
  return pageMetadata({
    title: `${decoded} のプロフィール`,
    description: "このチャンネルのライララ(仮)での投稿・いいね・ブックマークを表示。",
    path: `/profile/${decoded}/`,
  });
}

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const { channelId } = await params;
  const decoded = decodeParam(channelId);
  if (!CHANNEL_ID.test(decoded) && !HANDLE.test(decoded)) {
    notFound();
  }
  return <ProfileView params={params} />;
}
