"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import SectionHeading from "./section-heading";
import Reveal from "./reveal";
import clsx from "../util/clsx";

type Testimonial = {
  quote: string;
  authorName: string;
  authorRole?: string;
  company?: string;
  rating?: number; // 1..5
};

export default function TestimonialsSection({
  title,
  subtitle,
  rotationIntervalMs = 6000,
  items,
}: {
  title: string;
  subtitle?: string;
  rotationIntervalMs?: number;
  items: Testimonial[];
}) {
  const groupSize = 4;
  const groups = useMemo(() => chunk(items, groupSize), [items]);
  const [index, setIndex] = useState(0);
  const [fading, setFading] = useState(false);
  const timerRef = useRef<number | null>(null);

  useEffect(() => {
    if (groups.length <= 1) return; // no rotation if not enough items
    function schedule() {
      timerRef.current = window.setTimeout(() => {
        setFading(true);
        window.setTimeout(() => {
          setIndex((i) => (i + 1) % groups.length);
          setFading(false);
          schedule();
        }, 220);
      }, rotationIntervalMs);
    }
    schedule();
    return () => {
      if (timerRef.current) window.clearTimeout(timerRef.current);
    };
  }, [groups.length, rotationIntervalMs]);

  const visible = groups[0] ? groups[index] : items.slice(0, groupSize);

  return (
    <section className="section">
      <div className="max-w-4xl mx-auto">
        <Reveal>
          <SectionHeading alignment="center" title={title} subtitle={subtitle} />
        </Reveal>
      </div>

      <div
        className={clsx(
          "mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300",
          fading ? "opacity-0" : "opacity-100"
        )}
      >
        {visible.map((t, i) => (
          <article key={`${index}-${i}`} className="card card-hover p-6 h-full flex flex-col justify-between">
            <div className="flex items-start gap-3">
              <QuoteMark />
              <p className="text-sm leading-6 text-neutral-700">{t.quote}</p>
            </div>
            <div className="mt-5 flex items-center gap-3">
              <Avatar name={t.authorName} company={t.company} />
              <div className="min-w-0">
                <div className="font-medium text-neutral-900 truncate">{t.authorName}</div>
                <div className="text-xs text-neutral-600 truncate">
                  {[t.authorRole, t.company].filter(Boolean).join(" · ")}
                </div>
                {typeof t.rating === "number" && (
                  <div className="mt-1">
                    <Stars rating={t.rating} />
                  </div>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function chunk<T>(arr: T[], size: number): T[][] {
  if (!arr || arr.length === 0) return [];
  const res: T[][] = [];
  for (let i = 0; i < arr.length; i += size) {
    res.push(arr.slice(i, i + size));
  }
  return res;
}

function QuoteMark() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      className="text-accent flex-shrink-0 mt-1"
      aria-hidden
    >
      <path d="M7 7h5v5H7v5H4v-5a3 3 0 0 1 3-3Zm10 0h5v5h-5v5h-3v-5a3 3 0 0 1 3-3Z" />
    </svg>
  );
}

function Avatar({ name, company }: { name: string; company?: string }) {
  const initials = getInitials(name || company || "");
  return (
    <div
      className="h-9 w-9 rounded-full flex items-center justify-center text-[color:var(--text-on-dark)] text-xs font-semibold"
      style={{ background: "var(--surface-dark)", border: "1px solid var(--border-dark)" }}
      aria-hidden
    >
      {initials}
    </div>
  );
}

function getInitials(text: string) {
  const parts = text.trim().split(/\s+/).slice(0, 2);
  const letters = parts.map((p) => p[0]).filter(Boolean).join("").toUpperCase();
  return letters || "*";
}

function Stars({ rating = 5 }: { rating?: number }) {
  const r = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex items-center gap-0.5 text-accent" aria-label={`${r} out of 5`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <Star key={i} filled={i < r} />
      ))}
    </div>
  );
}

function Star({ filled }: { filled: boolean }) {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill={filled ? "currentColor" : "none"}
      stroke="currentColor"
      strokeWidth={filled ? 0 : 1.6}
      aria-hidden
    >
      <path d="m12 3 2.7 5.5 6.1.9-4.4 4.3 1 6.1L12 17.7 6.6 19.8l1-6.1L3.2 9.4l6.1-.9L12 3Z" />
    </svg>
  );
}
