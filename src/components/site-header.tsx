"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { BananaMark, Wordmark } from "@/components/brand";
import { useCart } from "@/components/cart-provider";
import { useAuth } from "@/components/use-auth";
import { logOut } from "@/lib/auth";

const menus = [
  {
    label: "Men",
    href: "/shop?g=men",
    items: [
      { href: "/shop?g=men&c=crew", label: "Crew" },
      { href: "/shop?g=men&c=vest", label: "Vest" },
      { href: "/shop?g=men&c=oversized", label: "Oversized" },
      { href: "/shop?g=men&o=casual", label: "Casual" },
      { href: "/shop?g=men&o=work", label: "Work" },
      { href: "/shop?g=men&o=sport", label: "Sport" },
      { href: "/shop?c=pack", label: "Packs" },
    ],
  },
  {
    label: "Women",
    href: "/shop?g=women",
    items: [
      { href: "/shop?g=women&c=crew", label: "Crew" },
      { href: "/shop?g=women&c=crop", label: "Crop" },
      { href: "/shop?g=women&c=oversized", label: "Oversized" },
      { href: "/shop?g=women&o=casual", label: "Casual" },
      { href: "/shop?g=women&o=work", label: "Work" },
      { href: "/shop?g=women&o=sport", label: "Sport" },
    ],
  },
];

export function SiteHeader() {
  const cart = useCart();
  const router = useRouter();
  const { session } = useAuth();
  const [menu, setMenu] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  function close() {
    setMenu(false);
    setOpen(null);
  }

  function onLogout() {
    logOut();
    close();
    router.push("/login");
  }

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-paper/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-5 sm:px-8">
        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          aria-expanded={menu}
          aria-label={menu ? "Close menu" : "Open menu"}
          onClick={() => setMenu((value) => !value)}
        >
          <span className="text-lg leading-none">{menu ? "×" : "☰"}</span>
        </button>
        <Link href="/" className="flex items-center gap-2" onClick={close}>
          <BananaMark className="h-8 w-8" />
          <Wordmark />
        </Link>
        <nav className="ml-6 hidden items-center gap-1 lg:flex" aria-label="Primary">
          {menus.map((entry) => (
            <div key={entry.label} className="group relative">
              <Link href={entry.href} className="rounded-full px-3 py-2 text-sm font-semibold hover:bg-card">
                {entry.label}
              </Link>
              <div className="invisible absolute left-0 top-full z-50 pt-2 opacity-0 transition group-hover:visible group-hover:opacity-100 group-focus-within:visible group-focus-within:opacity-100">
                <div className="min-w-40 rounded-2xl border border-line bg-card p-2 shadow-sm">
                  {entry.items.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block rounded-xl px-3 py-2 text-sm font-medium hover:bg-paper"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
          <Link href="/shop?sale=1" className="ml-2 rounded-full px-3 py-2 text-sm font-semibold text-peel hover:bg-card">
            Sale
          </Link>
        </nav>
        <form action="/search" className="ml-auto hidden min-w-0 flex-1 lg:block lg:max-w-xs">
          <label className="sr-only" htmlFor="header-search">
            Search
          </label>
          <input
            id="header-search"
            name="q"
            placeholder="Search"
            className="w-full rounded-full border border-line bg-card px-4 py-2 text-sm outline-none ring-banana focus:ring-2"
          />
        </form>
        <div className="ml-auto flex items-center gap-2 md:ml-0">
          <Link href="/help" className="hidden text-sm font-medium sm:inline">
            Help
          </Link>
          {session ? (
            <>
              <Link href="/account" className="hidden text-sm font-medium sm:inline">
                Account
              </Link>
              <button type="button" className="hidden text-sm font-medium sm:inline" onClick={onLogout}>
                Log out
              </button>
            </>
          ) : (
            <>
              <Link href="/login" className="text-sm font-medium">
                Log in
              </Link>
              <Link href="/signup" className="hidden text-sm font-medium sm:inline">
                Sign up
              </Link>
            </>
          )}
          <button
            type="button"
            className="rounded-full bg-ink px-4 py-2 text-sm font-semibold text-card"
            onClick={() => cart.setOpen(true)}
          >
            Cart{cart.ready && cart.count > 0 ? ` ${cart.count}` : ""}
          </button>
        </div>
      </div>
      {menu ? (
        <div className="border-t border-line bg-paper px-5 py-4 lg:hidden">
          <form action="/search" className="mb-4">
            <label className="sr-only" htmlFor="mobile-search">
              Search
            </label>
            <input
              id="mobile-search"
              name="q"
              placeholder="Search"
              className="w-full rounded-full border border-line bg-card px-4 py-2.5 text-sm outline-none"
            />
          </form>
          <nav className="grid gap-1" aria-label="Mobile">
            {menus.map((entry) => (
              <div key={entry.label}>
                <div className="flex items-center justify-between">
                  <Link href={entry.href} className="rounded-xl px-2 py-3 text-lg font-semibold" onClick={close}>
                    {entry.label}
                  </Link>
                  <button
                    type="button"
                    className="rounded-full px-3 py-2 text-sm text-muted"
                    aria-expanded={open === entry.label}
                    onClick={() => setOpen((value) => (value === entry.label ? null : entry.label))}
                  >
                    {open === entry.label ? "Hide" : "More"}
                  </button>
                </div>
                {open === entry.label ? (
                  <div className="grid pb-2 pl-4">
                    {entry.items.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className="rounded-xl px-2 py-2 text-base text-ink/80"
                        onClick={close}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </div>
                ) : null}
              </div>
            ))}
            <Link href="/shop?sale=1" className="rounded-xl px-2 py-3 text-lg font-semibold text-peel" onClick={close}>
              Sale
            </Link>
            <Link href="/help" className="rounded-xl px-2 py-3 text-lg font-semibold" onClick={close}>
              Help
            </Link>
            {session ? (
              <>
                <Link href="/account" className="rounded-xl px-2 py-3 text-lg font-semibold" onClick={close}>
                  Account
                </Link>
                <button type="button" className="rounded-xl px-2 py-3 text-left text-lg font-semibold" onClick={onLogout}>
                  Log out
                </button>
              </>
            ) : (
              <>
                <Link href="/login" className="rounded-xl px-2 py-3 text-lg font-semibold" onClick={close}>
                  Log in
                </Link>
                <Link href="/signup" className="rounded-xl px-2 py-3 text-lg font-semibold" onClick={close}>
                  Sign up
                </Link>
              </>
            )}
          </nav>
        </div>
      ) : null}
    </header>
  );
}
