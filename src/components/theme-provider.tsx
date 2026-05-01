"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

type Theme = "light" | "dark-blue" | "black";

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  useSystem: boolean;
  setUseSystem: (use: boolean) => void;
}

function getSystemTheme(): Theme {
  if (typeof window === "undefined") return "black";
  return window.matchMedia("(prefers-color-scheme: light)").matches ? "light" : "black";
}

const ThemeContext = createContext<ThemeContextType>({
  theme: "black",
  setTheme: () => {},
  useSystem: false,
  setUseSystem: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<Theme>("black");
  const [useSystem, setUseSystemState] = useState(false);
  const [mounted, setMounted] = useState(false);

  const applyTheme = useCallback((t: Theme) => {
    document.documentElement.setAttribute("data-theme", t);
  }, []);

  useEffect(() => {
    const savedTheme = localStorage.getItem("lailala-theme") as Theme | null;
    const savedUseSystem = localStorage.getItem("lailala-use-system") === "true";

    setUseSystemState(savedUseSystem);

    if (savedUseSystem) {
      const systemTheme = getSystemTheme();
      setThemeState(systemTheme);
      applyTheme(systemTheme);
    } else if (savedTheme && ["light", "dark-blue", "black"].includes(savedTheme)) {
      setThemeState(savedTheme);
      applyTheme(savedTheme);
    } else {
      applyTheme("black");
    }
    setMounted(true);
  }, [applyTheme]);

  useEffect(() => {
    if (!useSystem) return;
    const mq = window.matchMedia("(prefers-color-scheme: light)");
    const handler = (e: MediaQueryListEvent) => {
      const t = e.matches ? "light" : "black";
      setThemeState(t);
      applyTheme(t);
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, [useSystem, applyTheme]);

  const setTheme = (t: Theme) => {
    setThemeState(t);
    setUseSystemState(false);
    localStorage.setItem("lailala-theme", t);
    localStorage.setItem("lailala-use-system", "false");
    applyTheme(t);
  };

  const setUseSystem = (use: boolean) => {
    setUseSystemState(use);
    localStorage.setItem("lailala-use-system", String(use));
    if (use) {
      const t = getSystemTheme();
      setThemeState(t);
      applyTheme(t);
    }
  };

  if (!mounted) {
    return <>{children}</>;
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, useSystem, setUseSystem }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
