# Website Sekolah Terpadu Sedaya Bintang

Website statis: HTML + Tailwind CSS (CDN) + JavaScript biasa. Tanpa framework, tanpa build. Semua halaman ada di folder `public/`.

## Cara kerja
- Pemilik website awam IT. Jelaskan hasil kerja dengan bahasa sederhana, singkat, langkah demi langkah.
- Setelah selesai mengubah, commit lalu push ke branch `main`. Tulis pesan commit dalam Bahasa Indonesia yang jelas (contoh: "Ubah teks hero halaman Tribahasa").
- Jangan ubah hero "Menjadi Sang Bintang di Masa Depan" di `public/index.html`. Sudah final.
- Jangan pakai underscore (_) pada nama file atau folder baru.
- Preview: pemilik membuka `public/index.html` dengan Live Server di VS Code (alamat http://127.0.0.1:5500). Server Node (`server.js`) hanya untuk Cloud Run.

## Pola setiap halaman
- Path di dalam HTML relatif tanpa awalan `public/` (contoh: `js/app.js`, `css/style.css`, `assets/images/...`).
- Urutan `<head>`: Tailwind CDN, Google Fonts Plus Jakarta Sans, FontAwesome 6.4.0, `js/tailwind-config.js`, `css/style.css`, lalu CSS khusus halaman bila ada.
- `<body id="top" data-page="...">`. Atribut `data-page` dipakai `js/components.js` untuk menandai menu aktif.
- Navbar dan footer tidak ditulis di HTML. Cukup `<div id="app-navbar"></div>` dan `<div id="app-footer"></div>`.
- Penutup body: `js/components.js` lalu `js/app.js`.
- Section memakai class `.reveal`. Class bersama di `style.css`: `.reveal`, `.feature-card`, `.icon-circle`, `.hover-lift`, `.animate-float`. CSS khusus halaman hanya untuk yang belum ada di `style.css`.
- Tanpa `<style>` dan `<script>` inline.
- Halaman pilar ditutup section "Sinergi Pembelajaran ACT".
- Gambar dan video disimpan di `public/assets/images/`. Jangan tarik aset dari situs luar.

## Warna dan font
- primary #1d4486, yellow #ffcb05, red #d2232a, blue #eaf1fb, gray #f9fafb, dark #0f2447
- Font: Plus Jakarta Sans

## Gaya bahasa materi sekolah
- Natural, tidak lebay, tidak berlebihan.
- 3 USP: Budi Pekerti, Trilingual (urutan: Indonesia, Inggris, Mandarin), STEAM. Kerangka ACT: Attitude, Communication, Thinking.
- Jangan pakai kata "Klasik", "Tionghoa", "Kuno", "Zaman". Pakai "Hanzi Budi Pekerti".
- Jangan pakai sapaan "si kecil".
