/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        primary: {
          800: '#081C15',
          700: '#1B4332',
          600: '#2D6A4F',
          500: '#40916C',
          400: '#52B788',
          300: '#74C69D',
          200: '#95D5B2',
          100: '#B7E4C7',
          50: '#D8F3DC',
          DEFAULT: '#40916C',
          foreground: 'hsl(var(--primary-foreground))',
        },
        bluey: {
          DEFAULT: '#0d47a1',
          900: '#030e20',
          800: '#051d40',
          700: '#082b60',
          600: '#0a3a80',
          500: '#0d47a1',
          400: '#1264df',
          300: '#4489f0',
          200: '#82b0f5',
          100: '#c1d8fa',
        },
        grey: {
          DEFAULT: '#212529',
          50: '#f7f7f7',
          100: '#edecec',
          200: '#dfdede',
          300: '#c8c8c8',
          400: '#aeadad',
          500: '#999898',
          600: '#898787',
          700: '#7b7a7a',
          800: '#676666',
          900: '#545454',
          950: '#363535',
        },
        black: '#000000',
        white: '#FFFFFF',

        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

