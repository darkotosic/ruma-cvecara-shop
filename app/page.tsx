import { getCurrentLocation } from "@/lib/current-location";

const heroProducts = [
  {
    name: "Pastelni buket",
    price: "4.200 RSD",
    badge: "novo",
    primary: "/images/pastel-primary.jpg",
    secondary: "/images/pastel-secondary.jpg",
  },
  {
    name: "Zimski aranžman",
    price: "5.800 RSD",
    badge: "akcija",
    primary: "/images/winter-primary.jpg",
    secondary: "/images/winter-secondary.jpg",
  },
  {
    name: "Letnja kutija",
    price: "3.600 RSD",
    badge: "istaknuto",
    primary: "/images/summer-primary.jpg",
    secondary: "/images/summer-secondary.jpg",
  },
];

export default function Home() {
  const location = getCurrentLocation();
  const porezProcenat = Math.round(location.porez_dostava * 100);
  const locationName = location.slug.replace(/-/g, " ");

  return (
    <main className="min-h-screen bg-gradient-to-b from-beige-light to-beige px-6 py-10 lg:px-12">
      <section className="mx-auto max-w-5xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-dark/70">
            {location.domain}
          </p>
          <h1 className="text-4xl font-semibold text-primary-dark sm:text-5xl">Pastelni shop za brzu dostavu cveća</h1>
          <p className="text-lg text-primary-dark/80 sm:text-xl">
            Minimalan, topao i spreman za konverzije: uredna tipografija, CTA u tamno zelenoj i akcenti u ružičastim tonovima.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a
            className="rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
            href="#proizvodi"
          >
            Pogledaj proizvode
          </a>
          <button className="rounded-full border border-primary-dark px-6 py-3 text-sm font-semibold text-primary-dark transition hover:border-primary hover:bg-primary hover:text-primary-dark">
            Kontakt
          </button>
        </div>
      </section>

      <section className="mx-auto mt-12 max-w-6xl rounded-3xl bg-white p-8 shadow-lg shadow-primary-dark/10">
        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary-dark/60">Trenutna lokacija</p>
            <div className="space-y-2">
              <h2 className="text-3xl font-semibold text-primary-dark">{locationName}</h2>
              <p className="text-primary-dark/80">{location.adresa}</p>
              <p className="text-primary-dark/80">Telefoni: {location.telefoni.join(" / ")}</p>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-dark">Radno vreme</p>
              <ul className="mt-2 space-y-1 text-sm text-primary-dark/80">
                {location.radno_vreme.map((slot) => (
                  <li
                    key={`${slot.dani}-${slot.vreme}`}
                    className="flex items-center justify-between rounded-md bg-beige-light px-3 py-2"
                  >
                    <span className="font-medium text-primary-dark">{slot.dani}</span>
                    <span>{slot.vreme}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="text-sm font-semibold text-primary-dark">Zone dostave</p>
              <dl className="mt-2 space-y-2">
                {location.zone_dostave.map((zone) => (
                  <div key={zone.naziv} className="flex items-center justify-between rounded-xl border border-primary-dark/10 bg-primary-dark/5 px-4 py-3">
                    <dt className="font-medium text-primary-dark">{zone.naziv}</dt>
                    <dd className="text-sm text-primary-dark/80">{zone.cena === 0 ? "Besplatno" : `${zone.cena} RSD`}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3 text-xs text-primary-dark/70">Porez na dostavu: {porezProcenat}%</p>
            </div>
          </div>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary to-secondary-light text-beige-light shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-tr from-primary-dark/60 to-primary/40" aria-hidden />
            <div
              className="absolute inset-0 bg-cover bg-center opacity-40"
              style={{ backgroundImage: `url(${location.lokalni_hero_vizual})` }}
              aria-hidden
            />
            <div className="relative z-10 flex h-full flex-col justify-between p-8">
              <div className="space-y-2">
                <p className="text-sm font-semibold uppercase tracking-[0.18em]">Lokalni hero vizual</p>
                <h3 className="text-3xl font-semibold leading-snug">Scene iz {locationName} cvetnog studija</h3>
                <p className="text-sm text-beige-light/90">
                  Vizual pomaže da kupci odmah osete lokalni vibe i poverenje u brzu dostavu za njihov komšiluk.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 text-sm font-semibold">
                <span className="rounded-full bg-white/20 px-4 py-2">Brza isporuka</span>
                <span className="rounded-full bg-white/20 px-4 py-2">Lokalna radionica</span>
                <span className="rounded-full bg-white/20 px-4 py-2">Personalizacija buketa</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="proizvodi" className="mx-auto mt-12 max-w-6xl space-y-6">
        <div className="flex items-center justify-between">
          <div className="space-y-1 text-left">
            <p className="text-sm font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Izdvojeno</p>
            <h2 className="text-3xl font-semibold text-primary-dark">Najprodavaniji aranžmani</h2>
          </div>
          <a className="text-sm font-semibold text-primary-dark underline-offset-4 hover:underline" href="#">
            Pogledaj sve
          </a>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {heroProducts.map((product) => (
            <article key={product.name} className="product-card">
              <div className="product-card__image">
                <div
                  className="product-card__image-primary"
                  style={{ backgroundImage: `url(${product.primary})` }}
                  aria-hidden
                />
                <div
                  className="product-card__image-secondary"
                  style={{ backgroundImage: `url(${product.secondary})` }}
                  aria-hidden
                />
                <span className="product-card__badge">{product.badge}</span>
              </div>
              <div className="product-card__body">
                <div>
                  <h3 className="product-card__title">{product.name}</h3>
                  <p className="product-card__price">{product.price}</p>
                </div>
                <button className="product-card__cta" type="button">
                  Dodaj u korpu
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
