"use client";

import React, { useState } from "react";
import clsx from "../util/clsx";

export type FaqItem = { question: string; answer: string };

export default function FAQAccordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <div className="divide-y divide-neutral-200 border border-neutral-200/70 rounded-2xl overflow-hidden bg-white">
      {items.map((item, idx) => {
        const open = openIndex === idx;
        return (
          <div key={idx} className="bg-white">
            <button
              className={clsx(
                "w-full text-left px-5 md:px-6 py-4 md:py-5 flex items-center justify-between gap-4",
                open ? "text-accent" : "text-neutral-900"
              )}
              onClick={() => setOpenIndex(open ? null : idx)}
              aria-expanded={open}
            >
              <span className="font-medium">{item.question}</span>
              <span className={clsx("transition-transform", open ? "rotate-45" : "rotate-0")}>＋</span>
            </button>
            <div
              className={clsx(
                "px-5 md:px-6 text-neutral-600 text-sm leading-6",
                "transition-all duration-300 ease-out",
                open ? "max-h-64 pb-5" : "max-h-0 overflow-hidden"
              )}
            >
              {item.answer}
            </div>
          </div>
        );
      })}
    </div>
  );
}
