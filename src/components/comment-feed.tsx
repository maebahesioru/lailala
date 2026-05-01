"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { CommentCard } from "./comment-card";
import { Composer } from "./composer";
import { fetchComments } from "@/lib/youtube-client";
import { CommentThread } from "@/types/youtube";
import { RefreshCw, Loader2, List } from "lucide-react";
import { SkeletonCard } from "./skeleton-card";

interface VoteCounts {
  likes: number;
  dislikes: number;
}

interface FollowedList {
  id: string;
  name: string;
}

export function CommentFeed({ videoId }: { videoId: string }) {
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [sortBy, setSortBy] = useState<"TOP_COMMENTS" | "NEWEST_FIRST">("TOP_COMMENTS");
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
              className={`flex-1 py-4 text-center text-sm font-medium hover:bg-white/5 transition-colors relative whitespace-nowrap ${
                activeTabId === tab.id ? "text-foreground" : "text-muted"
              }`}
            >
              {tab.id !== "top" && tab.id !== "new" && <List size={14} className="inline mr-1" />}
              <span className="truncate inline-block max-w-full px-1">{tab.label}</span>
              {activeTabId === tab.id && (
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
              )}
            </button>
          ))}
        </div>
      </div>

      {!activeListId && <Composer videoId={videoId} onPosted={() => loadInitial()} />}

      <div className="divide-y divide-border">
        {threads.length === 0 && loading
          ? Array.from({ length: 5 }).map((_, i) => <SkeletonCard key={i} />)
          : threads.map((thread) => (
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

      {/* Floating refresh button */}
      <button
        onClick={() => loadInitial()}
        disabled={loading}
        className="fixed bottom-20 md:bottom-6 right-4 md:right-6 z-50 p-3 bg-primary text-white rounded-full shadow-lg hover:bg-primary-hover transition-colors disabled:opacity-50"
        title="更新"
        aria-label="コメントを更新"
      >
        <RefreshCw size={20} className={loading ? "animate-spin" : ""} aria-hidden="true" />
      </button>
    </div>
  );
}
