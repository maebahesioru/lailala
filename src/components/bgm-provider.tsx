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
    localStorage.setItem("ytx-bgm-enabled", String(enabled));
    const audio = audioRef.current;
    if (!audio) return;

    if (enabled) {
      // Browsers allow autoplay when muted. Start muted, then unmute.
      audio.muted = true;
      audio.play().catch(() => {});
      // Small delay then unmute so browser treats it as a continuous playback
      const t = setTimeout(() => {
        audio.muted = false;
      }, 100);
      return () => clearTimeout(t);
    } else {
      audio.muted = true;
    }
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <BgmContext.Provider value={{ enabled, toggle }}>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
        autoPlay
        muted
        playsInline
        preload="auto"
        style={{ display: "none" }}
      />
      {children}
    </BgmContext.Provider>
  );
}

export const useBgm = () => useContext(BgmContext);
