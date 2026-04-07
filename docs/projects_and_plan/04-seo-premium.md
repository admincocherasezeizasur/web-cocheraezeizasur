# 04 - SEO Premium, Schemas y Metadatos

**Objetivo de esta fase:**
Dominar los resultados de busqueda local en Google mediante la inyeccion estatica de metadatos avanzados, etiquetas hreflang para internacionalizacion y datos estructurados JSON-LD.

**Instrucciones de Ejecucion:**

1. Metadatos y Hreflang:
En el archivo /app/[lang]/layout.tsx, utilizar la funcion generateMetadata de Next.js.
Configurar titulos, descripciones y Open Graph tags dinamicos segun el idioma.
Es vital inyectar las etiquetas "alternates" (hreflang) apuntando a las URLs absolutas (https://cocherasezeizasur.com/es, /en, /pt) para que Google entienda la relacion entre las versiones regionales.

2. Schema Markup - LocalBusiness:
Crear un componente estatico que inyecte un script de tipo application/ld+json en el Head.
Debe contener la estructura de LocalBusiness con:
- Name: Cocheras Ezeiza Sur
- Image:/images/logo.png (Asegurar que el asset exista en /public/images/logo.png)
- Telephone: +5491138279812
- Address: Venezuela 424, Ezeiza, Buenos Aires, Argentina, CP 1804.
- GeoCoordinates: (Buscar e inyectar latitud y longitud aproximada de la direccion).
- PriceRange: "$$"

3. Schema Markup - FAQPage:
Extraer las 5 preguntas frecuentes del documento de contenido y armar un esquema estatico FAQPage en JSON-LD para intentar ganar los "Rich Snippets" (Resultados enriquecidos) en la pagina de busqueda de Google.

4. Archivos de Rastreo Estaticos:
Crear manualmente un archivo robots.txt en la carpeta /public permitiendo el rastreo total (User-agent: * Allow: /).
Crear un script en el package.json que genere el sitemap.xml despues del proceso de build, o armar un archivo sitemap.ts nativo del App Router que itere sobre los idiomas soportados.

5. Scripts de Terceros (Analytics):
Preparar el layout principal utilizando el componente <Script> de Next.js (estrategia: afterInteractive) para inyectar los tags de Google Analytics 4 (GA4) y Microsoft Clarity, garantizando que no bloqueen el renderizado principal de la SPA.