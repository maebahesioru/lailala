"use client";

import { useState, useEffect, useRef } from "react";
import { useAuth } from "./auth-provider";
import { Smile, Calendar, User, Clock, X } from "lucide-react";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface ScheduledPost {
  id: string;
  videoId: string;
  text: string;
  scheduledAt: string;
}

export function Composer({ videoId, onPosted }: { videoId: string; onPosted?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduledList, setScheduledList] = useState<ScheduledPost[]>([]);
  const emojiRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);

  const loadScheduled = async () => {
    try {
      const res = await fetch(`/api/scheduled-posts?videoId=${videoId}`);
      const data = await res.json();
      if (data.posts) setScheduledList(data.posts);
    } catch {}
  };

  useEffect(() => {
    if (user) loadScheduled();
  }, [user, videoId]);

  // Poll for newly posted scheduled posts
  useEffect(() => {
    if (!user) return;
    const interval = setInterval(() => {
      loadScheduled();
    }, 30000);
    return () => clearInterval(interval);
  }, [user, videoId]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
      if (scheduleRef.current && !scheduleRef.current.contains(e.target as Node)) {
        setShowSchedule(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  const handleSchedule = async () => {
    if (!text.trim() || !scheduleDate || !scheduleTime) return;
    const scheduledAt = new Date(`${scheduleDate}T${scheduleTime}`).toISOString();
    try {
      const res = await fetch("/api/scheduled-posts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId, text: text.trim(), scheduledAt }),
      });
      if (res.ok) {
        setText("");
        setShowSchedule(false);
        setScheduleDate("");
        setScheduleTime("");
        loadScheduled();
      } else {
        const data = await res.json();
        alert(data.error || "予約に失敗しました");
      }
    } catch {
      alert("予約に失敗しました");
    }
  };

  const cancelSchedule = async (id: string) => {
    try {
      await fetch(`/api/scheduled-posts?id=${id}`, { method: "DELETE" });
      loadScheduled();
    } catch {}
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
        {user.image ? (
          <img src={user.image} alt={user.name || "User"} className="w-10 h-10 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
            <User size={20} className="text-muted" />
          </div>
        )}
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="コメントを投稿"
            rows={2}
            className="w-full bg-transparent text-xl placeholder-[#71767b] outline-none resize-none"
          />

          {scheduledList.length > 0 && (
            <div className="mb-2 space-y-1">
              {scheduledList.map((s) => (
                <div key={s.id} className="flex items-center justify-between bg-card border border-border rounded-lg px-3 py-2 text-[13px]">
                  <div className="flex items-center gap-2 text-muted min-w-0">
                    <Clock size={14} />
                    <span className="truncate">{new Date(s.scheduledAt).toLocaleString("ja-JP")}</span>
                    <span className="truncate text-foreground">{s.text}</span>
                  </div>
                  <button onClick={() => cancelSchedule(s.id)} className="p-1 rounded-full hover:bg-white/10 text-muted shrink-0">
                    <X size={14} />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center justify-between mt-2">
            <div className="flex gap-2 text-[#1d9bf0]">
              <div className="relative" ref={emojiRef}>
                <button onClick={() => setShowEmoji(!showEmoji)} className="p-2 rounded-full hover:bg-[#1d9bf0]/10">
                  <Smile size={18} />
                </button>
                {showEmoji && (
                  <div className="absolute top-full left-0 mt-2 z-20">
                    <EmojiPicker
                      onEmojiClick={(emojiData) => setText((prev) => prev + emojiData.emoji)}
                      width={320}
                      height={400}
                      previewConfig={{ showPreview: false }}
                      theme="dark"
                      emojiStyle="twitter"
                      searchPlaceholder="絵文字を検索"
                      skinTonesDisabled
                    />
                  </div>
                )}
              </div>

              <div className="relative" ref={scheduleRef}>
                <button onClick={() => setShowSchedule(!showSchedule)} className="p-2 rounded-full hover:bg-[#1d9bf0]/10">
                  <Calendar size={18} />
                </button>
                {showSchedule && (
                  <div className="absolute top-full left-0 mt-2 bg-card border border-border rounded-xl shadow-lg p-4 w-64 z-20 space-y-3">
                    <p className="text-sm font-bold">予約投稿</p>
                    <input
                      type="date"
                      value={scheduleDate}
                      onChange={(e) => setScheduleDate(e.target.value)}
                      className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border outline-none focus:ring-2 focus:ring-primary"
                    />
                    <input
                      type="time"
                      value={scheduleTime}
                      onChange={(e) => setScheduleTime(e.target.value)}
                      className="w-full bg-background text-foreground rounded-lg px-3 py-2 border border-border outline-none focus:ring-2 focus:ring-primary"
                    />
                    <p className="text-[12px] text-muted">
                      ※サーバーで自動投稿されます（ページを閉じてもOK）
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={handleSchedule}
                        disabled={!text.trim() || !scheduleDate || !scheduleTime}
                        className="flex-1 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover disabled:opacity-50 transition-colors text-sm"
                      >
                        予約
                      </button>
                      <button
                        onClick={() => setShowSchedule(false)}
                        className="flex-1 py-2 border border-border rounded-full font-bold hover:bg-white/5 transition-colors text-sm"
                      >
                        キャンセル
                      </button>
                    </div>
                  </div>
                )}
              </div>
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
