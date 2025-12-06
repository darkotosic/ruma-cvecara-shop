export default function PravilaReklamacijaPage() {
  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-4xl space-y-6 px-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Pravne informacije</p>
          <h1 className="text-3xl font-semibold text-primary-dark">Pravila reklamacija</h1>
          <p className="text-primary-dark/80">Koraci za prijavu reklamacije i zamene proizvoda.</p>
        </div>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Rok i uslovi</h2>
          <p className="text-primary-dark/80">
            Reklamacije se podnose u roku od 24h od prijema proizvoda putem emaila ili telefona. Potrebno je dostaviti broj
            porudžbine i fotografiju proizvoda.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Način rešavanja</h2>
          <p className="text-primary-dark/80">
            Nakon provere prijave, nudimo ponovnu isporuku ili povraćaj uplaćenog iznosa. Trudimo se da rešenje bude brzo i u
            skladu sa očekivanjima kupca.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Kontakt za podršku</h2>
          <p className="text-primary-dark/80">
            Za sva pitanja o reklamacijama stojimo na raspolaganju putem Kontakt stranice. Tim odgovara u roku od jednog radnog
            dana sa jasnim uputstvima.
          </p>
        </section>
      </div>
    </div>
  );
}
