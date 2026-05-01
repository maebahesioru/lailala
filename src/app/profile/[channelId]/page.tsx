"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, Loader2, User, ThumbsUp, MessageCircle } from "lucide-react";
import Link from "next/link";

interface ProfileComment {
  commentId: string;
  videoId: string;
  authorName: string;
  authorChannelId: string | null;
  authorThumb: string | null;
  content: string;
  likeCount: number;
  replyCount: number;
  publishedAt: string;
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "数秒前";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}日前`;
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" });
}

function safeName(name: string | null | undefined, channelId?: string | null): string {
  if (name && name !== "Unknown" && name.trim() !== "") return name;
  if (channelId) {
    const id = channelId.startsWith("UC") ? channelId : `UC${channelId}`;
    return id;
  }
  return "名無し";
}

export default function ProfilePage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = use(params);
  const router = useRouter();
  const [comments, setComments] = useState<ProfileComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authorName, setAuthorName] = useState<string>("");
  const [authorThumb, setAuthorThumb] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<"comments" | "replies">("comments");

  useEffect(() => {
    setLoading(true);
    const type = activeTab === "comments" ? "comment" : "reply";
    fetch(`/api/profile/comments?channelId=${encodeURIComponent(channelId)}&page=${page}&type=${type}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setComments(data.comments);
          setTotalPages(data.totalPages);
          if (data.comments.length > 0) {
            setAuthorName(safeName(data.comments[0].authorName, data.comments[0].authorChannelId));
            setAuthorThumb(data.comments[0].authorThumb);
          } else {
            // Keep previous name if we already have it, otherwise derive from channelId
            setAuthorName((prev) => prev || safeName(null, channelId));
          }
        }
      })
      .catch(() => setError("読み込みに失敗しました"))
      .finally(() => setLoading(false));
  }, [channelId, page, activeTab]);

  const handleTabChange = (tab: "comments" | "replies") => {
    setActiveTab(tab);
    setPage(1);
  };

  const displayName = authorName || safeName(null, channelId);

  return (
    <MainLayout>
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-[#2f3336] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-bold">{displayName}</h1>
          <p className="text-[13px] text-[#71767b]">{comments.length} 件のコメント</p>
        </div>
      </div>

      {/* Author info */}
      <div className="px-4 py-6 border-b border-[#2f3336]">
        <div className="flex items-center gap-4">
          {authorThumb ? (
            <img src={authorThumb} alt={displayName} className="w-20 h-20 rounded-full object-cover border border-[#2f3336]" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-border flex items-center justify-center">
              <User size={32} className="text-muted" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{displayName}</h2>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2f3336]">
        <button
          onClick={() => handleTabChange("comments")}
          className={`flex-1 py-4 text-center font-medium hover:bg-white/5 transition-colors relative ${activeTab === "comments" ? "text-foreground" : "text-muted"}`}
        >
          投稿
          {activeTab === "comments" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => handleTabChange("replies")}
          className={`flex-1 py-4 text-center font-medium hover:bg-white/5 transition-colors relative ${activeTab === "replies" ? "text-foreground" : "text-muted"}`}
        >
          返信
          {activeTab === "replies" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
          )}
        </button>
      </div>

      {/* Comments */}
      <div className="divide-y divide-[#2f3336]">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#2f3336]" />
                <div className="h-4 w-24 bg-[#2f3336] rounded" />
              </div>
              <div className="h-4 w-full bg-[#2f3336] rounded" />
              <div className="h-4 w-2/3 bg-[#2f3336] rounded" />
            </div>
          ))
        ) : error ? (
          <div className="p-12 text-center text-red-400">
            <p>{error}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="p-12 text-center text-[#71767b]">
            <User size={32} className="mx-auto mb-3 opacity-50" />
            <p>{activeTab === "comments" ? "投稿" : "返信"}が見つかりませんでした</p>
            <p className="text-[13px] mt-2">
              {activeTab === "replies"
                ? "このユーザーの返信はまだキャッシュされていません。"
                : "このユーザーのコメントはまだキャッシュされていません。"}
            </p>
          </div>
        ) : (
          comments.map((c) => (
            <article
              key={c.commentId}
              className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
              onClick={() => router.push(`/thread/${c.commentId}`)}
            >
              <div className="flex gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {c.authorThumb ? (
                    <img src={c.authorThumb} alt={safeName(c.authorName, c.authorChannelId)} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] truncate">{safeName(c.authorName, c.authorChannelId)}</span>
                    <span className="text-muted text-[15px]">·</span>
                    <span className="text-muted text-[15px] shrink-0">{formatRelativeTime(c.publishedAt)}</span>
                  </div>
                  <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed break-words">{c.content}</p>

                  <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp size={16} />
                      <span>{c.likeCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={16} />
                      <span>{c.replyCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="px-4 py-2 rounded-full bg-[#1d9bf0] text-white text-[13px] font-medium hover:bg-[#1a8cd8] disabled:opacity-50 transition-colors"
          >
            前へ
          </button>
          <span className="text-[13px] text-[#71767b]">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="px-4 py-2 rounded-full bg-[#1d9bf0] text-white text-[13px] font-medium hover:bg-[#1a8cd8] disabled:opacity-50 transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
    </MainLayout>
  );
}
