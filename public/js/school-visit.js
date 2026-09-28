/**
 * ==========================================================================
 * JS KHUSUS: SCHOOL VISIT - SEKOLAH TERPADU SEDAYA BINTANG
 * Arsitektur: Modular Page-Specific Script (Clean & Encapsulated)
 * Menangani pemilihan kartu tanggal, sesi waktu, validasi input, dan integrasi WhatsApp.
 * ==========================================================================
 */

// Global function agar bisa dipanggil via onclick="selectCard(this, 'date', '...')"
window.selectCard = function(element, type, value) {
    if (element.classList.contains('disabled')) return;

    // Hapus status active dari semua kartu dengan tipe yang sama
    const siblings = document.querySelectorAll(`.${type}-card`);
    siblings.forEach(el => el.classList.remove('active'));

    // Tambahkan status active ke kartu yang diklik
    element.classList.add('active');

    // Masukkan nilai ke hidden input
    const inputTarget = document.getElementById(`v-${type}`);
    if (inputTarget) {
        inputTarget.value = value;
    }

    // Sembunyikan pesan peringatan jika sebelumnya muncul
    const errorTarget = document.getElementById(`error-${type}`);
    if (errorTarget) {
        errorTarget.classList.add('hidden');
    }
};

// Global function submit WhatsApp agar kompatibel dengan onsubmit="sendVisitToWhatsApp(event)"
window.sendVisitToWhatsApp = function(e) {
    if (e && e.preventDefault) e.preventDefault();

    // Validasi input kartu tanggal & sesi waktu
    const dateInput = document.getElementById('v-date');
    const timeInput = document.getElementById('v-time');
    const dateValue = dateInput ? dateInput.value : '';
    const timeValue = timeInput ? timeInput.value : '';
    let isValid = true;

    const errorDate = document.getElementById('error-date');
    const errorTime = document.getElementById('error-time');

    if (!dateValue) {
        if (errorDate) errorDate.classList.remove('hidden');
        isValid = false;
    } else {
        if (errorDate) errorDate.classList.add('hidden');
    }

    if (!timeValue) {
        if (errorTime) errorTime.classList.remove('hidden');
        isValid = false;
    } else {
        if (errorTime) errorTime.classList.add('hidden');
    }

    if (!isValid) {
        const firstError = !dateValue ? errorDate : errorTime;
        if (firstError) {
            firstError.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
        return false;
    }

    // Ambil data formulir
    const parentName = document.getElementById('v-parent')?.value.trim() || '';
    const childName = document.getElementById('v-child')?.value.trim() || '';
    const dob = document.getElementById('v-dob')?.value || '';
    const grade = document.getElementById('v-grade')?.value || '';
    const phone = document.getElementById('v-phone')?.value.trim() || '';

    // Format tanggal lahir ananda (DD/MM/YYYY)
    let formattedDob = "-";
    if (dob) {
        const dateParts = dob.split('-');
        if (dateParts.length === 3) {
            formattedDob = `${dateParts[2]}/${dateParts[1]}/${dateParts[0]}`;
        }
    }

    // Nomor WhatsApp Resmi Tim Admisi Sedaya Bintang
    const waNumber = "6281389772288";

    // Format pesan ramah dan profesional
    let waMessage = `Halo Tim Admisi Sedaya Bintang,\n\n`;
    waMessage += `Saya ingin mengonfirmasi jadwal reservasi *School Visit* dengan rincian berikut:\n\n`;
    waMessage += `*JADWAL KUNJUNGAN:*\n`;
    waMessage += `📅 Tanggal : ${dateValue}\n`;
    waMessage += `⏰ Sesi Waktu : ${timeValue}\n\n`;
    waMessage += `*DATA PENGUNJUNG:*\n`;
    waMessage += `👤 Nama Orang Tua : ${parentName}\n`;
    waMessage += `📱 Nomor WA : ${phone}\n`;
    waMessage += `👦/👧 Nama Ananda : ${childName}\n`;
    waMessage += `🎂 Tanggal Lahir : ${formattedDob}\n`;
    waMessage += `🎓 Minat Jenjang : ${grade}\n\n`;
    waMessage += `Mohon konfirmasi ketersediaan kuota untuk jadwal tersebut. Terima kasih!`;

    // Encode URL & Buka Tab Baru
    const encodedMessage = encodeURIComponent(waMessage);
    const waUrl = `https://wa.me/${waNumber}?text=${encodedMessage}`;
    window.open(waUrl, '_blank');
    return false;
};

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    // Validasi visual warna teks tanggal lahir
    const dobInput = document.getElementById('v-dob');
    if (dobInput) {
        dobInput.addEventListener('change', function() {
            if (this.value) {
                this.classList.remove('text-gray-500');
                this.classList.add('text-gray-800');
            } else {
                this.classList.remove('text-gray-800');
                this.classList.add('text-gray-500');
            }
        });

        // Batasi tanggal lahir hanya sampai hari ini (tidak bisa masa depan)
        const today = new Date().toISOString().split('T')[0];
        dobInput.setAttribute('max', today);
    }
});
