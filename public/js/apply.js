/**
 * Apply / Pendaftaran Page JavaScript
 * Sekolah Terpadu Sedaya Bintang
 * Menangani formulir pendataan awal dan redirect ke WhatsApp resmi admisi.
 */

document.addEventListener('DOMContentLoaded', () => {
    initDobRestriction();
    initApplyForm();
});

/**
 * Batasi input tanggal lahir hanya sampai hari ini (tidak bisa tanggal masa depan)
 */
function initDobRestriction() {
    const dobInput = document.getElementById('wa-dob');
    if (!dobInput) return;

    const today = new Date().toISOString().split('T')[0];
    dobInput.setAttribute('max', today);

    // Set batas minimal realistis untuk pendaftaran KB-SD (sekitar 12 tahun lalu)
    const minYear = new Date().getFullYear() - 15;
    dobInput.setAttribute('min', `${minYear}-01-01`);
}

/**
 * Inisialisasi formulir pendaftaran
 */
function initApplyForm() {
    const form = document.getElementById('apply-form');
    if (!form) return;

    form.addEventListener('submit', handleApplySubmit);
}

/**
 * Handler submit form & formatting pesan WhatsApp resmi
 */
function handleApplySubmit(e) {
    e.preventDefault();

    const parentName = document.getElementById('wa-parent')?.value.trim() || '';
    const childName = document.getElementById('wa-child')?.value.trim() || '';
    const dob = document.getElementById('wa-dob')?.value || '';
    const grade = document.getElementById('wa-grade')?.value || '';
    const phone = document.getElementById('wa-phone')?.value.trim() || '';
    const source = document.getElementById('wa-source')?.value || '';

    // Validasi sederhana
    if (!parentName || !childName || !dob || !grade || !phone || !source) {
        alert('Mohon lengkapi seluruh kolom formulir pendataan sebelum mengirim.');
        return;
    }

    // Format tanggal DD/MM/YYYY
    let formattedDob = dob;
    const parts = dob.split('-');
    if (parts.length === 3) {
        formattedDob = `${parts[2]}/${parts[1]}/${parts[0]}`;
    }

    // Nomor WhatsApp Resmi Admisi Sekolah Terpadu Sedaya Bintang
    const waNumber = '6281389772288';

    // Format Pesan WhatsApp yang Terstruktur, Sopan, dan Informatif
    const waMessage = 
`Halo Tim Admisi Sekolah Terpadu Sedaya Bintang,

Saya ingin melakukan pendataan awal untuk penerimaan murid baru dengan informasi berikut:

*Data Calon Murid & Orang Tua:*
• *Nama Orang Tua / Wali:* ${parentName}
• *Nomor WhatsApp Aktif:* ${phone}
• *Nama Ananda:* ${childName}
• *Tanggal Lahir Ananda:* ${formattedDob}
• *Minat Jenjang:* ${grade}
• *Mengetahui Sedaya Bintang dari:* ${source}

Mohon informasi lebih lanjut mengenai ketersediaan kuota dan tahapan pendaftaran selanjutnya. Terima kasih.`;

    // Encode URL
    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;

    // Tampilkan umpan balik visual sesaat pada tombol
    const submitBtn = document.getElementById('wa-submit-btn');
    if (submitBtn) {
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<i class="fa-solid fa-spinner fa-spin text-xl"></i> <span>Membuka WhatsApp...</span>`;

        setTimeout(() => {
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }, 3000);
    }

    // Buka WhatsApp di tab / aplikasi baru
    window.open(waUrl, '_blank');
}
