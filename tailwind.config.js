/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: { extend: {
    colors: { bgMain: '#FBF8F3', borderLight: '#EFECE6', textDark: '#383531', textMuted: '#8C857B', brandPrimary: '#4D6273',
      catFinance: { DEFAULT: '#5B82A6', bg: '#EEF4F8' }, catShop: { DEFAULT: '#D9727B', bg: '#FDF2F3' },
      catGame: { DEFAULT: '#6E9C85', bg: '#F0F6F3' }, catCustom: { DEFAULT: '#D49D42', bg: '#FCF8ED' } },
    borderRadius: { '2xl': '18px', '3xl': '24px' },
    boxShadow: { card: '0 2px 10px rgba(100,90,80,.06)' } } },
  plugins: [],
}
