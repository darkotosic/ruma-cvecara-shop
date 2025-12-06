"use client";

import { useState } from "react";

type ProductGalleryProps = {
  images: string[];
  title: string;
};

export default function ProductGallery({ images, title }: ProductGalleryProps) {
  const [activeImage, setActiveImage] = useState(images[0]);
  const [zoomed, setZoomed] = useState(false);

  return (
    <div className="space-y-4">
      <div
        className="group relative overflow-hidden rounded-3xl bg-beige-dark shadow-card"
        onMouseEnter={() => setZoomed(true)}
        onMouseLeave={() => setZoomed(false)}
      >
        <img
          src={activeImage}
          alt={title}
          className={`h-96 w-full object-cover transition duration-500 ease-out ${zoomed ? "scale-110" : "scale-100"}`}
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-primary-dark/15 to-transparent opacity-0 transition group-hover:opacity-100" />
        <span className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark shadow">
          Zumiraj pokretom
        </span>
      </div>

      <div className="grid grid-cols-4 gap-3">
        {images.map((image) => (
          <button
            key={image}
            type="button"
            onClick={() => setActiveImage(image)}
            className={`overflow-hidden rounded-2xl border-2 transition ${
              activeImage === image
                ? "border-primary-dark shadow-card"
                : "border-transparent opacity-80 hover:opacity-100"
            }`}
          >
            <img src={image} alt={`${title} pregled`} className="h-20 w-full object-cover" />
          </button>
        ))}
      </div>
    </div>
  );
}
