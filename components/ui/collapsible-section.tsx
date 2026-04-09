"use client";

import React, { useId, useState } from "react";
import clsx from "../util/clsx";
import { ChevronDownIcon } from "./icons";

export default function CollapsibleSection({
  title,
  subtitle,
  defaultOpen = false,
  children,
}: {
  title: string;
  subtitle?: string;
  defaultOpen?: boolean;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState<boolean>(defaultOpen);
  const panelId = useId();

  return (
    <div className="card card-hover p-0 overflow-hidden">
      <button
        type="button"
        className="w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-start justify-between gap-4"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-controls={panelId}
      >
        <div>
          <h3 className="text-lg md:text-xl font-semibold text-neutral-900">{title}</h3>
          {subtitle && (
            <p className="mt-1 text-sm md:text-base text-neutral-700">{subtitle}</p>
          )}
        </div>
        <ChevronDownIcon
          className={clsx(
            "mt-1 inline-block text-neutral-700 transition-transform",
            open ? "rotate-180" : "rotate-0"
          )}
        />
      </button>

      <div
        id={panelId}
        className={clsx(
          // Use natural height when open to avoid clipping; animate opacity only
          "transition-opacity duration-300 ease-out",
          open ? "max-h-none opacity-100" : "max-h-0 opacity-70 overflow-hidden"
        )}
      >
        <div className="px-5 md:px-6 pb-5 md:pb-6">
          {children}
        </div>
      </div>
    </div>
  );
}
