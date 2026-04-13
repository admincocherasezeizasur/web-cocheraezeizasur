# 📖 Manual de Gestión de Contenido — Cocheras Ezeiza Sur

> **Para quién es este manual:** Para el equipo de Cocheras Ezeiza Sur que necesite actualizar precios, textos, datos de contacto o configuración de la web sin necesidad de conocimientos de programación avanzados.

---

## 🗂️ Introducción: Tu "Panel de Control"

Todo el contenido que ves en la web — precios, textos, datos de contacto, idiomas, configuraciones — vive en una sola carpeta:

```
src/content/
├── config.ts          → Datos de contacto y configuración global
├── pricing.json       → Precios y reglas de tarifas
└── i18n/
    ├── es.json        → Todos los textos en ESPAÑOL
    ├── en.json        → Todos los textos en INGLÉS
    └── pt.json        → Todos los textos en PORTUGUÉS
```

**La regla más importante:** Si modificás un archivo de esta carpeta y lo subís a GitHub, la web se actualiza sola en minutos. No necesitás pedirle nada al programador para cambiar un precio o un texto.

---

## 🚨 ADVERTENCIA DE SEGURIDAD — LEELO ANTES DE TOCAR CUALQUIER ARCHIVO

> ⚠️ **REGLA DE ORO:** Los archivos `.json` y `.ts` tienen un formato muy estricto. Si rompés ese formato, **la web dejará de funcionar hasta que se corrija**.

### ❌ Nunca hagas esto:

| Acción prohibida | Por qué falla |
|---|---|
| Borrar unas comillas `"` | El archivo queda inválido |
| Borrar una coma `,` al final de una línea | Rompe la estructura JSON |
| Borrar un `{` o `}` | Rompe la estructura del bloque |
| Borrar un `[` o `]` | Rompe una lista de elementos |
| Dejar un número con puntos como separador de miles (ej: `19.000`) | Los números en JSON no llevan puntos ni comas — usá `19000` |

### ✅ Solo modificá el VALOR, nunca la estructura:

```json
"inicio": "INICIO"
          ↑↑↑↑↑↑↑
          Solo tocás esto (el texto entre las segundas comillas)
```

```json
"rate": 19000
        ↑↑↑↑↑
        Solo tocás este número (sin puntos ni comas)
```

### 🛟 Consejo de seguridad

Antes de editar un archivo, **copialo con otro nombre** como backup (por ejemplo `es_backup.json`). Si algo sale mal, podés restaurarlo. Ese archivo de backup **no lo subas** a GitHub.

---

## 💰 Cómo Editar Precios y Reglas — `pricing.json`

**Archivo a editar:** `src/content/pricing.json`

Cuando cambiás un precio en este archivo, se actualiza automáticamente en:
- ✅ El cotizador del formulario
- ✅ La sección de servicios
- ✅ Las cards de modalidades
- ✅ Los Términos y Condiciones (los 3 idiomas)

### 📌 Caso 1: Cambiar el precio base por día (días 1 al 10)

Buscá este bloque:

```json
{
  "id": "1_to_10",
  "minDays": 1,
  "maxDays": 10,
  "calculationType": "flat_rate",
  "rate": 19000
}
```

El campo `"rate": 19000` es el precio **por día** para estadías de 1 a 10 días.

**Ejemplo:** Si querés cobrar $22.000 por día, cambiá solo el número:

```json
"rate": 22000
```

⚠️ El número **no lleva puntos ni comas**: `22000`, no `22.000`.

---

### 📌 Caso 2: Cambiar el precio de estadías largas (días 11 al 14 y 15+)

Hay dos rangos adicionales. Cada uno tiene:
- `"accumulatedBasePrice"`: el precio acumulado hasta ese punto (no lo toques salvo que sepas exactamente qué hacés)
- `"extraRatePerDay"`: cuánto se cobra por cada día extra dentro del rango

```json
{
  "id": "11_to_14",
  "minDays": 11,
  "maxDays": 14,
  "calculationType": "base_plus_extra",
  "accumulatedBasePrice": 175000,
  "baseDaysIncluded": 10,
  "extraRatePerDay": 17500
}
```

**Ejemplo:** Si querés que a partir del día 11 el extra por día sea $16.000:

```json
"extraRatePerDay": 16000
```

---

### 📌 Caso 3: Cambiar el costo del Valet Parking

Buscá este bloque al final del archivo:

```json
"additionalServices": {
  "valet_standard": 25000,
  "valet_combinado": 90000
}
```

| Campo | Qué significa |
|---|---|
| `valet_standard` | Retiro y entrega en el **mismo aeropuerto** (Ezeiza o Aeroparque) |
| `valet_combinado` | Servicio combinado entre **dos aeropuertos distintos** (EZE ↔ AEP) |

**Ejemplo:** Si el valet estándar ahora cuesta $20.000:

```json
"valet_standard": 20000,
```

✨ Este cambio se refleja en el formulario, en la sección de servicios y en los Términos y Condiciones en los 3 idiomas. **Un solo cambio, todo actualizado.**

---

### 📌 Caso 4: Cambiar el recargo por tipo de vehículo especial

Buscá este bloque:

```json
"vehicleTypes": {
  "standard": {
    "multiplier": 1.0
  },
  "special": {
    "multiplier": 1.1
  }
}
```

El `"multiplier"` es el factor de ajuste del precio:
- `1.0` = precio normal (sin recargo)
- `1.1` = 10% más caro
- `1.2` = 20% más caro

Los vehículos **standard** son: Auto, Moto.
Los vehículos **special** son: Camioneta, SUV, Especiales (RAM, RAPTOR, DUCATO, SPRINTER).

**Ejemplo:** Si querés que los especiales paguen un 15% más:

```json
"multiplier": 1.15
```

---

### 📌 Caso 5: Cambiar las tarifas de comparación con el aeropuerto oficial

Estas tarifas se usan para calcular cuánto "ahorra" el cliente vs. el estacionamiento oficial:

```json
"officialAirportRates": {
  "ezeiza_por_dia": 50000,
  "aeroparque_por_dia": 60000
}
```

Si Ezeiza sube su precio a $55.000/día:

```json
"ezeiza_por_dia": 55000,
```

---

## 🌍 Cómo Editar Textos e Idiomas — archivos `es.json`, `en.json`, `pt.json`

**Archivos a editar:** `src/content/i18n/es.json`, `en.json`, `pt.json`

La web es **multilingüe**: el visitante puede elegir entre Español, Inglés y Portugués. Cada idioma tiene su propio archivo con exactamente las mismas claves (nombres) pero distintos valores (textos).

> 📝 **Regla de los 3 idiomas:** Cuando cambiás un texto en `es.json`, deberías también actualizarlo en `en.json` y `pt.json`. Si no lo hacés, el texto viejo se mantiene para los usuarios en inglés/portugués.

---

### 📌 Cómo encontrar el texto que querés cambiar

Cada texto tiene una "clave" (el nombre a la izquierda) y un "valor" (el texto a la derecha). La clave nunca cambia; solo cambia el valor.

```json
"subtitle": "Cocheras 100% techadas situadas estratégicamente a minutos de Ezeiza."
             ↑ Este es el valor que podés cambiar libremente
```

---

### 📌 Ejemplo práctico: cambiar el subtítulo del hero

**Situación:** Querés cambiar el texto debajo del título principal.

1. Abrí `src/content/i18n/es.json`
2. Buscá la clave `"subtitle"` dentro de la sección `"hero"`:

```json
"hero": {
  ...
  "subtitle": "Cocheras 100% techadas situadas estratégicamente a minutos de Ezeiza. Máxima seguridad para tu vehículo mientras disfrutás de tu destino.",
  ...
}
```

3. Cambiá solo el texto entre las comillas:

```json
"subtitle": "Tu vehículo, en manos seguras. A minutos del aeropuerto de Ezeiza.",
```

4. Hacé lo mismo en `en.json` y `pt.json` con la traducción correspondiente.

---

### 📌 Ejemplo práctico: cambiar el mensaje automático de WhatsApp del Navbar

Cuando alguien hace clic en "CONTACTO" en el menú, se abre WhatsApp con un mensaje pre-cargado. Ese mensaje está en:

```json
"nav": {
  ...
  "contacto_whatsappMessage": "Hola! Me contacto desde su página web, quiero más información.",
  ...
}
```

Cambiá el texto entre las comillas por lo que quieras que diga el mensaje.

---

### 📌 Ejemplo práctico: cambiar el mensaje de WhatsApp de la sección Experiencia

```json
"experiencia": {
  ...
  "cta_whatsappMessage": "Hola, vengo desde la web. Me gustaría aprovechar la promoción del 40%.",
  ...
}
```

---

### 📌 Cómo editar las preguntas frecuentes (FAQ)

En la sección `"faq"` encontrarás la lista de preguntas y respuestas:

```json
"faq": {
  "title": "PREGUNTAS FRECUENTES",
  "items": [
    {
      "q": "¿LAS COCHERAS SON CERRADAS?",
      "a": "Sí, cerradas tanto de techo como de paredes..."
    },
    {
      "q": "¿DEBO DEJAR LAS LLAVES DE MI VEHÍCULO?",
      "a": "Sí, al ingresar dejás las llaves..."
    }
  ]
}
```

- `"q"` es la **pregunta**
- `"a"` es la **respuesta**

Para agregar una nueva pregunta, copiá un bloque `{ "q": "...", "a": "..." }` existente y pegalo después del último, separado por una coma. El orden en el archivo es el orden en que aparecen en la web.

> ⚠️ Si agregás un nuevo bloque, asegurate de que el bloque anterior termine con una coma `,` y que el último bloque **NO tenga coma** antes del `]`.

---

### 📌 Cómo editar los testimonios

```json
"testimonios": {
  "cards": [
    {
      "initials": "RM",
      "name": "RICARDO MARTÍNEZ",
      "role": "VIAJERO FRECUENTE",
      "text": "\"Impecable el servicio de Valet...\""
    }
  ]
}
```

- `"initials"`: las dos letras del avatar circular
- `"name"`: nombre completo
- `"role"`: descripción debajo del nombre
- `"text"`: el texto del testimonio (notá que las comillas internas llevan `\"`)

---

### 📌 Variables especiales en textos legales `{email}` y `{direccion}`

En los archivos de términos y políticas, hay textos que usan variables especiales:

```json
"content": [
  "Podés comunicarte por correo a {email}, o visitarnos en el predio.",
  "Dirección: {direccion}"
]
```

`{email}` y `{direccion}` se reemplazan automáticamente con los valores de `config.ts`. **No los toques** — si necesitás cambiar el email o la dirección, hacelo en `config.ts` (ver sección siguiente) y se actualizará en todos lados.

---

## ⚙️ Cómo Editar la Configuración Global — `config.ts`

**Archivo a editar:** `src/content/config.ts`

Este archivo es el más importante para datos de contacto. Cambiando un dato acá, se actualiza en toda la web: el footer, el navbar, los términos y condiciones, y los botones de WhatsApp.

```typescript
export const siteConfig = {
  contact: {
    whatsappNumber: "5491138279812",      // Número de WhatsApp (sin + ni espacios)
    whatsappUrl: "https://wa.me/5491138279812",  // URL de WhatsApp (igual al número)
    email: "info@cocherasezeizasur.com",  // Email de contacto
    address: "Venezuela 424, entre Centenario y 25 de Mayo. Ezeiza.",  // Dirección física
    googleMapsUrl: "https://www.google.com/maps/...",  // Link al mapa
    instagramUrl: "https://www.instagram.com/...",     // Link a Instagram
    phoneDisplay: "+54 9 11 3827-9812"   // Número de teléfono para mostrar
  },
  promobanner: {
    active: false   // ← Controla la barra de anuncios superior
  }
};
```

---

### 📌 Cómo prender/apagar la barra de anuncios superior

La barra que aparece arriba de todo en la web (con mensajes como "VUELOS NACIONALES: PRESENTARSE 2½ HS ANTES") se controla con esta línea:

```typescript
promobanner: {
  active: false   // false = APAGADA  |  true = ENCENDIDA
}
```

**Para encenderla:** cambiá `false` por `true`

```typescript
active: true
```

**Para apagarla:** cambiá `true` por `false`

```typescript
active: false
```

---

### 📌 Cómo actualizar el número de WhatsApp

Si el número de WhatsApp cambia, actualizá **dos campos**:

```typescript
whatsappNumber: "5491138279812",
whatsappUrl: "https://wa.me/5491138279812",
```

El formato del número es: `54` (código de Argentina) + `9` + código de área + número. Sin espacios, sin guiones, sin el `+`.

**Ejemplo:** Si el número nuevo es `011 4444-5555`:

```typescript
whatsappNumber: "541144445555",
whatsappUrl: "https://wa.me/541144445555",
```

Y también actualizá cómo se muestra en pantalla:

```typescript
phoneDisplay: "+54 11 4444-5555"
```

---

### 📌 Cómo actualizar el link de Instagram

```typescript
instagramUrl: "https://www.instagram.com/tu_usuario_nuevo",
```

Reemplazá la URL completa con la nueva dirección del perfil.

---

### 📌 Cómo actualizar la dirección física

Si el local se muda, actualizá:

```typescript
address: "Nueva Dirección 123, Ciudad.",
googleMapsUrl: "https://www.google.com/maps/...",  // Nuevo link de Google Maps
```

Para obtener el link de Google Maps: abrí Google Maps, buscá la dirección, hacé clic en "Compartir" → "Copiar enlace".

---

## 🚀 El Proceso de Actualización — "El Botón Mágico"

Una vez que editaste los archivos que necesitabas, el proceso para publicar los cambios en la web es el siguiente:

1. **Guardá los archivos** modificados.
2. **Subí los cambios a GitHub** (hacé un "commit" y "push" con los archivos editados).
3. **Esperá entre 2 y 5 minutos.**
4. **Listo** — la web se actualiza automáticamente gracias a Cloudflare.

No necesitás tocar ningún servidor, no necesitás hablarle a nadie. GitHub detecta el cambio y Cloudflare lo despliega solo.

> 💡 **Si usás GitHub Desktop** (la app con interfaz visual): simplemente abrí la app, vas a ver los archivos que cambiaste resaltados. Escribís un mensaje corto describiendo qué cambiaste (ej. "Actualizo precio valet a $20.000") y hacés clic en **"Commit to master"** y luego en **"Push origin"**. En 5 minutos está publicado.

---

## 📋 Resumen Rápido — ¿Qué cambio y dónde lo hago?

| Quiero cambiar... | Archivo | Campo |
|---|---|---|
| Precio base por día | `pricing.json` | `ranges[0].rate` |
| Precio valet estándar | `pricing.json` | `additionalServices.valet_standard` |
| Precio valet combinado | `pricing.json` | `additionalServices.valet_combinado` |
| Recargo vehículos especiales | `pricing.json` | `vehicleTypes.special.multiplier` |
| Número de WhatsApp | `config.ts` | `whatsappNumber` y `whatsappUrl` |
| Email de contacto | `config.ts` | `email` |
| Dirección del local | `config.ts` | `address` |
| Link de Instagram | `config.ts` | `instagramUrl` |
| Barra de anuncios (on/off) | `config.ts` | `promobanner.active` |
| Cualquier texto del sitio | `i18n/es.json` (+ `en.json` + `pt.json`) | La clave correspondiente |
| Preguntas frecuentes | `i18n/es.json` (+ `en.json` + `pt.json`) | `faq.items` |
| Testimonios | `i18n/es.json` (+ `en.json` + `pt.json`) | `testimonios.cards` |

---

*Este manual fue generado para el equipo de Cocheras Ezeiza Sur — Abril 2026.*
