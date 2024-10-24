// tailwind.config.js

const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");

/** @type {import{'tailwindcss'}.Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./Nostalgio/**/*.{js,jsx,ts,tsx}"],
    assets: ['./assets/fonts'],
    theme: {
      extend: {},
    },
    plugins: [],
  }