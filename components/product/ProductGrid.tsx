"use client";

import ProductCard from "@/components/product/ProductCard";
import type { Product } from "@/lib/cms-types";

type ProductGridProps = {
  products: Product[];
  onAddToCart: (product: Product) => void;
  onQuickView: (product: Product) => void;
};

export default function ProductGrid({ products, onAddToCart, onQuickView }: ProductGridProps) {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onAddToCart={onAddToCart}
          onQuickView={onQuickView}
        />
      ))}
    </div>
  );
}
