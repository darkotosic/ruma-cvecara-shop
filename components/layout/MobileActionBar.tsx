"use client";

import { useMemo } from "react";

import { useCurrentLocation } from "@/app/location-context";
import { useCartStore } from "@/store/cartStore";

export default function MobileActionBar() {
  const location = useCurrentLocation();
  const { items, openCart } = useCartStore();

  const primaryPhone = location.telefoni[0];
  const normalizedPhoneHref = useMemo(
    () => `tel:${primaryPhone.replace(/\s+/g, "")}`,
    [primaryPhone],
  );

  const cartCount = items.reduce((total, item) => total + item.quantity, 0);

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-primary-dark/10 bg-white/95 shadow-[0_-8px_30px_rgba(0,0,0,0.08)] backdrop-blur md:hidden">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <a
          href={normalizedPhoneHref}
          className="flex w-1/2 items-center justify-center gap-2 rounded-full bg-primary-dark px-4 py-3 text-sm font-semibold text-beige-light shadow"
          aria-label={`Pozovi cvećaru na broj ${primaryPhone}`}
        >
          ☎ Pozovi
        </a>
        <button
          type="button"
          onClick={openCart}
          className="flex w-1/2 items-center justify-center gap-2 rounded-full border border-primary-dark/15 bg-white px-4 py-3 text-sm font-semibold text-primary-dark shadow-sm"
          aria-label="Otvori korpu"
        >
          🧺 Korpa
          <span className="rounded-full bg-primary-dark px-2 py-1 text-xs font-semibold text-beige-light">
            {cartCount}
          </span>
        </button>
      </div>
    </div>
  );
}
