import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const BUILD_DATE = new Date().toISOString();
const POST_DATES = {
  'how-to-prepare-for-ayahuasca-ceremony-complete-guide': '2025-09-20',
  'awakening-to-the-divine-inaugural-encounter-with-mother-ayahuasca': '2025-09-30',
  'a-transformative-encounter-when-I-met-the-shaman-dan-reynolds': '2025-09-30',
  'my-first-ayahuasca-ceremony-with-master-dan': '2025-09-30',
  'benefits-of-ceremonies-at-casa-del-jaguar': '2025-10-02',
  'the-importance-of-integration-after-the-ceremony': '2025-09-10',
};

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://casadeljaguariquitos.com',
  trailingSlash: 'always',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/es' && !path.startsWith('/es/');
      },
      serialize(item) {
        const slug = new URL(item.url).pathname.replace(/\/$/, '').split('/').pop();
        item.lastmod = (slug && POST_DATES[slug]) || BUILD_DATE;
        return item;
      },
      i18n: {
        defaultLocale: 'es',
        locales: {
          es: 'es',
          en: 'en',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'es',
    locales: ['es', 'en'],
    routing: {
      prefixDefaultLocale: false,
      fallbackType: 'redirect'
    }
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        '@': path.resolve(__dirname, './src'),
        '@/components': path.resolve(__dirname, './src/components'),
        '@/layouts': path.resolve(__dirname, './src/layouts'),
        '@/pages': path.resolve(__dirname, './src/pages'),
        '@/i18n': path.resolve(__dirname, './src/i18n'),
        '@/styles': path.resolve(__dirname, './src/styles')
      }
    }
  }
});