import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
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
        <LocationProvider value={currentLocation}>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
          <Analytics />
          <CartDrawer />
        </LocationProvider>
      </body>
    </html>
  );
}
