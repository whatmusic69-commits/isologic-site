import React from "react";
import Reveal from "./reveal";

export default function CtaBand({
  title,
  subtitle,
  ctaLabel,
  ctaHref,
}: {
  title: string;
  subtitle?: string;
  ctaLabel?: string;
  ctaHref?: string;
}) {
  return (
    <Reveal>
      <div
        className="relative rounded-2xl border p-8 md:p-10 text-center shadow-[0_12px_32px_rgba(0,0,0,0.06)] overflow-hidden"
        style={{
          borderColor: "color-mix(in oklab, var(--border) 80%, white)",
          background:
            "radial-gradient(80% 80% at 85% 40%, rgba(0,109,182,0.12) 0%, rgba(0,109,182,0.06) 22%, rgba(0,109,182,0.0) 55%), linear-gradient(135deg, #F4F7FB 0%, #F2F5F8 100%)",
        }}
      >
        {/* Top accent line */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-[color:var(--accent)] opacity-20" aria-hidden />

        {/* Subtle radial decoration on the right */}
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

        <div className="relative">
          <h3 className="text-[21px] md:text-3xl font-semibold heading-balance heading-wrap">{title}</h3>
          {subtitle && (
            <p className="mt-2 text-neutral-700 max-w-2xl mx-auto">{subtitle}</p>
          )}
          {ctaLabel && ctaHref && (
            <div className="mt-6">
              <a href={ctaHref} className="btn btn-primary">{ctaLabel}</a>
            </div>
          )}
        </div>
      </div>
    </Reveal>
  );
}
