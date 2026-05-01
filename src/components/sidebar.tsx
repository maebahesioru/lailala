"use client";

import { Home, Search, User, Settings, LogIn, LogOut, Bookmark } from "lucide-react";
import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";
import { LoginPopup } from "./login-popup";

export function Sidebar() {
  const { data: session } = useSession();
  const [showLogin, setShowLogin] = useState(false);

  const handleProtectedClick = (e: React.MouseEvent, path: string) => {
    if (!session?.user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const navItems = [
    { icon: Home, label: "ホーム", href: "/" },
    { icon: Search, label: "検索", href: "/search" },
  ];

  return (
    <>
      <aside className="w-[275px] hidden md:flex flex-col sticky top-0 px-4 py-4">
        <div className="mb-6 px-3">
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight">
            ライララ
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
            href={session?.user ? "/bookmarks" : "/"}
            onClick={(e) => handleProtectedClick(e, "/bookmarks")}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
          >
            <Bookmark size={26} />
            <span className="font-medium">ブックマーク</span>
          </Link>
          <Link
            href={session?.user ? "/profile" : "/"}
            onClick={(e) => handleProtectedClick(e, "/profile")}
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
          {session?.user ? (
            <button
              onClick={() => signOut()}
              className="flex items-center gap-3 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors w-full text-left text-foreground"
            >
              <LogOut size={26} />
              <span className="font-medium">ログアウト</span>
            </button>
          ) : (
            <button
              onClick={() => signIn("google")}
              className="flex items-center gap-3 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors w-full text-left text-foreground"
            >
              <LogIn size={26} />
              <span className="font-medium">ログイン</span>
            </button>
          )}
        </div>
      </aside>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} onLogin={() => signIn("google")} />
    </>
  );
}
