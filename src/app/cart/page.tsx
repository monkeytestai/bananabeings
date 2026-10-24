"use client";

import Link from "next/link";
import { ApplyCoupon } from "@/components/apply-coupon";
import { useCart } from "@/components/cart-provider";
import { inr } from "@/lib/money";

export default function CartPage() {
  const cart = useCart();

  return (
    <div className="mx-auto max-w-3xl px-5 py-12 sm:px-8">
      <h1 className="text-4xl font-semibold tracking-[-0.045em]">Cart</h1>
      {!cart.ready ? (
        <p className="mt-6 text-muted">Loading your cart…</p>
      ) : cart.items.length === 0 ? (
        <div className="mt-10">
          <p>Your cart is empty.</p>
          <Link href="/shop" className="mt-6 inline-block rounded-full bg-ink px-5 py-2.5 text-sm font-semibold text-card">
            Shop tees
          </Link>
        </div>
      ) : (
        <>
          <ul className="mt-8 divide-y divide-line">
            {cart.items.map((item) => (
              <li key={item.key} className="flex items-center gap-4 py-4">
                {item.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={item.image} alt="" className="h-20 w-16 object-cover" />
                ) : (
                  <span className="h-14 w-14 border border-line" style={{ background: item.hex }} />
                )}
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{item.name}</p>
                  <p className="text-sm text-muted">
                    {item.color} / {item.size}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => cart.setQty(item.key, item.qty - 1)} aria-label="Decrease">
                    −
                  </button>
                  <span className="w-4 text-center text-sm">{item.qty}</span>
                  <button type="button" className="h-8 w-8 rounded-full border border-line" onClick={() => cart.setQty(item.key, item.qty + 1)} aria-label="Increase">
                    +
                  </button>
                </div>
                <p className="w-20 text-right text-sm font-semibold">{inr(item.price * item.qty)}</p>
              </li>
            ))}
          </ul>
          <div className="mt-6 flex items-center justify-between">
            <span>Subtotal</span>
            <span className="text-xl font-semibold">{inr(cart.subtotal)}</span>
          </div>
        </>
      )}
      <ApplyCoupon />
      {cart.ready && cart.items.length > 0 ? (
        <Link href="/checkout" className="mt-6 block rounded-full bg-ink py-3 text-center text-sm font-semibold text-card">
          Checkout
        </Link>
      ) : null}
    </div>
  );
}
