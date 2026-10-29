"use client";

import { useEffect, useState, useCallback } from "react";

function isDataSaver(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem("lailala-data-saver") === "true";
}

export function useNotifications() {
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  // 未ログイン（401）なのに 30 秒ごとに叩き続けると、そのぶんレート制限の
  // 枠を消費して他の API を巻き添えにするため、401 のあとは間隔を落とす。
  const [authorized, setAuthorized] = useState(true);

  const fetchCount = useCallback(async () => {
    try {
      const res = await fetch("/api/notifications/?limit=0", { cache: "no-store" });
      if (res.status === 401) {
        setAuthorized(false);
        return;
      }
      if (res.ok) {
        setAuthorized(true);
        const data = await res.json();
        setUnreadCount(data.unreadCount || 0);
      }
    } catch {}
  }, []);

  useEffect(() => {
    fetchCount();
    if (isDataSaver()) return;
    // ログイン済み 30 秒 / 未ログイン 5 分（ログインしたら自動で戻る）
    const interval = setInterval(fetchCount, authorized ? 30000 : 300000);
    return () => clearInterval(interval);
  }, [fetchCount, authorized]);

  return { unreadCount, refresh: fetchCount, loading, setLoading };
}
