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
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle?: string;
  paragraphs?: string[];
  checklist?: string[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
  imageSrc?: string;
  imageAlt?: string;
}) {
  const hasImage = Boolean(imageSrc);
  return (
    <section className="section pb-10 md:pb-12">
      <div
        className="group relative overflow-hidden rounded-2xl border bg-white shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        style={{ borderColor: "color-mix(in oklab, var(--border) 80%, white)" }}
      >
        {/* Top visual area with background image and overlaid heading */}
        <div
          className={clsx(
            "relative w-full hero-bg",
            // controlled, non-100vh heights per breakpoint
            "min-h-[320px] sm:min-h-[380px] md:min-h-[460px] lg:min-h-[560px] xl:min-h-[620px]"
          )}
          style={hasImage ? { backgroundImage: `url(${imageSrc})` } : undefined}
        >
          {/* overlay for readability */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/25 to-transparent" aria-hidden />
          <div className="relative px-6 sm:px-8 md:px-12 py-14 md:py-20 flex items-end h-full">
            <h1 className="text-[26px] sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl heading-balance heading-wrap text-white drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]">
              {title}
            </h1>
          </div>
        </div>

        {/* Supporting content below image */}
        <div className="px-6 sm:px-8 md:px-12 py-8 md:py-10">
          <div className="mx-auto md:max-w-4xl lg:max-w-5xl">
            {subtitle && (
              <p className="text-base md:text-lg text-neutral-700">
                {subtitle}
              </p>
            )}
            {paragraphs && paragraphs.length > 0 && (
              <div className="mt-4 space-y-3 text-neutral-700">
                {paragraphs.map((p, i) => (
                  <p key={i}>{p}</p>
                ))}
              </div>
            )}
            {checklist && checklist.length > 0 && (
              <ul className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
                {checklist.map((c, i) => (
                  <li key={i} className="flex items-start gap-2 text-neutral-900">
                    <span className="mt-0.5 text-accent" aria-hidden><CheckIcon className="w-4 h-4" /></span>
                    <span className="text-sm leading-6">{c}</span>
                  </li>
                ))}
              </ul>
            )}
            {(primaryCta || secondaryCta) && (
              <div className="mt-7 flex flex-wrap gap-3 md:justify-center">
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
      </div>
    </section>
  );
}
