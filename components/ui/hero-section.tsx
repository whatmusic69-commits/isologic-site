import React from "react";
import Button from "./button";
import clsx from "../util/clsx";
import { CheckIcon } from "./icons";

export default function HeroSection({
  title,
  subtitle,
  paragraphs,
  checklist,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  checklist?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section pb-10 md:pb-12">
      <div
        className="group relative overflow-hidden rounded-2xl border bg-white transition-transform duration-500 will-change-transform hover:scale-[1.01] shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        style={{ borderColor: "color-mix(in oklab, var(--border) 80%, white)" }}
      >
        <div className="relative px-8 md:px-12 py-16 md:py-24">
          <h1 className="text-[26px] sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl heading-balance heading-wrap" style={{ color: "#1A1A1A" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg md:text-xl" style={{ color: "#555" }}>
              {subtitle}
            </p>
          )}
          {paragraphs && paragraphs.length > 0 && (
            <div className="mt-5 max-w-3xl space-y-3 text-neutral-700">
              {paragraphs.map((p, i) => (
                <p key={i}>{p}</p>
              ))}
            </div>
          )}
          {checklist && checklist.length > 0 && (
            <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-3xl">
              {checklist.map((c, i) => (
                <li key={i} className="flex items-start gap-2 text-neutral-800">
                  <span className="mt-0.5 text-accent" aria-hidden><CheckIcon className="w-4 h-4" /></span>
                  <span className="text-sm leading-6">{c}</span>
                </li>
              ))}
            </ul>
          )}
          {(primaryCta || secondaryCta) && (
            <div className="mt-8 flex flex-wrap gap-3">
              {primaryCta && (
                <a href={primaryCta.href} className="btn btn-primary">{primaryCta.label}</a>
              )}
              {secondaryCta && (
                <a href={secondaryCta.href} className="btn btn-secondary">{secondaryCta.label}</a>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
