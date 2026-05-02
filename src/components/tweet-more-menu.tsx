"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MoreHorizontal, ListPlus, Ban, VolumeX, Loader2, Pencil, Trash2, MessageCircle } from "lucide-react";
import { useAuth } from "./auth-provider";
import { LoginPopup } from "./login-popup";
import { ConfirmDialog } from "./confirm-dialog";

interface TweetMoreMenuProps {
  commentId: string;
  videoId: string;
  authorName: string;
  authorThumb?: string;
  content: string;
  likeCount: string;
  replyCount: string;
  publishedTime: string;
  authorChannelId?: string | null;
  onListChange?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  isOwner?: boolean;
}

export function TweetMoreMenu({
  commentId,
  videoId,
  authorName,
  authorThumb,
  content,
  likeCount,
  replyCount,
  publishedTime,
  authorChannelId,
  onListChange,
  onEdit,
  onDelete,
  isOwner,
}: TweetMoreMenuProps) {
  const { user } = useAuth();
  const [open, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [lists, setLists] = useState<{ id: string; name: string }[]>([]);
  const [showListMenu, setShowListMenu] = useState(false);
  const [loadingLists, setLoadingLists] = useState(false);
  const [showBlockConfirm, setShowBlockConfirm] = useState(false);
  const [showMuteConfirm, setShowMuteConfirm] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
        setShowListMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const loadLists = async () => {
    if (!user) return;
    setLoadingLists(true);
    try {
      const res = await fetch("/api/lists");
      const data = await res.json();
      setLists(data.lists || []);
    } catch (e) { console.error(e); }
    setLoadingLists(false);
  };

  const addToList = async (listId: string) => {
    try {
      await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          listId,
          commentId,
          videoId,
          authorName,
          authorThumb,
          content,
          likeCount,
          replyCount,
          publishedTime,
        }),
      });
      setShowListMenu(false);
      setOpen(false);
      onListChange?.();
    } catch (e) { console.error(e); }
  };

  const removeFromList = async (listId: string) => {
    try {
      await fetch(`/api/lists?listId=${listId}&commentId=${commentId}`, { method: "DELETE" });
      setShowListMenu(false);
      setOpen(false);
      onListChange?.();
    } catch (e) { console.error(e); }
  };

  const handleBlock = async () => {
    if (!user) return;
    try {
      await fetch("/api/blocked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId: authorChannelId, channelName: authorName }),
      });
      setShowBlockConfirm(false);
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const handleMute = async () => {
    if (!user) return;
    try {
      await fetch("/api/muted", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId: authorChannelId, channelName: authorName }),
      });
      setShowMuteConfirm(false);
      setOpen(false);
    } catch (e) { console.error(e); }
  };

  const handleOpen = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!user) {
      setShowLogin(true);
      return;
    }
    setOpen(!open);
    if (!open) {
      loadLists();
    }
  };

  return (
    <>
      <div className="relative" ref={ref}>
        <motion.button
          onClick={handleOpen}
          whileTap={{ scale: 0.85 }}
          className="p-2 rounded-full hover:bg-white/10 transition-colors text-muted"
          title="もっと見る"
        >
          <MoreHorizontal size={18} />
        </motion.button>

        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: -4 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: -4 }}
              transition={{ duration: 0.15 }}
              className="absolute top-full right-0 mt-1 bg-card border border-border rounded-xl shadow-lg overflow-hidden w-56 z-20"
            >
              {!showListMenu ? (
                <>
                  {isOwner && (
                    <>
                      <motion.button
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => { e.stopPropagation(); onEdit?.(); setOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px]"
                      >
                        <Pencil size={16} className="text-muted" />
                        <span>編集</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => { e.stopPropagation(); onDelete?.(); setOpen(false); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] text-red-500"
                      >
                        <Trash2 size={16} />
                        <span>削除</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => {
                          e.stopPropagation();
                          window.dispatchEvent(new CustomEvent("lailala:openComposeThread", {
                            detail: { parentCommentId: commentId, content },
                          }));
                          setOpen(false);
                        }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px]"
                      >
                        <MessageCircle size={16} className="text-muted" />
                        <span>続きを投稿</span>
                      </motion.button>
                      <div className="border-b border-border" />
                    </>
                  )}
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    onClick={(e) => { e.stopPropagation(); setShowListMenu(true); }}
                    className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px]"
                  >
                    <ListPlus size={16} className="text-muted" />
                    <span>リストに追加・削除</span>
                  </motion.button>
                  {authorChannelId && !isOwner && (
                    <>
                      <motion.button
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => { e.stopPropagation(); setShowBlockConfirm(true); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px] text-red-500"
                      >
                        <Ban size={16} />
                        <span>ブロック</span>
                      </motion.button>
                      <motion.button
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => { e.stopPropagation(); setShowMuteConfirm(true); }}
                        className="flex items-center gap-3 w-full px-4 py-3 text-left text-[14px]"
                      >
                        <VolumeX size={16} className="text-muted" />
                        <span>ミュート</span>
                      </motion.button>
                    </>
                  )}
                </>
              ) : (
                <div className="max-h-64 overflow-y-auto">
                  <motion.button
                    whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                    onClick={(e) => { e.stopPropagation(); setShowListMenu(false); }}
                    className="flex items-center gap-3 w-full px-4 py-2 text-left text-[13px] text-muted border-b border-border"
                  >
                    ← 戻る
                  </motion.button>
                  {loadingLists ? (
                    <div className="flex justify-center py-4">
                      <Loader2 size={16} className="animate-spin text-muted" />
                    </div>
                  ) : lists.length === 0 ? (
                    <div className="px-4 py-3 text-[13px] text-muted">リストがありません</div>
                  ) : (
                    lists.map((list) => (
                      <motion.button
                        key={list.id}
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        onClick={(e) => { e.stopPropagation(); addToList(list.id); }}
                        className="flex items-center gap-3 w-full px-4 py-2 text-left text-[14px]"
                      >
                        <ListPlus size={14} className="text-muted" />
                        <span className="truncate">{list.name} に追加</span>
                      </motion.button>
                    ))
                  )}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />

      <ConfirmDialog
        open={showBlockConfirm}
        title="ブロックしますか？"
        message={`${authorName} をブロックします。今後、このユーザーのコメントが非表示になり、YouTube側でもブロックが試行されます。`}
        confirmLabel="ブロック"
        confirmVariant="danger"
        onConfirm={handleBlock}
        onCancel={() => setShowBlockConfirm(false)}
      />

      <ConfirmDialog
        open={showMuteConfirm}
        title="ミュートしますか？"
        message={`${authorName} をミュートします。今後、このユーザーのコメントが非表示になります。`}
        confirmLabel="ミュート"
        onConfirm={handleMute}
        onCancel={() => setShowMuteConfirm(false)}
      />
    </>
  );
}
