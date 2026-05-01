"use client";

import { useState, useEffect } from "react";
import { CommentCard } from "@/components/comment-card";
import { ArrowLeft, Loader2, User } from "lucide-react";
import Link from "next/link";

interface ProfileComment {
  commentId: string;
  videoId: string;
  authorName: string;
  authorThumb: string | null;
  content: string;
  likeCount: number;
  replyCount: number;
  publishedAt: string;
}

export default function ProfilePage({ params }: { params: { channelId: string } }) {
  const { channelId } = params;
  const [comments, setComments] = useState<ProfileComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authorName, setAuthorName] = useState<string>("ユーザー");
  const [authorThumb, setAuthorThumb] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/profile/comments?channelId=${encodeURIComponent(channelId)}&page=${page}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setComments(data.comments);
          setTotalPages(data.totalPages);
          if (data.comments.length > 0) {
            setAuthorName(data.comments[0].authorName);
            setAuthorThumb(data.comments[0].authorThumb);
          }
        }
      })
      .catch(() => setError("読み込みに失敗しました"))
      .finally(() => setLoading(false));
  }, [channelId, page]);

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-[#2f3336] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div>
          <h1 className="text-lg font-bold">{authorName}</h1>
          <p className="text-[13px] text-[#71767b]">{comments.length} 件のコメント</p>
        </div>
      </div>

      {/* Author info */}
      <div className="px-4 py-6 border-b border-[#2f3336]">
        <div className="flex items-center gap-4">
          {authorThumb ? (
            <img src={authorThumb} alt={authorName} className="w-20 h-20 rounded-full object-cover border border-[#2f3336]" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-[#2f3336] flex items-center justify-center">
              <User size={32} className="text-[#71767b]" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{authorName}</h2>
            <p className="text-[13px] text-[#71767b] font-mono mt-1">{channelId}</p>
          </div>
        </div>
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
            <p>コメントが見つかりませんでした</p>
            <p className="text-[13px] mt-2">このユーザーのコメントはまだキャッシュされていません。</p>
          </div>
        ) : (
          comments.map((c) => (
            <div key={c.commentId} className="p-4 hover:bg-white/[0.03] transition-colors">
              <div className="flex items-start gap-3">
                <img
                  src={c.authorThumb || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='15' r='8' fill='%2371767b'/%3E%3Cellipse cx='20' cy='38' rx='14' ry='10' fill='%2371767b'/%3E%3C/svg%3E"}
                  alt={c.authorName}
                  className="w-10 h-10 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-bold text-[15px]">{c.authorName}</span>
                    <span className="text-[13px] text-[#71767b]">
                      {new Date(c.publishedAt).toLocaleDateString("ja-JP")}
                    </span>
                  </div>
                  <p className="text-[15px] leading-relaxed whitespace-pre-wrap break-words">{c.content}</p>
                  <div className="flex items-center gap-4 mt-3 text-[13px] text-[#71767b]">
                    <span className="flex items-center gap-1">
                      <span className="text-[#f91880]">♥</span> {c.likeCount}
                    </span>
                    <span>返信 {c.replyCount}</span>
                    <Link
                      href={`/?v=${c.videoId}`}
                      className="text-[#1d9bf0] hover:underline"
                    >
                      動画を見る
                    </Link>
                  </div>
                </div>
              </div>
            </div>
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
  );
}
