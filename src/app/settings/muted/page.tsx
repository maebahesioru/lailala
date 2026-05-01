"use client";

import { useState, useEffect } from "react";
import { MainLayout } from "@/components/main-layout";
import { ArrowLeft, VolumeX, Loader2, User } from "lucide-react";
import Link from "next/link";

interface MutedUser {
  id: string;
  channelId: string;
  channelName: string | null;
  createdAt: string;
}

export default function MutedPage() {
  const [muted, setMuted] = useState<MutedUser[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/muted")
      .then((r) => r.json())
      .then((data) => {
        if (data.muted) setMuted(data.muted);
      })
      .catch(() => null)
      .finally(() => setLoading(false));
  }, []);

  const unmute = async (channelId: string) => {
    try {
      await fetch(`/api/muted?channelId=${channelId}`, { method: "DELETE" });
      setMuted((prev) => prev.filter((m) => m.channelId !== channelId));
    } catch {}
  };

  return (
    <MainLayout>
      <div className="sticky top-0 bg-background/80 backdrop-blur-md z-10 border-b border-border px-4 py-3 flex items-center gap-3">
        <Link href="/settings" className="p-2 rounded-full hover:bg-white/10 transition-colors">
          <ArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold">ミュート一覧</h1>
      </div>

      <div className="divide-y divide-border">
        {loading ? (
          <div className="p-8 flex justify-center">
            <Loader2 className="animate-spin text-primary" size={32} />
          </div>
        ) : muted.length === 0 ? (
          <div className="p-12 text-center text-muted">
            <VolumeX size={32} className="mx-auto mb-3 opacity-50" />
            <p>ミュートしているユーザーはいません</p>
          </div>
        ) : (
          muted.map((m) => (
            <div key={m.id} className="px-4 py-3 flex items-center justify-between hover:bg-white/[0.03] transition-colors">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-border flex items-center justify-center">
                  <User size={20} className="text-muted" />
                </div>
                <div>
                  <p className="font-bold text-[15px]">{m.channelName || m.channelId}</p>
                  <p className="text-[13px] text-muted">{m.channelId}</p>
                </div>
              </div>
              <button
                onClick={() => unmute(m.channelId)}
                className="px-4 py-1.5 border border-border rounded-full text-sm font-bold hover:bg-white/5 transition-colors"
              >
                ミュート解除
              </button>
            </div>
          ))
        )}
      </div>
    </MainLayout>
  );
}
