"use client";

import Link from "next/link";
import { FormEvent, useMemo, useState } from "react";

import { useCurrentLocation } from "../location-context";
import { formatPrice } from "@/lib/format-price";
import { getDeliveryCost, getDeliverySlots } from "@/lib/delivery";
import { validatePromoCode } from "@/data/promo-codes";
import { useCartStore } from "@/store/cartStore";

export default function CheckoutPage() {
  const location = useCurrentLocation();
  const { items, clearCart } = useCartStore();

  const [selectedZone, setSelectedZone] = useState(location.zone_dostave[0]?.naziv);
  const [selectedSlot, setSelectedSlot] = useState(getDeliverySlots(location)[0]);
  const [promoInput, setPromoInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<{ code: string; discount: number } | null>(null);
  const [promoMessage, setPromoMessage] = useState<string | null>(null);
  const [statusMessage, setStatusMessage] = useState<string | null>(null);
  const [paymentMethod, setPaymentMethod] = useState("pouzecem");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    [items],
  );

  const promoFromSubtotal = useMemo(() => {
    if (!appliedPromo) return null;

    const result = validatePromoCode(appliedPromo.code, subtotal);
    return result.valid ? { code: result.code ?? appliedPromo.code, discount: result.discount } : null;
  }, [appliedPromo, subtotal]);

  const delivery = getDeliveryCost(location, selectedZone);
  const discount = promoFromSubtotal?.discount ?? 0;
  const total = subtotal + delivery - discount;

  const handlePromoApply = () => {
    const result = validatePromoCode(promoInput, subtotal);
    setPromoMessage(result.message);

    if (result.valid && result.code) {
      setAppliedPromo({ code: result.code, discount: result.discount });
    } else {
      setAppliedPromo(null);
    }
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setIsSubmitting(true);
    setStatusMessage(null);

    const formData = new FormData(event.currentTarget);

    const customer = {
      imePrezime: String(formData.get("imePrezime") ?? ""),
      email: String(formData.get("email") ?? ""),
      telefon: String(formData.get("telefon") ?? ""),
      adresa: String(formData.get("adresa") ?? ""),
      napomena: formData.get("napomena") ? String(formData.get("napomena")) : "",
      termin: selectedSlot,
    };

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({ id: item.id, quantity: item.quantity })),
          locationSlug: location.slug,
          deliveryZone: selectedZone,
          promoCode: promoFromSubtotal?.code,
          customer,
          paymentMethod,
        }),
      });

      const json = await response.json();

      if (!response.ok) {
        setStatusMessage(json.message ?? "Došlo je do greške pri slanju porudžbine.");
        setIsSubmitting(false);
        return;
      }

      setStatusMessage(json.message ?? "Porudžbina je uspešno poslata.");
      clearCart();
    } catch (error) {
      console.error(error);
      setStatusMessage("Nije uspelo slanje porudžbine. Proverite konekciju i pokušajte ponovo.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
        <div className="mx-auto max-w-4xl px-6 text-center">
          <h1 className="text-3xl font-semibold text-primary-dark">Korpa je prazna</h1>
          <p className="mt-2 text-primary-dark/70">Dodajte proizvode pre nego što nastavite checkout.</p>
          <Link
            href="/shop"
            className="mt-4 inline-block rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
          >
            Pogledaj proizvode
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <nav aria-label="Navigacija mrvice" className="mb-6 flex items-center gap-2 text-sm text-primary-dark/70">
          <Link href="/" className="font-semibold text-primary-dark hover:text-primary">
            Početna
          </Link>
          <span className="text-primary-dark/40">/</span>
          <Link href="/cart" className="font-semibold text-primary-dark hover:text-primary">
            Korpa
          </Link>
          <span className="text-primary-dark/40">/</span>
          <span className="font-semibold text-primary-dark">Checkout</span>
        </nav>

        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark/60">Checkout</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Podaci za dostavu i plaćanje</h1>
            <p className="text-primary-dark/80">Prikaz termina dostave i primena promo koda pre kreiranja porudžbine.</p>
          </div>
          <Link
            href="/cart"
            className="rounded-full border border-primary-dark/15 bg-white px-4 py-2 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-beige-dark"
          >
            ← Nazad na korpu
          </Link>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.3fr_0.7fr]">
          <form onSubmit={handleSubmit} className="space-y-6 rounded-3xl bg-white p-6 shadow-card">
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-1 text-sm font-semibold text-primary-dark">
                Ime i prezime
                <input
                  type="text"
                  name="imePrezime"
                  required
                  className="mt-1 w-full rounded-2xl border border-primary-dark/15 bg-beige-light px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
                  placeholder="Unesite ime i prezime"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-primary-dark">
                Email
                <input
                  type="email"
                  name="email"
                  required
                  className="mt-1 w-full rounded-2xl border border-primary-dark/15 bg-beige-light px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
                  placeholder="primer@mail.com"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-primary-dark">
                Telefon
                <input
                  type="tel"
                  name="telefon"
                  required
                  className="mt-1 w-full rounded-2xl border border-primary-dark/15 bg-beige-light px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
                  placeholder="+381 60 123 4567"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-primary-dark">
                Adresa dostave
                <input
                  type="text"
                  name="adresa"
                  required
                  className="mt-1 w-full rounded-2xl border border-primary-dark/15 bg-beige-light px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
                  placeholder="Ulica i broj"
                />
              </label>
              <label className="space-y-1 text-sm font-semibold text-primary-dark sm:col-span-2">
                Napomena za cvećaru
                <textarea
                  name="napomena"
                  rows={3}
                  className="mt-1 w-full rounded-2xl border border-primary-dark/15 bg-beige-light px-3 py-2 text-primary-dark focus:border-primary focus:outline-none"
                  placeholder="Npr. ostaviti kod komšije ako nije kod kuće"
                />
              </label>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2 rounded-2xl bg-beige-dark p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Zona dostave</p>
                <div className="space-y-3">
                  {location.zone_dostave.map((zone) => (
                    <label
                      key={zone.naziv}
                      className="flex items-center justify-between rounded-xl border border-primary-dark/10 bg-white px-3 py-2 text-sm text-primary-dark"
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
                        <span className="font-semibold">{zone.naziv}</span>
                      </div>
                      <span className="font-semibold">{formatPrice(getDeliveryCost(location, zone.naziv), "RSD")}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="space-y-2 rounded-2xl bg-beige-dark p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Termin dostave</p>
                <div className="grid gap-2">
                  {getDeliverySlots(location).map((slot) => (
                    <label
                      key={slot}
                      className="flex items-center justify-between rounded-xl border border-primary-dark/10 bg-white px-3 py-2 text-sm text-primary-dark"
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="termin"
                          value={slot}
                          checked={selectedSlot === slot}
                          onChange={() => setSelectedSlot(slot)}
                          className="h-4 w-4 border-primary-dark text-primary-dark focus:ring-primary"
                        />
                        <span className="font-semibold">{slot}</span>
                      </div>
                      <span className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">Prioritetna dostava</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
              <div className="space-y-2 rounded-2xl bg-beige-dark p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Promo kod</p>
                <div className="flex flex-wrap items-center gap-3">
                  <input
                    type="text"
                    value={promoInput}
                    onChange={(event) => setPromoInput(event.target.value)}
                    className="flex-1 rounded-full border border-primary-dark/15 bg-white px-3 py-2 text-sm text-primary-dark focus:border-primary focus:outline-none"
                    placeholder="Unesite kod"
                  />
                  <button
                    type="button"
                    onClick={handlePromoApply}
                    className="rounded-full bg-primary-dark px-4 py-2 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
                  >
                    Primeni
                  </button>
                </div>
                {promoMessage ? <p className="text-xs text-primary-dark/70">{promoMessage}</p> : null}
              </div>

              <div className="space-y-2 rounded-2xl bg-beige-dark p-4">
                <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Način plaćanja</p>
                <div className="space-y-2 text-sm font-semibold text-primary-dark">
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="placanje"
                      value="pouzecem"
                      checked={paymentMethod === "pouzecem"}
                      onChange={() => setPaymentMethod("pouzecem")}
                      className="h-4 w-4 border-primary-dark text-primary-dark focus:ring-primary"
                    />
                    Plaćanje pouzećem
                  </label>
                  <label className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="placanje"
                      value="uplata"
                      checked={paymentMethod === "uplata"}
                      onChange={() => setPaymentMethod("uplata")}
                      className="h-4 w-4 border-primary-dark text-primary-dark focus:ring-primary"
                    />
                    Uplata na račun (instrukcije na email i SMS)
                  </label>
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-full bg-primary-dark px-5 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:bg-primary/50"
            >
              {isSubmitting ? "Slanje porudžbine..." : "Pošalji porudžbinu"}
            </button>
            {statusMessage ? <p className="text-sm text-primary-dark/80">{statusMessage}</p> : null}
          </form>

          <aside className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
            <div className="space-y-1">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Sažetak</p>
              <h2 className="text-xl font-semibold text-primary-dark">Pregled porudžbine</h2>
              <p className="text-sm text-primary-dark/70">Izabrani aranžmani, dostava i popust.</p>
            </div>
            <ul className="divide-y divide-primary-dark/10 rounded-2xl border border-primary-dark/10">
              {items.map((item) => (
                <li key={item.id} className="flex items-center justify-between px-4 py-3 text-sm text-primary-dark">
                  <div>
                    <p className="font-semibold">{item.name}</p>
                    <p className="text-primary-dark/60">Količina: {item.quantity}</p>
                  </div>
                  <span className="font-semibold">{formatPrice(item.price * item.quantity, "RSD")}</span>
                </li>
              ))}
            </ul>

            <div className="space-y-2 rounded-2xl bg-beige-dark p-4 text-sm text-primary-dark">
              <div className="flex items-center justify-between">
                <span>Osnovna suma</span>
                <span className="font-semibold">{formatPrice(subtotal, "RSD")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Dostava ({selectedZone})</span>
                <span className="font-semibold">{formatPrice(delivery, "RSD")}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Promo popust</span>
                <span className="font-semibold text-primary-dark">- 
                  {discount > 0 ? formatPrice(discount, "RSD") : formatPrice(0, "RSD")}
                </span>
              </div>
              <div className="flex items-center justify-between text-base font-semibold text-primary-dark">
                <span>Ukupno</span>
                <span>{formatPrice(total, "RSD")}</span>
              </div>
            </div>

            <div className="rounded-2xl bg-primary/10 p-4 text-sm text-primary-dark">
              <p className="font-semibold">Plaćanje pouzećem ili uplatom na račun</p>
              <p className="text-primary-dark/70">
                Nakon potvrde, instrukcije za plaćanje šaljemo na email i SMS broj koje ste uneli. Dostava zavisi od izabrane zone i termina.
              </p>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
