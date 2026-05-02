"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "./auth-provider";
import { Smile, Calendar, User, Clock, X, Loader2 } from "lucide-react";
import { ConfirmDialog } from "./confirm-dialog";
import { DraftsPopup } from "./drafts-popup";
import { MentionAutocomplete } from "./mention-autocomplete";
import dynamic from "next/dynamic";

const EmojiPicker = dynamic(() => import("emoji-picker-react"), { ssr: false });
import { Theme as EmojiTheme, EmojiStyle } from "emoji-picker-react";

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

export function ComposePopup({ open, onClose, videoId, initialThreadParentId, initialThreadContent, replyParentId: initialReplyParentId, replyAuthorName: initialReplyAuthorName, onPosted }: { open: boolean; onClose: () => void; videoId: string; initialThreadParentId?: string | null; initialThreadContent?: string | null; replyParentId?: string | null; replyAuthorName?: string | null; onPosted?: () => void }) {
  const { user } = useAuth();
  const [text, setText] = useState("");
  const [posting, setPosting] = useState(false);
  const [showEmoji, setShowEmoji] = useState(false);
  const [showSchedule, setShowSchedule] = useState(false);
  const [showDraftsPopup, setShowDraftsPopup] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("");
  const [scheduledList, setScheduledList] = useState<ScheduledPost[]>([]);
  const [activeDraftId, setActiveDraftId] = useState<string | null>(null);
  const [showDraftConfirm, setShowDraftConfirm] = useState(false);
  const [pendingClose, setPendingClose] = useState(false);
  const [threadParentId, setThreadParentId] = useState<string | null>(null);
  const [replyParentId, setReplyParentId] = useState<string | null>(null);
  const [replyAuthorName, setReplyAuthorName] = useState<string | null>(null);
  const [lastOwnComment, setLastOwnComment] = useState<{ commentId: string; content: string } | null>(null);
  const emojiRef = useRef<HTMLDivElement>(null);
  const scheduleRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  function generateId() {
    try {
      return crypto.randomUUID();
    } catch {
      return Math.random().toString(36).slice(2) + Date.now().toString(36);
    }
  }

  useEffect(() => {
    if (open) {
      textareaRef.current?.focus();
    }
  }, [open]);

  // Auto-resize textarea based on content
  useEffect(() => {
    const el = textareaRef.current;
    if (el) {
      el.style.height = "auto";
      el.style.height = el.scrollHeight + "px";
    }
  }, [text]);

  // Auto-save draft
  useEffect(() => {
    if (!text.trim()) return;
    const timer = setTimeout(() => {
      const all = loadDrafts();
      if (activeDraftId) {
        const updated = all.map((d) => (d.id === activeDraftId ? { ...d, text, updatedAt: Date.now() } : d));
        saveDrafts(updated);
      } else {
        const newDraft: Draft = { id: generateId(), text, updatedAt: Date.now() };
        const updated = [newDraft, ...all];
        saveDrafts(updated);
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
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    if (open && user) {
      loadScheduled();
      if (initialReplyParentId) {
        setReplyParentId(initialReplyParentId);
        setReplyAuthorName(initialReplyAuthorName || null);
      }
      if (initialThreadParentId) {
        setThreadParentId(initialThreadParentId);
        setLastOwnComment({
          commentId: initialThreadParentId,
          content: initialThreadContent || "",
        });
      } else if (user.channelId) {
        fetch(`/api/profile/comments?channelId=${encodeURIComponent(user.channelId)}&type=comment&limit=1`)
          .then((r) => r.json())
          .then((data) => {
            if (data.comments?.length > 0) {
              setLastOwnComment({
                commentId: data.comments[0].commentId,
                content: data.comments[0].content,
              });
            }
          })
          .catch(() => {});
      }
    }
  }, [open, user, videoId, initialThreadParentId, initialThreadContent, initialReplyParentId, initialReplyAuthorName]);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (emojiRef.current && !emojiRef.current.contains(e.target as Node)) {
        setShowEmoji(false);
      }
      if (scheduleRef.current && !scheduleRef.current.contains(e.target as Node)) {
        setShowSchedule(false);
      }
      if (timestampRef.current && !timestampRef.current.contains(e.target as Node)) {
        setShowTimestamp(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = async () => {
    if (!text.trim() || !user) return;
    setPosting(true);
    try {
      if (replyParentId) {
        await fetch("/api/comments/reply", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId, parentCommentId: replyParentId, text: text.trim() }),
        });
      } else {
        const postText = threadParentId ? `${text.trim()}\n(続き)` : text.trim();
        await fetch("/api/comments", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ videoId, text: postText }),
        });
      }
      setText("");
      setActiveDraftId(null);
      setThreadParentId(null);
      setReplyParentId(null);
      setReplyAuthorName(null);
      // Remove this draft from storage
      if (activeDraftId) {
        const all = loadDrafts().filter((d) => d.id !== activeDraftId);
        saveDrafts(all);
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
    } catch (e) { console.error(e); }
  };

  const loadDraft = (draft: Draft) => {
    setText(draft.text);
    setActiveDraftId(draft.id);
    textareaRef.current?.focus();
  };

  const newDraft = () => {
    const all = loadDrafts();
    const emptyDraft: Draft = { id: generateId(), text: "", updatedAt: Date.now() };
    saveDrafts([emptyDraft, ...all]);
    setText("");
    setActiveDraftId(emptyDraft.id);
    textareaRef.current?.focus();
  };

  const handleClose = () => {
    if (text.trim() && !activeDraftId) {
      setShowDraftConfirm(true);
      setPendingClose(true);
      return;
    }
    onClose();
  };

  const confirmSaveDraft = () => {
    const all = loadDrafts();
    const draft: Draft = { id: generateId(), text, updatedAt: Date.now() };
    saveDrafts([draft, ...all]);
    setShowDraftConfirm(false);
    setPendingClose(false);
    setActiveDraftId(draft.id);
    onClose();
  };

  const discardDraft = () => {
    setShowDraftConfirm(false);
    setPendingClose(false);
    onClose();
  };

  if (!open) return null;
  if (!user) {
    return (
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="bg-card border border-border rounded-2xl p-8 w-full max-w-sm mx-4 shadow-2xl text-center"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
          <p className="text-muted">コメントするにはログインしてください</p>
        </motion.div>
      </motion.div>
    );
  }

  return (
    <>
      <motion.div
        className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 backdrop-blur-sm pt-20 md:pt-24"
        onClick={handleClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className="bg-card border border-border rounded-2xl w-full max-w-xl mx-4 shadow-2xl overflow-visible"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          transition={{ type: "spring", stiffness: 400, damping: 25 }}
        >
        {/* Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <button onClick={handleClose} className="p-2 rounded-full hover:bg-white/10 text-muted">
            <X size={20} />
          </button>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowDraftsPopup(true)}
              className="text-[14px] font-bold px-3 py-1.5 rounded-full transition-colors text-primary hover:bg-primary/10"
            >
              下書き
            </button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex gap-3">
            {user.image ? (
              <img src={user.image} alt={user.name || "User"} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
            ) : (
              <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                <User size={20} className="text-muted" />
              </div>
            )}
            <div className="flex-1">
              {/* Reply mode indicator */}
              {replyParentId && replyAuthorName && (
                <div className="mb-3 p-3 bg-background border border-border rounded-xl">
                  <div className="flex items-center justify-between">
                    <span className="text-[13px] font-bold text-muted">返信先: {replyAuthorName}</span>
                    <button
                      onClick={() => { setReplyParentId(null); setReplyAuthorName(null); }}
                      className="text-[13px] text-muted hover:text-foreground px-2 py-1 rounded-full hover:bg-white/10"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}
              {/* Thread mode indicator */}
              {lastOwnComment && !replyParentId && (
                <div className="mb-3 p-3 bg-background border border-border rounded-xl">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[13px] font-bold text-muted">前のコメント</span>
                    <button
                      onClick={() => {
                        setThreadParentId(threadParentId ? null : lastOwnComment.commentId);
                      }}
                      className={`text-[13px] font-bold px-2 py-1 rounded-full transition-colors ${
                        threadParentId ? "bg-primary text-white" : "text-primary hover:bg-primary/10"
                      }`}
                    >
                      {threadParentId ? "スレッドON" : "続きを投稿"}
                    </button>
                  </div>
                  {threadParentId && (
                    <p className="text-[14px] text-muted line-clamp-2">{lastOwnComment.content}</p>
                  )}
                </div>
              )}
              <div className="relative">
                <textarea
                  ref={textareaRef}
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder={replyParentId ? `${replyAuthorName}さんへ返信` : threadParentId ? "続きのコメントを投稿" : "コメントを投稿"}
                  rows={1}
                  className="w-full bg-transparent text-xl placeholder-muted outline-none resize-none min-h-[100px]"
                />
                <MentionAutocomplete
                  textareaRef={textareaRef}
                  text={text}
                  onSelect={(newText) => setText(newText)}
                />
              </div>

              {/* Character count */}
              {text.length > 0 && (
                <div className="flex justify-end mt-1">
                  <span
                    className={`text-[13px] font-medium ${
                      text.length > 5000
                        ? "text-red-500"
                        : text.length > 4500
                        ? "text-yellow-500"
                        : "text-muted"
                    }`}
                  >
                    {text.length} / 5000
                  </span>
                </div>
              )}

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
                          theme={EmojiTheme.DARK}
                          emojiStyle={EmojiStyle.TWITTER}
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
                  disabled={posting || !text.trim() || text.length > 5000}
                  className="px-5 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  {posting ? <Loader2 size={18} className="animate-spin" /> : "投稿"}
                </button>
              </div>
            </div>
          </div>
        </div>
        </motion.div>
      </motion.div>

      <DraftsPopup
        open={showDraftsPopup}
        onClose={() => setShowDraftsPopup(false)}
        onSelect={loadDraft}
        onNewDraft={newDraft}
        activeDraftId={activeDraftId}
      />

      <ConfirmDialog
        open={showDraftConfirm}
        title="下書きを保存しますか？"
        message="入力中のテキストがあります。下書きとして保存しますか？"
        confirmLabel="保存する"
        onConfirm={confirmSaveDraft}
        onCancel={discardDraft}
      />
    </>
  );
}
