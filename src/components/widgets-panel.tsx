"use client";

import { Search, ThumbsUp, ThumbsDown, Eye, Clock, MessageSquare, TrendingUp, Mic, MicOff, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { SearchSuggestions } from "./search-suggestions";

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
}

interface TrendWord {
  word: string;
  count: number;
}

let cachedVideoInfo: VideoInfo | null = null;
let cachedTrendWords: TrendWord[] = [];
let cachedAt = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 minutes

export function WidgetsPanel() {
  const [query, setQuery] = useState("");
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(cachedVideoInfo);
  const [trendWords, setTrendWords] = useState<TrendWord[]>(cachedTrendWords);
  const [listening, setListening] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    if (cachedVideoInfo && Date.now() - cachedAt < CACHE_TTL) return;
    Promise.allSettled([
      fetch("/api/youtube/video-info?videoId=niKAylKNIEI").then((r) => r.json()),
      fetch("/api/comments?videoId=niKAylKNIEI&sortBy=NEWEST_FIRST").then((r) => r.json()),
      fetch("/api/trending/words").then((r) => r.json()),
    ])
      .then(([infoRes, commentsRes, trendRes]) => {
        const infoData = infoRes.status === "fulfilled" ? infoRes.value : {};
        const commentsData = commentsRes.status === "fulfilled" ? commentsRes.value : {};
        const trendData = trendRes.status === "fulfilled" ? trendRes.value : {};
        const info = {
          ...infoData,
          commentCount: commentsData.videoInfo?.commentCount ?? infoData.commentCount ?? null,
        };
        cachedVideoInfo = info;
        cachedTrendWords = trendData.words || [];
        cachedAt = Date.now();
        setVideoInfo(info);
        setTrendWords(cachedTrendWords);
      });
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    }
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
      setQuery(transcript);
      router.push(`/search?q=${encodeURIComponent(transcript)}`);
    };
    recognition.onerror = () => setListening(false);
    recognitionRef.current = recognition;
    recognition.start();
  };

  const stopVoiceInput = () => {
    try {
      recognitionRef.current?.stop();
    } catch (e) { console.error(e); }
    setListening(false);
  };

  const formatCount = (n: number | null | undefined) => {
    if (n == null) return "-";
    if (n >= 100000000) return (n / 100000000).toFixed(1) + "億";
    if (n >= 10000) return (n / 10000).toFixed(1) + "万";
    if (n >= 1000) return (n / 1000).toFixed(1) + "千";
    return String(n);
  };

  const formatDuration = (sec: number) => {
    if (!sec) return "-";
    const m = Math.floor(sec / 60);
    const s = sec % 60;
    return `${m}:${s.toString().padStart(2, "0")}`;
  };

  return (
    <aside className="w-[440px] hidden lg:block px-8 py-4 space-y-4 sticky top-0 h-screen overflow-y-auto">
      <div className="relative">
        <form onSubmit={handleSearch} className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted" size={18} />
          <input
            ref={inputRef}
            type="text"
            placeholder="コメントを検索"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setShowSuggestions(true)}
            className="w-full bg-card text-foreground rounded-full py-3 pl-12 pr-10 outline-none focus:ring-2 focus:ring-primary placeholder-muted border border-border"
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
        {showSuggestions && (
          <SearchSuggestions
            inputRef={inputRef}
            query={query}
            onSelect={(q) => { setQuery(q); setShowSuggestions(false); router.push(`/search?q=${encodeURIComponent(q)}`); }}
            trendWords={trendWords.map((t) => t.word)}
          />
        )}
      </div>

      {videoInfo && (
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
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
                <span className="ml-auto font-medium">{videoInfo.commentCount ?? "-"}</span>
              </div>

              <div className="flex items-center gap-2 text-[13px]">
                <Clock size={14} className="text-muted" />
                <span className="text-muted">再生時間</span>
                <span className="ml-auto font-medium">{formatDuration(videoInfo.duration)}</span>
              </div>

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
          <h2 className="text-lg font-bold">トレンド</h2>
        </div>
        {trendWords.length === 0 ? (
          <div className="text-muted px-4 py-6 text-sm">
            トレンドワードを計算中...
          </div>
        ) : (
          <div className="divide-y divide-border">
            {trendWords.map((t, i) => (
              <Link
                key={t.word}
                href={`/search?q=${encodeURIComponent(t.word)}`}
                className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors"
              >
                <span className={`text-[15px] font-bold w-5 text-center ${i < 3 ? "text-[#f91880]" : "text-muted"}`}>
                  {i + 1}
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-[14px] font-medium truncate">{t.word}</p>
                  <p className="text-[13px] text-muted">{t.count} 件のコメント</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Footer links */}
      <div className="flex flex-wrap gap-x-3 gap-y-1 px-4 text-[13px] text-muted">
        <Link href="/terms" className="hover:underline">利用規約</Link>
        <Link href="/privacy" className="hover:underline">プライバシーポリシー</Link>
        <Link href="/cookies" className="hover:underline">Cookieポリシー</Link>
        <Link href="/security" className="hover:underline">セキュリティ</Link>
        <a href="/api/export/comments" className="hover:underline">データエクスポート</a>
        <span>&copy; 2025 ライララ(仮)</span>
      </div>

      {/* Voice input overlay */}
      {listening && (
        <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-card border border-border rounded-2xl p-8 flex flex-col items-center gap-4 shadow-2xl mx-4">
            <div className="p-4 rounded-full bg-primary/10 animate-pulse">
              <Mic size={48} className="text-primary" />
            </div>
            <p className="text-lg font-bold">音声を聞いています...</p>
            <button
              onClick={stopVoiceInput}
              className="flex items-center gap-1 text-sm text-muted hover:text-foreground transition-colors"
            >
              <X size={14} />
              キャンセル
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
