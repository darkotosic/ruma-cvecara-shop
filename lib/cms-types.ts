export type ProductBadge = "novo" | "akcija" | "istaknuto";

export type ProductAvailability = "dostupno" | "nedostupno";

export type ProductDimensions = {
  sirina: number;
  visina: number;
};

export type Product = {
  id: string;
  slug: string;
  naziv: string;
  opis: string;
  kategorija: string;
  povodi: string[];
  boja: string;
  tipBiljke: string;
  dimenzije: ProductDimensions;
  cena: number;
  valuta: string;
  status: ProductAvailability;
  bedzevi: ProductBadge[];
  gradovi: string[];
  glavnaSlika: string;
  sekundarnaSlika: string;
  bestSeller?: boolean;
};

export type ProductFilters = {
  kategorija?: string;
  povod?: string;
  boja?: string;
  tipBiljke?: string;
  bedzevi?: ProductBadge[];
  status?: ProductAvailability;
  grad?: string;
  pretraga?: string;
  minCena?: number;
  maxCena?: number;
  bestSeller?: boolean;
};

export type ProductPagination = {
  page?: number;
  pageSize?: number;
};

export type ProductQueryResult = {
  items: Product[];
  total: number;
  page: number;
  pageSize: number;
};

export type HeroCampaign = {
  id: string;
  naslov: string;
  opis: string;
  slika: string;
  datumOd: string;
  datumDo: string;
  grad: string;
};

export type BlogPost = {
  id: string;
  naslov: string;
  slug: string;
  sadrzaj: string;
  heroSlika: string;
  tagovi: string[];
  datum: string;
};
