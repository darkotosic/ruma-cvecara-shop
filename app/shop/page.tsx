"use client";

import Link from "next/link";
import { useMemo, useState } from "react";

import ProductGrid from "@/components/product/ProductGrid";
import ProductQuickViewModal from "@/components/product/ProductQuickViewModal";
import FiltersSidebar from "@/components/shop/FiltersSidebar";
import { productsMock } from "@/data/products.mock";
import type { Product, ProductFilters } from "@/lib/cms-types";
import { useCurrentLocation } from "../location-context";
import { useCartStore } from "@/store/cartStore";

const PAGE_SIZE = 9;

export default function ShopPage() {
  const location = useCurrentLocation();
  const [filters, setFilters] = useState<ProductFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { addItem, openCart } = useCartStore();

  const locationProducts = useMemo(
    () => productsMock.filter((product) => product.gradovi.includes(location.slug)),
    [location.slug],
  );

  const priceBounds = useMemo(() => {
    const prices = locationProducts.map((product) => product.cena);

    if (prices.length === 0) {
      return { min: 0, max: 0 };
    }

    const min = Math.min(...prices);
    const max = Math.max(...prices);

    return { min, max };
  }, [locationProducts]);

  const availableOptions = useMemo(
    () => ({
      povodi: Array.from(new Set(locationProducts.flatMap((product) => product.povodi))),
      boje: Array.from(new Set(locationProducts.map((product) => product.boja))),
      tipovi: Array.from(new Set(locationProducts.map((product) => product.tipBiljke))),
      statusi: ["dostupno", "nedostupno"] as const,
    }),
    [locationProducts],
  );

  const filteredProducts = useMemo(() => {
    const minCena = filters.minCena ?? priceBounds.min;
    const maxCena = filters.maxCena ?? priceBounds.max;

    return locationProducts.filter((product) => {
      const matchesPrice = product.cena >= minCena && product.cena <= maxCena;
      const matchesPovod = filters.povod ? product.povodi.includes(filters.povod) : true;
      const matchesBoja = filters.boja ? product.boja === filters.boja : true;
      const matchesTip = filters.tipBiljke ? product.tipBiljke === filters.tipBiljke : true;
      const matchesStatus = filters.status ? product.status === filters.status : true;

      return matchesPrice && matchesPovod && matchesBoja && matchesTip && matchesStatus;
    });
  }, [
    filters.boja,
    filters.minCena,
    filters.maxCena,
    filters.povod,
    filters.status,
    filters.tipBiljke,
    locationProducts,
    priceBounds.max,
    priceBounds.min,
  ]);

  const pageCount = Math.max(1, Math.ceil(filteredProducts.length / PAGE_SIZE));
  const currentSlice = filteredProducts.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);

  const handleFilterChange = (nextFilters: ProductFilters) => {
    setFilters(nextFilters);
    setCurrentPage(1);
  };

  const handleResetFilters = () => {
    setFilters({ minCena: priceBounds.min, maxCena: priceBounds.max });
    setCurrentPage(1);
  };

  const handlePagination = (direction: "prev" | "next") => {
    setCurrentPage((prev) => {
      if (direction === "prev") {
        return Math.max(1, prev - 1);
      }

      return Math.min(pageCount, prev + 1);
    });
  };

  const handleAddToCart = (product: Product) => {
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
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <nav aria-label="Navigacija mrvice" className="mb-6 flex items-center gap-2 text-sm text-primary-dark/70">
          <Link href="/" className="font-semibold text-primary-dark hover:text-primary">
            Početna
          </Link>
          <span className="text-primary-dark/40">/</span>
          <span className="font-semibold text-primary-dark">Shop</span>
        </nav>

        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-1">
            <p className="text-xs font-semibold uppercase tracking-[0.16em] text-primary-dark/60">Kolekcija</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Online cvetni studio</h1>
            <p className="text-primary-dark/80">
              Filtriraj po povodu, boji ili budžetu i naruči direktno iz grida sa brzim pregledom proizvoda.
            </p>
          </div>
          <div className="rounded-full bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70 shadow-inner shadow-primary/10">
            Dostava za grad: {location.naziv}
          </div>
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[320px_1fr]">
          <FiltersSidebar
            filters={filters}
            priceBounds={priceBounds}
            onChange={handleFilterChange}
            onReset={handleResetFilters}
            options={availableOptions}
          />

          <div className="space-y-6">
            <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-3 text-sm text-primary-dark shadow-card">
              <span>
                Prikaz {filteredProducts.length === 0 ? 0 : (currentPage - 1) * PAGE_SIZE + 1} -
                {Math.min(currentPage * PAGE_SIZE, filteredProducts.length)} od {filteredProducts.length} artikala
              </span>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handlePagination("prev")}
                  disabled={currentPage === 1}
                  className="rounded-full border border-primary-dark/20 px-3 py-2 font-semibold text-primary-dark transition hover:bg-beige-dark disabled:cursor-not-allowed disabled:text-primary-dark/40"
                >
                  ← Prethodna
                </button>
                <span className="rounded-full bg-primary/10 px-3 py-2 text-xs font-semibold text-primary-dark">
                  Strana {currentPage} / {pageCount}
                </span>
                <button
                  type="button"
                  onClick={() => handlePagination("next")}
                  disabled={currentPage === pageCount}
                  className="rounded-full border border-primary-dark/20 px-3 py-2 font-semibold text-primary-dark transition hover:bg-beige-dark disabled:cursor-not-allowed disabled:text-primary-dark/40"
                >
                  Sledeća →
                </button>
              </div>
            </div>

            <ProductGrid
              products={currentSlice}
              onAddToCart={handleAddToCart}
              onQuickView={(product) => setQuickViewProduct(product)}
            />

            <div className="flex items-center justify-between rounded-3xl bg-white px-5 py-3 text-sm text-primary-dark shadow-card">
              <div>
                <p className="font-semibold">Stranice</p>
                <p className="text-xs text-primary-dark/70">Podesi paginaciju za detaljniji pregled</p>
              </div>
              <div className="flex items-center gap-2">
                {Array.from({ length: pageCount }, (_, index) => index + 1).map((page) => (
                  <button
                    key={page}
                    type="button"
                    onClick={() => setCurrentPage(page)}
                    className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-semibold transition ${
                      currentPage === page
                        ? "bg-primary-dark text-beige-light shadow"
                        : "bg-beige-dark text-primary-dark hover:bg-primary/10"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <ProductQuickViewModal
        product={quickViewProduct}
        open={Boolean(quickViewProduct)}
        onClose={() => setQuickViewProduct(null)}
        onAddToCart={handleAddToCart}
      />
    </div>
  );
}
