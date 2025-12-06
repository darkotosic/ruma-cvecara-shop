import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/react";
import "./globals.css";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import { LocationProvider } from "./location-context";
import { getCurrentLocation } from "@/lib/current-location";
import SeoSchema from "@/components/common/SeoSchema";
import { buildLocalBusinessSchema, getDefaultMetadata } from "@/lib/seo";
import type { ReactNode } from "react";

const inter = Inter({ subsets: ["latin"] });

export async function generateMetadata(): Promise<Metadata> {
  const location = getCurrentLocation();

  return getDefaultMetadata(location);
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const currentLocation = getCurrentLocation();
  const gtmId = process.env.NEXT_PUBLIC_GTM_ID;

  return (
    <html lang="sr">
      <head>
        {gtmId ? (
          <Script id="gtm-script" strategy="afterInteractive">
            {`
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${gtmId}');
            `}
          </Script>
        ) : null}
        <SeoSchema data={buildLocalBusinessSchema(currentLocation)} />
      </head>
      <body className={`${inter.className} bg-beige-light text-primary-dark`}>
        {gtmId ? (
          <noscript
            dangerouslySetInnerHTML={{
              __html: `
                <iframe src="https://www.googletagmanager.com/ns.html?id=${gtmId}"
                height="0" width="0" style="display:none;visibility:hidden"></iframe>
              `,
            }}
          />
        ) : null}
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
