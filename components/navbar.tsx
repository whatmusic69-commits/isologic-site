"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Lang } from "@/lib/i18n";
import { ui } from "@/lib/ui";
import LanguageSwitcher from "./language-switcher";
import clsx from "./util/clsx";
import { useRef, useState } from "react";

export default function Navbar({ lang }: { lang: Lang }) {
  const pathname = usePathname();
  const t = ui.nav[lang];
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function openServices() {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    setServicesOpen(true);
  }

  function scheduleCloseServices() {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(() => setServicesOpen(false), 160);
  }

  const links = [
    { href: `/${lang}`, label: t.home, match: `/${lang}` },
    { href: `/${lang}/about`, label: t.about, match: `/${lang}/about` },
    { href: `/${lang}/services`, label: t.services, match: `/${lang}/services`, dropdown: t.servicesDropdown.items.map((i) => ({ label: i.label, href: `/${lang}/services/${i.slug}` })) },
    { href: `/${lang}/faq`, label: t.faq, match: `/${lang}/faq` },
    { href: `/${lang}/contact`, label: t.contact, match: `/${lang}/contact` },
  ];

  function isActive(match: string) {
    if (!pathname) return false;
    return pathname === match || pathname.startsWith(match + "/");
  }

  return (
    <header className="sticky top-0 z-40 bg-[var(--background)] text-[var(--foreground)] border-b" style={{ borderColor: "var(--border)" }}>
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <div className="flex items-center gap-3">
          <button
            className="md:hidden -ml-2 rounded-md p-2 hover:bg-[color:var(--surface-muted)]"
            onClick={() => setOpen((v) => !v)}
            aria-label="Menu"
            aria-expanded={open}
          >
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current mb-1"></span>
            <span className="block h-0.5 w-5 bg-current"></span>
          </button>
          <a href={`/${lang}`} className="text-xl font-semibold" title="ISOLOGIC">
            ISOLOGIC
          </a>
        </div>

        <div className="hidden md:flex items-center gap-8">
          {links.map((l) => {
            if (l.dropdown) {
              return (
                <div
                  key={l.href}
                  className="relative"
                  onMouseEnter={openServices}
                  onMouseLeave={scheduleCloseServices}
                >
                  <Link
                    href={l.href}
                    className={clsx("nav-link flex items-center gap-1", isActive(l.match) && "nav-link-active")}
                    aria-haspopup="menu"
                    aria-expanded={servicesOpen}
                  >
                    {l.label}
                    <span className={clsx("transition-transform", servicesOpen ? "rotate-180" : "rotate-0")}>
                      ▾
                    </span>
                  </Link>
                  <div
                    className={clsx(
                      "absolute left-0 mt-0 w-56 overflow-hidden rounded-xl border bg-white shadow-lg transition-all duration-200",
                      servicesOpen ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-1 pointer-events-none"
                    )}
                    style={{ borderColor: "var(--border)" }}
                    role="menu"
                    onMouseEnter={openServices}
                    onMouseLeave={scheduleCloseServices}
                  >
                    <ul className="py-2">
                      {l.dropdown.map((d) => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            className="block px-4 py-2 text-sm text-neutral-800 hover:bg-neutral-100/70 transform transition-transform duration-200 hover:translate-x-0.5"
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                className={clsx("nav-link", isActive(l.match) && "nav-link-active")}
              >
                {l.label}
              </Link>
            );
          })}
          <LanguageSwitcher current={lang} />
        </div>

        <div className="md:hidden">
          <LanguageSwitcher current={lang} />
        </div>
      </nav>

      {/* Mobile panel */}
      <div
        className={clsx(
          "md:hidden overflow-hidden border-t transition-[max-height] duration-300",
          open ? "max-h-96" : "max-h-0"
        )}
        style={{ borderColor: "var(--border)" }}
      >
        <div className="px-6 py-3 space-y-3 bg-white">
          {links.map((l) => {
            if (l.dropdown) {
              return (
                <div key={l.href} className="space-y-2">
                  <button
                    className="w-full text-left nav-link flex items-center justify-between"
                    onClick={() => setServicesOpen((v) => !v)}
                    aria-expanded={servicesOpen}
                    aria-controls="mobile-services"
                  >
                    <span className={clsx(isActive(l.match) && "nav-link-active")}>{l.label}</span>
                    <span className={clsx("transition-transform", servicesOpen ? "rotate-180" : "rotate-0")}>▾</span>
                  </button>
                  <div
                    id="mobile-services"
                    className={clsx(
                      "overflow-hidden transition-[max-height,opacity] duration-200 pl-3 border-l",
                      servicesOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-70"
                    )}
                    style={{ borderColor: "var(--border)" }}
                  >
                    <ul className="py-2">
                      {l.dropdown.map((d) => (
                        <li key={d.href}>
                          <Link
                            href={d.href}
                            onClick={() => setOpen(false)}
                            className="block py-2 text-sm text-neutral-800 hover:text-accent transform transition-transform duration-200 hover:translate-x-0.5"
                          >
                            {d.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            }
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className={clsx("block nav-link", isActive(l.match) && "nav-link-active")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
