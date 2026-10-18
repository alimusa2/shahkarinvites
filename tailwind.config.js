/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          main: '#0B0D0A',
          secondary: '#11140F',
          card: '#101A13',
          emerald: '#0D2419',
          'emerald-dark': '#07160F',
          'emerald-light': '#143324',
        },
        gold: {
          champagne: '#D6B777',
          muted: '#A98A4F',
          light: '#F3E5AB',
          border: 'rgba(214, 183, 119, 0.25)',
          'border-strong': 'rgba(214, 183, 119, 0.45)',
          glow: 'rgba(214, 183, 119, 0.15)',
        },
        ivory: {
          DEFAULT: '#F5F0E6',
          muted: '#E6DFC8',
          dark: '#D4CBB5',
        },
        text: {
          primary: '#F5F0E6',
          secondary: '#B8B4AA',
          muted: '#827E74',
        }
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Playfair Display', 'Georgia', 'serif'],
        display: ['"Cormorant Garamond"', 'Playfair Display', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        arabic: ['"Amiri"', '"Scheherazade New"', 'serif'],
      },
      boxShadow: {
        'gold-sm': '0 2px 10px rgba(214, 183, 119, 0.12)',
        'gold-md': '0 4px 20px rgba(214, 183, 119, 0.18)',
        'gold-lg': '0 10px 40px rgba(214, 183, 119, 0.25)',
        'phone-mockup': '0 25px 60px -15px rgba(0, 0, 0, 0.8), 0 0 30px rgba(214, 183, 119, 0.15)',
        'envelope': '0 20px 50px rgba(0,0,0,0.7), 0 0 40px rgba(13, 36, 25, 0.6)',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.85' },
        }
      },
      animation: {
        float: 'float 5s ease-in-out infinite',
        shimmer: 'shimmer 6s linear infinite',
        pulseGlow: 'pulseGlow 3s ease-in-out infinite',
      }
    },
  },
  plugins: [],
}
