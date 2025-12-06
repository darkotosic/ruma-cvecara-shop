"use client";

import Link from "next/link";

import { useCurrentLocation } from "@/app/location-context";

const navItems = [
  { href: "/", label: "Početna" },
  { href: "/shop", label: "Shop" },
  { href: "/kontakt", label: "Kontakt" },
  { href: "/novosti", label: "Novosti" },
];

const actionIcons = [
  {
    label: "Pretraga",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M15.5 15.5 20 20"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <circle
          cx="11"
          cy="11"
          r="6"
          stroke="currentColor"
          strokeWidth="1.75"
          fill="none"
        />
      </svg>
    ),
  },
  {
    label: "Lista želja",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M12 20s-7-4.35-7-10a5 5 0 0 1 9-2.54A5 5 0 0 1 19 10c0 5.65-7 10-7 10Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    label: "Nalog",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <circle
          cx="12"
          cy="8"
          r="3.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
        />
        <path
          d="M5.5 19.5a6.5 6.5 0 0 1 13 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    label: "Korpa",
    icon: (
      <svg viewBox="0 0 24 24" aria-hidden="true" className="h-5 w-5">
        <path
          d="M5 6h15l-1.5 9.5H7L5 6Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinejoin="round"
        />
        <path
          d="M9 6a3 3 0 0 1 6 0"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.75"
          strokeLinecap="round"
        />
        <circle cx="9" cy="19" r="1" fill="currentColor" />
        <circle cx="17" cy="19" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function Header() {
  const location = useCurrentLocation();
  const primaryPhone = location.telefoni[0];

  const normalizedPhoneHref = `tel:${primaryPhone.replace(/\s+/g, "")}`;

  return (
    <header className="sticky top-0 z-40 border-b border-primary-dark/10 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-dark text-base font-semibold text-beige-light shadow-card">
            RC
          </div>
          <div className="leading-tight">
            <span className="block text-lg font-semibold text-primary-dark">Ruma Cvećara</span>
            <span className="text-xs text-primary-dark/70">Za ljubitelje cveća</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 text-sm font-semibold text-primary-dark/80 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 transition hover:bg-beige-dark hover:text-primary-dark"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-1 items-center justify-end gap-4 lg:flex-initial">
          <div className="flex items-center gap-3 rounded-full bg-beige-dark px-3 py-2 text-primary-dark shadow-inner shadow-primary/10">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-sm font-semibold text-primary-dark shadow-sm">
              ☎
            </div>
            <div className="leading-tight">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Brzi kontakt</p>
              <a href={normalizedPhoneHref} className="text-sm font-semibold text-primary-dark hover:text-accent">
                {primaryPhone}
              </a>
            </div>
          </div>

          <div className="flex items-center gap-2 rounded-full border border-primary-dark/10 bg-white px-3 py-2 text-primary-dark shadow-sm">
            {actionIcons.map((action) => (
              <button
                key={action.label}
                type="button"
                className="group rounded-full p-2 transition hover:bg-beige-dark"
                aria-label={action.label}
              >
                <span className="text-primary-dark group-hover:text-primary">{action.icon}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}
