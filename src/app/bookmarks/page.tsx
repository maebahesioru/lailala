"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { MainLayout } from "@/components/main-layout";
import {
  ArrowLeft, Bookmark, Loader2, User, ThumbsUp, ThumbsDown, MessageCircle, Plus, Trash2, FolderOpen
} from "lucide-react";
import Link from "next/link";
import { ShareMenu } from "@/components/share-menu";
import { LoginPopup } from "@/components/login-popup";
import { MentionText } from "@/components/mention-text";
import { stripHandlePrefix, stripEditedTag, localizeTime } from "@/lib/i18n";

interface BookmarkItem {
  id: string;
  commentId: string;
  videoId: string;
  authorName: string;
  authorThumb: string | null;
  content: string;
  likeCount: string;
  replyCount: string;
  publishedTime: string;
  createdAt: string;
}

interface BookmarkFolder {
  id: string;
  name: string;
  _count?: { bookmarks: number };
}

export default function BookmarksPage() {
  const { user } = useAuth();
  const router = useRouter();
  const [bookmarks, setBookmarks] = useState<BookmarkItem[]>([]);
  const [folders, setFolders] = useState<BookmarkFolder[]>([]);
  const [loading, setLoading] = useState(true);
  const [showLogin, setShowLogin] = useState(false);
  const [selectedFolder, setSelectedFolder] = useState<string | null>(null);
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [newFolderName, setNewFolderName] = useState("");

  useEffect(() => {
    if (!user) { setLoading(false); return; }
    loadData();
  }, [user, selectedFolder]);

  const loadData = async () => {
    setLoading(true);
    try {
      const [bmData, folderData] = await Promise.all([
        fetch(selectedFolder ? `/api/bookmarks?folderId=${selectedFolder}` : "/api/bookmarks").then((r) => r.ok ? r.json() : { bookmarks: [] }),
        fetch("/api/bookmarks/folders").then((r) => r.ok ? r.json() : { folders: [] }),
      ]);
      setBookmarks(bmData.bookmarks || []);
      setFolders(folderData.folders || []);
    } catch {}
    setLoading(false);
  };

  const createFolder = async () => {
    if (!newFolderName.trim()) return;
    try {
      const res = await fetch("/api/bookmarks/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newFolderName.trim() }),
      });
      const data = await res.json();
      if (data.folder) {
        setFolders((prev) => [data.folder, ...prev]);
        setNewFolderName("");
        setShowCreateFolder(false);
      }
    } catch {}
  };

  const deleteFolder = async (id: string) => {
    if (!confirm("このフォルダを削除しますか？（ブックマークは未分類に移動します）")) return;
    try {
      await fetch(`/api/bookmarks/folders?folderId=${id}`, { method: "DELETE" });
      setFolders((prev) => prev.filter((f) => f.id !== id));
      if (selectedFolder === id) setSelectedFolder(null);
    } catch {}
  };

  const moveBookmark = async (commentId: string, folderId: string | null) => {
    try {
      await fetch("/api/bookmarks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ commentId, folderId }),
      });
      loadData();
    } catch {}
  };

  const removeBookmark = async (commentId: string) => {
    try {
      await fetch(`/api/bookmarks?commentId=${commentId}`, { method: "DELETE" });
      setBookmarks((prev) => prev.filter((b) => b.commentId !== commentId));
    } catch {}
  };

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">ブックマーク</h1>
      </div>

      {/* Folder tabs */}
      {user && (
        <div className="flex items-center gap-2 px-4 py-2 border-b border-border overflow-x-auto">
          <button
            onClick={() => setSelectedFolder(null)}
            className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFolder === null ? "bg-primary text-white" : "bg-border text-foreground hover:bg-white/10"}`}
          >
            すべて
          </button>
          {folders.map((folder) => (
            <div key={folder.id} className="relative group flex items-center">
              <button
                onClick={() => setSelectedFolder(folder.id)}
                className={`px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors ${selectedFolder === folder.id ? "bg-primary text-white" : "bg-border text-foreground hover:bg-white/10"}`}
              >
                {folder.name}
              </button>
              <button
                onClick={() => deleteFolder(folder.id)}
                className="ml-1 p-1 rounded-full text-muted hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={12} />
              </button>
            </div>
          ))}
          <button
            onClick={() => setShowCreateFolder(true)}
            className="p-1.5 rounded-full bg-border text-muted hover:text-foreground transition-colors"
          >
            <Plus size={16} />
          </button>
        </div>
      )}

      {showCreateFolder && (
        <div className="px-4 py-3 border-b border-border flex gap-2">
          <input
            type="text"
            placeholder="フォルダ名"
            value={newFolderName}
            onChange={(e) => setNewFolderName(e.target.value)}
            className="flex-1 bg-background text-foreground rounded-lg px-3 py-1.5 border border-border outline-none focus:ring-2 focus:ring-primary text-sm"
          />
          <button onClick={createFolder} className="px-3 py-1.5 bg-primary text-white rounded-full text-sm font-bold hover:bg-primary-hover">作成</button>
          <button onClick={() => { setShowCreateFolder(false); setNewFolderName(""); }} className="px-3 py-1.5 bg-border text-foreground rounded-full text-sm font-bold hover:bg-white/10">キャンセル</button>
        </div>
      )}

      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : bookmarks.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <Bookmark size={32} className="mx-auto mb-3 opacity-50" />
            <p>ブックマークがありません</p>
          </div>
        ) : (
          bookmarks.map((b) => (
            <article
              key={b.id}
              className="px-4 py-3 hover:bg-white/[0.03] transition-colors select-text cursor-pointer"
              onClick={() => router.push(`/thread/${b.commentId}`)}
            >
              <div className="flex gap-3">
                <div className="shrink-0" onClick={(e) => e.stopPropagation()}>
                  {b.authorThumb ? (
                    <img src={b.authorThumb} alt={b.authorName} className="w-10 h-10 rounded-full object-cover shrink-0" />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center shrink-0">
                      <User size={20} className="text-muted" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-bold text-[15px] truncate">{stripHandlePrefix(b.authorName)}</span>
                    <span className="text-muted text-[15px]">·</span>
                    <span className="text-muted text-[15px] shrink-0">{localizeTime(b.publishedTime)}</span>
                  </div>
                  <p className="text-[15px] whitespace-pre-wrap mt-0.5 leading-relaxed">
                    <MentionText content={stripEditedTag(b.content)} />
                  </p>

                  <div className="flex items-center justify-between mt-3">
                    <button onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-[#f91880] transition-colors rounded-full hover:bg-white/5">
                      <ThumbsUp size={18} />
                      <span>{b.likeCount}</span>
                    </button>
                    <button onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5">
                      <ThumbsDown size={18} />
                    </button>
                    <Link href={`/thread/${b.commentId}`} onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5">
                      <MessageCircle size={18} />
                      <span>{b.replyCount || 0}</span>
                    </Link>
                    <div onClick={(e) => e.stopPropagation()} className="flex-1 flex items-center justify-center">
                      <ShareMenu url={`${typeof window !== "undefined" ? window.location.origin : ""}/thread/${b.commentId}`} text={`${b.authorName}: ${b.content}`} buttonClass="flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-muted hover:text-primary transition-colors rounded-full hover:bg-white/5 w-full" />
                    </div>
                    <button onClick={(e) => { e.stopPropagation(); removeBookmark(b.commentId); }} className="flex-1 flex items-center justify-center gap-1.5 py-1.5 text-[13px] text-primary transition-colors rounded-full hover:bg-white/5">
                      <Bookmark size={18} fill="currentColor" />
                    </button>
                  </div>

                  {/* Move to folder */}
                  {folders.length > 0 && (
                    <div className="flex items-center gap-2 mt-2">
                      <FolderOpen size={14} className="text-muted" />
                      <select
                        value={selectedFolder || ""}
                        onChange={(e) => moveBookmark(b.commentId, e.target.value || null)}
                        onClick={(e) => e.stopPropagation()}
                        className="bg-background text-foreground text-xs border border-border rounded px-2 py-1 outline-none"
                      >
                        <option value="">未分類</option>
                        {folders.map((f) => (
                          <option key={f.id} value={f.id}>{f.name}</option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              </div>
            </article>
          ))
        )}
      </div>
      <LoginPopup open={showLogin} onClose={() => setShowLogin(false)} />
    </MainLayout>
  );
}
