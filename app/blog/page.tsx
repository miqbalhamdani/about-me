import type { Metadata } from "next";
import { Suspense } from "react";
import { BlogFeed, BlogFeedFromQuery } from "@/components/blog/blog-feed";
import { formatShortBlogDate, getAllBlogPosts, getBlogCategories } from "@/lib/blog";
import { siteConfig } from "@/lib/site";

const description =
  "Articles by Iqbal Hamdani on frontend engineering and DevOps: Next.js rendering, React forms, Git workflows, Vercel domains, and self-hosted MinIO.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    type: "website",
    url: "/blog",
    siteName: siteConfig.name,
    title: `Blog | ${siteConfig.name}`,
    description,
    images: [siteConfig.defaultOgImage],
  },
};

type BlogPageProps = {
  searchParams: Promise<{ category?: string | string[] }>;
};

export default async function BlogPage() {
  const [allPosts, categories] = await Promise.all([getAllBlogPosts(), getBlogCategories()]);
  const posts = allPosts.map((post) => ({ ...post, dateLabel: formatShortBlogDate(post.date) }));

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

      <Suspense fallback={<BlogFeed posts={posts} categories={categories} selectedCategory="All" />}>
        <BlogFeedFromQuery posts={posts} categories={categories} />
      </Suspense>
    </main>
  );
}
