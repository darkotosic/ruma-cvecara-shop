import { HeroCampaign } from "@/lib/cms-types";

export const heroCampaignsMock: HeroCampaign[] = [
  {
    id: "hero-001",
    naslov: "Dan zaljubljenih u Rumi",
    opis: "Specijalne kombinacije ruža i čokolade za brzu dostavu u centru Rume i okolini.",
    slika: "/images/hero-valentines.jpg",
    datumOd: "2025-02-01",
    datumDo: "2025-02-15",
    grad: "ruma",
  },
  {
    id: "hero-002",
    naslov: "Prolećni buketi Novi Sad",
    opis: "Pastelne note lala i božura sa lokalnim isporukama u istom danu.",
    slika: "/images/hero-spring.jpg",
    datumOd: "2025-03-01",
    datumDo: "2025-03-31",
    grad: "novi-sad",
  },
  {
    id: "hero-003",
    naslov: "Letnje korpe Beograd",
    opis: "Lagani citrusni tonovi u pletenim korpama za brze narudžbine u Beogradu.",
    slika: "/images/hero-summer.jpg",
    datumOd: "2025-06-01",
    datumDo: "2025-08-31",
    grad: "beograd",
  },
];
