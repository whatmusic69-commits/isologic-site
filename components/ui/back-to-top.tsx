"use client";

import React, { useEffect, useState } from "react";
import clsx from "../util/clsx";
import { ArrowUpIcon } from "./icons";

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setVisible(window.scrollY > 480);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollTop() {
    try {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      window.scrollTo(0, 0);
    }
  }

  return (
    <button
      type="button"
      onClick={scrollTop}
      aria-label="Back to top"
      className={clsx(
        "fixed right-4 bottom-4 z-40 rounded-full border shadow-lg bg-white",
        // Center icon perfectly
        "inline-flex items-center justify-center",
        "text-neutral-900 hover:text-[color:var(--text-on-dark)]",
        "hover:bg-[color:var(--accent)] transition-colors duration-200",
        "focus:outline-none focus:ring-2 focus:ring-[color:var(--accent)]",
        "p-0 leading-none",
        visible ? "opacity-100" : "opacity-0 pointer-events-none",
      )}
      style={{ width: 48, height: 48, borderColor: "var(--border)" }}
    >
      <ArrowUpIcon className="w-5 h-5" />
    </button>
  );
}
