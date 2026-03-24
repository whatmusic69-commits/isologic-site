import { Lang } from "./i18n";

export const ui: {
  nav: Record<Lang, {
    home: string; about: string; services: string; contact: string; faq: string;
    servicesDropdown: { items: { label: string; slug: "acceptance" | "license" | "risk-review" | "internal-audit" }[] }
  }>;
  footer: Record<Lang, { tagline: string; quickLinks: string; contact: string; links: { home: string; about: string; services: string; faq: string; contact: string }; rights: string }>;
} = {
  nav: {
    lv: {
      home: "Sākums",
      about: "Par mums",
      services: "Pakalpojumi",
      contact: "Kontakti",
      faq: "BUJ",
      servicesDropdown: {
        items: [
          { label: "Pieņemšana", slug: "acceptance" },
          { label: "Licencēšana", slug: "license" },
          { label: "Riska pārskats", slug: "risk-review" },
          { label: "Iekšējais audits", slug: "internal-audit" }
        ]
      }
    },
    en: {
      home: "Home",
      about: "About us",
      services: "Services",
      contact: "Contact",
      faq: "FAQs",
      servicesDropdown: {
        items: [
          { label: "Acceptance", slug: "acceptance" },
          { label: "License", slug: "license" },
          { label: "Risk Review", slug: "risk-review" },
          { label: "Internal Audit", slug: "internal-audit" }
        ]
      }
    },
    ru: {
      home: "Главная",
      about: "О нас",
      services: "Услуги",
      contact: "Контакты",
      faq: "Вопросы",
      servicesDropdown: {
        items: [
          { label: "Приёмка", slug: "acceptance" },
          { label: "Лицензирование", slug: "license" },
          { label: "Оценка рисков", slug: "risk-review" },
          { label: "Внутренний аудит", slug: "internal-audit" }
        ]
      }
    },
  },
  footer: {
    lv: {
      tagline: "Neatkarīgs audits un atbilstības konsultācijas. Precizitāte, uzticamība, rezultāts.",
      quickLinks: "Noderīgas saites",
      contact: "Saziņa",
      links: { home: "Sākums", about: "Par mums", services: "Pakalpojumi", faq: "BUJ", contact: "Kontakti" },
      rights: "Visas tiesības aizsargātas.",
    },
    en: {
      tagline: "Independent audit and compliance advisory. Precision. Trust. Results.",
      quickLinks: "Quick links",
      contact: "Contact",
      links: { home: "Home", about: "About us", services: "Services", faq: "FAQs", contact: "Contact" },
      rights: "All rights reserved.",
    },
    ru: {
      tagline: "Независимый аудит и консультирование по соответствию. Точность. Доверие. Результат.",
      quickLinks: "Ссылки",
      contact: "Контакты",
      links: { home: "Главная", about: "О нас", services: "Услуги", faq: "Вопросы", contact: "Контакты" },
      rights: "Все права защищены.",
    },
  },
};
