export type DeliveryZone = {
  naziv: string;
  cena: number;
};

export type RadnoVreme = {
  dani: string;
  vreme: string;
};

export type LocationConfig = {
  slug: string;
  domain: string;
  adresa: string;
  telefoni: string[];
  radno_vreme: RadnoVreme[];
  zone_dostave: DeliveryZone[];
  porez_dostava: number;
  lokalni_hero_vizual: string;
};

export const locations: LocationConfig[] = [
  {
    slug: "ruma",
    domain: "ruma.cvecara.shop",
    adresa: "Glavna 12, Ruma",
    telefoni: ["+381 60 123 4567", "+381 22 123 789"],
    radno_vreme: [
      { dani: "Pon - Pet", vreme: "08:00 - 20:00" },
      { dani: "Subota", vreme: "09:00 - 17:00" },
      { dani: "Nedelja", vreme: "10:00 - 14:00" },
    ],
    zone_dostave: [
      { naziv: "Ruma centar", cena: 0 },
      { naziv: "Putinci / Kraljevci", cena: 250 },
      { naziv: "Irig / Sremska Mitrovica", cena: 450 },
    ],
    porez_dostava: 0.1,
    lokalni_hero_vizual:
      "https://images.unsplash.com/photo-1529429617124-aee0b2fb0c0f?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "novi-sad",
    domain: "novi-sad.cvecara.shop",
    adresa: "Zmaj Jovina 4, Novi Sad",
    telefoni: ["+381 63 555 111", "+381 21 456 789"],
    radno_vreme: [
      { dani: "Pon - Pet", vreme: "09:00 - 21:00" },
      { dani: "Subota", vreme: "09:00 - 18:00" },
      { dani: "Nedelja", vreme: "10:00 - 16:00" },
    ],
    zone_dostave: [
      { naziv: "Centar i Liman", cena: 0 },
      { naziv: "Podbara / Salajka", cena: 180 },
      { naziv: "Petrovaradin / Sremska Kamenica", cena: 300 },
    ],
    porez_dostava: 0.12,
    lokalni_hero_vizual:
      "https://images.unsplash.com/photo-1529122312921-9c081eb0b4c6?auto=format&fit=crop&w=1200&q=80",
  },
  {
    slug: "beograd",
    domain: "beograd.cvecara.shop",
    adresa: "Knez Mihailova 18, Beograd",
    telefoni: ["+381 64 222 888", "+381 11 555 000"],
    radno_vreme: [
      { dani: "Pon - Pet", vreme: "08:00 - 22:00" },
      { dani: "Subota", vreme: "09:00 - 20:00" },
      { dani: "Nedelja", vreme: "09:00 - 18:00" },
    ],
    zone_dostave: [
      { naziv: "Stari grad / Dorćol", cena: 0 },
      { naziv: "Vračar / Slavija", cena: 220 },
      { naziv: "Novi Beograd / Zemun", cena: 350 },
    ],
    porez_dostava: 0.15,
    lokalni_hero_vizual:
      "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=1200&q=80",
  },
];

export const defaultLocation = locations[0];

export function getLocationByHost(host?: string | null): LocationConfig {
  const normalizedHost = host?.split(":")[0]?.toLowerCase();
  const found = locations.find((location) => location.domain === normalizedHost);

  return found ?? defaultLocation;
}
