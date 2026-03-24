import React from "react";
import Reveal from "./reveal";
import clsx from "../util/clsx";

export default function VisualPanel({
  src,
  aspect = "aspect-[16/9]",
  className,
  alt = "",
}: {
  src: string;
  aspect?: string;
  className?: string;
  alt?: string; // keep empty for decorative usage
}) {
  return (
    <Reveal>
      <div className={clsx("rounded-3xl overflow-hidden", className)} style={{border: "1px solid var(--border)", background: "var(--surface)"}}>
        <div className={clsx("relative group", aspect)}>
          {/* Decorative image; alt left empty by default */}
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={src}
            alt={alt}
            aria-hidden={alt ? undefined : true}
            className="absolute inset-0 h-full w-full object-cover opacity-90 transition-transform duration-700 ease-out group-hover:scale-[1.03]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-black/10" />
        </div>
      </div>
    </Reveal>
  );
}
