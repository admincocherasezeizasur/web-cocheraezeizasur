# Reporte de Auditoría — Cotizador Cocheras Ezeiza Sur

**Fecha de ejecución:** 11/04/2026 – 03:19:57 p. m.
**Combinaciones testeadas:** 186
**Resultado:** 186 ✅ pasaron / 0 ❌ fallaron
**Estado final: ✅ PASS — Todos los tests en verde.**

---

## 1. Escenarios Críticos

Validan los saltos de rango, el multiplicador de vehículo y cada combinación de addon Valet.

| Escenario | Base esp. | Base obt. | Valet esp. | Valet obt. | Total esp. | Total obt. | Estado |
|:---|---:|---:|---:|---:|---:|---:|:---:|
| Día  1 – standard – traslado | $19.000 | $19.000 | $0 | $0 | $19.000 | $19.000 | ✅ PASS |
| Día  5 – standard – traslado | $95.000 | $95.000 | $0 | $0 | $95.000 | $95.000 | ✅ PASS |
| Día 10 – standard – traslado | $190.000 | $190.000 | $0 | $0 | $190.000 | $190.000 | ✅ PASS |
| Día 10 – special  – traslado | $209.000 | $209.000 | $0 | $0 | $209.000 | $209.000 | ✅ PASS |
| Día 11 – standard – traslado | $192.500 | $192.500 | $0 | $0 | $192.500 | $192.500 | ✅ PASS |
| Día 11 – special  – traslado | $211.800 | $211.800 | $0 | $0 | $211.800 | $211.800 | ✅ PASS |
| Día 14 – standard – traslado | $245.000 | $245.000 | $0 | $0 | $245.000 | $245.000 | ✅ PASS |
| Día 14 – special  – traslado | $269.500 | $269.500 | $0 | $0 | $269.500 | $269.500 | ✅ PASS |
| Día 15 – standard – traslado | $251.000 | $251.000 | $0 | $0 | $251.000 | $251.000 | ✅ PASS |
| Día 15 – special  – traslado | $276.100 | $276.100 | $0 | $0 | $276.100 | $276.100 | ✅ PASS |
| Día 30 – standard – traslado | $341.000 | $341.000 | $0 | $0 | $341.000 | $341.000 | ✅ PASS |
| Día 45 – standard – traslado | $431.000 | $431.000 | $0 | $0 | $431.000 | $431.000 | ✅ PASS |
| Día  5 – standard – valet EZE | $95.000 | $95.000 | $25.000 | $25.000 | $120.000 | $120.000 | ✅ PASS |
| Día  5 – standard – valet AEP | $95.000 | $95.000 | $25.000 | $25.000 | $120.000 | $120.000 | ✅ PASS |
| Día  5 – standard – valet EZE→AEP | $95.000 | $95.000 | $90.000 | $90.000 | $185.000 | $185.000 | ✅ PASS |
| Día  5 – standard – valet AEP→EZE | $95.000 | $95.000 | $90.000 | $90.000 | $185.000 | $185.000 | ✅ PASS |
| Día  5 – standard – valet OTRO | $95.000 | $95.000 | $0 | $0 | $95.000 | $95.000 | ✅ PASS |
| Día 10 – standard – valet EZE | $190.000 | $190.000 | $25.000 | $25.000 | $215.000 | $215.000 | ✅ PASS |
| Día 11 – standard – valet EZE→AEP | $192.500 | $192.500 | $90.000 | $90.000 | $282.500 | $282.500 | ✅ PASS |
| Día 15 – special  – valet AEP→EZE | $276.100 | $276.100 | $90.000 | $90.000 | $366.100 | $366.100 | ✅ PASS |

---

## 2. Edge Cases — Bloques de 24hs

Verifican que `Math.ceil(diff_ms / 86400000)` corte correctamente en la frontera de las 24h.

| Descripción | Ingreso | Egreso | Días esp. | Días obt. | Estado |
|:---|:---|:---|:---:|:---:|:---:|
| 24h exactas (sin cruzar la marca) | `2025-06-01T10:00` | `2025-06-02T10:00` | 1 | 1 | ✅ PASS |
| 24h + 1 minuto (cruza la marca → 2 días) | `2025-06-01T10:00` | `2025-06-02T10:01` | 2 | 2 | ✅ PASS |
| Ingreso 18:14 — Egreso +26h (cruzó 24h) | `2025-04-15T18:14` | `2025-04-16T20:00` | 2 | 2 | ✅ PASS |
| 23h 59m (no llega a 24h → 1 día mínimo) | `2025-06-01T10:00` | `2025-06-02T09:59` | 1 | 1 | ✅ PASS |
| 48h exactas → 2 días | `2025-06-01T10:00` | `2025-06-03T10:00` | 2 | 2 | ✅ PASS |
| 48h + 1 minuto → 3 días | `2025-06-01T10:00` | `2025-06-03T10:01` | 3 | 3 | ✅ PASS |

---

## 3. Matriz Completa — Validación de Redondeo Comercial

> **Regla:** `total % 100 === 0` en cada fila. Falla si hay decimales o no es múltiplo de 100.
> Se muestra una muestra representativa + todas las filas con FAIL.

| Días | Cat. | Aeropuerto | Servicio | Base | Addon | Total | Estado |
|---:|:---|:---|:---|---:|---:|---:|:---:|
| 1 | standard | otro | traslado | $19.000 | $0 | $19.000 | ✅ PASS |
| 1 | special | otro | traslado | $20.900 | $0 | $20.900 | ✅ PASS |
| 5 | standard | otro | traslado | $95.000 | $0 | $95.000 | ✅ PASS |
| 5 | special | otro | traslado | $104.500 | $0 | $104.500 | ✅ PASS |
| 10 | standard | otro | traslado | $190.000 | $0 | $190.000 | ✅ PASS |
| 10 | special | otro | traslado | $209.000 | $0 | $209.000 | ✅ PASS |
| 11 | standard | otro | traslado | $192.500 | $0 | $192.500 | ✅ PASS |
| 11 | special | otro | traslado | $211.800 | $0 | $211.800 | ✅ PASS |
| 14 | standard | otro | traslado | $245.000 | $0 | $245.000 | ✅ PASS |
| 14 | special | otro | traslado | $269.500 | $0 | $269.500 | ✅ PASS |
| 15 | standard | otro | traslado | $251.000 | $0 | $251.000 | ✅ PASS |
| 15 | special | otro | traslado | $276.100 | $0 | $276.100 | ✅ PASS |
| 30 | standard | otro | traslado | $341.000 | $0 | $341.000 | ✅ PASS |
| 30 | special | otro | traslado | $375.100 | $0 | $375.100 | ✅ PASS |
| 45 | standard | otro | traslado | $431.000 | $0 | $431.000 | ✅ PASS |
| 45 | special | otro | traslado | $474.100 | $0 | $474.100 | ✅ PASS |
| 1 | standard | eze_aep | valet | $19.000 | $90.000 | $109.000 | ✅ PASS |
| 10 | standard | eze_aep | valet | $190.000 | $90.000 | $280.000 | ✅ PASS |
| 11 | standard | eze_aep | valet | $192.500 | $90.000 | $282.500 | ✅ PASS |
| 15 | standard | eze_aep | valet | $251.000 | $90.000 | $341.000 | ✅ PASS |
| 45 | standard | eze_aep | valet | $431.000 | $90.000 | $521.000 | ✅ PASS |
| 5 | special | ezeiza | valet | $104.500 | $25.000 | $129.500 | ✅ PASS |
| 14 | special | ezeiza | valet | $269.500 | $25.000 | $294.500 | ✅ PASS |

> Total en matriz: **160 combinaciones** — 160 ✅ / 0 ❌

---

## 4. Resumen

| Suite | Casos | ✅ PASS | ❌ FAIL |
|:---|---:|---:|---:|
| Escenarios críticos | 20 | 20 | 0 |
| Edge cases 24hs | 6 | 6 | 0 |
| Matriz de redondeo | 160 | 160 | 0 |
| **TOTAL** | **186** | **186** | **0** |

---

## 5. Tablas de referencia rápida

### Precios base por días (categoría standard)

| Días | Rango | Subtotal | Redondeo | Base Final |
|---:|:---|---:|:---:|---:|
| 1 | 1_to_10 | $19.000 | — | $19.000 |
| 5 | 1_to_10 | $95.000 | — | $95.000 |
| 10 | 1_to_10 | $190.000 | — | $190.000 |
| 11 | 11_to_14 | $192.500 | — | $192.500 |
| 12 | 11_to_14 | $210.000 | — | $210.000 |
| 13 | 11_to_14 | $227.500 | — | $227.500 |
| 14 | 11_to_14 | $245.000 | — | $245.000 |
| 15 | 15_plus | $251.000 | — | $251.000 |
| 20 | 15_plus | $281.000 | — | $281.000 |
| 30 | 15_plus | $341.000 | — | $341.000 |
| 45 | 15_plus | $431.000 | — | $431.000 |

### Addons por tipo de Valet

| Airport value | Tipo | Addon |
|:---|:---|---:|
| `ezeiza` | Valet Standard | $25.000 |
| `aeroparque` | Valet Standard | $25.000 |
| `eze_aep` | Valet Combinado | $90.000 |
| `aep_eze` | Valet Combinado | $90.000 |
| `otro` | Manual | $0 |
| *(traslado)* | Sin addon | $0 |

---

*Generado automáticamente por `scripts/test_cotizador.js`*
