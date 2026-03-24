import React from "react";
import Button from "./button";
import clsx from "../util/clsx";

export default function HeroSection({
  title,
  subtitle,
  primaryCta,
  secondaryCta,
}: {
  title: string;
  subtitle?: string;
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string };
}) {
  return (
    <section className="section pb-10 md:pb-12">
      <div
        className="group relative overflow-hidden rounded-2xl border transition-transform duration-500 will-change-transform hover:scale-[1.01] shadow-[0_12px_32px_rgba(0,0,0,0.06)]"
        style={{
          borderColor: "color-mix(in oklab, var(--border) 80%, white)",
          background:
            "radial-gradient(80% 80% at 85% 40%, rgba(0,109,182,0.12) 0%, rgba(0,109,182,0.06) 22%, rgba(0,109,182,0.0) 55%), linear-gradient(135deg, #F4F7FB 0%, #F2F5F8 100%)",
        }}
      >
        {/* Subtle top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[color:var(--accent)] opacity-20" aria-hidden />

        {/* Decorative layer to reduce empty right side */}
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

        <div className="relative px-8 md:px-12 py-16 md:py-24">
          <h1 className="text-[26px] sm:text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl heading-balance heading-wrap" style={{ color: "#1A1A1A" }}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg md:text-xl" style={{ color: "#555" }}>
              {subtitle}
            </p>
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
