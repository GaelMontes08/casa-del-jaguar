/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#F2E8D5',   // Very light cream/beige
          100: '#F2CF8D',  // Light golden yellow
          400: '#D99D55',  // Medium golden brown
          500: '#F2AB27',  // Bright golden yellow (main brand color)
          900: '#402A1E',  // Dark brown
        },
        brand: {
          cream: '#F2E8D5',
          light: '#F2CF8D',
          gold: '#F2AB27',
          brown: '#D99D55',
          dark: '#402A1E',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
