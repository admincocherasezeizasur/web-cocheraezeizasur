"use client";

import Image from "next/image";
import { siteConfig } from "@/content/config";

export function WhatsAppFloat() {
  const href = `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(siteConfig.whatsappMessages.floatingButton)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Contactar por WhatsApp"
      className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-brand-whatsapp rounded-full flex items-center justify-center shadow-[0_4px_20px_rgba(37,211,102,0.45)] hover:shadow-[0_4px_30px_rgba(37,211,102,0.7)] hover:scale-110 transition-all duration-300 active:scale-95"
    >
      <Image
        src="/whatsapp-fill-icon.svg"
        alt="WhatsApp"
        width={28}
        height={28}
        className="brightness-200"
      />
    </a>
  );
}
