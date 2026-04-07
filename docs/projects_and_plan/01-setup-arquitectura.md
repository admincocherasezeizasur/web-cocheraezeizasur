# 01 - Setup Arquitectura y Estructura Base

**Objetivo de esta fase:**
Inicializar el proyecto Next.js limpio, configurar Tailwind CSS y establecer la arquitectura de carpetas que garantice la autonomia del cliente mediante archivos estaticos.

**Instrucciones de Ejecucion:**

1. Inicializacion:
Crear el proyecto Next.js utilizando App Router. Asegurarse de seleccionar TypeScript y Tailwind CSS durante la instalacion. Limpiar todo el CSS residual del archivo globals.css dejando solo las directivas de Tailwind.

2. Configuracion de Static Export:
Modificar el archivo next.config.js (o .ts) para incluir la propiedad: output: "export".
Desactivar la optimizacion de imagenes nativa de Next.js que requiere servidor, seteando: images: { unoptimized: true }.

3. Estructura de Contenido Aislado (Zero Lock-in):
Crear la siguiente estructura en la raiz del proyecto:
/src/content/pricing.json
/src/content/i18n/es.json
/src/content/i18n/en.json
/src/content/i18n/pt.json

4. Llenado del pricing.json (Datos Base y Rangos):
El archivo pricing.json NO debe usar llaves estaticas para los dias. Debe contener un array de rangos para que el cliente pueda modificar no solo el precio, sino tambien la cantidad de dias de cada tramo en el futuro. 
Estructura obligatoria:
- dailyRates: Array de objetos [{ "minDays": 1, "maxDays": 10, "price": 19000 }, { "minDays": 11, "maxDays": 14, "price": 17500 }, { "minDays": 15, "maxDays": 999, "price": 6000 }]
- vehicleMultipliers: Objeto con { "auto": 1, "suv_pickup": 1.2, "moto": 0.5 } (Ajustar porcentajes segun necesidad).
- additionalServices: Objeto con { "valetEzeiza": 25000, "combinadoEzeAep": 90000 }
- whatsappNumber: "5491138279812"

5. Validacion:
Comprobar que el comando de build genera correctamente la carpeta /out sin errores. No avanzar a la Fase 2 sin confirmar esto.