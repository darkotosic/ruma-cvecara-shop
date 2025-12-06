export type PromoCode = {
  code: string;
  type: "percent" | "flat";
  value: number;
  minSubtotal?: number;
  description?: string;
};

export const promoCodes: PromoCode[] = [
  { code: "CVET10", type: "percent", value: 10, minSubtotal: 3000, description: "10% popusta za porudžbine preko 3.000 RSD" },
  { code: "DOSTAVA300", type: "flat", value: 300, minSubtotal: 4500, description: "Smanjenje dostave za porudžbine preko 4.500 RSD" },
];

export function validatePromoCode(code: string, subtotal: number) {
  const normalized = code.trim().toUpperCase();
  const match = promoCodes.find((item) => item.code === normalized);

  if (!match) {
    return { valid: false, message: "Promo kod nije prepoznat." as const, discount: 0 };
  }

  if (match.minSubtotal && subtotal < match.minSubtotal) {
    return {
      valid: false,
      message: `Minimalni iznos za primenu koda je ${match.minSubtotal} RSD.`,
      discount: 0,
    } as const;
  }

  const discount = match.type === "percent" ? Math.round((subtotal * match.value) / 100) : match.value;

  return {
    valid: true as const,
    message: match.description ?? "Promo kod je primenjen.",
    discount,
    code: match.code,
  };
}
