"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, Bookmark, Loader2, User, Trash2 } from "lucide-react";
import Link from "next/link";

interface BookmarkItem {
  id: string;
  commentId: string;
  videoId: string;
  authorName: string;
  authorThumb: string | null;
  content: string;
  likeCount: string;
  replyCount: string;
  publishedTime: string;
  createdAt: string;
}

export default function BookmarksPage() {
  const { data: session } = useSession();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!session?.user) return;
    fetch("/api/bookmarks")
      .then((r) => r.json())
      .then((data) => {
        if (data.bookmarks) setBookmarks(data.bookmarks);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [session]);

  const removeBookmark = async (commentId: string) => {
    try {
      await fetch(`/api/bookmarks?commentId=${commentId}`, { method: "DELETE" });
      setBookmarks((prev) => prev.filter((b) => b.commentId !== commentId));
    } catch {}
  };

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">ブックマーク</h1>
      </div>

      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <Bookmark size={32} className="mx-auto mb-3 opacity-50" />
            <p>ブックマークがありません</p>
            <p className="text-[13px] mt-2">コメントのブックマークボタンから保存できます</p>
          </div>
        ) : (
          bookmarks.map((b) => (
            <div key={b.id} className="p-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start gap-3">
                {b.authorThumb ? (
                  <img src={b.authorThumb} alt="" className="w-10 h-10 rounded-full object-cover flex-shrink-0" />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center flex-shrink-0">
                    <User size={20} className="text-muted" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[15px]">{b.authorName}</span>
                    <span className="text-[13px] text-muted">{b.publishedTime}</span>
                  </div>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{b.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                    <span>♥ {b.likeCount}</span>
                    <span>返信 {b.replyCount}</span>
                    <Link href={`/?v=${b.videoId}`} className="text-primary hover:underline">
                      動画を見る
                    </Link>
                    <button
                      onClick={() => removeBookmark(b.commentId)}
                      className="text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                    >
                      <Trash2 size={14} />
                      削除
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
