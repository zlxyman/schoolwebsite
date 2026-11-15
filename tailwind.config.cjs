/*
 * Konfigurasi build Tailwind (CSS statis untuk produksi).
 * Tema diambil dari public/js/tailwind-config.js supaya warna brand hanya
 * didefinisikan di satu tempat.
 *   npm run build:css   -> membuat public/css/tailwind.css
 *   npm run watch:css   -> membuat ulang otomatis saat file berubah
 */
const fs = require('fs');
const path = require('path');
const vm = require('vm');

const sandbox = { tailwind: {} };
vm.runInNewContext(
  fs.readFileSync(path.join(__dirname, 'public/js/tailwind-config.js'), 'utf8'),
  sandbox
);

module.exports = {
  content: [
    './public/*.html',
    './public/js/*.js',
  ],
  ...sandbox.tailwind.config,
};
