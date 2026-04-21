import React from "react";
import Link from "next/link";
import { Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import { MailIcon, PhoneIcon, MapPinIcon, LinkedinIcon } from "./ui/icons";

export default function Footer({ lang }: { lang: Lang }) {
  const t = ui.footer[lang];
  const linkedinHref = t.social?.linkedin?.trim();
  const resolvedLinkedinHref = linkedinHref || "#";
  const email = t.contactDetails?.email?.trim() || "info@isologic.lv";
  const phone = t.contactDetails?.phone?.trim() || "+371 22 33 11 64";
  const phoneHref = t.contactDetails?.phoneHref?.trim() || "+37122331164";
  const address = t.contactDetails?.address?.trim() || "Brīvības Gatve 224B, 3. Korpuss, Riga, LV-1039, Latvia";
  const addressUrl = t.contactDetails?.addressUrl?.trim() || "https://www.google.com/maps?q=Br%C4%ABv%C4%ABbas%20Gatve%20224B%2C%203.%20Korpuss%2C%20Riga%2C%20LV-1039%2C%20Latvia";
  return (
    <footer className="mt-16 bg-[color:var(--surface-dark)] text-[color:var(--text-on-dark)]">
      <div className="mx-auto max-w-6xl px-6 footer-section grid grid-cols-1 md:grid-cols-4 gap-8 md:gap-10">
        <div className="md:col-span-2">
          <Link href={`/${lang}`} className="text-xl font-semibold tracking-tight hover:text-[color:var(--accent)] transition-colors">ISOlogic</Link>
          <p className="mt-2 max-w-md text-sm/6 opacity-90">{t.tagline}</p>
          {/* Socials */}
          <div className="mt-3">
            <a
              href={resolvedLinkedinHref}
              aria-label="LinkedIn"
              target={linkedinHref ? "_blank" : undefined}
              rel={linkedinHref ? "noopener noreferrer" : undefined}
              className="inline-flex items-center justify-center w-9 h-9 rounded-full border transition-colors hover:bg-[color:var(--accent)] hover:text-[color:var(--text-on-dark)]"
              style={{ borderColor: "var(--border-dark)" }}
            >
              <LinkedinIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/90">{t.quickLinks}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}`}>{t.links.home}</Link></li>
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}/about`}>{t.links.about}</Link></li>
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}/services`}>{t.links.services}</Link></li>
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}/faq`}>{t.links.faq}</Link></li>
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}/contact`}>{t.links.contact}</Link></li>
            <li><Link className="hover:text-[color:var(--accent)] transition-colors" href={`/${lang}/privacy`}>{t.links.privacy}</Link></li>
          </ul>
        </div>
        <div>
          <p className="text-sm font-semibold text-white/90">{t.contact}</p>
          <ul className="mt-2 space-y-1.5 text-sm">
            <li className="flex items-start gap-2">
              <MailIcon className="mt-0.5 w-4 h-4 text-white/80" />
              <a className="hover:text-[color:var(--accent)] transition-colors" href={`mailto:${email}`}>{email}</a>
            </li>
            <li className="flex items-start gap-2">
              <PhoneIcon className="mt-0.5 w-4 h-4 text-white/80" />
              <a className="hover:text-[color:var(--accent)] transition-colors" href={`tel:${phoneHref}`}>{phone}</a>
            </li>
            <li className="flex items-start gap-2">
              <MapPinIcon className="mt-0.5 w-4 h-4 text-white/80" />
              <a
                className="hover:text-[color:var(--accent)] transition-colors"
                href={addressUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {address}
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t mt-2" style={{ borderColor: "var(--border-dark)" }}>
        <div className="mx-auto max-w-6xl px-6 py-3 text-xs text-white/70">
          © {new Date().getFullYear()} ISOlogic — {t.rights}
        </div>
      </div>
    </footer>
  );
}
