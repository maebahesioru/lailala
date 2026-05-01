"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, List, Plus, Trash2, User, Loader2, ThumbsUp, MessageCircle, Search, Globe, Lock, Heart, FolderOpen } from "lucide-react";
import Link from "next/link";

interface ListItem {
  id: string;
  commentId: string;
  videoId: string;
  authorName: string;
  authorThumb: string | null;
  content: string;
  likeCount: string;
  replyCount: string;
  publishedTime: string;
}

interface UserList {
  id: string;
  name: string;
  description: string | null;
  isPublic: boolean;
  isOwner?: boolean;
  isFollowing?: boolean;
  items?: ListItem[];
  user?: { name: string | null; image: string | null };
  _count?: { items: number; followers: number };
}

export default function ListsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const initialListId = searchParams.get("id");

  const [lists, setLists] = useState<UserList[]>([]);
  const [publicLists, setPublicLists] = useState<UserList[]>([]);
  const [followedLists, setFollowedLists] = useState<UserList[]>([]);
  const [containingMe, setContainingMe] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");
  const [newListPublic, setNewListPublic] = useState(false);
  const [selectedList, setSelectedList] = useState<UserList | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<"mine" | "public" | "followed" | "containing">("mine");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadAll();
  }, [user]);

  useEffect(() => {
    if (initialListId && !selectedList) {
      openListById(initialListId);
    }
  }, [initialListId]);

  const loadAll = async () => {
    setLoading(true);
    try {
      const [mine, pub, follows, me] = await Promise.all([
        fetch("/api/lists").then((r) => r.ok ? r.json() : { lists: [] }),
        fetch("/api/lists/public").then((r) => r.ok ? r.json() : { lists: [] }),
        fetch("/api/lists/follow").then((r) => r.ok ? r.json() : { follows: [] }),
        fetch("/api/lists/containing-me").then((r) => r.ok ? r.json() : { lists: [] }),
      ]);
      setLists(mine.lists || []);
      setPublicLists(pub.lists || []);
      setFollowedLists(follows.follows || []);
      setContainingMe(me.lists || []);
    } catch {}
    setLoading(false);
  };

  const openListById = async (id: string) => {
    try {
      const res = await fetch(`/api/lists?listId=${id}`);
      const data = await res.json();
      if (data.list) setSelectedList(data.list);
    } catch {}
  };

  const createList = async () => {
    if (!newListName.trim()) return;
    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newListName.trim(), description: newListDesc.trim() || undefined, isPublic: newListPublic }),
      });
      const data = await res.json();
      if (data.list) {
        setLists((prev) => [data.list, ...prev]);
        setNewListName("");
        setNewListDesc("");
        setNewListPublic(false);
        setShowCreate(false);
      }
    } catch {}
  };

  const deleteList = async (id: string) => {
    if (!confirm("このリストを削除しますか？")) return;
    try {
      await fetch(`/api/lists?listId=${id}`, { method: "DELETE" });
      setLists((prev) => prev.filter((l) => l.id !== id));
      if (selectedList?.id === id) setSelectedList(null);
    } catch {}
  };

  const openList = async (list: UserList) => {
    await openListById(list.id);
  };

  const removeItem = async (listId: string, commentId: string) => {
    try {
      await fetch(`/api/lists?listId=${listId}&commentId=${commentId}`, { method: "DELETE" });
      setSelectedList((prev) =>
        prev
          ? { ...prev, items: prev.items?.filter((i) => i.commentId !== commentId) || [] }
          : null
      );
    } catch {}
  };

  const toggleFollow = async (listId: string, currentlyFollowing: boolean) => {
    try {
      if (currentlyFollowing) {
        await fetch(`/api/lists/follow?listId=${listId}`, { method: "DELETE" });
      } else {
        await fetch("/api/lists/follow", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ listId }) });
      }
      setFollowedLists((prev) =>
        currentlyFollowing ? prev.filter((l) => l.id !== listId) : [...prev, publicLists.find((l) => l.id === listId)!].filter(Boolean)
      );
      if (selectedList?.id === listId) {
        setSelectedList((prev) => prev ? { ...prev, isFollowing: !currentlyFollowing } : null);
      }
    } catch {}
  };

  const currentLists = activeTab === "mine" ? lists : activeTab === "public" ? publicLists : activeTab === "followed" ? followedLists : containingMe;

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        {selectedList ? (
          <>
            <button onClick={() => setSelectedList(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div className="flex-1 min-w-0">
              <h1 className="text-lg font-bold truncate">{selectedList.name}</h1>
              <p className="text-[13px] text-muted">{selectedList._count?.items || selectedList.items?.length || 0} 件 · {selectedList.isPublic ? <Globe size={12} className="inline" /> : <Lock size={12} className="inline" />}</p>
            </div>
            {selectedList.isOwner ? (
              <button onClick={() => deleteList(selectedList.id)} className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 transition-colors">
                <Trash2 size={18} />
              </button>
            ) : (
              <button
                onClick={() => toggleFollow(selectedList.id, !!selectedList.isFollowing)}
                className={`px-4 py-1.5 rounded-full text-sm font-bold transition-colors ${selectedList.isFollowing ? "border border-border hover:border-red-500 hover:text-red-500" : "bg-primary text-white hover:bg-primary-hover"}`}
              >
                {selectedList.isFollowing ? "フォロー中" : "フォロー"}
              </button>
            )}
          </>
        ) : (
          <>
            <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </Link>
            <h1 className="text-lg font-bold">リスト</h1>
          </>
        )}
      </div>

      {selectedList ? (
        <div className="divide-y divide-border">
          {selectedList.items && selectedList.items.length > 0 ? (
            selectedList.items.map((item) => (
              <article
                key={item.id}
                className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
                onClick={() => router.push(`/thread/${item.commentId}`)}
              >
                <div className="flex gap-3">
                  <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                    {item.authorThumb ? (
                      <img src={item.authorThumb} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                        <User size={20} className="text-muted" />
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-[15px] truncate">{item.authorName}</span>
                      <span className="text-muted text-[15px]">·</span>
                      <span className="text-muted text-[15px] shrink-0">{item.publishedTime}</span>
                    </div>
                    <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed break-words">{item.content}</p>
                    <div className="flex items-center justify-between mt-3 text-[13px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <ThumbsUp size={16} />
                        <span>{item.likeCount}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span>{item.replyCount}</span>
                      </span>
                      {selectedList.isOwner && (
                        <button
                          onClick={(e) => { e.stopPropagation(); removeItem(selectedList.id, item.commentId); }}
                          className="text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                        >
                          <Trash2 size={14} />
                          削除
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="p-12 text-center text-muted">
              <List size={32} className="mx-auto mb-3 opacity-50" />
              <p>リストが空です</p>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4">
          {!user ? (
            <div className="p-12 text-center text-muted">
              <List size={32} className="mx-auto mb-3 opacity-50" />
              <p>ログインが必要です</p>
            </div>
          ) : loading ? (
            <div className="p-8 flex justify-center">
              <Loader2 className="animate-spin text-primary" size={32} />
            </div>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-border mb-4">
                {(["mine", "public", "followed", "containing"] as const).map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`flex-1 py-3 text-center text-sm font-medium transition-colors relative ${activeTab === tab ? "text-foreground" : "text-muted"}`}
                  >
                    {tab === "mine" ? "マイリスト" : tab === "public" ? "公開リスト" : tab === "followed" ? "フォロー中" : "自分が載ってる"}
                    {activeTab === tab && <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-10 h-0.5 bg-primary rounded-full" />}
                  </button>
                ))}
              </div>

              {activeTab === "mine" && (
                <button
                  onClick={() => setShowCreate(true)}
                  className="w-full flex items-center justify-center gap-2 py-3 mb-4 border-2 border-dashed border-border rounded-xl text-muted hover:border-primary hover:text-primary transition-colors"
                >
                  <Plus size={20} />
                  新しいリストを作成
                </button>
              )}

              {showCreate && (
                <div className="bg-card border border-border rounded-xl p-4 mb-4 space-y-3">
                  <input
                    type="text"
                    placeholder="リスト名"
                    value={newListName}
                    onChange={(e) => setNewListName(e.target.value)}
                    className="w-full bg-background text-foreground rounded-lg px-4 py-2 border border-border outline-none focus:ring-2 focus:ring-primary"
                  />
                  <input
                    type="text"
                    placeholder="説明（任意）"
                    value={newListDesc}
                    onChange={(e) => setNewListDesc(e.target.value)}
                    className="w-full bg-background text-foreground rounded-lg px-4 py-2 border border-border outline-none focus:ring-2 focus:ring-primary"
                  />
                  <label className="flex items-center gap-2 text-sm">
                    <input type="checkbox" checked={newListPublic} onChange={(e) => setNewListPublic(e.target.checked)} className="rounded" />
                    <Globe size={14} />
                    公開リストにする
                  </label>
                  <div className="flex gap-2">
                    <button onClick={createList} className="flex-1 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors">作成</button>
                    <button onClick={() => { setShowCreate(false); setNewListName(""); setNewListDesc(""); setNewListPublic(false); }} className="flex-1 py-2 bg-border text-foreground rounded-full font-bold hover:bg-white/10 transition-colors">キャンセル</button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {currentLists.length === 0 ? (
                  <div className="p-8 text-center text-muted">
                    <List size={32} className="mx-auto mb-3 opacity-50" />
                    <p>リストがありません</p>
                  </div>
                ) : (
                  currentLists.map((list) => (
                    <div
                      key={list.id}
                      className="bg-card border border-border rounded-xl p-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      onClick={() => openList(list)}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[15px]">{list.name}</h3>
                            {list.isPublic ? <Globe size={14} className="text-muted" /> : <Lock size={14} className="text-muted" />}
                          </div>
                          {list.description && <p className="text-[13px] text-muted mt-0.5">{list.description}</p>}
                          <p className="text-[13px] text-muted mt-1">
                            {list._count?.items || list.items?.length || 0}件 · {list._count?.followers || 0}フォロワー
                            {list.user && ` · ${list.user.name || "ユーザー"}`}
                          </p>
                        </div>
                        {list.isOwner ? (
                          <button onClick={(e) => { e.stopPropagation(); deleteList(list.id); }} className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={18} />
                          </button>
                        ) : (
                          <button
                            onClick={(e) => { e.stopPropagation(); toggleFollow(list.id, !!list.isFollowing); }}
                            className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${list.isFollowing ? "border border-border" : "bg-primary text-white hover:bg-primary-hover"}`}
                          >
                            {list.isFollowing ? "フォロー中" : "フォロー"}
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            </>
          )}
        </div>
      )}
    </MainLayout>
  );
}
