"use client";

import { createContext, useContext } from "react";
import type { MonkeyMode } from "@/lib/monkeytest-mode";

const MonkeyModeContext = createContext<MonkeyMode>("buggy");

export function MonkeyModeProvider({ mode, children }: { mode: MonkeyMode; children: React.ReactNode }) {
  return <MonkeyModeContext.Provider value={mode}>{children}</MonkeyModeContext.Provider>;
}

export function useMonkeyMode(): MonkeyMode {
  return useContext(MonkeyModeContext);
}
