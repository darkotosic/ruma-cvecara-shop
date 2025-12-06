"use client";

import { formatPrice } from "@/lib/format-price";
import type { Product } from "@/lib/cms-types";

function InfoBadge({ label }: { label: string }) {
  return <span className="rounded-full bg-beige-dark px-3 py-1 text-xs font-semibold text-primary-dark">{label}</span>;
}

type ProductQuickViewModalProps = {
  product: Product | null;
  open: boolean;
  onClose: () => void;
  onAddToCart: (product: Product) => void;
};

export default function ProductQuickViewModal({ product, open, onClose, onAddToCart }: ProductQuickViewModalProps) {
  if (!open || !product) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary-dark/30 px-4 py-10 backdrop-blur-sm">
      <div className="relative w-full max-w-4xl overflow-hidden rounded-3xl bg-white shadow-2xl">
        <button
          type="button"
          className="absolute right-4 top-4 rounded-full bg-white/80 p-2 text-primary-dark shadow"
          aria-label="Zatvori brzi pregled"
          onClick={onClose}
        >
          ✕
        </button>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-3 p-6">
            <div className="relative h-72 overflow-hidden rounded-2xl bg-beige-light">
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url(${product.glavnaSlika})` }}
                aria-hidden
              />
              <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                {product.bedzevi.map((badge) => (
                  <InfoBadge key={badge} label={badge} />
                ))}
                {product.bestSeller ? <InfoBadge label="Top izbor" /> : null}
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-primary-dark/70">
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-[0.12em]">{product.status}</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-[0.12em]">{product.kategorija}</span>
              <span className="rounded-full bg-primary/10 px-3 py-1 font-semibold uppercase tracking-[0.12em]">{product.boja}</span>
            </div>
          </div>

          <div className="flex flex-col gap-4 p-6">
            <div className="space-y-2">
              <p className="text-sm font-semibold uppercase tracking-[0.16em] text-primary-dark/60">Brzi pregled</p>
              <h3 className="text-2xl font-semibold text-primary-dark">{product.naziv}</h3>
              <p className="text-sm text-primary-dark/80">{product.opis}</p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-sm text-primary-dark/80">
              <div className="rounded-2xl bg-beige-dark px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">Povodi</p>
                <p className="mt-1 font-medium">{product.povodi.join(", ")}</p>
              </div>
              <div className="rounded-2xl bg-beige-dark px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">Dimenzije</p>
                <p className="mt-1 font-medium">
                  {product.dimenzije.sirina} x {product.dimenzije.visina} cm
                </p>
              </div>
              <div className="rounded-2xl bg-beige-dark px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">Tip biljke</p>
                <p className="mt-1 font-medium">{product.tipBiljke}</p>
              </div>
              <div className="rounded-2xl bg-beige-dark px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">Dostupnost</p>
                <p className="mt-1 font-medium">{product.status === "dostupno" ? "Na stanju" : "Na upit"}</p>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-3xl font-semibold text-primary-dark">{formatPrice(product.cena, product.valuta)}</p>
                <p className="text-xs text-primary-dark/70">Cena za brzu dostavu u vašem gradu</p>
              </div>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => onAddToCart(product)}
                  className="rounded-full bg-primary-dark px-5 py-3 text-sm font-semibold text-beige-light shadow transition hover:bg-primary-dark/90"
                >
                  Dodaj u korpu
                </button>
                <button
                  type="button"
                  onClick={onClose}
                  className="rounded-full border border-primary-dark/20 px-5 py-3 text-sm font-semibold text-primary-dark transition hover:bg-beige-dark"
                >
                  Zatvori
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
