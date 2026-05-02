"use client";

import { useEffect, useCallback, useState } from "react";
import { useRouter } from "next/navigation";

interface KeyboardShortcutsProps {
  onOpenCompose?: () => void;
  onCloseCompose?: () => void;
  composeOpen?: boolean;
}

export function KeyboardShortcuts({ onOpenCompose, onCloseCompose, composeOpen }: KeyboardShortcutsProps) {
  const router = useRouter();
  const [shortcutHelp, setShortcutHelp] = useState(false);

  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    // Ignore when typing in input/textarea
    const target = e.target as HTMLElement;
    if (target.tagName === "INPUT" || target.tagName === "TEXTAREA" || target.isContentEditable) {
      // Allow Esc even in inputs
      if (e.key !== "Escape") return;
    }

    // N: New post (compose)
    if (e.key === "n" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      onOpenCompose?.();
      return;
    }

    // Esc: Close compose or go back
    if (e.key === "Escape") {
      if (composeOpen) {
        e.preventDefault();
        onCloseCompose?.();
        return;
      }
    }

    // /: Focus search
    if (e.key === "/" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      const searchInput = document.querySelector('input[type="text"]') as HTMLInputElement;
      if (searchInput && window.location.pathname.includes("search")) {
        searchInput.focus();
      } else {
        router.push("/search");
      }
      return;
    }

    // H: Go home
    if (e.key === "h" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/");
      return;
    }

    // S: Go settings
    if (e.key === "s" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/settings");
      return;
    }

    // P: Go profile
    if (e.key === "p" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/profile");
      return;
    }

    // B: Go bookmarks
    if (e.key === "b" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/bookmarks");
      return;
    }

    // L: Go lists
    if (e.key === "l" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/lists");
      return;
    }

    // T: Go trending
    if (e.key === "t" && !e.ctrlKey && !e.metaKey && !e.altKey && !composeOpen) {
      e.preventDefault();
      router.push("/trending");
      return;
    }

    // ?: Show help
    if (e.key === "?" && !e.ctrlKey && !e.metaKey && !e.altKey) {
      e.preventDefault();
      setShortcutHelp(true);
      return;
    }
  }, [router, onOpenCompose, onCloseCompose, composeOpen]);

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  if (!shortcutHelp) return null;

  const shortcuts = [
    { key: "N", desc: "新規投稿" },
    { key: "Esc", desc: "閉じる / 戻る" },
    { key: "/", desc: "検索に移動" },
    { key: "H", desc: "ホーム" },
    { key: "P", desc: "プロフィール" },
    { key: "B", desc: "ブックマーク" },
    { key: "L", desc: "リスト" },
    { key: "T", desc: "トレンド" },
    { key: "S", desc: "設定" },
    { key: "?", desc: "このヘルプ" },
  ];

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={() => setShortcutHelp(false)}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-sm mx-4 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <h2 className="text-lg font-bold">キーボードショートカット</h2>
          <button onClick={() => setShortcutHelp(false)} className="p-2 rounded-full hover:bg-white/10 text-muted">
            ×
          </button>
        </div>
        <div className="divide-y divide-border">
          {shortcuts.map((s) => (
            <div key={s.key} className="flex items-center justify-between px-4 py-3">
              <span className="text-[15px]">{s.desc}</span>
              <kbd className="px-2 py-1 bg-background border border-border rounded-md text-[13px] font-mono">{s.key}</kbd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
