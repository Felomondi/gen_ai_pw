"use client";

import { createContext, useContext, useState, ReactNode } from "react";

type Mode = "human" | "agent";

const ModeContext = createContext<{
  mode: Mode;
  toggleMode: () => void;
}>({
  mode: "human",
  toggleMode: () => {},
});

export function ModeProvider({ children }: { children: ReactNode }) {
  const [mode, setMode] = useState<Mode>("human");
  return (
    <ModeContext.Provider
      value={{ mode, toggleMode: () => setMode((m) => (m === "human" ? "agent" : "human")) }}
    >
      {children}
    </ModeContext.Provider>
  );
}

export function useMode() {
  return useContext(ModeContext);
}
