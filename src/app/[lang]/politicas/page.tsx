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
  const p = dict.politicas as LegalDict;
  return {
    title: p.meta_title,
    alternates: {
      canonical: `https://www.cocherasezeizasur.com/${lang}/politicas`,
    },
  };
}

export default async function PoliticasPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const dict = await getDictionary(lang as Locale);
  return <LegalPageContent dict={dict.politicas as LegalDict} lang={lang} />;
}
