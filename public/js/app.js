/*
 * Skrip bersama semua halaman.
 * Tidak ada onclick di HTML: tombol memakai atribut data-aksi="namaAksi" (+ data-arg),
 * lalu dijalankan dari daftar AKSI di bawah. Cara ini aman untuk Content-Security-Policy.
 */

/* ---------- DATA YANG BOLEH DIUBAH PEMILIK ---------- */
// ID video YouTube (bagian setelah "v=" pada alamat video). Selama kosong, kartu videonya disembunyikan.
const VIDEO_YOUTUBE = {
    hariBakti: '',   // [PERLU DATA: video dokumentasi Hari Bakti]
    trilingual: ''   // [PERLU DATA: video kegiatan kelas Trilingual]
};

/* ---------- DAFTAR AKSI + PENANGAN KLIK ---------- */
const AKSI = {};
window.SedayaAksi = AKSI;

document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-aksi]');
    if (!el) return;
    const fn = AKSI[el.dataset.aksi];
    if (typeof fn !== 'function') return;
    const mentah = el.dataset.arg;
    const arg = mentah !== undefined && /^-?\d+$/.test(mentah) ? Number(mentah) : mentah;
    fn(arg, el, e);
});

// Elemen non-tombol yang bisa diklik (role="button") juga bisa dipakai dengan Enter / Spasi
document.addEventListener('keydown', (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    const el = e.target;
    if (!el.matches || !el.matches('[data-aksi][role="button"]')) return;
    e.preventDefault();
    el.click();
});

const kurangiGerak = () => window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------- MODAL: fokus, Escape, kunci gulir ---------- */
const Modal = (() => {
    const tumpukan = [];
    const BISA_FOKUS = 'a[href], button:not([disabled]), input, select, textarea, iframe, [tabindex]:not([tabindex="-1"])';

    function buka(el, tutupFn) {
        if (!el || tumpukan.some(m => m.el === el)) return;
        el.removeAttribute('inert');
        tumpukan.push({ el, tutupFn, pemicu: document.activeElement });
        document.body.style.overflow = 'hidden';
        const tujuan = el.querySelector('[data-fokus-awal]') || el.querySelector(BISA_FOKUS) || el;
        setTimeout(() => tujuan.focus({ preventScroll: true }), 50);
    }

    function tutup(el) {
        const i = tumpukan.findIndex(m => m.el === el);
        if (i === -1) return;
        const [m] = tumpukan.splice(i, 1);
        el.setAttribute('inert', '');
        if (!tumpukan.length) document.body.style.overflow = '';
        if (m.pemicu && m.pemicu.focus) m.pemicu.focus({ preventScroll: true });
    }

    document.addEventListener('keydown', (e) => {
        const atas = tumpukan[tumpukan.length - 1];
        if (!atas) return;
        if (e.key === 'Escape') { atas.tutupFn(); return; }
        if (e.key !== 'Tab') return;
        const daftar = [...atas.el.querySelectorAll(BISA_FOKUS)].filter(x => x.offsetParent !== null);
        if (!daftar.length) return;
        const awal = daftar[0], akhir = daftar[daftar.length - 1];
        if (e.shiftKey && document.activeElement === awal) { e.preventDefault(); akhir.focus(); }
        else if (!e.shiftKey && document.activeElement === akhir) { e.preventDefault(); awal.focus(); }
    });

    return { buka, tutup };
})();
window.SedayaModal = Modal;

// Modal bergaya ".custom-modal" (muncul dengan kelas "show"). Klik latar gelap = tutup.
function bukaModalShow(id) {
    const el = document.getElementById(id);
    if (!el) return null;
    el.classList.add('show');
    Modal.buka(el, () => tutupModalShow(id));
    return el;
}
function tutupModalShow(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('show');
    Modal.tutup(el);
}
const tutupJikaLatar = (id) => (arg, el, e) => {
    if (arg === 'paksa' || e.target === document.getElementById(id)) tutupModalShow(id);
};

/* ---------- KIRIM PESAN KE WHATSAPP ADMISI ---------- */
function bukaWhatsApp(pesan) {
    const nomor = (window.SITUS && window.SITUS.whatsapp) || '6281389772288';
    const url = `https://wa.me/${nomor}?text=${encodeURIComponent(pesan)}`;
    window.open(url, '_blank', 'noopener,noreferrer');
}
window.bukaWhatsApp = bukaWhatsApp;

document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. BAYANGAN NAVBAR SAAT DIGULIR --- */
    const header = document.getElementById('main-header');
    if (header) {
        const perbarui = () => header.classList.toggle('shadow-md', window.scrollY > 20);
        window.addEventListener('scroll', perbarui, { passive: true });
        perbarui();
    }

    /* --- 2. MUNCUL SAAT DIGULIR (.reveal) --- */
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length) {
        if (kurangiGerak() || !('IntersectionObserver' in window)) {
            reveals.forEach(el => el.classList.add('active'));
        } else {
            const io = new IntersectionObserver((entri) => {
                entri.forEach(en => { if (en.isIntersecting) { en.target.classList.add('active'); io.unobserve(en.target); } });
            }, { rootMargin: '0px 0px -80px 0px' });
            reveals.forEach(el => io.observe(el));
        }
    }

    /* --- 3. FORMULIR BERANDA: kirim lewat WhatsApp admisi --- */
    const formBeranda = document.getElementById('form-beranda');
    if (formBeranda) {
        formBeranda.addEventListener('submit', (e) => {
            e.preventDefault();
            const nilai = (id) => (document.getElementById(id)?.value || '').trim();
            const pesan =
`Halo Tim Admisi Sekolah Terpadu Sedaya Bintang,

Saya ingin bertanya tentang pendaftaran murid baru.

• Nama orang tua / wali: ${nilai('fb-ortu')}
• Nama calon murid: ${nilai('fb-anak')}
• Nomor WhatsApp: ${nilai('fb-wa')}
• Jenjang: ${nilai('fb-jenjang')}

Terima kasih.`;
            bukaWhatsApp(pesan);
            const status = document.getElementById('form-beranda-status');
            if (status) status.textContent = 'WhatsApp sedang dibuka. Tekan kirim di WhatsApp supaya pesan sampai ke tim admisi.';
        });
    }

    /* --- 4. TAB & SAKLAR (ABOUT, PRESCHOOL, KARIR) --- */
    AKSI.toggleSwitch = (tabId) => {
        const bg = document.getElementById('switch-bg');
        document.querySelectorAll('#heritage-section .tab-content').forEach(tab => tab.classList.remove('active'));
        const selectedTab = document.getElementById('tab-' + tabId);
        if (selectedTab) selectedTab.classList.add('active');
        if (bg) bg.classList.toggle('switch-kanan', tabId !== 'summarecon');
        ['summarecon', 'pahoa'].forEach(nama => {
            const tombol = document.getElementById('switch-btn-' + nama);
            if (!tombol) return;
            const aktif = nama === tabId;
            tombol.classList.toggle('text-white', aktif);
            tombol.classList.toggle('text-gray-600', !aktif);
            tombol.setAttribute('aria-pressed', String(aktif));
        });
    };

    AKSI.switchTab = (tabId) => {
        document.querySelectorAll('.tab-btn').forEach(btn => {
            const aktif = btn.id === 'btn-' + tabId;
            btn.setAttribute('aria-pressed', String(aktif));
            if (btn.id === 'btn-kb' || btn.id === 'btn-tk') {
                btn.classList.toggle('active', aktif);
                btn.classList.toggle('bg-brand-primary', aktif);
                btn.classList.toggle('text-white', aktif);
                btn.classList.toggle('border-brand-primary', aktif);
                btn.classList.toggle('bg-gray-50', !aktif);
                btn.classList.toggle('text-gray-600', !aktif);
                btn.classList.toggle('border-gray-100', !aktif);
            } else {
                btn.classList.toggle('active', aktif);
                btn.classList.toggle('text-white', aktif);
                btn.classList.toggle('text-gray-600', !aktif);
            }
        });
        document.querySelectorAll('#content-kb, #content-tk').forEach(c => c.classList.remove('active'));
        document.querySelectorAll('#content-akademik, #content-officer').forEach(c => c.classList.add('hidden'));
        const isi = document.getElementById('content-' + tabId);
        if (isi) {
            if (isi.classList.contains('tab-content')) isi.classList.add('active');
            else isi.classList.remove('hidden');
        }
    };

    /* --- 5. TAB METODE (KURIKULUM) --- */
    AKSI.switchMethod = (index, element) => {
        document.querySelectorAll('.tab-content-panel').forEach(panel => panel.classList.remove('active'));
        document.querySelectorAll('.method-tab').forEach(tab => {
            tab.classList.remove('active', 'bg-brand-gray');
            tab.setAttribute('aria-pressed', 'false');
            const iconDiv = tab.querySelector('.tab-icon');
            if (iconDiv) { iconDiv.classList.replace('bg-brand-primary', 'bg-gray-100'); iconDiv.classList.replace('text-white', 'text-gray-600'); }
            const titleDiv = tab.querySelector('.tab-title');
            if (titleDiv) { titleDiv.classList.remove('text-brand-primary', 'font-bold'); titleDiv.classList.add('text-gray-600', 'font-semibold'); }
        });
        const activePanel = document.getElementById(`method-panel-${index}`);
        if (activePanel) activePanel.classList.add('active');
        element.classList.add('active');
        element.setAttribute('aria-pressed', 'true');
        const activeIconDiv = element.querySelector('.tab-icon');
        if (activeIconDiv) { activeIconDiv.classList.replace('bg-gray-100', 'bg-brand-primary'); activeIconDiv.classList.replace('text-gray-600', 'text-white'); }
        const activeTitleDiv = element.querySelector('.tab-title');
        if (activeTitleDiv) { activeTitleDiv.classList.replace('text-gray-600', 'text-brand-primary'); activeTitleDiv.classList.replace('font-semibold', 'font-bold'); }
    };

    /* --- 6. SARING GALERI & PERBESAR FOTO (FASILITAS) --- */
    AKSI.filterGallery = (category, tombol) => {
        document.querySelectorAll('.filter-btn').forEach(btn => {
            btn.classList.remove('active', 'bg-brand-primary', 'text-white');
            btn.setAttribute('aria-pressed', 'false');
        });
        tombol.classList.add('active', 'bg-brand-primary', 'text-white');
        tombol.setAttribute('aria-pressed', 'true');
        document.querySelectorAll('.gallery-item').forEach(item => {
            const tampil = category === 'all' || item.getAttribute('data-category') === category;
            item.classList.toggle('hidden-item', !tampil);
        });
    };

    AKSI.openLightbox = (arg, element) => {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const imgElement = element.querySelector('img');
        const titleElement = element.querySelector('h3, h4');
        if (!lightbox || !lightboxImg || !imgElement) return;
        lightboxImg.src = imgElement.currentSrc || imgElement.src;
        lightboxImg.alt = imgElement.alt;
        if (lightboxCaption && titleElement) lightboxCaption.textContent = titleElement.textContent;
        lightbox.classList.add('active');
        Modal.buka(lightbox, AKSI.closeLightbox);
    };

    AKSI.closeLightbox = () => {
        const lightbox = document.getElementById('lightbox');
        if (!lightbox) return;
        lightbox.classList.remove('active');
        Modal.tutup(lightbox);
    };

    /* --- 7. TITIK SLIDER AJAKAN BERKUNJUNG (BERANDA) --- */
    const eventSlider = document.getElementById('event-slider');
    const eventDots = document.querySelectorAll('.event-dot');
    if (eventSlider && eventDots.length > 0) {
        eventSlider.addEventListener('scroll', () => {
            let currentIndex = Math.round(eventSlider.scrollLeft / eventSlider.clientWidth);
            if (currentIndex >= eventDots.length) currentIndex = eventDots.length - 1;
            eventDots.forEach((dot, index) => {
                const aktif = index === currentIndex;
                dot.classList.toggle('w-6', aktif);
                dot.classList.toggle('bg-brand-primary', aktif);
                dot.classList.toggle('w-2', !aktif);
                dot.classList.toggle('bg-gray-300', !aktif);
            });
        }, { passive: true });
    }

    /* --- 8. GALERI BERGANTI (BERANDA) --- */
    const slides = [
        { title: 'Budi Pekerti Dilatih Setiap Hari', img: 'assets/images/hero-sekolah-utama.webp', alt: 'Kegiatan belajar di kelas', desc: 'Si kecil dilatih Budi Pekerti, menggunakan Bahasa Mandarin, Inggris, dan Indonesia, serta berpikir kritis melalui STEAM.' },
        { title: 'Belajar dengan Menyenangkan', img: 'assets/images/lingkungan-belajar-menyenangkan.webp', alt: 'Suasana ruang kelas', desc: 'Ruang kelas dan fasilitas disiapkan supaya si kecil aktif bertanya, mencoba, dan bermain sambil belajar.' },
        { title: 'Berkolaborasi Sejak Usia Dini', img: 'assets/images/murid-kolaborasi-kelas.webp', alt: 'Murid bekerja sama di kelas', desc: 'Lewat kegiatan STEAM, murid dilatih mencari jalan keluar dan bekerja sama dengan teman.' }
    ];
    const galleryImg = document.getElementById('gallery-img');
    const galleryText = document.getElementById('gallery-text-container');
    let slideAktif = 0;

    AKSI.changeSlide = (index) => {
        const titleEl = document.getElementById('gallery-title');
        const descEl = document.getElementById('gallery-desc');
        if (!galleryImg || !galleryText || slideAktif === index || !slides[index]) return;
        slideAktif = index;
        document.querySelectorAll('.slider-dot').forEach((dot, i) => {
            const aktif = i === index;
            dot.setAttribute('aria-current', aktif ? 'true' : 'false');
            const batang = dot.querySelector('span');
            if (!batang) return;
            batang.classList.toggle('w-8', aktif);
            batang.classList.toggle('bg-brand-primary', aktif);
            batang.classList.toggle('w-2.5', !aktif);
            batang.classList.toggle('bg-gray-300', !aktif);
        });
        const ganti = () => {
            galleryImg.src = slides[index].img;
            galleryImg.alt = slides[index].alt;
            titleEl.textContent = slides[index].title;
            descEl.textContent = slides[index].desc;
        };
        if (kurangiGerak()) { ganti(); return; }
        galleryImg.classList.add('fade-out');
        galleryText.classList.add('fade-out');
        setTimeout(() => {
            ganti();
            galleryImg.classList.remove('fade-out');
            galleryText.classList.remove('fade-out');
        }, 400);
    };

    if (galleryImg && galleryText && !kurangiGerak()) {
        // Berganti otomatis, berhenti saat disorot mouse, difokus keyboard, atau tab tidak terlihat
        const wadah = galleryImg.closest('section');
        let jeda = false;
        if (wadah) {
            wadah.addEventListener('mouseenter', () => { jeda = true; });
            wadah.addEventListener('mouseleave', () => { jeda = false; });
            wadah.addEventListener('focusin', () => { jeda = true; });
            wadah.addEventListener('focusout', () => { jeda = false; });
        }
        setInterval(() => {
            if (jeda || document.hidden) return;
            AKSI.changeSlide((slideAktif + 1) % slides.length);
        }, 6000);
    }

    /* --- 9. ANIMASI KARAKTER SAAT KARTU JENJANG DISOROT (BERANDA) --- */
    // Video hanya dimuat di perangkat ber-mouse. Di HP cukup gambar poster (hemat kuota ±6 MB).
    const bisaHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    document.querySelectorAll('.hover-video-card').forEach(card => {
        const video = card.querySelector('.hover-video');
        if (!video || !bisaHover || kurangiGerak()) return;
        let loopTimeout; let isHovering = false;
        const muat = () => {
            if (video.dataset.src && !video.getAttribute('src')) { video.src = video.dataset.src; video.load(); }
        };
        if ('IntersectionObserver' in window) {
            const io = new IntersectionObserver((entri) => {
                if (entri.some(en => en.isIntersecting)) { muat(); io.disconnect(); }
            }, { rootMargin: '300px' });
            io.observe(card);
        } else { muat(); }

        card.addEventListener('mouseenter', () => {
            isHovering = true; clearTimeout(loopTimeout); muat();
            const p = video.play(); if (p !== undefined) p.catch(() => {});
        });
        card.addEventListener('mouseleave', () => {
            isHovering = false; clearTimeout(loopTimeout);
            video.pause(); video.currentTime = 0;
        });
        video.addEventListener('ended', () => {
            if (!isHovering) return;
            loopTimeout = setTimeout(() => {
                if (!isHovering) return;
                video.currentTime = 0;
                const p = video.play(); if (p !== undefined) p.catch(() => {});
            }, 1000);
        });
    });

    /* --- 10. KARAKTER HERO PRESCHOOL / PRIMARY --- */
    const heroCharContainer = document.getElementById('hero-character-container');
    const heroCharVideo = document.getElementById('hero-character-video');
    if (heroCharContainer && heroCharVideo && !kurangiGerak()) {
        let isCharHovering = false;
        let charLoopTimeout = null;
        heroCharVideo.muted = true;
        heroCharVideo.playsInline = true;

        const playCharAnimation = () => {
            heroCharVideo.currentTime = 0;
            const p = heroCharVideo.play(); if (p !== undefined) p.catch(() => {});
        };
        const tryInitialPlay = () => {
            const p = heroCharVideo.play();
            if (p !== undefined) p.catch(() => {
                const playOnGesture = () => { heroCharVideo.play().catch(() => {}); };
                document.addEventListener('click', playOnGesture, { once: true });
                document.addEventListener('touchstart', playOnGesture, { once: true, passive: true });
            });
        };
        if (heroCharVideo.readyState >= 2) tryInitialPlay();
        else heroCharVideo.addEventListener('loadeddata', tryInitialPlay, { once: true });

        heroCharVideo.addEventListener('ended', () => {
            if (!isCharHovering) return;
            clearTimeout(charLoopTimeout);
            charLoopTimeout = setTimeout(() => { if (isCharHovering) playCharAnimation(); }, 800);
        });
        heroCharContainer.addEventListener('mouseenter', () => { isCharHovering = true; clearTimeout(charLoopTimeout); playCharAnimation(); });
        heroCharContainer.addEventListener('mouseleave', () => { isCharHovering = false; clearTimeout(charLoopTimeout); });
        heroCharContainer.addEventListener('click', () => { clearTimeout(charLoopTimeout); playCharAnimation(); });
    }

    /* --- 11. BUDI PEKERTI: HARI BAKTI, 10 NILAI MORAL, DI ZI GUI --- */
    const itemBakti = document.querySelectorAll('.interactive-list-item');
    const pilihBakti = (index) => {
        itemBakti.forEach((item, i) => {
            item.classList.toggle('active', i === index);
            item.setAttribute('aria-pressed', String(i === index));
        });
        document.querySelectorAll('.crossfade-img').forEach((img, i) => img.classList.toggle('active', i === index));
    };
    itemBakti.forEach((item, i) => {
        item.addEventListener('mouseenter', () => pilihBakti(i));
        item.addEventListener('focus', () => pilihBakti(i));
        item.addEventListener('click', () => pilihBakti(i));
    });

    const nilaiData = [
        { icon: "fa-user-tie", title: "Etika / Sopan Santun", desc: "Penerapan tata krama pergaulan, adab makan, cara duduk yang baik, serta etika berbicara secara santun dalam interaksi sosial sehari-hari.", example: "Si kecil dibiasakan mengucapkan 'tolong' dan 'terima kasih', serta merapikan tempat makannya sendiri.", img: "assets/images/budi-pekerti-etika-sopan-santun.webp" },
        { icon: "fa-person-cane", title: "Hormat kepada yang Tua", desc: "Membiasakan si kecil bersikap sopan dan penuh penghargaan di hadapan guru, kakak kelas, staf sekolah, serta anggota masyarakat yang lebih tua.", example: "Si kecil belajar menyapa guru di pagi hari dan mendahulukan orang yang lebih tua saat mengantre.", img: "assets/images/hero-sekolah-utama.webp" },
        { icon: "fa-hand-holding-heart", title: "Welas Asih", desc: "Membangun kepekaan si kecil agar peduli terhadap kesulitan sesama teman dan memperlakukan setiap makhluk hidup dengan kasih sayang.", example: "Si kecil tidak ragu membantu temannya yang terjatuh atau meminjamkan alat tulisnya tanpa diminta.", img: "assets/images/budi-pekerti-welas-asih.webp" },
        { icon: "fa-hand-sparkles", title: "Bersih dan Jujur", desc: "Menjaga keselarasan antara kebersihan fisik (tubuh, pakaian, lingkungan) dengan kejujuran hati dalam setiap perkataan dan tindakan.", example: "Si kecil berani berkata jujur jika tidak sengaja menumpahkan air, lalu bertanggung jawab membersihkannya.", img: "assets/images/kebersamaan-murid-orangtua.webp" },
        { icon: "fa-face-flushed", title: "Perasaan Malu", desc: "Menanamkan kepekaan pada diri si kecil agar memiliki rasa enggan dan malu apabila melakukan perbuatan yang melanggar kesepakatan kelas.", example: "Si kecil akan merasa tidak nyaman jika menyela pembicaraan orang lain dan berusaha untuk menunggu gilirannya.", img: "assets/images/budi-pekerti-kedisiplinan.webp" },
        { icon: "fa-handshake", title: "Terpercaya", desc: "Melatih si kecil agar perkataannya selalu selaras dengan tindakan, serta dapat diandalkan dalam tugas kecil.", example: "Jika si kecil berjanji akan mengembalikan buku cerita ke raknya, ia akan menepatinya tanpa perlu diingatkan.", img: "assets/images/budi-pekerti-dapat-dipercaya.webp" },
        { icon: "fa-house-chimney-user", title: "Bakti kepada Orang Tua", desc: "Menumbuhkan rasa cinta kasih, empati, dan kepatuhan yang tulus terhadap arahan serta kasih sayang orang tua di rumah.", example: "Si kecil menyambut hangat orang tuanya sepulang sekolah dan menceritakan harinya dengan antusias.", img: "assets/images/budi-pekerti-cuci-kaki-orangtua.webp" },
        { icon: "fa-lightbulb", title: "Bijaksana / Arif", desc: "Melatih si kecil sejak dini untuk memilah mana hal yang membawa kebaikan bersama, serta belajar mengambil keputusan dengan tenang.", example: "Si kecil mampu memilih mainan secara adil bersama teman kelompoknya tanpa perlu merebut paksa.", img: "assets/images/program-workshop.webp" },
        { icon: "fa-scale-balanced", title: "Kebenaran & Keadilan", desc: "Melatih sikap objektif, proporsional, menjunjung tinggi hak teman lain, dan berani membela kebenaran secara damai dan sopan.", example: "Si kecil tahu kapan harus meminta maaf jika salah, dan berani membela temannya yang diperlakukan tidak adil.", img: "assets/images/fasilitas-spacelab.webp" },
        { icon: "fa-shield-heart", title: "Kesetiaan", desc: "Memiliki keteguhan terhadap prinsip kebenaran, serta belajar peduli untuk menjaga nama baik keluarga, sekolah, dan persahabatannya.", example: "Si kecil menjaga rahasia teman baiknya dan selalu hadir memberikan dukungan saat temannya bersedih.", img: "assets/images/guru-sedaya-bintang.webp" }
    ];

    AKSI.openNilaiModal = (index) => {
        const data = nilaiData[index];
        if (!data || !document.getElementById('nilai-modal')) return;
        document.getElementById('m-nilai-title').textContent = data.title;
        document.getElementById('m-nilai-desc').textContent = data.desc;
        document.getElementById('m-nilai-example').textContent = `"${data.example}"`;
        const img = document.getElementById('m-nilai-img');
        img.src = data.img; img.alt = data.title;
        document.getElementById('m-nilai-icon').innerHTML = `<i class="fa-solid ${data.icon}" aria-hidden="true"></i>`;
        bukaModalShow('nilai-modal');
    };
    AKSI.closeNilaiModal = tutupJikaLatar('nilai-modal');

    const dzgData = [
        { badge: "Pembuka", hanzi: "总", pinyin: "Zǒng Xù (总叙)", title: "Pendahuluan", desc: "Memaparkan urutan prioritas yang ideal: bakti dan rasa hormat ditempatkan paling utama, diikuti sikap hati-hati, cinta kasih universal, barulah mempelajari ilmu pengetahuan akademis.", example: "Guru kami selalu memastikan si kecil paham cara bersikap baik sebelum memulai pelajaran.", img: "assets/images/hero-sekolah-utama.webp" },
        { badge: "Bab 1", hanzi: "孝", pinyin: "Rù Zé Xiào (入则孝)", title: "Bakti di Rumah", desc: "Penjelasan tentang cara si kecil merespons panggilan orang tua dengan sigap, menjaga nama baik agar keluarga tenang, serta bersikap sopan di dalam rumah.", example: "Si kecil belajar untuk menjawab panggilan mama dan papanya tanpa menunda-nunda.", img: "assets/images/budi-pekerti-cuci-kaki-orangtua.webp" },
        { badge: "Bab 2", hanzi: "悌", pinyin: "Chū Zé Tì (出则悌)", title: "Etika Luar Rumah", desc: "Panduan praktis berinteraksi dengan saudara atau kerabat, serta menyapa orang yang lebih tua di lingkungan sosial dengan penuh keharmonisan.", example: "Si kecil terbiasa membungkuk sedikit sambil menyapa staf dan guru saat tiba di gerbang sekolah.", img: "assets/images/budi-pekerti-welas-asih.webp" },
        { badge: "Bab 3", hanzi: "谨", pinyin: "Jǐn (谨)", title: "Kedisiplinan Hidup", desc: "Menanamkan kebiasaan manajemen waktu, bangun pagi, menjaga kerapian pakaian seragam, adab makan yang tidak berantakan, serta kehati-hatian melangkah.", example: "Si kecil mampu merapikan alat belajarnya sendiri setelah sesi metode Learning Corners selesai.", img: "assets/images/budi-pekerti-kedisiplinan.webp" },
        { badge: "Bab 4", hanzi: "信", pinyin: "Xìn (信)", title: "Dapat Dipercaya", desc: "Melatih kejujuran lisan sejak dini, menghindari bualan atau kebohongan, menepati janji, dan membiasakan tanggung jawab atas barang pinjaman.", example: "Si kecil selalu mengembalikan krayon atau buku milik temannya tepat waktu dan mengucapkan terima kasih.", img: "assets/images/budi-pekerti-dapat-dipercaya.webp" },
        { badge: "Bab 5", hanzi: "爱", pinyin: "Fàn Ài Zhòng (泛爱众)", title: "Cinta Kasih Sesama", desc: "Membangun empati untuk suka menolong, mencegah perilaku perundungan (bullying), dan bersikap adil terhadap teman tanpa membeda-bedakan.", example: "Si kecil mau berbagi bekal makanannya dan tidak ragu bermain dengan siapa saja di playground.", img: "assets/images/guru-sedaya-bintang.webp" },
        { badge: "Bab 6", hanzi: "仁", pinyin: "Qīn Rén (亲仁)", title: "Mendekati yang Berbudi", desc: "Membiasakan si kecil untuk mencari lingkungan pergaulan yang sehat, mendekati sosok panutan, dan menerima nasihat yang membangun.", example: "Si kecil menjadi lebih antusias meneladani kebiasaan membaca dari teman sebangkunya yang rajin.", img: "assets/images/program-workshop.webp" },
        { badge: "Bab 7", hanzi: "文", pinyin: "Yú Lì Xué Wén (余力学文)", title: "Belajar Ilmu", desc: "Menegaskan metode belajar yang benar setelah sikap terbentuk: belajar dengan sungguh-sungguh (mata, hati, mulut fokus) dan tidak mudah menyerah.", example: "Si kecil lebih gigih saat mencoba memecahkan blok teka-teki logika STEAM dan tidak mudah menangis saat gagal.", img: "assets/images/fasilitas-spacelab.webp" }
    ];

    AKSI.openDzgModal = (index) => {
        const data = dzgData[index];
        if (!data || !document.getElementById('dzg-modal')) return;
        const mDBadge = document.getElementById('m-dzg-badge');
        document.getElementById('m-dzg-hanzi').textContent = data.hanzi;
        document.getElementById('m-dzg-pinyin').textContent = data.pinyin;
        document.getElementById('m-dzg-title').textContent = data.title;
        document.getElementById('m-dzg-desc').textContent = data.desc;
        document.getElementById('m-dzg-example').textContent = `"${data.example}"`;
        const img = document.getElementById('m-dzg-img');
        img.src = data.img; img.alt = data.title;
        mDBadge.textContent = data.badge;
        const pembuka = data.badge === 'Pembuka';
        mDBadge.classList.toggle('bg-brand-red', pembuka);
        mDBadge.classList.toggle('text-white', pembuka);
        mDBadge.classList.toggle('bg-brand-yellow', !pembuka);
        mDBadge.classList.toggle('text-brand-primary', !pembuka);
        bukaModalShow('dzg-modal');
    };
    AKSI.closeDzgModal = tutupJikaLatar('dzg-modal');

    /* --- 12. VIDEO YOUTUBE (BUDI PEKERTI, TRILINGUAL) --- */
    // Kartu video yang ID-nya belum diisi disembunyikan, supaya tidak ada tombol putar yang kosong.
    document.querySelectorAll('[data-video]').forEach(kartu => {
        if (!VIDEO_YOUTUBE[kartu.dataset.video]) {
            const wadah = kartu.closest('[data-video-wadah]') || kartu;
            wadah.hidden = true;
        }
    });
    AKSI.openVideoModal = (kunci) => {
        const vFrame = document.getElementById('youtube-frame');
        const id = VIDEO_YOUTUBE[kunci];
        if (!vFrame || !id || !/^[\w-]{6,20}$/.test(id)) return;
        vFrame.src = `https://www.youtube-nocookie.com/embed/${id}?autoplay=1&rel=0`;
        bukaModalShow('video-modal');
    };
    AKSI.closeVideoModal = (arg, el, e) => {
        const vModal = document.getElementById('video-modal');
        if (arg !== 'paksa' && e.target !== vModal) return;
        const vFrame = document.getElementById('youtube-frame');
        if (vFrame) vFrame.removeAttribute('src');
        tutupModalShow('video-modal');
    };

    /* --- 13. BATANG PERSENTASE (TRILINGUAL) --- */
    const prog1 = document.getElementById('prog-1');
    const prog2 = document.getElementById('prog-2');
    if (prog1 && prog2) {
        const isi = () => { prog1.classList.add('terisi'); prog2.classList.add('terisi'); };
        if (!('IntersectionObserver' in window)) isi();
        else {
            const io = new IntersectionObserver((entri) => { if (entri.some(en => en.isIntersecting)) { isi(); io.disconnect(); } });
            io.observe(prog1);
        }
    }

    /* --- 14. SAMBUTAN KEPALA SEKOLAH BERGANTI (ABOUT) --- */
    const kepsekList = [
        {
            name: '[PERLU DATA: nama kepala KB-TK]',
            role: 'Kepala KB dan TK',
            level: 'KB dan TK',
            kicker: 'Sambutan · Jenjang KB-TK',
            quote: '[PERLU DATA: kutipan singkat kepala KB-TK]',
            p1: '[PERLU DATA: isi sambutan kepala KB-TK, 1–2 kalimat]'
        },
        {
            name: '[PERLU DATA: nama kepala SD]',
            role: 'Kepala SD',
            level: 'Sekolah Dasar (SD)',
            kicker: 'Sambutan · Jenjang SD',
            quote: '[PERLU DATA: kutipan singkat kepala SD]',
            p1: '[PERLU DATA: isi sambutan kepala SD, 1–2 kalimat]'
        }
    ];
    let currentKepsekIndex = 0;
    let kepsekAutoTimer = null;
    let kepsekJeda = false;

    function applyKepsekSlide(index) {
        currentKepsekIndex = index;
        const data = kepsekList[index];
        if (!data) return;
        const teks = { 'kepsek-name': data.name, 'kepsek-role': data.role, 'kepsek-kicker': data.kicker, 'kepsek-quote': data.quote, 'kepsek-p1': data.p1, 'kepsek-level-badge': data.level };
        [0, 1].forEach(i => {
            const img = document.getElementById('kepsek-img-' + i);
            if (img) { img.classList.toggle('opacity-100', i === index); img.classList.toggle('opacity-0', i !== index); }
            const dot = document.getElementById('kepsek-dot-' + i);
            if (dot) {
                dot.setAttribute('aria-current', i === index ? 'true' : 'false');
                const batang = dot.querySelector('span');
                if (batang) {
                    batang.classList.toggle('w-8', i === index);
                    batang.classList.toggle('bg-brand-primary', i === index);
                    batang.classList.toggle('w-2.5', i !== index);
                    batang.classList.toggle('bg-gray-300', i !== index);
                }
            }
        });
        const wadahTeks = document.getElementById('kepsek-stage-text');
        const isi = () => Object.entries(teks).forEach(([id, t]) => { const el = document.getElementById(id); if (el) el.textContent = t; });
        if (kurangiGerak() || !wadahTeks) { isi(); return; }
        wadahTeks.classList.add('opacity-0');
        setTimeout(() => { isi(); wadahTeks.classList.remove('opacity-0'); }, 180);
    }

    function startKepsekAutoFade() {
        if (kepsekAutoTimer) clearInterval(kepsekAutoTimer);
        if (kurangiGerak()) return;
        kepsekAutoTimer = setInterval(() => {
            if (kepsekJeda || document.hidden) return;
            applyKepsekSlide((currentKepsekIndex + 1) % kepsekList.length);
        }, 6000);
    }

    AKSI.selectKepsek = (idx) => { applyKepsekSlide(idx); startKepsekAutoFade(); };

    const kepsekShowcase = document.getElementById('kepsek-showcase');
    if (kepsekShowcase) {
        kepsekShowcase.addEventListener('mouseenter', () => { kepsekJeda = true; });
        kepsekShowcase.addEventListener('mouseleave', () => { kepsekJeda = false; });
        kepsekShowcase.addEventListener('focusin', () => { kepsekJeda = true; });
        kepsekShowcase.addEventListener('focusout', () => { kepsekJeda = false; });
        startKepsekAutoFade();
    }

    /* --- 15. SLIDER CORE VALUES (ABOUT) --- */
    const pilarSlider = document.getElementById('pilar-slider');
    AKSI.scrollPilar = (direction) => {
        if (!pilarSlider) return;
        const card = pilarSlider.querySelector('.snap-center');
        const scrollAmount = card ? (card.offsetWidth + 24) : 400;
        pilarSlider.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: kurangiGerak() ? 'auto' : 'smooth' });
    };
    AKSI.goToPilar = (index) => {
        if (!pilarSlider) return;
        const cards = pilarSlider.querySelectorAll('.snap-center');
        if (cards[index]) pilarSlider.scrollTo({ left: cards[index].offsetLeft - pilarSlider.offsetLeft, behavior: kurangiGerak() ? 'auto' : 'smooth' });
    };
    const pilarDots = document.querySelectorAll('.pilar-dot');
    if (pilarSlider && pilarDots.length > 0) {
        let pilarScrollTimeout;
        pilarSlider.addEventListener('scroll', () => {
            clearTimeout(pilarScrollTimeout);
            pilarScrollTimeout = setTimeout(() => {
                const cards = pilarSlider.querySelectorAll('.snap-center');
                let activeIndex = 0; let minDiff = Infinity;
                cards.forEach((card, idx) => {
                    const diff = Math.abs((card.offsetLeft - pilarSlider.offsetLeft) - pilarSlider.scrollLeft);
                    if (diff < minDiff) { minDiff = diff; activeIndex = idx; }
                });
                pilarDots.forEach((dot, idx) => {
                    const aktif = idx === activeIndex;
                    dot.setAttribute('aria-current', aktif ? 'true' : 'false');
                    const batang = dot.querySelector('span');
                    if (!batang) return;
                    batang.classList.toggle('w-8', aktif);
                    batang.classList.toggle('bg-brand-primary', aktif);
                    batang.classList.toggle('w-2.5', !aktif);
                    batang.classList.toggle('bg-gray-300', !aktif);
                });
            }, 50);
        }, { passive: true });
    }

    /* --- 16. SLIDER CERITA ORANG TUA (BERANDA) --- */
    AKSI.scrollTestimonial = (direction) => {
        const slider = document.getElementById('testimonial-slider');
        if (!slider) return;
        const scrollAmount = slider.clientWidth > 768 ? 400 + 24 : slider.clientWidth;
        slider.scrollBy({ left: direction === 'left' ? -scrollAmount : scrollAmount, behavior: kurangiGerak() ? 'auto' : 'smooth' });
    };

    /* --- 17. LOWONGAN (KARIR) --- */
    const emailHRD = 'hrd@sedayabintang.sch.id';
    // [PERLU DATA: daftar lowongan yang benar-benar dibuka. Data di bawah masih contoh.]
    const akademikJobs = [
            {
                title: "Guru Mandarin SD (Native/Fluent)",
                type: "Full-Time", location: "Bandung", icon: "fa-language",
                desc: "Mengajar bahasa Mandarin menggunakan kurikulum terintegrasi dan standar HSK, serta membimbing murid dalam persiapan ujian sertifikasi.",
                req: ["Minimal S1 Pendidikan Bahasa Mandarin / Sastra China.", "Memiliki sertifikat HSK minimal level 5.", "Pengalaman mengajar anak usia SD minimal 2 tahun.", "Fasih berbahasa Mandarin lisan dan tulisan."]
            },
            {
                title: "Guru Matematika SMP/SMA",
                type: "Full-Time", location: "Bandung", icon: "fa-calculator",
                desc: "Merancang dan menyampaikan materi Matematika dengan pendekatan Critical Thinking (ACT) dan berorientasi pada pemecahan masalah (Problem Solving).",
                req: ["Minimal S1 Pendidikan Matematika / Matematika Murni.", "Mampu mengajar menggunakan pengantar Bahasa Inggris (Bilingual).", "Berpengalaman mengajar kurikulum Nasional (Merdeka) & Cambridge.", "Kreatif dalam membuat alat peraga pembelajaran."]
            },
            {
                title: "Guru Bimbingan & Konseling (BK)",
                type: "Full-Time", location: "Bandung", icon: "fa-hand-holding-heart",
                desc: "Memberikan bimbingan psikologis, akademik, dan karir kepada murid, serta berkolaborasi dengan orang tua untuk perkembangan murid.",
                req: ["Minimal S1 Bimbingan dan Konseling / Psikologi.", "Memiliki empati tinggi dan kemampuan komunikasi persuasif.", "Berpengalaman dalam menangani remaja.", "Memahami pendekatan konseling pendidikan."]
            },
            {
                title: "Guru IPA / Sains Terpadu (SD)",
                type: "Full-Time", location: "Bandung", icon: "fa-flask",
                desc: "Mengajar sains dengan pendekatan eksperimen praktis (Hands-on Learning) dan memfasilitasi keingintahuan alami murid.",
                req: ["Minimal S1 Pendidikan IPA / Sains.", "Mampu merancang eksperimen aman untuk usia SD.", "Kreatif, enerjik, dan menyukai dunia anak-anak.", "Bersedia mengajar lintas disiplin (STEM)."]
            },
            {
                title: "Teacher Assistant (KB-TK)",
                type: "Full-Time", location: "Bandung", icon: "fa-child-reaching",
                desc: "Mendampingi Guru Utama dalam kegiatan belajar mengajar, menyiapkan material kelas, dan mengobservasi perkembangan motorik anak.",
                req: ["Minimal S1 PGPAUD atau Psikologi Anak.", "Menyukai dunia anak usia dini dan sabar.", "Mampu berbahasa Inggris dasar.", "Aktif, cekatan, dan memiliki inisiatif tinggi."]
            }
        ];
    const officerJobs = [
            {
                title: "General Affair (GA) Officer",
                type: "Full-Time", location: "Bandung", icon: "fa-building-shield",
                desc: "Pemeliharaan fasilitas dan lingkungan fisik sekolah.",
                req: ["Minimal D3 / S1 Manajemen atau sederajat.", "Memiliki pengalaman sebagai GA di sekolah atau gedung perkantoran.", "Tegas, cekatan, dan memiliki problem-solving lapangan yang baik.", "Mampu mengelola vendor pihak ketiga."]
            },
            {
                title: "IT Support & Infrastructure",
                type: "Full-Time", location: "Bandung", icon: "fa-server",
                desc: "Pemeliharaan infrastruktur teknologi informasi dan portal Quintal.",
                req: ["Minimal D3 Teknik Informatika / Sistem Informasi.", "Menguasai troubleshooting hardware, OS, dan jaringan LAN/WiFi.", "Responsif terhadap keluhan teknis staf dan guru.", "Memiliki pengetahuan dasar tentang keamanan siber."]
            },
            {
                title: "Purchasing Staff",
                type: "Full-Time", location: "Bandung", icon: "fa-cart-flatbed",
                desc: "Pengelolaan kebutuhan pengadaan sekolah.",
                req: ["Minimal D3 Akuntansi / Manajemen.", "Berpengalaman dalam bidang purchasing/procurement minimal 1 tahun.", "Memiliki kemampuan negosiasi dan administrasi dokumen yang rapi.", "Jujur, teliti, dan berintegritas tinggi."]
            },
            {
                title: "Mechanical Electrical (ME) Technician",
                type: "Full-Time", location: "Bandung", icon: "fa-bolt",
                desc: "Perawatan sistem kelistrikan dan pengecekan fasilitas air rutin.",
                req: ["Lulusan SMK / D3 Teknik Mesin / Elektro.", "Memiliki sertifikasi keahlian lebih diutamakan.", "Berpengalaman merawat gedung bertingkat atau institusi pendidikan.", "Siap bekerja dengan sistem shift / siaga akhir pekan jika diperlukan."]
            },
            {
                title: "Graphic & UI/UX Designer",
                type: "Full-Time", location: "Bandung", icon: "fa-bezier-curve",
                desc: "Merancang materi komunikasi visual sekolah.",
                req: ["Minimal S1 Desain Komunikasi Visual (DKV).", "Mahir menggunakan Adobe Creative Suite, Figma, dan tools desain lainnya.", "Memiliki portofolio desain yang kuat (sertakan link).", "Kreatif, update terhadap tren desain visual edukasi."]
            }
        ];

    function generateJobsHTML(jobs, awalan) {
        return jobs.map((job, i) => `
            <div class="job-card bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                <h3>
                    <button type="button" data-aksi="toggleAccordion" aria-expanded="false" aria-controls="${awalan}-${i}" class="job-header w-full text-left p-5 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 group">
                        <span class="flex items-center gap-4 lg:gap-5">
                            <span class="w-12 h-12 rounded-full bg-brand-gray text-brand-primary flex items-center justify-center group-hover:bg-brand-yellow transition-colors shrink-0">
                                <i class="fa-solid ${job.icon} text-xl" aria-hidden="true"></i>
                            </span>
                            <span>
                                <span class="block font-bold text-brand-primary text-base lg:text-lg">${job.title}</span>
                                <span class="flex items-center gap-3 mt-1.5 flex-wrap">
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100"><i class="fa-regular fa-clock" aria-hidden="true"></i> ${job.type}</span>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-600 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100"><i class="fa-solid fa-location-dot" aria-hidden="true"></i> ${job.location}</span>
                                </span>
                            </span>
                        </span>
                        <span class="sm:self-center self-end w-11 h-11 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-primary text-gray-500 group-hover:text-brand-primary transition-colors shrink-0 accordion-icon">
                            <i class="fa-solid fa-chevron-down text-sm transition-transform duration-300" aria-hidden="true"></i>
                        </span>
                    </button>
                </h3>
                <div id="${awalan}-${i}" class="job-accordion-content bg-gray-50" inert>
                    <div class="job-accordion-inner">
                        <div class="p-5 lg:p-6 lg:pt-2 border-t border-gray-100">
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                                <div>
                                    <h4 class="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2"><i class="fa-solid fa-bullseye text-brand-primary" aria-hidden="true"></i> Deskripsi Pekerjaan</h4>
                                    <p class="text-sm text-gray-700 leading-relaxed">${job.desc}</p>
                                </div>
                                <div>
                                    <h4 class="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2"><i class="fa-solid fa-list-check text-brand-primary" aria-hidden="true"></i> Kualifikasi</h4>
                                    <ul class="text-sm text-gray-700 leading-relaxed list-disc list-outside ml-4 space-y-1">
                                        ${job.req.map(r => `<li>${r}</li>`).join('')}
                                    </ul>
                                </div>
                                <div class="md:col-span-2 flex justify-end pt-4 md:pt-6 md:border-t border-gray-200/60">
                                    <a href="mailto:${emailHRD}?subject=${encodeURIComponent('Lamaran: ' + job.title)}" class="w-full md:w-auto text-center bg-brand-primary text-white font-bold px-8 py-3 rounded-full hover:bg-brand-dark transition-colors shadow-md text-sm">
                                        Lamar Posisi Ini
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `).join('');
    }

    const contentAkademik = document.getElementById('content-akademik');
    if (contentAkademik) contentAkademik.innerHTML = generateJobsHTML(akademikJobs, 'lowongan-akademik');
    const contentOfficer = document.getElementById('content-officer');
    if (contentOfficer) contentOfficer.innerHTML = generateJobsHTML(officerJobs, 'lowongan-officer');

    AKSI.toggleAccordion = (arg, tombol) => {
        const bagian = tombol.closest('section') || document;
        const sedangBuka = tombol.getAttribute('aria-expanded') === 'true';
        bagian.querySelectorAll('.job-header').forEach(h => {
            h.setAttribute('aria-expanded', 'false');
            h.classList.remove('bg-gray-50/50');
            const isi = document.getElementById(h.getAttribute('aria-controls'));
            if (isi) { isi.classList.remove('open'); isi.setAttribute('inert', ''); }
            const ikon = h.querySelector('.accordion-icon i');
            if (ikon) ikon.classList.remove('rotate-180');
        });
        if (sedangBuka) return;
        tombol.setAttribute('aria-expanded', 'true');
        tombol.classList.add('bg-gray-50/50');
        const isi = document.getElementById(tombol.getAttribute('aria-controls'));
        if (isi) { isi.classList.add('open'); isi.removeAttribute('inert'); }
        const ikon = tombol.querySelector('.accordion-icon i');
        if (ikon) ikon.classList.add('rotate-180');
    };
});
