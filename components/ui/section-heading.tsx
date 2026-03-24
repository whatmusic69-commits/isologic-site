import React from "react";
import clsx from "../util/clsx";

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  alignment = "center",
  className,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  alignment?: "left" | "center";
  className?: string;
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
        <p className="text-sm uppercase tracking-wide text-accent/90">{eyebrow}</p>
      )}
      <h2 className="text-[26px] md:text-4xl font-semibold leading-tight heading-balance heading-wrap">{title}</h2>
      {subtitle && (
        <p className="text-base md:text-lg text-neutral-600">{subtitle}</p>
      )}
    </div>
  );
}
