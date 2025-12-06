export function formatPrice(value: number, currency = "RSD") {
  return new Intl.NumberFormat("sr-RS", {
    style: "currency",
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
}
