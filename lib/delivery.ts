import type { LocationConfig } from "@/config/locations";

export function getDeliveryCost(location: LocationConfig, zoneName?: string) {
  const fallback = location.zone_dostave[0];
  const zone = location.zone_dostave.find((item) => item.naziv === zoneName) ?? fallback;
  const osnovica = zone?.cena ?? 0;

  return Math.round(osnovica * (1 + location.porez_dostava));
}

export function getDeliveryRange(location: LocationConfig) {
  const values = location.zone_dostave.map((zone) => getDeliveryCost(location, zone.naziv));

  if (values.length === 0) {
    return { min: 0, max: 0 };
  }

  const min = Math.min(...values);
  const max = Math.max(...values);

  return { min, max };
}

export function getDeliverySlots(location: LocationConfig) {
  const dostupniSlotovi = ["09:00 - 12:00", "12:00 - 15:00", "16:00 - 19:00"];
  const radnoVreme = location.radno_vreme[0]?.vreme;

  if (!radnoVreme) {
    return dostupniSlotovi;
  }

  const [pocetak, kraj] = radnoVreme.split("-").map((value) => value.trim());

  return [
    `${pocetak} - ${pocetak === "08:00" ? "11:00" : "12:00"}`,
    `${pocetak === "08:00" ? "11:00" : "12:00"} - 15:00`,
    `${pocetak === "08:00" ? "15:00" : "16:00"} - ${kraj}`,
  ];
}
