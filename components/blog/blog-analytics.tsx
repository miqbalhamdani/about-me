"use client";

import { useEffect, useState } from "react";
import { sendGAEvent } from "@next/third-parties/google";
import { MaterialIcon } from "@/components/shared/material-icon";

type BlogPostViewEventProps = {
  slug: string;
  category: string;
};

export function BlogPostViewEvent({ slug, category }: BlogPostViewEventProps) {
  useEffect(() => {
    // Defer a tick: <GoogleAnalytics> creates dataLayer in its own effect, which runs after this one on first load.
    const id = setTimeout(() => sendGAEvent("event", "view_blog_post", { post_slug: slug, post_category: category }));
    return () => clearTimeout(id);
  }, [slug, category]);

  return null;
}

type ShareLinksProps = {
  slug: string;
  title: string;
  url: string;
};

const shareLinkClassName =
  "flex items-center gap-3 border border-outline-variant px-4 py-2 font-label-bold text-label-bold transition-colors hover:bg-primary hover:text-on-primary";

export function ShareLinks({ slug, title, url }: ShareLinksProps) {
  const [copied, setCopied] = useState(false);
  const trackShare = (method: string) => sendGAEvent("event", "share", { method, content_type: "blog_post", item_id: slug });

  const copyLink = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    trackShare("copy_link");
  };

  return (
    <div className="flex flex-col gap-2">
      <a
        className={shareLinkClassName}
        href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
        onClick={() => trackShare("linkedin")}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MaterialIcon icon="description" className="text-[18px]" />
        LinkedIn
      </a>
      <a
        className={shareLinkClassName}
        href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`}
        onClick={() => trackShare("twitter")}
        rel="noopener noreferrer"
        target="_blank"
      >
        <MaterialIcon icon="alternate_email" className="text-[18px]" />
        Twitter
      </a>
      <button className={shareLinkClassName} onClick={copyLink} type="button">
        <MaterialIcon icon={copied ? "check" : "link"} className="text-[18px]" />
        {copied ? "Link Copied" : "Copy Link"}
      </button>
    </div>
  );
}
