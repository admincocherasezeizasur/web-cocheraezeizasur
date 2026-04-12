# Especificaciones Técnicas: Componente Cotizador
**Para:** Dev (antigravity)

Este documento define la lógica de negocio, restricciones de UI y generación del payload de WhatsApp para el cotizador de Cocheras Ezeiza Sur. La fuente de verdad de los precios es el archivo `src/content/pricing.json`.

## 1. Reglas de Tiempo (Bloques de 24hs - CRÍTICO)
El cobro no es por día calendario, sino por **bloques de 24 horas exactas** desde el momento del ingreso. 
* **Regla Matemática:** Se debe calcular la diferencia en milisegundos entre el `datetime` de Ingreso y Egreso, convertir a horas, dividir por 24 y aplicar `Math.ceil()`.
* **Ejemplo de negocio:** Si el cliente ingresa el `15/04 a las 18:14 hs` y se retira el `16/04 a las 20:00 hs`, el sistema debe cobrar **2 DÍAS** (ya que cruzó la marca de las 24hs).

## 2. Restricciones de UI (Calendario)
Para evitar cotizaciones inválidas, los inputs de fecha/hora (`type="datetime-local"` o el datepicker que uses) deben estar estrictamente bloqueados:
* No se pueden seleccionar días del pasado. El atributo `min` debe inicializarse con la fecha/hora de `today`.
* La fecha de "Egreso" debe tener como `min` la fecha/hora seleccionada en el "Ingreso".

## 3. Lógica de Precios (Consumo del JSON)
El JSON contiene 3 nodos principales. El flujo de cálculo es el siguiente:
1. **Calcular Subtotal por Días:** Con la cantidad de días obtenida (paso 1), buscar en `pricingRules.ranges` dónde encaja. 
   - Si el tipo es `flat_rate`: Subtotal = Días * `rate`.
   - Si el tipo es `base_plus_extra`: Subtotal = `accumulatedBasePrice` + ((Días - `baseDaysIncluded`) * `extraRatePerDay`).
2. **Aplicar Multiplicador de Vehículo:** Multiplicar el Subtotal por el `multiplier` correspondiente al vehículo seleccionado (`pricingRules.vehicleTypes`).
3. **Redondeo Comercial:** Aplicar `Math.ceil(total_previo / 100) * 100` para evitar centavos o números sucios.
4. **Sumar Addons:** Si eligió Valet en el select de Aeropuertos, sumar el recargo correspondiente al final. *(Nota: Por ahora no se calcula el Valet Combinado de 90k, solo Ezeiza/Aeroparque normal).*

## 4. Cálculo de Ahorro vs. Competencia
Debajo del botón de reserva, se debe mostrar un texto dinámico (ej: *"¡Te ahorrás $XXX respecto al aeropuerto!"*).
* Tomar los días calculados y multiplicarlos por `officialAirportRates.ezeiza_por_dia` (o aeroparque, según corresponda).
* Restar a ese total el costo que dio nuestro cotizador. Mostrar esa diferencia en verde.

## 5. Integración WhatsApp (Checkout)
Al hacer click en "Confirmar por WhatsApp", el sistema no guarda en base de datos. Debe generar una URL con `encodeURIComponent` hacia la API de WhatsApp (el número se extrae de `src/content/config.ts` -> `contact.whatsappNumber`).

**Template del string a encodear:**
Hola Cocheras Ezeiza Sur, quiero solicitar una reserva:
📅 *Ingreso:* [DD/MM/YYYY - HH:MM hs]
📅 *Egreso:* [DD/MM/YYYY - HH:MM hs]
⏳ *Estadía:* [X] días
✈️ *Aeropuerto Salida:* [Ezeiza / Aeroparque]
🚗 *Vehículo:* [Auto / Pick-up...]
🛎️ *Servicio:* [Traslado Incluido / Valet Parking]
💰 *Total Cotizado:* $[XX.XXX]

Aguardan mi confirmación.