import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // "output: export" is incompatible with opennextjs-cloudflare (Workers).
  // OpenNext manages the output bundling for Cloudflare — do not set output here.
  images: {
    formats: ['image/avif', 'image/webp'],
    qualities: [25, 50, 60, 75, 90, 100],
  },
};

export default nextConfig;

import('@opennextjs/cloudflare').then(m => m.initOpenNextCloudflareForDev());
