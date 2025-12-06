import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

import { LocationProvider } from "./location-context";
import { getCurrentLocation } from "@/lib/current-location";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ruma Cvećara Shop",
  description: "Pastelni e-commerce doživljaj za lokalnu cvećaru.",
};

export default function RootLayout({ children }: { children: ReactNode }) {
  const currentLocation = getCurrentLocation();

  return (
    <html lang="sr">
      <body className={`${inter.className} bg-beige-light text-primary-dark`}>
        <LocationProvider value={currentLocation}>{children}</LocationProvider>
      </body>
    </html>
  );
}
