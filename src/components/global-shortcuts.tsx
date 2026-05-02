"use client";

import { useState, useEffect } from "react";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { ComposePopup } from "./compose-popup";

export function GlobalShortcuts() {
  const [composeOpen, setComposeOpen] = useState(false);
  const [composeThreadParentId, setComposeThreadParentId] = useState<string | null>(null);
  const [composeThreadContent, setComposeThreadContent] = useState<string | null>(null);
  const [composeReplyParentId, setComposeReplyParentId] = useState<string | null>(null);
  const [composeReplyAuthorName, setComposeReplyAuthorName] = useState<string | null>(null);

  useEffect(() => {
    const handleOpenCompose = () => {
      setComposeThreadParentId(null);
      setComposeThreadContent(null);
      setComposeReplyParentId(null);
      setComposeReplyAuthorName(null);
      setComposeOpen(true);
    };
    const handleOpenComposeThread = (e: CustomEvent<{ parentCommentId: string; content: string }>) => {
      setComposeThreadParentId(e.detail.parentCommentId);
      setComposeThreadContent(e.detail.content);
      setComposeReplyParentId(null);
      setComposeReplyAuthorName(null);
      setComposeOpen(true);
    };
    const handleOpenReply = (e: CustomEvent<{ videoId: string; parentCommentId: string; authorName: string }>) => {
      setComposeThreadParentId(null);
      setComposeThreadContent(null);
      setComposeReplyParentId(e.detail.parentCommentId);
      setComposeReplyAuthorName(e.detail.authorName);
      setComposeOpen(true);
    };
    window.addEventListener("lailala:openCompose", handleOpenCompose);
    window.addEventListener("lailala:openComposeThread", handleOpenComposeThread as EventListener);
    window.addEventListener("lailala:openReply", handleOpenReply as EventListener);
    return () => {
      window.removeEventListener("lailala:openCompose", handleOpenCompose);
      window.removeEventListener("lailala:openComposeThread", handleOpenComposeThread as EventListener);
      window.removeEventListener("lailala:openReply", handleOpenReply as EventListener);
    };
  }, []);

  const handleCloseCompose = () => {
    setComposeOpen(false);
    setComposeThreadParentId(null);
    setComposeThreadContent(null);
    setComposeReplyParentId(null);
    setComposeReplyAuthorName(null);
  };

  return (
    <>
      <KeyboardShortcuts
        composeOpen={composeOpen}
        onOpenCompose={() => {
          setComposeThreadParentId(null);
          setComposeThreadContent(null);
          setComposeReplyParentId(null);
          setComposeReplyAuthorName(null);
          setComposeOpen(true);
        }}
        onCloseCompose={handleCloseCompose}
      />
      <ComposePopup
        open={composeOpen}
        onClose={handleCloseCompose}
        videoId="niKAylKNIEI"
        initialThreadParentId={composeThreadParentId}
        initialThreadContent={composeThreadContent}
        replyParentId={composeReplyParentId}
        replyAuthorName={composeReplyAuthorName}
        onPosted={() => window.location.reload()}
      />
    </>
  );
}
