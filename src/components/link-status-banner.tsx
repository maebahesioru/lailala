"use client";

import { useAuth } from "./auth-provider";

/**
 * ログイン cookie は生きているが YouTube の認証情報が失われている状態を明示する。
 * これを出さないと「ログイン中に見えるのに投稿できない」嘘をつくことになる。
 */
export function LinkStatusBanner() {
  const { user, loading } = useAuth();
  if (loading || !user || user.youtubeLinked !== false) return null;

  return (
    <div
      role="alert"
      className="border-b border-[#2f3336] bg-[#3a1d1d]/70 px-4 py-3"
    >
      <p className="text-[15px] font-bold text-white">YouTubeとの連携が切れています</p>
      <p className="mt-1 text-[13px] leading-5 text-[#c7c7c7]">
        サイトへのログインは残っていますが、YouTube側の認証が無効になっています。
        この状態では<strong className="text-white">投稿・いいね・返信・通知はできません</strong>。
      </p>
      <button
        type="button"
        onClick={() => window.dispatchEvent(new Event("lailala:open-login"))}
        className="mt-2 rounded-full bg-[#1d9bf0] px-4 py-1.5 text-[13px] font-bold text-white hover:bg-[#1a8cd8]"
      >
        再連携する
      </button>
    </div>
  );
}
