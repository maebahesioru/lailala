"use client";

import { Home, Search, User, Settings, LogOut, Bookmark } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { LoginPopup } from "./login-popup";
import { useAuth } from "./auth-provider";

export function Sidebar() {
  const { user } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/me", { method: "POST" });
    window.location.reload();
  };

  const navItems = [
    { icon: Home, label: "ホーム", href: "/" },
    { icon: Search, label: "検索", href: "/search" },
  ];

  return (
    <>
      <aside className="w-[275px] hidden md:flex flex-col sticky top-0 h-screen px-4 py-4">
        <div className="mb-6 px-3">
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight">
            ライララ(仮)
          </Link>
        </div>
        <nav className="space-y-2 flex-1">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
            >
              <item.icon size={26} />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            href={user ? "/bookmarks" : "/"}
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
          >
            <Bookmark size={26} />
            <span className="font-medium">ブックマーク</span>
          </Link>
          <Link
            href={user ? "/profile" : "/"}
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
          >
            <User size={26} />
            <span className="font-medium">プロフィール</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
          >
            <Settings size={26} />
            <span className="font-medium">設定</span>
          </Link>
        </nav>
        <div className="mt-auto px-3 pb-4">
          {user ? (
            <button
              onClick={handleLogout}
              className="flex items-center gap-3 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors w-full text-left text-foreground"
            >
              <LogOut size={26} />
              <span className="font-medium">ログアウト</span>
            </button>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="flex items-center gap-3 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors w-full text-left text-foreground"
            >
              <User size={26} />
              <span className="font-medium">ログイン</span>
            </button>
          )}
        </div>
      </aside>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
