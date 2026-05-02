"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageCircle, Heart, Bookmark, User } from "lucide-react";
import { CommentThread } from "@/types/youtube";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";
import { localizeTime, stripHandlePrefix, stripEditedTag, formatDetailedTime } from "@/lib/i18n";
import Link from "next/link";
import { MentionText } from "./mention-text";
import { LoginPopup } from "./login-popup";
import { ShareMenu } from "./share-menu";
import { TweetMoreMenu } from "./tweet-more-menu";
import { ConfirmDialog } from "./confirm-dialog";
import { useDataSaver } from "./data-saver-provider";
import { LinkCard } from "./link-card";

interface CommentCardProps {
  thread: CommentThread;
  videoId: string;
  voteCounts: { likes: number; dislikes: number };
  userVote?: string;
  onDelete?: (commentId: string) => void;
  onContentChange?: (commentId: string, content: string) => void;
  showDetailTime?: boolean;
}

export function CommentCard({ thread, videoId, voteCounts, userVote, onDelete, onContentChange, showDetailTime = false }: CommentCardProps) {
  const { user } = useAuth();
  const router = useRouter();
  const [liked, setLiked] = useState(userVote === "like");
  const [disliked, setDisliked] = useState(userVote === "dislike");
  const [localLikes, setLocalLikes] = useState(parseLikeCount(thread.comment.likeCount) + (voteCounts.likes || 0));
  const [showLogin, setShowLogin] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const isOwnComment = user?.channelId === thread.comment.author.channelId;
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editing, setEditing] = useState(false);
  const [editText, setEditText] = useState(thread.comment.content);
  const { enabled: dataSaver } = useDataSaver();
  const [isVisible, setIsVisible] = useState(true);

  const handleLike = async () => {
    if (!user) { setShowLogin(true); return; }
    try {
      const action = liked ? "unlike" : "like";
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, commentId: thread.comment.commentId, action }),
      });
      setLiked(!liked);
      setLocalLikes((prev) => (liked ? prev - 1 : prev + 1));
      if (disliked) setDisliked(false);
    } catch (e) { console.error(e); }
  };

  const handleDislike = async () => {
    if (!user) { setShowLogin(true); return; }
    try {
      const action = disliked ? "undislike" : "dislike";
      await fetch("/api/comments/vote", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, commentId: thread.comment.commentId, action }),
      });
      setDisliked(!disliked);
      if (liked) { setLiked(false); setLocalLikes((prev) => prev - 1); }
    } catch (e) { console.error(e); }
  };

  const handleDelete = async () => {
    if (!user) return;
    try {
      await fetch(`/api/comments/delete?videoId=${videoId}&commentId=${thread.comment.commentId}`, { method: "DELETE" });
      setIsVisible(false);
      setTimeout(() => onDelete?.(thread.comment.commentId), 300);
    } catch (e) { console.error(e); }
  };

  const handleBookmark = async () => {
    if (!user) { setShowLogin(true); return; }
    try {
      if (bookmarked) {
        await fetch(`/api/bookmarks?commentId=${thread.comment.commentId}`, { method: "DELETE" });
        setBookmarked(false);
      } else {
        await fetch("/api/bookmarks", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            commentId: thread.comment.commentId,
            videoId,
            authorName: thread.comment.author.name,
            authorThumb: thread.comment.author.thumbnail,
            content: thread.comment.content,
            likeCount: thread.comment.likeCount,
            replyCount: thread.comment.replyCount,
            publishedTime: thread.comment.publishedTime,
          }),
        });
        setBookmarked(true);
      }
    } catch (e) { console.error(e); }
  };

  const detailTime = formatDetailedTime(thread.comment.publishedTime);

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.article
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100, transition: { duration: 0.25 } }}
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            className="px-4 py-3 select-text relative"
          >
            <div className="flex gap-3">
              <Link href={`/profile/${encodeURIComponent(thread.comment.author.channelId || "")}`} className="shrink-0">
                {thread.comment.author.thumbnail && !dataSaver ? (
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
                    src={thread.comment.author.thumbnail}
                    alt={thread.comment.author.name}
                    className="w-10 h-10 rounded-full object-cover shrink-0"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                    <User size={20} className="text-muted" />
                  </div>
                )}
              </Link>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Link href={`/profile/${encodeURIComponent(thread.comment.author.channelId || "")}`} className="font-bold text-[15px] truncate hover:underline" onClick={(e) => e.stopPropagation()}>
                        {stripHandlePrefix(thread.comment.author.name)}
                      </Link>
                      {thread.comment.author.isChannelOwner && (
                        <span className="text-xs bg-primary text-white px-1.5 rounded-full flex items-center gap-0.5">
                          <svg viewBox="0 0 24 24" className="w-3 h-3 fill-current"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41z"/></svg>
                          投稿者
                        </span>
                      )}
                      {thread.comment.isHearted && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ type: "spring", stiffness: 500, damping: 15 }}
                          className="bg-[#f91880] text-white p-1 rounded-full flex items-center justify-center"
                          title="投稿者がハートしました"
                        >
                          <Heart size={14} fill="currentColor" />
                        </motion.span>
                      )}
                      <span className="text-muted text-[15px]">·</span>
                      <span className="text-muted text-[15px] shrink-0 cursor-help" title={detailTime}>{localizeTime(thread.comment.publishedTime)}</span>
                    </div>
                    {editing ? (
                      <div className="mt-2 space-y-2">
                        <textarea
                          value={editText}
                          onChange={(e) => {
                            setEditText(e.target.value);
                            const el = e.target;
                            el.style.height = "auto";
                            el.style.height = el.scrollHeight + "px";
                          }}
                          className="w-full bg-background border border-border rounded-lg px-3 py-2 text-[15px] outline-none focus:ring-2 focus:ring-primary resize-none min-h-[80px]"
                          rows={1}
                          autoFocus
                        />
                        <div className="flex items-center gap-2">
                          <button
                            onClick={(e) => { e.stopPropagation(); setEditing(false); setEditText(thread.comment.content); }}
                            className="px-3 py-1.5 rounded-full text-sm font-bold border border-border hover:bg-white/5"
                          >
                            キャンセル
                          </button>
                          <button
                            onClick={async (e) => {
                              e.stopPropagation();
                              try {
                                await fetch("/api/comments/edit", {
                                  method: "PATCH",
                                  headers: { "Content-Type": "application/json" },
                                  body: JSON.stringify({ videoId, commentId: thread.comment.commentId, text: editText }),
                                });
                                setEditing(false);
                                if (onContentChange) onContentChange(thread.comment.commentId, editText);
                              } catch (err) { console.error(err); }
                            }}
                            className="px-3 py-1.5 rounded-full text-sm font-bold bg-primary text-white hover:bg-primary-hover"
                          >
                            保存
                          </button>
                        </div>
                      </div>
                    ) : (
                      <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed" onClick={() => {
                        const sel = window.getSelection();
                        if (sel && sel.toString().length > 0) return;
                        router.push(`/thread/${thread.comment.commentId}`);
                      }}>
                        <MentionText content={stripEditedTag(thread.comment.content)} videoId={videoId} />
                      </p>
                    )}
                    <Link href={`/thread/${thread.comment.commentId}`} className="block">
                      <LinkCard text={thread.comment.content} />
                    </Link>
                    {showDetailTime && (
                      <p className="text-[13px] text-muted mt-2">{detailTime}</p>
                    )}
                  </div>

                  <TweetMoreMenu
                    commentId={thread.comment.commentId}
                    videoId={videoId}
                    authorName={thread.comment.author.name}
                    authorThumb={thread.comment.author.thumbnail}
                    content={thread.comment.content}
                    likeCount={thread.comment.likeCount}
                    replyCount={thread.comment.replyCount}
                    publishedTime={thread.comment.publishedTime}
                    authorChannelId={thread.comment.author.channelId}
                    isOwner={isOwnComment}
                    onEdit={() => setEditing(true)}
                    onDelete={() => setShowDeleteConfirm(true)}
                  />
                </div>

                <div className="flex items-center justify-between mt-3">
                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleLike(); }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${liked ? "text-[#f91880]" : "text-muted hover:text-[#f91880]"}`}
                    title="高評価"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={liked ? "liked" : "unliked"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ThumbsUp size={18} fill={liked ? "currentColor" : "none"} />
                      </motion.span>
                    </AnimatePresence>
                    <span>{formatCount(localLikes)}</span>
                    <AnimatePresence>
                      {liked && (
                        <motion.div
                          className="absolute inset-0 pointer-events-none flex items-center justify-center"
                          initial={{ scale: 0.5, opacity: 1 }}
                          animate={{ scale: 1.8, opacity: 0 }}
                          exit={{ opacity: 0 }}
                          transition={{ duration: 0.4 }}
                        >
                          <div className="w-8 h-8 rounded-full bg-[#f91880]/30 blur-md" />
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleDislike(); }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${disliked ? "text-primary" : "text-muted hover:text-primary"}`}
                    title="低評価"
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={disliked ? "disliked" : "undisliked"}
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.5, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <ThumbsDown size={18} fill={disliked ? "currentColor" : "none"} />
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.9 }}
                    onClick={(e) => {
                      e.stopPropagation();
                      window.dispatchEvent(new CustomEvent("lailala:openReply", { detail: { videoId, parentCommentId: thread.comment.commentId, authorName: thread.comment.author.name } }));
                    }}
                    className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5"
                  >
                    <MessageCircle size={18} />
                    <span>{thread.comment.replyCount || 0}</span>
                  </motion.button>

                  <div onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center">
                    <ShareMenu
                      url={`${typeof window !== "undefined" ? window.location.origin : ""}/thread/${thread.comment.commentId}`}
                      text={`${thread.comment.author.name}: ${thread.comment.content}`}
                      buttonClass="flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5 w-full"
                    />
                  </div>

                  <motion.button
                    onClick={(e) => { e.stopPropagation(); handleBookmark(); }}
                    whileTap={{ scale: 0.8 }}
                    transition={{ type: "spring", stiffness: 500, damping: 15 }}
                    className={`relative flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] transition-colors rounded-full hover:bg-white/5 ${bookmarked ? "text-primary" : "text-muted hover:text-primary"}`}
                    title={bookmarked ? "ブックマーク済み" : "ブックマーク"}
                  >
                    <AnimatePresence mode="wait">
                      <motion.span
                        key={bookmarked ? "saved" : "unsaved"}
                        initial={{ scale: 0.5, opacity: 0, rotate: -30 }}
                        animate={{ scale: 1, opacity: 1, rotate: 0 }}
                        exit={{ scale: 0.5, opacity: 0, rotate: 30 }}
                        transition={{ type: "spring", stiffness: 400, damping: 15 }}
                      >
                        <Bookmark size={18} fill={bookmarked ? "currentColor" : "none"} />
                      </motion.span>
                    </AnimatePresence>
                  </motion.button>
                </div>
              </div>
            </div>
          </motion.article>
        )}
      </AnimatePresence>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
      <ConfirmDialog
        open={showDeleteConfirm}
        title="コメントを削除しますか？"
        message="この操作は取り消せません。"
        confirmLabel="削除"
        confirmVariant="danger"
        onConfirm={() => { handleDelete(); setShowDeleteConfirm(false); }}
        onCancel={() => setShowDeleteConfirm(false)}
      />
    </>
  );
}

export function parseLikeCount(str: string): number {
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

export function formatCount(n: number): string {
  if (n >= 100000000) return (n / 100000000).toFixed(1) + "億";
  if (n >= 10000) return (n / 10000).toFixed(1) + "万";
  if (n >= 1000) return (n / 1000).toFixed(1) + "千";
  return String(n);
}
