/**
 * Formats a number as Argentine Peso display string.
 * lang="es"|"pt" -> "$25.000 ARS"
 * lang="en" -> "$25,000 ARS"
 */
export function formatARS(value: number, lang: string = "es"): string {
  const locale = lang === "en" ? "en-US" : "es-AR";
  return `$${value.toLocaleString(locale)} ARS`;
}

/**
 * Replaces {varName} placeholders in a string with the given values.
 * Unknown keys are left as-is.
 *
 * Usage:
 *   interpolate("Precio: {valet_standard}", { valet_standard: "$25.000 ARS" })
 *   // → "Precio: $25.000 ARS"
 */
export function interpolate(
  text: string,
  vars: Record<string, string>
): string {
  return text.replace(/\{(\w+)\}/g, (match, key) => vars[key] ?? match);
}

/** Pre-built vars object from pricing.json — import once and reuse. */
import pricingData from "@/content/pricing.json";

const { pricingRules } = pricingData;

export function getPricingVars(lang: string = "es"): Record<string, string> {
  return {
    valet_standard: formatARS(pricingRules.additionalServices.valet_standard, lang),
    valet_combinado: formatARS(pricingRules.additionalServices.valet_combinado, lang),
    tarifa_base: formatARS((pricingRules.ranges as any[]).find(r => r.rate)?.rate ?? 19000, lang),
  };
}
