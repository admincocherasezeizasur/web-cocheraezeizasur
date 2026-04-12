"use client";

import { useState } from "react";
import { Icon } from "@iconify/react";

export function FAQSection({ dict }: { dict: any }) {
  const faqs = dict.faq?.items || [];
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="relative py-24 bg-[#060606] overflow-hidden">

      {/* Dot-grid texture */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
          WebkitMaskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)",
        }}
      />

      {/* Red glow — top center */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[520px] h-[180px] bg-brand-red/10 blur-[110px] pointer-events-none" />

      {/* Large "FAQ" watermark — right edge */}
      <div
        aria-hidden="true"
        className="absolute right-0 top-1/2 -translate-y-1/2 font-headline font-black leading-none select-none pointer-events-none text-[18vw] text-white/[0.022] tracking-tight"
      >
        FAQ
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* Section header */}
        <div className="text-center mb-14">
          <div className="flex items-center justify-center gap-3 mb-5">
            <div className="w-8 h-px bg-brand-red" />
            <span className="text-[11px] font-bold text-brand-red uppercase tracking-[0.25em]">
              {dict.faq?.badge || "Consultas"}
            </span>
            <div className="w-8 h-px bg-brand-red" />
          </div>
          <h2 className="font-headline text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {dict.faq?.title || "PREGUNTAS FRECUENTES"}
          </h2>
          {dict.faq?.subtitle && (
            <p className="mt-3 text-[15px] text-white/40 max-w-sm mx-auto">
              {dict.faq.subtitle}
            </p>
          )}
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto space-y-2">
          {faqs.map((faq: any, i: number) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-lg border overflow-hidden transition-colors duration-200 ${
                  isOpen
                    ? "bg-[#141414] border-brand-red/25"
                    : "bg-brand-card border-brand-card-border hover:border-white/10"
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => setOpenIndex(isOpen ? null : i)}
                  className="w-full flex items-center gap-4 px-5 py-5 text-left"
                >
                  {/* Number badge */}
                  <span
                    className={`shrink-0 w-6 h-6 rounded flex items-center justify-center text-[11px] font-black leading-none transition-colors duration-200 ${
                      isOpen
                        ? "bg-brand-red text-white"
                        : "bg-white/6 text-white/35"
                    }`}
                  >
                    {i + 1}
                  </span>

                  {/* Question text */}
                  <span
                    className={`flex-1 text-[13px] font-bold tracking-wide transition-colors duration-200 ${
                      isOpen ? "text-white" : "text-white/70"
                    }`}
                  >
                    {faq.q}
                  </span>

                  {/* Chevron */}
                  <Icon
                    icon="mdi:chevron-down"
                    className={`shrink-0 w-5 h-5 transition-all duration-300 ${
                      isOpen ? "rotate-180 text-brand-red" : "text-white/25"
                    }`}
                  />
                </button>

                {/* Answer */}
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-60 pb-6" : "max-h-0"
                  }`}
                >
                  <div className="px-5 flex gap-4">
                    {/* Spacer aligns answer with question text */}
                    <div className="shrink-0 w-6" />
                    <p className="text-[14px] text-white/55 leading-relaxed">
                      {faq.a}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
