# 00 - Master Plan y Reglas de Arquitectura: Cocheras Ezeiza Sur

**Contexto del Proyecto**
Desarrollo de una web de alta conversion (SPA) para un servicio de parking y traslados vinculado al Aeropuerto de Ezeiza. Los objetivos innegociables son: velocidad de carga extrema, posicionamiento SEO local dominante y una infraestructura de hosting con costo cero inicial (Zero-cost serverless hosting).

**Stack Tecnologico Core**
* Framework: Next.js utilizando App Router.
* Estrategia de Renderizado: Static Site Generation (SSG). Configuracion obligatoria de output: "export".
* Estilos e Interfaz: Tailwind CSS.
* Tipado: TypeScript con strict mode activado.
* Entorno de Despliegue: Cloudflare Pages conectado via GitHub.

**Reglas Axiomaticas para el Agente (Protocolo de Desarrollo)**

1. Prohibicion de Codigo de Servidor: 
Dado que el proyecto se compila como HTML/JS estatico, esta estrictamente prohibido utilizar Node.js en tiempo de ejecucion. No se pueden crear API Routes, ni invocar funciones dinamicas del servidor como cookies() o headers(). Todo computo debe resolverse en el navegador del cliente (Client Components) o en el momento de la compilacion (Build time).

2. Aislamiento de Contenido (Autonomia del Negocio): 
Para garantizar la promesa de "Zero Lock-in" y autonomia, la logica de negocio (tarifas base, multiplicadores por dias, costos de valet) y las traducciones de la interfaz (i18n: es, en, pt) NUNCA deben estar hardcodeadas dentro de los componentes .tsx. 
Todo dato volatil debe vivir en la carpeta /src/content/ en formato JSON o TS (ejemplo: /src/content/pricing.json y /src/content/i18n/es.json). Esto permite que los propietarios actualicen precios directamente modificando un archivo plano en el repositorio sin romper la aplicacion.

3. Seguridad de Datos:
Los archivos de configuracion mencionados en el punto anterior no deben alojarse en la carpeta /public. Al residir en /src/content/, el proceso de build inyectara los valores en los bundles de JavaScript, evitando que un atacante descargue el JSON crudo tipeando la URL directa.

4. SEO Premium y Metadatos: 
El posicionamiento es clave. Se exige la implementacion de Schema Markup (JSON-LD) especificamente estructurado para LocalBusiness y FAQPage. Se debe garantizar la correcta generacion estatica del sitemap.xml, robots.txt y la inyeccion de meta-etiquetas dinamicas (hreflang) para manejar correctamente las tres versiones de idioma frente a Google.

**Flujo de Ejecucion (Siguientes Pasos)**
Para evitar la saturacion de la ventana de contexto de la IA, el desarrollo se ejecutara estrictamente en fases modulares. El agente debe leer los siguientes documentos secuencialmente y no avanzar a la siguiente fase sin validacion humana:

* Fase 1: Leer 01-setup-arquitectura.md (Inicializacion, limpieza del boilerplate y configuracion estructural).
* Fase 2: Leer 02-ui-i18n.md (Maquetado de componentes base, Navbar y logica de enrutamiento estatico de idiomas).
* Fase 3: Leer 03-logica-cotizador.md (Desarrollo del motor matematico de calculo de tarifas y armado de la cadena de texto para WhatsApp).
* Fase 4: Leer 04-seo-premium.md (Optimizacion tecnica final, schemas y pre-renderizado).

**Direccion Tecnica**
Maldito NRD / Vacare Digital Solutions LLC (Tech Consulting & Digital Services)