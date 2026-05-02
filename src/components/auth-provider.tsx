"use client";

import { createContext, useContext, useState, useEffect, ReactNode, useCallback } from "react";

interface Account {
  id: string;
  name: string;
  image: string | null;
  channelId: string | null;
}

interface User {
  id: string;
  name?: string | null;
  email?: string | null;
  image?: string | null;
  channelId?: string | null;
  selectedAccountId?: string | null;
  accounts?: Account[];
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  refresh: () => Promise<void>;
  switchAccount: (channelId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({ user: null, loading: true, refresh: async () => {}, switchAccount: async () => {} });

function getCachedUser(): User | null {
  try {
    const raw = localStorage.getItem("lailala-user-cache");
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    // Cache expires after 7 days
    if (parsed._cachedAt && Date.now() - parsed._cachedAt > 7 * 24 * 60 * 60 * 1000) {
      localStorage.removeItem("lailala-user-cache");
      return null;
    }
    delete parsed._cachedAt;
    return parsed;
  } catch {
    return null;
  }
}

function setCachedUser(user: User | null) {
  try {
    if (user) {
      localStorage.setItem("lailala-user-cache", JSON.stringify({ ...user, _cachedAt: Date.now() }));
    } else {
      localStorage.removeItem("lailala-user-cache");
    }
    } catch (e) { console.error(e); }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(() => getCachedUser());
  const [loading, setLoading] = useState(true);

  const refresh = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/me");
      if (res.ok) {
        const data = await res.json();
        setUser(data.user);
        setCachedUser(data.user);
      } else {
        setUser(null);
        setCachedUser(null);
      }
    } catch {
      setUser(null);
      setCachedUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  const switchAccount = useCallback(async (channelId: string) => {
    try {
      const res = await fetch("/api/auth/switch-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ channelId }),
      });
      if (res.ok) {
        await refresh();
      }
    } catch (e) { console.error(e); }
  }, [refresh]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return (
    <AuthContext.Provider value={{ user, loading, refresh, switchAccount }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
