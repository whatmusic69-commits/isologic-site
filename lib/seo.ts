import { languages } from "./i18n";
import { getBaseUrl } from "./site";

export function buildAlternates(path: string) {
  const base = getBaseUrl();
  const langs: Record<string, string> = Object.fromEntries(
    languages.map((l) => [l, `${base}/${l}${path}`])
  );
  return { base, langs } as const;
}

export function truncate(text: string, limit = 160) {
  if (!text) return text;
  const clean = text.replace(/\s+/g, " ").trim();
  return clean.length > limit ? `${clean.slice(0, limit - 1)}…` : clean;
}

