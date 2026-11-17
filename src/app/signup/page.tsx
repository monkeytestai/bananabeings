"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { signUp } from "@/lib/auth";

export default function SignupPage() {
  const router = useRouter();
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [pending, setPending] = useState(false);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setSuccess("");
    setPending(true);
    const data = new FormData(event.currentTarget);
    const result = await signUp(
      String(data.get("name") || ""),
      String(data.get("email") || ""),
      String(data.get("password") || ""),
    );
    if (!result.ok) {
      setError(result.error);
      setPending(false);
      return;
    }
    setSuccess("Account created.");
    window.setTimeout(() => {
      router.push("/account");
    }, 400);
  }

  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Account</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">Sign up</h1>
      <p className="mt-3 text-sm leading-6 text-muted">
        This is a demo login. No real accounts are stored on a server.
      </p>
      <form id="signup-form" className="mt-8 grid gap-4" onSubmit={onSubmit} data-testid="signup-form" noValidate>
        <label className="block text-sm font-medium" htmlFor="name">
          Name
          <input
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal outline-none ring-banana focus:ring-2"
          />
        </label>
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
            autoComplete="new-password"
            className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal outline-none ring-banana focus:ring-2"
          />
        </label>
        {error ? (
          <p id="signup-error" role="alert" className="text-sm text-peel">
            {error}
          </p>
        ) : null}
        {success ? (
          <p id="signup-success" role="status" className="text-sm text-leaf">
            {success}
          </p>
        ) : null}
        <button
          type="submit"
          id="sign-up"
          data-testid="sign-up"
          disabled={pending}
          className="rounded-full bg-ink py-3 text-sm font-semibold text-card disabled:opacity-60"
        >
          Sign up
        </button>
      </form>
      <p className="mt-6 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/login" className="font-medium text-ink underline">
          Log in
        </Link>
      </p>
    </div>
  );
}
