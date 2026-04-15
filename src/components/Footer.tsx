import Link from "next/link";
import { Icon } from "@iconify/react";
import { siteConfig } from "@/content/config";

export function Footer({ dict, lang = "es" }: { dict?: any; lang?: string }) {
  return (
    <footer className="w-full bg-[#131313] border-t border-[#353534]/30 py-12">
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-10">
          
          {/* Left: Contact Info */}
          <div className="space-y-5">
            <h2 className="text-[17px] font-black text-white tracking-wide">
              Cocheras Ezeiza Sur
            </h2>
            <div className="space-y-3">
              <a id="cta-como-llegar-footer" href={siteConfig.contact.googleMapsUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Icon icon="mdi:map-marker-outline" className="w-4 h-4" />
                {siteConfig.contact[`address_${(lang as "es"|"en"|"pt")}`] || siteConfig.contact.address_es}
              </a>
              <a id="cta-whatsapp-footer" href={`https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(dict?.nav?.contacto_whatsappMessage || "Hola! Me contacto desde su página web, quiero más información.")}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Icon icon="mdi:phone-outline" className="w-4 h-4" />
                {siteConfig.contact.phoneDisplay}
              </a>
              <a id="cta-email-contacto" href={`mailto:${siteConfig.contact.email}`} className="flex items-center gap-3 text-[13px] text-gray-400 hover:text-white transition-colors cursor-pointer">
                <Icon icon="mdi:email-outline" className="w-4 h-4" />
                {siteConfig.contact.email}
              </a>
            </div>
          </div>

          {/* Center: Links and Copyright */}
          <div className="flex flex-col md:flex-row items-start md:items-center gap-10">
            <div className="flex gap-6">
              <Link href={`/${lang}/terminos`} className="text-[13px] text-gray-400 hover:text-white transition-colors">
                {dict?.footer?.legales?.[0] || "Términos y Condiciones"}
              </Link>
              <Link href={`/${lang}/politicas`} className="text-[13px] text-gray-400 hover:text-white transition-colors">
                {dict?.footer?.legales?.[1] || "Privacidad"}
              </Link>
            </div>
            <div className="text-[12px] text-gray-400">
              © {new Date().getFullYear()} {dict?.footer?.rights || "Cocheras Ezeiza Sur. All rights reserved."}
            </div>
          </div>

          {/* Right: Social Box */}
          <div className="flex gap-4">
            <a
              id="cta-instagram-outbound"
              href={siteConfig.contact.instagramUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Visitar nuestro Instagram"
              className="w-10 h-10 border border-white/10 flex items-center justify-center hover:border-brand-red transition-all cursor-pointer group"
            >
              <Icon icon="mdi:instagram" className="w-5 h-5 text-white group-hover:text-brand-red group-hover:scale-110 transition-all" />
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
}
