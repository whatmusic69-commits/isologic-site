"use client";

import { useEffect } from "react";

function normalize(hash: string): string | null {
  const h = hash.replace(/^#/, "");
  if (!h) return null;
  // Map preferred anchors to internal section IDs
  if (h === "iso-implementation") return "implementation";
  if (h === "food-safety") return "food-safety-haccp";
  // Others match directly
  return h;
}

function openSectionByHash() {
  const target = normalize(window.location.hash || "");
  if (!target) return;
  const el = document.getElementById(target);
  if (!el) return;
  const btn = el.querySelector<HTMLButtonElement>("button[aria-expanded]");
  if (!btn) return;
  const expanded = btn.getAttribute("aria-expanded");
  if (expanded !== "true") {
    btn.click();
  }
  // Smooth scroll to the section container
  el.scrollIntoView({ behavior: "smooth", block: "start" });
}

export default function HashAccordionOpener() {
  useEffect(() => {
    const attempt = () => openSectionByHash();
    // Initial attempts to handle pre-hydration timing
    attempt();
    const t1 = setTimeout(attempt, 120);
    const t2 = setTimeout(attempt, 320);
    // React to subsequent hash changes
    const onHash = () => attempt();
    window.addEventListener("hashchange", onHash);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      window.removeEventListener("hashchange", onHash);
    };
  }, []);
  return null;
}
