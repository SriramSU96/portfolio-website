/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wine:    '#6B1A2A',
        maroon:  '#3D0C16',
        crimson: '#8B2035',
        rose:    '#C4526A',
        cream:   '#D4C5BA',
        'off-white': '#F8F4F0',
        dark:    '#0E0608',
        darker:  '#080305',
        surface: '#140A0C',
        card:    '#1A0D10',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body:    ['"Raleway"', 'sans-serif'],
        mono:    ['"DM Mono"', 'monospace'],
      },
      backgroundImage: {
        'gradient-wine': 'linear-gradient(135deg, #3D0C16, #6B1A2A, #8B2035)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [],
}
