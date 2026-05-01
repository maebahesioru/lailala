"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import {
  ArrowLeft,
  Bookmark,
  Loader2,
  User,
  ThumbsUp,
  ThumbsDown,
  MessageCircle,
} from "lucide-react";
import Link from "next/link";
import { ShareMenu } from "@/components/share-menu";
import { LoginPopup } from "@/components/login-popup";
import { MentionText } from "@/components/mention-text";
import { stripHandlePrefix, stripEditedTag, localizeTime } from "@/lib/i18n";

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
  const { user } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch("/api/bookmarks")
      .then((r) => r.json())
      .then((data) => {
        if (data.bookmarks) setBookmarks(data.bookmarks);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [user]);

  const removeBookmark = async (commentId: string) => {
    try {
      await fetch(`/api/bookmarks?commentId=${commentId}`, { method: "DELETE" });
      setBookmarks((prev) => prev.filter((b) => b.commentId !== commentId));
    } catch {}
  };

  const handleLike = async (e: React.MouseEvent, b: BookmarkItem) => {
    e.stopPropagation();
    if (!user) { setShowLogin(true); return; }
    // ブックマークページでは投票状態を持たないので軽くトースト表示でも…
    // 一旦API叩くだけ
    try {
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: b.videoId, commentId: b.commentId, action: "like" }),
      });
    } catch {}
  };

  const handleDislike = async (e: React.MouseEvent, b: BookmarkItem) => {
    e.stopPropagation();
    if (!user) { setShowLogin(true); return; }
    try {
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: b.videoId, commentId: b.commentId, action: "dislike" }),
      });
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
            <article
              key={b.id}
              className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
              onClick={() => router.push(`/thread/${b.commentId}`)}
            >
              <div className="flex gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {b.authorThumb ? (
                    <img
                      src={b.authorThumb}
                      alt={b.authorName}
                      className="w-10 h-10 rounded-full object-cover shrink-0"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] truncate">
                      {stripHandlePrefix(b.authorName)}
                    </span>
                    <span className="text-muted text-[15px]">·</span>
                    <span className="text-muted text-[15px] shrink-0">{localizeTime(b.publishedTime)}</span>
                  </div>
                  <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed">
                    <MentionText content={stripEditedTag(b.content)} />
                  </p>

                  <div className="flex items-center justify-between mt-3 gap-1 flex-wrap">
                    <button
                      onClick={(e) => handleLike(e, b)}
                      className="flex items-center gap-1.5 text-[13px] text-muted hover:text-[#f91880] transition-colors"
                      title="高評価"
                    >
                      <ThumbsUp size={18} />
                      <span>{b.likeCount}</span>
                    </button>

                    <button
                      onClick={(e) => handleDislike(e, b)}
                      className="flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"
                      title="低評価"
                    >
                      <ThumbsDown size={18} />
                    </button>

                    <Link
                      href={`/thread/${b.commentId}`}
                      onClick={(e) => e.stopPropagation()}
                      className="flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"
                    >
                      <MessageCircle size={18} />
                      <span>{b.replyCount || 0}</span>
                    </Link>

                    <div onClick={(e) => e.stopPropagation()}>
                      <ShareMenu
                        url={`${typeof window !== "undefined" ? window.location.origin : ""}/thread/${b.commentId}`}
                        text={`${b.authorName}: ${b.content}`}
                      />
                    </div>

                    <button
                      onClick={(e) => { e.stopPropagation(); removeBookmark(b.commentId); }}
                      className="flex items-center gap-1.5 text-[13px] text-primary transition-colors"
                      title="ブックマーク解除"
                    >
                      <Bookmark size={18} fill="currentColor" />
                    </button>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </MainLayout>
  );
}
