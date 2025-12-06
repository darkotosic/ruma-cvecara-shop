export default function PolitikaPrivatnostiPage() {
  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-4xl space-y-6 px-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Pravne informacije</p>
          <h1 className="text-3xl font-semibold text-primary-dark">Politika privatnosti</h1>
          <p className="text-primary-dark/80">Objašnjenje kako prikupljamo, čuvamo i koristimo tvoje podatke.</p>
        </div>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Koje podatke prikupljamo</h2>
          <p className="text-primary-dark/80">
            Prikupljamo ime, email, telefon i adresu isporuke isključivo za potrebe obrade porudžbine. Podaci se čuvaju u skladu
            sa važećim propisima i nisu dostupni trećim licima bez pravnog osnova.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Kolačići i analitika</h2>
          <p className="text-primary-dark/80">
            Koristimo kolačiće za osnovnu funkcionalnost i analitiku posećenosti. Možeš promeniti podešavanja u svom pregledaču i
            obrisati kolačiće u bilo kom trenutku.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Tvoja prava</h2>
          <p className="text-primary-dark/80">
            U svakom trenutku možeš zatražiti uvid, izmenu ili brisanje ličnih podataka. Kontaktiraj nas putem forme ili telefona
            navedenih na stranici Kontakt.
          </p>
        </section>
      </div>
    </div>
  );
}
