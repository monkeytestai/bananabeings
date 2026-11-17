"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { logOut } from "@/lib/auth";
import { useAuth } from "@/components/use-auth";

export default function AccountPage() {
  const router = useRouter();
  const { session, ready } = useAuth();

  useEffect(() => {
    if (ready && !session) {
      router.replace("/login");
    }
  }, [ready, session, router]);

  if (!ready || !session) {
    return (
      <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
        <p className="text-sm text-muted">Loading account…</p>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Account</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">Welcome, {session.name}</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        This is a demo login. No real accounts are stored on a server. Signed in as {session.email}.
      </p>
      <button
        type="button"
        id="log-out"
        data-testid="log-out"
        className="mt-8 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-card"
        onClick={() => {
          logOut();
          router.push("/login");
        }}
      >
        Log out
      </button>
    </div>
  );
}
