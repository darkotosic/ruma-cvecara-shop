"use client";

import Link from "next/link";

import { useCurrentLocation } from "@/app/location-context";

const legalLinks = [
  { href: "/uslovi-koriscenja", label: "Uslovi korišćenja" },
  { href: "/politika-privatnosti", label: "Politika privatnosti" },
  { href: "/politika-kolacica", label: "Politika kolačića" },
];

const socialLinks = [
  { href: "https://www.instagram.com", label: "Instagram" },
  { href: "https://www.facebook.com", label: "Facebook" },
  { href: "https://www.pinterest.com", label: "Pinterest" },
];

export default function Footer() {
  const location = useCurrentLocation();

  return (
    <footer className="mt-auto border-t border-primary-dark/15 bg-primary-dark text-beige-light">
      <div className="mx-auto flex max-w-6xl flex-col gap-10 px-6 py-12 md:flex-row md:justify-between">
        <div className="space-y-4 md:max-w-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-base font-semibold text-primary-dark shadow-card">
              RC
            </div>
            <div className="leading-tight">
              <p className="text-lg font-semibold">Ruma Cvećara</p>
              <p className="text-sm text-beige-light/80">Pastelni shop za brzu i pažljivu dostavu cveća.</p>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {socialLinks.map((social) => (
              <Link
                key={social.href}
                href={social.href}
                className="rounded-full bg-white/10 px-4 py-2 text-sm font-semibold text-beige-light transition hover:bg-white/20"
                target="_blank"
                rel="noreferrer"
              >
                {social.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-beige-light/80">Radno vreme</p>
          <ul className="space-y-2 text-sm">
            {location.radno_vreme.map((slot) => (
              <li
                key={`${slot.dani}-${slot.vreme}`}
                className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3"
              >
                <span className="font-semibold">{slot.dani}</span>
                <span className="text-beige-light/85">{slot.vreme}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="space-y-4 md:max-w-xs">
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-beige-light/80">Newsletter</p>
          <p className="text-sm text-beige-light/80">
            Prijavi se za pastelne novosti, ideje za poklone i akcije iz tvoje lokalne radionice.
          </p>
          <form className="space-y-3">
            <input
              type="email"
              name="email"
              placeholder="tvoj.email@example.com"
              className="w-full rounded-full border border-white/20 bg-white/10 px-4 py-3 text-sm placeholder:text-beige-light/70 focus:border-white focus:outline-none"
            />
            <button
              type="submit"
              className="w-full rounded-full bg-white px-4 py-3 text-sm font-semibold text-primary-dark transition hover:bg-beige-light"
            >
              Prijavi se
            </button>
          </form>
          <div className="flex flex-wrap gap-3 text-sm text-beige-light/85">
            {legalLinks.map((link) => (
              <Link key={link.href} href={link.href} className="transition hover:text-white">
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
