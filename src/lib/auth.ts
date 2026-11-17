const ACCOUNTS_KEY = "bb-demo-accounts";
const SESSION_KEY = "bb-demo-session";

export const DEMO_EMAIL = "demo@bananabeings.com";
export const DEMO_PASSWORD = "BananaDemo#2026";
export const DEMO_NAME = "Demo";

export type Account = {
  name: string;
  email: string;
  passwordHash: string;
};

export type Session = {
  name: string;
  email: string;
};

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

export async function hashPassword(password: string): Promise<string> {
  const data = new TextEncoder().encode(password);
  const digest = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(digest))
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("");
}

function readAccounts(): Account[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(ACCOUNTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isAccount);
  } catch {
    return [];
  }
}

function isAccount(value: unknown): value is Account {
  if (!value || typeof value !== "object") return false;
  const account = value as Account;
  return (
    typeof account.name === "string" &&
    typeof account.email === "string" &&
    typeof account.passwordHash === "string"
  );
}

function writeAccounts(accounts: Account[]) {
  window.localStorage.setItem(ACCOUNTS_KEY, JSON.stringify(accounts));
}

export function getSession(): Session | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw) as unknown;
    if (!parsed || typeof parsed !== "object") return null;
    const session = parsed as Session;
    if (typeof session.name === "string" && typeof session.email === "string") {
      return session;
    }
    return null;
  } catch {
    return null;
  }
}

export function setSession(session: Session | null) {
  if (session) window.localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  else window.localStorage.removeItem(SESSION_KEY);
  window.dispatchEvent(new Event("bb-auth-change"));
}

export async function signUp(
  name: string,
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const trimmedName = name.trim();
  const normalized = normalizeEmail(email);
  if (!trimmedName || !normalized || !password) {
    return { ok: false, error: "Name, email, and password are required." };
  }
  if (normalized === normalizeEmail(DEMO_EMAIL)) {
    return { ok: false, error: "That email is reserved for the demo account. Try logging in instead." };
  }
  const accounts = readAccounts();
  if (accounts.some((account) => normalizeEmail(account.email) === normalized)) {
    return { ok: false, error: "An account with that email already exists. Try logging in." };
  }
  const passwordHash = await hashPassword(password);
  accounts.push({ name: trimmedName, email: normalized, passwordHash });
  writeAccounts(accounts);
  setSession({ name: trimmedName, email: normalized });
  return { ok: true };
}

export async function logIn(
  email: string,
  password: string,
): Promise<{ ok: true } | { ok: false; error: string }> {
  const normalized = normalizeEmail(email);
  if (!normalized || !password) {
    return { ok: false, error: "Email and password are required." };
  }
  const passwordHash = await hashPassword(password);
  if (normalized === normalizeEmail(DEMO_EMAIL)) {
    const demoHash = await hashPassword(DEMO_PASSWORD);
    if (passwordHash === demoHash) {
      setSession({ name: DEMO_NAME, email: DEMO_EMAIL });
      return { ok: true };
    }
    return { ok: false, error: "Wrong email or password." };
  }
  const account = readAccounts().find((entry) => normalizeEmail(entry.email) === normalized);
  if (!account || account.passwordHash !== passwordHash) {
    return { ok: false, error: "Wrong email or password." };
  }
  setSession({ name: account.name, email: account.email });
  return { ok: true };
}

export function logOut() {
  setSession(null);
}
