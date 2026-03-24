import fs from "node:fs/promises";
import path from "node:path";
import type { Lang } from "./i18n";

export async function getPageContent<T = unknown>(page: string, lang: Lang): Promise<T> {
  const filePath = path.join(process.cwd(), "content", "pages", page, `${lang}.json`);
  try {
    const file = await fs.readFile(filePath, "utf-8");
    return JSON.parse(file) as T;
  } catch (err) {
    const e = err as NodeJS.ErrnoException;
    throw new Error(`Failed to load content for page "${page}" lang "${lang}": ${e.message}`);
  }
}
