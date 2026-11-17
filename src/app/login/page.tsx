"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { DEMO_EMAIL, DEMO_PASSWORD, logIn } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await logIn(String(data.get("email") || ""), String(data.get("password") || ""));
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }
    router.push("/account");
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Account</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">Log in</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        This is a demo login. No real accounts are stored on a server.
      </p>
      <p className="mt-2 text-sm leading-6 text-muted">
        Try the demo account: <span className="font-medium text-ink">{DEMO_EMAIL}</span> /{" "}
        <span className="font-medium text-ink">{DEMO_PASSWORD}</span>
      </p>
      <form id="login-form" className="mt-8 grid gap-4" onSubmit={onSubmit} data-testid="login-form" noValidate>
        <label className="block text-sm font-medium" htmlFor="email">
          Email
          <input
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal outline-none ring-banana focus:ring-2"
          />
        </label>
        <label className="block text-sm font-medium" htmlFor="password">
          Password
          <input
            id="password"
            name="password"
            type="password"
            autoComplete="current-password"
            className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal outline-none ring-banana focus:ring-2"
          />
        </label>
        {error ? (
          <p id="login-error" role="alert" className="text-sm text-peel">
            {error}
          </p>
        ) : null}
        <button
          type="submit"
          id="log-in"
          data-testid="log-in"
          disabled={pending}
          className="rounded-full bg-ink py-3 text-sm font-semibold text-card disabled:opacity-60"
        >
          Log in
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        New here?{" "}
        <Link href="/signup" className="font-medium text-ink underline">
          Sign up
        </Link>
      </p>
    </div>
  );
}
