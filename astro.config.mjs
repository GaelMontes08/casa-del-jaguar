import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';
import vercel from '@astrojs/vercel';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

export default defineConfig({
  output: 'server',
  adapter: vercel(),
  site: 'https://casadeljaguariquitos.com',
  integrations: [
    sitemap({
      filter: (page) => {
        const path = new URL(page).pathname;
        return path !== '/es' && !path.startsWith('/es/');
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