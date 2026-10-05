/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#F7F2EA",
        creamcard: "#FFFDF9",
        ink: "#4A4238",
        inksoft: "#8A8074",
        tabAll: "#4E6373",
        tabShop: "#E28B90",
        tabGame: "#7FA98E",
        tabCustom: "#E7B96B",
        chipAll: "#DCE6EA",
        chipShop: "#F7DADC",
        chipGame: "#DCEAE0",
        chipCustom: "#F6E4C2",
      },
      borderRadius: {
        xl2: "1.25rem",
        xl3: "1.75rem",
      },
      fontFamily: {
        sans: ["'Noto Sans TC'", "'Hiragino Sans'", "system-ui", "sans-serif"],
      },
      boxShadow: {
        soft: "0 2px 10px rgba(74,66,56,0.06)",
        card: "0 4px 16px rgba(74,66,56,0.08)",
      },
    },
  },
  plugins: [],
}
