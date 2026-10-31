"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Sparkles, X } from "lucide-react";

const STORAGE_KEY = "lailala-notice-2026-10-features";

/**
 * 新機能の告知バナー。閉じたら localStorage に記録して以後出さない。
 * コメント欄に「エゴサあるの？」と書かれていたため、実装済みの機能をサイト側からも示す。
 */
export function FeatureAnnouncement() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (window.localStorage.getItem(STORAGE_KEY) !== "1") setVisible(true);
    } catch {
      setVisible(true);
    }
  }, []);

  const dismiss = () => {
    try {
      window.localStorage.setItem(STORAGE_KEY, "1");
    } catch {}
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="border-b border-border bg-[#1d9bf0]/5 px-4 py-3">
      <div className="flex items-start gap-2">
        <Sparkles size={16} className="mt-0.5 shrink-0 text-[#1d9bf0]" />
        <div className="min-w-0 flex-1 text-[13px] leading-5">
          <p className="font-bold text-foreground">新機能が入りました</p>
          <ul className="mt-1 space-y-0.5 text-muted">
            <li>
              ・
              <Link href="/ego/" className="text-[#1d9bf0] hover:underline">
                エゴサ
              </Link>
              　自分に関するコメントを集めて新着を通知します
            </li>
            <li>・連投の折りたたみ／「引用してXに投稿」／返信先の表示</li>
            <li>・コメントに画像を添付できるようになりました（ログイン時）</li>
          </ul>
        </div>
        <button
          type="button"
          onClick={dismiss}
          aria-label="お知らせを閉じる"
          className="shrink-0 rounded-full p-1 text-muted transition-colors hover:bg-white/10"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  );
}
