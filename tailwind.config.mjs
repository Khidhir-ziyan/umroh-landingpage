/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        paper: '#fbfaf7',
        cream: '#f3efe7',
        ink: '#1e211e',
        muted: '#6f746e',
        line: '#ded8cc',
        gold: '#b99245',
        'gold-deep': '#8f6b2e',
        'gold-soft': '#eadcbb',
        green: '#27483f',
        'green-deep': '#1c332d',
      },
      fontFamily: {
        sans: ['DM Sans', 'Arial', 'sans-serif'],
        serif: ['Playfair Display', 'Georgia', 'serif'],
      },
      boxShadow: {
        editorial: '0 22px 70px rgba(39, 31, 17, .10)',
      },
    },
  },
  plugins: [],
};
