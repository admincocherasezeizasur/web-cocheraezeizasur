import type { MetadataRoute } from "next";
import { locales } from "./[lang]/dictionaries";

export const dynamic = "force-static";

const BASE_URL = "https://www.cocherasezeizasur.com";

const routes = [
  { path: "", changeFrequency: "weekly" as const, priority: 1.0 },
  { path: "/politicas", changeFrequency: "monthly" as const, priority: 0.4 },
  { path: "/terminos", changeFrequency: "monthly" as const, priority: 0.4 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(({ path, changeFrequency, priority }) => ({
    url: `${BASE_URL}/es${path}`,
    lastModified: new Date(),
    changeFrequency,
    priority,
    alternates: {
      languages: Object.fromEntries(
        locales.map((lang) => [lang, `${BASE_URL}/${lang}${path}`])
      ),
    },
  }));
}
