import { NextResponse } from "next/server";
import { getMonkeyMode } from "@/lib/monkeytest-mode.server";

export const dynamic = "force-dynamic";

function page(title: string, message: string) {
  const body = `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${title} — Banana Beings</title>
</head>
<body style="margin:0;background:#f3efe6;color:#1a1814;font-family:ui-sans-serif,system-ui,sans-serif;">
  <main style="max-width:36rem;margin:0 auto;padding:4rem 1.25rem;">
    <p style="font-size:11px;font-weight:600;letter-spacing:0.22em;text-transform:uppercase;color:#6d675f;">Help</p>
    <h1 style="font-size:2.25rem;letter-spacing:-0.045em;margin:0.5rem 0 0;">${title}</h1>
    <p style="line-height:1.7;color:#6d675f;">${message}</p>
    <p><a href="/help" style="color:#1a1814;">Back to help</a></p>
  </main>
</body>
</html>`;
  return body;
}

export async function POST() {
  const mode = await getMonkeyMode();
  if (mode === "buggy") {
    return new NextResponse(
      page("Could not send", "The contact form could not be saved. Please try again later today."),
      {
        status: 500,
        headers: {
          "content-type": "text/html; charset=utf-8",
          "cache-control": "no-store",
        },
      },
    );
  }
  return new NextResponse(
    page("Message sent", "Message sent. We will reply to the address you gave us. This shop is a demo, so nothing is emailed and nothing is charged."),
    {
      status: 200,
      headers: {
        "content-type": "text/html; charset=utf-8",
        "cache-control": "no-store",
      },
    },
  );
}
