"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const BgmContext = createContext<{
  enabled: boolean;
  toggle: () => void;
}>({ enabled: false, toggle: () => {} });

export function BgmProvider({ children }: { children: React.ReactNode }) {
  const [enabled, setEnabled] = useState(() => {
    if (typeof window !== "undefined") {
      return localStorage.getItem("ytx-bgm-enabled") === "true";
    }
    return false;
  });

  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    localStorage.setItem("ytx-bgm-enabled", String(enabled));
  }, [enabled]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const tryUnmute = () => {
      if (!audio || !audio.muted) return;
      audio.muted = false;
      audio.play().catch(() => {
        audio.muted = true;
      });
    };

    if (enabled) {
      audio.muted = true;
      const promise = audio.play();
      if (promise !== undefined) {
        promise
          .then(() => {
            tryUnmute();
          })
          .catch(() => {});
      }

      const handler = () => {
        tryUnmute();
        if (!audio.muted) {
          document.removeEventListener("click", handler);
          document.removeEventListener("touchstart", handler);
          document.removeEventListener("scroll", handler);
          document.removeEventListener("keydown", handler);
        }
      };

      document.addEventListener("click", handler);
      document.addEventListener("touchstart", handler);
      document.addEventListener("scroll", handler, { passive: true });
      document.addEventListener("keydown", handler);

      return () => {
        document.removeEventListener("click", handler);
        document.removeEventListener("touchstart", handler);
        document.removeEventListener("scroll", handler);
        document.removeEventListener("keydown", handler);
      };
    } else {
      audio.muted = true;
      audio.pause();
    }
  }, [enabled]);

  const toggle = () => setEnabled((prev) => !prev);

  return (
    <BgmContext.Provider value={{ enabled, toggle }}>
      <audio
        ref={audioRef}
        src="/bgm.mp3"
        loop
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
