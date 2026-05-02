"use client";

import { useEffect, useState, useCallback } from "react";

function isDataSaver(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("lailala-data-saver") === "true";
}

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications?limit=0", { cache: "no-store" });
      if (res.ok) {
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchCount();
    const intervalMs = isDataSaver() ? 300000 : 30000; // 5分 / 30秒
    const interval = setInterval(fetchCount, intervalMs);
    return () => clearInterval(interval);
  }, [fetchCount]);

  return { unreadCount, refresh: fetchCount, loading, setLoading };
}
