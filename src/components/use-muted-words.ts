"use client";

import { useState, useEffect } from "react";

export interface MutedWord {
  id: string;
  word: string;
  mode: string;
}

export function useMutedWords() {
  const [words, setWords] = useState<MutedWord[]>([]);

  useEffect(() => {
    fetch("/api/muted-words")
      .then((r) => r.json())
      .then((data) => {
        if (data.words) setWords(data.words);
      })
      .catch(() => {});
  }, []);

  function isMuted(text: string): boolean {
    return words.some((w) => {
      if (w.mode === "exact") return text === w.word;
      if (w.mode === "regex") {
        try {
          return new RegExp(w.word, "i").test(text);
        } catch {
          return false;
        }
      }
      return text.toLowerCase().includes(w.word.toLowerCase());
    });
  }

  return { words, isMuted };
}
