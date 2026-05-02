"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Palette, Check, Ban, VolumeX, ChevronRight, Monitor, Hash, Bell, BellOff, Eye, EyeOff, Shield } from "lucide-react";
import { usePush } from "@/components/push-provider";
import Link from "next/link";

const MENTION_COLORS = [
  { id: "blue", label: "青", value: "#1d9bf0" },
  { id: "yellow", label: "黄色", value: "#ffad1f" },
  { id: "pink", label: "ピンク", value: "#f91880" },
  { id: "purple", label: "紫", value: "#7856ff" },
  { id: "orange", label: "オレンジ", value: "#ff7a00" },
  { id: "green", label: "黄緑", value: "#00ba7c" },
];

interface PrivacyState {
  showLikesTab: boolean;
  showDislikesTab: boolean;
  showBookmarksTab: boolean;
  notifyLikes: boolean;
  notifyDislikes: boolean;
  notifyBookmarks: boolean;
  notifyReplies: boolean;
}

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme, useSystem, setUseSystem } = useTheme();
  const { supported, subscribed, subscribe, unsubscribe } = usePush();
  const [message, setMessage] = useState("");
  const [mentionColor, setMentionColor] = useState("#1d9bf0");
  const [privacy, setPrivacy] = useState<PrivacyState>({
    showLikesTab: true,
    showDislikesTab: true,
    showBookmarksTab: true,
    notifyLikes: true,
    notifyDislikes: true,
    notifyBookmarks: true,
    notifyReplies: true,
  });

  useEffect(() => {
    const saved = localStorage.getItem("lailala-mention-color");
    if (saved) setMentionColor(saved);
  }, []);

  useEffect(() => {
    fetch("/api/user/privacy")
      .then((r) => r.json())
      .then((data) => {
        if (data && !data.error) {
          setPrivacy((prev) => ({ ...prev, ...data }));
        }
      })
      .catch(() => {});
  }, []);

  const updatePrivacy = async (key: keyof PrivacyState, value: boolean) => {
    const next = { ...privacy, [key]: value };
    setPrivacy(next);
    try {
      await fetch("/api/user/privacy", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ [key]: value }),
      });
      setMessage("設定を更新しました");
      setTimeout(() => setMessage(""), 2000);
    } catch {}
  };

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

        {/* Privacy Settings */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Shield size={20} className="text-muted" />
            プライバシー
          </h2>

          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-bold text-muted mb-2">プロフィール表示</h3>
              <div className="space-y-2">
                {[
                  { key: "showLikesTab" as const, label: "高評価タブを公開" },
                  { key: "showDislikesTab" as const, label: "低評価タブを公開" },
                  { key: "showBookmarksTab" as const, label: "ブックマークタブを公開" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updatePrivacy(item.key, !privacy[item.key])}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    {privacy[item.key] ? <Eye size={18} className="text-primary" /> : <EyeOff size={18} className="text-muted" />}
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {privacy[item.key] && <Check size={16} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-bold text-muted mb-2">通知を受け取る</h3>
              <div className="space-y-2">
                {[
                  { key: "notifyLikes" as const, label: "高評価された時" },
                  { key: "notifyDislikes" as const, label: "低評価された時" },
                  { key: "notifyBookmarks" as const, label: "ブックマークされた時" },
                  { key: "notifyReplies" as const, label: "返信された時" },
                ].map((item) => (
                  <button
                    key={item.key}
                    onClick={() => updatePrivacy(item.key, !privacy[item.key])}
                    className="w-full flex items-center gap-3 p-3 rounded-xl border border-border hover:border-primary/50 transition-colors"
                  >
                    {privacy[item.key] ? <Bell size={18} className="text-primary" /> : <BellOff size={18} className="text-muted" />}
                    <span className="flex-1 text-left text-sm">{item.label}</span>
                    {privacy[item.key] && <Check size={16} className="text-primary" />}
                  </button>
                ))}
              </div>
            </div>
          </div>
          {message && (
            <p className="text-sm mt-3 text-primary">{message}</p>
          )}
        </div>

        {/* Push Notification */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4 flex items-center gap-2">
            <Bell size={20} className="text-muted" />
            プッシュ通知
          </h2>
          {!supported ? (
            <p className="text-sm text-muted">このブラウザはプッシュ通知に対応していません</p>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => (subscribed ? unsubscribe() : subscribe())}
                className={`w-full flex items-center gap-3 p-3 rounded-xl border transition-colors ${
                  subscribed
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {subscribed ? <Bell size={20} className="text-primary" /> : <BellOff size={20} className="text-muted" />}
                <span className="flex-1 text-left text-sm font-medium">
                  {subscribed ? "プッシュ通知ON" : "プッシュ通知OFF"}
                </span>
                {subscribed && <Check size={16} className="text-primary" />}
              </button>
              <p className="text-xs text-muted">
                {subscribed
                  ? "いいね・返信・ブックマークなどの通知を受け取っています"
                  : "通知をオンにすると、リアルタイムで通知を受け取れます"}
              </p>
            </div>
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
