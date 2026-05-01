export function localizeTime(timeStr: string): string {
  if (!timeStr) return "";

  // If it's an ISO date string, format as Japanese date
  if (/^\d{4}-\d{2}-\d{2}T/.test(timeStr)) {
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) {
      return d.toLocaleString("ja-JP", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      });
    }
  }

  const map: Record<string, string> = {
    "year": "年",
    "years": "年",
    "month": "ヶ月",
    "months": "ヶ月",
    "week": "週間",
    "weeks": "週間",
    "day": "日",
    "days": "日",
    "hour": "時間",
    "hours": "時間",
    "minute": "分",
    "minutes": "分",
    "second": "秒",
    "seconds": "秒",
    "ago": "前",
    "edited": "編集済み",
  };

  // Replace English units with Japanese
  let result = timeStr;
  for (const [en, ja] of Object.entries(map)) {
    result = result.replace(new RegExp(`\\b${en}\\b`, "g"), ja);
  }

  // Clean up extra spaces
  result = result.replace(/\s+/g, "");

  return result;
}

/**
 * Format a timestamp in X/Twitter style detailed format.
 * e.g. "14:30 · 2023年12月15日 · 1,234 件の表示"
 */
export function formatDetailedTime(timeStr: string): string {
  if (!timeStr) return "";

  // Try to parse published_time strings like "1 year ago", "2 days ago"
  const now = new Date();
  const match = timeStr.match(/(\d+)\s*(year|month|week|day|hour|minute|second)s?\s*ago/);
  if (match) {
    const num = parseInt(match[1], 10);
    const unit = match[2];
    const d = new Date(now);
    switch (unit) {
      case "year": d.setFullYear(d.getFullYear() - num); break;
      case "month": d.setMonth(d.getMonth() - num); break;
      case "week": d.setDate(d.getDate() - num * 7); break;
      case "day": d.setDate(d.getDate() - num); break;
      case "hour": d.setHours(d.getHours() - num); break;
      case "minute": d.setMinutes(d.getMinutes() - num); break;
      case "second": d.setSeconds(d.getSeconds() - num); break;
    }
    return formatDateTime(d);
  }

  // Try ISO string
  if (/^\d{4}-\d{2}-\d{2}T/.test(timeStr)) {
    const d = new Date(timeStr);
    if (!isNaN(d.getTime())) return formatDateTime(d);
  }

  return timeStr;
}

function formatDateTime(d: Date): string {
  const time = d.toLocaleTimeString("ja-JP", { hour: "2-digit", minute: "2-digit" });
  const date = d.toLocaleDateString("ja-JP", { year: "numeric", month: "long", day: "numeric" });
  return `${time} · ${date}`;
}

export function stripHandlePrefix(name: string): string {
  if (!name) return "Unknown";
  return name.replace(/^@/, "");
}

export function stripEditedTag(text: string): string {
  return text.replace(/\(edited\)/gi, "").trim();
}
