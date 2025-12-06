import { NextResponse } from "next/server";

import { locations, defaultLocation } from "@/config/locations";
import { productsMock } from "@/data/products.mock";
import { validatePromoCode } from "@/data/promo-codes";
import { getDeliveryCost } from "@/lib/delivery";

export async function POST(request: Request) {
  const body = await request.json();

  const { items, promoCode, locationSlug, deliveryZone, customer, paymentMethod } = body;

  if (!items || !Array.isArray(items) || items.length === 0) {
    return NextResponse.json({ success: false, message: "Korpa je prazna." }, { status: 400 });
  }

  const location = locations.find((entry) => entry.slug === locationSlug) ?? defaultLocation;

  const enrichedItems = [] as { id: string; quantity: number; name: string; price: number; valuta: string }[];

  for (const item of items as { id: string; quantity: number }[]) {
    const product = productsMock.find((candidate) => candidate.id === item.id);

    if (!product) {
      return NextResponse.json({ success: false, message: `Proizvod ${item.id} ne postoji.` }, { status: 400 });
    }

    if (product.status !== "dostupno") {
      return NextResponse.json(
        { success: false, message: `Proizvod ${product.naziv} trenutno nije dostupan.` },
        { status: 400 },
      );
    }

    enrichedItems.push({
      ...item,
      name: product.naziv,
      price: product.cena,
      valuta: product.valuta,
    });
  }

  const subtotal = enrichedItems.reduce((sum: number, item: { price: number; quantity: number }) => sum + item.price * item.quantity, 0);
  const deliveryCost = getDeliveryCost(location, deliveryZone);
  const promoResult = promoCode ? validatePromoCode(promoCode, subtotal) : { valid: false, discount: 0 };

  if (promoCode && !promoResult.valid) {
    return NextResponse.json({ success: false, message: promoResult.message }, { status: 400 });
  }

  const discount = promoResult.valid ? promoResult.discount : 0;
  const total = subtotal + deliveryCost - discount;

  const orderId = `MOCK-${Date.now()}`;

  const response = {
    success: true,
    orderId,
    totals: {
      subtotal,
      delivery: deliveryCost,
      discount,
      total,
    },
    delivery: {
      zone: deliveryZone ?? location.zone_dostave[0]?.naziv,
      price: deliveryCost,
    },
    message:
      "Porudžbina je zabeležena. Ubrzo šaljemo potvrdu sa instrukcijama za plaćanje pouzećem ili uplatom na račun na ostavljeni email i broj telefona.",
    customer,
    paymentMethod: paymentMethod ?? "pouzecem",
  };

  return NextResponse.json(response);
}
