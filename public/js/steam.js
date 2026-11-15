/**
 * STEAM Page JavaScript - Sekolah Terpadu Sedaya Bintang
 * Modular, clean, non-bloated, and accessible.
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Ambient Cosmic Star Field for Hero Section
    initCosmicStars();

    // 2. Interactive 5 Elements STEAM Modal Details
    initSteamModal();

    // 3. Bridging Section Interactive Preview Switcher
    initBridgingPreview();
});

/**
 * Generates lightweight ambient twinkle stars inside #space-bg
 */
function initCosmicStars() {
    const spaceBg = document.getElementById('space-bg');
    if (!spaceBg) return;

    // Avoid multiple generations if already populated
    if (spaceBg.querySelectorAll('.star-particle').length > 0) return;

    const starCount = window.innerWidth < 640 ? 30 : 60;
    const fragment = document.createDocumentFragment();

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star-particle';
        const size = (Math.random() * 2.5 + 1).toFixed(1);
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.top = `${(Math.random() * 100).toFixed(1)}%`;
        star.style.left = `${(Math.random() * 100).toFixed(1)}%`;
        star.style.setProperty('--duration', `${(Math.random() * 3 + 2.5).toFixed(1)}s`);
        star.style.animationDelay = `${(Math.random() * 4).toFixed(1)}s`;
        fragment.appendChild(star);
    }

    spaceBg.appendChild(fragment);
}

/**
 * Data and logic for 5 Elements STEAM Interactive Details Modal
 */
const steamDetailsData = {
    science: {
        title: 'Science (Sains Alam & Pengamatan)',
        badge: 'Inkuiri & Eksplorasi',
        icon: 'fa-flask',
        color: 'text-brand-primary',
        bgColor: 'bg-blue-50',
        summary: 'Mendorong rasa ingin tahu alami si kecil dengan mengamati fenomena sekitar, menguji dugaan sederhana, dan mencatat hasil pengamatan sesuai yang dilihat.',
        preschool: 'Eksplorasi sensorik, pengenalan siklus tanaman di Roof Garden, mengenal sifat air, bayangan, dan pengamatan cuaca harian.',
        primary: 'Penerapan kurikulum Pearson Edexcel iPrimary Science: metode ilmiah terstruktur, ekosistem, materi dan perubahannya, serta eksperimen laboratorium sederhana.',
        activity: 'Kegiatan "Detektif Tanaman" dan simulasi daur air sederhana di kelas.'
    },
    technology: {
        title: 'Technology (Teknologi & Literasi Digital)',
        badge: 'Literasi & Tanggung Jawab',
        icon: 'fa-microchip',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        summary: 'Mengenalkan perangkat komputasi sebagai media berkarya dan sarana mengolah informasi secara aman, cerdas, dan bertanggung jawab sejak dini.',
        preschool: 'Pengenalan pola algoritma unplugged (tanpa layar), konsep sebab-akibat sederhana melalui teka-teki logika fisik.',
        primary: 'Kurikulum Pearson Edexcel Computing: dasar computational thinking, pengenalan logika blok pemrograman visual, etika internet, dan dasar pengolahan data.',
        activity: 'Menyusun urutan instruksi robotik dasar (unplugged coding) dan tantangan logika di lab komputer.'
    },
    engineering: {
        title: 'Engineering (Rekayasa & Desain Solusi)',
        badge: 'Rancang Bangun & Logika',
        icon: 'fa-gears',
        color: 'text-amber-600',
        bgColor: 'bg-amber-50',
        summary: 'Melatih kemampuan si kecil merencanakan, merancang, menguji, dan memperbaiki model fisik saat mencari jalan keluar untuk suatu masalah praktis.',
        preschool: 'Membangun jembatan balok kayu, memahami keseimbangan benda, menguji daya apung benda dengan alat peraga.',
        primary: 'Desain konstruksi ramah lingkungan, membuat purwarupa miniatur ramah beban (contoh: kincir angin mini atau menara tahan guncangan sederhana).',
        activity: 'Tantangan "Rancang Wadah Telur Tahan Jatuh" menggunakan bahan daur ulang.'
    },
    arts: {
        title: 'Arts (Seni, Estetika & Kreativitas)',
        badge: 'Imajinasi & Komunikasi Visual',
        icon: 'fa-palette',
        color: 'text-brand-red',
        bgColor: 'bg-red-50',
        summary: 'Mengharmonisasikan pemikiran analitis dengan kepekaan estetika, ilustrasi representatif, dan rasa percaya diri dalam mengutarakan karya.',
        preschool: 'Eksplorasi warna dasar, melukis dengan jemari, kolase daun kering, dan bernyanyi dengan ritme teratur.',
        primary: 'Pembuatan infografis visual karya sains, ilustrasi sketsa teknik, eksplorasi perspektif geometris, dan seni kriya terapan.',
        activity: 'Membuat buku cerita bergambar tentang petualangan astronot dan poster kampanye hemat energi.'
    },
    mathematics: {
        title: 'Mathematics (Matematika & Nalar Terstruktur)',
        badge: 'Framework Singapura',
        icon: 'fa-calculator',
        color: 'text-brand-primary',
        bgColor: 'bg-slate-100',
        summary: 'Memakai Framework Singapura untuk Matematika dan Six Elements of Teaching dari Dr. Yeap Ban Har. Si kecil belajar bertahap dari benda nyata, gambar, lalu simbol (CPA).',
        preschool: 'Mengenal bilangan melalui benda nyata (manik-manik, kubus bertumpuk), klasifikasi ukuran, dan perbandingan bentuk geometris.',
        primary: 'Pemecahan soal cerita dengan model drawing bar, logika pecahan, analisis pola data, dan penerapan hitungan dalam kehidupan sehari-hari.',
        activity: 'Simulasi mini market kelas untuk menghitung kembalian dan pemodelan pecahan dengan balok peraga.'
    }
};

function initSteamModal() {
    const modal = document.getElementById('steam-detail-modal');
    if (!modal) return;
    const AKSI = window.SedayaAksi;
    const Modal = window.SedayaModal;

    AKSI.closeSteamDetail = () => {
        modal.classList.remove('opacity-100', 'pointer-events-auto');
        modal.classList.add('opacity-0', 'pointer-events-none');
        Modal.tutup(modal);
    };

    AKSI.openSteamDetail = (key) => {
        const data = steamDetailsData[key];
        if (!data) return;

        document.getElementById('modal-element-title').textContent = data.title;
        document.getElementById('modal-element-badge').textContent = data.badge;
        document.getElementById('modal-element-summary').textContent = data.summary;
        document.getElementById('modal-element-preschool').textContent = data.preschool;
        document.getElementById('modal-element-primary').textContent = data.primary;
        document.getElementById('modal-element-activity').textContent = data.activity;

        const iconEl = document.getElementById('modal-element-icon');
        if (iconEl) {
            iconEl.className = `w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${data.bgColor} ${data.color}`;
            iconEl.innerHTML = `<i class="fa-solid ${data.icon}" aria-hidden="true"></i>`;
        }

        modal.classList.remove('opacity-0', 'pointer-events-none');
        modal.classList.add('opacity-100', 'pointer-events-auto');
        Modal.buka(modal, AKSI.closeSteamDetail);
    };

    // Klik latar gelap = tutup
    modal.addEventListener('click', (e) => {
        if (e.target === modal) AKSI.closeSteamDetail();
    });
}

/**
 * Bridging Section Interactive Preview Switcher
 */
const gamesPreviewData = [
    {
        id: 'steam-explorer',
        title: 'Astro Logic',
        tag: 'Logika & Sains 3D',
        difficulty: 'Usia 5 - 12 Tahun',
        description: 'Si kecil menyusun langkah astronot sampai ke bintang. Melatih logika dan kesabaran.',
        badgeColor: 'bg-sky-500/20 text-sky-400 border-sky-500/30',
        directLink: 'steam-minigame.html',
        image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Rocket.png'
    },
    {
        id: 'hanzi-master',
        title: 'Hanzi Master',
        tag: 'Bahasa Mandarin',
        difficulty: 'KB, TK, dan SD',
        description: 'Si kecil menyusun huruf Mandarin goresan demi goresan.',
        badgeColor: 'bg-violet-500/20 text-violet-400 border-violet-500/30',
        directLink: 'hanzi-minigame.html',
        image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Artist%20Palette.png'
    },
    {
        id: 'vocab-master',
        title: 'Tebak Kosakata',
        tag: 'Kosakata Mandarin',
        difficulty: 'Semua Jenjang',
        description: 'Si kecil menebak arti kosakata Mandarin dari gambar.',
        badgeColor: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
        directLink: 'vocab-minigame.html',
        image: 'https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Books.png'
    }
];

function initBridgingPreview() {
    const previewContainer = document.getElementById('bridge-preview-card');
    if (!previewContainer) return;

    window.SedayaAksi.selectBridgeGame = (index) => {
        const game = gamesPreviewData[index];
        if (!game) return;

        // Update tab buttons
        const tabButtons = document.querySelectorAll('.bridge-tab-btn');
        tabButtons.forEach((btn, i) => {
            btn.setAttribute('aria-pressed', String(i === index));
            if (i === index) {
                btn.className = 'bridge-tab-btn flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/15 border border-white/30 text-white font-bold transition-all shadow-md';
            } else {
                btn.className = 'bridge-tab-btn flex items-center gap-3 p-3.5 sm:p-4 rounded-2xl bg-white/5 border border-white/10 text-gray-300 hover:text-white hover:bg-white/10 font-semibold transition-all';
            }
        });

        // Update preview content with gentle fade
        previewContainer.classList.add('opacity-40', 'scale-[0.98]');
        setTimeout(() => {
            document.getElementById('bridge-pv-title').textContent = game.title;
            document.getElementById('bridge-pv-tag').textContent = game.tag;
            document.getElementById('bridge-pv-difficulty').textContent = game.difficulty;
            document.getElementById('bridge-pv-desc').textContent = game.description;
            document.getElementById('bridge-pv-img').src = game.image;
            document.getElementById('bridge-pv-img').alt = game.title;
            
            const directBtn = document.getElementById('bridge-pv-direct-btn');
            if (directBtn) directBtn.href = game.directLink;

            previewContainer.classList.remove('opacity-40', 'scale-[0.98]');
        }, 150);
    };
}
