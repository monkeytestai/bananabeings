import { NextResponse, type NextRequest } from "next/server";
import {
  MONKEYTEST_COOKIE,
  MONKEYTEST_HEADER,
  MONKEYTEST_QUERY,
  monkeytestCookieOptions,
  parseMode,
  requestIsSecure,
} from "@/lib/monkeytest-mode";

export function middleware(request: NextRequest) {
  const fromQuery = parseMode(request.nextUrl.searchParams.get(MONKEYTEST_QUERY));
  const fromCookie = parseMode(request.cookies.get(MONKEYTEST_COOKIE)?.value);
  const mode = fromQuery ?? fromCookie;

  const requestHeaders = new Headers(request.headers);
  if (mode) requestHeaders.set(MONKEYTEST_HEADER, mode);
  else requestHeaders.delete(MONKEYTEST_HEADER);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  if (fromQuery) {
    response.cookies.set(MONKEYTEST_COOKIE, fromQuery, monkeytestCookieOptions(requestIsSecure(request)));
  }
  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|ico)$).*)"],
};
