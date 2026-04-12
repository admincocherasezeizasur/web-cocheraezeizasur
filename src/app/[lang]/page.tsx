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
