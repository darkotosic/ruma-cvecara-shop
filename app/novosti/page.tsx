import type { Metadata } from "next";
import Link from "next/link";

import SmartImage from "@/components/common/SmartImage";
import SeoSchema from "@/components/common/SeoSchema";
import { blogPostsMock } from "@/data/blog.mock";
import { buildBreadcrumbSchema, getCategoryMetadata } from "@/lib/seo";
import { getCurrentLocation } from "@/lib/current-location";

export async function generateMetadata(): Promise<Metadata> {
  const location = getCurrentLocation();

  return getCategoryMetadata("Novosti", location, "/novosti");
}

export default function NovostiPage() {
  const location = getCurrentLocation();
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Početna", url: `https://${location.domain}` },
    { name: "Novosti", url: `https://${location.domain}/novosti` },
  ]);

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-6xl px-6 space-y-8">
        <SeoSchema data={breadcrumbSchema} />
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Blog</p>
            <h1 className="text-3xl font-semibold text-primary-dark">Novosti i inspiracija</h1>
            <p className="text-primary-dark/80">Kratke priče iz radionice, ideje za poklon i praktični saveti o aranžmanima.</p>
          </div>
          <Link
            href="/kontakt"
            className="rounded-full bg-primary-dark px-5 py-3 text-sm font-semibold text-beige-light transition hover:bg-primary-dark/90"
          >
            Piši nam temu za blog
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPostsMock.map((post) => (
            <article key={post.id} className="flex h-full flex-col overflow-hidden rounded-3xl bg-white shadow-card">
              <div className="relative h-48 overflow-hidden">
                <SmartImage
                  src={post.heroSlika}
                  alt={`Naslovna fotografija za tekst "${post.naslov}"`}
                  fill
                  variant="grid"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/20 to-transparent" aria-hidden />
              </div>
              <div className="flex flex-1 flex-col gap-3 p-5">
                <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-primary-dark/70">
                  {post.tagovi.map((tag) => (
                    <span key={tag} className="rounded-full bg-beige-dark px-3 py-1">
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="space-y-1">
                  <h2 className="text-xl font-semibold text-primary-dark">{post.naslov}</h2>
                  <p className="text-sm text-primary-dark/75 line-clamp-3">{post.sadrzaj}</p>
                </div>
                <div className="mt-auto flex items-center justify-between text-sm text-primary-dark/70">
                  <span>{new Date(post.datum).toLocaleDateString("sr-RS")}</span>
                  <Link
                    href={`/novosti/${post.slug}`}
                    className="font-semibold text-primary-dark underline-offset-4 hover:underline"
                  >
                    Pročitaj više
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
