"use client";

import { useState } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Trash2, Heart, Share, Bookmark } from "lucide-react";
import { YtComment } from "@/types/youtube";
import { useSession, signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { localizeTime, stripHandlePrefix, stripEditedTag, formatDetailedTime } from "@/lib/i18n";
import Link from "next/link";
import { MentionText } from "./mention-text";
import { LoginPopup } from "./login-popup";
import { formatCount } from "./comment-card";

interface ReplyCardProps {
  reply: YtComment;
  videoId?: string;
  parentCommentId?: string;
  onDelete?: (commentId: string) => void;
}

function parseReplyTo(content: string): { replyTo: string | null; displayContent: string } {
  const match = content.match(/^@([^\s@]+)\s*/);
  if (match) {
    return {
      replyTo: match[1],
      displayContent: content.slice(match[0].length),
    };
  }
  return { replyTo: null, displayContent: content };
}

export function ReplyCard({ reply, videoId = "niKAylKNIEI", parentCommentId, onDelete }: ReplyCardProps) {
  const { data: session } = useSession();
  const router = useRouter();
  const [liked, setLiked] = useState(reply.isLiked || false);
  const [disliked, setDisliked] = useState(reply.isDisliked || false);
  const [localLikes, setLocalLikes] = useState(parseLikeCount(reply.likeCount));
  const [showLogin, setShowLogin] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [shareMessage, setShareMessage] = useState("");

  const { replyTo, displayContent } = parseReplyTo(reply.content);
  const detailTime = formatDetailedTime(reply.publishedTime);

  const handleLike = async () => {
    if (!session?.user) { setShowLogin(true); return; }
    try {
      const action = liked ? "unlike" : "like";
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, commentId: reply.commentId, action }),
      });
      setLiked(!liked);
      setLocalLikes((prev) => (liked ? prev - 1 : prev + 1));
      if (disliked) setDisliked(false);
    } catch {}
  };

  const handleDislike = async () => {
    if (!session?.user) { setShowLogin(true); return; }
    try {
      const action = disliked ? "undislike" : "dislike";
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, commentId: reply.commentId, action }),
      });
      setDisliked(!disliked);
      if (liked) { setLiked(false); setLocalLikes((prev) => prev - 1); }
    } catch {}
  };

  const handleDelete = async () => {
    if (!session?.user) return;
    if (!confirm("この返信を削除しますか？")) return;
    try {
      await fetch(`/api/comments/delete?videoId=${videoId}&commentId=${reply.commentId}`, { method: "DELETE" });
      onDelete?.(reply.commentId);
    } catch {}
  };

  const handleShare = async () => {
    const url = `${window.location.origin}/thread/${reply.commentId}`;
    const text = `${reply.author.name}: ${reply.content}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "ライララ", text, url });
      } else {
        await navigator.clipboard.writeText(url);
        setShareMessage("リンクをコピーしました");
        setTimeout(() => setShareMessage(""), 2000);
      }
    } catch {
      await navigator.clipboard.writeText(url);
      setShareMessage("リンクをコピーしました");
      setTimeout(() => setShareMessage(""), 2000);
    }
  };

  const handleBookmark = async () => {
    if (!session?.user) { setShowLogin(true); return; }
    try {
      if (bookmarked) {
        await fetch(`/api/bookmarks?commentId=${reply.commentId}`, { method: "DELETE" });
        setBookmarked(false);
      } else {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentId: reply.commentId,
            videoId,
            authorName: reply.author.name,
            authorThumb: reply.author.thumbnail,
            content: reply.content,
            likeCount: reply.likeCount,
            replyCount: reply.replyCount,
            publishedTime: reply.publishedTime,
          }),
        });
        setBookmarked(true);
      }
    } catch {}
  };

  const threadLink = `/thread/${reply.commentId}`;

  return (
    <>
      <article className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text">
        <div className="flex gap-3">
          <Link href={`/profile/${encodeURIComponent(reply.author.channelId || "")}`} className="shrink-0">
            <img
              src={reply.author.thumbnail || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40'%3E%3Crect width='40' height='40' fill='%23333'/%3E%3C/svg%3E"}
              alt={reply.author.name}
              className="w-10 h-10 rounded-full object-cover"
            />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="cursor-pointer" onClick={() => router.push(threadLink)}>
              <div className="flex items-center gap-2 flex-wrap">
                <Link href={`/profile/${encodeURIComponent(reply.author.channelId || "")}`} className="font-bold text-[15px] truncate hover:underline" onClick={(e) => e.stopPropagation()}>
                  {stripHandlePrefix(reply.author.name)}
                </Link>
                {reply.author.isChannelOwner && (
                  <span className="text-xs bg-primary text-white px-1.5 rounded-full flex items-center gap-0.5">
                    <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                    投稿者
                  </span>
                )}
                {reply.isHearted && (
                  <span className="bg-[#f91880] text-white p-1 rounded-full flex items-center justify-center" title="投稿者がハートしました">
                    <Heart size={14} fill="currentColor" />
                  </span>
                )}
                <span className="text-muted text-[15px]">·</span>
                <span className="text-muted text-[15px] shrink-0">{localizeTime(reply.publishedTime)}</span>
              </div>
              {replyTo && (
                <div className="text-[13px] text-muted mt-0.5">
                  返信先: <span className="text-primary">@{replyTo}</span>
                </div>
              )}
              <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed">
                <MentionText content={stripEditedTag(displayContent)} />
              </p>
              {/* X-style detailed timestamp */}
              <p className="text-[13px] text-muted mt-2">{detailTime}</p>
            </div>

            <div className="flex items-center justify-between mt-3 max-w-md">
              <button
                onClick={(e) => { e.stopPropagation(); handleLike(); }}
                className={`flex items-center gap-1.5 text-[13px] transition-colors ${liked ? "text-[#f91880]" : "text-muted hover:text-[#f91880]"}`}
                title="高評価"
              >
                <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                {localLikes > 0 && <span>{formatCount(localLikes)}</span>}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleDislike(); }}
                className={`flex items-center gap-1.5 text-[13px] transition-colors ${disliked ? "text-primary" : "text-muted hover:text-primary"}`}
                title="低評価"
              >
                <ThumbsDown size={18} fill={disliked ? "currentColor" : "none"} />
              </button>

              <Link
                href={threadLink}
                className="flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"
              >
                <MessageCircle size={18} />
                {reply.replyCount !== "0" && <span>{reply.replyCount}</span>}
              </Link>

              <button
                onClick={(e) => { e.stopPropagation(); handleShare(); }}
                className="flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"
                title="シェア"
              >
                <Share size={18} />
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleBookmark(); }}
                className={`flex items-center gap-1.5 text-[13px] transition-colors ${bookmarked ? "text-primary" : "text-muted hover:text-primary"}`}
                title={bookmarked ? "ブックマーク済み" : "ブックマーク"}
              >
                <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
              </button>

              {session?.user && (
                <button
                  onClick={(e) => { e.stopPropagation(); handleDelete(); }}
                  className="flex items-center gap-1.5 text-[13px] text-muted hover:text-red-500 transition-colors"
                  title="削除"
                >
                  <Trash2 size={18} />
                </button>
              )}
            </div>
            {shareMessage && (
              <p className="text-[13px] text-primary mt-1">{shareMessage}</p>
            )}
          </div>
        </div>
      </article>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} onLogin={() => signIn("google")} />
    </>
  );
}

function parseLikeCount(str: string): number {
  if (!str) return 0;
  const upper = str.toUpperCase().trim();
  const numMatch = upper.match(/^(\d+(?:\.\d+)?)\s*([K万MB]?)/);
  if (!numMatch) return parseInt(str.replace(/[^0-9]/g, ""), 10) || 0;
  const num = parseFloat(numMatch[1]);
  const unit = numMatch[2];
  if (unit === "K") return Math.round(num * 1000);
  if (unit === "M") return Math.round(num * 1000000);
  if (unit === "万") return Math.round(num * 10000);
  return Math.round(num);
}
