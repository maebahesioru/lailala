"use client";

import { useState, useEffect } from "react";
import { CommentCard } from "./comment-card";
import { ReplyCard } from "./reply-card";
import { Composer } from "./composer";
import { ArrowLeft, Loader2, MessageCircle, CornerDownRight } from "lucide-react";
import Link from "next/link";
import { YtComment } from "@/types/youtube";
import { ReplyNode } from "@/lib/reply-tree";

interface ThreadViewProps {
  parent: YtComment;
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
    <div className={indentClass}>
      <ReplyCard reply={node} parentCommentId={commentId} showDetailTime />
      {hasChildren && (
        <div className="relative">
          {depth < 3 && (
            <button
              onClick={() => setExpanded(!expanded)}
              className="absolute left-3 top-0 text-[#71767b] hover:text-[#1d9bf0] p-1"
              title={expanded ? "折りたたむ" : "展開する"}
            >
              <CornerDownRight size={14} className={`transition-transform ${expanded ? "rotate-0" : "-rotate-90"}`} />
            </button>
          )}
          {expanded && (
            <div className={depth < 3 ? "border-l-2 border-[#2f3336] ml-6 mt-1" : ""}>
              {node.children.map((child) => (
                <NestedReply
                  key={child.commentId}
                  node={child}
                  depth={depth + 1}
                  videoId={videoId}
                  commentId={commentId}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export function ThreadView({
  parent,
  initialReplies,
  replyError,
  initialContinuationToken,
  videoId,
  commentId,
  userVote,
}: ThreadViewProps) {
  const [replies] = useState(initialReplies);
  const [continuationToken] = useState(initialContinuationToken);
  const [loadingMore] = useState(false);

  const handleReload = () => {
    window.location.reload();
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
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-[#2f3336] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">スレッド</h1>
      </div>

      <div className="border-b border-[#2f3336]">
        <CommentCard
          thread={parentThread}
          videoId={videoId}
          voteCounts={{ likes: 0, dislikes: 0 }}
          userVote={userVote}
          showDetailTime
        />
      </div>

      <Composer videoId={videoId} onPosted={handleReload} />

      <div className="divide-y divide-[#2f3336]">
        {replies.map((reply) => (
          <NestedReply
            key={reply.commentId}
            node={reply}
            depth={0}
            videoId={videoId}
            commentId={commentId}
          />
        ))}
        {replies.length === 0 && replyError && (
          <div className="p-12 text-center text-red-400 space-y-3">
            <MessageCircle size={32} className="mx-auto opacity-50" />
            <p>返信の読み込みに失敗しました</p>
            <p className="text-[13px] text-[#71767b]">{replyError}</p>
          </div>
        )}
        {replies.length === 0 && !replyError && (
          <div className="p-12 text-center text-[#71767b] space-y-3">
            <MessageCircle size={32} className="mx-auto opacity-50" />
            <p>まだ返信がありません</p>
          </div>
        )}
      </div>

      {continuationToken && (
        <div className="p-6 text-center border-t border-[#2f3336]">
          <button
            disabled={loadingMore}
            className="inline-flex items-center gap-2 text-[13px] text-[#1d9bf0] hover:bg-[#1d9bf0]/10 px-4 py-2 rounded-full transition-colors disabled:opacity-50"
          >
            {loadingMore ? (
              <>
                <Loader2 size={14} className="animate-spin" />
                読み込み中...
              </>
            ) : (
              <>もっと読み込む</>
            )}
          </button>
        </div>
      )}
    </>
  );
}
