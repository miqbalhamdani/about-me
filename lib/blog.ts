import "server-only";

import { promises as fs } from "node:fs";
import path from "node:path";
import { createElement, Fragment, type ReactNode } from "react";
import Image from "next/image";
import type { BlogPost, BlogPostMeta, BlogPostSummary } from "@/lib/content-types";

const blogDirectory = path.join(process.cwd(), "data", "blog");
const frontmatterPattern = /^---\n([\s\S]*?)\n---\n?/;

type MarkdownBlock =
  | { type: "heading"; depth: 2 | 3; text: string }
  | { type: "paragraph"; text: string }
  | { type: "unordered-list"; items: string[] }
  | { type: "ordered-list"; items: string[] }
  | { type: "blockquote"; text: string }
  | { type: "code"; language: string; code: string }
  | { type: "image"; src: string; alt: string };

function parseFrontmatterValue(value: string): string | string[] | boolean {
  const trimmed = value.trim();

  if (trimmed === "true") {
    return true;
  }

  if (trimmed === "false") {
    return false;
  }

  if (trimmed.startsWith("[") && trimmed.endsWith("]")) {
    return trimmed
      .slice(1, -1)
      .split(",")
      .map((item) => item.trim().replace(/^["']|["']$/g, ""))
      .filter(Boolean);
  }

  return trimmed.replace(/^["']|["']$/g, "");
}

function parseFrontmatter(raw: string): { meta: BlogPostMeta; content: string } {
  const match = raw.match(frontmatterPattern);

  if (!match) {
    throw new Error("Blog post is missing frontmatter.");
  }

  const data: Record<string, string | string[] | boolean> = {};

  for (const line of match[1].split("\n")) {
    const separatorIndex = line.indexOf(":");

    if (separatorIndex === -1) {
      continue;
    }

    const key = line.slice(0, separatorIndex).trim();
    const value = line.slice(separatorIndex + 1);
    data[key] = parseFrontmatterValue(value);
  }

  const requiredStringFields = [
    "slug",
    "title",
    "description",
    "date",
    "readTime",
    "category",
    "coverImage",
    "coverAlt",
  ] as const;

  for (const field of requiredStringFields) {
    if (typeof data[field] !== "string" || !data[field]) {
      throw new Error(`Blog post frontmatter is missing ${field}.`);
    }
  }

  if (!Array.isArray(data.tags)) {
    throw new Error("Blog post frontmatter is missing tags.");
  }

  const getString = (field: (typeof requiredStringFields)[number]): string => {
    const value = data[field];

    if (typeof value !== "string" || !value) {
      throw new Error(`Blog post frontmatter is missing ${field}.`);
    }

    return value;
  };

  return {
    meta: {
      slug: getString("slug"),
      title: getString("title"),
      description: getString("description"),
      date: getString("date"),
      readTime: getString("readTime"),
      category: getString("category"),
      tags: data.tags,
      coverImage: getString("coverImage"),
      coverAlt: getString("coverAlt"),
      featured: typeof data.featured === "boolean" ? data.featured : false,
    },
    content: raw.slice(match[0].length).trim(),
  };
}

async function readBlogFile(fileName: string): Promise<BlogPost> {
  const filePath = path.join(blogDirectory, fileName);
  const raw = await fs.readFile(filePath, "utf-8");
  const { meta, content } = parseFrontmatter(raw);

  return {
    ...meta,
    content,
  };
}

function byNewestDate(a: BlogPostMeta, b: BlogPostMeta): number {
  return new Date(`${b.date}T00:00:00Z`).getTime() - new Date(`${a.date}T00:00:00Z`).getTime();
}

export async function getAllBlogPosts(): Promise<BlogPost[]> {
  const entries = await fs.readdir(blogDirectory);
  const blogFiles = entries.filter((entry) => entry.endsWith(".md"));
  const posts = await Promise.all(blogFiles.map((fileName) => readBlogFile(fileName)));

  return posts.sort(byNewestDate);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  try {
    return await readBlogFile(`${slug}.md`);
  } catch {
    return null;
  }
}

export async function getBlogCategories(): Promise<string[]> {
  const posts = await getAllBlogPosts();

  return [...new Set(posts.map((post) => post.category))].sort((a, b) => a.localeCompare(b));
}

export async function getRecommendedBlogPosts(currentSlug?: string, limit = 3): Promise<BlogPostSummary[]> {
  const posts = await getAllBlogPosts();
  const current = posts.find((post) => post.slug === currentSlug);
  const available = posts.filter((post) => post.slug !== currentSlug);
  const sameCategory = current ? available.filter((post) => post.category === current.category) : [];
  const featured = available.filter((post) => post.featured && post.category !== current?.category);
  const remaining = available.filter((post) => post.category !== current?.category && !post.featured);

  return [...sameCategory, ...featured, ...remaining].slice(0, limit);
}

export function formatBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "long",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

export function formatShortBlogDate(date: string): string {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));
}

function isBlockStart(line: string): boolean {
  return (
    /^#{2,3}\s+/.test(line) ||
    /^[-*]\s+/.test(line) ||
    /^\d+\.\s+/.test(line) ||
    /^>\s?/.test(line) ||
    /^```/.test(line) ||
    /^!\[[^\]]*]\([^)]+\)$/.test(line.trim())
  );
}

function parseMarkdownBlocks(markdown: string): MarkdownBlock[] {
  const lines = markdown.replace(/\r\n/g, "\n").split("\n");
  const blocks: MarkdownBlock[] = [];
  let index = 0;

  while (index < lines.length) {
    const line = lines[index];
    const trimmed = line.trim();

    if (!trimmed) {
      index += 1;
      continue;
    }

    if (trimmed.startsWith("```")) {
      const language = trimmed.slice(3).trim();
      const codeLines: string[] = [];
      index += 1;

      while (index < lines.length && !lines[index].trim().startsWith("```")) {
        codeLines.push(lines[index]);
        index += 1;
      }

      blocks.push({ type: "code", language, code: codeLines.join("\n") });
      index += 1;
      continue;
    }

    const imageMatch = trimmed.match(/^!\[([^\]]*)]\(([^)]+)\)$/);

    if (imageMatch) {
      blocks.push({ type: "image", alt: imageMatch[1], src: imageMatch[2] });
      index += 1;
      continue;
    }

    const headingMatch = trimmed.match(/^(#{2,3})\s+(.+)$/);

    if (headingMatch) {
      blocks.push({
        type: "heading",
        depth: headingMatch[1].length as 2 | 3,
        text: headingMatch[2],
      });
      index += 1;
      continue;
    }

    if (/^>\s?/.test(trimmed)) {
      const quoteLines: string[] = [];

      while (index < lines.length && /^>\s?/.test(lines[index].trim())) {
        quoteLines.push(lines[index].trim().replace(/^>\s?/, ""));
        index += 1;
      }

      blocks.push({ type: "blockquote", text: quoteLines.join(" ") });
      continue;
    }

    if (/^[-*]\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^[-*]\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^[-*]\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "unordered-list", items });
      continue;
    }

    if (/^\d+\.\s+/.test(trimmed)) {
      const items: string[] = [];

      while (index < lines.length && /^\d+\.\s+/.test(lines[index].trim())) {
        items.push(lines[index].trim().replace(/^\d+\.\s+/, ""));
        index += 1;
      }

      blocks.push({ type: "ordered-list", items });
      continue;
    }

    const paragraphLines: string[] = [];

    while (index < lines.length && lines[index].trim() && (paragraphLines.length === 0 || !isBlockStart(lines[index].trim()))) {
      paragraphLines.push(lines[index].trim());
      index += 1;
    }

    blocks.push({ type: "paragraph", text: paragraphLines.join(" ") });
  }

  return blocks;
}

function sanitizeHref(href: string): string {
  if (href.startsWith("/") || href.startsWith("#")) {
    return href;
  }

  try {
    const url = new URL(href);

    if (url.protocol === "https:" || url.protocol === "http:" || url.protocol === "mailto:") {
      return href;
    }
  } catch {
    return "#";
  }

  return "#";
}

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const patterns: Array<{ type: "code" | "link" | "strong" | "em"; regex: RegExp }> = [
    { type: "code", regex: /`([^`]+)`/ },
    { type: "link", regex: /\[([^\]]+)]\(([^)\s]+)\)/ },
    { type: "strong", regex: /\*\*([^*]+)\*\*/ },
    { type: "em", regex: /\*([^*]+)\*/ },
  ];
  let firstMatch: { type: "code" | "link" | "strong" | "em"; match: RegExpExecArray } | null = null;

  for (const pattern of patterns) {
    const match = pattern.regex.exec(text);

    if (!match) {
      continue;
    }

    if (!firstMatch || match.index < firstMatch.match.index) {
      firstMatch = { type: pattern.type, match };
    }
  }

  if (!firstMatch) {
    return text ? [text] : [];
  }

  const { type, match } = firstMatch;
  const nodes: ReactNode[] = [];
  const before = text.slice(0, match.index);
  const after = text.slice(match.index + match[0].length);

  if (before) {
    nodes.push(before);
  }

  if (type === "code") {
    nodes.push(
      createElement(
        "code",
        { className: "bg-surface-container px-1.5 py-0.5 font-mono text-[0.9em] text-primary", key: `${keyPrefix}-code-${match.index}` },
        match[1],
      ),
    );
  }

  if (type === "link") {
    const href = sanitizeHref(match[2]);
    nodes.push(
      createElement(
        "a",
        {
          className: "text-primary underline decoration-outline underline-offset-4 hover:decoration-primary",
          href,
          key: `${keyPrefix}-link-${match.index}`,
          rel: href.startsWith("http") ? "noopener noreferrer" : undefined,
          target: href.startsWith("http") ? "_blank" : undefined,
        },
        renderInline(match[1], `${keyPrefix}-link-${match.index}`),
      ),
    );
  }

  if (type === "strong") {
    nodes.push(createElement("strong", { className: "font-semibold text-primary", key: `${keyPrefix}-strong-${match.index}` }, renderInline(match[1], `${keyPrefix}-strong-${match.index}`)));
  }

  if (type === "em") {
    nodes.push(createElement("em", { className: "italic", key: `${keyPrefix}-em-${match.index}` }, renderInline(match[1], `${keyPrefix}-em-${match.index}`)));
  }

  return [...nodes, ...renderInline(after, `${keyPrefix}-after-${match.index}`)];
}

export function renderMarkdown(markdown: string): ReactNode {
  const blocks = parseMarkdownBlocks(markdown);

  return createElement(
    Fragment,
    null,
    blocks.map((block, index) => {
      const key = `md-${index}`;

      if (block.type === "heading") {
        const tag = block.depth === 2 ? "h2" : "h3";
        const className =
          block.depth === 2
            ? "mt-16 mb-6 font-headline-lg-mobile text-headline-lg-mobile text-primary"
            : "mt-10 mb-4 font-body-lg text-body-lg font-semibold text-primary";

        return createElement(tag, { className, key }, renderInline(block.text, key));
      }

      if (block.type === "paragraph") {
        return createElement("p", { className: "mb-8 font-body-md text-body-md text-on-surface-variant", key }, renderInline(block.text, key));
      }

      if (block.type === "unordered-list" || block.type === "ordered-list") {
        const tag = block.type === "unordered-list" ? "ul" : "ol";
        const className = block.type === "unordered-list" ? "mb-8 list-disc space-y-3 pl-6 text-on-surface-variant" : "mb-8 list-decimal space-y-3 pl-6 text-on-surface-variant";

        return createElement(
          tag,
          { className, key },
          block.items.map((item, itemIndex) =>
            createElement("li", { className: "font-body-md text-body-md", key: `${key}-item-${itemIndex}` }, renderInline(item, `${key}-item-${itemIndex}`)),
          ),
        );
      }

      if (block.type === "blockquote") {
        return createElement(
          "blockquote",
          {
            className: "my-12 border-l-4 border-primary pl-8 font-body-lg text-[24px] leading-9 text-primary italic",
            key,
          },
          renderInline(block.text, key),
        );
      }

      if (block.type === "code") {
        return createElement(
          "pre",
          {
            className: "mb-8 overflow-x-auto border border-outline-variant bg-surface-container-low p-5 text-sm text-primary",
            key,
          },
          createElement("code", { className: block.language ? `language-${block.language}` : undefined }, block.code),
        );
      }

      return createElement(
        "figure",
        { className: "my-12", key },
        createElement(
          "div",
          { className: "relative aspect-[16/9] overflow-hidden border border-outline-variant bg-surface-container-low" },
          createElement(Image, {
            alt: block.alt,
            className: "object-cover grayscale",
            fill: true,
            sizes: "(min-width: 1024px) 760px, 100vw",
            src: block.src,
          }),
        ),
        block.alt
          ? createElement("figcaption", { className: "mt-3 font-label-sm text-label-sm text-secondary" }, block.alt)
          : null,
      );
    }),
  );
}
