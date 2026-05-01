"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, List, Plus, Trash2, User, Loader2, ThumbsUp, MessageCircle } from "lucide-react";
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
  items?: ListItem[];
}

export default function ListsPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [lists, setLists] = useState<UserList[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreate, setShowCreate] = useState(false);
  const [newListName, setNewListName] = useState("");
  const [newListDesc, setNewListDesc] = useState("");
  const [selectedList, setSelectedList] = useState<UserList | null>(null);

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    fetch("/api/lists")
      .then((r) => r.json())
      .then((data) => {
        if (data.lists) setLists(data.lists);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, [user]);

  const createList = async () => {
    if (!newListName.trim()) return;
    try {
      const res = await fetch("/api/lists", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newListName.trim(), description: newListDesc.trim() || undefined }),
      });
      const data = await res.json();
      if (data.list) {
        setLists((prev) => [data.list, ...prev]);
        setNewListName("");
        setNewListDesc("");
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
    try {
      const res = await fetch(`/api/lists?listId=${list.id}`);
      const data = await res.json();
      if (data.list) setSelectedList(data.list);
    } catch {}
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

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        {selectedList ? (
          <>
            <button onClick={() => setSelectedList(null)} className="p-2 rounded-full hover:bg-white/10 transition-colors">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-lg font-bold">{selectedList.name}</h1>
              <p className="text-[13px] text-muted">{selectedList.items?.length || 0} 件</p>
            </div>
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
                    <div className="flex items-center gap-4 mt-3 text-[13px] text-muted">
                      <span className="flex items-center gap-1.5">
                        <ThumbsUp size={16} />
                        <span>{item.likeCount}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MessageCircle size={16} />
                        <span>{item.replyCount}</span>
                      </span>
                      <button
                        onClick={(e) => { e.stopPropagation(); removeItem(selectedList.id, item.commentId); }}
                        className="text-muted hover:text-red-500 transition-colors flex items-center gap-1"
                      >
                        <Trash2 size={14} />
                        削除
                      </button>
                    </div>
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className="p-12 text-center text-muted">
              <List size={32} className="mx-auto mb-3 opacity-50" />
              <p>リストが空です</p>
              <p className="text-[13px] mt-2">コメントのメニューからリストに追加できます</p>
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
              <button
                onClick={() => setShowCreate(true)}
                className="w-full flex items-center justify-center gap-2 py-3 mb-4 border-2 border-dashed border-border rounded-xl text-muted hover:border-primary hover:text-primary transition-colors"
              >
                <Plus size={20} />
                新しいリストを作成
              </button>

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
                  <div className="flex gap-2">
                    <button
                      onClick={createList}
                      className="flex-1 py-2 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
                    >
                      作成
                    </button>
                    <button
                      onClick={() => { setShowCreate(false); setNewListName(""); setNewListDesc(""); }}
                      className="flex-1 py-2 bg-border text-foreground rounded-full font-bold hover:bg-white/10 transition-colors"
                    >
                      キャンセル
                    </button>
                  </div>
                </div>
              )}

              <div className="space-y-2">
                {lists.length === 0 ? (
                  <div className="p-8 text-center text-muted">
                    <List size={32} className="mx-auto mb-3 opacity-50" />
                    <p>リストがありません</p>
                    <p className="text-[13px] mt-2">上のボタンから新しいリストを作成できます</p>
                  </div>
                ) : (
                  lists.map((list) => (
                    <div
                      key={list.id}
                      className="bg-card border border-border rounded-xl p-4 hover:bg-white/[0.03] transition-colors cursor-pointer group"
                      onClick={() => openList(list)}
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="font-bold text-[15px]">{list.name}</h3>
                          {list.description && (
                            <p className="text-[13px] text-muted mt-0.5">{list.description}</p>
                          )}
                        </div>
                        <button
                          onClick={(e) => { e.stopPropagation(); deleteList(list.id); }}
                          className="p-2 rounded-full hover:bg-red-500/10 text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                          <Trash2 size={18} />
                        </button>
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
