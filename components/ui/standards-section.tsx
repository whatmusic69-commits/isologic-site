import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";

type StandardsItem = {
  title: string;
  icon?: string;
};

type StandardsSectionProps = {
  title: string;
  subtitle?: string;
  ctaText?: string;
  ctaHref?: string;
  items: StandardsItem[];
};

function IconBox({ name }: { name?: string }) {
  const common = {
    width: 20,
    height: 20,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
    focusable: false,
  };

  switch (name) {
    case "flag":
      return (
        <svg {...common}>
          <path d="M4 3v18" />
          <path d="M4 5h10l-1.5 3L14 11H4" />
        </svg>
      );
    case "eye":
      return (
        <svg {...common}>
          <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7S1 12 1 12Z" />
          <circle cx="12" cy="12" r="3" />
        </svg>
      );
    case "user-settings":
      return (
        <svg {...common}>
          <circle cx="8" cy="8" r="3.5" />
          <path d="M2 20a6 6 0 0 1 12 0" />
          <circle cx="18" cy="8" r="2.2" />
          <path d="M18 3v2M18 11v2M15 8h-2M23 8h-2M16.4 4.4l-1.4-1.4M20.6 12.6l-1.4-1.4M20.6 3.4l-1.4 1.4M16.4 11.6l-1.4 1.4" />
        </svg>
      );
    case "cloud":
      return (
        <svg {...common}>
          <path d="M6 18a4 4 0 1 1 .5-7.94A6 6 0 1 1 18 16h-8" />
        </svg>
      );
    case "send":
      return (
        <svg {...common}>
          <path d="m22 2-7 20-3-9-9-3 19-8Z" />
          <path d="M12 13 22 2" />
        </svg>
      );
    case "rocket":
      return (
        <svg {...common}>
          <path d="M4 13s2-2 6-2 6 2 6 2 0-4-3-7-3-4-3-4-0 1-3 4-3 7-3 7Z" />
          <path d="M10 12v4M8 18l2-2 2 2" />
        </svg>
      );
    case "tree":
      return (
        <svg {...common}>
          <path d="M12 2 7 10h3l-4 6h5v6h2v-6h5l-4-6h3l-5-8Z" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="8" />
        </svg>
      );
  }
}

export default function StandardsSection({ title, subtitle, ctaText, ctaHref, items }: StandardsSectionProps) {
  return (
    <section className="section">
      <div
        className="relative rounded-2xl border p-6 md:p-10 shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden"
        style={{
          borderColor: "color-mix(in oklab, var(--border) 80%, white)",
          background: "linear-gradient(135deg, #F5F7FB 0%, #F1F4F8 100%)",
        }}
      >
        {/* Thin top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[color:var(--accent)] opacity-20" aria-hidden />
        {/* Subtle radial on the right for balance */}
        <div className="pointer-events-none absolute right-[-6%] top-[-10%] hidden md:block" aria-hidden>
          <div
            className="h-64 w-64 rounded-full"
            style={{
              background:
                "radial-gradient(circle at center, rgba(0,109,182,0.10) 0%, rgba(0,109,182,0.04) 45%, rgba(0,109,182,0.0) 70%)",
              filter: "blur(2px)",
            }}
          />
        </div>

        <div className="relative grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-10">
          <div className="lg:col-span-1">
            <Reveal>
              <SectionHeading alignment="left" title={title} subtitle={subtitle} />
            </Reveal>
            {ctaText && ctaHref && (
              <div className="mt-6">
                <a className="btn btn-primary" href={ctaHref}>{ctaText}</a>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-5">
              {items.map((it, i) => (
                <li
                  key={i}
                  className={clsx(
                    "group rounded-xl border bg-white",
                    "transition duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.01] hover:shadow-md"
                  )}
                  style={{ borderColor: "var(--border)" }}
                >
                  <Reveal>
                    <div className="p-3.5 md:p-4 flex items-center gap-4">
                      <div
                        className="flex h-10 w-10 items-center justify-center rounded-md border bg-white text-black"
                        style={{ borderColor: "var(--border)" }}
                        aria-hidden
                      >
                        <IconBox name={it.icon} />
                      </div>
                      <div className="text-sm font-medium leading-6 text-neutral-800">
                        {it.title}
                      </div>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
