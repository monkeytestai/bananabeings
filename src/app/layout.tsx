import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { CartDrawer } from "@/components/cart-drawer";
import { CartProvider } from "@/components/cart-provider";
import { MonkeyModeProvider } from "@/components/monkey-mode";
import { PlaceOrderBugScript } from "@/components/place-order-bug";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { getMonkeyMode } from "@/lib/monkeytest-mode.server";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Banana Beings — a line on every top",
    template: "%s — Banana Beings",
  },
  description:
    "Soft apparel with a line on every top: casual, work, and sport. A demo shop: nothing is charged or shipped.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const mode = await getMonkeyMode();
  return (
    <html lang="en">
      <body className={`${manrope.className} antialiased`} data-monkeytest-mode={mode}>
        <PlaceOrderBugScript />
        <MonkeyModeProvider mode={mode}>
          <CartProvider>
            <SiteHeader />
            <main id="main">{children}</main>
            <SiteFooter mode={mode} />
            <CartDrawer />
          </CartProvider>
        </MonkeyModeProvider>
      </body>
    </html>
  );
}
