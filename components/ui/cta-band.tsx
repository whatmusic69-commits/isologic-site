import React from "react";
import Reveal from "./reveal";

export default function CtaBand({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
  secondaryLabel,
  secondaryHref,
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
  secondaryLabel?: string;
  secondaryHref?: string;
}) {
  return (
    <Reveal>
      <div className="relative rounded-2xl border p-8 md:p-10 text-center shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden bg-white" style={{ borderColor: "color-mix(in oklab, var(--border) 80%, white)" }}>

        <div className="relative">
          <h3 className="text-[21px] md:text-3xl font-semibold heading-balance heading-wrap">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-neutral-700 max-w-2xl mx-auto">{subtitle}</p>
          )}
          {(ctaLabel && ctaHref) || (secondaryLabel && secondaryHref) ? (
            <div className="mt-6 flex items-center justify-center gap-3 flex-wrap">
              {ctaLabel && ctaHref && <a href={ctaHref} className="btn btn-primary">{ctaLabel}</a>}
              {secondaryLabel && secondaryHref && <a href={secondaryHref} className="btn btn-secondary">{secondaryLabel}</a>}
            </div>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
