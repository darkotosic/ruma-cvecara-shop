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
  return (
    <main className="min-h-screen bg-gradient-to-b from-beige-light to-beige px-6 py-10 lg:px-12">
      <section className="mx-auto max-w-5xl space-y-8 text-center">
        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-primary-dark/70">ruma.cvecara.shop</p>
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
