"use client";

import { useState } from "react";
import { useMonkeyMode } from "@/components/monkey-mode";

export function ApplyCoupon() {
  const mode = useMonkeyMode();
  const [message, setMessage] = useState("");
  const buggy = mode === "buggy";

  return (
    <div className="mt-4">
      <div className="flex gap-2">
        <label className="sr-only" htmlFor="coupon-code">
          Coupon code
        </label>
        <input
          id="coupon-code"
          name="coupon"
          data-testid="coupon-code"
          placeholder="Coupon code"
          autoComplete="off"
          className="w-full rounded-xl border border-line bg-card px-3 py-2.5 text-sm font-normal outline-none ring-banana focus:ring-2"
        />
        <button
          type="button"
          id="apply-coupon"
          data-testid="apply-coupon"
          disabled={buggy}
          className="shrink-0 rounded-full border border-line px-4 py-2.5 text-sm font-semibold disabled:cursor-not-allowed disabled:opacity-40"
          onClick={() => setMessage("Coupon applied")}
        >
          Apply coupon
        </button>
      </div>
      {message ? (
        <p className="mt-2 text-sm text-leaf" data-testid="coupon-status">
          {message}
        </p>
      ) : null}
    </div>
  );
}
