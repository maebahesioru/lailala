"use client";

import { useEffect } from "react";

/**
 * 同一 URL の GET を同時に投げないようにする。
 *
 * 実測ではページ表示時に同じ /api/... への GET が 40ms 差で 2 回
 * 走っていた（例: /api/notifications/?limit=0 が 4 回）。React の
 * マウント/再レンダリングで同じ取得が重複すると、/api/comments/ の
 * ように毎回 YouTube へ取りに行くエンドポイントでは上流呼び出しが
 * そのまま倍になる。ここで in-flight な Promise を共有して 1 本に畳む。
 *
 * - 対象は同一オリジンの /api/ への GET のみ（POST/PATCH/DELETE は素通し）
 * - 各呼び出し元には clone() を返すので、本文を読む側は互いに影響しない
 */
export function FetchDedupe() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const w = window as typeof window & { __lailalaFetchDedupe?: boolean };
    if (w.__lailalaFetchDedupe) return;
    w.__lailalaFetchDedupe = true;

    const original = window.fetch.bind(window);
    const inflight = new Map<string, Promise<Response>>();

    window.fetch = ((input: RequestInfo | URL, init?: RequestInit) => {
      const method = (init?.method || "GET").toUpperCase();
      if (method !== "GET") return original(input, init);

      let url: string;
      if (typeof input === "string") url = input;
      else if (input instanceof URL) url = input.toString();
      else url = input.url;

      // /api/ 以外（RSC のプリフェッチ等）は触らない
      if (!url.includes("/api/")) return original(input, init);

      const existing = inflight.get(url);
      if (existing) return existing.then((res) => res.clone());

      const pending = original(input, init).finally(() => {
        inflight.delete(url);
      });
      inflight.set(url, pending);
      return pending.then((res) => res.clone());
    }) as typeof window.fetch;
  }, []);

  return null;
}
