import type { Metadata } from "next";

import ShopPageContent from "@/components/shop/ShopPageContent";
import SeoSchema from "@/components/common/SeoSchema";
import { buildBreadcrumbSchema, getCategoryMetadata } from "@/lib/seo";
import { getCurrentLocation } from "@/lib/current-location";

export const dynamic = "force-dynamic";

export async function generateMetadata(): Promise<Metadata> {
  const location = getCurrentLocation();

  return getCategoryMetadata("Shop", location, "/shop");
}

export default function ShopPage() {
  const location = getCurrentLocation();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Početna", url: `https://${location.domain}` },
    { name: "Shop", url: `https://${location.domain}/shop` },
  ]);

  return (
    <>
      <SeoSchema data={breadcrumbSchema} />
      <ShopPageContent />
    </>
  );
}
