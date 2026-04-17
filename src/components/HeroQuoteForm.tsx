"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { siteConfig } from "@/content/config";
import pricingData from "@/content/pricing.json";
import { formatARS } from "@/lib/interpolate";

/* ─── Types ─── */
type ServiceType = "traslado" | "valet";
type VehicleType = "auto" | "especial";
type AirportType = "ezeiza" | "eze_aep" | "aep_eze";
type VehicleCategory = "standard" | "special";

interface PricingRange {
  id: string;
  minDays: number;
  maxDays: number;
  calculationType: "flat_rate" | "base_plus_extra";
  rate?: number;
  accumulatedBasePrice?: number;
  baseDaysIncluded?: number;
  extraRatePerDay?: number;
}

interface HeroDict {
  form_fecha_ingreso: string;
  form_fecha_egreso: string;
  form_nota_hora: string;
  form_aeropuerto_label: string;
  form_aeropuerto_ezeiza: string;
  form_aeropuerto_aeroparque?: string;
  form_aeropuerto_eze_aep?: string;
  form_aeropuerto_aep_eze?: string;
  form_aeropuerto_otro?: string;
  form_tipo_vehiculo_label: string;
  form_tipo_auto?: string;
  form_tipo_camioneta?: string;
  form_tipo_especial?: string;
  form_traslado: string;
  form_valet: string;
  form_promo_valet?: string;
  form_gratis?: string;
  form_cotizar: string;
  cta_quote: string;
  result_title: string;
  result_estadia: string;
  result_vehiculo: string;
  result_ingreso: string;
  result_egreso: string;
  result_servicio_label: string;
  result_traslado_desc: string;
  result_valet_desc: string;
  result_tarifa_base: string;
  result_servicio_valet: string;
  result_total: string;
  result_confirmar_whatsapp: string;
  result_ahorro: string;
  result_whatsapp_msg_prefix: string;
}

interface HeroQuoteFormProps {
  dict: HeroDict;
  lang: string;
}

/* ─── Pricing source of truth ─── */
const { pricingRules } = pricingData;

/* ─── Vehicle → pricing category ─── */
const VEHICLE_CATEGORY: Record<VehicleType, VehicleCategory> = {
  auto: "standard",
  especial: "special",
};

/* ─── Helpers ─── */

/** Returns current local datetime as YYYY-MM-DDTHH:MM (for datetime-local min) */
function getNowDatetimeLocal(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");
  const hours = String(now.getHours()).padStart(2, "0");
  const minutes = String(now.getMinutes()).padStart(2, "0");
  return `${year}-${month}-${day}T${hours}:${minutes}`;
}

/**
 * Calculates days as exact 24-hour blocks (Math.ceil), minimum 1.
 * dt1/dt2 are datetime-local strings: "YYYY-MM-DDTHH:MM"
 */
function daysBetween(dt1: string, dt2: string): number {
  const diffMs = new Date(dt2).getTime() - new Date(dt1).getTime();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Tiered pricing from pricing.json ranges, with vehicle multiplier
 * and commercial rounding (Math.ceil to nearest $100).
 */
function calculateBasePrice(days: number, category: VehicleCategory): number {
  const ranges = pricingRules.ranges as PricingRange[];
  const range = ranges.find((r) => days >= r.minDays && days <= r.maxDays) ?? ranges[ranges.length - 1];

  let subtotal: number;
  if (range.calculationType === "flat_rate") {
    subtotal = days * (range.rate ?? 0);
  } else {
    subtotal =
      (range.accumulatedBasePrice ?? 0) +
      (days - (range.baseDaysIncluded ?? 0)) * (range.extraRatePerDay ?? 0);
  }

  const multiplier = pricingRules.vehicleTypes[category].multiplier;
  // Math.round() elimina el epsilon de float64 (ej: 190000 × 1.1 = 209000.0000001687 → 209000)
  return Math.round(subtotal * multiplier);
}


function formatCurrency(amount: number, lang: string): string {
  const locale = lang === "en" ? "en-US" : "es-AR";
  return `$${amount.toLocaleString(locale)} ARS`;
}

/** "YYYY-MM-DDTHH:MM" → "DD/MM/YYYY - HH:MM hs" */
function formatDatetimeLong(dt: string): string {
  if (!dt) return "--/-- - --:--";
  const [datePart, timePart] = dt.split("T");
  const [year, month, day] = datePart.split("-");
  return `${day}/${month}/${year} - ${timePart} hs`;
}

/** "YYYY-MM-DDTHH:MM" → "DD/MM" */
function formatDateShort(dt: string): string {
  if (!dt) return "--/--";
  const datePart = dt.split("T")[0];
  const [, month, day] = datePart.split("-");
  return `${day}/${month}`;
}

/* ─── Component ─── */
export function HeroQuoteForm({ dict, lang }: HeroQuoteFormProps) {
  const [datetimeIngreso, setDatetimeIngreso] = useState("");
  const [datetimeEgreso, setDatetimeEgreso] = useState("");
  const [airport, setAirport] = useState<AirportType>("ezeiza");
  const [vehicleType, setVehicleType] = useState<VehicleType>("auto");
  const [serviceType, setServiceType] = useState<ServiceType>("traslado");
  const [showResult, setShowResult] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  const nowMin = getNowDatetimeLocal();

  const quote = useMemo(() => {
    if (!datetimeIngreso || !datetimeEgreso) return null;
    const days = daysBetween(datetimeIngreso, datetimeEgreso);
    const category = VEHICLE_CATEGORY[vehicleType];
    const baseTotal = calculateBasePrice(days, category);

    let valetCost = 0;
    if (serviceType === "valet") {
      if (airport === "ezeiza") {
        valetCost = pricingRules.additionalServices.valet_standard;
      } else if (airport === "eze_aep" || airport === "aep_eze") {
        valetCost = pricingRules.additionalServices.valet_combinado;
      }

      if (siteConfig.valetPromo.active && days >= siteConfig.valetPromo.minDaysForFreeValet) {
        valetCost = 0;
      }
    }

    const total = baseTotal + valetCost;

    // Savings solo tiene sentido cuando comparamos contra la tarifa oficial de Ezeiza
    let savings: number | null = null;
    if (airport === "ezeiza") {
      const officialRate = pricingRules.officialAirportRates.ezeiza_por_dia;
      const diff = days * officialRate - total;
      if (diff > 0) savings = diff;
    }

    return { days, baseTotal, valetCost, total, savings };
  }, [datetimeIngreso, datetimeEgreso, vehicleType, serviceType, airport]);

  const handleIngresoChange = (value: string) => {
    setDatetimeIngreso(value);
    setHasErrors(false);
    // If egreso is now before or equal to ingreso, clear it to force re-selection
    if (datetimeEgreso && datetimeEgreso <= value) {
      setDatetimeEgreso("");
    }
  };

  const handleCotizar = () => {
    if (!datetimeIngreso || !datetimeEgreso) {
      setHasErrors(true);
      return;
    }
    setHasErrors(false);
    setShowResult(true);
  };

  const handleBack = () => setShowResult(false);

  const handleWhatsApp = () => {
    if (!quote) return;

    const vehicleLabel =
      vehicleType === "auto" ? (dict.form_tipo_auto ?? "Auto") :
      (dict.form_tipo_especial ?? "Especiales/Grande");

    const airportLabel =
      airport === "ezeiza" ? (dict.form_aeropuerto_ezeiza ?? "EZEIZA") :
      airport === "eze_aep" ? (dict.form_aeropuerto_eze_aep ?? "EZE → AEP") :
      (dict.form_aeropuerto_aep_eze ?? "AEP → EZE");

    const valetLineLabel =
      airport === "ezeiza"
        ? (dict.result_servicio_valet ?? "Servicio Valet (EZE)")
        : `Servicio Valet (${airportLabel})`;

    const serviceLabel =
      serviceType === "traslado" ? dict.result_traslado_desc : dict.result_valet_desc;

    const valetLine = serviceType === "valet"
      ? `   ↳ ${dict.result_tarifa_base}: ${formatCurrency(quote.baseTotal, lang)}\n` +
        `   ↳ ${valetLineLabel}: ${quote.valetCost === 0 ? (dict.form_gratis ?? "¡GRATIS!") : `+${formatCurrency(quote.valetCost, lang)}`}\n`
      : "";

    const message =
      `${dict.result_whatsapp_msg_prefix}\n` +
      `📅 *Ingreso:* ${formatDatetimeLong(datetimeIngreso)}\n` +
      `📅 *Egreso:* ${formatDatetimeLong(datetimeEgreso)}\n` +
      `📆 *Días Totales:* ${quote.days} día${quote.days !== 1 ? "s" : ""}\n` +
      `✈️ *Aeropuerto Salida:* ${airportLabel}\n` +
      `🚗 *Vehículo:* ${vehicleLabel}\n` +
      `🛎️ *Servicio:* ${serviceLabel}\n` +
      valetLine +
      `💰 *Total Cotizado:* ${formatCurrency(quote.total, lang)}\n\n` +
      `Aguardan mi confirmación.`;

    (window as any).dataLayer = (window as any).dataLayer || [];
    (window as any).dataLayer.push({
      event: 'lead_cotizador_whatsapp',
      lead_type: 'reserva',
      value: quote.total,
      currency: 'ARS'
    });

    window.open(
      `https://wa.me/${siteConfig.contact.whatsappNumber}?text=${encodeURIComponent(message)}`,
      "_blank"
    );
  };

  /* ─── Result View ─── */
  if (showResult && quote) {
    return (
      <div className="w-full max-w-md bg-brand-card/90 backdrop-blur-lg border border-brand-red/20 rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(217,4,41,0.25)] hover:shadow-[0_0_60px_rgba(217,4,41,0.45)] transition-shadow duration-500 group">
        {/* Header */}
        <div className="px-7 pt-7 pb-5">
          <div className="flex items-center justify-between mb-1">
            <h2 className="text-lg font-extrabold text-white tracking-wide uppercase">
              {dict.result_title}
            </h2>
            <Image
              src="/shield-02-icon.svg"
              alt="Shield"
              width={25}
              height={30}
              className="opacity-60"
            />
          </div>
        </div>

        <div className="px-7 pb-7 space-y-5">
          {/* Estadía / Vehículo info cards */}
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-white/10 rounded-lg px-4 py-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                {dict.result_estadia}
              </p>
              <p className="text-sm font-bold text-white">
                {formatDateShort(datetimeIngreso)} — {formatDateShort(datetimeEgreso)}
              </p>
              <p className="text-[10px] text-white/40 mt-1">
                {dict.result_ingreso} {datetimeIngreso.split("T")[1] ?? "--:--"} hs.
              </p>
              <p className="text-[10px] text-white/40">
                {dict.result_egreso} {datetimeEgreso.split("T")[1] ?? "--:--"} hs.
              </p>
            </div>
            <div className="border border-white/10 rounded-lg px-4 py-3">
              <p className="text-[10px] text-white/40 uppercase tracking-wider mb-1">
                {dict.result_vehiculo}
              </p>
              <p className="text-sm font-bold text-white">
                {vehicleType === "auto" ? (dict.form_tipo_auto ?? "Auto") :
                 (dict.form_tipo_especial ?? "Especial/Grande")}
              </p>
            </div>
          </div>

          {/* Servicio seleccionado */}
          <div className="border border-brand-whatsapp/30 bg-brand-whatsapp/5 rounded-xl px-4 py-3 flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-brand-whatsapp/10 flex items-center justify-center shrink-0">
              <Image
                src={serviceType === "traslado" ? "/traslado_icon.svg" : "/valet-parking-icon.svg"}
                alt="Service"
                width={22}
                height={14}
                className="brightness-200"
              />
            </div>
            <div>
              <p className="text-[10px] text-white/40 uppercase tracking-wider">
                {dict.result_servicio_label}
              </p>
              <p className="text-sm font-semibold text-white">
                {serviceType === "traslado" ? dict.result_traslado_desc : dict.result_valet_desc}
              </p>
            </div>
          </div>

          {/* Tarifa breakdown */}
          <div className="space-y-2 pt-2 border-t border-white/10">
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60 italic">Días Totales</span>
              <span className="text-sm font-bold text-brand-whatsapp">{quote.days} día{quote.days !== 1 ? "s" : ""}</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/60 italic">{dict.result_tarifa_base}</span>
              <span className="text-sm text-white/80">{formatCurrency(quote.baseTotal, lang)}</span>
            </div>
            {serviceType === "valet" && (
              <div className="flex justify-between items-center">
                <span className="text-sm text-white/60 italic">{airport === "ezeiza" ? (dict.result_servicio_valet ?? "Servicio Valet (EZE)") : `Servicio Valet (${airport === "eze_aep" ? (dict.form_aeropuerto_eze_aep ?? "EZE → AEP") : (dict.form_aeropuerto_aep_eze ?? "AEP → EZE")})`}</span>
                <span className={`text-sm ${quote.valetCost === 0 ? "text-brand-whatsapp font-bold" : "text-white/80"}`}>
                  {quote.valetCost === 0 ? (dict.form_gratis ?? "¡GRATIS!") : `+${formatCurrency(quote.valetCost, lang)}`}
                </span>
              </div>
            )}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 border-t border-white/10">
            <span className="text-sm font-bold text-white uppercase">{dict.result_total}</span>
            <span className="text-3xl font-extrabold text-brand-whatsapp">
              {formatCurrency(quote.total, lang)}
            </span>
          </div>

          {/* WhatsApp CTA */}
          <button
            id="cta-confirmar-cotizacion"
            onClick={handleWhatsApp}
            className="w-full shimmer-btn bg-brand-whatsapp hover:bg-brand-whatsapp/85 text-white font-bold text-sm tracking-widest py-4 rounded-xl transition-all duration-300 hover:shadow-[0_0_15px_rgba(37,211,102,0.4)] hover:border-[#25D366]/50 active:scale-[0.98] flex items-center justify-center gap-3 border border-transparent"
          >
            <Image
              src="/whatsapp-fill-icon.svg"
              alt="WhatsApp"
              width={20}
              height={20}
              className="brightness-200"
            />
            {dict.result_confirmar_whatsapp}
          </button>

          {/* Ahorro dinámico (solo si hay ahorro y aeropuerto conocido) */}
          {quote.savings !== null && (
            <p className="text-center text-xs text-amber-400/80 flex items-center justify-center gap-1.5">
              <span>✦</span>
              {dict.result_ahorro.replace("{savings}", formatCurrency(quote.savings, lang))}
            </p>
          )}

          {/* Back button */}
          <button
            onClick={handleBack}
            className="w-full text-sm text-white/40 hover:text-white/70 transition-colors mt-2 underline underline-offset-4"
          >
            ← Modificar cotización
          </button>
        </div>
      </div>
    );
  }

  /* ─── Form View ─── */
  return (
    <div className="relative">
      {/* Etiqueta Promo Valet Parking */}
      {siteConfig.valetPromo.active && dict.form_promo_valet && (
        <div className="absolute -top-3 -right-2 md:-right-4 z-20 bg-brand-red text-white text-[10px] sm:text-[11px] font-bold uppercase py-1.5 px-3.5 rounded-full shadow-[0_0_20px_rgba(217,4,41,0.6)] animate-pulse-slow border border-white/20 whitespace-nowrap">
          {dict.form_promo_valet}
        </div>
      )}
      <div className="w-full max-w-md bg-brand-card/90 backdrop-blur-lg border border-brand-red/20 rounded-2xl overflow-hidden shadow-[0_0_35px_rgba(217,4,41,0.3)] hover:shadow-[0_0_60px_rgba(217,4,41,0.5)] transition-shadow duration-500 group">
      {/* Header */}
      <div className="px-7 pt-7 pb-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-0.5 bg-brand-red" />
            <h2 className="text-lg font-extrabold text-white tracking-wide uppercase">
              {dict.cta_quote}
            </h2>
          </div>
          <Image
            src="/caluladora_icon.svg"
            alt="Calculator"
            width={32}
            height={32}
            className="opacity-70"
          />
        </div>
      </div>

      <div className="px-7 pb-7 space-y-4">
        {/* Fecha/Hora Ingreso — datetime-local, min = ahora */}
        <div>
          <label htmlFor="fecha-ingreso" className="text-[10px] text-white/50 uppercase tracking-wider font-medium block mb-1.5">
            {dict.form_fecha_ingreso}
          </label>
          <input
            id="fecha-ingreso"
            type="datetime-local"
            value={datetimeIngreso}
            min={nowMin}
            onChange={(e) => handleIngresoChange(e.target.value)}
            onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
            className={`w-full bg-white/5 border ${
              hasErrors && !datetimeIngreso ? "border-red-500 bg-red-500/10" : "border-white/10"
            } rounded-lg px-4 py-2.5 text-sm text-white/80 outline-none focus:border-brand-red/50 transition-colors [color-scheme:dark] cursor-pointer`}
          />
        </div>

        {/* Fecha/Hora Egreso — datetime-local, min = ingreso seleccionado */}
        <div>
          <label htmlFor="fecha-egreso" className="text-[10px] text-white/50 uppercase tracking-wider font-medium block mb-1.5">
            {dict.form_fecha_egreso}
          </label>
          <input
            id="fecha-egreso"
            type="datetime-local"
            value={datetimeEgreso}
            min={datetimeIngreso || nowMin}
            onChange={(e) => { setDatetimeEgreso(e.target.value); setHasErrors(false); }}
            onClick={(e) => (e.currentTarget as HTMLInputElement).showPicker?.()}
            className={`w-full bg-white/5 border ${
              hasErrors && !datetimeEgreso ? "border-red-500 bg-red-500/10" : "border-white/10"
            } rounded-lg px-4 py-2.5 text-sm text-white/80 outline-none focus:border-brand-red/50 transition-colors [color-scheme:dark] cursor-pointer`}
          />
        </div>

        {/* Nota de hora */}
        <p className="text-[9px] text-white/35 leading-relaxed">{dict.form_nota_hora}</p>

        {/* Aeropuerto */}
        <div>
          <label htmlFor="aeropuerto-select" className="text-[10px] text-white/50 uppercase tracking-wider font-medium block mb-1.5">
            {dict.form_aeropuerto_label}
          </label>
          <select
            id="aeropuerto-select"
            value={airport}
            onChange={(e) => setAirport(e.target.value as AirportType)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 outline-none focus:border-brand-red/50 transition-colors appearance-none cursor-pointer [color-scheme:dark]"
          >
            <option value="ezeiza" className="bg-brand-card text-white">
              {dict.form_aeropuerto_ezeiza ?? "EZEIZA"}
            </option>
            <option value="eze_aep" className="bg-brand-card text-white">
              {dict.form_aeropuerto_eze_aep ?? "EZE → AEP (Valet Combinado)"}
            </option>
            <option value="aep_eze" className="bg-brand-card text-white">
              {dict.form_aeropuerto_aep_eze ?? "AEP → EZE (Valet Combinado)"}
            </option>
          </select>
        </div>

        {/* Tipo de vehículo */}
        <div>
          <label htmlFor="vehiculo-select" className="text-[10px] text-white/50 uppercase tracking-wider font-medium block mb-1.5">
            {dict.form_tipo_vehiculo_label}
          </label>
          <select
            id="vehiculo-select"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value as VehicleType)}
            className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-sm text-white/80 outline-none focus:border-brand-red/50 transition-colors appearance-none cursor-pointer [color-scheme:dark]"
          >
            <option value="auto" className="bg-brand-card text-white">{dict.form_tipo_auto ?? "Auto"}</option>
            <option value="especial" className="bg-brand-card text-white">
              {dict.form_tipo_especial ?? "Especiales/Grande (RAM, RAPTOR, DUCATO, SPRINTER)"}
            </option>
          </select>
        </div>

        {/* Service Type Toggle */}
        <div className="grid grid-cols-2 gap-3 pt-1">
          <button
            type="button"
            onClick={() => setServiceType("traslado")}
            className={`flex items-center justify-center gap-2 rounded-lg py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
              serviceType === "traslado"
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/[0.02] border-white/5 text-white/40 hover:text-white/60 hover:border-white/10"
            }`}
          >
            <Image
              src="/traslado_icon.svg"
              alt=""
              aria-hidden="true"
              width={13}
              height={9}
              className={serviceType === "traslado" ? "brightness-200" : "opacity-60"}
            />
            {dict.form_traslado}
          </button>
          <button
            type="button"
            onClick={() => setServiceType("valet")}
            className={`flex flex-col items-center justify-center gap-0.5 rounded-lg py-3 text-xs font-bold uppercase tracking-wider transition-all duration-200 border ${
              serviceType === "valet"
                ? "bg-white/10 border-white/20 text-white"
                : "bg-white/[0.02] border-white/5 text-white/40 hover:text-white/60 hover:border-white/10"
            }`}
          >
            <span className="flex items-center gap-2">
              <Image
                src="/valet_parking_btn_icon.svg"
                alt=""
                aria-hidden="true"
                width={10}
                height={12}
                className={serviceType === "valet" ? "brightness-200" : "opacity-60"}
              />
              {dict.form_valet}
            </span>
            <span className={`text-[8px] font-normal normal-case ${quote && siteConfig.valetPromo.active && quote.days >= siteConfig.valetPromo.minDaysForFreeValet ? "text-brand-whatsapp font-bold" : "text-white/30"}`}>
              {quote && siteConfig.valetPromo.active && quote.days >= siteConfig.valetPromo.minDaysForFreeValet
                ? (dict.form_gratis ?? "¡GRATIS!")
                : `(+${formatARS(airport === "ezeiza" ? pricingRules.additionalServices.valet_standard : pricingRules.additionalServices.valet_combinado, lang)})`}
            </span>
          </button>
        </div>

        {/* CTA */}
        <button
          id="cta-cotizador"
          onClick={handleCotizar}
          className="w-full mt-2 shimmer-btn neon-glow bg-brand-red hover:bg-brand-red-hover text-white font-bold text-sm tracking-[0.2em] py-4 rounded-xl transition-all duration-300 active:scale-[0.98] uppercase border border-transparent"
        >
          {dict.form_cotizar}
        </button>
      </div>
    </div>
    </div>
  );
}
