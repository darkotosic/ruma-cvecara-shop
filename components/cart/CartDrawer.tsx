"use client";

import Link from "next/link";
import { useMemo } from "react";

import { useCurrentLocation } from "@/app/location-context";
import { formatPrice } from "@/lib/format-price";
import { getDeliveryRange } from "@/lib/delivery";
import { useCartStore } from "@/store/cartStore";

export default function CartDrawer() {
  const location = useCurrentLocation();
  const { items, isOpen, closeCart, updateQuantity, removeItem } = useCartStore();

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const deliveryRange = getDeliveryRange(location);

  return (
    <div
      className={`fixed inset-0 z-50 transition ${
        isOpen ? "pointer-events-auto" : "pointer-events-none"
      }`}
      aria-hidden={!isOpen}
    >
      <div
        className={`absolute inset-0 bg-primary-dark/40 backdrop-blur-sm transition-opacity ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
        onClick={closeCart}
      />

      <aside
        className={`absolute right-0 top-0 h-full w-full max-w-md transform bg-white shadow-2xl transition duration-300 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-label="Pregled korpe"
      >
        <div className="flex items-center justify-between border-b border-primary-dark/10 px-6 py-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/60">Korpa</p>
            <h2 className="text-xl font-semibold text-primary-dark">Sažetak porudžbine</h2>
          </div>
          <button
            type="button"
            onClick={closeCart}
            className="rounded-full bg-beige-dark px-3 py-2 text-sm font-semibold text-primary-dark transition hover:bg-beige"
          >
            Zatvori ✕
          </button>
        </div>

        <div className="flex h-[calc(100%-200px)] flex-col overflow-hidden">
          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-3 px-6 text-center text-primary-dark/70">
              <p className="text-lg font-semibold text-primary-dark">Korpa je prazna</p>
              <p className="text-sm">Dodajte aranžman iz prodavnice i vidite kalkulaciju dostave.</p>
              <Link
                href="/shop"
                onClick={closeCart}
                className="rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-beige-light transition hover:bg-primary"
              >
                Idi na shop
              </Link>
            </div>
          ) : (
            <ul className="flex-1 space-y-4 overflow-y-auto px-6 py-4">
              {items.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start gap-4 rounded-2xl border border-primary-dark/10 bg-beige-light p-4"
                >
                  <div className="h-16 w-16 overflow-hidden rounded-xl bg-white">
                    {item.image ? (
                      <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center text-xs text-primary-dark/60">Bez slike</div>
                    )}
                  </div>
                  <div className="flex flex-1 flex-col gap-2 text-sm text-primary-dark">
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <p className="font-semibold text-primary-dark">{item.name}</p>
                        <p className="text-primary-dark/70">{formatPrice(item.price, "RSD")}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-xs font-semibold uppercase tracking-[0.12em] text-accent hover:underline"
                      >
                        Ukloni
                      </button>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-inner shadow-primary/10">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-7 w-7 rounded-full bg-beige-dark text-sm font-semibold text-primary-dark"
                        >
                          –
                        </button>
                        <span className="w-8 text-center text-base font-semibold">{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-7 w-7 rounded-full bg-primary-dark text-sm font-semibold text-beige-light"
                        >
                          +
                        </button>
                      </div>
                      <span className="font-semibold text-primary-dark">
                        {formatPrice(item.price * item.quantity, "RSD")}
                      </span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        <div className="space-y-3 border-t border-primary-dark/10 bg-white px-6 py-4">
          <div className="flex items-center justify-between text-sm text-primary-dark/80">
            <span>Osnovna suma</span>
            <span className="font-semibold text-primary-dark">{formatPrice(subtotal, "RSD")}</span>
          </div>
          <div className="flex items-center justify-between text-sm text-primary-dark/80">
            <span>Dostava po zoni</span>
            <span className="font-semibold text-primary-dark">
              od {formatPrice(deliveryRange.min, "RSD")} do {formatPrice(deliveryRange.max, "RSD")}
            </span>
          </div>
          <div className="grid gap-2 sm:grid-cols-2">
            <Link
              href="/cart"
              onClick={closeCart}
              className="rounded-full border border-primary-dark/20 px-4 py-3 text-center text-sm font-semibold text-primary-dark transition hover:bg-beige-dark"
            >
              Vidi korpu
            </Link>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="rounded-full bg-primary-dark px-4 py-3 text-center text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
            >
              Nastavi na checkout
            </Link>
          </div>
          <p className="text-xs text-primary-dark/60">
            Dostava se računa prema izabranoj zoni za lokaciju {location.naziv}. Promo kodovi se primenjuju u korpi ili na checkout-u.
          </p>
        </div>
      </aside>
    </div>
  );
}
