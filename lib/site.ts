import { homepageContent } from "@/lib/site-content";

const DEFAULT_DEV_SITE_URL = "http://localhost:3000";

function normalizeSiteUrl(url: string): string {
  return url.replace(/\/+$/, "");
}

export const siteConfig = {
  name: "Iqbal Hamdani",
  title: "Iqbal Hamdani | Senior Frontend Engineer",
  description:
    "Senior Frontend Engineer with 9+ years of experience building scalable SaaS and enterprise products using Vue, Nuxt, React, Next.js, and TypeScript.",
  locale: "en_US",
  keywords: [
    "Iqbal Hamdani",
    "Senior Frontend Engineer",
    "Frontend Engineer Indonesia",
    "Vue developer",
    "Nuxt developer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
  ],
  email: "iqbalhamdani27@gmail.com",
  role: "Senior Frontend Engineer",
  defaultOgImage: {
    url: "/icon",
    width: 32,
    height: 32,
    alt: "Iqbal Hamdani IH monogram icon",
  },
} as const;

export function getSiteUrl(): string {
  const configuredUrl = process.env.NEXT_PUBLIC_SITE_URL;

  if (configuredUrl) {
    return normalizeSiteUrl(configuredUrl);
  }

  if (process.env.NODE_ENV === "production") {
    throw new Error("NEXT_PUBLIC_SITE_URL is required for production SEO metadata.");
  }

  return DEFAULT_DEV_SITE_URL;
}

export function absoluteUrl(path = "/"): string {
  const normalizedPath = path.startsWith("/") ? path : `/${path}`;

  return `${getSiteUrl()}${normalizedPath}`;
}

export function getProfileLinks(): string[] {
  return homepageContent.footer.links
    .map((link) => link.href)
    .filter((href) => href.startsWith("https://"));
}
