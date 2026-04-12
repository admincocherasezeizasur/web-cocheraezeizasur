import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { getDictionary, hasLocale, locales, type Locale } from "./dictionaries";
import { notFound } from "next/navigation";
import { Inter, Space_Grotesk } from "next/font/google";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export async function generateStaticParams() {
  return locales.map((lang) => ({ lang }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const titles: Record<string, string> = {
    es: "Cocheras Ezeiza Sur — Estacionamiento seguro cerca de Ezeiza",
    en: "Cocheras Ezeiza Sur — Secure parking near Ezeiza Airport",
    pt: "Cocheras Ezeiza Sur — Estacionamento seguro perto de Ezeiza",
  };
  const descriptions: Record<string, string> = {
    es: "Cocheras 100% techadas a minutos del aeropuerto de Ezeiza. Vigilancia 24hs, traslado gratuito y las mejores tarifas.",
    en: "100% covered garages minutes from Ezeiza Airport. 24/7 surveillance, free shuttle, and the best rates.",
    pt: "Garagens 100% cobertas a minutos do aeroporto de Ezeiza. Vigilância 24h, translado gratuito e as melhores tarifas.",
  };

  return {
    title: titles[lang] || titles.es,
    description: descriptions[lang] || descriptions.es,
    icons: {
      icon: "/images/logo-cocheras-ezeiza-sur.webp",
    },
    alternates: {
      canonical: `https://www.cocherasezeizasur.com/${lang}`,
      languages: {
        es: "https://www.cocherasezeizasur.com/es",
        en: "https://www.cocherasezeizasur.com/en",
        pt: "https://www.cocherasezeizasur.com/pt",
      },
    },
  };
}

export default async function LangLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <html lang={lang} className={`${inter.variable} ${spaceGrotesk.variable}`} suppressHydrationWarning>
      <body className="min-h-screen flex flex-col" suppressHydrationWarning>
        <Navbar lang={lang as Locale} dict={dict} />
        <main className="flex-1">{children}</main>
        <Footer dict={dict} lang={lang} />
      </body>
    </html>
  );
}
