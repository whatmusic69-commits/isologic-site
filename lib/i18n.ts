export const languages = ["lv", "en", "ru"] as const;
export type Lang = (typeof languages)[number];

export function isValidLang(value: string): value is Lang {
  return languages.includes(value as Lang);
}