"use client";

import { useMemo } from "react";

import { useCurrentLocation } from "@/app/location-context";
import { formatPrice } from "@/lib/format-price";
import { getDeliveryRange, getDeliverySlots } from "@/lib/delivery";
import type { Product } from "@/lib/cms-types";
import { useCartStore } from "@/store/cartStore";

type Props = {
  product: Product;
};

export default function ProductPurchaseActions({ product }: Props) {
  const location = useCurrentLocation();
  const { addItem, openCart } = useCartStore();

  const range = useMemo(() => getDeliveryRange(location), [location]);
  const slotovi = useMemo(() => getDeliverySlots(location), [location]);

  const handleAdd = () => {
    if (product.status !== "dostupno") return;

    addItem({
      id: product.id,
      name: product.naziv,
      price: product.cena,
      quantity: 1,
      image: product.glavnaSlika,
    });
    openCart();
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <p className="text-2xl font-semibold text-primary-dark">{formatPrice(product.cena, product.valuta)}</p>
          <p className="text-sm text-primary-dark/70">Cena uključuje osnovnu dostavu za dostupne zone.</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            className="rounded-full bg-primary-dark px-5 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:bg-primary/40"
            onClick={handleAdd}
            disabled={product.status !== "dostupno"}
            type="button"
          >
            Dodaj u korpu
          </button>
          <button className="rounded-full border border-primary-dark/15 px-5 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-beige-dark" type="button">
            Sačuvaj želju
          </button>
        </div>
      </div>

      <div className="grid gap-3 rounded-2xl border border-primary-dark/10 bg-beige-dark p-4 text-sm text-primary-dark">
        <div className="flex items-center justify-between">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Dostava za {location.naziv}</p>
          <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary-dark">
            {range.min === range.max
              ? `Fiksno ${formatPrice(range.min, "RSD")}`
              : `${formatPrice(range.min, "RSD")} - ${formatPrice(range.max, "RSD")}`}
          </span>
        </div>
        <p className="text-primary-dark/80">
          Zone su preuzete iz aktuelnog rasporeda dostave. Cena uključuje lokalni dodatak od {Math.round(location.porez_dostava * 100)}%.
        </p>
        <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.12em]">
          {slotovi.map((slot) => (
            <span key={slot} className="rounded-full bg-white px-3 py-2 text-primary-dark shadow-sm">
              Termin: {slot}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
