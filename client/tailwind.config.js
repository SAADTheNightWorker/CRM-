/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#007bff", // Your primary color
      },
      fontFamily: {
        inter: ["Inter", "sans-serif"],
      },
      backgroundImage: {
        "hero-pattern": "url('./public/logo-png/1.png')", // Custom background image
      },
    },
  },
  plugins: [require("tailwind-scrollbar")],
};
