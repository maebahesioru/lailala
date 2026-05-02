"use client";

import { useState, useEffect } from "react";

interface HeatmapData {
  [date: string]: number;
}

function getYearGrid(): string[][] {
  const weeks: string[][] = [];
  const today = new Date();
  const start = new Date(today);
  start.setDate(today.getDate() - 364);
  // Align to Sunday
  start.setDate(start.getDate() - start.getDay());

  let currentWeek: string[] = [];
  for (let d = new Date(start); d <= today; d.setDate(d.getDate() + 1)) {
    const iso = d.toISOString().split("T")[0];
    currentWeek.push(iso);
    if (d.getDay() === 6) {
      weeks.push(currentWeek);
      currentWeek = [];
    }
  }
  if (currentWeek.length > 0) weeks.push(currentWeek);
  return weeks;
}

function getColor(count: number): string {
  if (count === 0) return "bg-border/40";
  if (count < 3) return "bg-primary/30";
  if (count < 6) return "bg-primary/50";
  if (count < 10) return "bg-primary/70";
  return "bg-primary";
}

const MONTHS = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"];

export function ContributionHeatmap({ channelId }: { channelId: string }) {
  const [data, setData] = useState<HeatmapData>({});
  const [loading, setLoading] = useState(true);
  const weeks = getYearGrid();

  useEffect(() => {
    fetch(`/api/profile/heatmap?channelId=${encodeURIComponent(channelId)}`)
      .then((r) => r.json())
      .then((res) => {
        if (res.heatmap) setData(res.heatmap);
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, [channelId]);

  if (loading) return <div className="h-24 bg-border/20 rounded-xl animate-pulse" />;

  const total = Object.values(data).reduce((a, b) => a + b, 0);

  return (
    <div className="bg-card rounded-2xl border border-border p-4">
      <div className="flex items-center justify-between mb-3">
        <h3 className="text-sm font-bold text-muted">過去1年の活動</h3>
        <span className="text-sm font-bold">{total} 投稿</span>
      </div>
      <div className="overflow-x-auto">
        <div className="flex gap-1 min-w-max">
          {weeks.map((week, wi) => (
            <div key={wi} className="flex flex-col gap-1">
              {week.map((date) => {
                const count = data[date] || 0;
                return (
                  <div
                    key={date}
                    title={`${date}: ${count}件`}
                    className={`w-3 h-3 rounded-sm ${getColor(count)}`}
                  />
                );
              })}
            </div>
          ))}
        </div>
      </div>
      <div className="flex items-center gap-2 mt-3 text-xs text-muted">
        <span>少</span>
        <div className="flex gap-1">
          <div className="w-3 h-3 rounded-sm bg-border/40" />
          <div className="w-3 h-3 rounded-sm bg-primary/30" />
          <div className="w-3 h-3 rounded-sm bg-primary/50" />
          <div className="w-3 h-3 rounded-sm bg-primary/70" />
          <div className="w-3 h-3 rounded-sm bg-primary" />
        </div>
        <span>多</span>
      </div>
    </div>
  );
}
