"use client";

import { useState, useEffect, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { CommentCard } from "@/components/comment-card";
import { fetchComments } from "@/lib/youtube-client";
import { CommentThread } from "@/types/youtube";
import { Search, ArrowLeft, Loader2, SearchX, Mic, MicOff, TrendingUp } from "lucide-react";
import Link from "next/link";

interface TrendWord {
  word: string;
  count: number;
}

function SearchContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [inputValue, setInputValue] = useState(initialQuery);
  const [threads, setThreads] = useState<CommentThread[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);
  const [trendWords, setTrendWords] = useState<TrendWord[]>([]);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    if (!initialQuery) {
      // Load trending words when no query
      fetch("/api/trending/words?videoId=niKAylKNIEI")
        .then((r) => r.json())
        .then((data) => {
          if (data.words) setTrendWords(data.words);
        })
        .catch(() => null);
      return;
    }
    performSearch(initialQuery);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialQuery]);

  const performSearch = async (q: string) => {
    if (!q.trim()) return;
    setLoading(true);
    setSearched(false);
    try {
      const data = await fetchComments("niKAylKNIEI", "TOP_COMMENTS");
      const filtered = data.threads.filter(
        (t) =>
          t.comment.content.toLowerCase().includes(q.toLowerCase()) ||
          t.comment.author.name.toLowerCase().includes(q.toLowerCase())
      );
      setThreads(filtered);
    } catch {
      // ignore
    } finally {
      setLoading(false);
      setSearched(true);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputValue.trim()) return;
    setQuery(inputValue.trim());
    router.push(`/search?q=${encodeURIComponent(inputValue.trim())}`);
    performSearch(inputValue.trim());
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
      router.push(`/search?q=${encodeURIComponent(transcript)}`);
      performSearch(transcript);
    };
    recognition.onerror = () => setListening(false);
    recognition.start();
  };

  return (
    <MainLayout>
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
        </div>
        {query && (
          <div className="px-4 pb-3">
            <h1 className="text-lg font-bold">「{query}」の検索結果</h1>
          </div>
        )}
      </div>

      {loading && (
        <div className="p-8 flex justify-center">
          <Loader2 className="animate-spin text-primary" size={32} />
        </div>
      )}

      {!loading && searched && threads.length === 0 && query && (
        <div className="p-12 flex flex-col items-center text-muted">
          <SearchX size={48} className="mb-4" />
          <p className="text-lg">該当するコメントが見つかりませんでした</p>
        </div>
      )}

      {!query && !loading && (
        <div className="p-4">
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
        </div>
      )}

      <div className="divide-y divide-border">
        {threads.map((thread) => (
          <CommentCard key={thread.comment.commentId} thread={thread} videoId="niKAylKNIEI" voteCounts={{ likes: 0, dislikes: 0 }} />
        ))}
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
