import Link from "next/link";
import { MaterialIcon } from "@/components/shared/material-icon";
import { formatShortBlogDate } from "@/lib/blog";
import type { BlogPostMeta } from "@/lib/content-types";

type WritingSectionProps = {
  posts: BlogPostMeta[];
};

export function WritingSection({ posts }: WritingSectionProps) {
  return (
    <section className="px-margin-mobile md:px-margin-desktop py-section-gap max-w-max-width mx-auto" id="writing">
      <div className="flex flex-wrap items-end justify-between gap-6 mb-12">
        <h2 className="font-headline-lg text-headline-lg uppercase tracking-tighter">Writing</h2>
        <Link
          className="flex items-center gap-1 font-label-bold text-label-bold uppercase tracking-widest text-primary hover:text-secondary"
          href="/blog"
        >
          All articles
          <MaterialIcon icon="arrow_forward" className="text-[16px]" />
        </Link>
      </div>
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            className="group flex flex-col md:flex-row justify-between gap-4 py-8 border-b border-outline-variant hover:bg-surface-container-low transition-colors px-4 -mx-4"
            href={`/blog/${post.slug}`}
          >
            <div className="flex flex-col gap-2 max-w-3xl">
              <h3 className="font-headline-lg text-[24px] font-bold leading-tight group-hover:underline underline-offset-4 decoration-1">
                {post.title}
              </h3>
              <p className="font-body-md text-on-surface-variant line-clamp-2">{post.description}</p>
            </div>
            <span className="shrink-0 font-label-bold text-label-bold uppercase tracking-widest text-secondary">
              {formatShortBlogDate(post.date)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
}
