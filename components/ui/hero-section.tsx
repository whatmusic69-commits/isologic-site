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
      <div className="group relative overflow-hidden panel-dark transition-transform duration-500 will-change-transform hover:scale-[1.01]">
        <div className="absolute inset-0 opacity-[0.08] pointer-events-none"
             aria-hidden>
          <div className="absolute -left-10 -top-10 h-40 w-40 rounded-full bg-accent/60 blur-3xl transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute -right-10 -bottom-10 h-40 w-40 rounded-full bg-accent/60 blur-3xl transition-transform duration-700 group-hover:scale-110" />
        </div>
        <div className="relative px-8 md:px-12 py-16 md:py-24">
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight max-w-3xl" style={{color: "var(--text-on-dark)"}}>
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-2xl text-lg md:text-xl" style={{color: "color-mix(in oklab, var(--text-on-dark) 85%, black)"}}>
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
