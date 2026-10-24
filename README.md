# Banana Beings

A small open-source tee shop. Editorial layout in the spirit of a modern Indian D2C clothing site — big type, category tiles, a cloth story, bestseller rows, cart drawer — with an original brand: **banana-cotton tees for young people**.

No database. The catalog is TypeScript. The cart stays in the browser. Hosting on Vercel’s free tier is enough.

## Run

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Stack

| Piece | Choice | Why |
| --- | --- | --- |
| Framework | Next.js App Router | Static pages, cheap on Vercel |
| Styles | Tailwind CSS | No design-system subscription |
| Catalog | `src/data/catalog.ts` | No Postgres, no Shopify bill |
| Cart | `localStorage` | No server session |
| Checkout | Demo confirmation in `sessionStorage` | No payment provider |
| Bug mode | Cookie + `GET`/`POST /__monkeytest/mode` | Same UI, seeded faults for [monkeytest](https://github.com/monkeytestai/monkeytest-core) |
| Database | None | SQLite still needs a disk Vercel won’t keep for free |

Heavier starters (Next.js Commerce + Shopify, Medusa, Saleor) look finished and then charge you for a backend. This one is a storefront you can fork.

## Deploy

Push the repo to GitHub and import it in [Vercel](https://vercel.com). Framework preset: Next.js. No environment variables are required.

`MONKEYTEST_MODE` is optional (`buggy` or `fixed`). It only changes the default when the browser has no mode cookie. Leave it unset in production so the shop stays **buggy**.

## What’s in the shop

Home, shop filters, product pages (colour, size, quick add), cart drawer, demo checkout, search, size guide, help, campus bulk, shipping / returns / privacy / terms.

Checkout does not charge a card and does not ship a parcel.

## Monkeytest bug mode

The shop is a target for [monkeytest-core](https://github.com/monkeytestai/monkeytest-core). Visitors (and monkeytest) can run the **same pages** in a buggy or fixed variant. Labels, roles, and `data-testid`s do not change between modes, so a recorded trace still hits the control after a flip.

Production defaults to **buggy**. These four faults are seeded only in that mode:

| Signal | Where | Buggy | Fixed |
| --- | --- | --- | --- |
| `page-error` | Checkout, **Place order** (`#place-order`) | Click throws an uncaught `save failed` error | Demo order is saved and the confirmation page opens |
| `http-4xx` / navigation | Footer, **Track order** (`#track-order`) | Link opens a missing page (404) | `/track` shows the demo shipment |
| `http-5xx` / network | Help, **Send message** (`#send-message`) | `POST /api/contact` returns HTTP 500 | The same POST returns HTTP 200 |
| `element-disabled` | Cart and checkout, **Apply coupon** (`#apply-coupon`) | Button is disabled | Button is enabled and shows “Coupon applied” |

The mode is stored in the `monkeytest-mode` cookie. Serverless isolates do not share memory, so the cookie (not a process global) is what survives between requests. A `?monkeytest=buggy` or `?monkeytest=fixed` query param wins for that request and updates the cookie, which keeps the rest of that browser on the chosen mode after later links drop the query.

```bash
curl https://bananabeings.com/__monkeytest/mode
# buggy

curl -i -c /tmp/mt.cookies -b /tmp/mt.cookies \
  -X POST https://bananabeings.com/__monkeytest/mode \
  --data-binary 'fixed'
# 204, and Set-Cookie: monkeytest-mode=fixed

curl -b /tmp/mt.cookies https://bananabeings.com/__monkeytest/mode
# fixed
```

`POST` accepts the raw body `buggy` or `fixed` (anything else is 400). `GET` responds with `text/plain`: `buggy` or `fixed`. The cookie is per browser. A POST from curl only affects later requests that send that cookie back. To point a fresh browser — including a monkeytest run — at one mode, start on a URL that carries the query:

```bash
# from a monkeytest-core clone, after npm install && npm run build
node dist/cli.js run https://bananabeings.com --max 4 --flows 4
node dist/cli.js run "https://bananabeings.com/?monkeytest=fixed" --max 4 --flows 4

node dist/cli.js run http://localhost:3000 --max 4 --flows 4
node dist/cli.js run "http://localhost:3000/?monkeytest=fixed" --max 4 --flows 4
```

Opening `https://bananabeings.com/?monkeytest=fixed` (or `buggy`) does the same flip in a normal browser. Checkout stays a demo either way: nothing is charged and nothing is shipped.
