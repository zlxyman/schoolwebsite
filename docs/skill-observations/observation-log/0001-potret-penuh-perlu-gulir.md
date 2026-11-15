---
id: 1
title: "Potret halaman penuh menipu kalau halaman tidak digulir dulu (gambar lazy dan animasi reveal tampil kosong)"
status: open
type: open-source
skill: []
proposes_skill: []
target_file: ["CLAUDE.md"]
siblings_checked: "none"
area: "Cara kerja: verifikasi dengan Playwright"
date: 2026-11-15
session_context: "Perbaikan preschool, primary, dan kampus-bandung; verifikasi potret 375px"
parked_until:
resolved:
resolution:
reference: "tools/potret-halaman.js"
commands_verified: "run - node tools/potret-halaman.js (gulir dulu) menghasilkan potret lengkap; potret tanpa gulir menampilkan bagian kosong"
next_actor:
use_evidence:
escalated:
---

**Issue:** Potret halaman penuh (fullPage) tanpa menggulir menampilkan kotak kosong pada gambar `loading="lazy"` dan bagian dengan animasi muncul saat digulir. Di kampus-bandung.html tiga perempat halaman tampak kosong, padahal halamannya benar. Ini hampir dibaca sebagai halaman rusak.

**Suggested improvement:** Di CLAUDE.md bagian "Cara kerja", poin verifikasi Playwright: tambahkan bahwa potret memakai `tools/potret-halaman.js` yang menggulir halaman dulu sebelum memotret.

**Principle:** Sebelum memotret halaman penuh untuk verifikasi, gulir halaman sampai bawah supaya konten yang dimuat saat terlihat ikut tampil. Potret kosong adalah temuan tentang alat potret sampai terbukti sebaliknya.
