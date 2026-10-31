"use client";

import { useEffect, useRef, useState } from "react";
import { ImagePlus, Loader2, X } from "lucide-react";
import { useAuth } from "./auth-provider";
import { onImgError } from "@/lib/img-fallback";

export type CommentImage = { id: string; url: string; mine?: boolean };

/**
 * コメントに紐付いた画像（サイト独自機能）。
 * YouTube 側のコメントには画像を付けられないため、コメントIDに対して別テーブルで保持する。
 */
export function CommentImages({
  commentId,
  initial,
  canAttach = false,
}: {
  commentId: string;
  initial?: CommentImage[];
  /** 自分のコメントにだけ添付ボタンを出す（サーバー側でも所有者を検証している）。 */
  canAttach?: boolean;
}) {
  const { user } = useAuth();
  const [images, setImages] = useState<CommentImage[]>(initial ?? []);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewer, setViewer] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const loadedRef = useRef<boolean>(initial !== undefined);

  useEffect(() => {
    if (loadedRef.current) return;
    loadedRef.current = true;
    let alive = true;
    fetch(`/api/images/?commentId=${encodeURIComponent(commentId)}`)
      .then((r) => (r.ok ? r.json() : { images: [] }))
      .then((d) => {
        if (alive && Array.isArray(d?.images)) setImages(d.images);
      })
      .catch(() => {});
    return () => {
      alive = false;
    };
  }, [commentId]);

  const handlePick = () => {
    setError(null);
    inputRef.current?.click();
  };

  const handleFile = async (file: File | undefined) => {
    if (!file) return;
    setUploading(true);
    setError(null);
    try {
      const form = new FormData();
      form.append("commentId", commentId);
      form.append("file", file);
      const res = await fetch("/api/images/", { method: "POST", body: form });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data?.error || "画像のアップロードに失敗しました。");
      } else if (data?.image) {
        setImages((prev) => [...prev, data.image]);
      }
    } catch {
      setError("画像のアップロードに失敗しました。");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  return (
    <div className="mt-2">
      {images.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {images.map((img) => (
            <div key={img.id} className="relative">
            <button
              key={img.id}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setViewer(img.url);
              }}
              className="overflow-hidden rounded-xl border border-border"
              aria-label="添付画像を拡大表示"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={img.url}
                alt="コメントに添付された画像"
                width={220}
                height={220}
                className="h-[160px] w-auto max-w-[240px] object-cover"
                onError={onImgError}
              />
            </button>
            {img.mine && (
              <button
                type="button"
                onClick={async (e) => {
                  e.stopPropagation();
                  const res = await fetch("/api/images/", {
                    method: "DELETE",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ id: img.id }),
                  });
                  if (res.ok) setImages((prev) => prev.filter((x) => x.id !== img.id));
                }}
                aria-label="この画像を削除"
                className="absolute right-1 top-1 rounded-full bg-black/70 p-1 text-white"
              >
                <X size={12} />
              </button>
            )}
            </div>
          ))}
        </div>
      )}

      {user && canAttach && (
        <div className="mt-2 flex items-center gap-2">
          <input
            ref={inputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            className="hidden"
            onChange={(e) => handleFile(e.target.files?.[0])}
          />
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              handlePick();
            }}
            disabled={uploading}
            className="inline-flex items-center gap-1 rounded-full border border-border px-3 py-1 text-[12px] text-muted transition-colors hover:border-[#1d9bf0] hover:text-[#1d9bf0] disabled:opacity-50"
          >
            {uploading ? <Loader2 size={13} className="animate-spin" /> : <ImagePlus size={13} />}
            <span>画像を添付</span>
          </button>
          {error && <span className="text-[12px] text-red-500">{error}</span>}
        </div>
      )}

      {viewer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4"
          onClick={() => setViewer(null)}
          role="dialog"
          aria-modal="true"
          aria-label="添付画像"
        >
          <button
            type="button"
            onClick={() => setViewer(null)}
            aria-label="閉じる"
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white"
          >
            <X size={20} />
          </button>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={viewer} alt="添付画像" className="max-h-[90vh] max-w-full object-contain" />
        </div>
      )}
    </div>
  );
}
