import { TwemojiText } from "./twemoji-text";

interface MentionTextProps {
  content: string;
  videoId?: string;
}

function isValidTimestamp(str: string): boolean {
  const parts = str.split(":").map(Number);
  if (parts.length === 2) {
    const [m, s] = parts;
    return m >= 0 && m < 60 && s >= 0 && s < 60;
  }
  if (parts.length === 3) {
    const [h, m, s] = parts;
    return h >= 0 && m >= 0 && m < 60 && s >= 0 && s < 60;
  }
  return false;
}

function timestampToSeconds(str: string): number {
  const parts = str.split(":").map(Number);
  if (parts.length === 2) return parts[0] * 60 + parts[1];
  if (parts.length === 3) return parts[0] * 3600 + parts[1] * 60 + parts[2];
  return 0;
}

export function MentionText({ content, videoId }: MentionTextProps) {
  // Split by @mentions, #hashtags, and timestamps like 1:23 or 01:23:45
  const parts = content.split(/([＠@][^\s＠@]+|#[^\s#]+|\d{1,2}:\d{2}(?::\d{2})?)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("@") || part.startsWith("＠") || part.startsWith("#")) {
          return (
            <span key={i} style={{ color: "var(--mention)" }}>
              {part}
            </span>
          );
        }
        // Timestamp link
        if (videoId && /^\d{1,2}:\d{2}(?::\d{2})?$/.test(part) && isValidTimestamp(part)) {
          const seconds = timestampToSeconds(part);
          return (
            <a
              key={i}
              href={`https://www.youtube.com/watch?v=${videoId}&t=${seconds}s`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary font-bold bg-primary/10 px-1 rounded hover:bg-primary/20 transition-colors"
              onClick={(e) => e.stopPropagation()}
            >
              {part}
            </a>
          );
        }
        return <TwemojiText key={i} content={part} />;
      })}
    </>
  );
}
