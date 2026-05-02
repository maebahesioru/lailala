"use client";

import { Home, Search, List, User, Music, Bell, Bookmark, Settings, Menu, X, PenSquare, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";
import { useState, useEffect } from "react";
import { LoginPopup } from "./login-popup";
import { useBgm } from "./bgm-provider";
import { useNotifications } from "./use-notifications";

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { enabled: bgmEnabled, mounted: bgmMounted, toggle: toggleBgm } = useBgm();
  const { unreadCount } = useNotifications();
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    if (pathname === "/") {
      e.preventDefault();
      window.dispatchEvent(new CustomEvent("lailala:scrollToTop"));
    }
  };

  const navItems = [
    { icon: Home, label: "ホーム", href: "/", protected: false, onClick: handleHomeClick },
    { icon: Search, label: "検索", href: "/search", protected: false },
    { icon: Bell, label: "通知", href: "/notifications", protected: true, badge: unreadCount },
    { icon: Bookmark, label: "ブックマーク", href: "/bookmarks", protected: true },
    { icon: List, label: "リスト", href: "/lists", protected: true },
    { icon: User, label: "プロフィール", href: "/profile", protected: true },
    { icon: Settings, label: "設定", href: "/settings", protected: false },
  ];

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <>
      {/* Mobile Header */}
      <header className="md:hidden fixed top-0 left-0 right-0 z-40 bg-background/90 backdrop-blur-md border-b border-border">
        <div className="flex items-center h-12 px-3">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setOpen(true)}
            className="p-2 -ml-2 rounded-full hover:bg-white/10"
            aria-label="メニュー"
          >
            <Menu size={22} />
          </motion.button>
          <Link href="/" className="ml-2 text-lg font-bold" onClick={() => setOpen(false)}>
            ライララ(仮)
          </Link>
        </div>
      </header>
      {/* Spacer for fixed header */}
      <div className="md:hidden h-12" />

      {/* Overlay */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="md:hidden fixed inset-0 z-[60] bg-black/60 backdrop-blur-sm"
            onClick={() => setOpen(false)}
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {open && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="md:hidden fixed top-0 left-0 bottom-0 z-[70] w-[280px] bg-background border-r border-border flex flex-col"
          >
            <div className="flex items-center justify-between p-4">
              <Link href="/" onClick={() => setOpen(false)} className="text-xl font-bold">
                ライララ(仮)
              </Link>
              <motion.button whileTap={{ scale: 0.9 }} onClick={() => setOpen(false)} className="p-2 rounded-full hover:bg-white/10">
                <X size={20} />
              </motion.button>
            </div>

            <nav className="flex-1 px-2 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
                return (
                  <Link
                    key={item.label}
                    href={item.href}
                    onClick={item.onClick ? item.onClick : item.protected ? handleProtectedClick : undefined}
                    className={`flex items-center gap-3 px-3 py-3 rounded-full transition-colors ${isActive ? "text-primary font-bold" : "text-foreground hover:bg-white/10"}`}
                  >
                    <div className="relative">
                      <item.icon size={22} />
                      {item.badge > 0 && (
                        <span className="absolute -top-1.5 -right-2 bg-primary text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] flex items-center justify-center px-0.5">
                          {item.badge > 99 ? "99+" : item.badge}
                        </span>
                      )}
                    </div>
                    <span className="text-[15px]">{item.label}</span>
                  </Link>
                );
              })}
              {bgmMounted && (
                <button
                  onClick={toggleBgm}
                  className="flex items-center gap-3 px-3 py-3 rounded-full transition-colors w-full text-left hover:bg-white/10"
                >
                  <Music size={22} className={bgmEnabled ? "text-primary" : "text-muted"} />
                  <span className="text-[15px]">{bgmEnabled ? "BGM ON" : "BGM OFF"}</span>
                </button>
              )}
              <button
                onClick={() => {
                  setOpen(false);
                  user ? window.dispatchEvent(new CustomEvent("lailala:openCompose")) : setShowLogin(true);
                }}
                className="w-full flex items-center justify-center gap-2 py-3 bg-primary text-white rounded-full font-bold shadow-lg mt-2"
              >
                <PenSquare size={18} />
                投稿する
              </button>
            </nav>

            {/* Account */}
            <div className="p-4 border-t border-border">
              {user ? (
                <div className="flex items-center gap-3">
                  {user.image ? (
                    <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-sm truncate">{user.name}</p>
                    <p className="text-muted text-xs truncate">{user.email}</p>
                  </div>
                  <button
                    onClick={() => { setOpen(false); window.location.href = "/api/auth/signout"; }}
                    className="p-2 rounded-full hover:bg-white/10 text-muted"
                    title="ログアウト"
                  >
                    <LogOut size={18} />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => { setOpen(false); setShowLogin(true); }}
                  className="flex items-center gap-3 w-full"
                >
                  <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                    <User size={20} className="text-muted" />
                  </div>
                  <div className="flex-1 text-left min-w-0">
                    <p className="font-bold text-sm truncate">ゲスト</p>
                    <p className="text-muted text-xs truncate">ログインして投稿</p>
                  </div>
                </button>
              )}
            </div>
          </motion.aside>
        )}
      </AnimatePresence>

      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
