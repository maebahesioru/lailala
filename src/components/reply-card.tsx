"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThumbsUp, ThumbsDown, MessageCircle, Heart, Bookmark, User } from "lucide-react";
import { YtComment } from "@/types/youtube";
import { useAuth } from "./auth-provider";
import { useRouter } from "next/navigation";
import { localizeTime, stripHandlePrefix, stripEditedTag, formatDetailedTime } from "@/lib/i18n";
import Link from "next/link";
import { MentionText } from "./mention-text";
import { LoginPopup } from "./login-popup";
import { ShareMenu } from "./share-menu";
import { TweetMoreMenu } from "./tweet-more-menu";
import { formatCount, parseLikeCount } from "./comment-card";
import { useDataSaver } from "./data-saver-provider";
import { LinkCard } from "./link-card";

interface ReplyCardProps {
  reply: YtComment;
  videoId?: string;
  parentCommentId?: string;
  onDelete?: (commentId: string) => void;
  showDetailTime?: boolean;
}

function parseReplyTo(content: string): { replyTo: string | null; displayContent: string } {
  const match = content.match(/^[＠@]([^\s＠@]+)\s*/);
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
  const [isOwnComment, setIsOwnComment] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetch(`/api/comments/own-check?commentId=${encodeURIComponent(reply.commentId)}`)
      .then((r) => r.json())
      .then((data) => setIsOwnComment(data.isOwn))
      .catch(() => setIsOwnComment(false));
  }, [user, reply.commentId]);

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
    } catch (e) { console.error(e); }
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
    } catch (e) { console.error(e); }
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
    } catch (e) { console.error(e); }
  };

  const handleDelete = () => {
    setIsVisible(false);
    setTimeout(() => onDelete?.(reply.commentId), 300);
  };

  const threadLink = `/thread/${reply.commentId}`;

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
            onMouseEnter={() => router.prefetch(`/thread/${reply.commentId}`)}
          >
            <div className="flex gap-3">
              <Link href={`/profile/${encodeURIComponent(reply.author.channelId || "")}`} className="shrink-0">
                {reply.author.thumbnail ? (
                  <motion.img
                    whileHover={{ scale: 1.08 }}
                    transition={{ type: "spring", stiffness: 300, damping: 15 }}
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
                      <span className="text-muted text-[15px] shrink-0 cursor-help" title={detailTime}>{localizeTime(reply.publishedTime)}</span>
                    </div>
                    {replyTo && (
                      <div className="text-[13px] text-muted mt-0.5">
                        返信先: <span className="text-primary">＠{replyTo}</span>
                      </div>
                    )}
                    <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed">
                      <MentionText content={stripEditedTag(displayContent)} videoId={videoId} />
                    </p>
                    <LinkCard text={reply.content} />
                    {showDetailTime && (
                      <p className="text-[13px] text-muted mt-2">{detailTime}</p>
                    )}
                  </div>

                  <div className="relative shrink-0">
                    <TweetMoreMenu
                      commentId={reply.commentId}
                      videoId={videoId}
                      authorName={reply.author.name}
                      authorThumb={reply.author.thumbnail}
                      content={reply.content}
                      likeCount={reply.likeCount}
                      replyCount={reply.replyCount}
                      publishedTime={reply.publishedTime}
                      authorChannelId={reply.author.channelId}
                      isOwner={isOwnComment}
                      onDelete={handleDelete}
                    />
                  </div>
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
                    {localLikes > 0 && <span>{formatCount(localLikes)}</span>}
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

                  <motion.div whileTap={{ scale: 0.9 }} className="flex-1">
                    <Link
                      href={threadLink}
                      className="flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5"
                    >
                      <MessageCircle size={18} />
                      {reply.replyCount && reply.replyCount !== "0" && reply.replyCount !== "-" && <span>{reply.replyCount}</span>}
                    </Link>
                  </motion.div>

                  <div onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center">
                    <ShareMenu
                      url={`${typeof window !== "undefined" ? window.location.origin : ""}/thread/${reply.commentId}`}
                      text={`${reply.author.name}: ${reply.content}`}
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
    </>
  );
}

