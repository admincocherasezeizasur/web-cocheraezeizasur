"use client";

import { useState, useEffect } from "react";
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

export function Navbar({ lang, dict }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  const whatsappHref = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(dict.nav.contacto_whatsappMessage)}`;

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

        {/* Desktop Navigation Links */}
        <div className="hidden lg:flex items-center gap-8">
          {siteConfig.navLinks.map((link) => (
            <a
              key={link.key}
              id={`cta-nav-${link.anchor}`}
              href={`/${lang}#${link.anchor}`}
              className="relative text-sm font-medium tracking-widest text-white/80 transition-colors duration-200 hover:text-brand-red"
            >
              {dict.nav[link.key]}
            </a>
          ))}
        </div>

        {/* Right: CONTACTO + Language Selector + Hamburger */}
        <div className="flex items-center gap-3">
          <a
            id="cta-whatsapp-navbar-desktop"
            href={whatsappHref}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden lg:inline-flex text-sm font-semibold tracking-widest text-brand-red border border-brand-red px-5 py-2 rounded hover:bg-brand-red hover:text-white transition-all duration-300"
          >
            {dict.nav.contacto}
          </a>
          <LangSwitcher lang={lang} />

          {/* Hamburger button — mobile only */}
          <button
            onClick={() => setMobileOpen(true)}
            className="lg:hidden flex flex-col justify-center items-start w-10 h-10 gap-1.5 group"
            aria-label="Abrir menú"
          >
            <span className="block w-6 h-0.5 bg-white/80 group-hover:bg-brand-red transition-colors duration-200" />
            <span className="block w-6 h-0.5 bg-white/80 group-hover:bg-brand-red transition-colors duration-200" />
            <span className="block w-4 h-0.5 bg-white/80 group-hover:bg-brand-red transition-colors duration-200" />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      {mobileOpen && (
        <div className="fixed top-0 left-0 w-full h-full min-h-screen z-[60] bg-black bg-opacity-80 backdrop-filter backdrop-blur-lg flex flex-col lg:hidden">
          {/* Top bar */}
          <div className="flex items-center justify-between px-6 h-20 border-b border-white/5 shrink-0">
            <Link href={`/${lang}`} className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
              <div className="relative w-10 h-10 shrink-0">
                <Image
                  src="/images/logo-cocheras-ezeiza-sur.webp"
                  alt="Cocheras Ezeiza Sur"
                  fill
                  className="object-contain"
                />
              </div>
              <div className="flex flex-col leading-tight pt-1">
                <span className="text-white font-headline font-extrabold text-base tracking-wide">COCHERAS</span>
                <span className="text-brand-red font-headline font-extrabold text-base tracking-wide">EZEIZA SUR</span>
              </div>
            </Link>

            {/* Close button */}
            <button
              onClick={() => setMobileOpen(false)}
              className="w-10 h-10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
              aria-label="Cerrar menú"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-6">
            {siteConfig.navLinks.map((link, idx) => (
              <a
                key={link.key}
                href={`/${lang}#${link.anchor}`}
                onClick={() => setMobileOpen(false)}
                className="w-full text-center py-5 text-2xl font-headline font-bold tracking-widest text-white/80 hover:text-brand-red border-b border-white/5 transition-colors duration-200"
                style={{ animationDelay: `${idx * 60}ms` }}
              >
                {dict.nav[link.key]}
              </a>
            ))}

            {/* WhatsApp CTA */}
            <a
              id="cta-whatsapp-navbar-mobile"
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setMobileOpen(false)}
              className="mt-8 w-full text-center py-4 bg-brand-red text-white font-bold text-sm tracking-widest rounded-xl hover:bg-brand-red-hover transition-colors duration-300"
            >
              {dict.nav.contacto}
            </a>

            {/* Language switcher */}
            <div className="mt-6">
              <LangSwitcher lang={lang} />
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
