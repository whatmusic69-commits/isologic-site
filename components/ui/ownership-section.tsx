import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";

type OwnershipItem = {
  title: string; // short, prominent, often uppercase
  eyebrow?: string; // short supporting line
  description?: string; // longer paragraph
  icon?: string; // wrench | badge-a | award | shield
};

export default function OwnershipSection({
  title,
  subtitle,
  buttonText,
  buttonHref,
  items,
}: {
  title: string;
  subtitle?: string;
  buttonText?: string;
  buttonHref?: string;
  items: OwnershipItem[];
}) {
  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading alignment="center" title={title} subtitle={subtitle} />
        </Reveal>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.map((it, i) => (
          <Reveal key={i}>
            <div
              className={clsx(
                "card card-hover p-6 h-full text-center",
                "transition duration-300 ease-out"
              )}
            >
              <div className="mx-auto h-16 w-16 rounded-full flex items-center justify-center text-[color:var(--text-on-dark)]"
                   style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)" }}
                   aria-hidden>
                <Icon name={it.icon} />
              </div>
              <div className="mt-4">
                {it.title && (
                  <div className="text-xs tracking-wider font-semibold uppercase text-neutral-900">{it.title}</div>
                )}
                {it.eyebrow && (
                  <div className="mt-1 font-medium text-neutral-800">{it.eyebrow}</div>
                )}
                {it.description && (
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{it.description}</p>
                )}
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      {buttonText && buttonHref && (
        <div className="mt-8 text-center">
          <a href={buttonHref} className="btn btn-primary">{buttonText}</a>
        </div>
      )}
    </section>
  );
}

function Icon({ name }: { name?: string }) {
  const common = {
    width: 24,
    height: 24,
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
    case "wrench":
      return (
        <svg {...common}>
          <path d="M14 7a4 4 0 1 0-5 5l-6 6 2 2 6-6a4 4 0 0 0 3-7Z" />
        </svg>
      );
    case "badge-a":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <path d="M9 14h6M8 10h8" />
          <path d="M10 7l2-2 2 2" />
        </svg>
      );
    case "award":
      return (
        <svg {...common}>
          <circle cx="12" cy="8" r="4" />
          <path d="M8 12v8l4-2 4 2v-8" />
        </svg>
      );
    case "shield":
      return (
        <svg {...common}>
          <path d="M12 2 4.5 5v6.5c0 4.5 3.3 7.7 7.5 9.5 4.2-1.8 7.5-5 7.5-9.5V5L12 2Z" />
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
