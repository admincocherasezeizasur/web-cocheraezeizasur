'use strict';

/**
 * QA Automation — Cotizador Cocheras Ezeiza Sur
 * Replica la lógica de cálculo de HeroQuoteForm.tsx de forma aislada
 * y la somete a una batería de tests cruzando todas las variables relevantes.
 *
 * Salida: docs/resultados_test_cotizador.md
 */

const fs   = require('fs');
const path = require('path');

// ─── Source of truth: mismo JSON que consume el componente ───────────────────
const { pricingRules } = require('../src/content/pricing.json');

// ─── Lógica replicada (espejo de HeroQuoteForm.tsx) ──────────────────────────

/**
 * Calcula la diferencia en bloques exactos de 24hs con Math.ceil.
 * Acepta strings en formato datetime-local: "YYYY-MM-DDTHH:MM"
 */
function daysBetween(dt1, dt2) {
  const diffMs = new Date(dt2).getTime() - new Date(dt1).getTime();
  return Math.max(1, Math.ceil(diffMs / (1000 * 60 * 60 * 24)));
}

/**
 * Precio base usando los rangos del JSON + multiplicador de categoría
 * + redondeo comercial (Math.ceil a la centena).
 */
function calculateBasePrice(days, category) {
  const ranges = pricingRules.ranges;
  const range  = ranges.find(r => days >= r.minDays && days <= r.maxDays)
               ?? ranges[ranges.length - 1];

  let subtotal;
  if (range.calculationType === 'flat_rate') {
    subtotal = days * (range.rate ?? 0);
  } else {
    subtotal = (range.accumulatedBasePrice ?? 0)
             + (days - (range.baseDaysIncluded ?? 0)) * (range.extraRatePerDay ?? 0);
  }

  const multiplier = pricingRules.vehicleTypes[category].multiplier;
  return Math.ceil(Math.round(subtotal * multiplier) / 100) * 100;
}

/**
 * Addon de Valet según combinación aeropuerto × servicio.
 * Traslado → siempre $0.
 * Valet:  eze_aep / aep_eze → valet_combinado
 *         ezeiza / aeroparque → valet_standard
 *         otro → $0 (gestión manual)
 */
function getValetCost(serviceType, airport) {
  if (serviceType !== 'valet') return 0;
  if (airport === 'eze_aep' || airport === 'aep_eze')
    return pricingRules.additionalServices.valet_combinado;
  if (airport === 'ezeiza' || airport === 'aeroparque')
    return pricingRules.additionalServices.valet_standard;
  return 0;
}

/** Cálculo completo: devuelve baseTotal, valetCost y total. */
function calcQuote(days, category, serviceType, airport) {
  const baseTotal  = calculateBasePrice(days, category);
  const valetCost  = getValetCost(serviceType, airport);
  return { days, category, serviceType, airport, baseTotal, valetCost, total: baseTotal + valetCost };
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const fmt = n => `$${n.toLocaleString('es-AR')}`;

// ─── Test harness ─────────────────────────────────────────────────────────────

let totalPass = 0;
let totalFail = 0;

function assert(condition, label, detail) {
  if (condition) { totalPass++; return { pass: true,  label, detail }; }
  else           { totalFail++; return { pass: false, label, detail }; }
}

// ─── SUITE 1 — Escenarios críticos (boundary + addons) ───────────────────────
//
// Valores esperados calculados a mano:
//
// RANGOS:
//   1-10  → flat_rate 19000/día
//   11-14 → 175000 + (días-10) × 17500
//   15+   → 245000 + (días-14) × 6000
//
// MULTIPLICADORES:
//   standard → × 1.0   |  special → × 1.1  →  Math.ceil(result/100)*100
//
// ADDONS VALET:
//   standard 25.000  |  combinado 90.000  |  otro 0

const CRITICAL = [
  // ── Transición rango 1-10 (flat_rate) ────────────────────────────────────
  { label: 'Día  1 – standard – traslado',        days:  1, cat:'standard', svc:'traslado', aero:'otro',      xBase:   19000, xValet:      0, xTotal:  19000 },
  { label: 'Día  5 – standard – traslado',        days:  5, cat:'standard', svc:'traslado', aero:'otro',      xBase:   95000, xValet:      0, xTotal:  95000 },
  { label: 'Día 10 – standard – traslado',        days: 10, cat:'standard', svc:'traslado', aero:'otro',      xBase:  190000, xValet:      0, xTotal: 190000 },
  { label: 'Día 10 – special  – traslado',        days: 10, cat:'special',  svc:'traslado', aero:'otro',      xBase:  209000, xValet:      0, xTotal: 209000 },
  // ── Transición rango 10→11 (flat → base_plus_extra) ──────────────────────
  { label: 'Día 11 – standard – traslado',        days: 11, cat:'standard', svc:'traslado', aero:'otro',      xBase:  192500, xValet:      0, xTotal: 192500 },
  { label: 'Día 11 – special  – traslado',        days: 11, cat:'special',  svc:'traslado', aero:'otro',      xBase:  211800, xValet:      0, xTotal: 211800 },
  // 192500 × 1.1 = 211750 → ceil(211750/100)*100 = 211800
  { label: 'Día 14 – standard – traslado',        days: 14, cat:'standard', svc:'traslado', aero:'otro',      xBase:  245000, xValet:      0, xTotal: 245000 },
  { label: 'Día 14 – special  – traslado',        days: 14, cat:'special',  svc:'traslado', aero:'otro',      xBase:  269500, xValet:      0, xTotal: 269500 },
  // 245000 × 1.1 = 269500 → múltiplo de 100 ✓
  // ── Transición rango 14→15 (segunda base_plus_extra) ─────────────────────
  { label: 'Día 15 – standard – traslado',        days: 15, cat:'standard', svc:'traslado', aero:'otro',      xBase:  251000, xValet:      0, xTotal: 251000 },
  { label: 'Día 15 – special  – traslado',        days: 15, cat:'special',  svc:'traslado', aero:'otro',      xBase:  276100, xValet:      0, xTotal: 276100 },
  // 251000 × 1.1 = 276100 → múltiplo de 100 ✓
  { label: 'Día 30 – standard – traslado',        days: 30, cat:'standard', svc:'traslado', aero:'otro',      xBase:  341000, xValet:      0, xTotal: 341000 },
  { label: 'Día 45 – standard – traslado',        days: 45, cat:'standard', svc:'traslado', aero:'otro',      xBase:  431000, xValet:      0, xTotal: 431000 },
  // ── Addons Valet ──────────────────────────────────────────────────────────
  { label: 'Día  5 – standard – valet EZE',       days:  5, cat:'standard', svc:'valet',    aero:'ezeiza',    xBase:   95000, xValet:  25000, xTotal: 120000 },
  { label: 'Día  5 – standard – valet AEP',       days:  5, cat:'standard', svc:'valet',    aero:'aeroparque',xBase:   95000, xValet:  25000, xTotal: 120000 },
  { label: 'Día  5 – standard – valet EZE→AEP',  days:  5, cat:'standard', svc:'valet',    aero:'eze_aep',   xBase:   95000, xValet:  90000, xTotal: 185000 },
  { label: 'Día  5 – standard – valet AEP→EZE',  days:  5, cat:'standard', svc:'valet',    aero:'aep_eze',   xBase:   95000, xValet:  90000, xTotal: 185000 },
  { label: 'Día  5 – standard – valet OTRO',      days:  5, cat:'standard', svc:'valet',    aero:'otro',      xBase:   95000, xValet:      0, xTotal:  95000 },
  { label: 'Día 10 – standard – valet EZE',       days: 10, cat:'standard', svc:'valet',    aero:'ezeiza',    xBase:  190000, xValet:  25000, xTotal: 215000 },
  { label: 'Día 11 – standard – valet EZE→AEP',  days: 11, cat:'standard', svc:'valet',    aero:'eze_aep',   xBase:  192500, xValet:  90000, xTotal: 282500 },
  { label: 'Día 15 – special  – valet AEP→EZE',  days: 15, cat:'special',  svc:'valet',    aero:'aep_eze',   xBase:  276100, xValet:  90000, xTotal: 366100 },
];

const criticalResults = CRITICAL.map(sc => {
  const q   = calcQuote(sc.days, sc.cat, sc.svc, sc.aero);
  const ok  = q.baseTotal === sc.xBase && q.valetCost === sc.xValet && q.total === sc.xTotal;
  if (ok) totalPass++; else totalFail++;
  return { ...sc, gotBase: q.baseTotal, gotValet: q.valetCost, gotTotal: q.total, pass: ok };
});

// ─── SUITE 2 — Edge cases de bloques de 24hs ─────────────────────────────────

const EDGE_CASES = [
  {
    label: '24h exactas (sin cruzar la marca)',
    dt1: '2025-06-01T10:00', dt2: '2025-06-02T10:00',
    expectedDays: 1,
  },
  {
    label: '24h + 1 minuto (cruza la marca → 2 días)',
    dt1: '2025-06-01T10:00', dt2: '2025-06-02T10:01',
    expectedDays: 2,
  },
  {
    label: 'Ingreso 18:14 — Egreso +26h (cruzó 24h)',
    dt1: '2025-04-15T18:14', dt2: '2025-04-16T20:00',
    expectedDays: 2,  // Ejemplo del cotizador.md
  },
  {
    label: '23h 59m (no llega a 24h → 1 día mínimo)',
    dt1: '2025-06-01T10:00', dt2: '2025-06-02T09:59',
    expectedDays: 1,
  },
  {
    label: '48h exactas → 2 días',
    dt1: '2025-06-01T10:00', dt2: '2025-06-03T10:00',
    expectedDays: 2,
  },
  {
    label: '48h + 1 minuto → 3 días',
    dt1: '2025-06-01T10:00', dt2: '2025-06-03T10:01',
    expectedDays: 3,
  },
];

const edgeResults = EDGE_CASES.map(ec => {
  const gotDays = daysBetween(ec.dt1, ec.dt2);
  const ok      = gotDays === ec.expectedDays;
  if (ok) totalPass++; else totalFail++;
  return { ...ec, gotDays, pass: ok };
});

// ─── SUITE 3 — Matriz completa: validación de redondeo comercial ─────────────

const DAY_LIST  = [1, 5, 10, 11, 14, 15, 30, 45];
const CATS      = ['standard', 'special'];
const AIRPORTS  = ['ezeiza', 'aeroparque', 'eze_aep', 'aep_eze', 'otro'];
const SERVICES  = ['traslado', 'valet'];

const matrixResults = [];
for (const days     of DAY_LIST)
for (const category of CATS)
for (const airport  of AIRPORTS)
for (const svc      of SERVICES) {
  const q            = calcQuote(days, category, svc, airport);
  const hasDecimals  = q.total % 1 !== 0;
  const notMultiple  = q.total % 100 !== 0;
  const pass         = !hasDecimals && !notMultiple;
  const failReason   = hasDecimals ? 'DECIMAL EN TOTAL'
                     : notMultiple ? 'NO ES MÚLTIPLO DE 100' : null;
  if (pass) totalPass++; else totalFail++;
  matrixResults.push({ ...q, pass, failReason });
}

// ─── Generar Markdown ─────────────────────────────────────────────────────────

const totalCases   = criticalResults.length + edgeResults.length + matrixResults.length;
const overallPass  = totalFail === 0;
const now          = new Date();
const dateStr      = now.toLocaleDateString('es-AR', { day:'2-digit', month:'2-digit', year:'numeric' });
const timeStr      = now.toLocaleTimeString('es-AR', { hour:'2-digit', minute:'2-digit', second:'2-digit' });

const stateOf = pass => pass ? '✅ PASS' : '❌ FAIL';

// Muestra representativa para la tabla de matriz: un fila por cada día × categoría en traslado/otro,
// más muestras de valet combinado y todas las filas que fallaron.
const matrixSample = [];
const seen = new Set();
const pickMatrix = (days, cat, svc, aero) => {
  const k = `${days}-${cat}-${svc}-${aero}`;
  if (seen.has(k)) return;
  seen.add(k);
  const row = matrixResults.find(r => r.days===days && r.category===cat && r.serviceType===svc && r.airport===aero);
  if (row) matrixSample.push(row);
};

// Todas las fallidas primero
matrixResults.filter(r => !r.pass).forEach(r => {
  const k = `${r.days}-${r.category}-${r.serviceType}-${r.airport}`;
  seen.add(k);
  matrixSample.push(r);
});
// Sample: traslado/otro — todos los días, ambas categorías
for (const d of DAY_LIST) for (const c of CATS) pickMatrix(d, c, 'traslado', 'otro');
// Sample: valet combinado
for (const d of [1, 10, 11, 15, 45]) pickMatrix(d, 'standard', 'valet', 'eze_aep');
// Sample: valet standard
for (const d of [5, 14]) pickMatrix(d, 'special', 'valet', 'ezeiza');

let md = `# Reporte de Auditoría — Cotizador Cocheras Ezeiza Sur

**Fecha de ejecución:** ${dateStr} – ${timeStr}
**Combinaciones testeadas:** ${totalCases}
**Resultado:** ${totalPass} ✅ pasaron / ${totalFail} ❌ fallaron
**Estado final: ${overallPass ? '✅ PASS — Todos los tests en verde.' : '❌ FAIL — Revisar casos marcados.'}**

---

## 1. Escenarios Críticos

Validan los saltos de rango, el multiplicador de vehículo y cada combinación de addon Valet.

| Escenario | Base esp. | Base obt. | Valet esp. | Valet obt. | Total esp. | Total obt. | Estado |
|:---|---:|---:|---:|---:|---:|---:|:---:|
`;

for (const r of criticalResults) {
  md += `| ${r.label} | ${fmt(r.xBase)} | ${fmt(r.gotBase)} | ${fmt(r.xValet)} | ${fmt(r.gotValet)} | ${fmt(r.xTotal)} | ${fmt(r.gotTotal)} | ${stateOf(r.pass)} |\n`;
}

md += `
---

## 2. Edge Cases — Bloques de 24hs

Verifican que \`Math.ceil(diff_ms / 86400000)\` corte correctamente en la frontera de las 24h.

| Descripción | Ingreso | Egreso | Días esp. | Días obt. | Estado |
|:---|:---|:---|:---:|:---:|:---:|
`;

for (const r of edgeResults) {
  md += `| ${r.label} | \`${r.dt1}\` | \`${r.dt2}\` | ${r.expectedDays} | ${r.gotDays} | ${stateOf(r.pass)} |\n`;
}

md += `
---

## 3. Matriz Completa — Validación de Redondeo Comercial

> **Regla:** \`total % 100 === 0\` en cada fila. Falla si hay decimales o no es múltiplo de 100.
> Se muestra una muestra representativa + todas las filas con FAIL.

| Días | Cat. | Aeropuerto | Servicio | Base | Addon | Total | Estado |
|---:|:---|:---|:---|---:|---:|---:|:---:|
`;

for (const r of matrixSample) {
  const estado = r.pass ? '✅ PASS' : `❌ FAIL (${r.failReason})`;
  md += `| ${r.days} | ${r.category} | ${r.airport} | ${r.serviceType} | ${fmt(r.baseTotal)} | ${fmt(r.valetCost)} | ${fmt(r.total)} | ${estado} |\n`;
}

const matrixPass = matrixResults.filter(r => r.pass).length;
const matrixFail = matrixResults.filter(r => !r.pass).length;

md += `
> Total en matriz: **${matrixResults.length} combinaciones** — ${matrixPass} ✅ / ${matrixFail} ❌

---

## 4. Resumen

| Suite | Casos | ✅ PASS | ❌ FAIL |
|:---|---:|---:|---:|
| Escenarios críticos | ${criticalResults.length} | ${criticalResults.filter(r=>r.pass).length} | ${criticalResults.filter(r=>!r.pass).length} |
| Edge cases 24hs | ${edgeResults.length} | ${edgeResults.filter(r=>r.pass).length} | ${edgeResults.filter(r=>!r.pass).length} |
| Matriz de redondeo | ${matrixResults.length} | ${matrixPass} | ${matrixFail} |
| **TOTAL** | **${totalCases}** | **${totalPass}** | **${totalFail}** |

---

## 5. Tablas de referencia rápida

### Precios base por días (categoría standard)

| Días | Rango | Subtotal | Redondeo | Base Final |
|---:|:---|---:|:---:|---:|
`;

for (const d of [1,5,10,11,12,13,14,15,20,30,45]) {
  const range = pricingRules.ranges.find(r => d >= r.minDays && d <= r.maxDays) ?? pricingRules.ranges[pricingRules.ranges.length-1];
  let subtotal;
  if (range.calculationType === 'flat_rate') subtotal = d * range.rate;
  else subtotal = range.accumulatedBasePrice + (d - range.baseDaysIncluded) * range.extraRatePerDay;
  const base = Math.ceil((subtotal * 1.0) / 100) * 100;
  md += `| ${d} | ${range.id} | ${fmt(subtotal)} | — | ${fmt(base)} |\n`;
}

md += `
### Addons por tipo de Valet

| Airport value | Tipo | Addon |
|:---|:---|---:|
| \`ezeiza\` | Valet Standard | ${fmt(pricingRules.additionalServices.valet_standard)} |
| \`aeroparque\` | Valet Standard | ${fmt(pricingRules.additionalServices.valet_standard)} |
| \`eze_aep\` | Valet Combinado | ${fmt(pricingRules.additionalServices.valet_combinado)} |
| \`aep_eze\` | Valet Combinado | ${fmt(pricingRules.additionalServices.valet_combinado)} |
| \`otro\` | Manual | $0 |
| *(traslado)* | Sin addon | $0 |

---

*Generado automáticamente por \`scripts/test_cotizador.js\`*
`;

const outPath = path.join(__dirname, '../docs/resultados_test_cotizador.md');
fs.mkdirSync(path.dirname(outPath), { recursive: true });
fs.writeFileSync(outPath, md, 'utf8');

// ─── Salida de consola ────────────────────────────────────────────────────────
console.log('\n══════════════════════════════════════════════════════');
console.log('  QA Cotizador — Cocheras Ezeiza Sur');
console.log('══════════════════════════════════════════════════════');
console.log(`  Total testeado : ${totalCases} combinaciones`);
console.log(`  ✅ PASS        : ${totalPass}`);
console.log(`  ❌ FAIL        : ${totalFail}`);
console.log(`  Estado final   : ${overallPass ? '✅ PASS' : '❌ FAIL'}`);
console.log(`  Reporte        : docs/resultados_test_cotizador.md`);
console.log('══════════════════════════════════════════════════════\n');

if (totalFail > 0) {
  console.error('Casos fallidos:');
  [...criticalResults, ...edgeResults, ...matrixResults]
    .filter(r => !r.pass)
    .forEach(r => console.error('  ❌', r.label ?? `${r.days}d/${r.category}/${r.airport}/${r.serviceType}`));
  process.exit(1);
}
