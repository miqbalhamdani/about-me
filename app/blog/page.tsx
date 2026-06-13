import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MaterialIcon } from "@/components/shared/material-icon";
import { formatShortBlogDate, getAllBlogPosts, getBlogCategories, getRecommendedBlogPosts } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Blog",
  description: "Engineering, product, and interface notes from Iqbal Hamdani.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: siteConfig.name,
    title: `Blog | ${siteConfig.name}`,
    description: "Engineering, product, and interface notes from Iqbal Hamdani.",
  },
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

function getCategoryHref(category: string): string {
  return `/blog?category=${encodeURIComponent(category)}`;
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const [{ category }, posts, categories, recommendedPosts] = await Promise.all([
    searchParams,
    getAllBlogPosts(),
    getBlogCategories(),
    getRecommendedBlogPosts(undefined, 3),
  ]);
  const selectedCategory = typeof category === "string" && categories.includes(category) ? category : "All";
  const visiblePosts = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);

  return (
    <main className="w-full max-w-max-width mx-auto px-margin-mobile md:px-margin-desktop py-section-gap">
      <header className="mb-12 max-w-3xl">
        <p className="mb-4 font-label-bold text-label-bold uppercase tracking-widest text-secondary">Articles</p>
        <h1 className="font-display-xl-mobile text-display-xl-mobile md:font-display-xl md:text-display-xl text-primary">
          Blog
        </h1>
        <p className="mt-6 font-body-lg text-body-lg text-on-surface-variant">
          Practical notes on frontend engineering, product systems, and the craft of building interfaces that hold up.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-gutter lg:grid-cols-12">
        <section className="flex flex-col lg:col-span-8" aria-label="Article feed">
          <nav className="mb-element-gap flex gap-6 overflow-x-auto border-b border-outline-variant pb-4" aria-label="Blog categories">
            <Link
              className={`whitespace-nowrap pb-1 font-label-bold text-label-bold uppercase tracking-widest transition-colors ${
                selectedCategory === "All" ? "border-b-2 border-primary text-primary" : "text-secondary hover:text-primary"
              }`}
              href="/blog"
            >
              All
            </Link>
            {categories.map((item) => (
              <Link
                className={`whitespace-nowrap pb-1 font-label-bold text-label-bold uppercase tracking-widest transition-colors ${
                  selectedCategory === item ? "border-b-2 border-primary text-primary" : "text-secondary hover:text-primary"
                }`}
                href={getCategoryHref(item)}
                key={item}
              >
                {item}
              </Link>
            ))}
          </nav>

          <div className="flex flex-col gap-element-gap">
            {visiblePosts.map((post, index) => (
              <article
                className={`group flex flex-col gap-8 pb-element-gap md:flex-row ${
                  index < visiblePosts.length - 1 ? "border-b border-outline-variant" : ""
                }`}
                key={post.slug}
              >
                <div className="flex flex-1 flex-col justify-center">
                  <div className="mb-3 flex flex-wrap items-center gap-2 font-label-sm text-label-sm text-secondary">
                    <span>{formatShortBlogDate(post.date)}</span>
                    <span aria-hidden="true">.</span>
                    <span>{post.readTime}</span>
                    <span aria-hidden="true">.</span>
                    <span className="bg-surface-container px-2 py-0.5 font-label-bold text-[10px] uppercase tracking-wider text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
                    <Link className="hover:underline" href={`/blog/${post.slug}`}>
                      {post.title}
                    </Link>
                  </h2>
                  <p className="mb-4 line-clamp-2 font-body-lg text-body-lg text-on-surface-variant">{post.description}</p>
                  <Link
                    className="mt-auto flex w-max items-center gap-1 font-label-bold text-label-bold uppercase tracking-widest text-primary hover:text-secondary"
                    href={`/blog/${post.slug}`}
                  >
                    Read Article
                    <MaterialIcon icon="arrow_forward" className="text-[16px]" />
                  </Link>
                </div>

                <Link
                  className="relative h-48 w-full shrink-0 overflow-hidden border border-outline-variant bg-surface-container-high md:h-auto md:w-64"
                  href={`/blog/${post.slug}`}
                  aria-label={`Read ${post.title}`}
                >
                  <Image
                    alt={post.coverAlt}
                    className="object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105"
                    fill
                    sizes="(min-width: 768px) 256px, 100vw"
                    src={post.coverImage}
                  />
                </Link>
              </article>
            ))}
          </div>
        </section>

        <aside className="hidden border-l border-outline-variant pl-12 lg:col-span-4 lg:block" aria-label="Recommended posts">
          <div className="sticky top-32">
            <h2 className="mb-6 flex items-center gap-2 font-label-bold text-label-bold uppercase tracking-widest text-primary">
              <span className="block h-2 w-2 rounded-full bg-primary" aria-hidden="true" />
              Recommended for you
            </h2>
            <div className="flex flex-col gap-8">
              {recommendedPosts.map((post) => (
                <Link className="group" href={`/blog/${post.slug}`} key={post.slug}>
                  <div className="mb-1 font-label-sm text-label-sm text-secondary">
                    {post.category} · {post.readTime}
                  </div>
                  <h3 className="mb-2 font-body-lg text-body-lg font-semibold leading-tight text-primary group-hover:underline">
                    {post.title}
                  </h3>
                  <p className="line-clamp-2 font-body-md text-body-md text-secondary">{post.description}</p>
                </Link>
              ))}
            </div>
            <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-outline-variant pt-8">
              <a className="font-label-sm text-label-sm text-secondary transition-colors hover:text-primary" href="mailto:iqbalhamdani27@gmail.com">
                Contact
              </a>
              <Link className="font-label-sm text-label-sm text-secondary transition-colors hover:text-primary" href="/#portfolio">
                Work
              </Link>
              <Link className="font-label-sm text-label-sm text-secondary transition-colors hover:text-primary" href="/#about">
                About
              </Link>
              <Link className="font-label-sm text-label-sm text-secondary transition-colors hover:text-primary" href="/blog">
                Blog
              </Link>
            </div>
          </div>
        </aside>
      </div>
    </main>
  );
}
