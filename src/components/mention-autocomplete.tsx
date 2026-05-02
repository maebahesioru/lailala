"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { User } from "lucide-react";

interface MentionUser {
  name: string;
  channelId: string;
  image?: string | null;
}

interface MentionAutocompleteProps {
  textareaRef: React.RefObject<HTMLTextAreaElement | null>;
  text: string;
  onSelect: (username: string) => void;
}

export function MentionAutocomplete({ textareaRef, text, onSelect }: MentionAutocompleteProps) {
  const [users, setUsers] = useState<MentionUser[]>([]);
  const [show, setShow] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ta = textareaRef.current;
    if (!ta) return;

    const pos = ta.selectionStart;
    const before = text.slice(0, pos);
    const match = before.match(/@([^\s@]*)$/);

    if (match) {
      setQuery(match[1]);
      setShow(true);
      setIndex(0);
    } else {
      setShow(false);
    }
  }, [text, textareaRef]);

  useEffect(() => {
    if (!show || query === undefined) return;
    const timer = setTimeout(() => {
      fetch(`/api/mentions/users?q=${encodeURIComponent(query)}`)
        .then((r) => r.json())
        .then((data) => {
          if (data.users) setUsers(data.users);
        })
        .catch(() => {});
    }, 200);
    return () => clearTimeout(timer);
  }, [show, query]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (!show) return;
      if (e.key === "ArrowDown") {
        e.preventDefault();
        setIndex((prev) => (prev + 1) % users.length);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setIndex((prev) => (prev - 1 + users.length) % users.length);
      } else if (e.key === "Enter" || e.key === "Tab") {
        e.preventDefault();
        const user = users[index];
        if (user) {
          insertMention(user.name);
        }
      } else if (e.key === "Escape") {
        setShow(false);
      }
    },
    [show, users, index]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  function insertMention(username: string) {
    const ta = textareaRef.current;
    if (!ta) return;
    const pos = ta.selectionStart;
    const before = text.slice(0, pos);
    const after = text.slice(pos);
    const newBefore = before.replace(/@[^\s@]*$/, `@${username} `);
    onSelect(newBefore + after);
    setShow(false);
    setTimeout(() => {
      ta.focus();
      const newPos = newBefore.length;
      ta.setSelectionRange(newPos, newPos);
    }, 0);
  }

  if (!show || users.length === 0) return null;

  return (
    <div ref={containerRef} className="absolute left-0 right-0 top-full mt-1 bg-card border border-border rounded-xl shadow-lg z-20 overflow-hidden max-h-56 overflow-y-auto">
      {users.map((u, i) => (
        <button
          key={u.channelId}
          onClick={() => insertMention(u.name)}
          className={`flex items-center gap-3 w-full px-4 py-2.5 text-left hover:bg-white/5 transition-colors ${i === index ? "bg-white/5" : ""}`}
        >
          {u.image ? (
            <img src={u.image} alt="" className="w-8 h-8 rounded-full object-cover" />
          ) : (
            <div className="w-8 h-8 rounded-full bg-border flex items-center justify-center">
              <User size={16} className="text-muted" />
            </div>
          )}
          <span className="text-sm font-medium">{u.name}</span>
        </button>
      ))}
    </div>
  );
}
