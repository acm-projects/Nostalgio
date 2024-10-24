/** @type {import('tailwindcss').Config} */
const { addIconSelectors } = require('@iconify/tailwind');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/*.html'],
  plugins: [
    // Iconify plugin, requires writing list of icon sets to load
    addIconSelectors(['solar']),
  ],
};