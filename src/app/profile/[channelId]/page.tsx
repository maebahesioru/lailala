"use client";

import { useState, useEffect, use } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, User, ThumbsUp, MessageCircle, Bell, BellOff, Heart, ThumbsDown, Bookmark, Clock } from "lucide-react";
import Link from "next/link";
import { ProfileMoreMenu } from "@/components/profile-more-menu";
import { useAuth } from "@/components/auth-provider";
import { ContributionHeatmap } from "@/components/contribution-heatmap";

interface ProfileComment {
  commentId: string;
  videoId: string;
  authorName: string;
  authorChannelId: string | null;
  authorThumb: string | null;
  content: string;
  likeCount: number;
  replyCount: number;
  publishedAt: string;
  timestamp?: string | null;
}

interface PrivacySettings {
  showLikesTab: boolean;
  showDislikesTab: boolean;
  showBookmarksTab: boolean;
}

type TabType = "comments" | "replies" | "likes" | "dislikes" | "bookmarks";

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diff = Math.floor((now.getTime() - date.getTime()) / 1000);
  if (diff < 60) return "数秒前";
  if (diff < 3600) return `${Math.floor(diff / 60)}分前`;
  if (diff < 86400) return `${Math.floor(diff / 3600)}時間前`;
  if (diff < 604800) return `${Math.floor(diff / 86400)}日前`;
  return date.toLocaleDateString("ja-JP", { year: "numeric", month: "short", day: "numeric" });
}

function safeName(name: string | null | undefined, channelId?: string | null): string {
  if (name && name !== "Unknown" && name.trim() !== "") return name;
  if (channelId) {
    const id = channelId.startsWith("UC") ? channelId : `UC${channelId}`;
    return id;
  }
  return "名無し";
}

export default function ProfilePage({ params }: { params: Promise<{ channelId: string }> }) {
  const { channelId } = use(params);
  const router = useRouter();
  const { user: currentUser } = useAuth();
  const [comments, setComments] = useState<ProfileComment[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [authorName, setAuthorName] = useState<string>("");
  const [authorThumb, setAuthorThumb] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("comments");
  const [notifPref, setNotifPref] = useState<string>("all");
  const [notifLoading, setNotifLoading] = useState(false);
  const [privacy, setPrivacy] = useState<PrivacySettings>({
    showLikesTab: true,
    showDislikesTab: true,
    showBookmarksTab: true,
  });
  const isOwner = currentUser?.channelId === channelId;

  const fetchPrivacy = async () => {
    try {
      const res = await fetch(`/api/profile/privacy?channelId=${encodeURIComponent(channelId)}`);
      if (res.ok) {
        const data = await res.json();
        setPrivacy(data);
      }
    } catch {}
  };

  useEffect(() => {
    fetchPrivacy();
  }, [channelId]);

  useEffect(() => {
    setLoading(true);
    const type = activeTab === "comments" ? "comment" : activeTab === "replies" ? "reply" : activeTab;
    fetch(`/api/profile/comments?channelId=${encodeURIComponent(channelId)}&page=${page}&type=${type}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(data.error);
        } else {
          setComments(data.comments);
          setTotalPages(data.totalPages);
          if (data.comments.length > 0 && activeTab !== "likes" && activeTab !== "dislikes" && activeTab !== "bookmarks") {
            setAuthorName(safeName(data.comments[0].authorName, data.comments[0].authorChannelId));
            setAuthorThumb(data.comments[0].authorThumb);
          } else if (!authorName) {
            setAuthorName((prev) => prev || safeName(null, channelId));
          }
        }
      })
      .catch(() => setError("読み込みに失敗しました"))
      .finally(() => setLoading(false));
  }, [channelId, page, activeTab]);

  // Load notification preference
  useEffect(() => {
    if (!currentUser || isOwner) return;
    fetch(`/api/notifications/settings?channelId=${encodeURIComponent(channelId)}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.preference) setNotifPref(data.preference);
      })
      .catch(() => {});
  }, [currentUser, channelId, isOwner]);

  const toggleNotification = async () => {
    if (!currentUser || isOwner) return;
    setNotifLoading(true);
    const next = notifPref === "none" ? "all" : "none";
    try {
      const res = await fetch("/api/notifications/settings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId, preference: next }),
      });
      if (res.ok) {
        setNotifPref(next);
      }
    } catch {}
    setNotifLoading(false);
  };

  const handleTabChange = (tab: TabType) => {
    setActiveTab(tab);
    setPage(1);
  };

  const displayName = authorName || safeName(null, channelId);

  const tabs: { id: TabType; label: string; icon: React.ElementType; show: boolean }[] = [
    { id: "comments", label: "投稿", icon: MessageCircle, show: true },
    { id: "replies", label: "返信", icon: MessageCircle, show: true },
    { id: "likes", label: "高評価", icon: Heart, show: privacy.showLikesTab || isOwner },
    { id: "dislikes", label: "低評価", icon: ThumbsDown, show: privacy.showDislikesTab || isOwner },
    { id: "bookmarks", label: "ブックマーク", icon: Bookmark, show: privacy.showBookmarksTab || isOwner },
  ];

  return (
    <MainLayout>
    <div className="min-h-screen">
      {/* Header */}
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <div className="flex-1 min-w-0">
          <h1 className="text-lg font-bold truncate">{displayName}</h1>
          <p className="text-[13px] text-muted">{comments.length} 件</p>
        </div>
        <ProfileMoreMenu channelId={channelId} channelName={displayName} />
      </div>

      {/* Author info */}
      <div className="px-4 py-6 border-b border-border">
        <div className="flex items-center gap-4">
          {authorThumb ? (
            <img src={authorThumb} alt={displayName} width={80} height={80} className="w-20 h-20 rounded-full object-cover border border-border" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-border flex items-center justify-center">
              <User size={32} className="text-muted" />
            </div>
          )}
          <div className="flex-1">
            <h2 className="text-xl font-bold">{displayName}</h2>
          </div>
          {!isOwner && currentUser && (
            <button
              onClick={toggleNotification}
              disabled={notifLoading}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-bold transition-colors border ${
                notifPref === "none"
                  ? "border-border hover:bg-white/5 text-foreground"
                  : "bg-primary text-white border-primary hover:bg-primary-hover"
              }`}
              title={notifPref === "none" ? "通知をオンにする" : "通知をオフにする"}
            >
              {notifPref === "none" ? <BellOff size={16} /> : <Bell size={16} />}
              <span>{notifPref === "none" ? "通知OFF" : "通知ON"}</span>
            </button>
          )}
        </div>
      </div>

      {/* Heatmap */}
      <div className="px-4 py-4 border-b border-border">
        <ContributionHeatmap channelId={channelId} authorName={authorName || displayName} />
      </div>

      {/* Tabs */}
      <div className="flex border-b border-border overflow-x-auto">
        {tabs.filter((t) => t.show).map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabChange(tab.id)}
            className={`flex-1 py-4 text-center font-medium hover:bg-white/5 transition-colors relative whitespace-nowrap px-3 ${
              activeTab === tab.id ? "text-foreground" : "text-muted"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <tab.icon size={16} />
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Comments */}
      <div className="divide-y divide-border">
        {loading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-border" />
                <div className="h-4 w-24 bg-border rounded" />
              </div>
              <div className="h-4 w-full bg-border rounded" />
              <div className="h-4 w-2/3 bg-border rounded" />
            </div>
          ))
        ) : error ? (
          <div className="p-12 text-center text-red-400">
            <p>{error}</p>
          </div>
        ) : comments.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <User size={32} className="mx-auto mb-3 opacity-50" />
            <p>
              {activeTab === "likes" ? "高評価" : activeTab === "dislikes" ? "低評価" : activeTab === "bookmarks" ? "ブックマーク" : activeTab === "replies" ? "返信" : "投稿"}
              が見つかりませんでした
            </p>
          </div>
        ) : (
          comments.map((c) => (
            <article
              key={c.commentId}
              className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
              onClick={() => router.push(`/thread/${c.commentId}`)}
            >
              <div className="flex gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {c.authorThumb ? (
                    <img src={c.authorThumb} alt={safeName(c.authorName, c.authorChannelId)} width={40} height={40} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] truncate">{safeName(c.authorName, c.authorChannelId)}</span>
                    <span className="text-muted text-[15px]">·</span>
                    <span className="text-muted text-[15px] shrink-0">{formatRelativeTime(c.publishedAt)}</span>
                    {c.timestamp && (
                      <a
                        href={`https://www.youtube.com/watch?v=${c.videoId}&t=${encodeURIComponent(c.timestamp)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={(e) => e.stopPropagation()}
                        className="flex items-center gap-1 text-[13px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full hover:bg-primary/20 transition-colors"
                      >
                        <Clock size={12} />
                        {c.timestamp}
                      </a>
                    )}
                  </div>
                  <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed break-words">{c.content}</p>

                  <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp size={16} />
                      <span>{c.likeCount}</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={16} />
                      <span>{c.replyCount}</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="p-6 flex items-center justify-center gap-4">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1 || loading}
            className="px-4 py-2 rounded-full bg-primary text-white text-[13px] font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            前へ
          </button>
          <span className="text-[13px] text-muted">
            {page} / {totalPages}
          </span>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || loading}
            className="px-4 py-2 rounded-full bg-primary text-white text-[13px] font-medium hover:bg-primary-hover disabled:opacity-50 transition-colors"
          >
            次へ
          </button>
        </div>
      )}
    </div>
    </MainLayout>
  );
}
