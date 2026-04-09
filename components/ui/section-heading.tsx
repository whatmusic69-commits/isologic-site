import React from "react";
import clsx from "../util/clsx";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  alignment = "center",
  className,
  onDark = false,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
  onDark?: boolean;
}) {
  return (
    <div
      className={clsx(
        "space-y-3",
        alignment === "center" ? "text-center mx-auto max-w-3xl" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className={clsx("text-sm uppercase tracking-wide", onDark ? "text-accent" : "text-accent/90")}>{eyebrow}</p>
      )}
      <h2 className={clsx(
        "text-[26px] md:text-4xl font-semibold leading-tight heading-balance heading-wrap",
        onDark ? "text-[color:var(--text-on-dark)]" : undefined
      )}>{title}</h2>
      {subtitle && (
        <p className={clsx(
          "text-base md:text-lg",
          onDark ? "text-white/80" : "text-neutral-600"
        )}>{subtitle}</p>
      )}
    </div>
  );
}
