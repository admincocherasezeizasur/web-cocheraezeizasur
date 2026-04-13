import type { Metadata } from "next";
import "../globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";
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

const BASE_URL = "https://www.cocherasezeizasur.com";

const seoTitles: Record<string, string> = {
  es: "Cocheras Ezeiza Sur | Estacionamiento con Traslado Gratis al Aeropuerto",
  en: "Cocheras Ezeiza Sur | Parking with Free Shuttle to Ezeiza Airport",
  pt: "Cocheras Ezeiza Sur | Estacionamento com Transfer Grátis para o Aeroporto",
};

const seoDescriptions: Record<string, string> = {
  es: "Cocheras 100% techadas a minutos del aeropuerto de Ezeiza. Vigilancia 24hs, traslado gratuito y las mejores tarifas. ¡Cotizá tu estadía ahora!",
  en: "100% covered garages minutes from Ezeiza Airport. 24/7 surveillance, free shuttle, and the best rates. Get your free quote now!",
  pt: "Garagens 100% cobertas a minutos do aeroporto de Ezeiza. Vigilância 24h, translado gratuito e as melhores tarifas. Faça sua cotação agora!",
};

const ogLocales: Record<string, string> = {
  es: "es_AR",
  en: "en_US",
  pt: "pt_BR",
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  const title = seoTitles[lang] ?? seoTitles.es;
  const description = seoDescriptions[lang] ?? seoDescriptions.es;
  const url = `${BASE_URL}/${lang}`;

  return {
    metadataBase: new URL(BASE_URL),
    title,
    description,
    icons: {
      icon: "/images/logo-cocheras-ezeiza-sur.webp",
    },
    alternates: {
      canonical: url,
      languages: {
        es: `${BASE_URL}/es`,
        en: `${BASE_URL}/en`,
        pt: `${BASE_URL}/pt`,
        "x-default": `${BASE_URL}/es`,
      },
    },
    openGraph: {
      type: "website",
      url,
      title,
      description,
      siteName: "Cocheras Ezeiza Sur",
      locale: ogLocales[lang] ?? "es_AR",
      images: [
        {
          url: "/images/Hero-Image-Background.webp",
          width: 1200,
          height: 630,
          alt: "Cocheras Ezeiza Sur — Estacionamiento techado cerca del Aeropuerto de Ezeiza",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/images/Hero-Image-Background.webp"],
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
        <WhatsAppFloat />
      </body>
    </html>
  );
}
