# Prompt Awal Claude Code

Tempel di claude.ai/code (repo zlxyman/schoolwebsite). Model: Fable 5.2 (gratis s.d. Senin 17 Nov 2026 14.59 WIB), sesudahnya Opus.

```
Baca CLAUDE.md dan docs/gaya-bahasa.md, ikuti semua aturannya. Muat skill task-observer dulu.

Kerjakan berurutan tanpa menunggu saya:
1. Audit seluruh public/ (semua halaman + mini game) baris per baris pakai standar eksternal
   di CLAUDE.md (OWASP Top 10:2025, ASVS 5.0, WCAG 2.2 AA, Mozilla Observatory, Lighthouse)
   dan skill impeccable untuk UI/UX: rasio gambar, floating button, layout HP/tablet/desktop,
   aksesibilitas, console error, kualitas kode, keamanan, bahasa sesuai gaya-bahasa.md.
   Catat di docs/audit-kode.md dan docs/daftar-aset.md.
2. Perbaiki semua temuan, mulai dari yang paling berdampak. Hero index.html jangan diubah.
   Animasi .webm kartu Jenjang jangan sampai rusak.
3. Pasang ikon 3D dari public/assets/images/icons/ dengan animasi loop sesuai CLAUDE.md,
   ganti emoji dari repo luar.
4. Jalankan bagian "Inisiatif proaktif": tulis docs/usulan-pengembangan.md dan kerjakan
   perbaikan kecil yang aman.
5. Verifikasi dengan screenshot 375/768/1440px, review ulang (code-review + /security-review),
   buka Pull Request, tulis docs/laporan-perbaikan.md dengan bahasa awam, sertakan link preview.
```
