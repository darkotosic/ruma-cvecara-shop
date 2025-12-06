import type { CartItem } from "@/store/cartStore";
import type { Product } from "./cms-types";

const BRAND_NAME = "Ruma Cvećara";

type EcommerceItem = {
  item_id: string;
  item_name: string;
  price: number;
  quantity?: number;
  currency?: string;
  item_category?: string;
  item_variant?: string;
  item_brand?: string;
  item_list_name?: string;
};

declare global {
  interface Window {
    dataLayer: Record<string, unknown>[];
  }
}

function pushToDataLayer(event: string, payload: Record<string, unknown>) {
  if (typeof window === "undefined") return;

  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push({ event, ...payload });
}

function productToItem(product: Product, quantity?: number): EcommerceItem {
  return {
    item_id: product.id,
    item_name: product.naziv,
    price: product.cena,
    currency: product.valuta,
    quantity,
    item_category: product.kategorija,
    item_variant: product.boja,
    item_brand: BRAND_NAME,
  };
}

function cartItemToItem(item: CartItem): EcommerceItem {
  return {
    item_id: item.id,
    item_name: item.name,
    price: item.price,
    quantity: item.quantity,
    currency: "RSD",
    item_brand: BRAND_NAME,
  };
}

export function trackViewItem(product: Product) {
  pushToDataLayer("view_item", {
    ecommerce: {
      items: [productToItem(product, 1)],
    },
  });
}

export function trackViewItemList(listName: string, products: Product[]) {
  pushToDataLayer("view_item_list", {
    ecommerce: {
      item_list_name: listName,
      items: products.map((product) => ({
        ...productToItem(product, 1),
        item_list_name: listName,
      })),
    },
  });
}

export function trackAddToCart(product: Product, quantity = 1) {
  pushToDataLayer("add_to_cart", {
    ecommerce: {
      items: [productToItem(product, quantity)],
    },
  });
}

export function trackBeginCheckout(items: CartItem[], value: number, currency = "RSD") {
  pushToDataLayer("begin_checkout", {
    ecommerce: {
      currency,
      value,
      items: items.map(cartItemToItem),
    },
  });
}

export function trackPurchase(
  orderId: string,
  items: CartItem[],
  totals: { value: number; shipping?: number; discount?: number },
  currency = "RSD",
) {
  pushToDataLayer("purchase", {
    ecommerce: {
      transaction_id: orderId,
      value: totals.value,
      currency,
      shipping: totals.shipping ?? 0,
      discount: totals.discount ?? 0,
      items: items.map(cartItemToItem),
    },
  });
}
