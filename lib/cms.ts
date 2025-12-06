import { LocationConfig } from "@/config/locations";
import { heroCampaignsMock } from "@/data/hero.mock";
import { productsMock } from "@/data/products.mock";
import {
  BlogPost,
  HeroCampaign,
  Product,
  ProductFilters,
  ProductPagination,
  ProductQueryResult,
} from "./cms-types";

const CMS_BASE_URL = process.env.NEXT_PUBLIC_CMS_URL;

type LocationInput = string | LocationConfig | undefined;

type StrapiListResponse<T> = {
  data: T;
};

const blogPostsMock: BlogPost[] = [
  {
    id: "blog-001",
    naslov: "Kako izabrati buket za rođendan",
    slug: "kako-izabrati-buket-za-rodjendan",
    sadrzaj:
      "Prilikom odabira buketa za rođendan obratite pažnju na omiljene boje i cvetne note slavljenika, kao i na to da li se isporučuje na adresu ili lično predaje.",
    heroSlika: "/images/blog-birthday.jpg",
    tagovi: ["rodjendani", "saveti"],
    datum: "2025-01-12",
  },
  {
    id: "blog-002",
    naslov: "Trendovi poklon korpi za 8. mart",
    slug: "trendovi-poklon-korpi-za-8-mart",
    sadrzaj:
      "Kombinacija mirisnih sveća, finih čajeva i mini aranžmana sa ružama postaje standard za poklon korpe povodom 8. marta.",
    heroSlika: "/images/blog-womens-day.jpg",
    tagovi: ["8-mart", "poklon-korpe"],
    datum: "2025-02-20",
  },
  {
    id: "blog-003",
    naslov: "Minimalističke sobne biljke za novi stan",
    slug: "minimalisticke-sobne-biljke-za-novi-stan",
    sadrzaj:
      "Orhideje, sansevijerije i male monstere traže malo prostora, a donose karakter i svežinu u novi dom.",
    heroSlika: "/images/blog-houseplants.jpg",
    tagovi: ["useljene", "sobne-biljke"],
    datum: "2025-03-05",
  },
];

function normalizeLocationSlug(location?: LocationInput) {
  if (!location) return undefined;
  return typeof location === "string" ? location : location.slug;
}

function paginateProducts(products: Product[], pagination: ProductPagination): ProductQueryResult {
  const page = pagination.page && pagination.page > 0 ? pagination.page : 1;
  const pageSize = pagination.pageSize && pagination.pageSize > 0 ? pagination.pageSize : 12;
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  return {
    items: products.slice(start, end),
    total: products.length,
    page,
    pageSize,
  };
}

function matchesFilters(product: Product, filters: ProductFilters): boolean {
  if (filters.grad && !product.gradovi.includes(filters.grad)) {
    return false;
  }

  if (filters.kategorija && product.kategorija !== filters.kategorija) {
    return false;
  }

  if (filters.povod && !product.povodi.includes(filters.povod)) {
    return false;
  }

  if (filters.boja && product.boja !== filters.boja) {
    return false;
  }

  if (filters.tipBiljke && product.tipBiljke !== filters.tipBiljke) {
    return false;
  }

  if (filters.status && product.status !== filters.status) {
    return false;
  }

  if (filters.bedzevi && filters.bedzevi.some((badge) => !product.bedzevi.includes(badge))) {
    return false;
  }

  if (typeof filters.bestSeller === "boolean" && Boolean(product.bestSeller) !== filters.bestSeller) {
    return false;
  }

  if (filters.minCena && product.cena < filters.minCena) {
    return false;
  }

  if (filters.maxCena && product.cena > filters.maxCena) {
    return false;
  }

  if (filters.pretraga) {
    const query = filters.pretraga.toLowerCase();
    const nameMatches = product.naziv.toLowerCase().includes(query);
    const descriptionMatches = product.opis.toLowerCase().includes(query);

    if (!nameMatches && !descriptionMatches) {
      return false;
    }
  }

  return true;
}

async function fetchFromCms<T>(path: string, params: Record<string, string | number | undefined> = {}) {
  if (!CMS_BASE_URL) return null;

  const url = new URL(path, CMS_BASE_URL);

  Object.entries(params).forEach(([key, value]) => {
    if (typeof value !== "undefined") {
      url.searchParams.append(key, String(value));
    }
  });

  try {
    const response = await fetch(url.toString(), { next: { revalidate: 60 } });

    if (!response.ok) {
      console.warn(`[CMS] Greška ${response.status} prilikom poziva ${url.toString()}`);
      return null;
    }

    const payload = (await response.json()) as StrapiListResponse<T>;

    return payload.data;
  } catch (error) {
    console.warn(`[CMS] Greška prilikom fetch-a ${url.toString()}:`, error);
    return null;
  }
}

async function getProductsFromCms(filters: ProductFilters, pagination: ProductPagination) {
  const params: Record<string, string | number | undefined> = {
    grad: filters.grad,
    kategorija: filters.kategorija,
    povod: filters.povod,
    boja: filters.boja,
    tipBiljke: filters.tipBiljke,
    status: filters.status,
    minCena: filters.minCena,
    maxCena: filters.maxCena,
    pretraga: filters.pretraga,
    page: pagination.page,
    pageSize: pagination.pageSize,
  };

  if (filters.bedzevi?.length) {
    params.bedzevi = filters.bedzevi.join(",");
  }

  if (typeof filters.bestSeller === "boolean") {
    params.bestSeller = filters.bestSeller ? "1" : "0";
  }

  return fetchFromCms<Product[]>("/api/products", params);
}

export async function getProducts(
  filters: ProductFilters = {},
  pagination: ProductPagination = {},
): Promise<ProductQueryResult> {
  const grad = filters.grad;
  const cmsProducts = await getProductsFromCms({ ...filters, grad }, pagination);

  if (cmsProducts) {
    return paginateProducts(cmsProducts, pagination);
  }

  const filtered = productsMock.filter((product) => matchesFilters(product, { ...filters, grad }));

  return paginateProducts(filtered, pagination);
}

export async function getFeaturedProducts(location?: LocationInput) {
  const grad = normalizeLocationSlug(location);

  const { items } = await getProducts({ bedzevi: ["istaknuto"], grad }, { pageSize: 6 });

  return items;
}

export async function getBestSellers(location?: LocationInput) {
  const grad = normalizeLocationSlug(location);

  const { items } = await getProducts({ bestSeller: true, grad }, { pageSize: 6 });

  return items;
}

export async function getProductBySlug(slug: string, location?: LocationInput) {
  const grad = normalizeLocationSlug(location);
  const cmsProducts = await getProductsFromCms({ grad, pretraga: slug }, { pageSize: 1 });

  const cmsMatch = cmsProducts?.find((product) => product.slug === slug);

  if (cmsMatch) {
    return cmsMatch;
  }

  return productsMock.find((product) => product.slug === slug && (!grad || product.gradovi.includes(grad)));
}

export async function getHeroCampaign(location?: LocationInput): Promise<HeroCampaign | undefined> {
  const grad = normalizeLocationSlug(location);
  const cmsCampaigns = await fetchFromCms<HeroCampaign[]>("/api/hero-campaigns", { grad });

  if (cmsCampaigns?.length) {
    return cmsCampaigns[0];
  }

  return heroCampaignsMock.find((campaign) => campaign.grad === grad) ?? heroCampaignsMock[0];
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  const cmsBlogPosts = await fetchFromCms<BlogPost[]>("/api/blog-posts");

  return cmsBlogPosts ?? blogPostsMock;
}

export async function getBlogPost(slug: string): Promise<BlogPost | undefined> {
  const cmsBlogPosts = await fetchFromCms<BlogPost[]>("/api/blog-posts", { slug });

  if (cmsBlogPosts?.length) {
    return cmsBlogPosts[0];
  }

  return blogPostsMock.find((post) => post.slug === slug);
}
