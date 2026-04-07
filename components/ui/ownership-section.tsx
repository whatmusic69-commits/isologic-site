import React from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";
import { ToolsIcon, BadgeCheckIcon, AwardIcon, ShieldIcon } from "./icons";

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
  const size = "w-6 h-6";
  switch (name) {
    case "wrench":
      return <ToolsIcon className={size} />;
    case "badge-a":
      return <BadgeCheckIcon className={size} />;
    case "award":
      return <AwardIcon className={size} />;
    case "shield":
      return <ShieldIcon className={size} />;
    default:
      return <ToolsIcon className={size} />;
  }
}
