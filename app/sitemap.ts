import type { MetadataRoute } from "next";
import { languages } from "@/lib/i18n";
import { getBaseUrl } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = getBaseUrl();
  const now = new Date();

  const routes: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: now, changeFrequency: "weekly", priority: 0.6 },
  ];

  for (const lang of languages) {
    routes.push({ url: `${base}/${lang}`, lastModified: now, changeFrequency: "weekly", priority: 0.8 });
    routes.push({ url: `${base}/${lang}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    routes.push({ url: `${base}/${lang}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    routes.push({ url: `${base}/${lang}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.5 });
    routes.push({ url: `${base}/${lang}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.4 });
    routes.push({ url: `${base}/${lang}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.6 });
  }

  return routes;
}
