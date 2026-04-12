/**
 * Formats a number as Argentine Peso display string.
 * 25000 → "$25.000"
 */
export function formatARS(value: number): string {
  return `$${value.toLocaleString("es-AR")}`;
}

/**
 * Replaces {varName} placeholders in a string with the given values.
 * Unknown keys are left as-is.
 *
 * Usage:
 *   interpolate("Precio: {valet_standard} ARS", { valet_standard: "$25.000" })
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

export const pricingVars: Record<string, string> = {
  valet_standard: formatARS(pricingRules.additionalServices.valet_standard),
  valet_combinado: formatARS(pricingRules.additionalServices.valet_combinado),
  tarifa_base: formatARS(pricingRules.ranges[0].rate!),
};
