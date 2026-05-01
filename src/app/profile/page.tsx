"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, User, MessageCircle, ThumbsUp } from "lucide-react";
import Link from "next/link";

interface UserAction {
  id: string;
  videoId: string;
  commentId: string;
  actionType: string;
  content: string | null;
  createdAt: string;
}

export default function MyProfilePage() {
  const router = useRouter();
  const [user, setUser] = useState<{ name?: string | null; email?: string | null; image?: string | null } | null>(null);
  const [actions, setActions] = useState<UserAction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"comments" | "replies">("comments");

  useEffect(() => {
    Promise.all([
      fetch("/api/auth/me").then((r) => (r.ok ? r.json() : null)),
      fetch("/api/profile/actions").then((r) => (r.ok ? r.json() : null)),
    ])
      .then(([userData, actionsData]) => {
        if (userData?.user) setUser(userData.user);
        if (actionsData?.actions) setActions(actionsData.actions);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const filtered = actions.filter((a) =>
    activeTab === "comments" ? a.actionType === "comment" : a.actionType === "reply"
  );

  return (
    <MainLayout>
    <div className="min-h-screen">
      <div className="sticky top-0 bg-black/80 backdrop-blur-md z-10 border-b border-[#2f3336] px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">マイプロフィール</h1>
      </div>

      <div className="px-4 py-6 border-b border-[#2f3336]">
        <div className="flex items-center gap-4">
          {user?.image ? (
            <img src={user.image} alt={user.name || ""} className="w-20 h-20 rounded-full object-cover border border-[#2f3336]" />
          ) : (
            <div className="w-20 h-20 rounded-full bg-border flex items-center justify-center">
              <User size={32} className="text-muted" />
            </div>
          )}
          <div>
            <h2 className="text-xl font-bold">{user?.name || "ユーザー"}</h2>
            <p className="text-[13px] text-muted">{user?.email}</p>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-[#2f3336]">
        <button
          onClick={() => setActiveTab("comments")}
          className={`flex-1 py-4 text-center font-medium hover:bg-white/5 transition-colors relative ${activeTab === "comments" ? "text-foreground" : "text-muted"}`}
        >
          投稿
          {activeTab === "comments" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
          )}
        </button>
        <button
          onClick={() => setActiveTab("replies")}
          className={`flex-1 py-4 text-center font-medium hover:bg-white/5 transition-colors relative ${activeTab === "replies" ? "text-foreground" : "text-muted"}`}
        >
          返信
          {activeTab === "replies" && (
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-14 h-1 bg-primary rounded-full" />
          )}
        </button>
      </div>

      <div className="divide-y divide-[#2f3336]">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className="p-4 space-y-3 animate-pulse">
              <div className="h-4 w-full bg-[#2f3336] rounded" />
              <div className="h-4 w-2/3 bg-[#2f3336] rounded" />
            </div>
          ))
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <MessageCircle size={32} className="mx-auto mb-3 opacity-50" />
            <p>まだ{activeTab === "comments" ? "投稿" : "返信"}がありません</p>
          </div>
        ) : (
          filtered.map((action) => (
            <article
              key={action.id}
              className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
              onClick={() => action.commentId && router.push(`/thread/${action.commentId}`)}
            >
              <div className="flex gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {user?.image ? (
                    <img src={user.image} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] truncate">{user?.name || "ユーザー"}</span>
                    <span className="text-muted text-[15px]">·</span>
                    <span className="text-muted text-[15px] shrink-0">
                      {new Date(action.createdAt).toLocaleDateString("ja-JP", { month: "short", day: "numeric" })}
                    </span>
                  </div>
                  {action.content && (
                    <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed break-words">{action.content}</p>
                  )}
                  <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                    <span className="flex items-center gap-1.5">
                      <ThumbsUp size={16} />
                      <span>-</span>
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MessageCircle size={16} />
                      <span>-</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </div>
    </MainLayout>
  );
}
