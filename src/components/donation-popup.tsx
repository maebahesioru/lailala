"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, X, ExternalLink, EyeOff } from "lucide-react";

const STORAGE_KEY = "lailala-hide-donation";
const HIDE_DURATION_MS = 7 * 24 * 60 * 60 * 1000; // 1週間

function isHidden(): boolean {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (!raw) return false;
  const until = parseInt(raw, 10);
  if (isNaN(until)) return false;
  return Date.now() < until;
}

export function DonationPopup() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!isHidden()) {
      setShow(true);
    }
  }, []);

  const hideForAWeek = () => {
    localStorage.setItem(STORAGE_KEY, String(Date.now() + HIDE_DURATION_MS));
    setShow(false);
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4"
          onClick={() => setShow(false)}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 20 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-card border border-border rounded-2xl p-6 w-full max-w-sm shadow-2xl"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Heart size={20} className="text-[#f91880]" />
                <h3 className="text-lg font-bold">ライララを支援する</h3>
              </div>
              <button
                onClick={() => setShow(false)}
                className="p-1.5 rounded-full hover:bg-white/10 text-muted transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            <p className="text-[15px] text-muted leading-relaxed mb-6">
              ライララ(仮)は個人で運営しているサービスです。
              サーバー維持費や開発の励みになるので、
              もしよろしければ支援をお願いします。
            </p>

            <a
              href="https://ofuse.me/maebahesioru"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setShow(false)}
              className="w-full flex items-center justify-center gap-2 py-3 bg-[#f91880] text-white rounded-full font-bold text-[15px] hover:bg-[#f91880]/90 transition-colors shadow-lg"
            >
              <Heart size={18} fill="currentColor" />
              OFUSEで支援する
              <ExternalLink size={16} />
            </a>

            <div className="flex flex-col gap-2 mt-3">
              <button
                onClick={() => setShow(false)}
                className="w-full py-2 text-[13px] text-muted hover:text-foreground transition-colors"
              >
                閉じる
              </button>
              <button
                onClick={hideForAWeek}
                className="w-full flex items-center justify-center gap-1.5 py-2 text-[13px] text-muted hover:text-red-400 transition-colors"
              >
                <EyeOff size={14} />
                1週間表示しない
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
