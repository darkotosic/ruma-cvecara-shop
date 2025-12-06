"use client";

import { useMemo, useState } from "react";

import { locations } from "@/config/locations";

type KontaktFormState = {
  ime: string;
  email: string;
  poruka: string;
};

type KontaktFormErrors = Partial<Record<keyof KontaktFormState, string>>;

const initialState: KontaktFormState = {
  ime: "",
  email: "",
  poruka: "",
};

export default function KontaktPage() {
  const [form, setForm] = useState(initialState);
  const [touched, setTouched] = useState<Record<keyof KontaktFormState, boolean>>({
    ime: false,
    email: false,
    poruka: false,
  });

  const errors = useMemo(() => validateForm(form), [form]);
  const isValid = useMemo(() => Object.values(errors).every((value) => !value), [errors]);
  const primaryPhone = locations[0].telefoni[0];

  const handleChange = (field: keyof KontaktFormState, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    setTouched((prev) => ({ ...prev, [field]: true }));
  };

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Podrška</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Kontakt i lokacije</h1>
            <p className="text-primary-dark/80">
              Više radionica, telefoni i brzi digitalni kanali – piši nam, pozovi ili dođi po omiljeni buket.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <a
              className="rounded-full bg-accent px-4 py-3 text-sm font-semibold text-white shadow transition hover:bg-accent/90"
              href={`viber://chat?number=${primaryPhone.replace(/\s+/g, "")}`}
            >
              Kontakt na Viber
            </a>
            <a
              className="rounded-full border border-primary-dark/20 bg-white px-4 py-3 text-sm font-semibold text-primary-dark shadow-sm transition hover:border-primary hover:bg-beige-dark"
              href={`https://wa.me/${primaryPhone.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp chat
            </a>
          </div>
        </div>

        <div className="mt-8 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
          <section className="space-y-5">
            {locations.map((location) => (
              <div
                key={location.slug}
                className="grid gap-4 rounded-3xl bg-white p-5 shadow-card md:grid-cols-[1.1fr_0.9fr]"
              >
                <div className="space-y-3">
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">{location.domain}</p>
                  <h2 className="text-2xl font-semibold text-primary-dark">
                    Studio {location.slug.replace(/-/g, " ")}
                  </h2>
                  <p className="text-primary-dark/80">{location.adresa}</p>
                  <div className="space-y-2 text-sm text-primary-dark/80">
                    <p className="font-semibold text-primary-dark">Telefoni</p>
                    <div className="flex flex-wrap gap-2">
                      {location.telefoni.map((phone) => (
                        <a
                          key={phone}
                          className="rounded-full bg-beige-dark px-3 py-2 font-semibold text-primary-dark transition hover:bg-primary/10"
                          href={`tel:${phone.replace(/\s+/g, "")}`}
                        >
                          {phone}
                        </a>
                      ))}
                    </div>
                  </div>
                  <div className="space-y-2 text-sm text-primary-dark/80">
                    <p className="font-semibold text-primary-dark">Radno vreme</p>
                    <ul className="grid gap-2 sm:grid-cols-2">
                      {location.radno_vreme.map((slot) => (
                        <li
                          key={`${location.slug}-${slot.dani}-${slot.vreme}`}
                          className="flex items-center justify-between rounded-xl border border-primary-dark/10 bg-beige-dark px-3 py-2"
                        >
                          <span className="font-semibold text-primary-dark">{slot.dani}</span>
                          <span>{slot.vreme}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="overflow-hidden rounded-2xl border border-primary-dark/10">
                  <iframe
                    title={`Mapa za ${location.slug}`}
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2830.976523245!2d20.0801910155051!3d44.82317837909856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x475a707a0faecfff%3A0xcb7f1df8e3e1ec85!2sKnez%20Mihailova!5e0!3m2!1ssr!2srs!4v1700000000000!5m2!1ssr!2srs"
                    className="h-full min-h-[260px] w-full"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </div>
              </div>
            ))}
          </section>

          <section className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
            <div className="space-y-2">
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Piši nam</p>
              <h2 className="text-2xl font-semibold text-primary-dark">Kontakt forma</h2>
              <p className="text-primary-dark/80">Validacija se pokreće odmah dok kucaš – ostavite nam detalje za brzi odgovor.</p>
            </div>
            <form className="space-y-4">
              <div className="space-y-1">
                <label className="text-sm font-semibold text-primary-dark" htmlFor="ime">
                  Ime i prezime
                </label>
                <input
                  id="ime"
                  name="ime"
                  type="text"
                  value={form.ime}
                  onChange={(e) => handleChange("ime", e.target.value)}
                  className={`w-full rounded-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.ime && touched.ime ? "border-accent" : "border-primary-dark/15"
                  }`}
                  placeholder="Tvoje ime"
                />
                {errors.ime && touched.ime ? <p className="text-xs font-semibold text-accent">{errors.ime}</p> : null}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-primary-dark" htmlFor="email">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  className={`w-full rounded-full border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.email && touched.email ? "border-accent" : "border-primary-dark/15"
                  }`}
                  placeholder="primer@mail.com"
                />
                {errors.email && touched.email ? <p className="text-xs font-semibold text-accent">{errors.email}</p> : null}
              </div>

              <div className="space-y-1">
                <label className="text-sm font-semibold text-primary-dark" htmlFor="poruka">
                  Poruka
                </label>
                <textarea
                  id="poruka"
                  name="poruka"
                  value={form.poruka}
                  onChange={(e) => handleChange("poruka", e.target.value)}
                  className={`min-h-[140px] w-full rounded-2xl border px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-primary ${
                    errors.poruka && touched.poruka ? "border-accent" : "border-primary-dark/15"
                  }`}
                  placeholder="Navedi povod, željeni datum dostave ili budžet"
                />
                {errors.poruka && touched.poruka ? <p className="text-xs font-semibold text-accent">{errors.poruka}</p> : null}
              </div>

              <div className="space-y-2 text-sm text-primary-dark/70">
                <button
                  type="submit"
                  disabled={!isValid}
                  className="w-full rounded-full bg-primary-dark px-6 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90 disabled:cursor-not-allowed disabled:bg-primary/40"
                >
                  Pošalji poruku
                </button>
                <span className="block text-xs text-primary-dark/70">Forma proverava polja u realnom vremenu.</span>
              </div>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
}

function validateForm(state: KontaktFormState): KontaktFormErrors {
  const nextErrors: KontaktFormErrors = {};

  if (!state.ime.trim()) {
    nextErrors.ime = "Ime je obavezno.";
  }

  if (!state.email.trim()) {
    nextErrors.email = "Email je obavezan.";
  } else if (!/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(state.email.trim())) {
    nextErrors.email = "Unesi validan email.";
  }

  if (!state.poruka.trim()) {
    nextErrors.poruka = "Poruka je obavezna.";
  } else if (state.poruka.trim().length < 10) {
    nextErrors.poruka = "Poruka treba da ima bar 10 karaktera.";
  }

  return nextErrors;
}
