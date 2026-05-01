import { TwemojiText } from "./twemoji-text";

interface MentionTextProps {
  content: string;
}

export function MentionText({ content }: MentionTextProps) {
  // Split by @mentions, keeping the delimiters
  const parts = content.split(/(@[^\s@]+)/g);

  return (
    <>
      {parts.map((part, i) => {
        if (part.startsWith("@")) {
          return (
            <span key={i} className="text-primary">
              {part}
            </span>
          );
        }
        return <TwemojiText key={i} content={part} />;
      })}
    </>
  );
}
