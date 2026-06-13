import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MaterialIcon } from "@/components/shared/material-icon";
import {
  formatBlogDate,
  getAllBlogPosts,
  getBlogPostBySlug,
  getRecommendedBlogPosts,
  renderMarkdown,
} from "@/lib/blog";
import { siteConfig } from "@/lib/site";

export const revalidate = 86400;

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllBlogPosts().then((posts) => posts.map((post) => ({ slug: post.slug })));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    return {
      title: "Article Not Found",
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  const postPath = `/blog/${post.slug}`;
  const image = {
    url: post.coverImage,
    width: 1600,
    height: 900,
    alt: post.coverAlt,
  };

  return {
    title: post.title,
    description: post.description,
    alternates: {
      canonical: postPath,
    },
    openGraph: {
      type: "article",
      url: postPath,
      siteName: siteConfig.name,
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      publishedTime: post.date,
      tags: post.tags,
      images: [image],
    },
    twitter: {
      card: "summary_large_image",
      title: `${post.title} | ${siteConfig.name}`,
      description: post.description,
      images: [post.coverImage],
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = await getBlogPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const recommendedPosts = await getRecommendedBlogPosts(post.slug, 3);
  const content = await renderMarkdown(post.content);

  return (
    <main className="mx-auto w-full max-w-max-width px-margin-mobile py-section-gap md:px-margin-desktop">
      <Link className="mb-12 flex w-max items-center gap-2 font-label-bold text-label-bold uppercase tracking-widest text-secondary hover:text-primary" href="/blog">
        <MaterialIcon icon="arrow_back" className="text-[16px]" />
        Articles
      </Link>

      <header className="mb-16">
        <div className="mb-6 flex flex-wrap gap-2">
          <Link className="bg-primary px-3 py-1 font-label-bold text-label-sm uppercase tracking-wider text-on-primary" href={`/blog?category=${encodeURIComponent(post.category)}`}>
            {post.category}
          </Link>
        </div>
        <h1 className="mb-8 font-display-xl-mobile text-display-xl-mobile text-primary md:font-display-xl md:text-display-xl">
          {post.title}
        </h1>
        <p className="max-w-3xl font-body-lg text-body-lg text-secondary">{post.description}</p>
      </header>

      <div className="flex flex-col gap-16 lg:flex-row">
        <article className="lg:w-[70%]">
          <div className="relative mb-12 aspect-[16/9] overflow-hidden border border-outline-variant bg-surface-container-low">
            <Image
              alt={post.coverAlt}
              className="object-cover grayscale transition-all duration-700 hover:grayscale-0"
              fill
              priority
              sizes="(min-width: 1024px) 760px, 100vw"
              src={post.coverImage}
            />
          </div>
          <div className="font-body-md text-body-md">{content}</div>
        </article>

        <aside className="flex flex-col gap-12 lg:w-[30%]" aria-label="Article information">
          <div className="border-b border-outline-variant pb-8">
            <p className="mb-4 font-label-bold text-label-sm uppercase tracking-widest text-secondary">Author</p>
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-surface-container font-label-bold text-label-bold text-primary grayscale">
                IH
              </div>
              <div>
                <p className="font-label-bold text-label-bold text-primary">Iqbal Hamdani</p>
                <p className="font-label-sm text-label-sm text-secondary">Senior Frontend Engineer</p>
              </div>
            </div>
          </div>

          <div className="border-b border-outline-variant pb-8">
            <div className="flex flex-col gap-4">
              <div>
                <p className="mb-1 font-label-bold text-label-sm uppercase tracking-widest text-secondary">Published</p>
                <p className="font-body-md text-body-md">{formatBlogDate(post.date)}</p>
              </div>
              <div>
                <p className="mb-1 font-label-bold text-label-sm uppercase tracking-widest text-secondary">Read Time</p>
                <p className="font-body-md text-body-md">{post.readTime}</p>
              </div>
            </div>
          </div>

          <div className="sticky top-32 flex flex-col gap-6">
            <div>
              <p className="mb-4 font-label-bold text-label-sm uppercase tracking-widest text-secondary">Share Article</p>
              <div className="flex flex-col gap-2">
                <a
                  className="flex items-center gap-3 border border-outline-variant px-4 py-2 font-label-bold text-label-bold transition-colors hover:bg-primary hover:text-on-primary"
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`/blog/${post.slug}`)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MaterialIcon icon="description" className="text-[18px]" />
                  LinkedIn
                </a>
                <a
                  className="flex items-center gap-3 border border-outline-variant px-4 py-2 font-label-bold text-label-bold transition-colors hover:bg-primary hover:text-on-primary"
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <MaterialIcon icon="alternate_email" className="text-[18px]" />
                  Twitter
                </a>
                <Link
                  className="flex items-center gap-3 border border-outline-variant px-4 py-2 font-label-bold text-label-bold transition-colors hover:bg-primary hover:text-on-primary"
                  href={`/blog/${post.slug}`}
                >
                  <MaterialIcon icon="link" className="text-[18px]" />
                  Copy Link
                </Link>
              </div>
            </div>

            {/* <div className="mt-8">
              <p className="mb-4 font-label-bold text-label-sm uppercase tracking-widest text-secondary">Related Topics</p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <Link className="border border-outline-variant px-3 py-1 font-label-sm text-label-sm italic transition-colors hover:border-primary" href="/blog" key={tag}>
                    #{tag}
                  </Link>
                ))}
              </div>
            </div> */}
          </div>
        </aside>
      </div>

      <section className="mt-section-gap border-t border-outline-variant pt-16">
        <h2 className="mb-12 font-headline-lg-mobile text-headline-lg-mobile text-primary md:font-headline-lg md:text-headline-lg">
          Recommended for You
        </h2>
        <div className="grid grid-cols-1 gap-gutter md:grid-cols-3">
          {recommendedPosts.map((recommendedPost) => (
            <Link className="group" href={`/blog/${recommendedPost.slug}`} key={recommendedPost.slug}>
              <div className="relative mb-6 aspect-video overflow-hidden border border-outline-variant bg-surface-container">
                <Image
                  alt={recommendedPost.coverAlt}
                  className="object-cover grayscale transition-all duration-500 group-hover:scale-105 group-hover:grayscale-0"
                  fill
                  sizes="(min-width: 768px) 33vw, 100vw"
                  src={recommendedPost.coverImage}
                />
              </div>
              <span className="mb-2 block font-label-bold text-label-sm uppercase text-secondary">{recommendedPost.category}</span>
              <h3 className="mb-4 font-headline-lg-mobile text-[24px] leading-tight text-primary underline-offset-4 decoration-1 group-hover:underline">
                {recommendedPost.title}
              </h3>
              <p className="line-clamp-2 font-body-md text-body-md text-secondary">{recommendedPost.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
