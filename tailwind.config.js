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
          light: '#F2E8D5',    // Light cream
          accent: '#F2CF8D',   // Light golden yellow
          primary: '#F2AB27',  // Main golden yellow
          secondary: '#D99D55', // Golden brown
          dark: '#402A1E',     // Dark brown
        }
      },
      fontFamily: {
        sans: ['gotham', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        serif: ['Georgia', 'serif'],
        gotham: ['gotham', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        georgia: ['Georgia', 'serif'],
      },
    },
  },
  plugins: [],
}
