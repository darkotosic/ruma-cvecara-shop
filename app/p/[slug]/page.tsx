import Link from "next/link";
import { notFound } from "next/navigation";

import ProductGallery from "@/components/product/ProductGallery";
import { locations } from "@/config/locations";
import { productsMock } from "@/data/products.mock";
import { formatPrice } from "@/lib/format-price";

const dodatniProizvodi = [
  { naziv: "Čokolade Artisanal", opis: "Tamna i mlečna selekcija u premium pakovanju.", cena: 950 },
  { naziv: "Vino Rose Boutique", opis: "Suvo roze vino u mini bočici od 0.5l.", cena: 1800 },
  { naziv: "Plišani medo", opis: "Mekani plišani medo u boji vanile, 25 cm.", cena: 1400 },
];

type ProductPageProps = {
  params: { slug: string };
};

function naslovLokacije(slug: string) {
  return slug
    .split("-")
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export default function ProductPage({ params }: ProductPageProps) {
  const product = productsMock.find((item) => item.slug === params.slug);

  if (!product) {
    return notFound();
  }

  const dostupneLokacije = locations.filter((location) => product.gradovi.includes(location.slug));
  const preporuceni = productsMock.filter((item) => item.slug !== product.slug && item.bestSeller).slice(0, 3);

  const galerija = [product.glavnaSlika, product.sekundarnaSlika, product.glavnaSlika, product.sekundarnaSlika];

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <nav aria-label="Navigacija mrvice" className="mb-6 flex items-center gap-2 text-sm text-primary-dark/70">
          <Link href="/" className="font-semibold text-primary-dark hover:text-primary">
            Početna
          </Link>
          <span className="text-primary-dark/40">/</span>
          <Link href="/shop" className="font-semibold text-primary-dark hover:text-primary">
            Shop
          </Link>
          <span className="text-primary-dark/40">/</span>
          <span className="font-semibold text-primary-dark">{product.naziv}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
          <ProductGallery images={galerija} title={product.naziv} />

          <div className="space-y-6 rounded-3xl bg-white p-8 shadow-card">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Proizvod</p>
              <h1 className="text-3xl font-semibold text-primary-dark">{product.naziv}</h1>
              <p className="text-primary-dark/80">{product.opis}</p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark/70">
              <span className="rounded-full bg-beige-dark px-3 py-1">{product.kategorija}</span>
              <span className="rounded-full bg-beige-dark px-3 py-1">{product.boja}</span>
              <span className="rounded-full bg-beige-dark px-3 py-1">{product.tipBiljke}</span>
            </div>

            <div className="flex flex-wrap items-center gap-4 rounded-2xl bg-primary/10 p-4 text-sm text-primary-dark">
              <div className="flex items-center gap-2 rounded-full bg-white px-3 py-2 font-semibold shadow-sm">
                <span className="text-2xl">❤</span> Popularan izbor
              </div>
              <div className="flex flex-col">
                <span className="text-xs uppercase tracking-[0.14em] text-primary-dark/70">Dimenzije</span>
                <span className="font-semibold">
                  {product.dimenzije.visina} cm visina · {product.dimenzije.sirina} cm širina
                </span>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-2xl font-semibold text-primary-dark">{formatPrice(product.cena, product.valuta)}</p>
                <p className="text-sm text-primary-dark/70">Cena uključuje osnovnu dostavu za dostupne zone.</p>
              </div>
              <div className="flex items-center gap-3">
                <button className="rounded-full bg-primary-dark px-5 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90">
                  Dodaj u korpu
                </button>
                <button className="rounded-full border border-primary-dark/15 px-5 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-beige-dark">
                  Sačuvaj želju
                </button>
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-primary-dark/10 bg-beige-dark p-5">
              <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Dostupnost po gradu</p>
              <div className="space-y-3">
                {dostupneLokacije.map((lokacija) => (
                  <div
                    key={lokacija.slug}
                    className="rounded-2xl bg-white p-4 shadow-sm shadow-primary-dark/5"
                  >
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div>
                        <p className="text-base font-semibold text-primary-dark">{naslovLokacije(lokacija.slug)}</p>
                        <p className="text-sm text-primary-dark/70">{lokacija.adresa}</p>
                      </div>
                      <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark">
                        Zone dostave
                      </span>
                    </div>
                    <dl className="mt-3 grid gap-2 sm:grid-cols-2">
                      {lokacija.zone_dostave.map((zone) => (
                        <div
                          key={`${lokacija.slug}-${zone.naziv}`}
                          className="flex items-center justify-between rounded-xl border border-primary-dark/10 bg-beige-light px-3 py-2"
                        >
                          <dt className="font-semibold text-primary-dark">{zone.naziv}</dt>
                          <dd className="text-sm text-primary-dark/80">
                            {zone.cena === 0 ? "Besplatno" : formatPrice(zone.cena, "RSD")}
                          </dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-3 rounded-2xl border border-primary-dark/10 bg-white p-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Dodatni proizvodi</p>
                  <h2 className="text-2xl font-semibold text-primary-dark">Upari sa slatkim ili premium poklonom</h2>
                </div>
                <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-primary-dark">
                  Upsell</span>
              </div>
              <div className="grid gap-3 md:grid-cols-3">
                {dodatniProizvodi.map((item) => (
                  <div
                    key={item.naziv}
                    className="space-y-2 rounded-xl bg-beige-dark p-4 text-sm text-primary-dark shadow-inner"
                  >
                    <p className="text-base font-semibold text-primary-dark">{item.naziv}</p>
                    <p className="text-primary-dark/80">{item.opis}</p>
                    <p className="text-sm font-semibold">{formatPrice(item.cena, "RSD")}</p>
                    <button className="w-full rounded-full bg-primary-dark px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-beige-light transition hover:bg-primary">
                      Dodaj uz narudžbinu
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <section className="mt-10 space-y-4 rounded-3xl bg-white p-8 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Kupci su kupovali i</p>
              <h2 className="text-2xl font-semibold text-primary-dark">Preporučeni aranžmani</h2>
            </div>
            <Link href="/shop" className="text-sm font-semibold text-primary-dark underline-offset-4 hover:underline">
              Pogledaj sve
            </Link>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {preporuceni.map((item) => (
              <article key={item.id} className="rounded-2xl border border-primary-dark/10 bg-beige-dark p-4 shadow-sm">
                <div className="relative h-40 overflow-hidden rounded-xl">
                  <img src={item.glavnaSlika} alt={item.naziv} className="h-full w-full object-cover" />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-dark shadow">
                    {item.kategorija}
                  </span>
                </div>
                <div className="mt-3 space-y-1">
                  <p className="text-lg font-semibold text-primary-dark">{item.naziv}</p>
                  <p className="text-sm text-primary-dark/70 line-clamp-2">{item.opis}</p>
                  <p className="text-sm font-semibold text-primary-dark/80">{formatPrice(item.cena, item.valuta)}</p>
                  <Link
                    href={`/p/${item.slug}`}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    Detalji proizvoda <span aria-hidden>→</span>
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
