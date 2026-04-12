import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "../dictionaries";
import { LegalPageContent, type LegalDict } from "@/components/LegalPageContent";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const dict = await getDictionary(lang as Locale);
  const t = dict.terminos as LegalDict;
  return {
    title: t.meta_title,
    alternates: {
      canonical: `https://www.cocherasezeizasur.com/${lang}/terminos`,
    },
  };
}

export default async function TerminosPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <LegalPageContent dict={dict.terminos as LegalDict} lang={lang} />;
}
