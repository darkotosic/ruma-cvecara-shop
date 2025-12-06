"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import SmartImage from "@/components/common/SmartImage";
import { useCurrentLocation } from "../location-context";
import { formatPrice } from "@/lib/format-price";
import { getDeliveryCost } from "@/lib/delivery";
import { useCartStore } from "@/store/cartStore";

export default function CartPage() {
  const location = useCurrentLocation();
  const { items, updateQuantity, removeItem } = useCartStore();
  const [selectedZone, setSelectedZone] = useState(location.zone_dostave[0]?.naziv);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );
  const delivery = getDeliveryCost(location, selectedZone);
  const total = subtotal + delivery;

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <nav aria-label="Navigacija mrvice" className="mb-6 flex items-center gap-2 text-sm text-primary-dark/70">
          <Link href="/" className="font-semibold text-primary-dark hover:text-primary">
            Početna
          </Link>
          <span className="text-primary-dark/40">/</span>
          <span className="font-semibold text-primary-dark">Korpa</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark/60">Pregled korpe</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Porudžbine za {location.naziv}</h1>
            <p className="text-primary-dark/80">Proverite proizvode, količine i zonu dostave pre nastavka checkout-a.</p>
          </div>
          <Link
            href="/shop"
            className="rounded-full border border-primary-dark/15 bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-beige-dark"
          >
            ← Nazad na shop
          </Link>
        </div>

        {items.length === 0 ? (
          <div className="mt-8 rounded-3xl bg-white p-8 text-center shadow-card">
            <p className="text-lg font-semibold text-primary-dark">Još nema proizvoda u korpi.</p>
            <p className="text-primary-dark/70">Dodajte aranžman i odmah izračunajte dostavu.</p>
            <Link
              href="/shop"
              className="mt-4 inline-block rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-beige-light transition hover:bg-primary"
            >
              Pogledaj proizvode
            </Link>
          </div>
        ) : (
          <div className="mt-8 grid gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-primary-dark">Proizvodi</h2>
                <p className="text-sm text-primary-dark/70">Osnovna suma: {formatPrice(subtotal, "RSD")}</p>
              </div>
              <ul className="space-y-4">
                {items.map((item) => (
                  <li
                    key={item.id}
                    className="flex flex-wrap items-center gap-4 rounded-2xl border border-primary-dark/10 bg-beige-light p-4"
                  >
                    <div className="h-20 w-20 overflow-hidden rounded-2xl bg-white">
                      {item.image ? (
                        <SmartImage
                          src={item.image}
                          alt={`Fotografija aranžmana ${item.name} iz korpe`}
                          width={80}
                          height={80}
                          variant="card"
                        />
                      ) : (
                        <div className="flex h-full w-full items-center justify-center text-xs text-primary-dark/60">Bez slike</div>
                      )}
                    </div>
                    <div className="flex min-w-[240px] flex-1 flex-col gap-2 text-sm text-primary-dark">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold">{item.name}</p>
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
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div className="flex items-center gap-3 rounded-full bg-white px-3 py-2 shadow-inner shadow-primary/10">
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="h-8 w-8 rounded-full bg-beige-dark text-lg font-semibold text-primary-dark"
                          >
                            –
                          </button>
                          <span className="w-10 text-center text-base font-semibold">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="h-8 w-8 rounded-full bg-primary-dark text-lg font-semibold text-beige-light"
                          >
                            +
                          </button>
                        </div>
                        <span className="text-base font-semibold text-primary-dark">
                          {formatPrice(item.price * item.quantity, "RSD")}
                        </span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
              <div className="space-y-1">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Zona dostave</p>
                <h2 className="text-xl font-semibold text-primary-dark">Odaberi adresu za {location.naziv}</h2>
                <p className="text-sm text-primary-dark/70">Cene su sa uračunatim lokalnim dodatkom za dostavu.</p>
              </div>
              <div className="space-y-3">
                {location.zone_dostave.map((zone) => (
                  <label
                    key={zone.naziv}
                    className="flex items-center justify-between rounded-2xl border border-primary-dark/10 bg-beige-light px-4 py-3 text-sm text-primary-dark"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="zona"
                        value={zone.naziv}
                        checked={selectedZone === zone.naziv}
                        onChange={() => setSelectedZone(zone.naziv)}
                        className="h-4 w-4 border-primary-dark text-primary-dark focus:ring-primary"
                      />
                      <div>
                        <p className="font-semibold">{zone.naziv}</p>
                        <p className="text-xs text-primary-dark/70">Dostava u roku od 3-5 sati</p>
                      </div>
                    </div>
                    <span className="font-semibold">{formatPrice(getDeliveryCost(location, zone.naziv), "RSD")}</span>
                  </label>
                ))}
              </div>

              <div className="space-y-2 rounded-2xl bg-beige-dark p-4 text-sm text-primary-dark">
                <div className="flex items-center justify-between">
                  <span>Osnovna suma</span>
                  <span className="font-semibold">{formatPrice(subtotal, "RSD")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Dostava ({selectedZone})</span>
                  <span className="font-semibold">{formatPrice(delivery, "RSD")}</span>
                </div>
                <div className="flex items-center justify-between text-base font-semibold text-primary-dark">
                  <span>Ukupno</span>
                  <span>{formatPrice(total, "RSD")}</span>
                </div>
              </div>

              <Link
                href="/checkout"
                className="block rounded-full bg-primary-dark px-5 py-3 text-center text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
              >
                Nastavi na checkout
              </Link>
              <p className="text-xs text-primary-dark/70">
                Tokom checkout-a birate termin dostave i unosite podatke o primalcu. Plaćanje je moguće pouzećem ili uplatom na račun.
              </p>
            </aside>
          </div>
        )}
      </div>
    </div>
  );
}
