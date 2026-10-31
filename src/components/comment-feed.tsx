"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";
import { CommentCard } from "./comment-card";
import { FeatureAnnouncement } from "./feature-announcement";
import { Composer } from "./composer";
import { fetchComments } from "@/lib/youtube-client";
import { CommentThread } from "@/types/youtube";
import { RefreshCw, Loader2, List, ArrowUp, CornerDownRight } from "lucide-react";
import { SkeletonCard } from "./skeleton-card";
import { useMutedWords } from "./use-muted-words";
/**
 * 同じ人が続けて投稿した「連投」をまとめて表示する。
 * コメント欄では連投で他の発言が埋もれるという声が多いため、
 * 2件目以降は既定で畳み、「N件を表示」で開けるようにする。
 */
function ConsecutiveGroup({
  items,
  videoId,
  voteCounts,
  userVotes,
  onDelete,
}: {
  items: CommentThread[];
  videoId: string;
  voteCounts: Record<string, { likes: number; dislikes: number }>;
  userVotes: Record<string, string>;
  onDelete: (id: string) => void;
}) {
  const [expanded, setExpanded] = useState(false);
  const [first, ...rest] = items;
  const authorName = first.comment.author?.name ?? "";

  return (
    <>
      <CommentCard
        thread={first}
        videoId={videoId}
        voteCounts={voteCounts[first.comment.commentId] || { likes: 0, dislikes: 0 }}
        userVote={userVotes[first.comment.commentId]}
        onDelete={onDelete}
      />
      {rest.length > 0 && (
        <div className="flex items-center gap-2 px-4 py-2 text-[13px] text-muted bg-background/40">
          <CornerDownRight size={14} className="shrink-0" />
          <span className="truncate">
            {authorName} の連投 {rest.length}件
          </span>
          <button
            onClick={() => setExpanded(!expanded)}
            className="ml-auto shrink-0 font-bold text-primary hover:underline"
            aria-expanded={expanded}
          >
            {expanded ? "たたむ" : "表示"}
          </button>
        </div>
      )}
      {expanded &&
        rest.map((thread) => (
          <CommentCard
            key={thread.comment.commentId}
            thread={thread}
            videoId={videoId}
            voteCounts={voteCounts[thread.comment.commentId] || { likes: 0, dislikes: 0 }}
            userVote={userVotes[thread.comment.commentId]}
            onDelete={onDelete}
          />
        ))}
    </>
  );
}


interface VoteCounts {
  likes: number;
  dislikes: number;
}

interface FollowedList {
  id: string;
  name: string;
}

export function CommentFeed({ videoId, defaultSort = "TOP_COMMENTS" }: { videoId: string; defaultSort?: "TOP_COMMENTS" | "NEWEST_FIRST" }) {

  const router = useRouter();
  const pathname = usePathname();
  // 並び順はルートで決まる（/latest/ は新着、それ以外は人気）。
  // sessionStorage を優先すると「タブ表示は新着なのに中身は人気」という
  // 食い違いが起きるため、初期値も pathname から決める。
  const [sortBy, setSortBy] = useState<"TOP_COMMENTS" | "NEWEST_FIRST">(() => {
    if (typeof window === "undefined") return defaultSort;
    if (window.location.pathname === "/latest/") return "NEWEST_FIRST";
    if (window.location.pathname === "/popular/") return "TOP_COMMENTS";
    return defaultSort;
  });
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [voteCounts, setVoteCounts] = useState<Record<string, VoteCounts>>({});
  const [userVotes, setUserVotes] = useState<Record<string, string>>({});
  const [hasMore, setHasMore] = useState(false);
  const [nextToken, setNextToken] = useState<string | null>(null);
  const loaderRef = useRef<HTMLDivElement>(null);
  const isRestoring = useRef(false);
  // 並び順を切り替えた直後に前のリクエストが後から返ってくると、
  // 「タブは新着なのに中身は人気」になる。最新の要求だけを反映する。
  const loadSeq = useRef(0);

  const [followedLists, setFollowedLists] = useState<FollowedList[]>([]);
  const [activeListId, setActiveListId] = useState<string | null>(null);
  const [mounted, setMounted] = useState(false);
  const { isMuted } = useMutedWords();
  const [newArrivalCount, setNewArrivalCount] = useState(0);
  const [showNewBadge, setShowNewBadge] = useState(false);

  // Restore saved tab state on mount (from sessionStorage)
  useEffect(() => {
    setMounted(true);
    const savedList = sessionStorage.getItem("lailala-list");
    if (savedList) {
      setActiveListId(savedList);
      sessionStorage.removeItem("lailala-list");
    }
    fetch("/api/lists/follow/")
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data?.follows) {
          setFollowedLists(data.follows.map((f: any) => ({ id: f.id, name: f.name })));
        }
      })
      .catch(() => null);
  }, []);

  const loadInitial = useCallback(async () => {
    const seq = ++loadSeq.current;
    setLoading(true);
    setError(null);
    setHasMore(false);
    setNextToken(null);
    try {
      if (activeListId) {
        const res = await fetch(`/api/lists/?listId=${activeListId}`);
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
        if (seq !== loadSeq.current) return;
        setThreads(mapped);
        fetchVoteData(mapped);
      } else {
        const data = await fetchComments(videoId, sortBy);
        if (seq !== loadSeq.current) return;
        setThreads(data.threads);
        setHasMore(data.hasContinuation);
        setNextToken(data.continuationToken);
        fetchVoteData(data.threads);
      }
    } catch (e: any) {
      if (seq === loadSeq.current) setError(e.message || "コメントの取得に失敗しました");
    } finally {
      if (seq === loadSeq.current) setLoading(false);
    }
  }, [videoId, sortBy, activeListId]);

  const loadInitialAndRestoreScroll = useCallback(async () => {
    await loadInitial();
    if (isRestoring.current) {
      const savedScroll = sessionStorage.getItem("lailala-scroll");
      if (savedScroll) {
        requestAnimationFrame(() => {
          window.scrollTo({ top: parseInt(savedScroll, 10), behavior: "auto" });
        });
      }
      isRestoring.current = false;
    }
  }, [loadInitial]);

  const loadMore = useCallback(async () => {
    if (activeListId || !nextToken || loadingMore) return;
    const seq = loadSeq.current;
    setLoadingMore(true);
    try {
      const data = await fetchComments(videoId, sortBy, nextToken);
      if (seq !== loadSeq.current) return;
      setThreads((prev) => {
        const existingIds = new Set(prev.map((t) => t.comment.commentId));
        const newThreads = data.threads.filter((t) => !existingIds.has(t.comment.commentId));
        return [...prev, ...newThreads];
      });
      setHasMore(data.hasContinuation);
      setNextToken(data.continuationToken);
      fetchVoteData(data.threads);
    } catch (e: any) {
      if (seq === loadSeq.current) setError(e.message || "追加の取得に失敗しました");
    } finally {
      if (seq === loadSeq.current) setLoadingMore(false);
    }
  }, [videoId, sortBy, nextToken, loadingMore, activeListId]);

  // 先頭 20 件だけ取得していたため、21 件目以降はサイト内のいいね/低評価が
  // 常に 0 として描画されていた（YouTube 側の数に加算されない）。
  // 1 リクエストの URL 長とクエリ数を抑えるため 20 件ずつ分割して全部取る。
  const fetchVoteData = async (threadList: CommentThread[]) => {
    const allIds = threadList.map((t) => t.comment.commentId).filter(Boolean);
    if (allIds.length === 0) return;
    const CHUNK = 20;
    const chunks: string[][] = [];
    for (let i = 0; i < allIds.length; i += CHUNK) chunks.push(allIds.slice(i, i + CHUNK));

    await Promise.all(
      chunks.map(async (commentIds) => {
        const query = commentIds.map((id) => `commentId=${encodeURIComponent(id)}`).join("&");
        try {
          const [countsRes, userRes] = await Promise.all([
            fetch(`/api/comments/vote-counts/?${query}`),
            fetch(`/api/comments/vote-state/?${query}`),
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
      })
    );
  };

  useEffect(() => {
    if (!isRestoring.current) {
      setThreads([]);
    }
    loadInitialAndRestoreScroll();
  }, [videoId, sortBy, activeListId, loadInitialAndRestoreScroll]);

  // ルートが変わったら並び順も追従させる（/popular/ ↔ /latest/）
  useEffect(() => {
    if (activeListId) return;
    const want = pathname === "/latest/" ? "NEWEST_FIRST" : "TOP_COMMENTS";
    setSortBy((prev) => (prev === want ? prev : want));
  }, [pathname, activeListId]);

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

  // Save scroll position before leaving
  useEffect(() => {
    const onScroll = () => {
      sessionStorage.setItem("lailala-scroll", String(window.scrollY));
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Save tab state before navigating away
  useEffect(() => {
    sessionStorage.removeItem("lailala-sort");
    if (activeListId) {
      sessionStorage.setItem("lailala-list", activeListId);
    } else {
      sessionStorage.removeItem("lailala-list");
    }
  }, [sortBy, activeListId]);

  // Restore scroll position on back button
  useEffect(() => {
    const handlePageShow = (e: PageTransitionEvent) => {
      if (e.persisted) {
        isRestoring.current = true;
      }
    };
    window.addEventListener("pageshow", handlePageShow);
    return () => window.removeEventListener("pageshow", handlePageShow);
  }, []);

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
    const eventSource = new EventSource(`/api/sse/?videoId=${videoId}&${query}`);
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
      // 非表示タブでは叩かない（バックグラウンドのタブ数だけ上流を叩くのを防ぐ）
      if (typeof document !== "undefined" && document.visibilityState !== "visible") return;
      try {
        // poll=1 でサーバー側の 60 秒共有キャッシュを通す
        const data = await fetchComments(videoId, sortBy, undefined, { poll: true });
        const currentTopIds = new Set(threads.map((t) => t.comment.commentId));
        const newComments = data.threads.filter((t) => !currentTopIds.has(t.comment.commentId));
        if (newComments.length > 0) {
          setNewArrivalCount(newComments.length);
          setShowNewBadge(true);
        }
      } catch {
        // ignore polling errors
      }
    }, 60000);
    return () => clearInterval(interval);
  }, [videoId, sortBy, activeListId]);

  const baseTabs = [
    { id: "top", label: "人気", href: "/popular/", onClick: () => { setActiveListId(null); setSortBy("TOP_COMMENTS"); } },
    { id: "new", label: "新着", href: "/latest/", onClick: () => { setActiveListId(null); setSortBy("NEWEST_FIRST"); } },
  ];
  const listTabs = mounted
    ? followedLists.map((list) => ({
        id: list.id,
        label: list.name,
        onClick: () => setActiveListId(list.id),
      }))
    : [];
  const tabs = [...baseTabs, ...listTabs];

  const activeTabId = activeListId || (pathname === "/latest/" ? "new" : "top");

  return (
    <div>
      <FeatureAnnouncement />
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <div className="flex">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                tab.onClick();
                if ("href" in tab && tab.href && pathname !== tab.href) {
                  router.push(tab.href as string);
                }
              }}
              className={`flex-1 py-4 text-center text-sm hover:bg-white/5 transition-colors relative whitespace-nowrap inline-flex items-center justify-center ${
                activeTabId === tab.id ? "text-foreground font-bold" : "text-muted font-medium"
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
          : (() => {
              const visible = threads.filter((thread) => !isMuted(thread.comment.content));
              // 同じ投稿者の連続投稿をひとまとまりにする
              const groups: CommentThread[][] = [];
              for (const thread of visible) {
                const key = thread.comment.author?.channelId || thread.comment.author?.name || "";
                const last = groups[groups.length - 1];
                const lastKey = last && (last[0].comment.author?.channelId || last[0].comment.author?.name || "");
                if (last && key && lastKey === key) last.push(thread);
                else groups.push([thread]);
              }
              const removeThread = (id: string) =>
                setThreads((prev) => prev.filter((t) => t.comment.commentId !== id));
              return groups.map((group) => (
                <ConsecutiveGroup
                  key={group[0].comment.commentId}
                  items={group}
                  videoId={videoId}
                  voteCounts={voteCounts}
                  userVotes={userVotes}
                  onDelete={removeThread}
                />
              ));
            })()}
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
