"use client";

import { useEffect } from "react";

import type { Product } from "@/lib/cms-types";
import { trackViewItem } from "@/lib/analytics";

type Props = {
  product: Product;
};

export default function ProductAnalytics({ product }: Props) {
  useEffect(() => {
    trackViewItem(product);
  }, [product]);

  return null;
}
