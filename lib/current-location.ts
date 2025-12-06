import { headers } from "next/headers";

import { getLocationByHost } from "@/config/locations";

export function getCurrentLocation() {
  const host = headers().get("host");

  return getLocationByHost(host);
}
