export default function PolitikaKolacicaPage() {
  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-4xl space-y-6 px-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Pravne informacije</p>
          <h1 className="text-3xl font-semibold text-primary-dark">Politika kolačića</h1>
          <p className="text-primary-dark/80">Saznaj koje kolačiće koristimo i kako možeš da ih kontrolišeš.</p>
        </div>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Neophodni kolačići</h2>
          <p className="text-primary-dark/80">
            Ovi kolačići omogućavaju osnovne funkcije sajta, kao što su dodavanje u korpu i bezbedno plaćanje. Bez njih sajt ne
            može ispravno da radi.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Analitički kolačići</h2>
          <p className="text-primary-dark/80">
            Analitički kolačići pomažu da razumemo kako korisnici koriste sajt i omogućavaju nam da poboljšamo iskustvo kupovine.
            Možeš ih isključiti u podešavanjima pregledača.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Podešavanja</h2>
          <p className="text-primary-dark/80">
            U svakom trenutku možeš obrisati kolačiće iz svog pregledača ili podesiti da budeš obavešten kada se kolačići čuvaju.
            Nastavak korišćenja sajta znači da se saglašavaš sa navedenim pravilima.
          </p>
        </section>
      </div>
    </div>
  );
}
