/*
 * Khusus halaman Kampus Bandung: tombol geser kiri/kanan dan titik penanda
 * pada deretan kartu "Suasana Kampus".
 */
document.addEventListener('DOMContentLoaded', function () {
    const slider = document.getElementById('suasana-slider');
    if (!slider) return;

    const prevBtn = document.getElementById('suasana-prev');
    const nextBtn = document.getElementById('suasana-next');
    const dots = document.querySelectorAll('#suasana-dots span');
    const cards = slider.querySelectorAll('.slider-card');
    const tanpaAnimasi = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Jarak satu kali geser = lebar satu kartu + jarak antar kartu
    function langkah() {
        if (cards.length < 2) return 320;
        return cards[1].offsetLeft - cards[0].offsetLeft;
    }

    function geser(arah) {
        slider.scrollBy({ left: arah * langkah(), behavior: tanpaAnimasi ? 'auto' : 'smooth' });
    }

    function perbarui() {
        const posisi = slider.scrollLeft;
        const maks = slider.scrollWidth - slider.clientWidth;
        if (prevBtn) prevBtn.disabled = posisi <= 10;
        if (nextBtn) nextBtn.disabled = posisi >= maks - 10;

        // Kartu yang paling dekat dengan tepi kiri dianggap kartu aktif
        let aktif = 0;
        let selisihTerkecil = Infinity;
        cards.forEach(function (kartu, i) {
            const selisih = Math.abs(kartu.offsetLeft - cards[0].offsetLeft - posisi);
            if (selisih < selisihTerkecil) { selisihTerkecil = selisih; aktif = i; }
        });
        if (posisi >= maks - 10) aktif = cards.length - 1;

        dots.forEach(function (titik, i) {
            const nyala = i === aktif;
            titik.classList.toggle('w-7', nyala);
            titik.classList.toggle('bg-brand-primary', nyala);
            titik.classList.toggle('w-2.5', !nyala);
            titik.classList.toggle('bg-gray-300', !nyala);
        });
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { geser(-1); });
    if (nextBtn) nextBtn.addEventListener('click', function () { geser(1); });
    slider.addEventListener('scroll', perbarui, { passive: true });
    window.addEventListener('resize', perbarui);
    perbarui();
});
