export const siteConfig = {
  contact: {
    whatsappNumber: "5491138279812",
    whatsappUrl: "https://wa.me/5491138279812",
    email: "cocherasezeizasur2@gmail.com",
    address_es: "Venezuela 424, entre Centenario y 25 de Mayo. Ezeiza.",
    address_en: "Venezuela 424, between Centenario and 25 de Mayo. Ezeiza.",
    address_pt: "Venezuela 424, entre Centenario e 25 de Mayo. Ezeiza.",
    googleMapsUrl: "https://www.google.com/maps/place/Venezuela+424,+B1804+EBJ,+Provincia+de+Buenos+Aires/@-34.8565167,-58.5373976,16.75z/data=!4m6!3m5!1s0x95bcd0b435795221:0x57379f3e4f3d9578!8m2!3d-34.8567202!4d-58.5345446!16s%2Fg%2F11yyjq54r_?entry=ttu&g_ep=EgoyMDI2MDQwOC4wIKXMDSoASAFQAw%3D%3D",
    instagramUrl: "https://www.instagram.com/cocheras_ezeiza_sur?igsh=em52aDg0ZHY4Zmsw",
    phoneDisplay: "+54 9 11 3827-9812"
  },
  promobanner: {
    active: false
  },
  global_promo: {
    active: false,
    applies_to: {
      ezeiza: true,
      eze_aep: true,
      aep_eze: true,
    },
    discount: 0, // e.g., 0.4 = 40% off
  },
  valetPromo: {
    active: true,
    minDaysForFreeValet: 15
  },
  whatsappMessages: {
    cruceros: "Hola! Me contacto desde la web, quisiera consultar sobre el servicio de Cruceros / Buquebus.",
    floatingButton: "Hola! Me contacto desde la web. ¿Me pueden dar más información sobre sus servicios?"
  },
  // Nav links shown in both desktop navbar and mobile menu.
  // "key" must match a key in dict.nav; "anchor" is the section id.
  navLinks: [
    { key: "inicio", anchor: "inicio" },
    { key: "servicios", anchor: "servicios" },
    { key: "tarifas", anchor: "tarifas" },
    { key: "ubicacion", anchor: "ubicacion" },
  ] as { key: "inicio" | "servicios" | "tarifas" | "ubicacion"; anchor: string }[],
};
