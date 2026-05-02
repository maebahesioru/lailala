"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CommentCard } from "./comment-card";
import { Composer } from "./composer";
import { fetchComments } from "@/lib/youtube-client";
import { CommentThread } from "@/types/youtube";
import { RefreshCw, Loader2, List, ArrowUp } from "lucide-react";
import { SkeletonCard } from "./skeleton-card";
import { useMutedWords } from "./use-muted-words";

interface VoteCounts {
  likes: number;
  dislikes: number;
}

interface FollowedList {
  id: string;
  name: string;
}

export function CommentFeed({ videoId, defaultSort = "TOP_COMMENTS" }: { videoId: string; defaultSort?: "TOP_COMMENTS" | "NEWEST_FIRST" | "OLDEST_FIRST" }) {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [sortBy, setSortBy] = useState<"TOP_COMMENTS" | "NEWEST_FIRST" | "OLDEST_FIRST">(defaultSort);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, VoteCounts>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [hasMore, setHasMore] = useState(false);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);

  const [followedLists, setFollowedLists] = useState<FollowedList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isMuted } = useMutedWords();
  const [newArrivalCount, setNewArrivalCount] = useState(0);
  const [showNewBadge, setShowNewBadge] = useState(false);

  useEffect(() => {
    setMounted(true);
    fetch("/api/lists/follow")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.follows) {
          setFollowedLists(data.follows.map((f: any) => ({ id: f.id, name: f.name })));
        }
      })
      .catch(() => null);
  }, []);

  const loadInitial = useCallback(async () => {
    setLoading(true);
    setError(null);
    setHasMore(false);
    setNextToken(null);
    try {
      if (activeListId) {
        const res = await fetch(`/api/lists?listId=${activeListId}`);
        const data = await res.json();
        const mapped = (data.list?.items || []).map((item: any) => ({
          comment: {
            commentId: item.commentId,
            author: {
              name: item.authorName,
              thumbnail: item.authorThumb || undefined,
              isChannelOwner: false,
              isMember: false,
            },
            content: item.content,
            publishedTime: item.publishedTime,
            likeCount: item.likeCount,
            replyCount: item.replyCount,
            isLiked: false,
            isDisliked: false,
            isPinned: false,
            isHearted: false,
          },
          replies: [],
          hasRepliesContinuation: false,
        }));
        setThreads(mapped);
        fetchVoteData(mapped);
      } else {
        const data = await fetchComments(videoId, sortBy);
        setThreads(data.threads);
        setHasMore(data.hasContinuation);
        setNextToken(data.continuationToken);
        fetchVoteData(data.threads);
      }
    } catch (e: any) {
      setError(e.message || "コメントの取得に失敗しました");
    } finally {
      setLoading(false);
    }
  }, [videoId, sortBy, activeListId]);

  const loadMore = useCallback(async () => {
    if (activeListId || !nextToken || loadingMore) return;
    setLoadingMore(true);
    try {
      const data = await fetchComments(videoId, sortBy, nextToken);
      setThreads((prev) => {
        const existingIds = new Set(prev.map((t) => t.comment.commentId));
        const newThreads = data.threads.filter((t) => !existingIds.has(t.comment.commentId));
        return [...prev, ...newThreads];
      });
      setHasMore(data.hasContinuation);
      setNextToken(data.continuationToken);
      fetchVoteData(data.threads);
    } catch (e: any) {
      setError(e.message || "追加の取得に失敗しました");
    } finally {
      setLoadingMore(false);
    }
  }, [videoId, sortBy, nextToken, loadingMore, activeListId]);

  const fetchVoteData = async (threadList: CommentThread[]) => {
    const commentIds = threadList.map((t) => t.comment.commentId);
    if (commentIds.length === 0) return;
    try {
      const [countsRes, userRes] = await Promise.all([
        fetch(`/api/comments/vote-counts?${commentIds.map((id) => `commentId=${id}`).join("&")}`),
        fetch(`/api/comments/vote-state?${commentIds.map((id) => `commentId=${id}`).join("&")}`),
      ]);
      if (countsRes.ok) {
        const counts = await countsRes.json();
        setVoteCounts((prev) => ({ ...prev, ...counts }));
      }
      if (userRes.ok) {
        const votes = await userRes.json();
        const map: Record<string, string> = {};
        for (const [k, v] of Object.entries(votes)) {
          map[k] = (v as any).type;
        }
        setUserVotes((prev) => ({ ...prev, ...map }));
      }
    } catch {
      // ignore
    }
  };

  useEffect(() => {
    setThreads([]);
    loadInitial();
  }, [videoId, sortBy, activeListId, loadInitial]);

  // Listen for scroll-to-top event from sidebar home button
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
      if (!activeListId && sortBy !== "TOP_COMMENTS") {
        setSortBy("TOP_COMMENTS");
      } else {
        loadInitial();
      }
    };
    window.addEventListener("lailala:scrollToTop", handleScrollToTop);
    return () => window.removeEventListener("lailala:scrollToTop", handleScrollToTop);
  }, [sortBy, loadInitial, activeListId]);

  // Fix back button bug
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        loadInitial();
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, [loadInitial]);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loadingMore) {
          loadMore();
        }
      },
      { rootMargin: "200px" }
    );
    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    return () => observer.disconnect();
  }, [hasMore, loadingMore, loadMore]);

  // SSE for realtime updates
  useEffect(() => {
    const commentIds = threads.slice(0, 50).flatMap((t) => [t.comment.commentId]);
    if (commentIds.length === 0) return;
    const query = commentIds.map((id) => `commentId=${encodeURIComponent(id)}`).join("&");
    const eventSource = new EventSource(`/api/sse?videoId=${videoId}&${query}`);
    eventSource.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        if (data.type === "update") {
          setThreads((prev) =>
            prev.map((thread) => {
              if (thread.comment.commentId === data.commentId) {
                return {
                  ...thread,
                  comment: { ...thread.comment, likeCount: data.likeCount, content: data.content || thread.comment.content },
                };
              }
              return thread;
            })
          );
        }
      } catch {
        // ignore
      }
    };
    return () => eventSource.close();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoId, sortBy]);

  // Poll for new comments (new arrivals badge)
  useEffect(() => {
    if (activeListId) return; // Only for main timeline
    const interval = setInterval(async () => {
      try {
        const data = await fetchComments(videoId, sortBy);
        const currentTopIds = new Set(threads.map((t) => t.comment.commentId));
        const newComments = data.threads.filter((t) => !currentTopIds.has(t.comment.commentId));
        if (newComments.length > 0) {
          setNewArrivalCount(newComments.length);
          setShowNewBadge(true);
        }
      } catch {
        // ignore polling errors
      }
    }, 30000);
    return () => clearInterval(interval);
  }, [videoId, sortBy, threads, activeListId]);

  const baseTabs = [
    { id: "top", label: "人気", onClick: () => { setActiveListId(null); setSortBy("TOP_COMMENTS"); } },
    { id: "new", label: "新着", onClick: () => { setActiveListId(null); setSortBy("NEWEST_FIRST"); } },
  ];
  const listTabs = mounted
    ? followedLists.map((list) => ({
        id: list.id,
        label: list.name,
        onClick: () => setActiveListId(list.id),
      }))
    : [];
  const tabs = [...baseTabs, ...listTabs];

  const activeTabId = activeListId || (sortBy === "TOP_COMMENTS" ? "top" : "new");

  return (
    <div>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={tab.onClick}
              className={`flex-1 py-4 text-center text-sm font-medium hover:bg-white/5 transition-colors relative whitespace-nowrap inline-flex items-center justify-center ${
                activeTabId === tab.id ? "text-foreground" : "text-muted"
              }`}
            >
              {tab.id !== "top" && tab.id !== "new" && <List size={14} className="mr-1 shrink-0" />}
              <span className="truncate max-w-full px-1 text-[15px]">{tab.label}</span>
              {activeTabId === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* New arrivals badge */}
      <AnimatePresence>
        {showNewBadge && !activeListId && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 20 }}
            className="sticky top-[57px] z-20 flex justify-center -mb-2 pointer-events-none"
          >
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                window.scrollTo({ top: 0, behavior: "smooth" });
                loadInitial();
                setShowNewBadge(false);
                setNewArrivalCount(0);
              }}
              className="pointer-events-auto flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-full text-sm font-bold shadow-lg hover:bg-primary-hover transition-colors -translate-y-2"
            >
              <ArrowUp size={14} />
              新しいコメントが{newArrivalCount}件
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {!activeListId && <Composer videoId={videoId} onPosted={() => loadInitial()} />}

      <div className="divide-y divide-border">
        {threads.length === 0 && loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : threads
              .filter((thread) => !isMuted(thread.comment.content))
              .map((thread) => (
                <CommentCard
                  key={thread.comment.commentId}
                  thread={thread}
                  videoId={videoId}
                  voteCounts={voteCounts[thread.comment.commentId] || { likes: 0, dislikes: 0 }}
                  userVote={userVotes[thread.comment.commentId]}
                  onDelete={(id) => setThreads((prev) => prev.filter((t) => t.comment.commentId !== id))}
                />
              ))}
      </div>

      {/* Infinite scroll sentinel */}
      <div ref={loaderRef} className="p-6 text-center">
        {loadingMore && (
          <div className="inline-flex items-center gap-2 text-[13px] text-primary">
            <Loader2 size={14} className="animate-spin" />
            読み込み中...
          </div>
        )}
      </div>

      {error && (
        <div className="p-8 text-center text-red-400">
          <p>{error}</p>
          <button
            onClick={() => loadInitial()}
            className="mt-4 px-4 py-2 bg-primary rounded-full text-white font-medium hover:bg-primary-hover"
          >
            再試行
          </button>
        </div>
      )}


    </div>
  );
}
