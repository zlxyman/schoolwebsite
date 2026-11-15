/*
 * Komponen bersama: navbar, menu HP, footer, dan tombol "Akses Cepat".
 * Diisi otomatis ke <div id="app-navbar"> dan <div id="app-footer">.
 * Semua interaksi dipasang lewat event listener (tanpa onclick di HTML).
 */

/* ---------- DATA YANG BOLEH DIUBAH PEMILIK ---------- */
const SITUS = {
    // Isi path logo setelah file logo diunggah, contoh: 'assets/images/logo-sedaya-bintang.webp'.
    // Selama kosong, nama sekolah tampil sebagai teks.
    logo: '',
    whatsapp: '6281389772288',
    whatsappTampil: '+62 813-8977-2288',
    email: 'info.sekolah@sedayabintang.sch.id',
    alamat: 'Jl. Gedebage Utama Kel Blok GBU/009, Rancabolang, Kec. Gedebage, Kota Bandung, Jawa Barat 40295',
    // Isi alamat lengkap akun (https://...). Yang kosong tidak ditampilkan.
    instagram: '',
    youtube: '',
    facebook: ''
};
window.SITUS = SITUS;

const WA_ADMISI = `https://wa.me/${SITUS.whatsapp}?text=${encodeURIComponent('Halo Admin Sekolah Terpadu Sedaya Bintang, saya ingin bertanya tentang pendaftaran.')}`;

/* ---------- POTONGAN TEMPLATE ---------- */
function logoHTML(kelasGambar, kelasTeks) {
    if (SITUS.logo) {
        return `<img src="${SITUS.logo}" alt="Sekolah Terpadu Sedaya Bintang" width="200" height="60" class="${kelasGambar} w-auto object-contain">`;
    }
    return `<span class="${kelasTeks} flex items-center gap-2 font-extrabold tracking-tight text-brand-primary leading-none">
                <i class="fa-solid fa-star text-brand-yellow" aria-hidden="true"></i>
                <span>Sedaya Bintang</span>
            </span>`;
}

function megaLink(href, ikon, judul, ket) {
    return `<a href="${href}" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-colors duration-300">
                <span class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-colors"><i class="fa-solid ${ikon} text-lg" aria-hidden="true"></i></span>
                <span class="block font-bold text-brand-primary mb-1">${judul}</span>
                <span class="block text-xs text-gray-600 leading-snug">${ket}</span>
            </a>`;
}

function megaSegera(ikon, judul, ket) {
    return `<div class="block opacity-70 cursor-not-allowed p-4 rounded-2xl border border-transparent">
                <span class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-gray-500"><i class="fa-solid ${ikon} text-lg" aria-hidden="true"></i></span>
                <span class="block font-bold text-gray-600 mb-1">${judul} <span class="text-[10px] bg-brand-yellow text-brand-primary px-1.5 py-0.5 rounded-full ml-1 font-bold">SOON</span></span>
                <span class="block text-xs text-gray-600 leading-snug">${ket}</span>
            </div>`;
}

function navItem(id, label, lebar, kolom, isi) {
    return `<div class="nav-item group h-full flex items-center">
                <button type="button" id="nav-${id}" aria-expanded="false" aria-controls="mega-${id}" class="nav-trigger relative h-full flex items-center gap-1.5 text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors cursor-pointer">
                    ${label} <i class="fa-solid fa-angle-down text-xs mt-0.5 transition-transform duration-300 group-hover:rotate-180" aria-hidden="true"></i>
                    <span class="nav-underline"></span>
                </button>
                <div id="mega-${id}" class="mega-menu absolute top-[100%] left-1/2 ${lebar} max-w-[90vw] bg-white shadow-2xl rounded-b-2xl border border-gray-100 overflow-hidden pt-2 pb-6">
                    <div class="px-8 pt-4 grid ${kolom} gap-4">${isi}</div>
                </div>
            </div>`;
}

function mobileGrup(id, label, ikon, isi) {
    return `<div class="rounded-xl border border-gray-100 overflow-hidden bg-white">
                <button type="button" id="mnav-${id}" aria-expanded="false" aria-controls="${id}-mobile" data-accordion="${id}-mobile" class="mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 font-bold text-gray-700 hover:text-brand-primary transition-colors duration-200">
                    <span class="flex items-center gap-3"><span class="mobile-nav-icon w-8 h-8 rounded-lg bg-brand-gray text-brand-primary flex items-center justify-center text-sm"><i class="fa-solid ${ikon}" aria-hidden="true"></i></span><span>${label}</span></span>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-500 transition-transform duration-300" id="${id}-mobile-icon" aria-hidden="true"></i>
                </button>
                <div id="${id}-mobile" class="mobile-accordion-content bg-gray-50/80 px-3 space-y-1 border-t border-gray-100/60">${isi}</div>
            </div>`;
}

function mobileLink(href, ikon, label) {
    return `<a href="${href}" class="text-sm font-semibold text-gray-700 hover:text-brand-primary flex items-center gap-3 py-3 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid ${ikon} w-5 text-center text-brand-primary" aria-hidden="true"></i> ${label}</a>`;
}

/* ---------- NAVBAR ---------- */
const navbarTemplate = `
    <a href="#konten-utama" class="skip-link">Lewati ke isi halaman</a>
    <header class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-shadow duration-300" id="main-header">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 relative flex justify-between items-center">

            <div class="flex-shrink-0 flex items-center">
                <a href="index.html" class="logo-home-link group relative flex items-center gap-2.5 min-h-[44px]" aria-label="Sekolah Terpadu Sedaya Bintang, kembali ke beranda">
                    ${logoHTML('h-10 lg:h-12', 'text-lg lg:text-xl')}
                </a>
            </div>

            <nav class="hidden lg:flex flex-1 justify-center space-x-7 h-full items-center z-50" aria-label="Menu utama">
                ${navItem('about', 'About', 'w-[540px]', 'grid-cols-2',
                    megaLink('about.html', 'fa-school', 'Tentang Kami', 'Profil dan sambutan kepala sekolah.') +
                    megaLink('prestasi-siswa.html', 'fa-trophy', 'Prestasi Murid', 'Catatan prestasi murid.'))}
                ${navItem('admissions', 'Admissions', 'w-[880px]', 'grid-cols-4',
                    megaLink('apply.html', 'fa-pen-to-square', 'Apply', 'Pendaftaran murid baru.') +
                    megaLink('school-visit.html', 'fa-school', 'School Visit', 'Jadwalkan kunjungan sekolah.') +
                    megaLink('admissions.html', 'fa-book-open-reader', 'Admission Guideline', 'Info pendaftaran.') +
                    megaSegera('fa-vr-cardboard', '360 Virtual Tour', 'Lihat sekolah secara virtual.'))}
                ${navItem('academics', 'Academics', 'w-[800px]', 'grid-cols-4',
                    megaLink('preschool.html', 'fa-cubes-stacked', 'Preschool & Kiddy', 'KB dan TK, usia 2–6 tahun.') +
                    megaLink('primary.html', 'fa-child-reaching', 'Primary School', 'Sekolah Dasar.') +
                    megaSegera('fa-user-graduate', 'Junior High', 'Rencana pengembangan.') +
                    megaSegera('fa-graduation-cap', 'Senior High', 'Rencana pengembangan.'))}
                ${navItem('programs', 'Programs', 'w-[1100px]', 'grid-cols-6',
                    megaLink('kurikulum.html', 'fa-book-bookmark', 'Kurikulum', 'Nasional dan internasional.') +
                    megaLink('budi-pekerti.html', 'fa-heart', 'Budi Pekerti', 'Sikap dan sopan santun.') +
                    megaLink('tribahasa.html', 'fa-earth-asia', 'Trilingual', 'Mandarin, Inggris, Indonesia.') +
                    megaLink('steam.html', 'fa-flask', 'STEAM', 'Sains sampai matematika.') +
                    megaLink('fasilitas.html', 'fa-building', 'Fasilitas', 'Ruang belajar dan bermain.') +
                    megaLink('games.html', 'fa-gamepad', 'Mini Games', 'Belajar sambil bermain.'))}
                ${navItem('campus', 'Campus', 'w-[600px]', 'grid-cols-2',
                    megaLink('kampus-bandung.html', 'fa-map-location-dot', 'Summarecon Bandung', 'Kampus pertama di Gedebage.') +
                    megaSegera('fa-map-location-dot', 'Summarecon Bogor', 'Masih dalam rencana.'))}
            </nav>

            <div class="hidden lg:flex items-center gap-3">
                <a href="karir.html" class="text-sm font-bold text-gray-700 hover:text-brand-primary transition-colors px-2 min-h-[44px] flex items-center">Karir</a>
                <a href="apply.html" class="bg-brand-yellow text-brand-primary font-extrabold px-7 py-3 rounded-full hover:bg-brand-primary hover:text-white transition-colors duration-300 shadow-sm text-sm">
                    Daftar Sekarang
                </a>
            </div>

            <div class="lg:hidden flex items-center">
                <button type="button" id="mobile-menu-btn" aria-label="Buka menu" aria-expanded="false" aria-controls="mobile-drawer" class="w-11 h-11 rounded-xl bg-gray-50 hover:bg-brand-primary hover:text-white text-brand-primary border border-gray-100 flex items-center justify-center transition-colors duration-300 active:scale-95">
                    <i id="hamburger-icon" class="fa-solid fa-bars text-xl transition-transform duration-300 ease-in-out" aria-hidden="true"></i>
                </button>
            </div>
        </div>
    </header>

    <div id="mobile-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>

    <aside id="mobile-drawer" inert role="dialog" aria-modal="true" aria-label="Menu" class="fixed top-0 right-0 h-full w-[88vw] max-w-[380px] bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-300 flex flex-col lg:hidden border-l border-gray-100">
        <div class="flex items-center justify-between px-6 h-20 border-b border-gray-100 bg-white/90 shrink-0">
            <a href="index.html" class="flex items-center gap-2 min-h-[44px]" aria-label="Beranda Sekolah Terpadu Sedaya Bintang">
                ${logoHTML('h-8', 'text-base')}
            </a>
            <button type="button" id="close-drawer-btn" aria-label="Tutup menu" class="w-11 h-11 rounded-xl bg-gray-50 hover:bg-brand-primary hover:text-white text-gray-600 border border-gray-100 flex items-center justify-center transition-colors duration-300 active:scale-95">
                <i class="fa-solid fa-xmark text-lg" aria-hidden="true"></i>
            </button>
        </div>

        <nav class="flex-1 overflow-y-auto px-6 py-6 space-y-2" aria-label="Menu utama">
            <a href="index.html" id="mnav-home" class="mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-gray transition-colors duration-200">
                <span class="mobile-nav-icon w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-sm"><i class="fa-solid fa-house" aria-hidden="true"></i></span>
                <span>Beranda</span>
            </a>
            ${mobileGrup('about', 'About', 'fa-circle-info',
                mobileLink('about.html', 'fa-school', 'Tentang Kami') +
                mobileLink('prestasi-siswa.html', 'fa-trophy', 'Prestasi Murid'))}
            ${mobileGrup('admissions', 'Admissions', 'fa-address-card',
                mobileLink('apply.html', 'fa-pen-to-square', 'Apply (Pendaftaran)') +
                mobileLink('school-visit.html', 'fa-school', 'School Visit') +
                mobileLink('admissions.html', 'fa-book-open-reader', 'Admission Guideline'))}
            ${mobileGrup('academics', 'Academics', 'fa-graduation-cap',
                mobileLink('preschool.html', 'fa-cubes-stacked', 'Preschool & Kiddy') +
                mobileLink('primary.html', 'fa-child-reaching', 'Primary School'))}
            ${mobileGrup('programs', 'Programs', 'fa-layer-group',
                mobileLink('kurikulum.html', 'fa-book-bookmark', 'Kurikulum') +
                mobileLink('budi-pekerti.html', 'fa-heart', 'Budi Pekerti') +
                mobileLink('tribahasa.html', 'fa-earth-asia', 'Trilingual') +
                mobileLink('steam.html', 'fa-flask', 'STEAM') +
                mobileLink('fasilitas.html', 'fa-building', 'Fasilitas') +
                mobileLink('games.html', 'fa-gamepad', 'Mini Games'))}
            ${mobileGrup('campus', 'Campus', 'fa-map-location-dot',
                mobileLink('kampus-bandung.html', 'fa-map-location-dot', 'Summarecon Bandung') +
                `<div class="text-sm font-semibold text-gray-600 flex items-center gap-3 py-3 px-3 rounded-lg cursor-not-allowed"><i class="fa-solid fa-map-location-dot w-5 text-center text-gray-400" aria-hidden="true"></i> Summarecon Bogor <span class="text-[10px] bg-brand-yellow text-brand-primary px-1.5 py-0.5 rounded-full ml-1 font-bold">SOON</span></div>`)}
            <a href="karir.html" id="mnav-karir" class="mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-gray transition-colors duration-200">
                <span class="mobile-nav-icon w-8 h-8 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center text-sm"><i class="fa-solid fa-briefcase" aria-hidden="true"></i></span>
                <span>Karir</span>
            </a>
        </nav>

        <div class="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <a href="apply.html" class="flex items-center justify-center gap-2.5 w-full bg-brand-yellow text-brand-primary font-extrabold px-6 py-4 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-colors duration-300 text-base">
                <span>Daftar Sekarang</span> <i class="fa-solid fa-arrow-right" aria-hidden="true"></i>
            </a>
        </div>
    </aside>
`;

/* ---------- FOOTER ---------- */
function sosmedHTML() {
    const daftar = [
        ['instagram', 'fa-instagram', 'Instagram Sedaya Bintang'],
        ['youtube', 'fa-youtube', 'YouTube Sedaya Bintang'],
        ['facebook', 'fa-facebook-f', 'Facebook Sedaya Bintang']
    ].filter(([kunci]) => SITUS[kunci]);
    if (!daftar.length) return '';
    return `<div class="flex gap-3">` + daftar.map(([kunci, ikon, label]) =>
        `<a href="${SITUS[kunci]}" target="_blank" rel="noopener noreferrer" aria-label="${label} (buka tab baru)" class="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-primary transition-colors"><i class="fa-brands ${ikon}" aria-hidden="true"></i></a>`
    ).join('') + `</div>`;
}

const footerTemplate = `
    <footer class="bg-brand-primary text-white pt-16 lg:pt-20 pb-24 lg:pb-10 mt-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
                <div class="lg:col-span-1">
                    <div class="bg-white px-3 py-2.5 rounded-xl inline-block mb-4 lg:mb-6">
                        ${logoHTML('h-8 lg:h-10', 'text-base')}
                    </div>
                    <p class="text-blue-100 text-sm leading-relaxed mb-6">Sekolah Terpadu Sedaya Bintang adalah sekolah terpadu untuk jenjang KB, TK, dan SD. Berafiliasi dengan Sekolah Terpadu Pahoa dan bagian dari PT Summarecon Agung Tbk. Jenjang SMP dan SMA akan dibuka secara bertahap.</p>
                    ${sosmedHTML()}
                </div>
                <nav aria-label="Tautan cepat">
                    <h2 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Tautan Cepat</h2>
                    <ul class="space-y-1 text-sm text-blue-100">
                        <li><a href="index.html" class="inline-block py-1.5 hover:text-white transition-colors">Beranda</a></li>
                        <li><a href="about.html" class="inline-block py-1.5 hover:text-white transition-colors">Tentang Kami</a></li>
                        <li><a href="admissions.html" class="inline-block py-1.5 hover:text-white transition-colors">Info Pendaftaran</a></li>
                        <li><a href="school-visit.html" class="inline-block py-1.5 hover:text-white transition-colors">School Visit</a></li>
                        <li><a href="karir.html" class="inline-block py-1.5 hover:text-white transition-colors">Karir</a></li>
                    </ul>
                </nav>
                <div>
                    <h2 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Kampus Summarecon Bandung</h2>
                    <ul class="space-y-3 text-sm text-blue-100">
                        <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot mt-1 text-brand-yellow" aria-hidden="true"></i><span>${SITUS.alamat}</span></li>
                        <li class="flex items-center gap-3"><i class="fa-brands fa-whatsapp text-brand-yellow" aria-hidden="true"></i><a href="${WA_ADMISI}" target="_blank" rel="noopener noreferrer" class="inline-block py-1.5 hover:text-white transition-colors">${SITUS.whatsappTampil}</a></li>
                        <li class="flex items-center gap-3"><i class="fa-solid fa-envelope text-brand-yellow" aria-hidden="true"></i><a href="mailto:${SITUS.email}" class="inline-block py-1.5 hover:text-white transition-colors break-all">${SITUS.email}</a></li>
                    </ul>
                </div>
                <div>
                    <h2 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Kampus Summarecon Bogor</h2>
                    <p class="text-sm text-blue-100 leading-relaxed">Masih dalam rencana. Info akan diumumkan di website ini.</p>
                </div>
            </div>
            <div class="border-t border-white/20 pt-6 lg:pt-8 text-sm text-blue-100 text-center md:text-left">
                <p>&copy; 2026 Sekolah Terpadu Sedaya Bintang. Semua Jadi Bintang!</p>
            </div>
        </div>
    </footer>`;

/* ---------- TOMBOL AKSES CEPAT (melayang) ---------- */
function easyItem(href, ikon, warna, judul, ket, luar) {
    return `<a href="${href}" ${luar ? 'target="_blank" rel="noopener noreferrer"' : ''} class="easy-item iphone-glass-item flex items-center justify-between gap-3 p-3 rounded-2xl group">
                <span class="flex items-center gap-3">
                    <span class="w-11 h-11 rounded-xl ${warna} flex items-center justify-center shadow-md border border-white/40 shrink-0"><i class="${ikon} text-lg" aria-hidden="true"></i></span>
                    <span class="text-left">
                        <span class="block text-sm font-extrabold text-gray-900">${judul}</span>
                        <span class="block text-xs text-gray-600 font-medium">${ket}</span>
                    </span>
                </span>
                <i class="fa-solid fa-chevron-right text-xs text-gray-500" aria-hidden="true"></i>
            </a>`;
}

const easyTouchTemplate = `
    <div id="easy-touch-backdrop" class="fixed inset-0 bg-slate-900/40 backdrop-blur-md z-[90] opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <div id="easy-touch-wrapper" class="easy-touch-wrapper fixed bottom-4 right-4 md:bottom-7 md:right-7 z-[95] flex flex-col items-end transition-opacity duration-300">

        <div id="easy-touch-menu" inert class="iphone-glass-dock rounded-3xl p-4 mb-3 w-[min(340px,calc(100vw-2rem))] opacity-0 translate-y-6 scale-95 pointer-events-none transition duration-300 origin-bottom-right shadow-2xl">
            <p class="text-sm font-extrabold text-brand-primary pb-3 mb-3 border-b border-white/60">Akses Cepat</p>
            <div class="space-y-2">
                ${easyItem(WA_ADMISI, 'fa-brands fa-whatsapp', 'bg-[#128C7E] text-white', 'Chat Tim Admisi', 'Tanya lewat WhatsApp', true)}
                ${easyItem('apply.html', 'fa-solid fa-pen-to-square', 'bg-brand-yellow text-brand-primary', 'Pendaftaran Murid Baru', 'Formulir KB, TK, dan SD')}
                ${easyItem('school-visit.html', 'fa-solid fa-school', 'bg-brand-primary text-white', 'School Visit', 'Lihat sekolah secara langsung')}
                ${easyItem('games.html', 'fa-solid fa-gamepad', 'bg-brand-dark text-white', 'Mini Games', 'Belajar sambil bermain')}
                ${easyItem('index.html', 'fa-solid fa-house', 'bg-slate-100 text-slate-700', 'Beranda', 'Halaman depan')}
            </div>
        </div>

        <button type="button" id="easy-touch-btn" aria-label="Buka akses cepat" aria-expanded="false" aria-controls="easy-touch-menu" class="iphone-glass-pill flex items-center gap-3 w-14 h-14 md:w-auto md:h-auto md:py-2.5 md:pl-2.5 md:pr-5 justify-center rounded-full text-brand-primary font-bold cursor-pointer">
            <span class="w-10 h-10 rounded-full bg-brand-primary text-white flex items-center justify-center shadow-md shrink-0">
                <i id="easy-touch-icon" class="fa-solid fa-headset text-base" aria-hidden="true"></i>
            </span>
            <span id="easy-touch-label" class="hidden md:inline text-sm font-extrabold tracking-tight" aria-hidden="true">Akses Cepat</span>
        </button>
    </div>`;

/* ---------- PASANG KE HALAMAN ---------- */
function loadComponents() {
    const navbarDiv = document.getElementById('app-navbar');
    const footerDiv = document.getElementById('app-footer');

    if (navbarDiv) navbarDiv.innerHTML = navbarTemplate;
    if (footerDiv) footerDiv.innerHTML = footerTemplate;

    // Sasaran tautan "Lewati ke isi halaman"
    const main = document.querySelector('main');
    if (main && !main.id) main.id = 'konten-utama';
    if (main) main.setAttribute('tabindex', '-1');

    // Tombol Akses Cepat tidak dipasang di halaman yang memintanya (contoh: saat bermain game)
    if (!document.body.hasAttribute('data-tanpa-akses-cepat')) {
        document.body.insertAdjacentHTML('beforeend', easyTouchTemplate);
        initEasyTouch();
    }

    tandaiMenuAktif();
    initMegaMenu();
    initMenuHP();
}

/* Menandai menu halaman yang sedang dibuka (data-page pada <body>) */
function tandaiMenuAktif() {
    const currentPage = document.body.getAttribute('data-page');
    if (!currentPage) return;
    const aktifKelas = ['font-extrabold', 'text-brand-primary', 'bg-brand-yellow/15'];

    const activeMNav = document.getElementById('mnav-' + (currentPage === 'prestasi' ? 'about' : currentPage));
    if (activeMNav) {
        activeMNav.classList.remove('text-gray-700');
        activeMNav.classList.add(...aktifKelas);
        if (activeMNav.tagName === 'A') activeMNav.setAttribute('aria-current', 'page');
        const iconSpan = activeMNav.querySelector('.mobile-nav-icon');
        if (iconSpan) iconSpan.className = 'mobile-nav-icon w-8 h-8 rounded-lg bg-brand-yellow text-brand-primary flex items-center justify-center text-sm font-bold';
    }

    const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.mobile-accordion-content a, .mega-menu a').forEach(link => {
        if (link.getAttribute('href') !== currentFileName) return;
        link.setAttribute('aria-current', 'page');
        const accordion = link.closest('.mobile-accordion-content');
        if (!accordion) return;
        link.classList.remove('text-gray-700');
        link.classList.add('text-brand-primary', 'font-bold', 'bg-brand-primary/5');
        bukaAccordion(accordion.id, true);
    });

    const activeNav = document.getElementById('nav-' + (currentPage === 'prestasi' ? 'about' : currentPage));
    if (activeNav) {
        activeNav.classList.remove('text-gray-700');
        activeNav.classList.add('text-brand-primary', 'nav-aktif');
    }
}

/* Menu desktop: bisa dibuka dengan mouse, klik, sentuhan, dan keyboard */
function initMegaMenu() {
    const items = document.querySelectorAll('.nav-item');
    const tutupSemua = (kecuali) => items.forEach(item => {
        if (item === kecuali) return;
        item.classList.remove('terbuka');
        const t = item.querySelector('.nav-trigger');
        if (t) t.setAttribute('aria-expanded', 'false');
    });
    items.forEach(item => {
        const trigger = item.querySelector('.nav-trigger');
        if (!trigger) return;
        const setel = (buka) => {
            item.classList.toggle('terbuka', buka);
            trigger.setAttribute('aria-expanded', String(buka));
            if (buka) tutupSemua(item);
        };
        trigger.addEventListener('click', () => setel(!item.classList.contains('terbuka')));
        item.addEventListener('mouseenter', () => trigger.setAttribute('aria-expanded', 'true'));
        item.addEventListener('mouseleave', () => setel(false));
        item.addEventListener('focusout', (e) => { if (!item.contains(e.relatedTarget)) setel(false); });
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') { setel(false); trigger.focus(); }
        });
    });
    document.addEventListener('click', (e) => { if (!e.target.closest('.nav-item')) tutupSemua(null); });
}

/* Menu HP (laci dari kanan) */
function bukaAccordion(id, buka) {
    const submenu = document.getElementById(id);
    const tombol = document.querySelector(`[data-accordion="${id}"]`);
    const ikon = document.getElementById(id + '-icon');
    if (!submenu) return;
    submenu.classList.toggle('open', buka);
    if (tombol) tombol.setAttribute('aria-expanded', String(buka));
    if (ikon) ikon.classList.toggle('rotate-180', buka);
}

function initMenuHP() {
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    const closeBtn = document.getElementById('close-drawer-btn');
    const hamburgerIcon = document.getElementById('hamburger-icon');
    if (!btn || !drawer) return;

    const setel = (buka) => {
        drawer.classList.toggle('translate-x-full', !buka);
        drawer.classList.toggle('translate-x-0', buka);
        drawer.toggleAttribute('inert', !buka);
        if (backdrop) {
            backdrop.classList.toggle('opacity-0', !buka);
            backdrop.classList.toggle('pointer-events-none', !buka);
        }
        if (hamburgerIcon) {
            hamburgerIcon.classList.toggle('fa-bars', !buka);
            hamburgerIcon.classList.toggle('fa-xmark', buka);
        }
        btn.setAttribute('aria-expanded', String(buka));
        btn.setAttribute('aria-label', buka ? 'Tutup menu' : 'Buka menu');
        document.body.classList.toggle('menu-terbuka', buka);
        document.body.style.overflow = buka ? 'hidden' : '';
        if (buka && closeBtn) closeBtn.focus();
        if (!buka && drawer.contains(document.activeElement)) btn.focus();
    };
    const terbuka = () => drawer.classList.contains('translate-x-0');

    window.openMobileMenu = () => setel(true);
    window.closeMobileMenu = () => setel(false);

    btn.addEventListener('click', () => setel(!terbuka()));
    if (closeBtn) closeBtn.addEventListener('click', () => setel(false));
    if (backdrop) backdrop.addEventListener('click', () => setel(false));
    document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && terbuka()) setel(false); });

    drawer.querySelectorAll('[data-accordion]').forEach(tombol => {
        tombol.addEventListener('click', () => {
            const id = tombol.getAttribute('data-accordion');
            const sedangBuka = document.getElementById(id).classList.contains('open');
            drawer.querySelectorAll('[data-accordion]').forEach(t => bukaAccordion(t.getAttribute('data-accordion'), false));
            bukaAccordion(id, !sedangBuka);
        });
    });
}

/* Tombol Akses Cepat */
function initEasyTouch() {
    const wrapper = document.getElementById('easy-touch-wrapper');
    const easyBtn = document.getElementById('easy-touch-btn');
    const easyBackdrop = document.getElementById('easy-touch-backdrop');
    const easyMenu = document.getElementById('easy-touch-menu');
    const easyIcon = document.getElementById('easy-touch-icon');
    const easyLabel = document.getElementById('easy-touch-label');
    if (!easyBtn || !easyBackdrop || !easyMenu) return;

    let terbuka = false;
    const setel = (buka) => {
        terbuka = buka;
        easyBackdrop.classList.toggle('opacity-0', !buka);
        easyBackdrop.classList.toggle('pointer-events-none', !buka);
        easyMenu.classList.toggle('opacity-0', !buka);
        easyMenu.classList.toggle('translate-y-6', !buka);
        easyMenu.classList.toggle('scale-95', !buka);
        easyMenu.classList.toggle('pointer-events-none', !buka);
        easyMenu.toggleAttribute('inert', !buka);
        easyBtn.setAttribute('aria-expanded', String(buka));
        easyBtn.setAttribute('aria-label', buka ? 'Tutup akses cepat' : 'Buka akses cepat');
        if (easyIcon) {
            easyIcon.classList.toggle('fa-headset', !buka);
            easyIcon.classList.toggle('fa-xmark', buka);
        }
        if (easyLabel) easyLabel.textContent = buka ? 'Tutup' : 'Akses Cepat';
        if (buka) { const pertama = easyMenu.querySelector('a'); if (pertama) pertama.focus(); }
    };

    easyBtn.addEventListener('click', () => setel(!terbuka));
    easyBackdrop.addEventListener('click', () => setel(false));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && terbuka) { setel(false); easyBtn.focus(); }
    });
    easyMenu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => setel(false)));

    // Saat pengunjung mengisi formulir, tombol disembunyikan supaya tidak menutupi kolom dan tombol kirim
    const kolom = 'input, select, textarea';
    document.addEventListener('focusin', (e) => { if (e.target.matches && e.target.matches(kolom)) wrapper.classList.add('tersembunyi'); });
    document.addEventListener('focusout', (e) => { if (e.target.matches && e.target.matches(kolom)) wrapper.classList.remove('tersembunyi'); });
}

// Dijalankan langsung saat file ini dimuat (posisi <script> di akhir <body>)
loadComponents();
