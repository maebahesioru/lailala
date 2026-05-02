"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface DataSaverContextValue {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  toggle: () => void;
}

const DataSaverContext = createContext<DataSaverContextValue>({
  enabled: false,
  setEnabled: () => {},
  toggle: () => {},
});

export function useDataSaver() {
  return useContext(DataSaverContext);
}

export function DataSaverProvider({ children }: { children: ReactNode }) {
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("lailala-data-saver");
    if (saved) setEnabled(saved === "true");
  }, []);

  const toggle = () => {
    setEnabled((prev) => {
      const next = !prev;
      localStorage.setItem("lailala-data-saver", String(next));
      return next;
    });
  };

  const setValue = (v: boolean) => {
    setEnabled(v);
    localStorage.setItem("lailala-data-saver", String(v));
  };

  return (
    <DataSaverContext.Provider value={{ enabled, setEnabled: setValue, toggle }}>
      {children}
    </DataSaverContext.Provider>
  );
}
