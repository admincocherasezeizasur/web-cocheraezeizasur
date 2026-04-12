# Auditoría de Contenido — Redundancias y Claves Obsoletas

**Fecha:** Abril 2026  
**Archivos analizados:** `src/content/i18n/es.json`, `en.json`, `pt.json`, `src/content/config.ts`, `src/content/pricing.json`

---

## Resumen Ejecutivo

| Categoría | Hallazgos | Impacto |
|-----------|-----------|---------|
| A — Claves i18n sin uso | 8 claves (+ 1 array) | Mantenimiento innecesario, riesgo de confusión |
| B — Datos de `config.ts` hardcodeados en JSON | 15 strings en 3 idiomas | Si cambia el email/dirección, hay que actualizar 15 lugares |
| C — Precios de `pricing.json` hardcodeados en JSON | 5 claves × 3 idiomas | Si cambia una tarifa, hay que actualizar el JSON manualmente |
| D — Tipos TypeScript obsoletos en componentes | 3 tipos en `HeroSection.tsx` | Fuerzan a mantener claves JSON que no se renderizan |
| E — Inconsistencia de moneda en PT | 1 clave (`form_valet_extra`) | Muestra "R$" (reais) mezclado con "$" (pesos) en el mismo idioma |

---

## A — Claves i18n Sin Uso

Estas claves existen en los tres JSONs pero **ningún componente las lee ni las renderiza**.

### A1. `hero.cta_whatsapp`
- **Valor (ES):** `"RESERVAR POR WHATSAPP"`
- **Dónde aparece:** Solo en la definición de tipo en `HeroSection.tsx:17`, nunca en JSX
- **Acción:** Eliminar de los 3 JSONs y del tipo en `HeroSection.tsx`

### A2. `hero.form_tipo_auto_suv`
- **Valor (ES):** `"Auto / SUV"`
- **Motivo:** Clave pre-migración. Los tipos de vehículo se reestructuraron con claves individuales (`form_tipo_auto`, `form_tipo_suv`, etc.). Esta clave quedó huérfana.
- **Dónde aparece:** Solo en tipo stale de `HeroSection.tsx:25`
- **Acción:** Eliminar de los 3 JSONs y del tipo en `HeroSection.tsx`

### A3. `hero.form_tipo_pickup`
- **Valor (ES):** `"SUV / PICK-UP"`
- **Motivo:** Mismo caso que A2, clave de diseño anterior
- **Dónde aparece:** Solo en tipo stale de `HeroSection.tsx:26`
- **Acción:** Eliminar de los 3 JSONs y del tipo en `HeroSection.tsx`

### A4. `hero.form_hora`
- **Valor (ES):** `"HORA"`
- **Motivo:** El formulario usaba inputs separados de fecha + hora. Tras migrar a `datetime-local`, `form_hora` quedó en el tipo pero **nunca se renderiza** en el JSX del formulario.
- **Dónde aparece:** Solo en definiciones de tipo (`HeroSection.tsx:19`, `HeroQuoteForm.tsx:27`)
- **Acción:** Eliminar de los 3 JSONs y de ambos tipos

### A5. `footer.navTitle`
- **Valor:** `"SECCIONES"` (ES), `"SECTIONS"` (EN), `"SEÇÕES"` (PT)
- **Dónde aparece:** Solo en JSON. `Footer.tsx` nunca accede a `dict?.footer?.navTitle`
- **Acción:** Eliminar de los 3 JSONs

### A6. `footer.servicesTitle`
- **Valor:** `"SERVICIOS"` / `"SERVICES"` / `"SERVIÇOS"`
- **Dónde aparece:** Solo en JSON. `Footer.tsx` no renderiza ningún título de sección
- **Acción:** Eliminar de los 3 JSONs

### A7. `footer.legalTitle`
- **Valor:** `"LEGAL"` (idéntico en los 3 idiomas)
- **Dónde aparece:** Solo en JSON. `Footer.tsx` no renderiza este título
- **Acción:** Eliminar de los 3 JSONs

### A8. `footer.servicios[]` (array completo)
- **Valor (ES):** `["Traslado Estándar", "Valet Parking", "Limpieza", "Mecánica"]`
- **Motivo:** El `Footer.tsx` actual no incluye una lista de servicios. Solo renderiza los dos links legales (`legales[0]`, `legales[1]`), la info de contacto (de `config.ts`) y el copyright.
- **Acción:** Eliminar el array completo de los 3 JSONs. Si en el futuro se agrega una lista de servicios al footer, recrear entonces.

---

## B — Datos de `config.ts` Hardcodeados en Strings de Texto

`config.ts` es la fuente de verdad para email, dirección y teléfono. Sin embargo, estos valores aparecen **escritos a mano** dentro de strings de texto en las páginas legales.

> **Nota arquitectónica:** `LegalPageContent.tsx` renderiza las secciones como strings planos. Para poder usar valores de `config.ts` sería necesario que el componente soporte interpolación de variables (ej. `{email}`, `{direccion}`). Las tareas de corrección están detalladas abajo.

### B1. Email `info@cocherasezeizasur.com` — 9 ocurrencias

| Archivo | Sección | Campo |
|---------|---------|-------|
| es.json:309 | `terminos.sections[8].content[0]` | "contacto" de términos |
| es.json:361 | `politicas.sections[5].content[1]` | "derechos" de políticas |
| es.json:374 | `politicas.sections[7].content[0]` | "contacto" de políticas |
| en.json:309 | ídem en inglés | |
| en.json:361 | ídem en inglés | |
| en.json:374 | ídem en inglés | |
| pt.json:309 | ídem en portugués | |
| pt.json:361 | ídem en portugués | |
| pt.json:374 | ídem en portugués | |

**Acción:** Agregar soporte de interpolación en `LegalPageContent.tsx` con variables `{email}` y `{direccion}`, y reemplazar los strings hardcodeados por templates con esas variables.

### B2. Dirección `Venezuela 424` — 6 ocurrencias

| Archivo | Sección | Campo |
|---------|---------|-------|
| es.json:296 | `terminos.sections[6].content[1]` | "horarios" de términos |
| es.json:375 | `politicas.sections[7].content[1]` | "contacto" de políticas |
| en.json:296 | ídem en inglés | |
| en.json:375 | ídem en inglés | |
| pt.json:296 | ídem en portugués | |
| pt.json:375 | ídem en portugués | |

**Acción:** Misma solución que B1: variable `{direccion}` interpolada en el componente.

---

## C — Precios de `pricing.json` Hardcodeados en Texto

Los valores monetarios ya están centralizados en `pricing.json`. Sin embargo, aparecen **escritos literalmente** en varios strings de texto. Si se actualiza una tarifa en `pricing.json`, estos textos quedan desactualizados silenciosamente.

### C1. `hero.form_valet_extra` — Precio del valet en el botón del formulario

| Idioma | Valor actual | Precio correcto (pricing.json) |
|--------|-------------|-------------------------------|
| ES | `"(+$25.000ARS)"` | `additionalServices.valet_standard = 25000` |
| EN | `"(+$25,000 ARS)"` | ídem |
| PT | `"(+R$25.000)"` | ídem — **¡además usa R$ en vez de $!** (ver sección E) |

**Acción a corto plazo:** Aceptar el hardcoding pero unificar la moneda (ver E).  
**Acción ideal:** El componente `HeroQuoteForm.tsx` ya lee `pricing.json`; formatear este valor dinámicamente en lugar de leerlo del diccionario.

### C2. `servicios.extraCostsDesc` — Descripción de costos adicionales

- ES: `"+ $25.000 (Retiro y entrega en Ezeiza). + $90.000 (Combinado...)"`
- EN/PT: equivalente
- Referencia en `pricing.json`: `valet_standard: 25000`, `valet_combinado: 90000`

**Acción:** Hardcoding aceptable a corto plazo (texto corrido, difícil de templatear). Documentar que si cambia el precio, hay que actualizar también esta clave en los 3 JSONs.

### C3. `modalidades.cards[0].price` — Tarifa base en card de modalidades

- ES: `"Desde $19.000 (Tarifa base)"`
- Referencia en `pricing.json`: `ranges[0].rate = 19000`

**Acción:** Hardcoding aceptable a corto plazo. Documentar dependencia con `pricing.json`.

### C4. `modalidades.cards[1].price` — Costo adicional valet en card de modalidades

- ES: `"+ $25.000 (Costo adicional)"`
- Referencia en `pricing.json`: `additionalServices.valet_standard = 25000`

**Acción:** Hardcoding aceptable a corto plazo. Documentar dependencia con `pricing.json`.

### C5. `terminos.sections[5].content[0]` — Precios en Términos y Condiciones

- ES: `"$25.000 ARS para retiro y entrega en el mismo aeropuerto... $90.000 ARS para el servicio combinado"`
- EN/PT: equivalente × 2 idiomas más

**Acción:** Misma situación que C2. Si los precios cambian, actualizar los 3 JSONs.

---

## D — Tipos TypeScript Obsoletos en Componentes

`HeroSection.tsx` tiene una definición de tipo `HeroProps` que incluye claves que ya no existen en el formulario real. Esto **fuerza que las claves estén en los JSONs** aunque no se usen.

### Claves en el tipo de `HeroSection.tsx` que no se renderizan:

```typescript
// HeroSection.tsx — tipo HeroProps, líneas 17-26
cta_whatsapp: string;        // ← nunca renderizado
form_tipo_auto_suv: string;  // ← reemplazado por tipos individuales
form_tipo_pickup: string;    // ← reemplazado por tipos individuales
form_hora: string;           // ← stale tras migración a datetime-local
```

**Acción:** Limpiar el tipo en `HeroSection.tsx` eliminando estas 4 entradas. Hacer lo mismo en `HeroQuoteForm.tsx` para `form_hora`.

---

## E — Inconsistencia de Moneda en Portugués

El JSON de PT (`pt.json`) usa dos sistemas de moneda distintos para los mismos precios:

| Clave | Valor en pt.json | Correcto |
|-------|-----------------|---------|
| `hero.form_valet_extra` | `"(+R$25.000)"` | `"(+$25.000 ARS)"` |
| `servicios.extraCostsDesc` | `"+ $25.000 (...)"` | `"+ $25.000 ARS (...)"` |
| `modalidades.cards[1].price` | `"+ $25.000 (Custo adicional)"` | correcto |

El servicio opera en **pesos argentinos (ARS)**. `R$` es la moneda de Brasil (reales). Aunque el idioma es portugués, los precios deben mostrarse en ARS en todos los idiomas.

**Acción:** Corregir `pt.json` → `hero.form_valet_extra` de `"(+R$25.000)"` a `"(+$25.000 ARS)"`.

---

## Lista de Tareas (Checklist)

### Tareas Simples — Solo edición de JSON/tipos

- [ ] **[A1-A4]** Eliminar de los 3 JSONs: `hero.cta_whatsapp`, `hero.form_tipo_auto_suv`, `hero.form_tipo_pickup`, `hero.form_hora`
- [ ] **[A5-A7]** Eliminar de los 3 JSONs: `footer.navTitle`, `footer.servicesTitle`, `footer.legalTitle`
- [ ] **[A8]** Eliminar de los 3 JSONs: el array `footer.servicios`
- [ ] **[D]** Limpiar tipo en `HeroSection.tsx`: eliminar `cta_whatsapp`, `form_tipo_auto_suv`, `form_tipo_pickup`, `form_hora` del tipo `HeroProps`
- [ ] **[D]** Limpiar tipo en `HeroQuoteForm.tsx`: eliminar `form_hora`
- [ ] **[E]** Corregir `pt.json` → `hero.form_valet_extra`: cambiar `"(+R$25.000)"` por `"(+$25.000 ARS)"`

### Tareas de Desarrollo — Requieren cambios en componentes

- [ ] **[B1+B2]** Agregar soporte de interpolación en `LegalPageContent.tsx` para variables `{email}` y `{direccion}`:
  1. Pasar `siteConfig.contact.email` y `siteConfig.contact.address` como props al componente
  2. Reemplazar los strings hardcodeados en todos los JSONs por placeholders (`{email}`, `{direccion}`)
  3. Implementar función de reemplazo en el componente antes de renderizar cada párrafo

- [ ] **[C1-Ideal]** Hacer que `HeroQuoteForm.tsx` genere dinámicamente el label del valet extra desde `pricing.json` en vez de leerlo del diccionario (eliminar `form_valet_extra` de los 3 JSONs y formatear en el componente)

### Documentación — No requieren código

- [ ] **[C2-C5]** Agregar comentario en `pricing.json` advirtiendo que los valores de `valet_standard`, `valet_combinado` y `ranges[0].rate` también aparecen hardcodeados en los JSONs de i18n (claves listadas arriba)

---

## Impacto por Prioridad

| Prioridad | Tarea | Esfuerzo | Riesgo |
|-----------|-------|----------|--------|
| Alta | E — Corregir moneda R$ en PT | Muy bajo | Ninguno |
| Alta | A1-A8 + D — Eliminar claves sin uso | Bajo | Bajo (solo limpieza) |
| Media | B1+B2 — Interpolación email/dirección en legal | Medio | Bajo |
| Baja | C1-Ideal — Dinámizar `form_valet_extra` | Medio | Bajo |
