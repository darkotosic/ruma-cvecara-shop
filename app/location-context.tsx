"use client";

import { createContext, useContext } from "react";

import type { LocationConfig } from "@/config/locations";
import type { ReactNode } from "react";

const LocationContext = createContext<LocationConfig | null>(null);

export function LocationProvider({
  value,
  children,
}: {
  value: LocationConfig;
  children: ReactNode;
}) {
  return <LocationContext.Provider value={value}>{children}</LocationContext.Provider>;
}

export function useCurrentLocation() {
  const location = useContext(LocationContext);

  if (!location) {
    throw new Error("CurrentLocation kontekst nije dostupan.");
  }

  return location;
}
