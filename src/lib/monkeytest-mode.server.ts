import { cookies, headers } from "next/headers";
import { defaultMonkeyMode, MONKEYTEST_COOKIE, MONKEYTEST_HEADER, parseMode, type MonkeyMode } from "@/lib/monkeytest-mode";

export async function getMonkeyMode(): Promise<MonkeyMode> {
  const headerList = await headers();
  const fromHeader = parseMode(headerList.get(MONKEYTEST_HEADER));
  if (fromHeader) return fromHeader;

  const cookieList = await cookies();
  const fromCookie = parseMode(cookieList.get(MONKEYTEST_COOKIE)?.value);
  if (fromCookie) return fromCookie;

  return defaultMonkeyMode();
}
