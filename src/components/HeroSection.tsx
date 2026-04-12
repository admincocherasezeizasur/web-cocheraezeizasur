import Image from "next/image";
import type { Locale } from "@/app/[lang]/dictionaries";
import { HeroQuoteForm } from "./HeroQuoteForm";

type HeroProps = {
  lang: Locale;
  dict: {
    hero: {
      title_line1: string;
      title_highlight: string;
      title_line2: string;
      subtitle: string;
      feature1_title: string;
      feature2_title: string;
      feature3_title: string;
      cta_quote: string;
      form_fecha_ingreso: string;
      form_fecha_egreso: string;
      form_nota_hora: string;
      form_aeropuerto_label: string;
      form_aeropuerto_ezeiza: string;
      form_tipo_vehiculo_label: string;
      form_traslado: string;
      form_valet: string;
      form_cotizar: string;
      result_title: string;
      result_estadia: string;
      result_vehiculo: string;
      result_ingreso: string;
      result_egreso: string;
      result_servicio_label: string;
      result_traslado_desc: string;
      result_valet_desc: string;
      result_tarifa_base: string;
      result_servicio_valet: string;
      result_total: string;
      result_confirmar_whatsapp: string;
      result_ahorro: string;
      result_whatsapp_msg_prefix: string;
    };
  };
};

const features = [
  {
    titleKey: "feature1_title" as const,
    icon: "/check_icon.svg",
    iconW: 22,
    iconH: 21,
  },
  {
    titleKey: "feature2_title" as const,
    icon: "/car-clock-icon.svg",
    iconW: 27,
    iconH: 27,
  },
  {
    titleKey: "feature3_title" as const,
    icon: "/safe-icon-shield.svg",
    iconW: 16,
    iconH: 20,
  },
];

export function HeroSection({ dict }: HeroProps) {
  return (
    <section
      id="inicio"
      className="relative min-h-screen flex items-center overflow-hidden"
    >
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/Hero-Image-Background.webp"
          alt="Cocheras Ezeiza Sur - Estacionamiento techado"
          fill
          className="object-cover"
          priority
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-linear-to-r from-black/85 via-black/75 to-black/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/50 to-brand-dark" />
      </div>

      {/* Content Container */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pt-28 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Column — Text Content */}
          <div className="flex flex-col gap-8">
            {/* Headline */}
            <h1 className="text-[72px] font-headline font-bold leading-tight tracking-normal">
              {dict.hero.title_line1}{" "}
              <span className="text-brand-red">{dict.hero.title_highlight}</span>
              {dict.hero.title_line2}
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl text-[#E7BCBA] max-w-xl leading-relaxed">
              {dict.hero.subtitle}
            </p>

            {/* Feature Strip — horizontal bar with dividers */}
            <div className="flex items-stretch border border-white/10 rounded-sm overflow-hidden mt-2 bg-black/30 backdrop-blur-sm">
              {features.map((feature, idx) => (
                <div
                  key={feature.titleKey}
                  className={`flex items-center gap-3 px-5 py-3.5 flex-1 ${
                    idx < features.length - 1 ? "border-r border-white/10" : ""
                  }`}
                >
                  <Image
                    src={feature.icon}
                    alt=""
                    width={feature.iconW}
                    height={feature.iconH}
                    className="shrink-0"
                  />
                  <p className="text-[10px] sm:text-[11px] font-bold text-white uppercase leading-tight tracking-wide whitespace-pre-line">
                    {dict.hero[feature.titleKey]}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column — Quote Form */}
          <div className="flex justify-center lg:justify-center">
            <HeroQuoteForm dict={dict.hero} />
          </div>
        </div>
      </div>
    </section>
  );
}
