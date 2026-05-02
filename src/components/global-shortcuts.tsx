"use client";

import { useState, useEffect } from "react";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { ComposePopup } from "./compose-popup";

export function GlobalShortcuts() {
  const [composeOpen, setComposeOpen] = useState(false);

  useEffect(() => {
    const handleOpenCompose = () => setComposeOpen(true);
    window.addEventListener("lailala:openCompose", handleOpenCompose);
    return () => window.removeEventListener("lailala:openCompose", handleOpenCompose);
  }, []);

  return (
    <>
      <KeyboardShortcuts
        composeOpen={composeOpen}
        onOpenCompose={() => setComposeOpen(true)}
        onCloseCompose={() => setComposeOpen(false)}
      />
      <ComposePopup
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        videoId="niKAylKNIEI"
        onPosted={() => window.location.reload()}
      />
    </>
  );
}
