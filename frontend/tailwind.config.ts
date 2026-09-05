import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F0F5FF',
          100: '#E0EAFF',
          200: '#C7D7FE',
          300: '#A4BCFD',
          400: '#7A9AFA',
          500: '#4F6BF6',
          600: '#3548E5',
          700: '#2A36C7',
          800: '#242D9F',
          900: '#1E257E',
          950: '#0F1242',
        },
        navy: {
          800: '#1E293B',
          900: '#0F172A',
          950: '#0A0E1A',
        },
        stet: {
          light: '#EEF2FF',
          DEFAULT: '#4F46E5',
          dark: '#3730A3',
        },
        bpsc: {
          light: '#F0FDF4',
          DEFAULT: '#16A34A',
          dark: '#166534',
        }
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px 0 rgba(0, 0, 0, 0.03)',
        'card': '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -1px rgba(0, 0, 0, 0.03)',
        'elevated': '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -2px rgba(0, 0, 0, 0.03)',
      }
    },
  },
  plugins: [],
};
export default config;
