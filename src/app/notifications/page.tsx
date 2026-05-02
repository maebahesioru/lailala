"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { Heart, MessageCircle, Bookmark, ThumbsDown, AtSign, Play, Trash2, Loader2 } from "lucide-react";
import Link from "next/link";
import { useNotifications } from "@/components/use-notifications";

interface NotificationItem {
  id: string;
  type: string;
  actorName: string;
  actorThumb: string | null;
  commentId: string | null;
  videoId: string;
  content: string | null;
  isRead: boolean;
  createdAt: string;
}

const TYPE_ICONS: Record<string, React.ReactNode> = {
  like: <Heart size={18} className="text-pink-500" fill="currentColor" />,
  dislike: <ThumbsDown size={18} className="text-blue-500" />,
  reply: <MessageCircle size={18} className="text-blue-500" />,
  bookmark: <Bookmark size={18} className="text-blue-500" fill="currentColor" />,
  mention: <AtSign size={18} className="text-blue-500" />,
  youtube: <Play size={18} className="text-red-500" />,
};

const TYPE_LABELS: Record<string, string> = {
  like: "あなたのコメントをいいねしました",
  dislike: "あなたのコメントを低評価しました",
  reply: "あなたのコメントに返信しました",
  bookmark: "あなたのコメントをブックマークしました",
  mention: "あなたにメンションしました",
  youtube: "YouTube通知",
};

export default function NotificationsPage() {
  const [tab, setTab] = useState<"all" | "mentions">("all");
    const [notifications, setNotifications] = useState<NotificationItem[]>([]);
    const [youtubeNotifications, setYoutubeNotifications] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const { refresh } = useNotifications();
  const router = useRouter();

  const fetchNotifications = useCallback(async (reset = false) => {
    const newOffset = reset ? 0 : offset;
    setLoading(true);
    try {
      const res = await fetch(`/api/notifications?type=${tab}&limit=50&offset=${newOffset}`, { cache: "no-store" });
      if (!res.ok) throw new Error("Failed");
      const data = await res.json();
      const items = data.notifications || [];
      setNotifications((prev) => (reset ? items : [...prev, ...items]));
      setYoutubeNotifications(data.youtubeNotifications || []);
      setHasMore(items.length === 50);
      if (reset) setOffset(50);
      else setOffset((o) => o + 50);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [tab, offset]);

  useEffect(() => {
    fetchNotifications(true);
  }, [tab]);

  useEffect(() => {
    fetch("/api/notifications", { method: "PATCH", body: JSON.stringify({ all: true }) })
      .then(() => refresh());
  }, [refresh]);

  const handleDelete = async (id: string) => {
    await fetch("/api/notifications", {
      method: "DELETE",
      body: JSON.stringify({ notificationIds: [id] }),
    });
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  const handleDeleteAll = async () => {
    if (!confirm("すべての通知を削除しますか？")) return;
    await fetch("/api/notifications", { method: "DELETE", body: JSON.stringify({ all: true }) });
    setNotifications([]);
  };

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border">
        <div className="px-4 py-3 flex items-center justify-between">
          <h1 className="text-xl font-bold">通知</h1>
          {notifications.length > 0 && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDeleteAll}
              className="text-sm text-muted hover:text-foreground transition-colors"
            >
              すべて削除
            </motion.button>
          )}
        </div>
        <div className="flex">
          {["all", "mentions"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t as "all" | "mentions")}
              className={`flex-1 py-3 text-[15px] font-bold text-center hover:bg-white/5 transition-colors relative ${
                tab === t ? "text-foreground" : "text-muted"
              }`}
            >
              {t === "all" ? "すべて" : "@返信"}
              {tab === t && (
                <motion.div
                  layoutId="notificationTab"
                  className="absolute bottom-0 left-1/2 -translate-x-1/2 w-12 h-1 bg-primary rounded-full"
                  transition={{ type: "spring", stiffness: 500, damping: 30 }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="divide-y divide-border">
        <AnimatePresence mode="popLayout">
          {/* YouTube native notifications */}
          {youtubeNotifications.map((n: any) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
              className="px-4 py-3 flex gap-3 bg-youtube/5"
            >
              <div className="shrink-0 pt-1 text-primary">
                <MessageCircle size={18} />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {n.thumbnail ? (
                    <img src={n.thumbnail} alt="" className="w-8 h-8 rounded object-cover" />
                  ) : null}
                  <span className="font-bold text-[15px]">YouTube</span>
                  <span className="text-muted text-[15px]">{TYPE_LABELS.youtube}</span>
                  <span className="text-muted text-sm ml-auto shrink-0">{n.sentTime}</span>
                </div>
                <p className="text-[15px]">{n.title}</p>
                {n.body && <p className="text-[13px] text-muted mt-0.5">{n.body}</p>}
              </div>
            </motion.div>
          ))}
          {/* App notifications */}
          {notifications.map((n) => (
            <motion.div
              key={n.id}
              layout
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100, transition: { duration: 0.2 } }}
              whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
              className={`px-4 py-3 flex gap-3 group ${!n.isRead ? "bg-primary/5" : ""}`}
            >
              <div className="shrink-0 pt-1">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 500, damping: 15 }}
                >
                  {TYPE_ICONS[n.type] || <Heart size={18} />}
                </motion.div>
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  {n.actorThumb ? (
                    <motion.img whileHover={{ scale: 1.1 }} src={n.actorThumb} alt="" className="w-8 h-8 rounded-full object-cover" />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center">
                      <span className="text-xs text-muted">{n.actorName[0]}</span>
                    </div>
                  )}
                  <span className="font-bold text-[15px]">{n.actorName}</span>
                  <span className="text-muted text-[15px]">{TYPE_LABELS[n.type] || "通知"}</span>
                  <span className="text-muted text-sm ml-auto shrink-0">{new Date(n.createdAt).toLocaleDateString("ja-JP")}</span>
                </div>
                {n.content && (
                  <Link
                    href={n.commentId ? `/thread/${n.commentId}` : `/`}
                    className="block text-[15px] text-muted mt-1 line-clamp-2 hover:underline"
                  >
                    {n.content}
                  </Link>
                )}
              </div>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => handleDelete(n.id)}
                className="shrink-0 self-center p-2 text-muted hover:text-red-500 transition-colors opacity-0 group-hover:opacity-100"
                title="削除"
              >
                <Trash2 size={16} />
              </motion.button>
            </motion.div>
          ))}
        </AnimatePresence>
        {loading && (
          <div className="p-8 text-center text-muted">
            <Loader2 size={24} className="animate-spin mx-auto mb-2 text-primary" />
            読み込み中...
          </div>
        )}
        {!loading && notifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-12 text-center text-muted"
          >
            <p className="text-lg font-bold mb-2">通知はありません</p>
            <p className="text-sm">いいね・返信・ブックマークなどの通知がここに表示されます</p>
          </motion.div>
        )}
        {hasMore && !loading && (
          <motion.button
            whileHover={{ backgroundColor: "rgba(255,255,255,0.03)" }}
            whileTap={{ scale: 0.98 }}
            onClick={() => fetchNotifications()}
            className="w-full py-3 text-center text-primary text-sm font-bold transition-colors"
          >
            もっと見る
          </motion.button>
        )}
      </div>
    </MainLayout>
  );
}
