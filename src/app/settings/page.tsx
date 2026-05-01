"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { MainLayout } from "@/components/main-layout";
import { useTheme } from "@/components/theme-provider";
import { Sun, Moon, Palette, Check } from "lucide-react";

export default function SettingsPage() {
  const { data: session } = useSession();
  const { theme, setTheme } = useTheme();
  const [message, setMessage] = useState("");

  const themes = [
    { id: "light" as const, label: "ライト", icon: Sun },
    { id: "dark-blue" as const, label: "ダークブルー", icon: Palette },
    { id: "dark" as const, label: "ダーク", icon: Moon },
  ];

  const handleThemeChange = (t: typeof theme) => {
    setTheme(t);
    setMessage("テーマを変更しました");
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
          <div className="grid grid-cols-3 gap-3">
            {themes.map((t) => (
              <button
                key={t.id}
                onClick={() => handleThemeChange(t.id)}
                className={`flex flex-col items-center gap-2 p-4 rounded-xl border transition-colors ${
                  theme === t.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-primary/50"
                }`}
              >
                <t.icon size={24} className={theme === t.id ? "text-primary" : "text-muted"} />
                <span className={`text-sm font-medium ${theme === t.id ? "text-primary" : "text-foreground"}`}>
                  {t.label}
                </span>
                {theme === t.id && (
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

        {/* Account Info */}
        <div className="bg-card rounded-2xl border border-border p-4">
          <h2 className="text-lg font-bold mb-4">アカウント</h2>
          {session?.user ? (
            <div className="flex items-center gap-3">
              {session.user.image ? (
                <img src={session.user.image} alt="" className="w-12 h-12 rounded-full" />
              ) : (
                <div className="w-12 h-12 rounded-full bg-border flex items-center justify-center">
                  <span className="text-muted text-lg">{session.user.name?.[0]}</span>
                </div>
              )}
              <div>
                <p className="font-medium">{session.user.name}</p>
                <p className="text-sm text-muted">{session.user.email}</p>
              </div>
            </div>
          ) : (
            <p className="text-muted text-sm">ログインしていません</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
}
