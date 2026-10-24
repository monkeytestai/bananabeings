import { NextResponse } from "next/server";
import { getMonkeyMode } from "@/lib/monkeytest-mode.server";
import {
  MONKEYTEST_COOKIE,
  MONKEYTEST_QUERY,
  monkeytestCookieOptions,
  parseMode,
  requestIsSecure,
} from "@/lib/monkeytest-mode";

export const dynamic = "force-dynamic";

function text(mode: string) {
  return new NextResponse(mode, {
    status: 200,
    headers: {
      "content-type": "text/plain; charset=utf-8",
      "cache-control": "no-store",
    },
  });
}

export async function GET(request: Request) {
  const mode = await getMonkeyMode();
  const response = text(mode);
  const queryMode = parseMode(new URL(request.url).searchParams.get(MONKEYTEST_QUERY));
  if (queryMode) {
    response.cookies.set(MONKEYTEST_COOKIE, queryMode, monkeytestCookieOptions(requestIsSecure(request)));
  }
  return response;
}

export async function POST(request: Request) {
  let raw = "";
  try {
    raw = await request.text();
  } catch {
    return new NextResponse(null, { status: 400 });
  }
  const mode = parseMode(raw);
  if (!mode) return new NextResponse(null, { status: 400 });

  const response = new NextResponse(null, { status: 204, headers: { "cache-control": "no-store" } });
  response.cookies.set(MONKEYTEST_COOKIE, mode, monkeytestCookieOptions(requestIsSecure(request)));
  return response;
}
