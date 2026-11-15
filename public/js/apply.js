/*
 * Halaman Apply: formulir pendataan awal.
 * Data tidak disimpan di website. Isinya disusun menjadi pesan lalu dibuka di WhatsApp admisi.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('apply-form');
    if (!form) return;

    // Tanggal lahir: tidak boleh di masa depan, paling lama 15 tahun lalu
    const dobInput = document.getElementById('wa-dob');
    if (dobInput) {
        const hariIni = new Date();
        dobInput.max = hariIni.toISOString().split('T')[0];
        dobInput.min = `${hariIni.getFullYear() - 15}-01-01`;
    }

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nilai = (id) => (document.getElementById(id)?.value || '').trim();
        const [th, bl, tg] = nilai('wa-dob').split('-');
        const pesan =
`Halo Tim Admisi Sekolah Terpadu Sedaya Bintang,

Saya ingin melakukan pendataan awal murid baru:

• Nama orang tua / wali: ${nilai('wa-parent')}
• Nomor WhatsApp: ${nilai('wa-phone')}
• Nama calon murid: ${nilai('wa-child')}
• Tanggal lahir: ${tg}/${bl}/${th}
• Jenjang: ${nilai('wa-grade')}
• Mengetahui Sedaya Bintang dari: ${nilai('wa-source')}

Mohon info pendaftaran selanjutnya. Terima kasih.`;

        window.bukaWhatsApp(pesan);
        const status = document.getElementById('apply-status');
        if (status) status.textContent = 'WhatsApp sedang dibuka. Tekan kirim di WhatsApp supaya pesan sampai ke tim admisi.';
    });
});
