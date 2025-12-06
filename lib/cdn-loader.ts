import type { ImageLoaderProps } from "next/image";

const CDN_BASE = (process.env.NEXT_PUBLIC_CDN_BASE_URL ?? "https://imagedelivery.net/demo-cvecara").replace(/\/$/, "");

export default function cdnLoader({ src, width, quality }: ImageLoaderProps) {
  const normalizedSrc = src.startsWith("/") ? src.slice(1) : src;
  const url = new URL(`${CDN_BASE}/${normalizedSrc}`);

  url.searchParams.set("width", width.toString());
  url.searchParams.set("quality", (quality ?? 85).toString());

  return url.toString();
}
