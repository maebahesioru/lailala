"use client";

import { useState, useRef, useEffect } from "react";
import { Share, Link2, MoreHorizontal } from "lucide-react";

interface ShareMenuProps {
  url: string;
  text: string;
}

export function ShareMenu({ url, text }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      setOpen(false);
    } catch {}
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title: "ライララ", text, url });
      }
    } catch {}
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        className="flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"
        title="シェア"
      >
        <Share size={18} />
      </button>
      {open && (
        <div className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-56 z-50">
          <button
            onClick={handleCopy}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 text-left text-[15px]"
          >
            <Link2 size={18} className="text-muted" />
            <span>{copied ? "コピーしました" : "リンクをコピー"}</span>
          </button>
          <button
            onClick={handleNativeShare}
            className="flex items-center gap-3 w-full px-4 py-3 hover:bg-white/5 text-left text-[15px]"
          >
            <MoreHorizontal size={18} className="text-muted" />
            <span>その他の方法でシェア</span>
          </button>
        </div>
      )}
    </div>
  );
}
