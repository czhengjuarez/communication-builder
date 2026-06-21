/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary:    '#80074D',
        secondary:  '#A60E64',
        'dark-bg':  '#0B0810',
        gray: {
          50:  '#F6F3F6',
          100: '#ECE7EC',
          200: '#DCD4DC',
          300: '#BDB2BD',
          400: '#958997',
          500: '#6E626F',
          600: '#504551',
          700: '#352D37',
          800: '#211B23',
          900: '#14101A',
          950: '#0B0810',
        },
      },
      fontFamily: {
        display: ['Space Grotesk', 'Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        sans:    ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono:    ['JetBrains Mono', 'ui-monospace', 'SF Mono', 'Menlo', 'monospace'],
      },
      fontSize: {
        xs:    ['0.75rem',   { lineHeight: '1.15' }],  // of-text-xs   12px
        sm:    ['0.8125rem', { lineHeight: '1.3'  }],  // of-text-sm   13px
        base:  ['0.9375rem', { lineHeight: '1.55' }],  // of-text-base 15px
        md:    ['1rem',      { lineHeight: '1.55' }],  // of-text-md   16px
        lg:    ['1.125rem',  { lineHeight: '1.55' }],  // of-text-lg   18px
        xl:    ['1.375rem',  { lineHeight: '1.3'  }],  // of-text-xl   22px
        '2xl': ['1.75rem',   { lineHeight: '1.15' }],  // of-text-2xl  28px
        '3xl': ['2.25rem',   { lineHeight: '1.15' }],  // of-text-3xl  36px
        '4xl': ['3rem',      { lineHeight: '1.15' }],  // of-text-4xl  48px
        '5xl': ['4rem',      { lineHeight: '1.15' }],  // of-text-5xl  64px
      },
      borderRadius: {
        sm:    '6px',
        md:    '10px',
        lg:    '14px',
        xl:    '20px',
        '2xl': '28px',
      },
      boxShadow: {
        brand: '0 12px 32px rgba(128, 7, 77, 0.24)',
        sm:    '0 2px 4px rgba(30, 10, 20, 0.06), 0 1px 2px rgba(30, 10, 20, 0.04)',
        md:    '0 6px 16px rgba(30, 10, 20, 0.08), 0 2px 4px rgba(30, 10, 20, 0.05)',
        lg:    '0 18px 40px rgba(30, 10, 20, 0.12), 0 4px 8px rgba(30, 10, 20, 0.06)',
      },
    },
  },
  plugins: [],
}
