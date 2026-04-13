export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f3e8ff",
          500: "#a855f7",
          600: "#9333ea",
          700: "#7e22ce",
        },
        secondary: {
          500: "#3b82f6",
          600: "#2563eb",
        },
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(135deg, #a855f7 0%, #3b82f6 100%)",
      },
    },
  },
  plugins: [],
}
