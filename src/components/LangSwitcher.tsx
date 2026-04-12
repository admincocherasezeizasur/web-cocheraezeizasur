"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/app/[lang]/dictionaries";

const languages: { code: Locale; label: string }[] = [
  { code: "es", label: "ES" },
  { code: "en", label: "EN" },
  { code: "pt", label: "PT" },
];

export function LangSwitcher({ lang }: { lang: Locale }) {
  const pathname = usePathname();

  // Reemplaza solo el segmento de idioma al inicio del path
  // "/es/terminos" → "/en/terminos" | "/es" → "/en"
  const hrefFor = (newLang: Locale) => {
    const rest = pathname.replace(/^\/(es|en|pt)/, "");
    return `/${newLang}${rest}`;
  };

  return (
    <div className="flex items-center gap-1">
      {languages.map((l, i) => (
        <span key={l.code} className="flex items-center">
          <Link
            href={hrefFor(l.code)}
            className={`text-sm font-medium tracking-wide px-2 py-1 rounded transition-all duration-200 ${
              lang === l.code
                ? "text-brand-red"
                : "text-white/60 hover:text-white"
            }`}
          >
            {l.label}
          </Link>
          {i < languages.length - 1 && (
            <span className="text-white/20 text-xs">|</span>
          )}
        </span>
      ))}
    </div>
  );
}
