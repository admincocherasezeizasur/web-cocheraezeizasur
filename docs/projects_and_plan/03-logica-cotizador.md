# 03 - Logica del Cotizador y Motor de Precios

**Objetivo de esta fase:**
Desarrollar el calculador interactivo de tarifas (Client Component) que consuma dinamicamente los rangos del pricing.json, realice la matematica de la estadia y genere el enlace de cierre de ventas.

**Instrucciones de Ejecucion:**

1. Declaracion del Componente:
Crear el componente del cotizador bajo la directiva "use client". Este componente recibira el objeto completo parseado de pricing.json y los textos traducidos como "props" desde su componente padre (Server Component).

2. Inputs del Usuario:
El cotizador debe tener:
- Selector de Fechas (Ingreso y Egreso) para calcular la cantidad de dias totales.
- Selector de Tipo de Vehiculo (Auto, SUV/Pick-up, Moto).
- Checkbox o Selector de Servicios Adicionales: Valet Parking (Ezeiza) o Traslado Combinado (EZE/AEP).

3. Motor Matematico (Logica de Rangos Dinamicos):
El calculo no debe tener "if/else" hardcodeados. Debe iterar o evaluar el array "dailyRates" del JSON:
- Paso A: Obtener la cantidad total de dias entre las fechas seleccionadas.
- Paso B: Buscar en el array "dailyRates" cual es el objeto donde el total de dias encaje entre "minDays" y "maxDays". Obtener ese "price" base.
- Paso C: Si la logica comercial dicta un recargo progresivo (ej. dia 15 en adelante), calcular el acumulado. Si es una tarifa plana segun el tramo, simplemente multiplicar (dias totales * price * vehicleMultiplier).
- Paso D: Sumar los "additionalServices" seleccionados al total final.

4. Generacion del Link de WhatsApp:
El boton "CONFIRMAR TARIFA POR WHATSAPP" no debe hacer un POST a ninguna API. 
Debe armar una URL dinamica hacia api.whatsapp.com/send con el "whatsappNumber" del JSON y un texto pre-formateado.
Ejemplo del texto: "Hola, quiero reservar una cochera. Ingreso: [Fecha], Egreso: [Fecha]. Vehiculo: [Tipo]. Adicionales: [Servicios]. Cotizacion estimada: $[Total]".

5. Validacion:
Testear el cambio de fechas en el frontend. Asegurar que al pasar de 10 a 11 dias, o a mas de 15 dias, el motor lea correctamente el array de rangos y aplique el precio correspondiente, asi como el multiplicador por tipo de vehiculo.