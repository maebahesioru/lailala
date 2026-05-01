"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { BgmProvider } from "./bgm-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BgmProvider>{children}</BgmProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
