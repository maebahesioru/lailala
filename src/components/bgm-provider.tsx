"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const BgmContext = createContext<{
  enabled: boolean;
  toggle: () => void;
}>({ enabled: false, toggle: () => {} });

export function BgmProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("ytx-bgm-enabled");
    if (stored === "true") {
      setEnabled(true);
    }
  }, []);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio("/bgm.mp3");
      audioRef.current.loop = true;
    }
    if (enabled) {
      audioRef.current.play().catch(() => {});
    } else {
      audioRef.current.pause();
    }
    localStorage.setItem("ytx-bgm-enabled", String(enabled));
  }, [enabled]);

  // Retry play on first user interaction after reload (browsers block autoplay)
  useEffect(() => {
    if (!enabled || !audioRef.current) return;
    if (!audioRef.current.paused) return;

    const tryPlay = () => {
      audioRef.current
        ?.play()
        .then(() => {
          document.removeEventListener("click", tryPlay);
          document.removeEventListener("touchstart", tryPlay);
        })
        .catch(() => {});
    };

    document.addEventListener("click", tryPlay);
    document.addEventListener("touchstart", tryPlay);
    return () => {
      document.removeEventListener("click", tryPlay);
      document.removeEventListener("touchstart", tryPlay);
    };
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <BgmContext.Provider value={{ enabled, toggle }}>
      {children}
    </BgmContext.Provider>
  );
}

export const useBgm = () => useContext(BgmContext);
