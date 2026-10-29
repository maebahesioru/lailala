import { notFound } from "next/navigation";
import ProfileView from "./profile-view";

// YouTube のチャンネルIDは「UC + 22文字」、ハンドルは「@name」。
// それ以外の形（/profile/INVALIDCHANNEL/ のようなURL）は
// 中身が空のまま 200 を返していた（ソフト404）のでここで 404 にする。
const CHANNEL_ID = /^UC[\w-]{22}$/;
const HANDLE = /^@[\w.\-]{3,30}$/;

export default async function ProfilePage({
  params,
}: {
  params: Promise<{ channelId: string }>;
}) {
  const { channelId } = await params;
  let decoded = channelId;
  try {
    decoded = decodeURIComponent(channelId);
  } catch {
    // 不正なパーセントエンコードはそのまま判定に回す
  }
  if (!CHANNEL_ID.test(decoded) && !HANDLE.test(decoded)) {
    notFound();
  }
  return <ProfileView params={params} />;
}
