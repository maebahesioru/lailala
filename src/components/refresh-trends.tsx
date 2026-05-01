"use client";

import { useState } from "react";
import { RefreshCw } from "lucide-react";

export function RefreshTrends() {
  const [loading, setLoading] = useState(false);

  const handleRefresh = async () => {
    setLoading(true);
    try {
      await fetch("/api/admin/cache-comments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ videoId: "niKAylKNIEI", max: 200 }),
      });
      window.location.reload();
    } catch {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleRefresh}
      disabled={loading}
      className="ml-auto flex items-center gap-2 px-3 py-1.5 bg-[#1d9bf0] text-white rounded-full text-sm font-medium hover:bg-[#1a8cd8] disabled:opacity-50"
    >
      <RefreshCw size={14} className={loading ? "animate-spin" : ""} />
      {loading ? "更新中..." : "キャッシュ更新"}
    </button>
  );
}
