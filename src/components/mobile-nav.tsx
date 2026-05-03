"use client";

import { Home, Search, List, User, Music, Bell, Bookmark, Settings, X, PenSquare, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";
import { useState, useEffect, useRef } from "react";
import { LoginPopup } from "./login-popup";
import { useBgm } from "./bgm-provider";
import { useNotifications } from "./use-notifications";

export function MobileNav() {
  const pathname = usePathname();
  const { user, switchAccount } = useAuth();
  const { enabled: bgmEnabled, mounted: bgmMounted, toggle: toggleBgm } = useBgm();
  const { unreadCount } = useNotifications();
  const [showLogin, setShowLogin] = useState(false);
  const [open, setOpen] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);

  const handleProtectedClick = (e: React.MouseEvent) => {
    if (!user) {
      e.preventDefault();
      setShowLogin(true);
    }
  };

  const handleHomeClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const target = pathname === "/latest/" ? "/latest/" : "/popular/";
    if (pathname === target) {
      window.location.reload();
    } else {
      window.location.href = target;
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

  useEffect(() => {
    const onTouchStart = (e: TouchEvent) => {
      touchStartX.current = e.touches[0].clientX;
      touchStartY.current = e.touches[0].clientY;
    };

    const onTouchMove = (e: TouchEvent) => {
      const x = e.touches[0].clientX;
      const y = e.touches[0].clientY;
      const dx = x - touchStartX.current;
      const dy = y - touchStartY.current;

      // Open: swipe right from left edge (within 30px)
      if (!open && touchStartX.current < 30 && dx > 50 && Math.abs(dy) < 80) {
        setOpen(true);
      }
      // Close: swipe left on drawer
      if (open && touchStartX.current < 280 && dx < -50 && Math.abs(dy) < 80) {
        setOpen(false);
      }
    };

    document.addEventListener("touchstart", onTouchStart, { passive: true });
    document.addEventListener("touchmove", onTouchMove, { passive: true });
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchmove", onTouchMove);
    };
  }, [open]);

  return (
    <>
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
              <Link href="/" onClick={(e) => { handleHomeClick(e); setOpen(false); }} className="text-xl font-bold">
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
                      {item.badge && item.badge > 0 && (
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
            <div className="p-4 border-t border-border space-y-3">
              {user ? (
                <>
                  {user.accounts && user.accounts.length > 1 && (
                    <div className="space-y-1">
                      <p className="text-[11px] font-bold text-muted uppercase tracking-wider px-1">アカウント切替</p>
                      {user.accounts.map((account) => (
                        <button
                          key={account.channelId}
                          onClick={() => {
                            if (account.channelId !== user.selectedAccountId) {
                              switchAccount(account.channelId || "");
                            }
                            setOpen(false);
                          }}
                          className={`flex items-center gap-3 w-full px-3 py-2 rounded-full transition-colors ${
                            account.channelId === user.selectedAccountId ? "bg-primary/10 text-primary font-bold" : "hover:bg-white/5 text-foreground"
                          }`}
                        >
                          {account.image ? (
                            <img src={account.image} alt="" className="w-6 h-6 rounded-full object-cover" />
                          ) : (
                            <div className="w-6 h-6 rounded-full bg-border flex items-center justify-center">
                              <User size={14} className="text-muted" />
                            </div>
                          )}
                          <span className="text-[13px] truncate flex-1 text-left">{account.name}</span>
                          {account.channelId === user.selectedAccountId && <span className="text-[10px] text-primary">使用中</span>}
                        </button>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => { setOpen(false); setShowLogin(true); }}
                    className="flex items-center gap-3 w-full px-3 py-2 rounded-full hover:bg-white/5 text-primary text-[13px]"
                  >
                    <User size={18} />
                    別アカウントを追加
                  </button>
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
                </>
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
