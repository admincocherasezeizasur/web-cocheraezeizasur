"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

// output: 'export' does not support server-side redirect().
// This client component redirects to /es immediately on mount.
// Cloudflare Pages also handles this at the CDN level via public/_redirects.
export default function RootPage() {
  const router = useRouter();
  useEffect(() => {
    router.replace("/es");
  }, [router]);
  return null;
}
