import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Static export: pre-renders all pages to HTML/CSS/JS at build time.
  // No Cloudflare Worker runs per request → eliminates Error 1102 permanently.
  output: "export",

  images: {
    // Image optimization requires a running server — not available with static export.
    // All images are already hand-optimized WebP files, so there is no quality loss.
    unoptimized: true,
  },
};

export default nextConfig;
