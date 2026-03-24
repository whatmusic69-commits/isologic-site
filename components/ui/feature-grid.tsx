import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";

type Item = {
  title: string;
  description: string;
  icon?: string;
};

function Icon({ name }: { name?: string }) {
  // Decorative inline icons mapped by JSON value; consistent stroke and size
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
    case "clipboard":
      return (
        <svg {...common}>
          <path d="M9 4h6a2 2 0 0 1 2 2v1h-2.5a1.5 1.5 0 0 0-3 0H9V6a2 2 0 0 1 2-2Z" />
          <rect x="6" y="7" width="12" height="13" rx="2" />
          <path d="M9 12h6M9 16h4" />
        </svg>
      );
    case "cube":
      return (
        <svg {...common}>
          <path d="m12 2 8 4-8 4-8-4 8-4Z" />
          <path d="M4 6v8l8 4 8-4V6" />
        </svg>
      );
    case "layers":
      return (
        <svg {...common}>
          <path d="m12 2 9 5-9 5L3 7l9-5Z" />
          <path d="m3 12 9 5 9-5" />
          <path d="m3 17 9 5 9-5" />
        </svg>
      );
    case "chart":
      return (
        <svg {...common}>
          <path d="M3 3v18h18" />
          <rect x="6" y="12" width="3" height="6" rx="1" />
          <rect x="11" y="9" width="3" height="9" rx="1" />
          <rect x="16" y="6" width="3" height="12" rx="1" />
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

export default function FeatureGrid({
  title,
  subtitle,
  items,
}: {
  title: string;
  subtitle?: string;
  items: Item[];
}) {
  return (
    <section className="section">
      <Reveal>
        <SectionHeading alignment="left" title={title} subtitle={subtitle} />
      </Reveal>
      <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
        {items.map((item, i) => (
          <Reveal key={i}>
            <div className={clsx("card card-hover p-6 md:p-8 h-full")}
                 role="group" aria-labelledby={`feature-title-${i}`}>
              <div className="flex items-start gap-4">
                <div
                  className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full border text-[color:var(--text-on-dark)]"
                  style={{ borderColor: "var(--border-dark)", background: "var(--surface-dark)" }}
                  aria-hidden
                >
                  <Icon name={item.icon} />
                </div>
                <div className="min-w-0">
                  <h3 id={`feature-title-${i}`} className="text-sm font-semibold tracking-wide uppercase text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-neutral-600 leading-6 text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
