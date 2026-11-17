import type { NextConfig } from "next";

// Static export for Cloudflare Workers static assets (no Vercel image optimizer).
const nextConfig: NextConfig = {
  output: "export",
  images: { unoptimized: true },
};

export default nextConfig;
