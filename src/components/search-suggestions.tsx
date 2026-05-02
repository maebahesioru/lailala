"use client";

import { useState, useEffect, useRef } from "react";
import { Search, Clock, X, TrendingUp } from "lucide-react";

const STORAGE_KEY = "lailala-search-history";

function loadHistory(): string[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveHistory(list: string[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 20)));
}

interface SearchSuggestionsProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  query: string;
  onSelect: (q: string) => void;
  trendWords?: string[];
}

export function SearchSuggestions({ inputRef, query, onSelect, trendWords = [] }: SearchSuggestionsProps) {
  const [history, setHistory] = useState<string[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node) && inputRef.current && !inputRef.current.contains(e.target as Node)) {
        onSelect(query);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [inputRef, query, onSelect]);

  const addToHistory = (q: string) => {
    const updated = [q, ...history.filter((h) => h !== q)].slice(0, 20);
    setHistory(updated);
    saveHistory(updated);
  };

  const removeFromHistory = (q: string) => {
    const updated = history.filter((h) => h !== q);
    setHistory(updated);
    saveHistory(updated);
  };

  const handleSelect = (q: string) => {
    addToHistory(q);
    onSelect(q);
  };

  const filtered = query.trim()
    ? history.filter((h) => h.toLowerCase().includes(query.toLowerCase()))
    : history;

  return (
    <div ref={ref} className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden">
      {query.trim() && filtered.length === 0 && history.length === 0 && (
        <div className="px-4 py-3 text-sm text-muted">検索履歴がありません</div>
      )}

      {filtered.length > 0 && (
        <div className="border-b border-border last:border-0">
          <div className="px-4 py-2 text-xs font-bold text-muted">最近の検索</div>
          {filtered.map((h) => (
            <div key={h} className="flex items-center gap-2 px-4 py-2 hover:bg-white/5 cursor-pointer group" onClick={() => handleSelect(h)}>
              <Clock size={14} className="text-muted shrink-0" />
              <span className="flex-1 text-sm truncate">{h}</span>
              <button
                onClick={(e) => { e.stopPropagation(); removeFromHistory(h); }}
                className="p-1 rounded-full hover:bg-white/10 text-muted opacity-0 group-hover:opacity-100"
              >
                <X size={12} />
              </button>
            </div>
          ))}
        </div>
      )}

      {trendWords.length > 0 && !query.trim() && (
        <div>
          <div className="px-4 py-2 text-xs font-bold text-muted">トレンド</div>
          {trendWords.slice(0, 5).map((word, i) => (
            <div
              key={word}
              className="flex items-center gap-3 px-4 py-2 hover:bg-white/5 cursor-pointer"
              onClick={() => handleSelect(word)}
            >
              <span className="text-sm font-bold text-primary w-4">{i + 1}</span>
              <TrendingUp size={14} className="text-muted" />
              <span className="text-sm">{word}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export { loadHistory, saveHistory };
