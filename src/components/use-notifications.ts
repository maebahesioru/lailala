"use client";

import { useEffect, useState, useCallback } from "react";

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
    const interval = setInterval(fetchCount, 30000); // 30秒ごとに更新
    return () => clearInterval(interval);
  }, [fetchCount]);

  return { unreadCount, refresh: fetchCount, loading, setLoading };
}
