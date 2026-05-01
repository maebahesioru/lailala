"use client";

import { useState, useRef, useEffect } from "react";
import { ThumbsUp, ThumbsDown, MessageCircle, Trash2, Heart, Bookmark, User, MoreHorizontal } from "lucide-react";
import { YtComment } from "@/types/youtube";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";
import { localizeTime, stripHandlePrefix, stripEditedTag, formatDetailedTime } from "@/lib/i18n";
import Link from "next/link";
import { MentionText } from "./mention-text";
import { LoginPopup } from "./login-popup";
import { ShareMenu } from "./share-menu";
import { formatCount } from "./comment-card";

interface ReplyCardProps {
  reply: YtComment;
  videoId?: string;
  parentCommentId?: string;
  onDelete?: (commentId: string) => void;
  showDetailTime?: boolean;
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

export function ReplyCard({ reply, videoId = "niKAylKNIEI", parentCommentId, onDelete, showDetailTime = false }: ReplyCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [liked, setLiked] = useState(reply.isLiked || false);
  const [disliked, setDisliked] = useState(reply.isDisliked || false);
  const [localLikes, setLocalLikes] = useState(parseLikeCount(reply.likeCount));
  const [showLogin, setShowLogin] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [isOwnComment, setIsOwnComment] = useState(false);
  const moreRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/comments/own-check?commentId=${encodeURIComponent(reply.commentId)}`)
      .then((r) => r.json())
      .then((data) => setIsOwnComment(data.isOwn))
      .catch(() => setIsOwnComment(false));
  }, [user, reply.commentId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) {
        setShowMore(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const { replyTo, displayContent } = parseReplyTo(reply.content);
  const detailTime = formatDetailedTime(reply.publishedTime);

  const handleLike = async () => {
    if (!user) { setShowLogin(true); return; }
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
    if (!user) { setShowLogin(true); return; }
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
    if (!user) return;
    if (!confirm("この返信を削除しますか？")) return;
    try {
      await fetch(`/api/comments/delete?videoId=${videoId}&commentId=${reply.commentId}`, { method: "DELETE" });
      onDelete?.(reply.commentId);
    } catch {}
  };

  const handleBookmark = async () => {
    if (!user) { setShowLogin(true); return; }
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
      <article className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text relative">
        <div className="flex gap-3">
          <Link href={`/profile/${encodeURIComponent(reply.author.channelId || "")}`} className="shrink-0">
            {reply.author.thumbnail ? (
              <img
                src={reply.author.thumbnail}
                alt={reply.author.name}
                className="w-10 h-10 rounded-full object-cover"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                <User size={20} className="text-muted" />
              </div>
            )}
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="cursor-pointer flex-1 min-w-0" onClick={() => router.push(threadLink)}>
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
                {showDetailTime && (
                  <p className="text-[13px] text-muted mt-2">{detailTime}</p>
                )}
              </div>

              {/* Top-right more menu - delete only */}
              {isOwnComment && (
                <div className="relative shrink-0" ref={moreRef}>
                  <button
                    onClick={(e) => { e.stopPropagation(); setShowMore(!showMore); }}
                    className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted"
                  >
                    <MoreHorizontal size={18} />
                  </button>
                  {showMore && (
                    <div className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-48 z-20">
                      <button
                        onClick={(e) => { e.stopPropagation(); handleDelete(); setShowMore(false); }}
                        className="flex items-center gap-3 w-full px-4 py-2 hover:bg-white/5 text-left text-[14px] text-red-500"
                      >
                        <Trash2 size={16} />
                        <span>削除</span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>

            <div className="flex items-center justify-between mt-3">
              <button
                onClick={(e) => { e.stopPropagation(); handleLike(); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${liked ? "text-[#f91880]" : "text-muted hover:text-[#f91880]"}`}
                title="高評価"
              >
                <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                {localLikes > 0 && <span>{formatCount(localLikes)}</span>}
              </button>

              <button
                onClick={(e) => { e.stopPropagation(); handleDislike(); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${disliked ? "text-primary" : "text-muted hover:text-primary"}`}
                title="低評価"
              >
                <ThumbsDown size={18} fill={disliked ? "currentColor" : "none"} />
              </button>

              <Link
                href={threadLink}
                className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5"
              >
                <MessageCircle size={18} />
                {reply.replyCount !== "0" && <span>{reply.replyCount}</span>}
              </Link>

              <div onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center">
                <ShareMenu
                  url={`${typeof window !== "undefined" ? window.location.origin : ""}/thread/${reply.commentId}`}
                  text={`${reply.author.name}: ${reply.content}`}
                  buttonClass="flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5 w-full"
                />
              </div>

              <button
                onClick={(e) => { e.stopPropagation(); handleBookmark(); }}
                className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${bookmarked ? "text-primary" : "text-muted hover:text-primary"}`}
                title={bookmarked ? "ブックマーク済み" : "ブックマーク"}
              >
                <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
              </button>
            </div>
          </div>
        </div>
      </article>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
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
