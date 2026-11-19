# Laporan Perbaikan Website Sedaya Bintang

Terakhir diperbarui: 15 November 2026. Branch kerja: `claude/busy-maxwell-o402pl` (belum digabung ke `main`).

**Link preview:** https://claude-busy-maxwell-o402pl-schoolwebsite.marketing-caf.workers.dev
Alamat ini selalu menampilkan versi terbaru branch kerja. Alamat `schoolwebsite.marketing-caf.workers.dev` adalah versi utama (`main`), jadi isinya masih versi lama sampai Pull Request digabung.

Preview dibuat oleh Cloudflare Workers lewat file `wrangler.jsonc`. Blok `"previews": {}` di file itu wajib ada. Tanpa blok itu, build preview gagal.

Laporan ini ditulis untuk pemilik website. Istilah teknis dijelaskan seperlunya.

## 1. Status singkat

| Halaman | Status |
|---|---|
| Beranda, Tentang Kami, Admissions, Apply, School Visit, Kurikulum, Budi Pekerti, Trilingual, STEAM | Sudah diperbaiki di sesi sebelumnya |
| KB dan TK (`preschool.html`), SD (`primary.html`), Kampus Bandung (`kampus-bandung.html`) | Sudah diperbaiki di sesi ini |
| Fasilitas, Prestasi, Karir | Belum. Baru bagian kepala halaman yang diseragamkan |
| Mini game (Games, Hanzi Master, Vocab, STEAM) | Belum. Baru bagian kepala halaman yang diseragamkan |

Hasil audit awal seluruh kode ada di `docs/audit-kode.md`. Daftar gambar ada di `docs/daftar-aset.md`.

## 2. Yang dikerjakan di sesi ini (15 November 2026)

### 2.1 Menyimpan pekerjaan sesi sebelumnya
Pekerjaan sesi sebelumnya belum tersimpan di GitHub. Semuanya sekarang sudah disimpan dalam 12 commit dan dikirim ke branch kerja, jadi tidak akan hilang.

### 2.2 Halaman KB dan TK (`preschool.html`)
- **Teks ditulis ulang** sesuai `docs/gaya-bahasa.md`: sapaan "si kecil", kalimat pendek, sub judul maksimal 8 kata.
- **Kata terlarang dihapus**: "pilar", "bermakna", "guna", dan judul berbahasa Inggris pada kegiatan harian.
- **Kesalahan isi diperbaiki**: sebelumnya tertulis "10 Nilai Moral berdasarkan Di Zi Gui". Keduanya hal berbeda, jadi sekarang ditulis "10 Nilai Moral dan nilai Di Zi Gui".
- **Rasio gambar dibuat tetap**: foto KB/TK 4:3, foto kegiatan 16:9, foto fasilitas 4:3, foto guru 4:5. Sebelumnya rasio berubah antara HP dan desktop, dan beberapa memakai tinggi tetap.
- **Tombol yang salah arah diperbaiki**: tombol "E-Brosur" dan "Lihat Fasilitas Virtual" ternyata membuka WhatsApp dengan pesan tanya biaya. Sekarang diganti "Jadwalkan School Visit" dan "Lihat Semua Fasilitas".
- **Tombol yang tidak berfungsi dihapus**: panah kiri/kanan di kegiatan harian dan tombol "Informasi Lanjut" yang tidak mengarah ke mana pun.
- **Ukuran teks**: isi halaman sekarang minimal 16px di HP.

### 2.3 Halaman SD (`primary.html`)
- **Teks ditulis ulang** dengan aturan yang sama.
- **Susunan dirapikan** menjadi: Dua Kurikulum, Tiga Core Values, Framework Singapura untuk Matematika, Kegiatan STEAM, Fasilitas SD, Biaya SD, Hubungi Tim Admisi.
- **ACT tidak lagi menjadi judul kartu**, sesuai aturan bahwa yang ditonjolkan adalah Budi Pekerti, Trilingual, dan STEAM.
- **Kalimat matematika disamakan** dengan aturan: "Framework Singapura untuk Matematika dan Six Elements of Teaching dari Dr. Yeap Ban Har".
- **Rasio gambar dibuat tetap** 4:3 di semua layar.
- **Tombol diperbaiki**: "Mulai 360 Virtual Tour" (salah arah) dan "Tanya Tim Admisi" (tidak mengarah ke mana pun) sekarang berfungsi benar.
- Satu gaya tulisan yang ditempel langsung di HTML (`style=`) dihapus.

### 2.4 Halaman Kampus Bandung (`kampus-bandung.html`)
- **Skrip yang ditulis langsung di halaman dipindah** ke file sendiri, `public/js/kampus-bandung.js`. Ini syarat agar pengaman Content-Security-Policy nanti bisa dipasang oleh tim IT.
- **Urutan Trilingual dibetulkan** menjadi Bahasa Mandarin, Inggris, dan Indonesia.
- **Kata "siswa" diganti "murid"** (2 tempat) dan kata "maksimal" dihapus.
- **Kartu lokasi** sekarang satu kolom di HP supaya teksnya terbaca (sebelumnya dua kolom dengan huruf 12px).
- **Titik penanda foto** tidak lagi berupa tombol kecil 10px yang sulit ditekan. Tombol panah dibesarkan menjadi 44px.
- **Alamat email** tidak lagi keluar dari kotaknya di HP.
- **Foto paling atas**: sebelumnya kotak kosong bertuliskan "Foto: gedung sekolah tampak depan". Sementara diisi foto kelas.

### 2.5 Tambahan kecil
- `public/_headers`: melarang Google mengindeks website selama masih draft. **File ini harus dihapus saat website resmi tayang.** Nama filenya memang wajib diawali garis bawah karena aturan Cloudflare Pages.
- `tools/potret-halaman.js`: alat untuk memotret halaman di lebar HP dan memeriksa error.
- `docs/daftar-aset.md`: daftar gambar untuk tiga halaman di atas.

## 3. Hasil pemeriksaan (lebar HP 375px)

| Halaman | Error di console | Gambar rusak | Geser ke samping | Temuan aksesibilitas (axe) |
|---|---|---|---|---|
| preschool.html | 0 | 0 | tidak ada | 0 |
| primary.html | 0 | 0 | tidak ada | 0 |
| kampus-bandung.html | 0 | 0 | tidak ada | 0 |

## 4. Perlu keputusan atau data dari pemilik

Hal berikut saya hapus atau ubah karena tidak bisa saya pastikan kebenarannya. Kalau memang benar, beri tahu saya dan akan saya pasang lagi.

| No | Hal | Halaman | Yang saya lakukan |
|---|---|---|---|
| 1 | Jam kegiatan harian (08:00, 09:00, 10:00, 11:30 WIB) | KB dan TK | Dihapus. `[PERLU DATA: jadwal harian KB dan TK]` |
| 2 | Label "Early Bird Kuota Terbatas" dan "Berlaku untuk 20 pendaftar pertama" | KB dan TK, SD | Dihapus. `[PERLU DATA: promo yang sedang berlaku]` |
| 3 | "Sudah termasuk SPP bulan pertama" dan "Belum termasuk biaya seragam dan buku" | KB dan TK | Dihapus. Rincian biaya diarahkan ke tim admisi. |
| 4 | "Kelas Adaptasi Mandarin dan Psikotes" untuk murid baru kelas 1 | SD | Dihapus karena termasuk proses internal pendaftaran. |
| 5 | Tombol "E-Brosur" | KB dan TK, SD | Diganti "Jadwalkan School Visit" karena file brosurnya tidak ada. `[PERLU DATA: file e-brosur]` |
| 6 | Tombol "Virtual Tour 360" | KB dan TK, SD | Diganti "Lihat Semua Fasilitas" karena tur virtualnya tidak ada. |
| 7 | Foto gedung sekolah dan foto perpustakaan | Kampus Bandung | Belum ada fotonya. Lihat `docs/daftar-aset.md`. |
| 8 | Semua foto di tiga halaman ini | Semua | Masih foto stok (dummy). Perlu diganti foto asli sekolah. |
| 9 | Nomor WhatsApp admisi 0813-8977-2288 | Semua | Dipakai di semua tombol. Mohon dipastikan nomornya benar. |
| 10 | Jenjang SMP dan SMA | Beranda, footer | Masih tampil, padahal belum buka. Menunggu keputusan pemilik. |

Klaim yang **saya pertahankan** karena sudah ada di halaman lain yang direvisi: porsi Bahasa Mandarin 70% (KB dan TK) dan 42% (SD), satu guru native dan dua guru pendamping, kerja sama perawat RS Santo Borromeus, kelas tanpa pendingin ruangan, Uang Pangkal mencakup sampai lulus jenjang, Program Keluarga (Siblings), dan Tahun Ajaran 2027/2028. Mohon dicek sekali lagi.

## 5. Yang belum dikerjakan (urutan sesi berikutnya)

1. Halaman Fasilitas, Prestasi, dan Karir. Catatan: `prestasi-siswa.html` merujuk gambar `kelas-smart-board.jpg` yang filenya tidak ada.
2. Mini game: Games, Hanzi Master, Vocab, STEAM. Harus bisa dimainkan penuh di HP.
3. Ikon 3D core values. **Ditunda atas permintaan pemilik.** Akibatnya, ikon hati, bola dunia, dan roket masih diambil dari website luar (GitHub) di `preschool.html` dan `kampus-bandung.html`. Ini melanggar aturan "semua gambar disimpan lokal" dan harus dibereskan sebelum serah terima ke IT.
4. `docs/usulan-pengembangan.md` (SEO, sitemap, robots, halaman 404, favicon lengkap, Google Analytics).
5. `docs/serah-terima-it.md` berisi contoh header keamanan.
6. Potret di lebar tablet (768px) dan desktop (1440px), review kode, review keamanan, lalu buka Pull Request.
7. Melengkapi `docs/daftar-aset.md` untuk halaman lain.

## 6. Yang perlu dicek pemilik di HP asli

- Halaman KB dan TK: tekan tombol "Kelompok Bermain (KB)" dan "Taman Kanak-Kanak (TK)", isinya harus berganti.
- Halaman KB dan TK: geser kartu "Kegiatan Sehari-hari" ke samping dengan jari.
- Halaman KB dan TK serta SD: tekan karakter 3D di bagian atas, animasinya harus berjalan.
- Halaman Kampus Bandung: peta Google harus muncul, dan tombol "Petunjuk Arah" harus membuka Google Maps.
- Semua tombol WhatsApp: pesan yang muncul harus sesuai (tanya pendaftaran atau tanya biaya).

## 7. Yang belum bisa dipastikan

- **Peta Google** tidak bisa dimuat di tempat saya bekerja karena akses ke Google diblokir. Kodenya tidak diubah, tetapi perlu dicek di HP asli.
- **Data terstruktur (JSON-LD)** di `kampus-bandung.html` ditulis langsung di halaman. Ini pengecualian yang wajar karena isinya data, bukan skrip yang dijalankan.
- Pemeriksaan baru di lebar HP 375px, sesuai permintaan hemat. Tablet dan desktop belum dipotret ulang untuk tiga halaman ini.

## 8. Catatan skill

- Skill desain `impeccable` tidak dimuat di sesi ini untuk menghemat pemakaian. Perubahan mengikuti pola halaman yang sudah direvisi.
- Tidak ada skill yang diubah atau dipasang.
