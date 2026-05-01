"use client";

import { useState } from "react";
import { X, LogIn } from "lucide-react";

interface LoginPopupProps {
  open: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export function LoginPopup({ open, onClose, onLogin }: LoginPopupProps) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
      <div className="bg-black border border-[#2f3336] rounded-2xl p-6 w-full max-w-sm mx-4 shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold">ログインが必要です</h3>
          <button onClick={onClose} className="p-1 rounded-full hover:bg-white/10 text-[#71767b]">
            <X size={20} />
          </button>
        </div>
        <p className="text-[#71767b] text-sm mb-6">
          この操作を行うにはログインが必要です。Googleアカウントでログインしてください。
        </p>
        <button
          onClick={onLogin}
          className="w-full flex items-center justify-center gap-2 py-3 bg-[#1d9bf0] text-white rounded-full font-bold hover:bg-[#1a8cd8] transition-colors"
        >
          <LogIn size={18} />
          Googleでログイン
        </button>
      </div>
    </div>
  );
}
