"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { MaterialIcon } from "@/components/shared/material-icon";
import type { BlogPostMeta } from "@/lib/content-types";

// The category filter runs in the browser so /blog can be a static file
// (?category= can't be read at build time).
export type FeedPost = BlogPostMeta & { dateLabel: string };

type FeedProps = { posts: FeedPost[]; categories: string[] };

function getCategoryHref(category: string): string {
  return `/blog?category=${encodeURIComponent(category)}`;
}

function PostMeta({ post }: { post: FeedPost }) {
  return (
    <div className="mb-3 flex flex-wrap items-center gap-2 font-label-sm text-label-sm text-secondary">
      <span>{post.dateLabel}</span>
      <span aria-hidden="true">.</span>
      <span>{post.readTime}</span>
      <span aria-hidden="true">.</span>
      <span className="bg-surface-container px-2 py-0.5 font-label-bold text-[10px] uppercase tracking-wider text-primary">
        {post.category}
      </span>
    </div>
  );
}

const imageClassName = "object-cover grayscale opacity-90 transition-transform duration-700 group-hover:scale-105";
const imageFrameClassName = "relative block aspect-video overflow-hidden border border-outline-variant bg-surface-container-high";

export function BlogFeed({ posts, categories, selectedCategory }: FeedProps & { selectedCategory: string }) {
  const visiblePosts = selectedCategory === "All" ? posts : posts.filter((post) => post.category === selectedCategory);
  const [featured, ...rest] = visiblePosts;

  return (
    <section aria-label="Article feed">
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

      {featured && (
        <article
          className={`group grid gap-8 lg:grid-cols-12 lg:items-center ${
            rest.length > 0 ? "mb-element-gap border-b border-outline-variant pb-element-gap" : ""
          }`}
        >
          <Link className={`${imageFrameClassName} lg:col-span-7`} href={`/blog/${featured.slug}`} aria-label={`Read ${featured.title}`}>
            <Image
              alt={featured.coverAlt}
              className={imageClassName}
              fetchPriority="high"
              fill
              loading="eager"
              sizes="(min-width: 1200px) 600px, (min-width: 1024px) 58vw, 100vw"
              src={featured.coverImage}
            />
          </Link>

          <div className="flex flex-col lg:col-span-5">
            <PostMeta post={featured} />
            <h2 className="mb-4 font-headline-lg-mobile text-headline-lg-mobile text-primary">
              <Link className="hover:underline" href={`/blog/${featured.slug}`}>
                {featured.title}
              </Link>
            </h2>
            <p className="mb-6 line-clamp-3 font-body-md text-body-md text-on-surface-variant">{featured.description}</p>
            <Link
              className="flex w-max items-center gap-1 font-label-bold text-label-bold uppercase tracking-widest text-primary hover:text-secondary"
              href={`/blog/${featured.slug}`}
            >
              Read Article
              <MaterialIcon icon="arrow_forward" className="text-[16px]" />
            </Link>
          </div>
        </article>
      )}

      {rest.length > 0 && (
        <div className="grid gap-x-gutter gap-y-12 md:grid-cols-2">
          {rest.map((post) => (
            <article className="group flex flex-col" key={post.slug}>
              <Link className={`${imageFrameClassName} mb-6`} href={`/blog/${post.slug}`} aria-label={`Read ${post.title}`}>
                <Image
                  alt={post.coverAlt}
                  className={imageClassName}
                  fill
                  sizes="(min-width: 1200px) 520px, (min-width: 768px) 45vw, 100vw"
                  src={post.coverImage}
                />
              </Link>
              <PostMeta post={post} />
              <h2 className="mb-3 text-2xl font-semibold leading-tight tracking-tight text-primary">
                <Link className="hover:underline" href={`/blog/${post.slug}`}>
                  {post.title}
                </Link>
              </h2>
              <p className="line-clamp-2 font-body-md text-body-md text-on-surface-variant">{post.description}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

export function BlogFeedFromQuery({ posts, categories }: FeedProps) {
  const category = useSearchParams().get("category");
  const selectedCategory = category && categories.includes(category) ? category : "All";
  return <BlogFeed posts={posts} categories={categories} selectedCategory={selectedCategory} />;
}
