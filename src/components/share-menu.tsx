"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Share, Link2, MoreHorizontal, Check } from "lucide-react";

interface ShareMenuProps {
  url: string;
  text: string;
  buttonClass?: string;
  extraLinks?: { label: string; url: string }[];
}

export function ShareMenu({ url, text, buttonClass, extraLinks }: ShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [copiedLabel, setCopiedLabel] = useState("");
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

  const handleCopy = async (e: React.MouseEvent, copyUrl: string, label: string) => {
    e.stopPropagation();
    try {
      await navigator.clipboard.writeText(copyUrl);
      setCopied(true);
      setCopiedLabel(label);
      setTimeout(() => { setCopied(false); setCopiedLabel(""); }, 2000);
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const handleNativeShare = async (e: React.MouseEvent) => {
    e.stopPropagation();
    try {
      if (navigator.share) {
        await navigator.share({ title: "ライララ", text, url });
      }
    } catch (e) { console.error(e); }
    setOpen(false);
  };

  return (
    <div className="relative" ref={ref}>
      <motion.button
        onClick={(e) => { e.stopPropagation(); setOpen(!open); }}
        whileTap={{ scale: 0.85 }}
        className={buttonClass || "flex items-center gap-1.5 text-[13px] text-muted hover:text-primary transition-colors"}
        title="シェア"
      >
        <AnimatePresence mode="wait">
          <motion.span
            key={copied ? "check" : "share"}
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.5, opacity: 0 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
          >
            {copied ? <Check size={18} className="text-green-500" /> : <Share size={18} />}
          </motion.span>
        </AnimatePresence>
      </motion.button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 4 }}
            transition={{ duration: 0.15 }}
            className="absolute bottom-full right-0 mb-2 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-56 z-50"
          >
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onClick={(e) => handleCopy(e, url, "リンク")}
              className="flex items-center gap-3 w-full px-4 py-3 text-left text-[15px]"
            >
              <Link2 size={18} className="text-muted" />
              <span>{copied && copiedLabel === "リンク" ? "コピーしました" : "リンクをコピー"}</span>
            </motion.button>
            {extraLinks?.map((link) => (
              <motion.button
                key={link.url}
                whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                onClick={(e) => handleCopy(e, link.url, link.label)}
                className="flex items-center gap-3 w-full px-4 py-3 text-left text-[15px]"
              >
                <Link2 size={18} className="text-muted" />
                <span>{copied && copiedLabel === link.label ? "コピーしました" : link.label}</span>
              </motion.button>
            ))}
            <motion.button
              whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
              onClick={handleNativeShare}
              className="flex items-center gap-3 w-full px-4 py-3 text-left text-[15px]"
            >
              <MoreHorizontal size={18} className="text-muted" />
              <span>その他の方法でシェア</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
