"use client";

import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme-provider";
import { BgmProvider } from "./bgm-provider";
import { PushProvider } from "./push-provider";
import { DataSaverProvider } from "./data-saver-provider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <ThemeProvider>
        <BgmProvider>
          <PushProvider>
            <DataSaverProvider>{children}</DataSaverProvider>
          </PushProvider>
        </BgmProvider>
      </ThemeProvider>
    </AuthProvider>
  );
}
