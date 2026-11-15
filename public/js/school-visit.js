/*
 * Halaman School Visit: formulir permintaan jadwal kunjungan.
 * Data tidak disimpan di website. Isinya disusun menjadi pesan lalu dibuka di WhatsApp admisi.
 */
document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('visit-form');
    if (!form) return;

    const isoLokal = (d) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
    const hariIni = new Date();

    // Tanggal lahir tidak boleh di masa depan
    const dob = document.getElementById('v-dob');
    if (dob) dob.max = isoLokal(hariIni);

    // Tanggal kunjungan paling cepat besok
    const tgl = document.getElementById('v-date');
    if (tgl) {
        const besok = new Date(hariIni); besok.setDate(besok.getDate() + 1);
        tgl.min = isoLokal(besok);
    }

    const tanggalPanjang = (iso) => {
        const [th, bl, tg] = iso.split('-').map(Number);
        return new Date(th, bl - 1, tg).toLocaleDateString('id-ID', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
    };

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const nilai = (id) => (document.getElementById(id)?.value || '').trim();
        const sesi = form.querySelector('input[name="sesi"]:checked');
        const [th, bl, tg] = nilai('v-dob').split('-');
        const pesan =
`Halo Tim Admisi Sedaya Bintang,

Saya ingin menjadwalkan School Visit:

• Tanggal: ${tanggalPanjang(nilai('v-date'))}
• Sesi: ${sesi ? sesi.value : '-'}

• Nama orang tua: ${nilai('v-parent')}
• Nomor WhatsApp: ${nilai('v-phone')}
• Nama calon murid: ${nilai('v-child')}
• Tanggal lahir: ${tg}/${bl}/${th}
• Jenjang: ${nilai('v-grade')}

Mohon konfirmasi jadwalnya. Terima kasih.`;

        window.bukaWhatsApp(pesan);
        const status = document.getElementById('visit-status');
        if (status) status.textContent = 'WhatsApp sedang dibuka. Tekan kirim di WhatsApp supaya pesan sampai ke tim admisi.';
    });
});
