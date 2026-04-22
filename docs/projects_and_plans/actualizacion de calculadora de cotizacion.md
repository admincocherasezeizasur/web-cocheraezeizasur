# Actualización de Lógica del Cotizador de Cocheras Ezeiza Sur

Se realizará una actualización en la lógica de cálculo de precios del cotizador, reflejando el requerimiento del PDF ("Lógica costos diarios cochera.pdf") y las instrucciones solicitadas.

## Requerimientos y Análisis

1. **Costo mínimo de 1 a 5 días ($95.000 ARS):**  
   Actualmente el sistema utiliza precios base matemáticos o cálculo por día. Para asegurar que cualquier reserva entre 1 y 5 días devuelva exactamente $95.000 ARS como mínimo (sin importar si son 1, 3 o 4 días), agregaremos un nuevo modo de cálculo `fixed_total` en la configuración. Este modo fijará el importe inicial en $95.000 ARS directos.

2. **Valores de Valet Estándar y Combinado (Para estadías mínimas intervinientes):**  
   - Si se escoge valet parking normal desde Ezeiza costará $20.000 ARS.
   - Si se escoge servicio combinado (EZE -> AEP o AEP -> EZE), seguirá costando $90.000 ARS.  
   Esta funcionalidad **ya está mapeada** correctamente en `pricing.json` (`valet_standard`: 20000, `valet_combinado`: 90000).

3. **Costo de 6 a 10 días:**  
   Se aplicará un cálculo `flat_rate` de $19.000 ARS por cada día de estadía general. Se multiplicará la cantidad de días totales por 19.000.  
   (Ejemplo: 6 días = 114.000, 7 días = 133.000).

4. **Costo de 11 a 14 días ($17.500 ARS por el total general de días):**  
   El requerimiento menciona que "cada día en general (incluyendo los primeros 5) cuesta 17500ars". La forma matemática más limpia de implementar esto, tal como está estructurado el cotizador actual, es un bloque `base_plus_extra`:
   Se toman 10 días que sumarían un acumulado simulado de $175.000 (10 días x 17.500) y, de ahí, cada día extra que ingrese sumará otros $17.500 al total, logrando con total perfección el cálculo. O bien se podría hacer un `flat_rate` directamente, pero re-utilizaremos la estructura sin romper el modelo de la app, que es `base_plus_extra`.

5. **Costo desde el día 15+ y Promoción Valet Gratis:**  
   El día 15 cuesta la suma total de 14 días ($245.000 ARS) y cada día añadido suma únicamente **$6.000 ARS**.  
   Además, se mantendrá la regla estricta requerida: Al llegar al día 15, si el cliente elige valet parking desde Ezeiza (el de $20.000 ARS) es gratis, pero el valet Combinado no es gratis y sigue costando los $90.000 ARS originales. El componente `HeroQuoteForm.tsx` y el archivo `config.ts` (`minDaysForFreeValet: 15`) actualmente contemplan esta distinción de forma nativa.

## Cambios Propuestos en el Código

### 1. `src/content/pricing.json`
Modificar el JSON de reglas de precio para albergar los nuevos rangos limitados correctamente:

```json
"ranges": [
  {
    "id": "1_to_5",
    "minDays": 1,
    "maxDays": 5,
    "calculationType": "fixed_total",
    "fixedTotal": 95000
  },
  {
    "id": "6_to_10",
    "minDays": 6,
    "maxDays": 10,
    "calculationType": "flat_rate",
    "rate": 19000
  },
  {
    "id": "11_to_14",
    "minDays": 11,
    "maxDays": 14,
    "calculationType": "base_plus_extra",
    "accumulatedBasePrice": 175000,
    "baseDaysIncluded": 10,
    "extraRatePerDay": 17500
  },
  {
    "id": "15_plus",
    "minDays": 15,
    "maxDays": 999,
    "calculationType": "base_plus_extra",
    "accumulatedBasePrice": 245000,
    "baseDaysIncluded": 14,
    "extraRatePerDay": 6000
  }
]
```

### 2. `src/components/HeroQuoteForm.tsx`
Agregar el soporte al tipo `fixed_total` en la función `calculateBasePrice`:

```typescript
// En la interfaz PricingRange
interface PricingRange {
  id: string;
  minDays: number;
  maxDays: number;
  calculationType: "flat_rate" | "base_plus_extra" | "fixed_total";
  rate?: number;
  accumulatedBasePrice?: number;
  baseDaysIncluded?: number;
  extraRatePerDay?: number;
  fixedTotal?: number;  // <--- Nuevo tipo agregado
}

// En la función calculateBasePrice
if (range.calculationType === "flat_rate") {
  subtotal = days * (range.rate ?? 0);
} else if (range.calculationType === "fixed_total") {
  subtotal = range.fixedTotal ?? 0;
} else {
  subtotal = (range.accumulatedBasePrice ?? 0) + (days - (range.baseDaysIncluded ?? 0)) * (range.extraRatePerDay ?? 0);
}
```

## Pruebas de Verificación
1. Seleccionar estadía de 3 días → Esperado: Tarifa estática de $95.000 ARS sin importar los días. Valet normal $20.000, Combinado $90.000.
2. Seleccionar 8 días → Esperado: $152.000 ARS (8 * 19.000).
3. Seleccionar 12 días → Esperado: $210.000 ARS (12 * 17.500).
4. Seleccionar 17 días → Esperado: $263.000 ARS (Costo 14 días [$245.000] + 3 días extra a $6.000 [$18.000]).
5. Seleccionar Valet Parking desde EZE con 17 días → Esperado: El texto de la suma del valet marca ¡GRATIS! y no suma los +$20.000 al total, mientras que combinado cobraría $90.000.
6. Vehículo Especial → Esperado: Al total general le aplica el Multiplicador 1.1x (+10%) como en toda la app actualmente.
