"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Palette, Check, Ban, VolumeX, ChevronRight, Monitor, Hash, AtSign } from "lucide-react";
import Link from "next/link";

const MENTION_COLORS = [
  { id: "blue", label: "青", value: "#1d9bf0" },
  { id: "yellow", label: "黄色", value: "#ffad1f" },
  { id: "pink", label: "ピンク", value: "#f91880" },
  { id: "purple", label: "紫", value: "#7856ff" },
  { id: "orange", label: "オレンジ", value: "#ff7a00" },
  { id: "green", label: "黄緑", value: "#00ba7c" },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme, useSystem, setUseSystem } = useTheme();
  const [message, setMessage] = useState("");
  const [mentionColor, setMentionColor] = useState("#1d9bf0");

  useEffect(() => {
    const saved = localStorage.getItem("lailala-mention-color");
    if (saved) setMentionColor(saved);
  }, []);

  const themes = [
    { id: "light" as const, label: "ライト", icon: Sun },
    { id: "dark-blue" as const, label: "ダークブルー", icon: Palette },
    { id: "black" as const, label: "ブラック", icon: Moon },
  ];

  const handleThemeChange = (t: typeof theme) => {
    setTheme(t);
    setMessage("テーマを変更しました");
    setTimeout(() => setMessage(""), 2000);
  };

  const handleMentionColor = (color: string) => {
    setMentionColor(color);
    localStorage.setItem("lailala-mention-color", color);
    document.documentElement.style.setProperty("--mention", color);
    setMessage("メンション色を変更しました");
    setTimeout(() => setMessage(""), 2000);
  };

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-4">
        <h1 className="text-xl font-bold">設定</h1>
      </div>
      <div className="p-4 space-y-6">
        {/* Theme Settings */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4">テーマ</h2>

          {/* System setting toggle */}
          <button
            onClick={() => setUseSystem(!useSystem)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors mb-4 ${
              useSystem
                ? "border-primary bg-primary/10"
                : "border-border hover:border-primary/50"
            }`}
          >
            <Monitor size={20} className={useSystem ? "text-primary" : "text-muted"} />
            <span className="flex-1 text-left text-sm font-medium">
              システム設定に合わせる
            </span>
            {useSystem && <Check size={16} className="text-primary" />}
          </button>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                disabled={useSystem}
                className={`relative flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === t.id && !useSystem
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                } ${useSystem ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <t.icon size={24} className={theme === t.id && !useSystem ? "text-primary" : "text-muted"} />
                <span className={`text-sm font-medium ${theme === t.id && !useSystem ? "text-primary" : "text-foreground"}`}>
                  {t.label}
                </span>
                {theme === t.id && !useSystem && (
                  <div className="absolute top-2 right-2">
                    <Check size={16} className="text-primary" />
                  </div>
                )}
              </button>
            ))}
          </div>
          {message && (
            <p className="text-sm mt-3 text-primary">{message}</p>
          )}
        </div>

        {/* Mention / Hashtag Color */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Hash size={20} className="text-muted" />
            メンション・ハッシュタグの色
          </h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
            {MENTION_COLORS.map((c) => (
              <button
                key={c.id}
                onClick={() => handleMentionColor(c.value)}
                className={`flex flex-col items-center gap-2 p-3 rounded-xl border transition-colors ${
                  mentionColor === c.value
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <div
                  className="w-8 h-8 rounded-full border-2 border-white/20"
                  style={{ backgroundColor: c.value }}
                />
                <span className={`text-xs font-medium ${mentionColor === c.value ? "text-primary" : "text-foreground"}`}>
                  {c.label}
                </span>
              </button>
            ))}
          </div>
          <div className="mt-4 p-3 bg-background rounded-lg border border-border">
            <p className="text-sm text-muted mb-1">プレビュー</p>
            <p className="text-[15px]">
              この文章には <span style={{ color: mentionColor }}>@メンション</span> と{" "}
              <span style={{ color: mentionColor }}>#ハッシュタグ</span> が含まれます
            </p>
          </div>
        </div>

        {/* Account Info */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4">アカウント</h2>
          {user ? (
            <div className="flex items-center gap-3">
              {user.image ? (
                <img src={user.image} alt="" className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
                  <span className="text-muted text-lg">{user.name?.[0]}</span>
                </div>
              )}
              <div>
                <p className="font-medium">{user.name}</p>
                <p className="text-sm text-muted">{user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm">ログインしていません</p>
          )}
        </div>

        {/* Blocked / Muted */}
        <div className="bg-card rounded-2xl border border-border overflow-hidden">
          <h2 className="text-lg font-bold px-4 pt-4 pb-2">管理</h2>
          <Link href="/settings/blocked" className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors border-t border-border">
            <Ban size={18} className="text-muted" />
            <span className="flex-1">ブロック一覧</span>
            <ChevronRight size={16} className="text-muted" />
          </Link>
          <Link href="/settings/muted" className="flex items-center gap-3 px-4 py-3 hover:bg-white/[0.03] transition-colors border-t border-border">
            <VolumeX size={18} className="text-muted" />
            <span className="flex-1">ミュート一覧</span>
            <ChevronRight size={16} className="text-muted" />
          </Link>
        </div>
      </div>
    </MainLayout>
  );
}
