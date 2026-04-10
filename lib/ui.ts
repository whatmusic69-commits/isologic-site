import { Lang } from "./i18n";
import servicesTranslations from "@/content/translations/services.json";
import uiTranslations from "@/content/translations/ui.json";

export const ui: {
  nav: Record<Lang, {
    home: string; about: string; services: string; contact: string; faq: string;
    servicesDropdown: { items: { label: string; slug: "implementation" | "internal-auditing" | "iso-maintenance" | "food-safety-haccp" | "lead-auditing" }[] }
  }>;
  footer: Record<Lang, { tagline: string; quickLinks: string; contact: string; links: { home: string; about: string; services: string; faq: string; contact: string; privacy: string }; rights: string }>;
} = ((): any => {
  const langs: Lang[] = ["lv", "en", "ru"] as const;
  const makeNav = (l: Lang) => ({
    ...(uiTranslations as any)[l].nav,
    servicesDropdown: {
      items: ["implementation", "internal-auditing", "iso-maintenance", "food-safety-haccp", "lead-auditing"].map((slug) => ({
        slug: slug as any,
        label: ((servicesTranslations as any)[l].nav as Record<string, string>)[slug as any],
      }))
    }
  });
  const makeFooter = (l: Lang) => (uiTranslations as any)[l].footer;
  return {
    nav: Object.fromEntries(langs.map((l) => [l, makeNav(l)])),
    footer: Object.fromEntries(langs.map((l) => [l, makeFooter(l)])),
  };
})();
