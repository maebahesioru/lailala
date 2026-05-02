"use client";

import { useState, useEffect } from "react";
import { Link2, Loader2 } from "lucide-react";

interface OgpData {
  url: string;
  title?: string | null;
  description?: string | null;
  image?: string | null;
  siteName?: string | null;
}

function extractUrls(text: string): string[] {
  const matches = text.match(/https?:\/\/[^\s<>"{}|\\^`[\]]+/gi);
  return matches ? [...new Set(matches)] : [];
}

export function LinkCard({ text }: { text: string }) {
  const [ogp, setOgp] = useState<OgpData | null>(null);
  const [loading, setLoading] = useState(false);
  const urls = extractUrls(text);
  const url = urls[0];

  useEffect(() => {
    if (!url) return;
    setLoading(true);
    fetch(`/api/ogp?url=${encodeURIComponent(url)}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => {
        if (data && data.title) setOgp(data);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [url]);

  if (!url) return null;
  if (loading) return <div className="mt-2 p-3 border border-border rounded-xl flex items-center gap-2 text-muted text-sm"><Loader2 size={14} className="animate-spin" /> リンクを読み込み中...</div>;
  if (!ogp) return null;

  return (
    <a
      href={ogp.url}
      target="_blank"
      rel="noopener noreferrer"
      className="mt-2 block border border-border rounded-xl overflow-hidden hover:bg-white/[0.03] transition-colors"
      onClick={(e) => e.stopPropagation()}
    >
      {ogp.image && (
        <div className="w-full h-32 bg-background relative">
          <img src={ogp.image} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      )}
      <div className="p-3">
        <p className="text-[13px] text-muted truncate flex items-center gap-1">
          <Link2 size={12} />
          {ogp.siteName || new URL(ogp.url).hostname}
        </p>
        <p className="text-[15px] font-bold truncate mt-0.5">{ogp.title}</p>
        {ogp.description && <p className="text-[13px] text-muted line-clamp-2 mt-0.5">{ogp.description}</p>}
      </div>
    </a>
  );
}
