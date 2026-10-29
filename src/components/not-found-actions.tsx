"use client";

import Link from "next/link";
import { Home, ArrowLeft } from "lucide-react";

export function NotFoundActions() {
  return (
    <div className="flex gap-4">
      <button
        onClick={() => window.history.back()}
        className="flex items-center gap-2 px-6 py-3 border border-border rounded-full font-bold hover:bg-white/5 transition-colors"
      >
        <ArrowLeft size={18} />
        戻る
      </button>
      <Link
        href="/"
        className="flex items-center gap-2 px-6 py-3 bg-primary text-white rounded-full font-bold hover:bg-primary-hover transition-colors"
      >
        <Home size={18} />
        ホームへ
      </Link>
    </div>
  );
}
