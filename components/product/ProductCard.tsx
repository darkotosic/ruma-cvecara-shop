"use client";

import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/lib/cms-types";

type ProductCardProps = {
  product: Product;
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
};

const statusStyles: Record<Product["status"], string> = {
  dostupno: "bg-primary/15 text-primary-dark border-primary-dark/20",
  nedostupno: "bg-accent/10 text-accent border-accent/20",
};

export default function ProductCard({ product, onAddToCart, onQuickView }: ProductCardProps) {
  const isAvailable = product.status === "dostupno";

  return (
    <article className="product-card flex h-full flex-col">
      <div className="product-card__image">
        <div
          className="product-card__image-primary"
          style={{ backgroundImage: `url(${product.glavnaSlika})` }}
          aria-hidden
        />
        <div
          className="product-card__image-secondary"
          style={{ backgroundImage: `url(${product.sekundarnaSlika})` }}
          aria-hidden
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {product.bedzevi.map((badge) => (
            <span
              key={badge}
              className="rounded-full bg-primary-dark px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-beige-light shadow"
            >
              {badge}
            </span>
          ))}
        </div>

        {product.bestSeller ? (
          <span className="absolute right-4 top-4 rounded-full bg-accent px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-white shadow">
            Best seller
          </span>
        ) : null}

        <span
          className={`absolute bottom-4 left-4 rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] ${statusStyles[product.status]}`}
        >
          {product.status === "dostupno" ? "Dostupno" : "Trenutno nedostupno"}
        </span>
      </div>

      <div className="product-card__body flex flex-1 flex-col gap-3">
        <div className="space-y-2">
          <h3 className="product-card__title">{product.naziv}</h3>
          <p className="text-sm text-primary-dark/70 line-clamp-2">{product.opis}</p>
          <div className="flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/60">
            <span className="rounded-full bg-beige-dark px-2 py-1">{product.kategorija}</span>
            <span className="rounded-full bg-beige-dark px-2 py-1">{product.boja}</span>
            <span className="rounded-full bg-beige-dark px-2 py-1">{product.tipBiljke}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 text-xs text-primary-dark/70">
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium">
            <span aria-hidden className="text-lg">↕</span> {product.dimenzije.visina} cm visina
          </span>
          <span className="flex items-center gap-1 rounded-full bg-primary/10 px-3 py-1 font-medium">
            <span aria-hidden className="text-lg">↔</span> {product.dimenzije.sirina} cm širina
          </span>
        </div>

        <div className="mt-auto flex flex-wrap items-center justify-between gap-3">
          <div className="space-y-1">
            <p className="product-card__price">{formatPrice(product.cena, product.valuta)}</p>
            <p className="text-xs text-primary-dark/60">Cena uključuje lokalnu dostavu</p>
          </div>
          <button
            type="button"
            onClick={() => onAddToCart(product)}
            disabled={!isAvailable}
            className="rounded-full bg-primary-dark px-4 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:bg-primary/40"
          >
            Dodaj u korpu
          </button>
        </div>

        <button
          type="button"
          onClick={() => onQuickView(product)}
          className="w-full rounded-full border border-primary-dark/15 bg-white px-4 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary-dark/30 hover:bg-beige-dark"
        >
          Brzi pregled
        </button>
      </div>
    </article>
  );
}
