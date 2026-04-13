import { notFound } from "next/navigation";
import { getDictionary, hasLocale, type Locale } from "./dictionaries";
import { HeroSection } from "@/components/HeroSection";
import { AlertBanner } from "@/components/AlertBanner";
import { ServiciosSection } from "@/components/ServiciosSection";
import { ExperienciaSection } from "@/components/ExperienciaSection";
import { ModalidadesSection } from "@/components/ModalidadesSection";
import { IdentidadSection } from "@/components/IdentidadSection";
import { TestimoniosSection } from "@/components/TestimoniosSection";
import { FAQSection } from "@/components/FAQSection";
import { UbicacionSection } from "@/components/UbicacionSection";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: "Cocheras Ezeiza Sur",
  url: "https://www.cocherasezeizasur.com",
  logo: "https://www.cocherasezeizasur.com/images/logo-cocheras-ezeiza-sur.webp",
  image: "https://www.cocherasezeizasur.com/images/Hero-Image-Background.webp",
  description:
    "Cocheras 100% techadas a minutos del aeropuerto de Ezeiza. Vigilancia 24hs y traslado gratuito.",
  telephone: "+5491138279812",
  email: "info@cocherasezeizasur.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "Venezuela 424",
    addressLocality: "Ezeiza",
    addressRegion: "Buenos Aires",
    postalCode: "1804",
    addressCountry: "AR",
  },
  geo: {
    "@type": "GeoCoordinates",
    latitude: -34.8567202,
    longitude: -58.5345446,
  },
  hasMap:
    "https://www.google.com/maps/place/Venezuela+424,+B1804+EBJ,+Provincia+de+Buenos+Aires",
  priceRange: "$",
  openingHoursSpecification: [
    {
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "00:00",
      closes: "23:59",
    },
  ],
  areaServed: [
    { "@type": "City", name: "Ezeiza" },
    { "@type": "City", name: "Buenos Aires" },
  ],
};

export default async function LangPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang as Locale);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <HeroSection lang={lang as Locale} dict={dict} />
      <AlertBanner messages={dict.notification_bar || []} />
      <ServiciosSection dict={dict} />
      <ExperienciaSection dict={dict} />
      <ModalidadesSection dict={dict} />
      <IdentidadSection dict={dict} />
      <TestimoniosSection dict={dict} />
      <FAQSection dict={dict} />
      <UbicacionSection dict={dict} />
    </>
  );
}
