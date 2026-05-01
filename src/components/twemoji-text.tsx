import { ReactNode } from "react";

const TWEMOJI_BASE = "https://cdn.jsdelivr.net/gh/twitter/twemoji@latest/assets/svg";

function getCodePoint(emoji: string): string {
  return Array.from(emoji)
    .map((char) => char.codePointAt(0)?.toString(16))
    .filter(Boolean)
    .join("-");
}

export function TwemojiText({ content, className = "" }: { content: string; className?: string }) {
  const parts: ReactNode[] = [];
  // Match emoji using Unicode ranges
  const emojiRegex = /(\p{Emoji_Presentation}|\p{Emoji}\uFE0F)/gu;
  let lastIndex = 0;
  let match;
  const regex = new RegExp(emojiRegex.source, "gu");

  while ((match = regex.exec(content)) !== null) {
    if (match.index > lastIndex) {
      parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex, match.index)}</span>);
    }
    const code = getCodePoint(match[0]);
    parts.push(
      <img
        key={`e-${match.index}`}
        src={`${TWEMOJI_BASE}/${code}.svg`}
        alt={match[0]}
        className={`inline-block align-text-bottom ${className}`}
        style={{ width: "1.1em", height: "1.1em" }}
        draggable={false}
      />
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < content.length) {
    parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex)}</span>);
  }

  return <>{parts.length > 0 ? parts : content}</>;
}
