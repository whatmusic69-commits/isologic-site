import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";

type IndustryItem = { title: string; icon?: string };

export default function IndustriesSection({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: IndustryItem[];
}) {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading alignment="center" title={title} subtitle={subtitle} />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={i}>
            <div className={clsx("card card-hover p-6 text-center h-full")}> 
              <div
                className="mx-auto h-14 w-14 rounded-full flex items-center justify-center text-[color:var(--text-on-dark)]"
                style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)" }}
                aria-hidden
              >
                <Icon name={it.icon} />
              </div>
              <div className="mt-4 text-xs tracking-wider font-semibold uppercase text-neutral-900">
                {it.title}
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Icon({ name }: { name?: string }) {
  const common = {
    width: 22,
    height: 22,
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
    case "briefcase":
      return (
        <svg {...common}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M9 7V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case "cpu":
      return (
        <svg {...common}>
          <rect x="6" y="6" width="12" height="12" rx="2" />
          <path d="M9 1v3M15 1v3M9 20v3M15 20v3M1 9h3M1 15h3M20 9h3M20 15h3" />
        </svg>
      );
    case "heart-pulse":
      return (
        <svg {...common}>
          <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.6l-1-1a5.5 5.5 0 0 0-7.8 7.8l8.8 8.8 8.8-8.8a5.5 5.5 0 0 0 0-7.8Z" />
          <path d="M7 12h2l2-3 2 4 1-1h3" />
        </svg>
      );
    case "graduation-cap":
      return (
        <svg {...common}>
          <path d="M22 8 12 3 2 8l10 5 10-5Z" />
          <path d="M6 10v5c2 1.5 4 2.5 6 2.5s4-1 6-2.5V10" />
          <path d="M22 8v6" />
        </svg>
      );
    case "scale":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M3 7h18" />
          <path d="M7 7l-4 7h8l-4-7Zm10 0-4 7h8l-4-7Z" />
        </svg>
      );
    case "messages-square":
      return (
        <svg {...common}>
          <rect x="3" y="3" width="18" height="14" rx="2" />
          <path d="M7 21l4-4h8a2 2 0 0 0 2-2v-6" />
        </svg>
      );
    case "landmark":
      return (
        <svg {...common}>
          <path d="M3 9h18L12 4 3 9Z" />
          <path d="M4 10v8M8 10v8M12 10v8M16 10v8M20 10v8M2 18h20" />
        </svg>
      );
    case "building":
      return (
        <svg {...common}>
          <rect x="6" y="3" width="12" height="18" rx="1" />
          <path d="M9 7h2M13 7h2M9 11h2M13 11h2M9 15h2M13 15h2M6 21h12" />
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
