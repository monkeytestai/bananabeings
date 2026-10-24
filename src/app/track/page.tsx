import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = { title: "Track order" };

export default function TrackPage() {
  return (
    <div className="mx-auto max-w-xl px-5 py-14 sm:px-8">
      <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-muted">Orders</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-[-0.045em]">Track order</h1>
      <p className="mt-4 leading-7 text-muted">
        Shipment is in transit and scanning at the local depot. This is a demo shop, so nothing is charged and nothing will arrive.
      </p>
      <Link href="/shop" className="mt-8 inline-block text-sm underline">
        Back to the shop
      </Link>
    </div>
  );
}
