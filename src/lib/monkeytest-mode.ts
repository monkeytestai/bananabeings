/**
 * Bug-mode contract shared with monkeytester's demo fixture.
 *
 * Labels stay stable across modes. The mode itself is a cookie (plus an
 * optional `?monkeytest=` override) because a Vercel isolate does not keep
 * memory between requests.
 *
 * Resolution order: query param, then cookie, then MONKEYTEST_MODE, then buggy.
 */

export const MONKEYTEST_COOKIE = "monkeytest-mode";
export const MONKEYTEST_QUERY = "monkeytest";
export const MONKEYTEST_HEADER = "x-monkeytest-mode";

export type MonkeyMode = "buggy" | "fixed";

export function parseMode(value: string | null | undefined): MonkeyMode | null {
  const next = value?.trim();
  if (next === "buggy" || next === "fixed") return next;
  return null;
}

export function defaultMonkeyMode(): MonkeyMode {
  return parseMode(process.env.MONKEYTEST_MODE) ?? "buggy";
}

export function trackOrderHref(mode: MonkeyMode): string {
  return mode === "buggy" ? "/track/missing" : "/track";
}

type CookieRequest = {
  url?: string;
  headers: { get(name: string): string | null };
  nextUrl?: { protocol?: string };
};

export function requestIsSecure(request: CookieRequest): boolean {
  const forwarded = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
  if (forwarded === "https") return true;
  if (forwarded === "http") return false;
  if (request.nextUrl?.protocol) return request.nextUrl.protocol === "https:";
  if (request.url) {
    try {
      return new URL(request.url).protocol === "https:";
    } catch {
      return false;
    }
  }
  return false;
}

export function monkeytestCookieOptions(secure: boolean) {
  return {
    path: "/",
    sameSite: "lax" as const,
    httpOnly: true,
    secure,
    maxAge: 60 * 60 * 24 * 7,
  };
}
