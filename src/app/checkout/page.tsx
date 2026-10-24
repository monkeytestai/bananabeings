"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { ApplyCoupon } from "@/components/apply-coupon";
import { useCart } from "@/components/cart-provider";
import { useMonkeyMode } from "@/components/monkey-mode";
import { inr } from "@/lib/money";
import { saveOrder } from "@/lib/order";

export default function CheckoutPage() {
  const cart = useCart();
  const mode = useMonkeyMode();
  const router = useRouter();
  const [error, setError] = useState("");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (mode === "buggy") {
      window.setTimeout(() => {
        throw new Error("save failed");
      }, 0);
      return;
    }
    if (cart.items.length === 0) {
      setError("Your cart is empty.");
      return;
    }
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") || "").trim();
    const email = String(data.get("email") || "").trim();
    const city = String(data.get("city") || "").trim();
    if (!name || !email || !city) {
      setError("Name, email, and city are required.");
      return;
    }
    const id = `BB-${Math.floor(1000 + Math.random() * 9000)}`;
    saveOrder({
      id,
      name,
      email,
      city,
      total: cart.subtotal,
      items: cart.items.map((item) => ({
        name: item.name,
        color: item.color,
        size: item.size,
        qty: item.qty,
        price: item.price,
      })),
    });
    cart.clear();
    router.push("/checkout/confirmed");
  }

  return (
    <div className="mx-auto grid max-w-5xl gap-10 px-5 py-12 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
      <div>
        <h1 className="text-4xl font-semibold tracking-[-0.045em]">Checkout</h1>
        <p className="mt-3 text-sm leading-6 text-muted">
          Demo checkout. We don’t take payment and we don’t ship. You’ll get an order number on the next screen so the flow feels real.
        </p>
        <form className="mt-8 grid gap-4" onSubmit={onSubmit}>
          <Field label="Name" name="name" autoComplete="name" />
          <Field label="Email" name="email" type="email" autoComplete="email" />
          <Field label="Phone" name="phone" autoComplete="tel" />
          <Field label="Address" name="address" autoComplete="street-address" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="City" name="city" autoComplete="address-level2" />
            <Field label="PIN code" name="pin" autoComplete="postal-code" />
          </div>
          <fieldset className="rounded-2xl border border-line bg-card p-4">
            <legend className="px-1 text-sm font-semibold">Payment</legend>
            <label className="mt-2 flex items-center gap-2 text-sm">
              <input type="radio" name="pay" defaultChecked readOnly />
              Demo — no charge
            </label>
          </fieldset>
          <ApplyCoupon />
          {error ? <p className="text-sm text-peel">{error}</p> : null}
          <button
            type="submit"
            id="place-order"
            data-testid="place-order"
            className="rounded-full bg-ink py-3 text-sm font-semibold text-card"
          >
            Place order
          </button>
        </form>
      </div>
      <aside className="h-fit rounded-3xl border border-line bg-card p-6">
        <h2 className="font-semibold">Your tees</h2>
        {cart.items.length === 0 ? (
          <p className="mt-4 text-sm text-muted">
            Cart is empty. <Link href="/shop" className="underline">Shop first.</Link>
          </p>
        ) : (
          <ul className="mt-4 space-y-3 text-sm">
            {cart.items.map((item) => (
              <li key={item.key} className="flex justify-between gap-3">
                <span>
                  {item.name}
                  <span className="block text-muted">
                    {item.color} / {item.size} × {item.qty}
                  </span>
                </span>
                <span>{inr(item.price * item.qty)}</span>
              </li>
            ))}
          </ul>
        )}
        <div className="mt-4 flex justify-between border-t border-line pt-4 font-semibold">
          <span>Total</span>
          <span>{inr(cart.subtotal)}</span>
        </div>
      </aside>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  autoComplete,
}: {
  label: string;
  name: string;
  type?: string;
  autoComplete?: string;
}) {
  return (
    <label className="block text-sm font-medium">
      {label}
      <input
        name={name}
        type={type}
        autoComplete={autoComplete}
        className="mt-1 w-full rounded-xl border border-line bg-card px-3 py-2.5 font-normal outline-none ring-banana focus:ring-2"
      />
    </label>
  );
}
