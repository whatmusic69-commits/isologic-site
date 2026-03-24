"use client";

import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { languages, Lang } from "@/lib/i18n";
import clsx from "./util/clsx";

export default function LanguageSwitcher({ current, onDark = false }: { current: Lang; onDark?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();

  function switchTo(lang: Lang) {
    if (!pathname) return;
    const parts = pathname.split("/").filter(Boolean);
    if (parts.length === 0) return router.push(`/${lang}`);
    parts[0] = lang;
    router.push(`/${parts.join("/")}`);
  }

  const container = clsx(
    "inline-flex items-center gap-1 rounded-lg px-1.5 py-1 border shadow-sm",
    onDark ? "border-white/15 bg-white/5" : "bg-white/80"
  );

  return (
    <div className={container}>
      {languages.map((lng) => (
        <button
          key={lng}
          onClick={() => switchTo(lng)}
          className={clsx(
            "text-xs md:text-sm px-2 py-1 rounded-md transition-colors",
            lng === current
              ? "bg-[color:var(--accent)] text-[color:var(--foreground)]"
              : "text-neutral-700 hover:bg-[color:var(--surface-muted)]"
          )}
          aria-current={lng === current}
        >
          {lng.toUpperCase()}
        </button>
      ))}
    </div>
  );
}
