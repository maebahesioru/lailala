"use client";

import { useState } from "react";
import { useAuth } from "./auth-provider";
import { Image, Smile, Calendar } from "lucide-react";

export function Composer({ videoId, onPosted }: { videoId: string; onPosted?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;
    setPosting(true);
    try {
      await fetch("/api/comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, text: text.trim() }),
      });
      setText("");
      onPosted?.();
    } catch {
      // ignore
    } finally {
      setPosting(false);
    }
  };

  if (!user) {
    return (
      <div className="px-4 py-6 border-b border-[#2f3336] text-center text-[#71767b]">
        コメントするにはログインしてください
      </div>
    );
  }

  return (
    <div className="px-4 py-3 border-b border-[#2f3336]">
      <div className="flex gap-3">
        <img
          src={user.image || "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='15' r='8' fill='%2371767b'/%3E%3Cellipse cx='20' cy='38' rx='14' ry='10' fill='%2371767b'/%3E%3C/svg%3E"}
          alt={user.name || "User"}
          className="w-10 h-10 rounded-full object-cover shrink-0"
        />
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="コメントを投稿"
            rows={2}
            className="w-full bg-transparent text-xl placeholder-[#71767b] outline-none resize-none"
          />
          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2 text-[#1d9bf0]">
              <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10">
                <Image size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10">
                <Smile size={18} />
              </button>
              <button className="p-2 rounded-full hover:bg-[#1d9bf0]/10">
                <Calendar size={18} />
              </button>
            </div>
            <button
              onClick={handleSubmit}
              disabled={posting || !text.trim()}
              className="px-5 py-2 bg-[#1d9bf0] text-white rounded-full font-bold hover:bg-[#1a8cd8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {posting ? "投稿中..." : "投稿"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
