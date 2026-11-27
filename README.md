# Casa del Jaguar

Un sitio web moderno para Casa del Jaguar, centro de medicina tradicional especializado en ceremonias de ayahuasca.

## 🚀 Tecnologías

- **[Astro](https://astro.build/)** - Framework web moderno
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework de CSS utilitario
- **[TypeScript](https://www.typescriptlang.org/)** - JavaScript con tipos
- **[Resend](https://resend.com/)** - API de email para formularios de contacto
- **[Vercel](https://vercel.com/)** - Plataforma de deployment

## 📦 Instalación

1. Instala las dependencias:
```bash
npm install
```

2. Configura las variables de entorno:
```bash
cp .env.example .env
```
Edita el archivo `.env` con tus credenciales reales.

3. Inicia el servidor de desarrollo:
```bash
npm run dev
```

## �️ Scripts Disponibles

- `npm run dev` - Inicia el servidor de desarrollo
- `npm run build` - Construye el proyecto para producción
- `npm run preview` - Previsualiza la build de producción
- `npm run format` - Formatea el código con Prettier
- `npm run lint` - Ejecuta ESLint
- `npm run lint:fix` - Ejecuta ESLint y corrige automáticamente
- `npm run check` - Verifica tipos de TypeScript

## 🌍 Internacionalización (i18n)

El sitio web soporta múltiples idiomas:

- **Español (es)** - Idioma predeterminado (sin prefijo en URL)
- **English (en)** - Inglés (con prefijo `/en/` en URL)

### URLs de ejemplo:
- Español: `https://casadeljaguariquitos.com/` (página principal)
- Inglés: `https://casadeljaguariquitos.com/en/` (página principal en inglés)
- Español: `https://casadeljaguariquitos.com/about` (página "nosotros")
- Inglés: `https://casadeljaguariquitos.com/en/about` (página "about")

### Agregar traducciones:
1. Edita `src/i18n/ui.ts` para agregar nuevas claves de traducción
2. Las páginas usan el sistema de routing dinámico `[lang]`
3. El componente `LanguageSwitcher` permite cambiar entre idiomas

## Calendario y fechas preferidas

- `/calendar` y `/en/calendar` permiten proponer una llegada para un retiro de 7 días y 6 noches. No representan un inventario de disponibilidad confirmada.
- El calendario usa la fecha actual de Iquitos (`America/Lima`) en el navegador; no necesita actualizar fechas al generar el sitio.
- La selección se envía al formulario mediante `?arrival=YYYY-MM-DD` o se incluye en el mensaje de WhatsApp.
- El formulario y la API validan la llegada y calculan la salida seis noches después con los mismos helpers de `src/utils/retreat-dates.ts`. Ambos correos de reserva incluyen las fechas preferidas.
- Las solicitudes por formulario requieren la configuración existente de Resend. La confirmación de disponibilidad sigue siendo manual.

Pruebas de fechas: `node --experimental-strip-types --test tests/retreat-dates.test.mjs`.
Pruebas del envío de fechas: `node --test tests/booking-dates.test.mjs` (correos simulados; no envía mensajes reales).

## � Alias de Rutas

El proyecto usa alias de rutas para imports más limpios:

```typescript
// En lugar de imports relativos:
import Layout from '../layouts/Layout.astro';
import Header from '../components/Header.astro';

// Usa alias @:
import Layout from '@/layouts/Layout.astro';
import Header from '@/components/Header.astro';
```

**Alias disponibles:**
- `@/*` → `src/*`
- `@/components/*` → `src/components/*`
- `@/layouts/*` → `src/layouts/*`
- `@/pages/*` → `src/pages/*`
- `@/i18n/*` → `src/i18n/*`
- `@/styles/*` → `src/styles/*`

## 📁 Estructura del Proyecto

```text
/
├── public/             # Archivos estáticos
├── src/
│   ├── components/     # Componentes reutilizables
│   ├── layouts/        # Layouts de página
│   ├── pages/          # Páginas del sitio
│   │   └── api/        # Endpoints de API
│   ├── i18n/           # Archivos de internacionalización
│   └── styles/         # Estilos CSS
├── astro.config.mjs    # Configuración de Astro
└── tailwind.config.cjs # Configuración de Tailwind
```

Astro looks for `.astro` or `.md` files in the `src/pages/` directory. Each page is exposed as a route based on its file name.

There's nothing special about `src/components/`, but that's where we like to put any Astro/React/Vue/Svelte/Preact components.

Any static assets, like images, can be placed in the `public/` directory.

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
