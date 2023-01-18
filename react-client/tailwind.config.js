/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  // darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      margin: {
        df: "441.5px",
      },
      width: {
        fullx2: "200vw",
      },
    },
  },
  variants: {},
  plugins: [require("tw-elements/dist/plugin")],
};
