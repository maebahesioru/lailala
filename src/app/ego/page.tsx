"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AtSign, Plus, X } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { MainLayout } from "@/components/main-layout";
import { threadPath } from "@/lib/thread-url";
import { avatarColor, avatarLetter } from "@/lib/avatar-utils";
import { onImgError } from "@/lib/img-fallback";

type Keyword = { id: string; word: string; lastSeenAt: string | null };

type FeedItem = {
  commentId: string;
  videoId: string;
  word: string;
  content: string;
  authorName: string;
  authorThumb: string | null;
  likeCount: number;
  replyCount: number;
  publishedAt: string;
  isNew: boolean;
};

function formatWhen(iso: string): string {
  const then = new Date(iso);
  const diff = Date.now() - then.getTime();
  const min = Math.floor(diff / 60_000);
  if (min < 1) return "たった今";
  if (min < 60) return `${min}分前`;
  const hour = Math.floor(min / 60);
  if (hour < 24) return `${hour}時間前`;
  const day = Math.floor(hour / 24);
  if (day < 30) return `${day}日前`;
  return then.toLocaleDateString("ja-JP", { year: "numeric", month: "numeric", day: "numeric" });
}

export default function EgoPage() {
  const [keywords, setKeywords] = useState<Keyword[]>([]);
  const [items, setItems] = useState<FeedItem[]>([]);
  const [unread, setUnread] = useState(0);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);

  const load = useCallback(async (markSeen: boolean) => {
    setLoading(true);
    setError(null);
    try {
      const [kRes, fRes] = await Promise.all([
        fetch("/api/ego/keywords/", { cache: "no-store" }),
        fetch(`/api/ego/feed/${markSeen ? "?markSeen=1" : ""}`, { cache: "no-store" }),
      ]);
      if (kRes.status === 401 || fRes.status === 401) {
        setError("ログインするとエゴサを使えます。");
        setLoading(false);
        return;
      }
      const kData = await kRes.json().catch(() => ({}));
      const fData = await fRes.json().catch(() => ({}));
      setKeywords(Array.isArray(kData.keywords) ? kData.keywords : []);
      setItems(Array.isArray(fData.items) ? fData.items : []);
      setUnread(typeof fData.unread === "number" ? fData.unread : 0);
    } catch {
      setError("読み込みに失敗しました。時間をおいて再試行してください。");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load(true);
  }, [load]);

  const addKeyword = useCallback(async () => {
    const word = input.trim();
    if (!word) return;
    setNotice(null);
    try {
      const res = await fetch("/api/ego/keywords/", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setNotice(data.error ?? "登録に失敗しました。");
        return;
      }
      setInput("");
      await load(false);
    } catch {
      setNotice("登録に失敗しました。時間をおいて再試行してください。");
    }
  }, [input, load]);

  const removeKeyword = useCallback(
    async (id: string) => {
      setNotice(null);
      try {
        await fetch(`/api/ego/keywords/?id=${encodeURIComponent(id)}`, { method: "DELETE" });
        await load(false);
      } catch {
        setNotice("削除に失敗しました。");
      }
    },
    [load]
  );

  const headline = useMemo(() => {
    if (loading) return "読み込み中…";
    if (keywords.length === 0) return "エゴサ語を登録すると、その語を含むコメントがここに流れてきます。";
    if (unread > 0) return `新着 ${unread} 件（${keywords.map((k) => k.word).join(" / ")}）`;
    return `${keywords.map((k) => k.word).join(" / ")} の該当コメント`;
  }, [loading, keywords, unread]);

  return (
    <MainLayout>
    <div className="min-h-screen">
      <PageHeader title="エゴサ" subtitle="自分の名前や気になる語を登録すると、コメント欄から拾って並べます" />

      <div className="border-b border-border p-4 space-y-3">
        <form
          className="flex items-center gap-2"
          onSubmit={(e) => {
            e.preventDefault();
            void addKeyword();
          }}
        >
          <div className="flex-1 flex items-center gap-2 rounded-full bg-[#202327] px-4 h-11">
            <AtSign size={16} className="text-muted shrink-0" aria-hidden="true" />
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="エゴサ語を追加（例: 自分の名前）"
              aria-label="エゴサ語"
              maxLength={40}
              className="flex-1 bg-transparent text-[15px] outline-none placeholder:text-muted"
            />
          </div>
          <button
            type="submit"
            className="h-11 px-4 rounded-full bg-primary text-white text-[15px] font-bold hover:brightness-110 transition disabled:opacity-50"
            disabled={input.trim().length === 0}
          >
            追加
          </button>
        </form>

        {keywords.length > 0 && (
          <ul className="flex flex-wrap gap-2">
            {keywords.map((keyword) => (
              <li key={keyword.id}>
                <span className="inline-flex items-center gap-1 rounded-full bg-[#1d9bf0]/15 text-[#1d9bf0] pl-3 pr-2 py-1 text-[13px] font-bold">
                  {keyword.word}
                  <button
                    type="button"
                    onClick={() => void removeKeyword(keyword.id)}
                    aria-label={`${keyword.word} を削除`}
                    className="rounded-full p-0.5 hover:bg-[#1d9bf0]/20"
                  >
                    <X size={14} aria-hidden="true" />
                  </button>
                </span>
              </li>
            ))}
          </ul>
        )}

        <p className="text-[13px] text-muted">{headline}</p>
        {notice && <p className="text-[13px] text-[#f4212e]">{notice}</p>}
        {error && <p className="text-[13px] text-[#f4212e]">{error}</p>}
      </div>

      <h1 className="sr-only">エゴサ</h1>

      {keywords.length > 0 && !loading && items.length === 0 && (
        <div className="p-8 text-center text-muted text-[15px]">
          まだ該当するコメントがありません。同期が進むと増えます。
        </div>
      )}

      <ul>
        {items.map((item) => (
          <li key={item.commentId} className="border-b border-border p-4">
            <div className="flex gap-3">
              <div className="shrink-0">
                {item.authorThumb ? (
                  <img
                    src={item.authorThumb}
                    alt=""
                    width={40}
                    height={40}
                    loading="lazy"
                    onError={onImgError}
                    className="h-10 w-10 rounded-full object-cover"
                  />
                ) : (
                  <span
                    className="h-10 w-10 rounded-full flex items-center justify-center text-[15px] font-bold text-white"
                    style={{ backgroundColor: avatarColor(item.authorName) }}
                    aria-hidden="true"
                  >
                    {avatarLetter(item.authorName)}
                  </span>
                )}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 text-[15px]">
                  <span className="font-bold truncate">{item.authorName}</span>
                  <span className="text-muted">·</span>
                  <span className="text-muted shrink-0">{formatWhen(item.publishedAt)}</span>
                  {item.isNew && (
                    <span className="shrink-0 rounded-full bg-[#00ba7c]/15 px-2 py-0.5 text-[11px] font-bold text-[#00ba7c]">
                      新着
                    </span>
                  )}
                </div>
                <Link href={threadPath(item.commentId)} className="block mt-1 hover:underline">
                  <p className="text-[15px] leading-5 whitespace-pre-wrap break-words">{item.content}</p>
                </Link>
                <div className="mt-2 flex items-center gap-4 text-[13px] text-muted">
                  <span>♥ {item.likeCount}</span>
                  <span>返信 {item.replyCount}</span>
                  <span className="rounded-full bg-white/5 px-2 py-0.5">{item.word}</span>
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
    </MainLayout>
  );
}
