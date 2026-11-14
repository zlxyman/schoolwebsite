# CLAUDE.md — Website Sekolah Terpadu Sedaya Bintang

Website statis: HTML + Tailwind CSS + vanilla JS. Semua halaman ada di `public/`.
Nanti diserahkan ke tim IT sekolah untuk dihubungkan ke domain sedayabintang.sch.id dan hostingnya.
Pemilik project awam IT: jelaskan setiap perubahan dengan bahasa Indonesia sederhana.
Preview lokal: pemilik kadang membuka `public/index.html` dengan Live Server di VS Code.
`server.js` hanya untuk Cloud Run (preview lama dari Google AI Studio).

## Skill yang terpasang (`.claude/skills/`)
- **task-observer**: muat di awal setiap sesi kerja. Simpan observasi di `docs/skill-observations/`.
  Usulan perubahan skill ditulis di laporan sebagai usulan; jangan ubah skill tanpa persetujuan pemilik.
- **impeccable**: satu-satunya skill desain. Pakai untuk merancang, critique, audit, dan polish UI.
  Jangan pakai skill desain lain bersamaan supaya arahannya tidak bentrok.
- **stop-slop**: pakai untuk membersihkan teks dari pola tulisan khas AI.
  Kalau bentrok dengan `docs/gaya-bahasa.md`, yang menang selalu gaya-bahasa.md.
- **find-skills**: kalau butuh kemampuan yang belum ada, cari skill dulu. Jangan pasang skill baru
  tanpa mencatatnya di laporan.
- **caveman**: selalu aktif untuk balasan chat ke pemilik: langsung ke inti, tanpa basa-basi.
  TIDAK berlaku untuk teks website, dokumen, laporan, dan pesan commit (itu tetap kalimat lengkap).
- Plugin resmi (lihat `.claude/settings.json`): code-review dan security-guidance.

## Struktur & pola halaman (wajib diikuti)
- Path di dalam HTML relatif TANPA awalan `public/` (contoh: `js/app.js`, `assets/images/...`).
- `<head>` urutannya: Tailwind → Google Fonts Plus Jakarta Sans → FontAwesome → `js/tailwind-config.js` → `css/style.css` → CSS khusus halaman (kalau ada).
- `<body id="top" data-page="...">`. Navbar dan footer diisi `js/components.js` lewat `<div id="app-navbar"></div>` dan `<div id="app-footer"></div>`.
- Penutup body: `js/components.js` lalu `js/app.js`.
- Jangan ada `<style>` atau `<script>` inline. CSS khusus halaman masuk ke `css/<halaman>.css`.
- Warna brand (tailwind-config.js): primary #1d4486, yellow #ffcb05, red #d2232a, blue #eaf1fb, gray #f9fafb, dark #0f2447. Jangan definisikan ulang warna di halaman.
- Hero "Menjadi Sang Bintang di Masa Depan" di index.html sudah final, jangan diubah isinya.

## ATURAN RASIO GAMBAR (paling penting)
- Setiap gambar/kartu harus punya rasio yang SAMA di semua ukuran layar (HP, tablet, desktop).
  Ukurannya boleh mengecil/membesar, rasionya tidak boleh berubah.
- Cara pakai: satu kelas rasio tetap (`aspect-[16/9]`, `aspect-square`, `aspect-[20/7]`, dll) + `object-cover` + `w-full`.
- DILARANG: rasio yang berganti per breakpoint (contoh `aspect-[4/3] md:aspect-video`),
  tinggi tetap (`h-64`, `h-[300px]`) pada wadah gambar, atau `flex-1`/`h-[85%]` yang membuat rasio ikut konten.
- PENGECUALIAN: hero banner boleh rasio berbeda per layar dan boleh ter-crop.
- Kartu "Jenjang Pendidikan" (KB-TK, SD, SMP, SMA): kartu 1:1, foto berupa pita landscape 20:7,
  sama di semua layar. Animasi karakter `.webm` saat hover TIDAK boleh rusak
  (commit 14685ea pernah merusaknya dan sudah di-revert lewat 51a69e7 — pelajari dulu sebelum mengubah).
- Setiap slot gambar dicatat di `docs/daftar-aset.md`: nama file, halaman, rasio, ukuran minimal (px), status (dummy / final).

## Aset
- Semua gambar disimpan lokal di `public/assets/images/`. Tidak boleh ada gambar dari domain luar
  (termasuk raw.githubusercontent.com/Tarikul-Islam-Anik/...).
- Format WebP. Nama file huruf kecil pakai tanda hubung, tanpa spasi dan tanpa underscore (contoh: `steam-robotik.webp`).
- Semua `<img>` wajib punya `alt` berbahasa Indonesia, `width`/`height`, dan `loading="lazy"` (kecuali gambar hero).

## Gaya bahasa konten
- WAJIB baca `docs/gaya-bahasa.md` sebelum menulis/mengubah teks apa pun.
- Pelajari juga semua file di `docs/contoh-konten/` (konten terbaru yang sudah disetujui pemilik:
  caption, script, materi). File terbaru paling diutamakan. Tiru nada dan pilihan katanya.
- Teks di halaman yang sudah direvisi (semua halaman kecuali mini game) adalah contoh suara Sedaya.
- Kalau pemilik mengoreksi bahasa di PR, tambahkan aturannya ke "Catatan Koreksi" di `docs/gaya-bahasa.md`
  supaya kesalahan yang sama tidak terulang.
- Cari dan perbaiki di SEMUA halaman (termasuk mini game): kata "Hanzi" yang menempel pada Budi Pekerti,
  semua kata di "Daftar hitam" gaya-bahasa.md (termasuk "siswa" → "murid"),
  urutan Trilingual yang bukan Mandarin-Inggris-Indonesia, istilah "kompetensi inti", sebutan "event"
  ke pembaca, dan penjelasan proses internal pendaftaran (beli formulir, commitment fee).
  CATATAN: nama game "Hanzi Master" boleh tetap, karena itu game huruf Mandarin, bukan Budi Pekerti.
- Website sekarang menampilkan jenjang SMP dan SMA, padahal yang sudah buka baru KB, TK, SD.
  Jangan hapus sendiri; tandai di laporan dan tunggu keputusan pemilik.

## Preview setiap perubahan
- Repo terhubung ke Cloudflare Pages: setiap push ke branch otomatis punya link preview.
- Setiap selesai push, tulis link preview branch itu di deskripsi PR dan di laporan.
- Buat `public/_headers` berisi `X-Robots-Tag: noindex` untuk semua path, supaya draft tidak masuk Google.

## Kualitas & keamanan (sebelum serah terima ke IT)
- Tidak boleh ada API key, token, password, atau URL rahasia (misal URL Apps Script) di kode front-end.
- Semua script/style dari CDN pakai versi yang dikunci + atribut `integrity` (SRI) + `crossorigin`, atau disimpan lokal.
- Tailwind lewat CDN hanya untuk development; untuk produksi siapkan build CSS statis.
- Link `target="_blank"` wajib `rel="noopener noreferrer"`.
- Form tidak boleh mengirim data ke layanan yang belum disetujui pemilik.
- Siapkan contoh header keamanan (Content-Security-Policy, X-Content-Type-Options, Referrer-Policy) di `docs/serah-terima-it.md`.

## Standar UI/UX (berlaku walau tidak disebut di prompt)
Kamu bertindak sebagai senior UI/UX + front-end engineer. Kalau menemukan masalah UI/UX yang
tidak disebut pemilik, PERBAIKI juga dan catat di laporan. Pemilik tidak akan menyebut semuanya.
- Mobile-first. Di HP (< 768px) tidak boleh ada elemen yang memakan ruang tanpa perlu.
- Floating button / quick access (tombol melayang, contoh WhatsApp, kontak, kembali ke atas):
  di HP hanya ikon bulat (minimal 48x48px) tanpa teks; teks/label hanya muncul di desktop.
  Wajib `aria-label`. Tidak boleh menutupi tombol penting, form, atau kontrol mini game.
- Area sentuh minimal 44x44px, jarak antar tombol cukup, tidak ada scroll horizontal di HP.
- Ukuran teks minimal 16px untuk isi di HP, kontras warna lulus WCAG AA.
- Navigasi, footer, dan komponen yang sama harus konsisten di semua halaman.
- Semua state lengkap: hover, aktif, fokus keyboard (terlihat), loading, kosong, error.
- Animasi halus dan menghormati `prefers-reduced-motion`.

## Mini games (games.html dan semua *-minigame.html)
- Harus bisa dimainkan penuh di HP dengan sentuhan (tanpa keyboard), layar portrait.
- Tidak ada error di console. Tidak ada tombol/teks yang terpotong. Skor dan tombol ulang berfungsi.
- Tampilan mengikuti pola global (tailwind-config.js + style.css), warna dark #0f2447.
- Bahasa ramah anak, sesuai aturan gaya bahasa di atas.

## Cara kerja (mode mandiri)
- Bekerja mandiri sampai tugas selesai. Jangan berhenti untuk bertanya kecuali keputusan
  yang tidak bisa dibatalkan (hapus file, ganti struktur folder, ubah hero index.html).
  Untuk hal yang ragu: pilih opsi paling aman, lanjutkan, dan catat di laporan.
- Kerjakan di branch terpisah, commit kecil per halaman dengan pesan berbahasa Indonesia,
  lalu buka Pull Request. Jangan push langsung ke main.
- Verifikasi sendiri setiap perubahan: kalau bisa, pakai Playwright (headless Chromium) untuk
  screenshot di lebar 375px, 768px, dan 1440px dan cek console error. Bandingkan sebelum/sesudah.
  Kalau Playwright tidak bisa dipasang, cek manual kode responsifnya dan tulis keterbatasannya.
- Setelah selesai, jalankan review sekali lagi (code-review + /security-review) atas perubahanmu sendiri.
- Tulis laporan akhir di `docs/laporan-perbaikan.md`: apa yang diubah, kenapa, apa yang belum
  bisa dipastikan, dan apa yang perlu dicek manual oleh pemilik di HP asli.
- Jangan hapus file tanpa izin pemilik.
