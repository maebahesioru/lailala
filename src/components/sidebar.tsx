"use client";

import { Home, Search, User, Settings, LogOut, Bookmark, List, MoreHorizontal, PenSquare, Music, Bell } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LoginPopup } from "./login-popup";
import { useAuth } from "./auth-provider";
import { useBgm } from "./bgm-provider";
import { useNotifications } from "./use-notifications";

function LogoutConfirmDialog({ open, onClose, onConfirm }: { open: boolean; onClose: () => void; onConfirm: () => void }) {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={onClose}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.95, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 10 }}
            transition={{ type: "spring", stiffness: 400, damping: 25 }}
          >
            <h3 className="text-lg font-bold mb-2">ログアウトしますか？</h3>
            <p className="text-muted text-sm mb-6">
              再度ログインするには、YouTubeアカウントでの認証が必要です。
            </p>
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onClose}
                className="flex-1 py-2.5 border border-border rounded-full font-bold hover:bg-white/5 transition-colors"
              >
                キャンセル
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={onConfirm}
                className="flex-1 py-2.5 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
              >
                ログアウト
              </motion.button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export function Sidebar() {
  const { user } = useAuth();
  const { enabled: bgmEnabled, mounted: bgmMounted, toggle: toggleBgm } = useBgm();
  const { unreadCount } = useNotifications();
  const [showLogin, setShowLogin] = useState(false);
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
        <motion.div
          className="mb-6 px-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.3 }}
        >
          <Link href="/" className="text-2xl font-bold text-foreground tracking-tight" aria-label="ライララ(仮) ホーム">
            ライララ(仮)
          </Link>
        </motion.div>
        <nav className="space-y-2 flex-1" role="navigation" aria-label="サイドバーメニュー">
          {navItems.map((item) => (
            <motion.div key={item.label} whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
              <Link
                href={item.href}
                onClick={item.onClick}
                className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
                aria-label={item.label}
              >
                <item.icon size={26} aria-hidden="true" />
                <span className="font-medium">{item.label}</span>
              </Link>
            </motion.div>
          ))}
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href="/notifications"
              onClick={(e) => handleProtectedClick(e)}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground relative"
              aria-label="通知"
            >
              <div className="relative">
                <Bell size={26} aria-hidden="true" />
                <AnimatePresence>
                  {unreadCount > 0 && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      exit={{ scale: 0 }}
                      transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      className="absolute -top-1.5 -right-2 bg-primary text-white text-[10px] font-bold rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1"
                    >
                      {unreadCount > 99 ? "99+" : unreadCount}
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>
              <span className="font-medium">通知</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href="/bookmarks"
              onClick={(e) => handleProtectedClick(e)}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label="ブックマーク"
            >
              <Bookmark size={26} aria-hidden="true" />
              <span className="font-medium">ブックマーク</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href="/lists"
              onClick={(e) => handleProtectedClick(e)}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label="リスト"
            >
              <List size={26} aria-hidden="true" />
              <span className="font-medium">リスト</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href="/profile"
              onClick={(e) => handleProtectedClick(e)}
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label="プロフィール"
            >
              <User size={26} aria-hidden="true" />
              <span className="font-medium">プロフィール</span>
            </Link>
          </motion.div>
          <motion.div whileHover={{ x: 4 }} transition={{ type: "spring", stiffness: 300, damping: 20 }}>
            <Link
              href="/settings"
              className="flex items-center gap-4 px-3 py-3 text-xl rounded-full hover:bg-white/10 transition-colors text-foreground"
              aria-label="設定"
            >
              <Settings size={26} aria-hidden="true" />
              <span className="font-medium">設定</span>
            </Link>
          </motion.div>
        </nav>

        <div className="space-y-3 mt-4">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => user ? window.dispatchEvent(new CustomEvent("lailala:openCompose")) : setShowLogin(true)}
            className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full font-bold text-lg shadow-lg hover:bg-primary-hover transition-colors"
          >
            <PenSquare size={22} />
            投稿する
          </motion.button>

          {bgmMounted && (
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={toggleBgm}
              className="w-full flex items-center justify-center gap-2 py-2 border border-border rounded-full font-medium text-sm hover:bg-white/5 transition-colors"
            >
              <Music size={16} className={bgmEnabled ? "text-primary" : "text-muted"} />
              {bgmEnabled ? "BGM ON" : "BGM OFF"}
            </motion.button>
          )}
        </div>

        {mounted && user && (
          <div className="mt-4 relative" ref={menuRef}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setShowAccountMenu(!showAccountMenu)}
              className="flex items-center gap-3 px-3 py-3 rounded-full hover:bg-white/10 transition-colors w-full"
            >
              {user.image ? (
                <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover" />
              ) : (
                <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                  <User size={20} className="text-muted" />
                </div>
              )}
              <div className="flex-1 text-left min-w-0">
                <p className="font-bold text-sm truncate">{user.name}</p>
                <p className="text-muted text-xs truncate">{user.email}</p>
              </div>
              <MoreHorizontal size={18} className="text-muted" />
            </motion.button>

            <AnimatePresence>
              {showAccountMenu && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95, y: 4 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95, y: 4 }}
                  transition={{ duration: 0.15 }}
                  className="absolute bottom-full left-0 w-full mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden"
                >
                  <button
                    onClick={() => { setShowLogoutConfirm(true); setShowAccountMenu(false); }}
                    className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 text-left text-[14px] text-red-500"
                  >
                    <LogOut size={16} />
                    <span>ログアウト</span>
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )}
      </aside>

      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
      <LogoutConfirmDialog
        open={showLogoutConfirm}
        onClose={() => setShowLogoutConfirm(false)}
        onConfirm={() => {
          setShowLogoutConfirm(false);
          window.location.href = "/api/auth/signout";
        }}
      />
    </>
  );
}
