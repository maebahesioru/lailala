import { TwemojiText } from "./twemoji-text";

interface MentionTextProps {
  content: string;
}

export function MentionText({ content }: MentionTextProps) {
  // Split by @mentions (including full-width ＠) and #hashtags, keeping the delimiters
  const parts = content.split(/([＠@][^\s＠@]+|#[^\s#]+)/g);

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
        return <TwemojiText key={i} content={part} />;
      })}
    </>
  );
}
