import Image from "next/image";
import { Icon } from "@iconify/react";
import { siteConfig } from "@/content/config";

export function UbicacionSection({ dict, lang = "es" }: { dict: any; lang?: string }) {
  const address = siteConfig.contact[`address_${lang as "es"|"en"|"pt"}`] || siteConfig.contact.address_es;
  return (
    <section id="ubicacion" className="py-20 bg-brand-dark">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
          {/* Left: Photo */}
          <div className="relative border-2 border-brand-red/30 overflow-hidden min-h-[500px] lg:min-h-[600px] group">
            <Image
              src="/images/location_external_img_cocheras_eseiza_sur_left_context_image.webp"
              alt="Cocheras Ezeiza Sur - Fachada"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors"></div>
          </div>

          {/* Right: Map and address */}
          <div className="relative overflow-hidden min-h-[500px] lg:min-h-[600px]">
            <Image
              src="/images/map_location_img.webp"
              alt="Mapa de ubicación - Venezuela 424, Ezeiza"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            {/* Address card overlay */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-[#1A1A1A] border-2 border-brand-red px-10 py-8 text-center min-w-[320px] shadow-[0_0_20px_rgba(217,4,41,0.1)]">
              <h3 className="text-sm font-bold text-white uppercase tracking-wider mb-3">
                {dict.ubicacion?.title || "UBICACIÓN ESTRATÉGICA"}
              </h3>
              <p className="text-[13px] text-[#A59F9F] mb-6 font-medium tracking-wide">
                {address}
              </p>
              <a
                href={siteConfig.contact.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 text-brand-red text-xs font-bold tracking-widest uppercase hover:underline"
              >
                <Icon icon="mdi:near-me" className="w-4 h-4" />
                {dict.ubicacion?.btnUrl || "CÓMO LLEGAR"}
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
