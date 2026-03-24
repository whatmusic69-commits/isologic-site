import { Lang } from "./i18n";

export const ui: {
  nav: Record<Lang, {
    home: string; about: string; services: string; contact: string; faq: string;
    servicesDropdown: { items: { label: string; slug: "implementation" | "internal-auditing" | "iso-maintenance" | "lead-auditing" }[] }
  }>;
  footer: Record<Lang, { tagline: string; quickLinks: string; contact: string; links: { home: string; about: string; services: string; faq: string; contact: string; privacy: string }; rights: string }>;
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
          { label: "ISO ieviešana", slug: "implementation" },
          { label: "Iekšējais audits", slug: "internal-auditing" },
          { label: "ISO uzturēšana", slug: "iso-maintenance" },
          { label: "Vadošā auditora pakalpojumi", slug: "lead-auditing" }
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
          { label: "ISO Implementation", slug: "implementation" },
          { label: "Internal Auditing", slug: "internal-auditing" },
          { label: "ISO Maintenance", slug: "iso-maintenance" },
          { label: "Lead Auditing Services", slug: "lead-auditing" }
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
          { label: "Внедрение ISO", slug: "implementation" },
          { label: "Внутренний аудит", slug: "internal-auditing" },
          { label: "Поддержка ISO", slug: "iso-maintenance" },
          { label: "Услуги ведущего аудитора", slug: "lead-auditing" }
        ]
      }
    },
  },
  footer: {
    lv: {
      tagline: "Neatkarīgs audits un atbilstības konsultācijas. Precizitāte, uzticamība, rezultāts.",
      quickLinks: "Noderīgas saites",
      contact: "Saziņa",
      links: { home: "Sākums", about: "Par mums", services: "Pakalpojumi", faq: "BUJ", contact: "Kontakti", privacy: "Privātuma politika" },
      rights: "Visas tiesības aizsargātas.",
    },
    en: {
      tagline: "Independent audit and compliance advisory. Precision. Trust. Results.",
      quickLinks: "Quick links",
      contact: "Contact",
      links: { home: "Home", about: "About us", services: "Services", faq: "FAQs", contact: "Contact", privacy: "Privacy Policy" },
      rights: "All rights reserved.",
    },
    ru: {
      tagline: "Независимый аудит и консультирование по соответствию. Точность. Доверие. Результат.",
      quickLinks: "Ссылки",
      contact: "Контакты",
      links: { home: "Главная", about: "О нас", services: "Услуги", faq: "Вопросы", contact: "Контакты", privacy: "Политика конфиденциальности" },
      rights: "Все права защищены.",
    },
  },
};
