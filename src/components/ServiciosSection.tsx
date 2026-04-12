import Image from "next/image";
import { interpolate, pricingVars } from "@/lib/interpolate";

const TRASLADO_IMAGES = [
  "/images/nuestros_servicios_traslado_img_card-01.webp",
  "/images/nuestros_servicios_traslado_img_card-02.webp",
  "/images/nuestros_servicios_traslado_img_card-03.webp",
];

const VALET_IMAGES = [
  "/images/nuestros_servicios_valetparking_img_card-01.webp",
  "/images/nuestros_servicios_valetparking_img_card-02.webp",
  "/images/nuestros_servicios_valetparking_img_card-01.webp",
];

const NUM_ICONS: Record<number, string> = {
  1: "/Number one.svg",
  2: "/Number two.svg",
  3: "/Number three.svg",
};

function ServiceCard({
  step,
}: {
  step: { number: number; title: string; desc: string; image: string };
}) {
  return (
    <div className="relative bg-[#1c1b1b] border border-brand-red/30 shadow-[0_0_10px_rgba(217,4,41,0.05)] rounded-md overflow-visible group hover:border-brand-red/60 hover:shadow-[0_0_15px_rgba(217,4,41,0.15)] transition-all duration-300 flex flex-col h-full">
      {/* SVG Number Badge */}
      <div className="absolute -top-6 -left-6 z-20 w-[60px] h-[60px] pointer-events-none">
        <Image
          src={NUM_ICONS[step.number]}
          alt={`Paso ${step.number}`}
          fill
          className="object-contain drop-shadow-lg"
        />
      </div>
      {/* Image */}
      <div className="relative h-[220px] overflow-hidden rounded-t-sm shrink-0">
        <Image
          src={step.image}
          alt={step.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#1c1b1b] to-transparent via-transparent" />
      </div>
      {/* Text */}
      <div className="px-6 pt-4 pb-8 bg-transparent flex-grow">
        <h4 className="text-xl font-bold text-white uppercase tracking-wide mb-3">
          {step.title}
        </h4>
        <p className="text-[14px] text-[#E7BCBA] leading-relaxed font-medium">{step.desc}</p>
      </div>
    </div>
  );
}

export function ServiciosSection({ dict }: { dict: any }) {
  const trasladoSteps = dict.servicios?.trasladoSteps?.map((s: any, i: number) => ({
    ...s,
    number: i + 1,
    image: TRASLADO_IMAGES[i],
  })) || [];

  const valetSteps = dict.servicios?.valetSteps?.map((s: any, i: number) => ({
    ...s,
    number: i + 1,
    image: VALET_IMAGES[i],
  })) || [];
  return (
    <section id="servicios" className="py-24 bg-[#111111]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-16">
          <h2 className="text-[36px] leading-[40px] tracking-[-1.8px] font-headline font-bold text-white uppercase">
            {dict.servicios?.title || "Nuestros Servicios Principales"}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4" />
        </div>

        {/* TRASLADO */}
        <div className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-brand-red" />
            <h3 className="text-[24px] leading-[32px] tracking-[-0.6px] font-headline font-bold text-white uppercase">
              {dict.servicios?.traslado || "TRASLADO:"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {trasladoSteps.map((step: any) => (
              <ServiceCard key={step.number} step={step} />
            ))}
          </div>
        </div>

        {/* VALET PARKING */}
        <div>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-0.5 bg-brand-red" />
            <h3 className="text-[24px] leading-[32px] tracking-[-0.6px] font-headline font-bold text-white uppercase">
              {dict.servicios?.valet || "VALET PARKING:"}
            </h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {valetSteps.map((step: any) => (
              <ServiceCard key={step.number} step={step} />
            ))}
          </div>

          {/* Costos adicionales */}
          <div className="mt-12 text-center text-[13px] text-[#E7BCBA] font-medium tracking-wide">
            <span className="inline-block mb-1">{dict.servicios?.extraCostsTitle || "⚠️ Costos Adicionales del Servicio:"}</span>
            <br />
            <span className="inline-block">{interpolate(dict.servicios?.extraCostsDesc || "", pricingVars)}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
