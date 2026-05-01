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
  // Match emoji using broader Unicode ranges (catches Twemoji, flags, sequences)
  const emojiRegex = /[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{1F1E0}-\u{1F1FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]|[\u{1F018}-\u{1F270}]|[\u{238C}]|[\u{2B06}]|[\u{2B07}]|[\u{2B05}]|[\u{27A1}]|[\u{2194}-\u{2199}]|[\u{21AA}]|[\u{21A9}]|[\u{2934}]|[\u{2935}]|[\u{25AA}]|[\u{25AB}]|[\u{25FE}]|[\u{25FD}]|[\u{25FB}]|[\u{25FC}]|[\u{25B6}]|[\u{25C0}]|[\u{1F200}-\u{1F251}]|[\u{1F004}]|[\u{1F0CF}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]|[\u{24C2}]|[\u{23E9}-\u{23F3}]|[\u{23F8}-\u{23FA}]|[\u{200D}]|[\u{20E3}]|[\u{FE0F}]|[\u{1F3FB}-\u{1F3FF}]|[\u{1F4AF}]|[\u{1F500}-\u{1F53D}]|[\u{1F549}-\u{1F54E}]|[\u{1F550}-\u{1F567}]|[\u{1F56F}-\u{1F570}]|[\u{1F573}]|[\u{1F574}]|[\u{1F575}]|[\u{1F576}]|[\u{1F577}]|[\u{1F578}]|[\u{1F579}]|[\u{1F57A}]|[\u{1F587}]|[\u{1F58A}-\u{1F58D}]|[\u{1F590}]|[\u{1F5A4}]|[\u{1F5A5}]|[\u{1F5A8}]|[\u{1F5B1}]|[\u{1F5B2}]|[\u{1F5BC}]|[\u{1F5C2}-\u{1F5C4}]|[\u{1F5D1}-\u{1F5D3}]|[\u{1F5DC}-\u{1F5DE}]|[\u{1F5E1}]|[\u{1F5E3}]|[\u{1F5E8}]|[\u{1F5EF}]|[\u{1F5F3}]|[\u{1F5FA}]|[\u{1F6CB}-\u{1F6D2}]|[\u{1F6D5}-\u{1F6D7}]|[\u{1F6E0}-\u{1F6E5}]|[\u{1F6E9}]|[\u{1F6EB}]|[\u{1F6EC}]|[\u{1F6F0}]|[\u{1F6F3}-\u{1F6FC}]|[\u{1F7E0}-\u{1F7EB}]|[\u{1F90C}-\u{1F93A}]|[\u{1F93C}-\u{1F945}]|[\u{1F947}-\u{1F978}]|[\u{1F97A}-\u{1F9CB}]|[\u{1F9CD}-\u{1FA74}]|[\u{1FA78}-\u{1FA7A}]|[\u{1FA80}-\u{1FA82}]|[\u{1FA84}-\u{1FA86}]|[\u{1FA90}-\u{1FA95}]|[\u{231A}]|[\u{231B}]|[\u{23E9}-\u{23EC}]|[\u{23F0}]|[\u{23F3}]|[\u{2640}]|[\u{2642}]|[\u{2694}]|[\u{2695}]|[\u{2696}]|[\u{2697}]|[\u{2699}]|[\u{269B}]|[\u{269C}]|[\u{26A7}]|[\u{26B0}]|[\u{26B1}]|[\u{26C8}]|[\u{26CF}]|[\u{26D1}]|[\u{26D3}]|[\u{26E9}]|[\u{26F0}]|[\u{26F1}]|[\u{26F2}]|[\u{26F4}]|[\u{26F5}]|[\u{26F7}]|[\u{26F8}]|[\u{26F9}]|[\u{2708}]|[\u{2709}]|[\u{270A}]|[\u{270B}]|[\u{270C}]|[\u{270D}]|[\u{270F}]|[\u{2712}]|[\u{2714}]|[\u{2716}]|[\u{271D}]|[\u{2721}]|[\u{2728}]|[\u{2733}]|[\u{2734}]|[\u{2744}]|[\u{2747}]|[\u{274C}]|[\u{274E}]|[\u{2753}]|[\u{2754}]|[\u{2755}]|[\u{2757}]|[\u{2763}]|[\u{2764}]|[\u{2795}]|[\u{2796}]|[\u{2797}]|[\u{27A1}]|[\u{27B0}]|[\u{27BF}]|[\u{2934}]|[\u{2935}]|[\u{2B05}]|[\u{2B06}]|[\u{2B07}]|[\u{2B1B}]|[\u{2B1C}]|[\u{2B50}]|[\u{2B55}]|[\u{3030}]|[\u{303D}]|[\u{3297}]|[\u{3299}]/gu;

  let lastIndex = 0;
  let match;
  const regex = new RegExp(emojiRegex.source, "gu");

  while ((match = regex.exec(content)) !== null) {
    // Skip lone variation selectors and ZWJ
    if (/^[\uFE0E\uFE0F\u200D]$/.test(match[0])) continue;
    if (match.index > lastIndex) {
      parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex, match.index)}</span>);
    }
    // Try to capture full emoji sequence (with modifiers)
    let endIndex = match.index + match[0].length;
    while (endIndex < content.length) {
      const nextChar = content[endIndex];
      if (/[\uFE0E\uFE0F\u200D\u{1F3FB}-\u{1F3FF}]/u.test(nextChar)) {
        endIndex++;
      } else if (/[\u{1F600}-\u{1F64F}]|[\u{1F300}-\u{1F5FF}]|[\u{1F680}-\u{1F6FF}]|[\u{2600}-\u{26FF}]|[\u{2700}-\u{27BF}]|[\u{1F900}-\u{1F9FF}]/u.test(nextChar)) {
        // Another emoji base, stop here
        break;
      } else {
        break;
      }
    }
    const fullEmoji = content.slice(match.index, endIndex);
    const code = getCodePoint(fullEmoji);
    parts.push(
      <img
        key={`e-${match.index}`}
        src={`${TWEMOJI_BASE}/${code}.svg`}
        alt={fullEmoji}
        className={`inline-block align-text-bottom ${className}`}
        style={{ width: "1.3em", height: "1.3em" }}
        draggable={false}
        onError={(e) => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
    lastIndex = endIndex;
    regex.lastIndex = endIndex;
  }

  if (lastIndex < content.length) {
    parts.push(<span key={`t-${lastIndex}`}>{content.slice(lastIndex)}</span>);
  }

  return <>{parts.length > 0 ? parts : content}</>;
}
