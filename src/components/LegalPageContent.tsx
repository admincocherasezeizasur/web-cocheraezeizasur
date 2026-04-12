import Link from "next/link";
import { siteConfig } from "@/content/config";
import { interpolate, pricingVars } from "@/lib/interpolate";

const legalVars: Record<string, string> = {
  ...pricingVars,
  email: siteConfig.contact.email,
  direccion: siteConfig.contact.address,
};

interface LegalSection {
  title: string;
  content: string[];
}

export interface LegalDict {
  meta_title: string;
  page_title: string;
  page_subtitle: string;
  last_updated: string;
  back_link: string;
  sections: LegalSection[];
}

interface Props {
  dict: LegalDict;
  lang: string;
}

export function LegalPageContent({ dict, lang }: Props) {
  return (
    <>
      {/* ── Header ─────────────────────────────────────────────────────── */}
      <section className="relative bg-brand-dark pt-32 pb-16 overflow-hidden">
        {/* Glow rojo sutil — consistente con el hero */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[280px] bg-brand-red/5 blur-[130px] pointer-events-none" />
        <div className="absolute inset-0 bg-linear-to-b from-transparent to-[#060606] pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto px-6">
          {/* Back link */}
          <Link
            href={`/${lang}`}
            className="inline-block text-[13px] text-white/35 hover:text-white/65 transition-colors mb-10 tracking-wide"
          >
            {dict.back_link}
          </Link>

          {/* Section badge */}
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-0.5 bg-brand-red" />
            <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.25em]">
              Legal
            </span>
          </div>

          {/* Title */}
          <h1 className="font-headline text-4xl sm:text-5xl font-extrabold text-white leading-tight tracking-tight mb-4">
            {dict.page_title}
          </h1>

          {/* Subtitle */}
          <p className="text-base sm:text-lg text-white/50 max-w-2xl leading-relaxed mb-6">
            {dict.page_subtitle}
          </p>

          {/* Last updated */}
          <p className="text-[11px] text-white/20 uppercase tracking-[0.2em]">
            {dict.last_updated}
          </p>
        </div>
      </section>

      {/* ── Content ────────────────────────────────────────────────────── */}
      <section className="bg-[#060606] py-14 pb-28">
        <div className="max-w-4xl mx-auto px-6 space-y-3">
          {dict.sections.map((section, idx) => (
            <article
              key={idx}
              className="bg-brand-card border border-brand-card-border hover:border-brand-red/20 rounded-xl p-8 transition-colors duration-300"
            >
              {/* Section header */}
              <div className="flex items-start gap-5 mb-5">
                <span className="shrink-0 w-7 h-7 rounded-lg bg-brand-red/10 border border-brand-red/20 flex items-center justify-center text-[11px] font-black text-brand-red leading-none">
                  {idx + 1}
                </span>
                <h2 className="text-[11px] sm:text-xs font-black text-white uppercase tracking-[0.18em] pt-1.5">
                  {section.title}
                </h2>
              </div>

              {/* Paragraphs */}
              <div className="space-y-3 pl-12">
                {section.content.map((para, pIdx) => (
                  <p key={pIdx} className="text-[15px] text-white/60 leading-relaxed">
                    {interpolate(para, legalVars)}
                  </p>
                ))}
              </div>
            </article>
          ))}
        </div>

        {/* Bottom back link */}
        <div className="max-w-4xl mx-auto px-6 mt-12">
          <Link
            href={`/${lang}`}
            className="text-[13px] text-white/30 hover:text-white/60 transition-colors tracking-wide"
          >
            {dict.back_link}
          </Link>
        </div>
      </section>
    </>
  );
}
