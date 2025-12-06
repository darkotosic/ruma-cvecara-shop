import type { Metadata } from "next";

import type { LocationConfig } from "@/config/locations";
import { defaultLocation } from "@/config/locations";
import type { BlogPost, Product } from "./cms-types";

const locationCopy: Record<string, { title: string; description: string }> = {
  ruma: {
    title: "Ruma Cvećara | Pastelni buketi u Rumi",
    description:
      "Online cvećara u Rumi sa ručno aranžiranim buketima, brzom dostavom po gradu i nežnim pastel paletama.",
  },
  "novi-sad": {
    title: "Ruma Cvećara | Pastelni cvetni studio Novi Sad",
    description:
      "Premium cvetni aranžmani i pokloni za Novi Sad, sa lokalnom dostavom i pažljivo biranim sezonskim cvetovima.",
  },
  beograd: {
    title: "Ruma Cvećara | Dizajnerski buketi Beograd",
    description:
      "Elegantni buketi i poklon setovi za Beograd, sa ekspresnom dostavom i personalizacijom za posebne prilike.",
  },
};

export function createExcerpt(text: string, limit = 160) {
  if (text.length <= limit) return text;

  return `${text.slice(0, limit - 3)}...`;
}

export function formatLocationName(location: LocationConfig) {
  return location.slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function getDefaultMetadata(location: LocationConfig): Metadata {
  const copy = locationCopy[location.slug] ?? {
    title: "Ruma Cvećara Shop",
    description: "Pastelni e-commerce doživljaj za lokalnu cvećaru.",
  };

  return {
    title: copy.title,
    description: copy.description,
    openGraph: {
      title: copy.title,
      description: copy.description,
      type: "website",
      url: `https://${location.domain}`,
      images: [
        {
          url: location.lokalni_hero_vizual,
          width: 1200,
          height: 630,
          alt: `Hero vizual za ${formatLocationName(location)}`,
        },
      ],
    },
  };
}

export function getCategoryMetadata(
  title: string,
  location: LocationConfig,
  path?: string,
): Metadata {
  const base = getDefaultMetadata(location);
  const fullTitle = `${title} | ${base.title}`;
  const description = `${title} kolekcija za ${formatLocationName(location)} sa pažljivo kuriranim pastelnim aranžmanima.`;

  return {
    ...base,
    title: fullTitle,
    description,
    openGraph: {
      ...base.openGraph,
      title: fullTitle,
      description,
      url: path ? `https://${location.domain}${path}` : base.openGraph?.url,
    },
  };
}

export function getProductMetadata(product: Product, location: LocationConfig): Metadata {
  const description = createExcerpt(product.opis);
  const title = `${product.naziv} | ${formatLocationName(location)} buketi`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "product",
      url: `https://${location.domain}/p/${product.slug}`,
      images: [
        {
          url: product.glavnaSlika,
          width: 1200,
          height: 630,
          alt: `Fotografija proizvoda ${product.naziv}`,
        },
        {
          url: product.sekundarnaSlika,
          width: 1200,
          height: 630,
          alt: `Alternativni prikaz proizvoda ${product.naziv}`,
        },
      ],
    },
  };
}

export function getBlogPostMetadata(post: BlogPost): Metadata {
  const description = createExcerpt(post.sadrzaj);
  const domain = defaultLocation.domain;

  return {
    title: `${post.naslov} | Novosti | Ruma Cvećara`,
    description,
    openGraph: {
      title: post.naslov,
      description,
      type: "article",
      url: `https://${domain}/novosti/${post.slug}`,
      images: [
        {
          url: post.heroSlika,
          width: 1200,
          height: 630,
          alt: `Hero vizual za priču ${post.naslov}`,
        },
      ],
    },
  };
}

export function buildBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

export function buildLocalBusinessSchema(location: LocationConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: `Cvećara ${formatLocationName(location)}`,
    image: location.lokalni_hero_vizual,
    address: {
      "@type": "PostalAddress",
      streetAddress: location.adresa,
      addressLocality: formatLocationName(location),
      addressCountry: "RS",
    },
    telephone: location.telefoni,
    url: `https://${location.domain}`,
    areaServed: location.zone_dostave.map((zone) => zone.naziv),
  };
}

export function buildProductSchema(product: Product, location: LocationConfig) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.naziv,
    description: product.opis,
    image: [product.glavnaSlika, product.sekundarnaSlika],
    sku: product.id,
    brand: "Ruma Cvećara",
    category: product.kategorija,
    offers: {
      "@type": "Offer",
      price: product.cena,
      priceCurrency: product.valuta,
      availability:
        product.status === "dostupno"
          ? "https://schema.org/InStock"
          : "https://schema.org/OutOfStock",
      url: `https://${location.domain}/p/${product.slug}`,
      itemCondition: "https://schema.org/NewCondition",
    },
    offersAvailability: product.status === "dostupno" ? "InStock" : "OutOfStock",
  };
}

export function buildArticleSchema(post: BlogPost) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.naslov,
    description: createExcerpt(post.sadrzaj),
    image: [post.heroSlika],
    datePublished: post.datum,
    author: {
      "@type": "Person",
      name: "Ruma Cvećara tim",
    },
    publisher: {
      "@type": "Organization",
      name: "Ruma Cvećara",
      logo: {
        "@type": "ImageObject",
        url: "/images/logo.png",
      },
    },
  };
}
