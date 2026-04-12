import Link from "next/link";
import Image from "next/image";
import type { Locale } from "@/app/[lang]/dictionaries";
import { siteConfig } from "@/content/config";
import { LangSwitcher } from "./LangSwitcher";

type NavbarProps = {
  lang: Locale;
  dict: {
    nav: {
      inicio: string;
      servicios: string;
      tarifas: string;
      ubicacion: string;
      contacto: string;
      contacto_whatsappMessage: string;
    };
    lang: {
      es: string;
      en: string;
      pt: string;
    };
  };
};

const navAnchors = [
  { key: "inicio" as const,    anchor: "inicio" },
  { key: "servicios" as const, anchor: "servicios" },
  { key: "tarifas" as const,   anchor: "tarifas" },
  { key: "ubicacion" as const, anchor: "ubicacion" },
];

export function Navbar({ lang, dict }: NavbarProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-brand-dark/90 backdrop-blur-md border-b border-white/5">
      <nav className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href={`/${lang}`} className="flex items-center gap-3 group">
          <div className="relative w-12 h-12 shrink-0">
            <Image
              src="/images/logo-cocheras-ezeiza-sur.webp"
              alt="Cocheras Ezeiza Sur"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="hidden sm:flex flex-col leading-tight pt-1">
            <span className="text-white font-headline font-extrabold text-lg tracking-wide">
              COCHERAS
            </span>
            <span className="text-brand-red font-headline font-extrabold text-lg tracking-wide">
              EZEIZA SUR
            </span>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {navAnchors.map((link) => (
            <a
              key={link.key}
              href={`/${lang}#${link.anchor}`}
              className="relative text-sm font-medium tracking-widest text-white/80 transition-colors duration-200 hover:text-brand-red"
            >
              {dict.nav[link.key]}
            </a>
          ))}
        </div>

        {/* Right: CONTACTO + Language Selector */}
        <div className="flex items-center gap-4">
          <a
            href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(dict.nav.contacto_whatsappMessage)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex text-sm font-semibold tracking-widest text-brand-red border border-brand-red px-5 py-2 rounded hover:bg-brand-red hover:text-white transition-all duration-300"
          >
            {dict.nav.contacto}
          </a>
          <LangSwitcher lang={lang} />
        </div>
      </nav>
    </header>
  );
}
