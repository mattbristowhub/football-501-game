/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Football pitch greens
        pitch: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        // Darts board colors
        dartboard: {
          red: '#dc2626',
          green: '#16a34a',
          black: '#171717',
          cream: '#fef3c7',
          gold: '#fbbf24',
        },
        // Football elements
        football: {
          field: '#15803d',
          line: '#ffffff',
          sky: '#3b82f6',
        }
      },
      backgroundImage: {
        'pitch-pattern': "linear-gradient(90deg, rgba(22,163,74,0.1) 1px, transparent 1px), linear-gradient(rgba(22,163,74,0.1) 1px, transparent 1px)",
        'dartboard-radial': 'radial-gradient(circle, #171717 0%, #0a0a0a 100%)',
      },
      boxShadow: {
        'pitch': '0 10px 40px -10px rgba(22, 163, 74, 0.4)',
        'dartboard': '0 10px 40px -10px rgba(220, 38, 38, 0.4)',
        'glow-green': '0 0 20px rgba(34, 197, 94, 0.5)',
        'glow-red': '0 0 20px rgba(220, 38, 38, 0.5)',
        'glow-gold': '0 0 20px rgba(251, 191, 36, 0.5)',
      },
    },
  },
  plugins: [],
}
