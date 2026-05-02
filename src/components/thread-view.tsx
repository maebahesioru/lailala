"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentCard } from "./comment-card";
import { ReplyCard } from "./reply-card";
import { Composer } from "./composer";
import { ArrowLeft, Loader2, MessageCircle, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { YtComment } from "@/types/youtube";
import { ReplyNode } from "@/lib/reply-tree";

interface ThreadViewProps {
  parent: YtComment;
  highlightedReply?: YtComment | null;
  initialReplies: ReplyNode[];
  replyError: string | null;
  initialContinuationToken: string | null;
  videoId: string;
  commentId: string;
  userVote?: string;
}

function NestedReply({
  node,
  depth,
  videoId,
  commentId,
}: {
  node: ReplyNode;
  depth: number;
  videoId: string;
  commentId: string;
}) {
  const [expanded, setExpanded] = useState(true);
  const hasChildren = node.children.length > 0;
  const indentClass = depth >= 3 ? "ml-0" : depth === 2 ? "ml-6" : depth === 1 ? "ml-6" : "";

  return (
    <motion.div
      className={indentClass}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
    >
      <ReplyCard reply={node} parentCommentId={commentId} />
      {hasChildren && (
        <div className="relative">
          {depth < 3 && (
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setExpanded(!expanded)}
              className="absolute left-3 top-0 text-muted hover:text-primary p-1"
              title={expanded ? "折りたたむ" : "展開する"}
            >
              <motion.div
                animate={{ rotate: expanded ? 0 : -90 }}
                transition={{ duration: 0.2 }}
              >
                <CornerDownRight size={14} />
              </motion.div>
            </motion.button>
          )}
          <AnimatePresence>
            {expanded && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.2 }}
                className={depth < 3 ? "border-l-2 border-border ml-6 mt-1 overflow-hidden" : ""}
              >
                {node.children.map((child) => (
                  <NestedReply
                    key={child.commentId}
                    node={child}
                    depth={depth + 1}
                    videoId={videoId}
                    commentId={commentId}
                  />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      )}
    </motion.div>
  );
}

export function ThreadView({
  parent,
  highlightedReply,
  initialReplies,
  replyError,
  initialContinuationToken,
  videoId,
  commentId,
  userVote,
}: ThreadViewProps) {
  const [replies, setReplies] = useState(initialReplies);
  const [continuationToken, setContinuationToken] = useState(initialContinuationToken);
  const [loadingMore, setLoadingMore] = useState(false);

  const handleReload = () => {
    window.location.reload();
  };

  const loadMore = async () => {
    if (!continuationToken) return;
    setLoadingMore(true);
    try {
      const url = `/api/comments/thread?videoId=${videoId}&commentId=${commentId}&continuationToken=${encodeURIComponent(continuationToken!)}`;
      const res = await fetch(url);
      const data = await res.json();
      if (data.replies) {
        const newReplies = data.replies.map((r: any) => ({
          ...r,
          children: [],
          replyTo: null,
        }));
        setReplies((prev) => [...prev, ...newReplies]);
        setContinuationToken(data.continuationToken || null);
      }
    } catch {
      // ignore
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        window.location.reload();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

  const parentThread = {
    comment: parent,
    replies: [],
    hasRepliesContinuation: false,
  };

  return (
    <>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
          <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors inline-block">
            <ArrowLeft size={20} />
          </Link>
        </motion.div>
        <h1 className="text-lg font-bold">スレッド</h1>
      </div>

      <div className="border-b border-border">
        <CommentCard
          thread={parentThread}
          videoId={videoId}
          voteCounts={{ likes: 0, dislikes: 0 }}
          userVote={userVote}
          showDetailTime
        />
      </div>

      <AnimatePresence>
        {highlightedReply && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Reply lineage indicator */}
            <div className="px-4 py-2 flex items-center gap-2 text-[13px] text-muted border-b border-border/50">
              <CornerDownRight size={14} />
              <span>
                <span className="font-medium text-foreground">{highlightedReply.author.name}</span>
                さんへの返信
              </span>
            </div>
            <div className="border-b border-border bg-primary/[0.02]">
              <ReplyCard reply={highlightedReply as any} parentCommentId={commentId} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <Composer videoId={videoId} onPosted={handleReload} />

      <div className="divide-y divide-border border-b border-border">
        <AnimatePresence>
          {replies.map((reply) => (
            <motion.div
              key={reply.commentId}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
            >
              <NestedReply
                node={reply}
                depth={0}
                videoId={videoId}
                commentId={commentId}
              />
            </motion.div>
          ))}
        </AnimatePresence>
        {replies.length === 0 && replyError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center text-red-400 space-y-3"
          >
            <MessageCircle size={32} className="mx-auto opacity-50" />
            <p>返信の読み込みに失敗しました</p>
            <p className="text-[13px] text-muted">{replyError}</p>
          </motion.div>
        )}
        {replies.length === 0 && !replyError && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="p-12 text-center text-muted space-y-3"
          >
            <MessageCircle size={32} className="mx-auto opacity-50" />
            <p>まだ返信がありません</p>
          </motion.div>
        )}
      </div>

      {continuationToken && (
        <div className="p-6 text-center border-t border-border">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={loadMore}
            disabled={loadingMore}
            className="inline-flex items-center gap-2 text-[13px] text-primary hover:bg-primary/10 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                読み込み中...
              </>
            ) : (
              <>もっと読み込む</>
            )}
          </motion.button>
        </div>
      )}
    </>
  );
}
