import Image from "next/image";
import { Icon } from "@iconify/react";
import { siteConfig } from "../content/config";

export function ExperienciaSection({ dict }: { dict: any }) {
  const experiencias = [
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-01.webp",
      title: dict.experiencia?.card1_title,
      desc: dict.experiencia?.card1_desc,
    },
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-02.webp",
      title: dict.experiencia?.card2_title,
      desc: dict.experiencia?.card2_desc,
    },
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-03.webp",
      title: dict.experiencia?.card3_title,
      desc: dict.experiencia?.card3_desc,
    },
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-04.webp",
      title: dict.experiencia?.card4_title,
      desc: dict.experiencia?.card4_desc,
    },
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-05.webp",
      title: dict.experiencia?.card5_title,
      desc: dict.experiencia?.card5_desc,
    },
    {
      image: "/images/la_experiencia_que_ofrecemos_img_card-06.webp",
      title: dict.experiencia?.card6_title,
      desc: dict.experiencia?.card6_desc,
    },
  ];
  return (
    <section className="py-24 px-6 bg-[#131313] relative overflow-hidden">
      <div className="bloom-layer">
        <div className="bloom-spot w-[800px] h-[800px] -left-40 bottom-0"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-20">
        {/* Section Title */}
        <div className="text-center mb-14">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight uppercase">
            {dict.experiencia?.title || "LA EXPERIENCIA QUE OFRECEMOS"}
          </h2>
          <div className="w-16 h-1 bg-brand-red mx-auto mt-4" />
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {experiencias.map((item) => (
            <div
              key={item.title}
              className="bg-[#1E1E24] border border-white/5 rounded-xl overflow-hidden group hover:border-[#D90429] neon-glow transition-all duration-300"
            >
              <div className="relative h-44 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover sm:grayscale group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/20" />
              </div>
              <div className="p-5">
                <h3 className="text-sm font-bold text-white tracking-wide mb-1.5">
                  {item.title}
                </h3>
                <p className="text-sm text-[#E7BCBA] leading-relaxed">
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner */}
        {siteConfig.promobanner.active && (
          <div className="mt-16 bg-gradient-to-r from-[#D90429] to-[#93000a] p-10 rounded-xl flex flex-col md:flex-row items-center justify-between gap-8 neon-glow">
            <div className="space-y-2">
              <h3 className="text-3xl font-black uppercase italic tracking-tighter text-white">
                {dict.experiencia?.cta_title || "Ahorrá hasta un 40% vs EZE."}
              </h3>
              <p className="text-white/80 font-medium">
                {dict.experiencia?.cta_subtitle || "Misma seguridad, mejor servicio, precio imbatible."}
              </p>
            </div>
            <a
              href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(dict.experiencia?.cta_whatsappMessage || "Hola, vengo desde la web. Me gustaría aprovechar la promoción del 40%.")}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white text-[#D90429] px-10 py-4 font-bold uppercase tracking-widest hover:bg-gray-100 transition-colors shrink-0 text-center rounded-sm"
            >
              {dict.experiencia?.cta_button || "Ver Tarifas"}
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
