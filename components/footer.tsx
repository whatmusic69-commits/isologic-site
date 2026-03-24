import React from "react";
import Link from "next/link";
import { Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";

export default function Footer({ lang }: { lang: Lang }) {
  const t = ui.footer[lang];
  return (
    <footer className="mt-16 border-t border-neutral-200/70 bg-white/60">
      <div className="section grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-2">
          <Link href={`/${lang}`} className="text-xl font-semibold">ISOLOGIC</Link>
          <p className="mt-3 max-w-md text-sm text-neutral-600">{t.tagline}</p>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">{t.quickLinks}</p>
          <ul className="mt-3 space-y-2 text-sm">
            <li><Link className="hover:text-accent" href={`/${lang}`}>{t.links.home}</Link></li>
            <li><Link className="hover:text-accent" href={`/${lang}/about`}>{t.links.about}</Link></li>
            <li><Link className="hover:text-accent" href={`/${lang}/services`}>{t.links.services}</Link></li>
            <li><Link className="hover:text-accent" href={`/${lang}/faq`}>{t.links.faq}</Link></li>
            <li><Link className="hover:text-accent" href={`/${lang}/contact`}>{t.links.contact}</Link></li>
            <li><Link className="hover:text-accent" href={`/${lang}/privacy`}>{t.links.privacy}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-neutral-900">{t.contact}</p>
          <ul className="mt-3 space-y-1 text-sm text-neutral-700">
            <li>Email: info@isologic.lv</li>
            <li>+371 0000 0000</li>
            <li>Riga, Brīvības iela 1</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-neutral-200/70">
        <div className="mx-auto max-w-6xl px-6 py-4 text-xs text-neutral-600">
          © {new Date().getFullYear()} ISOLOGIC — {t.rights}
        </div>
      </div>
    </footer>
  );
}
