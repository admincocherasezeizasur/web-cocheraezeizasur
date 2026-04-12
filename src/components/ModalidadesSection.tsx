import Image from "next/image";
import { Icon } from "@iconify/react";
import { interpolate, pricingVars } from "@/lib/interpolate";

const MODALIDADES_IMAGES = [
  "/images/diversas_modalidades_img_card-01.webp",
  "/images/diversas_modalidades_img_card-02.webp",
  "/images/diversas_modalidades_img_card-03.webp",
];
const MODALIDADES_ICONS = [
  "/caluladora_icon.svg",
  "/caluladora_icon.svg",
  "/whatsapp-fill-icon.svg",
];

export function ModalidadesSection({ dict }: { dict: any }) {
  const modalidades = dict.modalidades?.cards?.map((c: any, i: number) => ({
    ...c,
    image: MODALIDADES_IMAGES[i],
    priceIcon: MODALIDADES_ICONS[i],
    popular: i === 1,
  })) || [];
  return (
    <section id="tarifas" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        {/* Section Title */}
        <div className="text-center mb-10">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {dict.modalidades?.title || "Diversas Modalidades"}
          </h2>
          <div className="w-16 h-1 bg-[#D90429] mx-auto mt-4" />
          <p className="text-[#E7BCBA] mt-4 text-base">
            {dict.modalidades?.subtitle || "Elegí la modalidad que mejor se adapte a tu viaje. Comodidad absoluta en cada paso."}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          {modalidades.map((m) => (
            <div
              key={m.title}
              className="relative bg-[#171717] border border-white/5 rounded-sm overflow-hidden group hover:border-[#D90429]/50 transition-colors duration-300 flex flex-col"
            >
              {/* Popular badge */}
              {m.popular && (
                <div className="absolute top-0 right-0 z-20 bg-[#D90429] text-white text-[10px] uppercase font-bold tracking-widest px-3 py-1.5 shadow-md">
                  {dict.modalidades?.popularBadge || "MÁS POPULAR"}
                </div>
              )}
              {/* Image */}
              <div className="relative h-56 overflow-hidden shrink-0">
                <Image
                  src={m.image}
                  alt={m.title}
                  fill
                  className="object-cover"
                />
              </div>
              {/* Content */}
              <div className="p-8 flex flex-col flex-grow">
                <h4 className="text-xl font-bold text-white tracking-wide mb-6">
                  {m.title}
                </h4>
                <ul className="space-y-4 mb-8 flex-grow">
                  {m.features.map((f) => (
                    <li key={f} className="flex items-start gap-3 text-sm text-[#E7BCBA] font-medium">
                      <Image
                        src="/check_icon.svg"
                        alt="check"
                        width={16}
                        height={16}
                        className="w-4 h-4 mt-0.5 shrink-0"
                      />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="border-t border-white/10 pt-5 mt-auto">
                  <a
                    href="#inicio"
                    className="flex items-center gap-3 text-sm font-bold text-white hover:text-brand-red transition-colors"
                  >
                    <Image src={m.priceIcon} alt="icon" width={20} height={20} className="w-5 h-5 shrink-0 brightness-0 invert" />
                    {interpolate(m.price, pricingVars)} →
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
