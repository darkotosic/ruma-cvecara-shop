export default function UsloviKoriscenjaPage() {
  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-4xl space-y-6 px-6">
        <div className="space-y-2 text-center">
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Pravne informacije</p>
          <h1 className="text-3xl font-semibold text-primary-dark">Uslovi korišćenja</h1>
          <p className="text-primary-dark/80">Pravila sajta, načini plaćanja i prava kupaca u našoj online cvećari.</p>
        </div>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Opšti uslovi</h2>
          <p className="text-primary-dark/80">
            Korišćenjem sajta pristajete na navedena pravila ponašanja i obavezu da unosite tačne informacije pri kupovini.
            Zadržavamo pravo izmene sadržaja, cena i uslova bez prethodne najave.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Porudžbine i plaćanje</h2>
          <p className="text-primary-dark/80">
            Porudžbine su validne nakon potvrde plaćanja karticom ili pouzećem. Kupac je odgovoran za tačnost podataka o primaocu
            i adresi dostave. Cene su izražene u RSD i uključuju važeće poreze.
          </p>
        </section>

        <section className="space-y-3 rounded-3xl bg-white p-6 shadow-card">
          <h2 className="text-2xl font-semibold text-primary-dark">Odgovornost i ograničenja</h2>
          <p className="text-primary-dark/80">
            Trudimo se da fotografije i opisi budu verodostojni, ali zadržavamo pravo manjih odstupanja usled sezonalnosti cveća.
            Ne snosimo odgovornost za kašnjenja izazvana vanrednim okolnostima u dostavi.
          </p>
        </section>
      </div>
    </div>
  );
}
