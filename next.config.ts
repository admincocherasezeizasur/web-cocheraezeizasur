import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "output: export" is incompatible with opennextjs-cloudflare (Workers).
  // OpenNext manages the output bundling for Cloudflare — do not set output here.
  images: { unoptimized: true },
};

export default nextConfig;
