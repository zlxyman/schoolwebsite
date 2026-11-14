# Audit Kode — Website Sekolah Terpadu Sedaya Bintang

Tanggal audit: 14 November 2026.
Yang diaudit: seluruh isi `public/` (19 halaman HTML, 15 file JS, 10 file CSS), `server.js`,
`package.json`, `.vscode/`, dan riwayat git. Nomor baris mengacu ke kondisi awal (commit `85a9ecd`),
sebelum perbaikan.

Kolom **Status** diisi setelah perbaikan di branch `claude/busy-maxwell-o402pl`:
✅ sudah diperbaiki · 🟡 diperbaiki sebagian · ⏳ menunggu data/keputusan pemilik · 🔧 tugas tim IT saat hosting.

---

## 1. Standar yang dipakai (sudah dicek ulang di web pada 14 Nov 2026)

| Bidang | Standar | Versi terbaru saat audit |
|---|---|---|
| Keamanan aplikasi web | OWASP Top 10 | **2025** (masih yang terbaru) |
| Verifikasi keamanan | OWASP ASVS | **5.0.0** (rilis 30 Mei 2025; 5.0.1 belum terbit) |
| Header HTTP | Mozilla HTTP Observatory / MDN Web Security | panduan berjalan |
| Aksesibilitas | WCAG | **2.2 level AA** (Rekomendasi W3C, pembaruan 12 Des 2024). WCAG 3.0 masih draft, tidak dipakai |
| Kualitas dan performa | Google Lighthouse, Core Web Vitals | panduan berjalan |
| Validasi HTML | Standar HTML (WHATWG) | lihat keterbatasan di bawah |

Kategori OWASP Top 10:2025 yang dirujuk: A01 Broken Access Control, A02 Security Misconfiguration,
A03 Software Supply Chain Failures, A04 Cryptographic Failures, A05 Injection, A06 Insecure Design,
A08 Software or Data Integrity Failures, A10 Mishandling of Exceptional Conditions.

### Cara audit
1. Membaca semua file baris per baris.
2. Cek otomatis di browser sungguhan (Chromium lewat Playwright) pada lebar 375, 768, dan 1440 px:
   error di console, permintaan yang gagal, gulir ke samping, gambar rusak, ukuran teks, ukuran area sentuh.
3. Cek aksesibilitas otomatis dengan axe-core 4.14 (aturan WCAG 2.0, 2.1, 2.2 level A dan AA).
4. Validasi HTML dengan html-validate 9.7.
5. `npm audit`, pindai rahasia di seluruh riwayat git, dan cek versi semua pustaka dari CDN.
6. Audit teknis UI memakai skill impeccable (5 dimensi).

### Keterbatasan (jujur apa adanya)
- Lingkungan kerja tidak bisa mengakses `validator.w3.org`, `cdn.tailwindcss.com`, `cdnjs`, dan `unpkg`.
  Validasi HTML memakai html-validate (aturannya mengikuti standar HTML yang sama), bukan validator W3C daring.
  Tampilan "sebelum" direkam dengan tiruan lokal dari CDN yang diblokir.
- Lighthouse belum dijalankan terhadap link preview (lihat `docs/laporan-perbaikan.md` bagian yang perlu dicek manual).
- Cek otomatis hanya menangkap sebagian masalah aksesibilitas. Tes dengan pembaca layar (TalkBack/VoiceOver)
  di HP asli tetap perlu.

---

## 2. Skor audit teknis UI (skill impeccable, skala 0–4)

| # | Dimensi | Sebelum | Temuan kunci (sebelum) |
|---|---|---|---|
| 1 | Aksesibilitas | 1 | 406 pelanggaran axe; menu utama tidak bisa dipakai lewat keyboard; 42 gambar tanpa alt |
| 2 | Performa | 1 | Tailwind dikompilasi di browser; 6,6 MB video dimuat di beranda HP; gambar tanpa lazy-load |
| 3 | Tema | 2 | Warna brand ada, tapi halaman game memakai warna dan font sendiri |
| 4 | Responsif | 2 | 3 halaman game bisa digulir ke samping; ratusan teks di bawah 12 px; tombol melayang menutupi isi |
| 5 | Integritas implementasi | 1 | Formulir beranda tidak mengirim data; 22 tautan mati; data contoh tampil sebagai fakta |
| | **Total** | **7/20 (Poor)** | |

Skor sesudah perbaikan ada di bagian 6.

---

## 3. Temuan sistemik (berlaku di banyak file)

### 3.1 Keamanan

| ID | Tingkat | Standar | Temuan | Cara memperbaiki | Status |
|---|---|---|---|---|---|
| K-01 | Tinggi | A03:2025, A08:2025, ASVS V3.6.1 | Tailwind dimuat dari `cdn.tailwindcss.com` tanpa versi dan tanpa SRI di semua 19 halaman. Skrip pihak ketiga ini bisa berubah kapan saja dan berjalan penuh di halaman. | Ganti dengan CSS statis hasil build (`public/css/tailwind.css`). | |
| K-02 | Sedang | A03:2025, ASVS V3.6.1 | FontAwesome 6.4.0 dari cdnjs tanpa `integrity`/`crossorigin` (19 halaman). Google Fonts tidak bisa diberi SRI. | Simpan lokal di `assets/vendor/` dan `assets/fonts/`. | |
| K-03 | Sedang | A03:2025, ASVS V3.6.1 | Mini game: `hanzi-writer@3.5` (versi tidak dikunci) dari jsdelivr, `three@0.160.0` dari unpkg, data karakter diunduh saat main, suara dari `assets.mixkit.co`, tekstur dari `raw.githubusercontent.com/mrdoob`. Semua tanpa SRI. | Simpan lokal; suara dibuat di browser. | |
| K-04 | Sedang | A02:2025, aturan aset CLAUDE.md | 60 lebih rujukan gambar ke domain luar: emoji `raw.githubusercontent.com/Tarikul-Islam-Anik`, `placehold.co`, `images.unsplash.com`, `images.pexels.com`, `transparenttextures.com`, `drive.google.com`, video `w3schools.com`. Pemilik domain itu bisa mengganti isinya dan bisa mencatat pengunjung. | Semua gambar lokal. | |
| K-05 | Sedang | A01:2025 (tabnabbing), aturan CLAUDE.md | 24 tautan `target="_blank"` tanpa `rel="noopener noreferrer"` (about, admissions, kurikulum, preschool, primary). `window.open` tanpa `noopener` di `apply.js:100` dan `school-visit.js:105`. | Tambah `rel`; `window.open(url, '_blank', 'noopener,noreferrer')`. | |
| K-06 | Sedang | A02:2025, ASVS V3.4.3, Mozilla Observatory (CSP) | 130 atribut handler inline (`onclick`, `onerror`, `onsubmit`, `onmouseenter`), 60 atribut `style`, dan 3 `<script>` inline. Ini memaksa CSP memakai `'unsafe-inline'`, sehingga CSP tidak melindungi dari XSS. | Pindahkan ke file JS dengan event listener; gaya ke kelas CSS. | |
| K-07 | Sedang | A02:2025, ASVS V3.4.1, V3.4.3–V3.4.6, Mozilla Observatory | Tidak ada header keamanan (CSP, HSTS, `X-Content-Type-Options`, `Referrer-Policy`, `frame-ancestors`, `Permissions-Policy`) di `server.js` maupun konfigurasi hosting. `x-powered-by: Express` terbuka (ASVS V13.4). | Tambah `public/_headers` (Cloudflare Pages), header di `server.js`, contoh untuk IT di `docs/serah-terima-it.md`. | |
| K-08 | Rendah | A03:2025, ASVS V15.2 | `package.json` tanpa lockfile; `express ^4.19.2` (versi 4.19.2 punya celah yang sudah ditambal di 4.20–4.21). `npm audit` saat ini: 0 celah (terpasang 4.22.3). | Naikkan batas bawah dan commit `package-lock.json`. | |
| K-09 | Rendah | A06:2025, ASVS V14.2.1 | Formulir `apply.html` dan `school-visit.html` mengirim nama anak, tanggal lahir, dan nomor HP lewat URL `wa.me?text=...`. Ini pola yang sudah disetujui pemilik (data hanya menuju WhatsApp admisi), tetapi data pribadi lewat URL pihak ketiga. | Diterima. Tambah keterangan singkat di formulir bahwa data dikirim lewat WhatsApp. Kebijakan privasi perlu dibuat pemilik. | |
| K-10 | Info | A05:2025, ASVS V1.2 | `innerHTML` dipakai di `components.js`, `app.js`, `steam.js`, `prestasi.js`, game. Semua isinya data statis di dalam kode, bukan masukan pengguna. Masukan formulir dikodekan dengan `encodeURIComponent`. | Aman selama data tetap statis. Dicatat untuk IT: jangan masukkan data dari pengguna/CMS lewat `innerHTML`. | |
| K-11 | Info | Rahasia | Pindai seluruh repo dan riwayat git: **tidak ada** API key, token, password, atau URL Apps Script. Hanya satu tautan file Google Drive publik di `app.js:312` (bukan rahasia, tapi domain luar). | Hapus tautan Drive. | |
| K-12 | Rendah | A10:2025 | `components.js:9,185,279`: `onerror` mengganti logo ke `placehold.co`. Kalau `placehold.co` tidak bisa diakses (diblokir jaringan sekolah/adblock), `onerror` terpicu terus-menerus (permintaan berulang tanpa henti). File logo `logo-horizontal-sekolah.png` sendiri **tidak ada**, jadi error 404 muncul di console setiap halaman. | Hapus fallback luar; pakai logo lokal + teks cadangan. | |

### 3.2 Aksesibilitas (WCAG 2.2 AA)

| ID | Tingkat | Kriteria | Temuan | Cara memperbaiki | Status |
|---|---|---|---|---|---|
| A-01 | Tinggi | 2.1.1 Keyboard, 4.1.2 | Menu utama desktop (`components.js:15-158`) berupa `<div>` yang hanya terbuka saat disorot mouse. Pengguna keyboard tidak bisa membuka submenu sama sekali. | Jadikan `<button aria-expanded>`; buka dengan klik, Enter, dan fokus; tutup dengan Escape. | |
| A-02 | Tinggi | 2.1.1, 4.1.2 | 70 lebih elemen `<div onclick>` yang tidak bisa difokus: kartu 10 Nilai Moral, kartu fasilitas (lightbox), kartu testimoni, bingkai film prestasi, kartu tanggal kunjungan, kartu lowongan. | Jadikan tombol sungguhan atau beri `role="button"`, `tabindex="0"`, dan dukungan Enter/Spasi. | |
| A-03 | Tinggi | 1.1.1 | 42 gambar tanpa `alt` (about, preschool, tribahasa, prestasi); banyak `alt` berbahasa Inggris atau generik ("Avatar", "Corner 1", "Campus Building"). | `alt` bahasa Indonesia yang menjelaskan isi; gambar hiasan `alt=""`. | |
| A-04 | Tinggi | 4.1.2, 2.4.4 | 111 tautan dan 49 tombol tanpa nama (ikon saja): sosmed footer, tombol tutup, titik slider, panah, tombol arah game. | `aria-label` bahasa Indonesia. | |
| A-05 | Tinggi | 1.3.1, 3.3.2, 4.1.2 | Formulir beranda: `<label>` tidak terhubung ke `<input>`. Formulir school visit: tanpa `<label>` (hanya placeholder). Checklist dokumen memakai `display:none` pada checkbox. | Hubungkan `for`/`id`; label terlihat; checkbox `sr-only` + cincin fokus. | |
| A-06 | Sedang | 1.4.3 | 142 elemen dengan kontras kurang (teks abu `text-gray-400` di latar putih, teks kuning di putih, teks putih transparan). | Naikkan ke warna yang lulus 4,5:1. | |
| A-07 | Sedang | 2.4.7, 2.4.11 | `focus:outline-none` di banyak tombol tanpa pengganti; tidak ada gaya `:focus-visible` global. | Cincin fokus global di `style.css`. | |
| A-08 | Sedang | 1.4.4, 1.4.10 | `user-scalable=no, maximum-scale=1.0` di tribahasa dan 4 halaman game: pengguna tidak bisa memperbesar. | Hapus larangan zoom. | |
| A-09 | Sedang | 2.2.2, 2.3.3 | Slider otomatis (beranda 6 detik, sambutan kepala sekolah 4,5 detik) tanpa cara menghentikan. Tidak ada dukungan `prefers-reduced-motion` di seluruh CSS; puluhan animasi berjalan terus. | Jeda saat disorot/difokus; aturan reduced-motion global. | |
| A-10 | Sedang | 2.5.8 Target Size, standar CLAUDE.md (44 px) | Titik slider 8–10 px, tombol "Learn More" 14 px, ikon sosmed 32 px, tombol tutup 32–40 px. | Minimal 44 px untuk kontrol utama, 24 px mutlak. | |
| A-11 | Sedang | 4.1.2, 2.4.3 | Semua modal (10 buah) tanpa `role="dialog"`, `aria-modal`, pengelolaan fokus, dan label. | Tambah peran, label, fokus pindah ke modal lalu kembali, tutup dengan Escape. | |
| A-12 | Rendah | 1.4.1 | Game kosakata: jawaban benar/salah hanya dibedakan warna. | Tambah ikon dan teks. | |
| A-13 | Rendah | 4.1.2, 2.4.1 | `iframe` tanpa `title` (budi-pekerti, tribahasa); tidak ada tautan "lewati ke isi". | Tambah `title`; tambah skip link. | |

### 3.3 Rasio gambar dan tampilan

| ID | Tingkat | Aturan | Temuan | Cara memperbaiki | Status |
|---|---|---|---|---|---|
| R-01 | Tinggi | Aturan rasio CLAUDE.md | Rasio berganti per layar: `about.html:201`, `fasilitas.html:67`, 8 kartu `fasilitas.html:146-257`, `preschool.html:155,188,446`. | Satu kelas rasio tetap. | |
| R-02 | Tinggi | Aturan rasio CLAUDE.md | Tinggi tetap pada wadah gambar: `kurikulum.html:66,180,201,282,300-302`, `budi-pekerti.html:112`, `steam.html:214-274`, `preschool.html:292-333,359`, `primary.html:313-337,383-410`, `karir.html:116-138`, `school-visit.html:259`, `tribahasa.html:129`. | `aspect-[...]` + `object-cover` + `w-full`. | |
| R-03 | Sedang | Aturan kartu Jenjang | Kartu Jenjang 1:1 sudah benar, tetapi pita foto memakai `h-[32.5%]` + `style` (rasio 20:6,5). Aturan: 20:7. | `aspect-[20/7]`, tanpa `style`. Animasi `.webm` dijaga. | |
| R-04 | Tinggi | Standar UI/UX (tombol melayang) | Tombol "Akses Cepat" di HP berupa pil lebar bertulisan yang menutupi judul dan isi. | Di HP: ikon bulat 56 px tanpa teks. | |
| R-05 | Sedang | Standar UI/UX (teks 16 px) | Ratusan teks 6–11 px di HP (contoh kartu Jenjang 6–8 px, kartu Core Values 10 px). Beranda: 40 teks di bawah 12 px. | Minimal 12 px untuk label, 14–16 px untuk isi. | |
| R-06 | Sedang | Tanpa gulir samping | `games.html`, `hanzi-minigame.html`, `vocab-minigame.html` melebar 38 px di layar 375 px. | Perbaiki lebar elemen hias. | |
| R-07 | Rendah | Aset | `prestasi-siswa.html:493,637` merujuk `assets/images/kelas-smart-board.jpg` yang tidak ada (gambar rusak). `games.html:54` dan tautan emoji "Artist Palette" salah alamat (gambar rusak). | Ganti rujukan. | |

### 3.4 Performa

| ID | Tingkat | Standar | Temuan | Cara memperbaiki | Status |
|---|---|---|---|---|---|
| P-01 | Tinggi | Lighthouse (render-blocking, TBT) | Tailwind Play CDN mengompilasi CSS di browser pada setiap kunjungan (skrip ±350 KB + waktu kompilasi; halaman sempat tampil tanpa gaya). | CSS statis ±100 KB, sekali unduh lalu tersimpan di cache. | |
| P-02 | Tinggi | Core Web Vitals (LCP), hemat kuota | Beranda memuat 2 video karakter `preload="auto"` (3,5 MB + 3,0 MB) walau di HP animasi hover tidak pernah diputar. | Poster (bingkai pertama) + video dimuat hanya di perangkat ber-mouse saat kartu terlihat. | |
| P-03 | Sedang | Lighthouse (image formats, CLS) | 49 gambar JPG (3,7 MB), tanpa `width`/`height` (229 gambar tanpa ukuran → layout bergeser), tanpa `loading="lazy"`. Bendera 1080 px untuk tampilan 140 px. | WebP, atribut ukuran, lazy-load, bendera 320 px. | |
| P-04 | Rendah | Lighthouse | `scroll` listener tanpa `passive` dan tanpa pembatasan (`app.js:80,283,614`). | IntersectionObserver / `passive`. | |
| P-05 | Rendah | Cache | `server.js` mematikan cache untuk semua file. | Cache panjang untuk aset, pendek untuk HTML (diatur IT/hosting). | |

### 3.5 Bahasa dan isi (acuan `docs/gaya-bahasa.md`)

| ID | Tingkat | Temuan | Status |
|---|---|---|---|
| B-01 | Tinggi | Kata "Hanzi" (德行) menempel pada Budi Pekerti: `about.html:243`, `budi-pekerti.html:43`. | |
| B-02 | Tinggi | Urutan Trilingual salah (Indonesia, Inggris, Mandarin): `index.html:283`, `about.html:264`, `kampus-bandung.html:337`, `tribahasa.html:32-52,67,165-199`. | |
| B-03 | Tinggi | Atribusi salah "Framework Singapura Dr. Yeap Ban Har": `index.html:299`, `kampus-bandung.html:356`, `kurikulum.html:208,239-240`, `primary.html:229`, `steam.html:176`, `steam.js:99`, `about.html:283`. | |
| B-04 | Tinggi | "Sinergi ...": `tribahasa.html:335`, `budi-pekerti.html:370`, `steam.html:504` (juga salah menulis ACT sebagai "Thinking, Attitude & Compassion"). | |
| B-05 | Tinggi | Proses internal pendaftaran: `admissions.html:71-206` (beli formulir, Letter of Offering, commitment fee, pelunasan), `index.html:598`. | |
| B-06 | Sedang | "Kompetensi Inti ACT" (`about.html:215`), "Pilar" (about, kurikulum, budi-pekerti, steam, preschool, primary), "siswa" (`components.js:29,204,356,363`, `about.html:164`, `kampus-bandung.html:245,270`, `prestasi-siswa.html:676`, `apply.html` judul). | |
| B-07 | Sedang | Sebutan "event" dan tanda seru: `index.html:96-97` ("JOIN EVENT KAMI SEKARANG!"). | |
| B-08 | Sedang | Kata di daftar hitam: holistik, komprehensif, modern, unggulan, bermakna, esensi, senantiasa, guna, maksimal, menghadirkan, berbasis, proyek, luar biasa, peserta didik, KBM, Jelajahi, "Bergabung Bersama Kami", berkarakter mulia. | |
| B-09 | Sedang | 10 Nilai Moral dan Di Zi Gui ditulis seolah satu hal: `about.html:245`, `budi-pekerti.html:48`, `preschool.html:55,262`, `primary.html:367`. | |
| B-10 | Sedang | Sub judul lebih dari 8 kata di hampir semua halaman. | |
| B-11 | Tinggi | Data contoh tampil sebagai fakta: testimoni dan nama orang tua (`index.html:469-558`), 8 prestasi dan nama murid (`prestasi.js:15-113`), nama kepala sekolah (`app.js:618-639`), nomor telepon `1234 5678` dan alamat Kampus Bogor (`components.js:302-309`), tanggal acara yang sudah lewat (`index.html:106-164`, `school-visit.html:165-193`), video YouTube contoh (`app.js:586`), video dari w3schools (`index.html:453`). | |
| B-12 | Sedang | Jenjang SMP dan SMA ditampilkan (kartu "SOON" di beranda, menu, footer, lowongan guru SMP/SMA). Sesuai aturan, tidak dihapus; menunggu keputusan pemilik. | |
| B-13 | Sedang | Fakta usia salah: "KB - TK untuk usia 3 - 6 tahun" (`index.html:329`; yang benar mulai 2 tahun), pilihan jenjang di `apply.html:157-160`. | |

### 3.6 Fungsi dan kualitas kode

| ID | Tingkat | Standar | Temuan | Status |
|---|---|---|---|---|
| Q-01 | Kritis | A06:2025 Insecure Design | Formulir pendaftaran di beranda (`index.html:623`) tidak mengirim data ke mana pun, tetapi menampilkan "Formulir pendaftaran berhasil dikirim". Calon orang tua mengira sudah mendaftar. | |
| Q-02 | Tinggi | Fungsi | `prestasi-siswa.html` tidak memuat `js/app.js`: tombol menu di HP tidak berfungsi di halaman itu. | |
| Q-03 | Tinggi | Fungsi | 22 tautan mati `href="#"` (termasuk tombol utama hero beranda "Info Admission") dan 30 lebih tautan yang salah tujuan: tombol "Lihat Semua Fasilitas", "Pelajari Program", "E-Brosur", "Daftar Sekarang" semuanya membuka WhatsApp dengan pesan "rincian biaya". | |
| Q-04 | Sedang | Fungsi | `components.js:487` memakai kelas `active`, CSS memakai `open`: submenu halaman aktif di HP tidak terbuka. `karir.html` tanpa `data-page`. | |
| Q-05 | Sedang | Aturan struktur | `<script>` inline di `kampus-bandung.html:567` dan `prestasi-siswa.html:17`; halaman game memakai konfigurasi Tailwind, warna, dan font sendiri. | |
| Q-06 | Sedang | Validasi HTML | 78 pelanggaran: `<div>` di dalam `<label>`, `src=""`, atribut `target` ganda (`kurikulum.html:54,59`), tag penutup nyasar (`fasilitas.html:272`), `<button>` di dalam `<a>` (`games.html`), `frameborder` usang. | |
| Q-07 | Rendah | Kerapian | `js/assets.js` tidak dipakai dan berisi sintaks tidak valid; `tribahasa.css` hampir seluruhnya duplikat `style.css`; `tools/__pycache__/*.pyc` ikut ter-commit; tidak ada `.gitignore`. | |
| Q-08 | Rendah | A10:2025 | Game Hanzi: kalau pustaka/data gagal dimuat, layar kosong tanpa pesan untuk anak (`hanzi-minigame.js:98`). | |

### 3.7 SEO dan kelengkapan situs

| ID | Tingkat | Temuan | Status |
|---|---|---|---|
| S-01 | Sedang | Hanya 1 dari 19 halaman punya meta description. Tidak ada Open Graph (pratinjau WhatsApp/IG), canonical, favicon. | |
| S-02 | Sedang | Tidak ada `robots.txt`, `sitemap.xml`, halaman 404, dan `_headers` (draft bisa terindeks Google). | |
| S-03 | Rendah | Judul halaman campur bahasa ("About Us", "ASTRO LOGIC - 3D Puzzle", "Susun Hanzi - Dark Mode Edition"). | |
| S-04 | Rendah | `server.js` mengembalikan beranda dengan status 200 untuk alamat yang salah (soft 404). | |

---

## 4. Temuan per file (per baris)

Singkatan tingkat: **K** kritis, **T** tinggi, **S** sedang, **R** rendah. Kode di kurung merujuk tabel bagian 3.

### `public/js/components.js` (608 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 9, 185, 279 | S | Logo tidak ada; `onerror` ke `placehold.co` (K-04, K-12). Baris 185 tanpa `alt` (A-03). |
| 8, 172 | S | `focus:outline-none` tanpa pengganti (A-07). Tombol menu tanpa `aria-expanded`/`aria-controls`. |
| 15–158 | T | Mega menu `<div>` hanya hover (A-01). |
| 29, 204 | S | "Prestasi Siswa" (B-06). 108: "kurikulum unggulan" (B-08). |
| 53, 283–285, 315 | T | `href="#"` (Q-03). 283–285: ikon sosmed 32 px tanpa nama (A-04, A-10). |
| 84–93, 281 | S | SMP/SMA ditampilkan (B-12). 281: salah eja "beraflisiasi", "dibawah". |
| 162, 187 | S | Tombol ikon tanpa `aria-label` (A-04). |
| 184–264, 442 | S | 10 `onclick` inline (K-06). 323: `style` inline. |
| 203–253 | S | Teks menu HP 12 px (R-05). |
| 302, 309 | T | Nomor telepon contoh; 306–310 alamat Kampus Bogor padahal masih rencana (B-11). |
| 320–433 | T | Tombol melayang bertulisan di HP (R-04); "Akses Cepat 2026", "Online • Siap Bantu" (klaim tanpa dasar); "Registrasi Siswa Baru"; "Tebak Hanzi & Sains ACT"; teks 9–10 px. |
| 436–444 | S | Modal tanpa `role="dialog"` (A-11); "Pesan Diterima!" (tanda seru). |
| 487 | S | Kelas `active` vs `open` (Q-04). |

### `public/js/app.js` (1070 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 11–62, 94–145, 197–250 | S | Fungsi ditempel ke `window` hanya untuk melayani `onclick` inline (K-06). |
| 80–91, 283, 614 | R | `scroll` listener tanpa `passive` (P-04). |
| 236 | S | Memakai variabel `event` global yang tidak dijamin ada. |
| 311–315 | S | Cadangan gambar hero ke Google Drive dan file yang tidak ada (K-04, K-11). |
| 340–344 | S | Teks slide: "pendidikan karakter", "Fasilitas modern", "berinovasi" (B-08). |
| 380, 714 | S | Slider otomatis tanpa jeda (A-09). |
| 538–545 | S | Lencana "Esensi", "fondasi etika kuat" (B-08). |
| 586 | T | Video YouTube contoh yang tidak ada hubungannya dengan sekolah (B-11). |
| 618–639 | T | Nama kepala sekolah contoh; "Berkarakter Mulia", "karakter luhur" (B-08, B-11). |
| 792–857 | S | Lowongan contoh, termasuk "Guru Matematika SMP/SMA"; "holistik", "modern" (B-08, B-12). |
| 863 | T | Kepala kartu lowongan `<div onclick>` (A-02). 903: tombol "Apply Now" tanpa aksi (Q-03). |

### `public/css/style.css` (680 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| seluruh file | S | Tidak ada `prefers-reduced-motion`; tidak ada `:focus-visible` (A-07, A-09). |
| 22 | T | `.nav-item:hover .mega-menu` saja (A-01). |
| 39 | S | `.open` tidak cocok dengan kelas `active` di JS (Q-04). |
| 265 | R | `.icon-3d-container` 140 px tetap. |

### `public/index.html` (733 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 6–21 | T | Tanpa meta description/OG/favicon (S-01); Tailwind CDN (K-01); FA tanpa SRI (K-02). |
| 35, 62, 71, 80 | S | `style` inline di hero (K-06). 46: sub hero 12 px di HP (hero final, tidak diubah). |
| 51 | T | Tombol utama hero "Info Admission" `href="#"` (Q-03). |
| 59 | S | Gambar hero tanpa `width`/`height` (P-03). |
| 65, 74, 83, 262, 278, 294 | T | Emoji dari repo luar (K-04); `alt` Inggris. |
| 96–97 | S | "JOIN EVENT KAMI SEKARANG!" (B-07). 106–180: tanggal lewat, "Campus Bogor", `href="#"` (B-11, Q-03). |
| 232–234 | T | Titik slider tanpa nama, tinggi 8 px (A-04, A-10). |
| 255 | S | "Keunggulan Kami" (seharusnya core values). 269, 285, 301: panah `<div>` tanpa tautan. |
| 283, 299 | T | Urutan bahasa dan atribusi salah (B-02, B-03). |
| 314 | S | Sub judul 10 kata, "hingga Sekolah Menengah Atas" (B-10, B-12). |
| 319–424 | S | Kartu Jenjang: pita `h-[32.5%]` + `style` (R-03); teks 6–8 px (R-05); "usia 3 - 6" salah (B-13); "Learn More"; video `preload="auto"` (P-02). |
| 453–558 | T | `<div onclick>` + video w3schools (A-02, K-04); testimoni contoh (B-11). |
| 580 | T | "Akses 360 Virtual Tour" `href="#"`. 598: proses internal (B-05). |
| 623 | K | Formulir tidak mengirim data (Q-01). 627–665: label tidak terhubung, tanpa `name`/`autocomplete` (A-05). |
| 713–732 | S | Modal tanpa peran; tombol tutup tanpa nama (A-11). |

### `public/about.html` (440 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 40 | S | "holistik"; sub judul panjang. 44: "Tiga Pilar ACT". |
| 43, 166, 197, 303, 319 | T | `target="_blank"` tanpa `rel` (K-05) dan semuanya salah tujuan ke WhatsApp biaya (Q-03). |
| 83–118 | T | Nama dan kutipan kepala sekolah contoh (B-11). 123–124: titik 6 px (A-10). |
| 141 | S | "Institusi Unggulan". 164: "siswa". 161: "50 Tahun Dedikasi" (angka, perlu dicek pemilik). |
| 201 | T | `aspect-[4/3] lg:aspect-video` (R-01). |
| 215–217 | T | "Kompetensi Inti ACT", "Tiga Pilar Utama Sekolah" (B-06). |
| 243, 245, 264, 283 | T | Hanzi menempel (B-01); nilai digabung (B-09); urutan bahasa (B-02); "berbasis proyek", atribusi (B-03). |
| 329–402 | T | 5 gambar tanpa `alt` (A-03). 378: rincian uang pangkal (perlu dicek pemilik). 424: `href="#"`. |

### `public/admissions.html` (440 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 51, 363 | T | `href="#"`. 54: "Hubungi Tim Admission" menuju `kurikulum.html` (salah). |
| 71–206 | T | Tujuh tahap berisi proses internal (B-05). |
| 265–305 | T | Checkbox `class="hidden"` (A-05). 315, 399: tanpa `rel` (K-05). |
| 340 | R | "Tentu bisa!" (tanda seru). 378: rincian uang pangkal. 415: "Bergabung Bersama Kami". |

### `public/apply.html` (256) · `js/apply.js` (101) · `css/apply.css` (74)
| Baris | Tingkat | Temuan |
|---|---|---|
| html 50 | S | "aman, bersahaja, dan mudah" (tiga kata sifat berderet); "ananda" (pakai "si kecil"). |
| html 83 | S | Emoji dari repo luar (K-04). |
| html 129–178 | S | Input tanpa `name`/`autocomplete` (WCAG 1.3.5). 157–160: usia jenjang tidak sesuai fakta (B-13). |
| js 52 | R | `alert()`. js 100: `window.open` tanpa `noopener` (K-05). |

### `public/school-visit.html` (292) · `js/school-visit.js` (128) · `css/school-visit.css` (109)
| Baris | Tingkat | Temuan |
|---|---|---|
| html 47, 69 | S | "Jelajahi fasilitas eksklusif" (B-08). 98, 159: "kuota terbatas", "Sisa 3 Sesi Bulan Ini" (kelangkaan yang ditulis tetap di kode). |
| html 111 | S | `onsubmit` inline. 122–149: input tanpa label (A-05). |
| html 165–193 | T | Tanggal kunjungan ditulis tetap dan semuanya sudah lewat (Okt 2026); kartu `<div onclick>` (A-02, B-11). |
| html 259–260 | T | Wadah `h-[250px]` (R-02) + gambar dari `images.pexels.com` (K-04). |
| js 105 | S | `window.open` tanpa `noopener`. |

### `public/kurikulum.html` (433 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 54, 59 | T | Atribut `target` ganda (Q-06); tanpa `rel`; "Download Full Syllabus PDF" ternyata WhatsApp biaya. |
| 45, 83, 121 | S | "Komprehensif", "Berstandar Global", "Holistik" (B-08). |
| 66, 180, 201, 282, 300–302 | T | Tinggi tetap pada wadah gambar (R-02). |
| 192, 213, 360, 373, 385, 392 | T | Tautan salah tujuan + tanpa `rel` (Q-03, K-05). 417: `href="#"`. |
| 208, 239–240 | T | Atribusi Dr. Yeap Ban Har salah (B-03). 275, 348–383: "Pilar". |

### `public/budi-pekerti.html` (471 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 39, 43, 48 | T | "Pilar Utama ACT"; Hanzi menempel (B-01); nilai digabung (B-09). |
| 112 | T | Wadah galeri tinggi tetap (R-02). 129–162: hanya `onmouseenter` (A-02). |
| 181 | T | Video contoh (B-11). 204, 213, 298: "esensi" (B-08). 157: "senantiasa". |
| 222–267 | T | 10 kartu `<div onclick>` (A-02). |
| 370, 383 | T | "Sinergi Pendidikan ACT" (B-04); `href="#"` untuk STEAM. |
| 391–459 | S | Modal tanpa peran; `src=""`; `iframe` tanpa `title` (A-11, A-13, Q-06). |

### `public/tribahasa.html` (367) · `css/tribahasa.css` (71)
| Baris | Tingkat | Temuan |
|---|---|---|
| 5 | S | Larangan zoom (A-08). 23: `onerror` ke unsplash (K-04). |
| 32–52, 67, 165–199 | T | Urutan bahasa salah (B-02); `alt` "ID/CN/UK"; salah eja "Thankyou". |
| 63–64, 86, 96 | S | "Menguasai Tiga Bahasa" (janji hasil), "menjamin". 60: nama "Tribahasa" (core value: Trilingual). |
| 129 | T | Rasio ikut isi (R-02). 263: video contoh. 303, 317: emoji luar tanpa `alt`. |
| 335 | T | "Sinergi Pembelajaran ACT" (B-04). |
| css | R | Duplikat `style.css` (Q-07). |

### `public/steam.html` (603) · `js/steam.js` (217) · `css/steam.css` (45)
| Baris | Tingkat | Temuan |
|---|---|---|
| html 73, 459; js 159–179 | T | Emoji luar (K-04). |
| html 176; js 95, 99 | T | Atribusi salah (B-03). html 96; js 55–80: "proyek", "berbasis". js 78, html 238: "Montessori" (fakta meragukan). |
| html 214–274 | T | Kartu fasilitas tinggi tetap (R-02); `onerror` inline (K-06). |
| html 504–507 | T | "Sinergi Pilar ACT: Thinking, Attitude & Compassion" (B-04). 524: "Jadwalkan Kunjungan" ke `admissions.html` (salah). |
| html 533–590 | S | Modal tanpa peran (A-11). |

### `public/preschool.html` (541 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 59, 63, 398, 484 | T | Salah tujuan + tanpa `rel`. 513: `href="#"`. |
| 55, 262 | S | Nilai digabung (B-09). 203: "guna". 224–225: "Tiga Pilar Metodologi", "bermakna". |
| 155, 188, 446 | T | Rasio berganti (R-01). 292–333, 359: tinggi tetap (R-02). |
| 234–258 | T | Emoji luar (K-04). 293–380: 7 gambar tanpa `alt` (A-03). |

### `public/primary.html` (522 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 60, 64, 421, 484 | T | Salah tujuan + tanpa `rel`. 506: `href="#"`. |
| 222, 229 | T | Emoji luar; atribusi salah (B-03). 362, 367: "pilar utama"; nilai digabung. |
| 313–337, 383–410 | T | Tinggi tetap pada wadah gambar (R-02). 433: latar dari `transparenttextures.com` (K-04). |
| 455, 461 | S | "dijamin"; "KBM" (B-08). |

### `public/fasilitas.html` (401 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 48 | S | "Aman, Modern, dan Inspiratif" (B-08). |
| 56, 298, 348, 370, 373 | T | 5 `href="#"` (virtual, login portal, Google Maps, kunjungan, WhatsApp). |
| 67, 146–257 | T | Rasio berganti (R-01); kartu `<div onclick>` (A-02). 272: tag penutup nyasar. |
| 386–393 | S | Lightbox tanpa peran, `src=""`. |

### `public/karir.html` (262 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 25 | S | Tanpa `data-page` (Q-04). 44: "Bergabung Bersama Kami". 67–68: "Budaya ACT", "kompetensi". |
| 116–138 | T | Wadah foto `h-[250px]` (R-02). |

### `public/kampus-bandung.html` (685 baris)
| Baris | Tingkat | Temuan |
|---|---|---|
| 567–683 | S | `<script>` inline (Q-05). |
| 245, 270, 337, 356, 399 | S | "siswa", urutan bahasa, atribusi, "maksimal". |
| 313–351 | T | Emoji luar (K-04). 90–94, 262–266: slot foto masih kosong (perlu foto). |
| 215–281 | S | Panah 36 px, titik 10 px (A-10). |

### `public/prestasi-siswa.html` (841) · `js/prestasi.js` (276) · `css/prestasi.css` (336)
| Baris | Tingkat | Temuan |
|---|---|---|
| html 17–41 | S | `<script>` konfigurasi inline (Q-05). 838–839: tanpa `app.js` (Q-02). |
| html 68–655 | T | 24 bingkai `<div onclick>`; duplikat tanpa `aria-hidden`; teks 8–11 px; 493, 637 gambar tidak ada (R-07). |
| html 673, 676, 699–705 | S | "Jelajahi", "Siswa", "luar biasa", "peserta didik". |
| js 15–113 | T | 8 prestasi dan nama murid contoh, penyelenggara seperti "Dinas Pendidikan Kota Bandung" (B-11); foto dari emoji luar. |
| js 133 | T | Kartu `<div onclick>` (A-02). |

### Mini game
| File:baris | Tingkat | Temuan |
|---|---|---|
| `games.html:5`, `*-minigame.html:5` | S | Larangan zoom (A-08). |
| `games.html:8-9`, config game | S | Warna `brand.dark` #0f172a dan font sendiri; tidak ikut pola global (Q-05). |
| `games.html:38,59,107` | S | Bahasa bukan untuk anak: "eksklusif", "memukau", "UI kekinian", "neon premium". |
| `games.html:46-115` | S | `<button>` di dalam `<a>`; tombol hanya muncul saat hover. 54, 78, 102: emoji luar. |
| `games.html`, `hanzi`, `vocab` | S | Gulir samping 38 px di HP (R-06). |
| `vocab-minigame.js:3-7,137-148` | T | 8 gambar dari repo luar; gambar wajan untuk kata "PIRING". 134: "Luar Biasa!". |
| `vocab-minigame.html:14` | S | `h-screen` (terpotong bilah alamat di HP). |
| `hanzi-minigame.html:10,114-117` | T | Pustaka tanpa versi terkunci; suara dari domain luar (K-03). 39: "Pengalaman premium". |
| `hanzi-minigame.js:28,98` | R | `console.log`; gagal muat tanpa pesan (Q-08). |
| `steam-minigame.html:8,11-18` | T | Font Orbitron/Poppins; importmap inline ke unpkg (K-03). |
| `steam-minigame.html:55-65` | T | Tombol arah tanpa `aria-label` (A-04). |
| `steam-minigame.js:290,299` | S | Tekstur dari domain luar (K-03). |

### File lain
| File | Tingkat | Temuan |
|---|---|---|
| `server.js` | S | Tanpa header keamanan, `x-powered-by` aktif, soft 404, cache mati total (K-07, S-04, P-05). |
| `package.json` | R | Tanpa lockfile (K-08). |
| `.vscode/settings.json` | Info | Aman. `git.confirmSync: false` membuat sinkron tanpa konfirmasi; biarkan sesuai kebiasaan pemilik. |
| `metadata.json` | Info | Sisa Google AI Studio (`SERVER_SIDE_GEMINI_API`), tidak dipakai. |
| `js/assets.js` | R | Tidak dimuat halaman mana pun; sintaks tidak valid (Q-07). |

---

## 5. Hasil ukur otomatis

Diisi di bagian 6 setelah perbaikan, berdampingan dengan angka awal berikut.

| Ukuran (19 halaman) | Sebelum |
|---|---|
| Pelanggaran axe WCAG 2.2 A/AA (375 + 1440 px) | 406 node (kontras 142, tautan tanpa nama 111, tombol tanpa nama 49, gambar tanpa alt 42, lainnya 62) |
| Error console | 54 dari 57 pemuatan halaman (logo 404) |
| Pelanggaran validasi HTML | 78 |
| Halaman dengan gulir samping di 375 px | 3 |
| Gambar tanpa `width`/`height` | 229 |
| Permintaan ke domain luar | 9 domain |
