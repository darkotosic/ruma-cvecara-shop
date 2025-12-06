import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import SmartImage from "@/components/common/SmartImage";
import SeoSchema from "@/components/common/SeoSchema";
import { blogPostsMock } from "@/data/blog.mock";
import { buildArticleSchema, buildBreadcrumbSchema, getBlogPostMetadata } from "@/lib/seo";
import { getCurrentLocation } from "@/lib/current-location";

function getPost(slug: string) {
  return blogPostsMock.find((post) => post.slug === slug);
}

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = getPost(params.slug);

  if (!post) {
    return {};
  }

  return getBlogPostMetadata(post);
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = getPost(params.slug);
  const location = getCurrentLocation();

  if (!post) {
    return notFound();
  }

  const related = blogPostsMock.filter((item) => item.slug !== post.slug).slice(0, 2);
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: "Početna", url: `https://${location.domain}` },
    { name: "Novosti", url: `https://${location.domain}/novosti` },
    { name: post.naslov, url: `https://${location.domain}/novosti/${post.slug}` },
  ]);
  const articleSchema = buildArticleSchema(post);

  return (
    <div className="bg-gradient-to-b from-beige-light to-beige pb-16 pt-10">
      <div className="mx-auto max-w-5xl px-6 space-y-10">
        <SeoSchema data={[breadcrumbSchema, articleSchema]} />
        <nav aria-label="Navigacija mrvice" className="flex items-center gap-2 text-sm text-primary-dark/70">
          <Link href="/" className="font-semibold text-primary-dark hover:text-primary">
            Početna
          </Link>
          <span className="text-primary-dark/40">/</span>
          <Link href="/novosti" className="font-semibold text-primary-dark hover:text-primary">
            Novosti
          </Link>
          <span className="text-primary-dark/40">/</span>
          <span className="font-semibold text-primary-dark">{post.naslov}</span>
        </nav>

        <article className="overflow-hidden rounded-3xl bg-white shadow-card">
          <div className="relative h-80 w-full">
            <SmartImage
              src={post.heroSlika}
              alt={`Hero fotografija za tekst ${post.naslov}`}
              fill
              variant="hero"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary-dark/40 to-transparent" aria-hidden />
            <div className="absolute bottom-6 left-6 space-y-2 text-beige-light">
              <span className="rounded-full bg-white/20 px-3 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-white">
                {new Date(post.datum).toLocaleDateString("sr-RS")}
              </span>
              <h1 className="text-3xl font-semibold leading-tight drop-shadow">{post.naslov}</h1>
              <div className="flex flex-wrap gap-2 text-[11px] font-semibold uppercase tracking-[0.12em] text-beige-light/90">
                {post.tagovi.map((tag) => (
                  <span key={tag} className="rounded-full bg-white/20 px-3 py-1">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-6 p-8 text-lg leading-relaxed text-primary-dark/90">
            {post.sadrzaj.split(". ").map((segment) => (
              <p key={segment} className="text-base text-primary-dark/80">
                {segment.trim().endsWith(".") ? segment.trim() : `${segment.trim()}.`}
              </p>
            ))}
          </div>
        </article>

        <section className="space-y-4 rounded-3xl bg-white p-6 shadow-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.14em] text-primary-dark/70">Još tema</p>
              <h2 className="text-2xl font-semibold text-primary-dark">Preporučeni tekstovi</h2>
            </div>
            <Link href="/novosti" className="text-sm font-semibold text-primary-dark underline-offset-4 hover:underline">
              Sve objave
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {related.map((item) => (
              <article key={item.id} className="rounded-2xl border border-primary-dark/10 bg-beige-dark p-4 shadow-sm">
                <div className="flex items-center gap-3">
                  <div className="relative h-20 w-24 overflow-hidden rounded-xl shadow-inner">
                    <SmartImage
                      src={item.heroSlika}
                      alt={`Uvodna fotografija za tekst ${item.naslov}`}
                      fill
                      variant="card"
                    />
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm font-semibold text-primary-dark">{item.naslov}</p>
                    <p className="text-xs text-primary-dark/70">{new Date(item.datum).toLocaleDateString("sr-RS")}</p>
                    <Link
                      href={`/novosti/${item.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary-dark underline-offset-4 hover:underline"
                    >
                      Otvori <span aria-hidden>→</span>
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
