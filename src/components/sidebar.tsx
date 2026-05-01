"use client";

import { Home, Search, User, Settings, LogOut, Bookmark, List, MoreHorizontal, PenSquare, Music, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginPopup } from "./login-popup";
import { ComposePopup } from "./compose-popup";
import { useAuth } from "./auth-provider";
import { useBgm } from "./bgm-provider";
import { useNotifications } from "./use-notifications";

function LogoutConfirmDialog({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <h3 className="text-lg font-bold mb-2">ログアウトしますか？</h3>
        <p className="text-muted text-sm mb-6">
          再度ログインするには、YouTubeアカウントでの認証が必要です。
        </p>
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 border border-border rounded-full font-bold hover:bg-white/5 transition-colors"
          >
            キャンセル
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
          >
            ログアウト
          </button>
        </div>
      </div>
    </div>
  );
}

export function Sidebar() {
  const { user } = useAuth();
  const { enabled: bgmEnabled, mounted: bgmMounted, toggle: toggleBgm } = useBgm();
  const { unreadCount } = useNotifications();
  const [showLogin, setShowLogin] = useState(false);
  const [showCompose, setShowCompose] = useState(false);
  const [showAccountMenu, setShowAccountMenu] = useState(false);
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setShowAccountMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleLogout = async () => {
    setShowLogoutConfirm(false);
    setShowAccountMenu(false);
    await fetch("/api/auth/me", { method: "POST" });
    window.location.reload();
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      window.dispatchEvent(new CustomEvent("lailala:scrollToTop"));
    }
  };

  const navItems = [
    { icon: Home, label: "ホーム", href: "/", onClick: handleHomeClick },
    { icon: Search, label: "検索", href: "/search" },
  ];

  return (
    <>
      <aside className="w-[300px] hidden md:flex flex-col sticky top-0 h-screen px-4 py-4" aria-label="メインナビゲーション">
        <div className="mb-6 px-3">
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight" aria-label="ライララ(仮) ホーム">
            ライララ(仮)
          </Link>
        </div>
        <nav className="space-y-2 flex-1" role="navigation" aria-label="サイドバーメニュー">
          {navItems.map((item) => (
            <Link
              key={item.label}
              href={item.href}
              onClick={item.onClick}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label={item.label}
            >
              <item.icon size={26} aria-hidden="true" />
              <span className="font-medium">{item.label}</span>
            </Link>
          ))}
          <Link
            href="/notifications"
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground relative"
            aria-label="通知"
          >
            <div className="relative">
              <Bell size={26} aria-hidden="true" />
              {unreadCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1">
                  {unreadCount > 99 ? "99+" : unreadCount}
                </span>
              )}
            </div>
            <span className="font-medium">通知</span>
          </Link>
          <Link
            href="/bookmarks"
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
            aria-label="ブックマーク"
          >
            <Bookmark size={26} aria-hidden="true" />
            <span className="font-medium">ブックマーク</span>
          </Link>
          <Link
            href="/lists"
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
            aria-label="リスト"
          >
            <List size={26} aria-hidden="true" />
            <span className="font-medium">リスト</span>
          </Link>
          <Link
            href="/profile"
            onClick={(e) => handleProtectedClick(e)}
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
            aria-label="プロフィール"
          >
            <User size={26} aria-hidden="true" />
            <span className="font-medium">プロフィール</span>
          </Link>
          <Link
            href="/settings"
            className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
            aria-label="設定"
          >
            <Settings size={26} aria-hidden="true" />
            <span className="font-medium">設定</span>
          </Link>
          <button
            onClick={toggleBgm}
            className={`flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors w-full text-left ${bgmMounted && bgmEnabled ? "text-primary" : "text-foreground"}`}
            aria-label="BGM"
            suppressHydrationWarning
          >
            <Music size={26} aria-hidden="true" />
            <span className="font-medium">BGM {bgmMounted && bgmEnabled ? "ON" : "OFF"}</span>
          </button>
          <button
            onClick={() => user ? setShowCompose(true) : setShowLogin(true)}
            className="mt-4 compose-btn flex items-center justify-center gap-2 px-4 py-3 text-xl rounded-full font-bold transition-colors w-full"
          >
            <PenSquare size={22} />
            <span>コメントする</span>
          </button>
        </nav>
        <div className="mt-auto px-3 pb-4 relative">
          {mounted && user ? (
            <div ref={menuRef}>
              <button
                onClick={() => setShowAccountMenu(!showAccountMenu)}
                className="flex items-center gap-3 px-3 py-3 rounded-full hover:bg-white/10 transition-colors w-full text-left"
              >
                {user.image ? (
                  <img src={user.image} alt="" className="w-9 h-9 rounded-full object-cover shrink-0" />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-border flex items-center justify-center shrink-0">
                    <User size={18} className="text-muted" />
                  </div>
                )}
                <div className="flex-1 min-w-0">
                  <p className="font-bold text-[15px] truncate">{user.name || user.email?.split("@")[0] || "名無し"}</p>
                  <p className="text-[13px] text-muted truncate">{user.email || "@user"}</p>
                </div>
                <MoreHorizontal size={18} className="text-muted shrink-0" />
              </button>
              {showAccountMenu && (
                <div className="absolute bottom-full left-3 right-3 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden z-50">
                  <button
                    onClick={() => { setShowAccountMenu(false); setShowLogoutConfirm(true); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 text-left text-[15px]"
                  >
                    <LogOut size={18} className="text-muted" />
                    <span>ログアウト @{user.name || "user"}</span>
                  </button>
                </div>
              )}
            </div>
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
      <ComposePopup open={showCompose} onClose={() => setShowCompose(false)} videoId="niKAylKNIEI" />
      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={handleLogout}
      />
    </>
  );
}
