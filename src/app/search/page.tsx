"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { CommentCard } from "@/components/comment-card";
import { CommentThread } from "@/types/youtube";
import { Search, ArrowLeft, Loader2, SearchX, Mic, MicOff, TrendingUp, User, List, SlidersHorizontal, X, Heart, Clock, Eye, ThumbsUp, ThumbsDown, MessageSquare, Calendar, Users } from "lucide-react";
import Link from "next/link";

interface TrendWord {
  word: string;
  count: number;
}

interface VideoInfo {
  title: string;
  author: string;
  thumbnail: string;
  viewCount: number;
  likeCount: number;
  dislikeCount: number | null;
  commentCount: string | null;
  likeRatio: number | null;
  duration: number;
  daysSinceUpload: number | null;
  subscriberCount: number | null;
}

interface AccountResult {
  channelId: string;
  authorName: string;
  authorThumb: string | null;
  count: number;
}

interface ListResult {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  user: { name: string | null; image: string | null } | null;
  _count?: { items: number; followers: number };
}

type SearchTab = "top" | "latest" | "accounts" | "lists";
type Period = "all" | "today" | "week" | "month";
type SortBy = "relevance" | "newest" | "likes";

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [results, setResults] = useState<{ thread: CommentThread; videoId: string }[]>([]);
  const [accounts, setAccounts] = useState<AccountResult[]>([]);
  const [listResults, setListResults] = useState<ListResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [trendWords, setTrendWords] = useState<TrendWord[]>([]);
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null);
  const [listening, setListening] = useState(false);
  const [activeTab, setActiveTab] = useState<SearchTab>("top");
  const [showFilters, setShowFilters] = useState(false);

  // Filters
  const [period, setPeriod] = useState<Period>((searchParams.get("period") as Period) || "all");
  const [minLikes, setMinLikes] = useState(parseInt(searchParams.get("minLikes") || "0", 10));
  const [sortBy, setSortBy] = useState<SortBy>((searchParams.get("sort") as SortBy) || "relevance");
  const [userFilter, setUserFilter] = useState(searchParams.get("user") || "");

  useEffect(() => {
    if (!initialQuery && !userFilter) {
      Promise.allSettled([
        fetch("/api/trending/words").then((r) => r.json()),
        fetch("/api/youtube/video-info?videoId=niKAylKNIEI").then((r) => r.json()),
        fetch("/api/comments?videoId=niKAylKNIEI&sortBy=NEWEST_FIRST").then((r) => r.json()),
      ]).then(([trendRes, infoRes, commentsRes]) => {
        const trendData = trendRes.status === "fulfilled" ? trendRes.value : {};
        const infoData = infoRes.status === "fulfilled" ? infoRes.value : {};
        const commentsData = commentsRes.status === "fulfilled" ? commentsRes.value : {};
        if (trendData.words) setTrendWords(trendData.words);
        const info = {
          ...infoData,
          commentCount: commentsData.videoInfo?.commentCount ?? infoData.commentCount ?? null,
        };
        setVideoInfo(info);
      });
      return;
    }
    performSearch(initialQuery, activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  useEffect(() => {
    if (query || userFilter) {
      performSearch(query, activeTab);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, period, minLikes, sortBy, userFilter]);

  const buildSearchUrl = (q: string, tab: SearchTab) => {
    const params = new URLSearchParams();
    if (q.trim()) params.set("q", q.trim());
    if (tab !== "top") params.set("type", tab);
    if (period !== "all") params.set("period", period);
    if (minLikes > 0) params.set("minLikes", String(minLikes));
    if (sortBy !== "relevance") params.set("sort", sortBy);
    if (userFilter.trim()) params.set("user", userFilter.trim());
    return `/search?${params.toString()}`;
  };

  const performSearch = async (q: string, tab: SearchTab) => {
    if (!q.trim() && !userFilter.trim() && tab !== "accounts" && tab !== "lists") return;
    setLoading(true);
    setSearched(false);
    try {
      if (tab === "top" || tab === "latest") {
        const params = new URLSearchParams();
        if (q.trim()) params.set("q", q.trim());
        params.set("type", tab);
        if (period !== "all") params.set("period", period);
        if (minLikes > 0) params.set("minLikes", String(minLikes));
        if (sortBy !== "relevance") params.set("sort", sortBy);
        if (userFilter.trim()) params.set("user", userFilter.trim());

        const r = await fetch(`/api/search/comments?${params.toString()}`);
        const data = await r.json();
        const mapped = (data.threads || []).map((t: any) => ({
          thread: {
            comment: t.comment,
            replies: t.replies,
            hasRepliesContinuation: t.hasRepliesContinuation,
          } as CommentThread,
          videoId: t.videoId || "niKAylKNIEI",
        }));
        setResults(mapped);
      } else if (tab === "accounts") {
        const r = await fetch(`/api/search/comments?q=${encodeURIComponent(q)}&type=accounts`);
        const data = await r.json();
        setAccounts(data.accounts || []);
      } else if (tab === "lists") {
        const r = await fetch(`/api/lists/public?q=${encodeURIComponent(q)}`);
        const data = await r.json();
        setListResults(data.lists || []);
      }
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim() && !userFilter.trim()) return;
    setQuery(inputValue.trim());
    router.push(buildSearchUrl(inputValue.trim(), activeTab));
    performSearch(inputValue.trim(), activeTab);
  };

  const startVoiceInput = () => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (!SpeechRecognition) {
      alert("お使いのブラウザは音声入力に対応していません");
      return;
    }
    const recognition = new SpeechRecognition();
    recognition.lang = "ja-JP";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;
    recognition.onstart = () => setListening(true);
    recognition.onend = () => setListening(false);
    recognition.onresult = (event: any) => {
      const transcript = event.results[0][0].transcript;
      setInputValue(transcript);
      setQuery(transcript);
      router.push(buildSearchUrl(transcript, activeTab));
      performSearch(transcript, activeTab);
    };
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  const tabs: { id: SearchTab; label: string }[] = [
    { id: "top", label: "話題のポスト" },
    { id: "latest", label: "最新" },
    { id: "accounts", label: "アカウント" },
    { id: "lists", label: "リスト" },
  ];

  const periods: { id: Period; label: string }[] = [
    { id: "all", label: "全期間" },
    { id: "today", label: "今日" },
    { id: "week", label: "今週" },
    { id: "month", label: "今月" },
  ];

  const sorts: { id: SortBy; label: string; icon: typeof Heart }[] = [
    { id: "relevance", label: "関連度", icon: Search },
    { id: "newest", label: "新着", icon: Clock },
    { id: "likes", label: "いいね数", icon: Heart },
  ];

  const minLikeOptions = [0, 10, 50, 100, 500];

  const formatCount = (n: number | null | undefined) => {
    if (n == null) return "-";
    return n.toLocaleString("ja-JP");
  };

  function parseYoutubeCount(str: string | null | undefined): string {
    if (!str) return "-";
    const trimmed = str.trim().replace(/,/g, "");
    const match = trimmed.match(/^(\d+(?:\.\d+)?)\s*([KM億万]?)$/i);
    if (!match) return trimmed;
    const num = parseFloat(match[1]);
    const unit = match[2].toUpperCase();
    if (unit === "K") return Math.round(num * 1000).toLocaleString("ja-JP");
    if (unit === "M") return Math.round(num * 1000000).toLocaleString("ja-JP");
    if (unit === "億") return Math.round(num * 100000000).toLocaleString("ja-JP");
    if (unit === "万") return Math.round(num * 10000).toLocaleString("ja-JP");
    return Math.round(num).toLocaleString("ja-JP");
  }

  const formatDuration = (sec: number) => {
    if (!sec) return "-";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  const renderResults = () => {
    if (loading) {
      return (
        <div className="p-8 flex justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      );
    }
    if (!searched) return null;

    if (activeTab === "top" || activeTab === "latest") {
      if (results.length === 0) {
        return (
          <div className="p-12 flex flex-col items-center text-muted">
            <SearchX size={48} className="mb-4" />
            <p className="text-lg">該当するコメントが見つかりませんでした</p>
            <p className="text-sm mt-2">フィルターを変更してみてください</p>
          </div>
        );
      }
      return (
        <div className="divide-y divide-border flex-1">
          {results.map(({ thread, videoId }) => (
            <CommentCard key={thread.comment.commentId} thread={thread} videoId={videoId} voteCounts={{ likes: 0, dislikes: 0 }} />
          ))}
        </div>
      );
    }

    if (activeTab === "accounts") {
      if (accounts.length === 0) {
        return (
          <div className="p-12 flex flex-col items-center text-muted">
            <SearchX size={48} className="mb-4" />
            <p className="text-lg">該当するアカウントが見つかりませんでした</p>
          </div>
        );
      }
      return (
        <div className="divide-y divide-border flex-1">
          {accounts.map((acc) => (
            <Link
              key={acc.channelId}
              href={`/profile/${encodeURIComponent(acc.channelId)}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
            >
              {acc.authorThumb ? (
                <img src={acc.authorThumb} alt="" className="w-12 h-12 rounded-full object-cover" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
                  <User size={24} className="text-muted" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] truncate">{acc.authorName}</p>
                <p className="text-[13px] text-muted">{acc.count} 件のコメント</p>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    if (activeTab === "lists") {
      if (listResults.length === 0) {
        return (
          <div className="p-12 flex flex-col items-center text-muted">
            <SearchX size={48} className="mb-4" />
            <p className="text-lg">該当するリストが見つかりませんでした</p>
          </div>
        );
      }
      return (
        <div className="divide-y divide-border flex-1">
          {listResults.map((list) => (
            <Link
              key={list.id}
              href={`/lists?id=${list.id}`}
              className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
            >
              <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                <List size={24} className="text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-[15px] truncate">{list.name}</p>
                <p className="text-[13px] text-muted">
                  {list._count?.items || 0}件 · {list._count?.followers || 0}フォロワー
                  {list.user && ` · ${list.user.name || "ユーザー"}`}
                </p>
              </div>
            </Link>
          ))}
        </div>
      );
    }

    return null;
  };

  const hasActiveFilters = period !== "all" || minLikes > 0 || sortBy !== "relevance" || userFilter.trim();

  return (
    <MainLayout>
      <div className="flex-1 flex flex-col">
        <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
          <div className="flex items-center gap-3 px-4 py-3">
            <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors shrink-0">
              <ArrowLeft size={20} />
            </Link>
            <form onSubmit={handleSubmit} className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={18} />
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="コメントを検索"
                className="w-full bg-card text-foreground rounded-full py-2.5 pl-10 pr-10 outline-none focus:ring-2 focus:ring-primary placeholder-muted border border-border"
                autoFocus
              />
              <button
                type="button"
                onClick={startVoiceInput}
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full transition-colors ${
                  listening ? "text-primary animate-pulse" : "text-muted hover:text-foreground"
                }`}
                title="音声入力"
              >
                {listening ? <Mic size={18} /> : <MicOff size={18} />}
              </button>
            </form>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`p-2 rounded-full transition-colors shrink-0 ${showFilters || hasActiveFilters ? "bg-primary/10 text-primary" : "hover:bg-white/10 text-muted"}`}
              title="高度な検索"
            >
              <SlidersHorizontal size={20} />
            </button>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="px-4 pb-4 border-b border-border space-y-4">
              {/* Period */}
              <div>
                <p className="text-[13px] font-bold text-muted mb-2">期間</p>
                <div className="flex gap-2 flex-wrap">
                  {periods.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setPeriod(p.id)}
                      className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        period === p.id
                          ? "bg-primary text-white"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Min Likes */}
              <div>
                <p className="text-[13px] font-bold text-muted mb-2">いいね数以上</p>
                <div className="flex gap-2 flex-wrap">
                  {minLikeOptions.map((n) => (
                    <button
                      key={n}
                      onClick={() => setMinLikes(n)}
                      className={`px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        minLikes === n
                          ? "bg-primary text-white"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      {n === 0 ? "指定なし" : `${n}以上`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <p className="text-[13px] font-bold text-muted mb-2">並び替え</p>
                <div className="flex gap-2 flex-wrap">
                  {sorts.map((s) => (
                    <button
                      key={s.id}
                      onClick={() => setSortBy(s.id)}
                      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[13px] font-medium transition-colors ${
                        sortBy === s.id
                          ? "bg-primary text-white"
                          : "bg-card border border-border hover:border-primary/50"
                      }`}
                    >
                      <s.icon size={14} />
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* User filter */}
              <div>
                <p className="text-[13px] font-bold text-muted mb-2">ユーザーで絞り込み</p>
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" size={16} />
                    <input
                      type="text"
                      value={userFilter}
                      onChange={(e) => setUserFilter(e.target.value)}
                      placeholder="ユーザー名または@ID"
                      className="w-full bg-card text-foreground rounded-full py-2 pl-9 pr-3 outline-none focus:ring-2 focus:ring-primary placeholder-muted border border-border text-[13px]"
                    />
                  </div>
                  {userFilter && (
                    <button
                      onClick={() => setUserFilter("")}
                      className="p-2 rounded-full hover:bg-white/10 text-muted"
                    >
                      <X size={16} />
                    </button>
                  )}
                </div>
              </div>

              {/* Active filter chips */}
              {hasActiveFilters && (
                <div className="flex flex-wrap gap-2 pt-2 border-t border-border">
                  {period !== "all" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-[12px]">
                      {periods.find((p) => p.id === period)?.label}
                      <button onClick={() => setPeriod("all")}><X size={12} /></button>
                    </span>
                  )}
                  {minLikes > 0 && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-[12px]">
                      いいね{minLikes}以上
                      <button onClick={() => setMinLikes(0)}><X size={12} /></button>
                    </span>
                  )}
                  {sortBy !== "relevance" && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-[12px]">
                      {sorts.find((s) => s.id === sortBy)?.label}
                      <button onClick={() => setSortBy("relevance")}><X size={12} /></button>
                    </span>
                  )}
                  {userFilter && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full text-[12px]">
                      @{userFilter}
                      <button onClick={() => setUserFilter("")}><X size={12} /></button>
                    </span>
                  )}
                  <button
                    onClick={() => {
                      setPeriod("all");
                      setMinLikes(0);
                      setSortBy("relevance");
                      setUserFilter("");
                    }}
                    className="text-[12px] text-muted hover:text-foreground underline"
                  >
                    すべてクリア
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Tabs */}
          {query && (
            <div className="flex">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex-1 py-3 text-center text-sm font-medium hover:bg-white/5 transition-colors relative ${
                    activeTab === tab.id ? "text-foreground" : "text-muted"
                  }`}
                >
                  {tab.label}
                  {activeTab === tab.id && (
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-1 bg-primary rounded-full" />
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {!query && !userFilter && !loading && (
          <div className="p-4 space-y-4">
            {/* Video Info - mobile visible (hidden on lg since widgets-panel shows it) */}
            {videoInfo && (
              <div className="bg-card rounded-2xl border border-border overflow-hidden lg:hidden">
                <img src={videoInfo.thumbnail} alt={videoInfo.title} width={320} height={180} className="w-full aspect-video object-cover" />
                <div className="p-4">
                  <h3 className="font-bold text-[15px] leading-snug mb-1 line-clamp-2">{videoInfo.title}</h3>
                  <p className="text-muted text-[13px] mb-3">{videoInfo.author}</p>

                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-[13px]">
                      <Eye size={14} className="text-muted" />
                      <span className="text-muted">再生回数</span>
                      <span className="ml-auto font-medium">{formatCount(videoInfo.viewCount)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px]">
                      <ThumbsUp size={14} className="text-[#f91880]" />
                      <span className="text-muted">高評価</span>
                      <span className="ml-auto font-medium text-[#f91880]">{formatCount(videoInfo.likeCount)}</span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px]">
                      <ThumbsDown size={14} className="text-primary" />
                      <span className="text-muted">低評価</span>
                      <span className="ml-auto font-medium text-primary">
                        {videoInfo.dislikeCount != null ? formatCount(videoInfo.dislikeCount) : "取得不可"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px]">
                      <MessageSquare size={14} className="text-muted" />
                      <span className="text-muted">コメント数</span>
                      <span className="ml-auto font-medium">
                        {videoInfo.commentCount ? parseYoutubeCount(videoInfo.commentCount) : "-"}
                      </span>
                    </div>

                    <div className="flex items-center gap-2 text-[13px]">
                      <Clock size={14} className="text-muted" />
                      <span className="text-muted">再生時間</span>
                      <span className="ml-auto font-medium">{formatDuration(videoInfo.duration)}</span>
                    </div>

                    {videoInfo.daysSinceUpload != null && (
                      <div className="flex items-center gap-2 text-[13px]">
                        <Calendar size={14} className="text-muted" />
                        <span className="text-muted">投稿経過日数</span>
                        <span className="ml-auto font-medium">{videoInfo.daysSinceUpload.toFixed(1)}日</span>
                      </div>
                    )}

                    {videoInfo.subscriberCount != null && (
                      <div className="flex items-center gap-2 text-[13px]">
                        <Users size={14} className="text-muted" />
                        <span className="text-muted">チャンネル登録者数</span>
                        <span className="ml-auto font-medium">{videoInfo.subscriberCount.toLocaleString("ja-JP")}</span>
                      </div>
                    )}

                    {videoInfo.likeRatio != null && (
                      <div className="pt-2 border-t border-border">
                        <div className="flex items-center justify-between text-[13px]">
                          <span className="text-muted">高評価率</span>
                          <span className="font-medium text-primary">{videoInfo.likeRatio}%</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            <div className="bg-card rounded-2xl border border-border overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-border">
                <TrendingUp size={18} className="text-[#f91880]" />
                <h2 className="text-lg font-bold">トレンドワード</h2>
              </div>
              {trendWords.length === 0 ? (
                <div className="text-muted px-4 py-6 text-sm text-center">
                  トレンドワードを計算中...
                </div>
              ) : (
                <div className="divide-y divide-border">
                  {trendWords.map((t, i) => (
                    <button
                      key={t.word}
                      onClick={() => {
                        setInputValue(t.word);
                        setQuery(t.word);
                        router.push(buildSearchUrl(t.word, "top"));
                        performSearch(t.word, "top");
                      }}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors w-full text-left"
                    >
                      <span className={`text-[15px] font-bold w-5 text-center ${i < 3 ? "text-[#f91880]" : "text-muted"}`}>
                        {i + 1}
                      </span>
                      <div className="flex-1 min-w-0">
                        <p className="text-[14px] font-medium truncate">{t.word}</p>
                        <p className="text-[13px] text-muted">{t.count} 件のコメント</p>
                      </div>
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {renderResults()}
      </div>
    </MainLayout>
  );
}

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex justify-center pt-20">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      }
    >
      <SearchContent />
    </Suspense>
  );
}
