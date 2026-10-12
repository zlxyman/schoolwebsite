/**
 * ============================================================================
 * HALAMAN PRESTASI SISWA - SEKOLAH TERPADU SEDAYA BINTANG
 * File: public/js/prestasi.js
 * Modul fungsionalitas persis file referensi galeri-prestasi-v7:
 * - Data Kartu Koleksi Prestasi
 * - Render Grid Card (Header Organizer, Shifted PNG, Gradient Overlay, Medals, Glassmorphism Box)
 * - 3D Pop-Up Modal (Outside Glow, Medals Stack, Subject PNG, Quote)
 * - Backdrop Click to Close & Prominent Close Button
 * - Confetti Effect & Scroll Reveal
 * ============================================================================
 */

// --- 1. DATA PRESTASI (LENGKAP DAN MENDALAM) ---
const prestasiData = [
    {
        id: 0,
        name: "Nala Santoso - SD Kelas 1",
        title: "Juara 1 Lomba Baca Puisi",
        organizer: "Dinas Pendidikan Kota Bandung",
        medalType: "gold",
        medals: [
            { type: "gold", icon: "🥇" },
            { type: "bronze", icon: "🥉" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Student%20Light%20Skin%20Tone.png",
        story: "Keberanian Nala tampil di depan umum tidak tumbuh dalam semalam. Mengikuti dua lomba sekaligus menuntut kedisiplinan tinggi. Melalui proses latihan rutin, Nala belajar mengekspresikan emosi dengan sangat baik."
    },
    {
        id: 1,
        name: "Aisha Putri - SD Kelas 2",
        title: "Olimpiade Matematika Pemula",
        organizer: "Asosiasi Pendidik Logika Nasional",
        medalType: "silver",
        medals: [
            { type: "silver", icon: "🥈" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Scientist%20Light%20Skin%20Tone.png",
        story: "Bagi Aisha, matematika bukan sekadar menghafal angka, melainkan permainan logika yang menantang. Ketekunannya dalam merunut konsep pemecahan masalah terbukti membuahkan hasil."
    },
    {
        id: 2,
        name: "Kenzo & Tim - TK B",
        title: "Penghargaan Proyek Daur Ulang",
        organizer: "Festival STEAM Anak Nusantara",
        medalType: "special",
        medals: [
            { type: "special", icon: "🏆" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Man%20Student%20Light%20Skin%20Tone.png",
        story: "Kenzo dan kelompoknya sempat mengalami kesulitan merakit purwarupa. Kemauan mereka berdiskusi dan mengulang percobaan menunjukkan kemampuan pemecahan masalah yang luar biasa di usia dini."
    },
    {
        id: 3,
        name: "Tim Futsal - SD Kelas 3",
        title: "Turnamen Futsal Persahabatan",
        organizer: "Liga Olahraga Antar Sekolah Dasar",
        medalType: "bronze",
        medals: [
            { type: "bronze", icon: "🏅" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png",
        story: "Kekompakan tim ini terlihat saat menyusun serangan di lapangan dan saling menyemangati. Nilai sportivitas dan rasa empati inilah piala sesungguhnya bagi kami."
    },
    {
        id: 4,
        name: "Tim Robotik SD Sedaya Bintang - Kelas 4 & 5",
        title: "International STEAM & Robotics Olympiad",
        organizer: "Regional Youth Robotics Asia",
        medalType: "gold",
        medals: [
            { type: "gold", icon: "🥇" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Robot.png",
        story: "Merancang robot pemilah sampah otomatis dengan sensor presisi tinggi. Proyek ini membuktikan kemampuan kolaborasi tim dan pemecahan masalah nyata demi kelestarian bumi."
    },
    {
        id: 5,
        name: "Audrey Clarissa & Tim Mandarin - SD Kelas 3",
        title: "Chinese Storytelling & HSK Cup",
        organizer: "Badan Koordinasi Pendidikan Mandarin",
        medalType: "gold",
        medals: [
            { type: "gold", icon: "🥇" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Student%20Light%20Skin%20Tone.png",
        story: "Membawakan kisah kebajikan Di Zi Gui dalam bahasa Mandarin dengan pelafalan nada yang fasih dan intonasi ekspresif yang memukau dewan juri penutur asli."
    },
    {
        id: 6,
        name: "Celine Aurelia - SD Kelas 4",
        title: "Festival Kaligrafi Hanzi & Lukis",
        organizer: "Dewan Kesenian Kota Bandung",
        medalType: "gold",
        medals: [
            { type: "gold", icon: "🥇" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Artist%20Palette.png",
        story: "Goresan kuas kaligrafi dan lukisan oriental karya Celine mencerminkan ketenangan batin, ketelitian teknik bishun, dan kepekaan rasa seni yang terlatih sejak dini."
    },
    {
        id: 7,
        name: "Nathalie Victoria - SD Kelas 5",
        title: "Cambridge Young Learners English Speech",
        organizer: "Cambridge English Regional Community",
        medalType: "gold",
        medals: [
            { type: "gold", icon: "🥇" }
        ],
        img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/People%20with%20professions/Woman%20Scientist%20Light%20Skin%20Tone.png",
        story: "Menyampaikan pidato tentang keberlanjutan lingkungan dengan percaya diri, argumentasi jernih, dan artikulasi bahasa Inggris yang luwes di hadapan juri internasional."
    }
];

// --- 2. RENDER THE EXACT CARD REPLICATION ---
function renderGalleryGrid() {
    const gridContainer = document.getElementById('gallery-grid');
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    
    prestasiData.forEach(item => {
        // Generate circular badges stack
        let cardMedalsHTML = '';
        item.medals.forEach(m => {
            cardMedalsHTML += `
                <div class="medal-circle bg-medal-${m.type}">
                    ${m.icon}
                </div>
            `;
        });

        const cardHTML = `
            <div class="card-container" onclick="openModal(${item.id})">
                
                <!-- Header -->
                <div class="card-header">
                    <span class="card-organizer">${item.organizer}</span>
                    <div class="card-arrow-btn"><i class="fa-solid fa-arrow-right -rotate-45"></i></div>
                </div>
                
                <!-- Inner Content (Photo & Gradient) -->
                <div class="card-inner">
                    <!-- Photo (Shifted Left) -->
                    <img src="${item.img}" alt="${item.title}" class="card-photo">
                    
                    <!-- Gradient Overlay Bottom 40% -->
                    <div class="card-gradient-overlay grad-${item.medalType}"></div>
                    
                    <!-- Medals -->
                    <div class="card-medals">
                        ${cardMedalsHTML}
                    </div>
                    
                    <!-- Glassmorphism Box -->
                    <div class="glass-box">
                        <div class="glass-icon">🤍</div>
                        <div class="flex-1 overflow-hidden">
                            <h3 class="font-bold text-gray-900 text-[13px] leading-tight line-clamp-2 truncate">${item.title}</h3>
                            <p class="text-[9px] text-gray-600 font-bold uppercase tracking-widest mt-1 truncate">${item.name}</p>
                        </div>
                    </div>
                </div>
                
            </div>
        `;
        gridContainer.insertAdjacentHTML('beforeend', cardHTML);
    });
}

// --- 3. MODAL LOGIC (PERSIS ATTACHMENT) ---
function handleBackdropClick(e) {
    const modal = document.getElementById('story-modal');
    if (e.target === modal || e.target.classList.contains('modal-3d-wrapper')) {
        closeModal(e, true);
    }
}
window.handleBackdropClick = handleBackdropClick;

function openModal(id) {
    const modal = document.getElementById('story-modal');
    const mTitle = document.getElementById('m-title');
    const mName = document.getElementById('m-name');
    const mOrganizer = document.getElementById('m-org-text');
    const mStory = document.getElementById('m-story');
    const mImg = document.getElementById('m-img');
    const mBgLayer = document.getElementById('m-bg-layer');
    const modalGlow = document.getElementById('modal-glow');
    const mMedalsContainer = document.getElementById('m-medals-container');

    const data = prestasiData.find(item => item.id === id);
    if (!data || !modal) return;

    if (mTitle) mTitle.innerText = data.title;
    if (mName) mName.innerText = data.name;
    if (mOrganizer) mOrganizer.innerText = data.organizer;
    if (mStory) mStory.innerText = data.story;
    if (mImg) mImg.src = data.img;

    // Background Gradient in Modal
    if (mBgLayer) mBgLayer.className = `absolute inset-0 z-0 grad-${data.medalType}`;

    // Generate Medals Stack
    let modalMedalsHTML = '';
    data.medals.forEach(m => {
        modalMedalsHTML += `<div class="transform hover:scale-110 transition-transform">${m.icon}</div>`;
    });
    if (mMedalsContainer) mMedalsContainer.innerHTML = modalMedalsHTML;

    // Apply specific glow class
    if (modalGlow) {
        modalGlow.className = 'modal-glow'; 
        modalGlow.classList.add(`glow-${data.medalType}`);
    }

    // Show Modal
    modal.classList.add('show');
    document.body.style.overflow = 'hidden';

    setTimeout(fireConfetti, 400);
}
window.openModal = openModal;

function closeModal(e, force = false) {
    const modal = document.getElementById('story-modal');
    const confettiContainer = document.getElementById('confetti-container');
    if (modal) modal.classList.remove('show');
    document.body.style.overflow = 'auto';
    setTimeout(() => { 
        if (confettiContainer) confettiContainer.innerHTML = ''; 
    }, 600);
}
window.closeModal = closeModal;

// --- 4. CONFETTI EFFECT ---
function fireConfetti() {
    const confettiContainer = document.getElementById('confetti-container');
    if (!confettiContainer) return;
    confettiContainer.innerHTML = ''; 
    const colors = ['#ffcb05', '#d2232a', '#38bdf8', '#ffffff', '#1d4486'];
    for(let i = 0; i < 50; i++) {
        let conf = document.createElement('div');
        conf.className = 'confetti-piece';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        const sizeScale = Math.random() * 0.8 + 0.5;
        conf.style.width = (8 * sizeScale) + 'px';
        conf.style.height = (16 * sizeScale) + 'px';
        conf.style.animation = `confettiFall ${Math.random() * 2 + 2}s ease-in ${Math.random() * 0.5}s forwards`;
        confettiContainer.appendChild(conf);
    }
}
window.fireConfetti = fireConfetti;

// --- 5. SCROLL REVEAL ---
function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
        if (reveals[i].getBoundingClientRect().top < window.innerHeight - 100) {
            reveals[i].classList.add("active");
        }
    }
}

// Inisialisasi saat DOM siap
document.addEventListener('DOMContentLoaded', () => {
    renderGalleryGrid();
    window.addEventListener("scroll", reveal);
    reveal();

    // Close on Escape key
    window.addEventListener("keydown", (e) => {
        if (e.key === 'Escape') {
            closeModal(e, true);
        }
    });
});
