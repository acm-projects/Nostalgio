
// tailwind.config.js

const { iconsPlugin, getIconCollections } = require("@egoist/tailwindcss-icons");
const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import{'tailwindcss'}.Config} */
module.exports = {
    content: ["./App.{js,jsx,ts,tsx}", "./Nostalgio/**/*.{js,jsx,ts,tsx}", './src/*.html'],
    assets: ['./assets/fonts'], 
    theme: {
      extend: {},
    },
    plugins: [
    // Iconify plugin, requires writing list of icon sets to load
    addIconSelectors(['solar']),
  ],
  }