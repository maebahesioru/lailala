"use client";

import { Home, Search, Flame, List, User, Music } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "./auth-provider";
import { useState } from "react";
import { LoginPopup } from "./login-popup";
import { useBgm } from "./bgm-provider";

export function MobileNav() {
  const pathname = usePathname();
  const { user } = useAuth();
  const { enabled: bgmEnabled, mounted: bgmMounted, toggle: toggleBgm } = useBgm();
  const [showLogin, setShowLogin] = useState(false);

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
    { icon: Flame, label: "トレンド", href: "/trending", protected: false },
    { icon: List, label: "リスト", href: "/lists", protected: true },
    { icon: User, label: "プロフィール", href: "/profile", protected: true },
  ];

  return (
    <>
      <nav
        className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-background/90 backdrop-blur-md border-t border-border"
        aria-label="モバイルナビゲーション"
      >
        <div className="flex items-center justify-around h-14 max-w-lg mx-auto">
          {navItems.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + "/");
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={item.onClick ? item.onClick : item.protected ? handleProtectedClick : undefined}
                className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full transition-colors ${
                  isActive ? "text-primary" : "text-muted"
                }`}
                aria-current={isActive ? "page" : undefined}
              >
                <item.icon size={22} strokeWidth={2} />
                <span className="text-[10px] font-medium">{item.label}</span>
              </Link>
            );
          })}
          <button
            onClick={toggleBgm}
            className={`flex flex-col items-center justify-center gap-0.5 w-14 h-full transition-colors ${
              bgmMounted && bgmEnabled ? "text-primary" : "text-muted"
            }`}
            aria-label="BGM"
            suppressHydrationWarning
          >
            <Music size={22} strokeWidth={2} />
            <span className="text-[10px] font-medium">BGM {bgmMounted && bgmEnabled ? "ON" : "OFF"}</span>
          </button>
        </div>
      </nav>
      {/* Safe area padding for bottom nav */}
      <div className="md:hidden h-14" />
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </>
  );
}
