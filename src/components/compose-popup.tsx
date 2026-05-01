"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { useAuth } from "./auth-provider";
import { Smile, Calendar, User, Clock, X, FileText, Trash2, Loader2 } from "lucide-react";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });

interface ScheduledPost {
  id: string;
  videoId: string;
  text: string;
  scheduledAt: string;
}

interface Draft {
  id: string;
  text: string;
  updatedAt: number;
}

function loadDrafts(): Draft[] {
  try {
    const raw = localStorage.getItem("lailala-drafts");
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveDrafts(list: Draft[]) {
  localStorage.setItem("lailala-drafts", JSON.stringify(list));
}

export function ComposePopup({ open, onClose, videoId, onPosted }: { open: boolean; onClose: () => void; videoId: string; onPosted?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDrafts, setShowDrafts] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduledList, setScheduledList] = useState<ScheduledPost[]>([]);
  const [drafts, setDrafts] = useState<Draft[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open) {
      setDrafts(loadDrafts());
      textareaRef.current?.focus();
    }
  }, [open]);

  // Auto-save draft
  useEffect(() => {
    if (!text.trim()) return;
    const timer = setTimeout(() => {
      const all = loadDrafts();
      if (activeDraftId) {
        const updated = all.map((d) => (d.id === activeDraftId ? { ...d, text, updatedAt: Date.now() } : d));
        saveDrafts(updated);
        setDrafts(updated);
      } else {
        const newDraft: Draft = { id: crypto.randomUUID(), text, updatedAt: Date.now() };
        const updated = [newDraft, ...all];
        saveDrafts(updated);
        setDrafts(updated);
        setActiveDraftId(newDraft.id);
      }
    }, 2000);
    return () => clearTimeout(timer);
  }, [text, activeDraftId]);

  const loadScheduled = async () => {
    try {
      const res = await fetch(`/api/scheduled-posts?videoId=${videoId}`);
      const data = await res.json();
      if (data.posts) setScheduledList(data.posts);
    } catch {}
  };

  useEffect(() => {
    if (open && user) loadScheduled();
  }, [open, user, videoId]);

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
      setActiveDraftId(null);
      // Remove this draft from storage
      if (activeDraftId) {
        const all = loadDrafts().filter((d) => d.id !== activeDraftId);
        saveDrafts(all);
        setDrafts(all);
      }
      onPosted?.();
      onClose();
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
        setActiveDraftId(null);
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

  const loadDraft = (draft: Draft) => {
    setText(draft.text);
    setActiveDraftId(draft.id);
    setShowDrafts(false);
    textareaRef.current?.focus();
  };

  const deleteDraft = (id: string) => {
    const updated = loadDrafts().filter((d) => d.id !== id);
    saveDrafts(updated);
    setDrafts(updated);
    if (activeDraftId === id) {
      setText("");
      setActiveDraftId(null);
    }
  };

  const newDraft = () => {
    setText("");
    setActiveDraftId(null);
    textareaRef.current?.focus();
  };

  if (!open) return null;
  if (!user) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm" onClick={onClose}>
        <div className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl text-center" onClick={(e) => e.stopPropagation()}>
          <p className="text-muted">コメントするにはログインしてください</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20 md:pt-24" onClick={onClose}>
      <div className="bg-card border border-border rounded-2xl w-full max-w-xl mx-4 shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button onClick={onClose} className="p-2 rounded-full hover:bg-white/10 text-muted">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDrafts(!showDrafts)}
              className={`text-[14px] font-bold px-3 py-1.5 rounded-full transition-colors ${showDrafts ? "bg-primary text-white" : "text-primary hover:bg-primary/10"}`}
            >
              下書き ({drafts.length})
            </button>
          </div>
        </div>

        <div className="flex">
          {/* Main composer */}
          <div className={`flex-1 transition-all ${showDrafts ? "hidden md:block md:w-2/3" : "w-full"}`}>
            <div className="p-4">
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
                    ref={textareaRef}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="コメントを投稿"
                    rows={4}
                    className="w-full bg-transparent text-xl placeholder-muted outline-none resize-none"
                  />

                  {scheduledList.length > 0 && (
                    <div className="mb-2 space-y-1">
                      {scheduledList.map((s) => (
                        <div key={s.id} className="flex items-center justify-between bg-background border border-border rounded-lg px-3 py-2 text-[13px]">
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
                    <div className="flex gap-1 text-primary">
                      <div className="relative" ref={emojiRef}>
                        <button onClick={() => setShowEmoji(!showEmoji)} className="p-2 rounded-full hover:bg-primary/10">
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
                        <button onClick={() => setShowSchedule(!showSchedule)} className="p-2 rounded-full hover:bg-primary/10">
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
                              ※サーバーで自動投稿されます
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
                      className="px-5 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                    >
                      {posting ? <Loader2 size={18} className="animate-spin" /> : "投稿"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Drafts sidebar */}
          {showDrafts && (
            <div className="w-full md:w-1/3 border-l border-border bg-background/50">
              <div className="p-3 border-b border-border flex items-center justify-between">
                <span className="text-sm font-bold">下書き</span>
                <button onClick={newDraft} className="text-[13px] text-primary hover:underline">
                  新規作成
                </button>
              </div>
              <div className="max-h-[300px] overflow-y-auto">
                {drafts.length === 0 ? (
                  <div className="p-6 text-center text-muted text-[13px]">
                    <FileText size={24} className="mx-auto mb-2 opacity-50" />
                    <p>下書きがありません</p>
                  </div>
                ) : (
                  drafts.map((draft) => (
                    <div
                      key={draft.id}
                      className={`p-3 border-b border-border cursor-pointer hover:bg-white/5 transition-colors ${activeDraftId === draft.id ? "bg-white/5" : ""}`}
                    >
                      <div onClick={() => loadDraft(draft)}>
                        <p className="text-[14px] whitespace-pre-wrap line-clamp-2 leading-snug">{draft.text || "（無題）"}</p>
                        <p className="text-[12px] text-muted mt-1">
                          {new Date(draft.updatedAt).toLocaleString("ja-JP", { month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" })}
                        </p>
                      </div>
                      <div className="flex items-center justify-end mt-1">
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteDraft(draft.id); }}
                          className="p-1.5 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
