"use client";

import { useEffect, useState } from "react";
import { getSession, type Session } from "@/lib/auth";

export function useAuth() {
  const [session, setSessionState] = useState<Session | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    function sync() {
      setSessionState(getSession());
      setReady(true);
    }
    sync();
    window.addEventListener("bb-auth-change", sync);
    window.addEventListener("storage", sync);
    return () => {
      window.removeEventListener("bb-auth-change", sync);
      window.removeEventListener("storage", sync);
    };
  }, []);

  return { session, ready };
}
