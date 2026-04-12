import "server-only";

const dictionaries = {
  es: () =>
    import("@/content/i18n/es.json").then((module) => module.default),
  en: () =>
    import("@/content/i18n/en.json").then((module) => module.default),
  pt: () =>
    import("@/content/i18n/pt.json").then((module) => module.default),
};

export type Locale = keyof typeof dictionaries;
export const locales: Locale[] = ["es", "en", "pt"];

export const hasLocale = (locale: string): locale is Locale =>
  locale in dictionaries;

export const getDictionary = async (locale: Locale) =>
  dictionaries[locale]();
