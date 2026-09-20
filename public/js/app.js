document.addEventListener('DOMContentLoaded', () => {

    /* --- 1. MODERN SLIDE-OVER DRAWER FOR MOBILE & TABLET --- */
    const btn = document.getElementById('mobile-menu-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('mobile-backdrop');
    const closeBtn = document.getElementById('close-drawer-btn');
    const hamburgerIcon = document.getElementById('hamburger-icon');

    // Make functions global so inline onclick="closeMobileMenu()" works
    window.openMobileMenu = function() {
        if(!drawer) return;
        drawer.classList.remove('translate-x-full');
        drawer.classList.add('translate-x-0');
        if(backdrop) {
            backdrop.classList.remove('opacity-0', 'pointer-events-none');
            backdrop.classList.add('opacity-100', 'pointer-events-auto');
        }
        if(hamburgerIcon) {
            hamburgerIcon.classList.replace('fa-bars', 'fa-xmark');
            hamburgerIcon.classList.add('rotate-90');
        }
        const easyWrapper = document.getElementById('easy-touch-wrapper');
        if(easyWrapper) {
            easyWrapper.classList.add('opacity-0', 'pointer-events-none', 'scale-90');
        }
        document.body.style.overflow = 'hidden';
    };

    window.closeMobileMenu = function() {
        if(!drawer) return;
        drawer.classList.remove('translate-x-0');
        drawer.classList.add('translate-x-full');
        if(backdrop) {
            backdrop.classList.remove('opacity-100', 'pointer-events-auto');
            backdrop.classList.add('opacity-0', 'pointer-events-none');
        }
        if(hamburgerIcon) {
            hamburgerIcon.classList.replace('fa-xmark', 'fa-bars');
            hamburgerIcon.classList.remove('rotate-90');
        }
        const easyWrapper = document.getElementById('easy-touch-wrapper');
        if(easyWrapper) {
            easyWrapper.classList.remove('opacity-0', 'pointer-events-none', 'scale-90');
        }
        document.body.style.overflow = '';
    };

    if (btn) {
        btn.addEventListener('click', () => {
            const isOpen = drawer.classList.contains('translate-x-0');
            if (isOpen) closeMobileMenu(); else openMobileMenu();
        });
    }
    if (closeBtn) closeBtn.addEventListener('click', closeMobileMenu);
    if (backdrop) backdrop.addEventListener('click', closeMobileMenu);
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && drawer && drawer.classList.contains('translate-x-0')) closeMobileMenu();
    });

    /* --- 2. MOBILE ACCORDION LOGIC --- */
    window.toggleMobileAccordion = function(id) {
        const submenu = document.getElementById(id);
        const iconEl = document.getElementById(id + '-icon');
        if(!submenu) return;
        
        const isCurrentlyOpen = submenu.classList.contains('open');
        document.querySelectorAll('.mobile-accordion-content').forEach(el => el.classList.remove('open'));
        document.querySelectorAll('[id$="-mobile-icon"]').forEach(icon => icon.style.transform = 'rotate(0deg)');

        if (!isCurrentlyOpen) {
            submenu.classList.add('open');
            if (iconEl) iconEl.style.transform = 'rotate(180deg)';
        }
    };

    /* --- 3. FLOATING HOME BUTTON & NAVBAR SHADOW ON SCROLL --- */
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        // Navbar shadow
        if(header) {
            if (window.scrollY > 20) {
                header.classList.add('shadow-md', 'py-1');
                header.classList.remove('py-2');
            } else {
                header.classList.remove('shadow-md', 'py-1');
                header.classList.add('py-2');
            }
        }
    });

    /* --- 4. SUCCESS MODAL LOGIC (GLOBAL) --- */
    window.showModal = function() {
        const modal = document.getElementById('success-modal');
        if(!modal) return;
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.querySelector('div').classList.remove('scale-95');
            modal.querySelector('div').classList.add('scale-100');
        }, 10);
    };

    window.closeModal = function() {
        const modal = document.getElementById('success-modal');
        if(!modal) return;
        modal.classList.add('opacity-0');
        modal.querySelector('div').classList.remove('scale-100');
        modal.querySelector('div').classList.add('scale-95');
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
        }, 300);
    };

    /* --- 5. TABS LOGIC (ABOUT, PRESCHOOL, KARIR) --- */
    
    /* --- TOGGLE SWITCH LOGIC (ABOUT PAGE) --- */
    window.toggleSwitch = function(tabId) {
        const bg = document.getElementById('switch-bg');
        const btnSumm = document.getElementById('switch-btn-summarecon');
        const btnPahoa = document.getElementById('switch-btn-pahoa');
        
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
        const selectedTab = document.getElementById('tab-' + tabId);
        if(selectedTab) selectedTab.classList.add('active');
        
        if(tabId === 'summarecon') {
            if(bg) bg.style.left = '4px';
            if(btnSumm) btnSumm.className = "relative z-10 w-1/2 py-3 lg:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold transition-colors text-white focus:outline-none flex items-center justify-center";
            if(btnPahoa) btnPahoa.className = "relative z-10 w-1/2 py-3 lg:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold transition-colors text-gray-500 hover:text-brand-primary focus:outline-none flex items-center justify-center";
        } else {
            if(bg) bg.style.left = 'calc(50%)';
            if(btnPahoa) btnPahoa.className = "relative z-10 w-1/2 py-3 lg:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold transition-colors text-white focus:outline-none flex items-center justify-center";
            if(btnSumm) btnSumm.className = "relative z-10 w-1/2 py-3 lg:py-3.5 rounded-full text-xs sm:text-sm lg:text-base font-bold transition-colors text-gray-500 hover:text-brand-primary focus:outline-none flex items-center justify-center";
        }
    };

    window.switchTab = function(tabId) {
        // Cek jika halaman About (tombol ada id tab-btn-)
        if(document.getElementById('tab-btn-' + tabId)) {
            document.querySelectorAll('.tab-content').forEach(tab => tab.classList.remove('active'));
            const btnSumm = document.getElementById('tab-btn-summarecon');
            const btnPahoa = document.getElementById('tab-btn-pahoa');
            if(btnSumm) btnSumm.className = "px-6 py-3 rounded-full text-sm lg:text-base font-bold transition-all bg-white text-gray-500 border-2 border-gray-200 hover:border-brand-primary hover:text-brand-primary";
            if(btnPahoa) btnPahoa.className = "px-6 py-3 rounded-full text-sm lg:text-base font-bold transition-all bg-white text-gray-500 border-2 border-gray-200 hover:border-brand-primary hover:text-brand-primary";
            
            const selectedTab = document.getElementById('tab-' + tabId);
            if(selectedTab) selectedTab.classList.add('active');
            
            const activeBtn = document.getElementById('tab-btn-' + tabId);
            if(activeBtn) activeBtn.className = "px-6 py-3 rounded-full text-sm lg:text-base font-bold transition-all bg-brand-primary text-white shadow-md border-2 border-brand-primary";
            return;
        }

        // Cek jika halaman Karir atau Preschool (tombol ada btn-)
        document.querySelectorAll('.tab-btn').forEach(btn => {
            if(btn.id.includes('btn-kb') || btn.id.includes('btn-tk')) { // Preschool style
                btn.classList.remove('active', 'bg-brand-primary', 'text-white', 'border-brand-primary');
                btn.classList.add('bg-gray-50', 'text-gray-600', 'border-gray-100');
            } else if(btn.id.includes('btn-akademik') || btn.id.includes('btn-officer')) { // Karir style
                btn.classList.remove('active', 'text-white');
                btn.classList.add('text-gray-500');
            }
        });
        
        document.querySelectorAll('.tab-content, #content-akademik, #content-officer').forEach(content => {
            if(content.classList.contains('tab-content')) content.classList.remove('active');
            else content.classList.add('hidden');
        });

        const activeBtn = document.getElementById('btn-' + tabId);
        if(activeBtn) {
            if(tabId === 'kb' || tabId === 'tk') {
                activeBtn.classList.remove('bg-gray-50', 'text-gray-600', 'border-gray-100');
                activeBtn.classList.add('active', 'bg-brand-primary', 'text-white', 'border-brand-primary');
            } else {
                activeBtn.classList.add('active', 'text-white');
                activeBtn.classList.remove('text-gray-500');
            }
        }

        const activeContent = document.getElementById('content-' + tabId);
        if(activeContent) {
            if(activeContent.classList.contains('tab-content')) activeContent.classList.add('active');
            else activeContent.classList.remove('hidden');
        }
    };

    /* --- 6. VERTICAL TABS (KURIKULUM) --- */
    window.switchMethod = function(index, element) {
        const panels = document.querySelectorAll('.tab-content-panel');
        panels.forEach(panel => panel.classList.remove('active'));
        
        const tabs = document.querySelectorAll('.method-tab');
        tabs.forEach(tab => {
            tab.classList.remove('active', 'bg-brand-gray');
            const iconDiv = tab.querySelector('.tab-icon');
            if(iconDiv) {
                iconDiv.classList.replace('bg-brand-primary', 'bg-gray-100');
                iconDiv.classList.replace('text-white', 'text-gray-400');
                iconDiv.style.transform = 'scale(1)';
            }
            const titleDiv = tab.querySelector('.tab-title');
            if(titleDiv) {
                titleDiv.classList.remove('text-brand-primary', 'font-bold');
                titleDiv.classList.add('text-gray-600', 'font-semibold');
            }
        });
        
        const activePanel = document.getElementById(`method-panel-${index}`);
        if(activePanel) activePanel.classList.add('active');
        
        element.classList.add('active');
        const activeIconDiv = element.querySelector('.tab-icon');
        if(activeIconDiv) {
            activeIconDiv.classList.replace('bg-gray-100', 'bg-brand-primary');
            activeIconDiv.classList.replace('text-gray-400', 'text-white');
            activeIconDiv.style.transform = 'scale(1.1)';
        }
        const activeTitleDiv = element.querySelector('.tab-title');
        if(activeTitleDiv) {
            activeTitleDiv.classList.replace('text-gray-600', 'text-brand-primary');
            activeTitleDiv.classList.replace('font-semibold', 'font-bold');
        }
    };

    /* --- 7. FILTER GALLERY & LIGHTBOX (FASILITAS) --- */
    window.filterGallery = function(category) {
        if(event && event.currentTarget) {
            document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active', 'bg-brand-primary', 'text-white'));
            event.currentTarget.classList.add('active', 'bg-brand-primary', 'text-white');
        }
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            if (category === 'all' || item.getAttribute('data-category') === category) {
                item.classList.remove('hidden-item');
            } else {
                item.classList.add('hidden-item');
            }
        });
    };

    window.openLightbox = function(element) {
        const lightbox = document.getElementById('lightbox');
        const lightboxImg = document.getElementById('lightbox-img');
        const lightboxCaption = document.getElementById('lightbox-caption');
        if(lightbox && lightboxImg && lightboxCaption) {
            const imgElement = element.querySelector('img');
            const titleElement = element.querySelector('h4');
            if(imgElement && titleElement) {
                lightboxImg.src = imgElement.src;
                lightboxCaption.innerText = titleElement.innerText;
                lightbox.classList.add('active');
                document.body.style.overflow = 'hidden';
            }
        }
    };

    window.closeLightbox = function() {
        const lightbox = document.getElementById('lightbox');
        if(lightbox) {
            lightbox.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    };

    /* --- 8. SCROLL REVEAL (ADMISSION) --- */
    function reveal() {
        var reveals = document.querySelectorAll(".reveal");
        for (var i = 0; i < reveals.length; i++) {
            var windowHeight = window.innerHeight;
            var elementTop = reveals[i].getBoundingClientRect().top;
            if (elementTop < windowHeight - 100) reveals[i].classList.add("active");
        }
    }
    window.addEventListener("scroll", reveal);
    reveal();

    /* --- 9. SLIDER LOGIC & EVENT DOTS (INDEX) --- */
    const eventSlider = document.getElementById('event-slider');
    const eventDots = document.querySelectorAll('.event-dot');
    if (eventSlider && eventDots.length > 0) {
        eventSlider.addEventListener('scroll', () => {
            const scrollLeft = eventSlider.scrollLeft;
            const cardWidth = eventSlider.clientWidth;
            let currentIndex = Math.round(scrollLeft / cardWidth);
            if (currentIndex >= eventDots.length) currentIndex = eventDots.length - 1;
            
            eventDots.forEach((dot, index) => {
                if (index === currentIndex) {
                    dot.classList.replace('w-2', 'w-6');
                    dot.classList.replace('bg-gray-300', 'bg-brand-primary');
                } else {
                    dot.classList.replace('w-6', 'w-2');
                    dot.classList.replace('bg-brand-primary', 'bg-gray-300');
                }
            });
        });
    }

    /* --- 10. HERO IMAGE FALLBACK (INDEX) --- */
    const heroImgFallback = document.getElementById('hero-image');
    if(heroImgFallback) {
        const heroUrls = [
            "https://drive.google.com/uc?export=view&id=1GPSPrhWGTwuh3Bx_W9oQQl_50UjIHP3b",
            "compressed_sedaya hero (2).jpg",
            "assets/images/hero-sekolah-utama.jpg"
        ];
        let currentHeroIdx = 0;
        heroImgFallback.onerror = function() {
            currentHeroIdx++;
            if(currentHeroIdx < heroUrls.length) {
                heroImgFallback.src = heroUrls[currentHeroIdx];
                if(currentHeroIdx === heroUrls.length - 1) {
                    heroImgFallback.classList.remove('object-contain', 'drop-shadow-2xl');
                    heroImgFallback.classList.add('object-cover', 'rounded-[32px]', 'shadow-2xl', 'border-4', 'border-white', 'mb-6');
                }
            }
        };
    }

    /* --- 11. INDEX MINIMALIST GALLERY SLIDER --- */
    window.changeSlide = function(index) {
        const imgEl = document.getElementById('gallery-img');
        const textContainer = document.getElementById('gallery-text-container');
        const titleEl = document.getElementById('gallery-title');
        const descEl = document.getElementById('gallery-desc');
        const sliderDots = document.querySelectorAll('.slider-dot');
        
        if (!imgEl || !textContainer || window.currentSlide === index) return; 
        
        // Define Slides Data inside the function or globally
        const slides = [
            { title: "Pembentukan Karakter Melalui Pendidikan Budi Pekerti", img: "assets/images/hero-sekolah-utama.jpg", desc: "Sekolah Terpadu Sedaya Bintang menekankan pendidikan karakter berlandaskan Di Zi Gui dan 10 Nilai Moral, penguasaan trilingual, dan daya berpikir kritis melalui STEAM." },
            { title: "Lingkungan Belajar yang Menyenangkan", img: "assets/images/lingkungan-belajar-menyenangkan.jpg", desc: "Fasilitas modern yang dirancang khusus untuk merangsang kreativitas dan minat belajar anak. Ruang kelas interaktif memastikan setiap murid mendapatkan perhatian optimal." },
            { title: "Kolaborasi dan Inovasi Sejak Dini", img: "assets/images/murid-kolaborasi-kelas.jpg", desc: "Melalui kurikulum STEAM, murid kami dilatih untuk memecahkan masalah, bekerja sama dalam tim, dan berinovasi menciptakan solusi untuk masa depan." }
        ];

        window.currentSlide = index;
        imgEl.classList.add('fade-out');
        textContainer.classList.add('fade-out');

        sliderDots.forEach((dot, i) => {
            if (i === window.currentSlide) {
                dot.classList.replace('w-2.5', 'w-8');
                dot.classList.replace('bg-gray-200', 'bg-brand-primary');
            } else {
                dot.classList.replace('w-8', 'w-2.5');
                dot.classList.replace('bg-brand-primary', 'bg-gray-200');
            }
        });

        setTimeout(() => {
            imgEl.src = slides[window.currentSlide].img;
            titleEl.innerText = slides[window.currentSlide].title;
            descEl.innerText = slides[window.currentSlide].desc;
            
            imgEl.classList.remove('fade-out');
            textContainer.classList.remove('fade-out');
            void imgEl.offsetWidth; // trigger reflow
            imgEl.classList.add('fade-in');
            textContainer.classList.add('fade-in');
            
            setTimeout(() => {
                imgEl.classList.remove('fade-in');
                textContainer.classList.remove('fade-in');
            }, 500); 
        }, 500); 
    };

    if (document.getElementById('gallery-img') && document.getElementById('gallery-text-container')) {
        window.currentSlide = 0;
        setInterval(() => {
            let nextSlide = (window.currentSlide + 1) % 3;
            changeSlide(nextSlide);
        }, 6000);
    }

    /* --- 12. VIDEO HOVER LOGIC --- */
    document.querySelectorAll('.hover-video-card').forEach(card => {
        const video = card.querySelector('.hover-video');
        let loopTimeout; let isHovering = false;
        if (video) {
            video.pause(); video.currentTime = 0;
            card.addEventListener('mouseenter', () => {
                isHovering = true; clearTimeout(loopTimeout);
                const playPromise = video.play();
                if (playPromise !== undefined) playPromise.catch(e => {});
            });
            card.addEventListener('mouseleave', () => {
                isHovering = false; clearTimeout(loopTimeout);
                video.pause(); video.currentTime = 0;
            });
            video.addEventListener('ended', () => {
                if (isHovering) {
                    loopTimeout = setTimeout(() => {
                        if (isHovering) {
                            video.currentTime = 0;
                            const playPromise = video.play();
                            if (playPromise !== undefined) playPromise.catch(e => {});
                        }
                    }, 1000);
                }
            });
        }
    });

    /* --- 13. BUDI PEKERTI LOGIC --- */
    window.switchBaktiImage = function(index) {
        const items = document.querySelectorAll('.interactive-list-item');
        items.forEach((item, i) => {
            if (i === index) item.classList.add('active');
            else item.classList.remove('active');
        });

        const images = document.querySelectorAll('.crossfade-img');
        images.forEach((img, i) => {
            if (i === index) img.classList.add('active');
            else img.classList.remove('active');
        });
    };

    window.nilaiData = [
        { icon: "fa-user-tie", title: "Etika / Sopan Santun", desc: "Penerapan tata krama pergaulan, adab makan, cara duduk yang baik, serta etika berbicara secara santun dalam interaksi sosial sehari-hari.", example: "Si kecil dibiasakan mengucapkan 'tolong' dan 'terima kasih', serta merapikan tempat makannya sendiri.", img: "assets/images/budi-pekerti-etika-sopan-santun.jpg" },
        { icon: "fa-person-cane", title: "Hormat kepada yang Tua", desc: "Membiasakan anak bersikap sopan dan penuh penghargaan di hadapan guru, kakak kelas, staf sekolah, serta anggota masyarakat yang lebih tua.", example: "Anak-anak belajar untuk menyapa guru di pagi hari dan mendahulukan orang yang lebih tua saat mengantre.", img: "assets/images/hero-sekolah-utama.jpg" },
        { icon: "fa-hand-holding-heart", title: "Welas Asih", desc: "Membangun kepekaan emosional anak agar peduli terhadap kesulitan sesama teman dan memperlakukan setiap makhluk hidup dengan kasih sayang.", example: "Si kecil tidak ragu membantu temannya yang terjatuh atau meminjamkan alat tulisnya tanpa diminta.", img: "assets/images/budi-pekerti-welas-asih.jpg" },
        { icon: "fa-hand-sparkles", title: "Bersih dan Jujur", desc: "Menjaga keselarasan antara kebersihan fisik (tubuh, pakaian, lingkungan) dengan kejujuran hati dalam setiap perkataan dan tindakan.", example: "Si kecil berani berkata jujur jika tidak sengaja menumpahkan air, lalu bertanggung jawab membersihkannya.", img: "assets/images/kebersamaan-murid-orangtua.jpg" },
        { icon: "fa-face-flushed", title: "Perasaan Malu", desc: "Menanamkan kepekaan pada diri anak agar memiliki rasa enggan dan malu apabila melakukan perbuatan yang melanggar kesepakatan kelas.", example: "Si kecil akan merasa tidak nyaman jika menyela pembicaraan orang lain dan berusaha untuk menunggu gilirannya.", img: "assets/images/budi-pekerti-kedisiplinan.jpg" },
        { icon: "fa-handshake", title: "Terpercaya", desc: "Membentuk integritas pribadi anak agar perkataannya selalu selaras dengan tindakan, serta dapat diandalkan dalam tugas kecil.", example: "Jika si kecil berjanji akan mengembalikan buku cerita ke raknya, ia akan menepatinya tanpa perlu diingatkan.", img: "assets/images/budi-pekerti-dapat-dipercaya.jpg" },
        { icon: "fa-house-chimney-user", title: "Bakti kepada Orang Tua", desc: "Menumbuhkan rasa cinta kasih, empati, dan kepatuhan yang tulus terhadap arahan serta kasih sayang orang tua di rumah.", example: "Si kecil menyambut hangat orang tuanya sepulang sekolah dan menceritakan harinya dengan antusias.", img: "assets/images/budi-pekerti-cuci-kaki-orangtua.jpg" },
        { icon: "fa-lightbulb", title: "Bijaksana / Arif", desc: "Melatih kemampuan anak sejak dini untuk memilah mana hal yang membawa kebaikan bersama, serta belajar mengambil keputusan dengan tenang.", example: "Si kecil mampu memilih mainan secara adil bersama teman kelompoknya tanpa perlu merebut paksa.", img: "assets/images/program-workshop.jpg" },
        { icon: "fa-scale-balanced", title: "Kebenaran & Keadilan", desc: "Melatih sikap objektif, proporsional, menjunjung tinggi hak teman lain, dan berani membela kebenaran secara damai dan sopan.", example: "Si kecil tahu kapan harus meminta maaf jika salah, dan berani membela temannya yang diperlakukan tidak adil.", img: "assets/images/fasilitas-spacelab.jpg" },
        { icon: "fa-shield-heart", title: "Kesetiaan", desc: "Memiliki keteguhan terhadap prinsip kebenaran, serta belajar peduli untuk menjaga nama baik keluarga, sekolah, dan persahabatannya.", example: "Si kecil menjaga rahasia teman baiknya dan selalu hadir memberikan dukungan saat temannya bersedih.", img: "assets/images/guru-sedaya-bintang.jpg" }
    ];

    window.openNilaiModal = function(index) {
        const nModal = document.getElementById('nilai-modal');
        if(!nModal) return;
        const data = window.nilaiData[index];
        document.getElementById('m-nilai-title').innerText = data.title;
        document.getElementById('m-nilai-desc').innerText = data.desc;
        document.getElementById('m-nilai-example').innerText = `"${data.example}"`;
        document.getElementById('m-nilai-img').src = data.img;
        document.getElementById('m-nilai-icon').innerHTML = `<i class="fa-solid ${data.icon}"></i>`;
        
        nModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeNilaiModal = function(e, force = false) {
        const nModal = document.getElementById('nilai-modal');
        if(!nModal) return;
        if (force || e.target === nModal) {
            nModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    };

    window.dzgData = [
        { badge: "Esensi", hanzi: "总", pinyin: "Zǒng Xù (总叙)", title: "Pendahuluan", desc: "Memaparkan urutan prioritas yang ideal: bakti dan rasa hormat ditempatkan paling utama, diikuti sikap hati-hati, cinta kasih universal, barulah mempelajari ilmu pengetahuan akademis.", example: "Guru kami selalu memastikan si kecil paham cara bersikap baik sebelum memulai pelajaran kognitif yang berat.", img: "assets/images/hero-sekolah-utama.jpg" },
        { badge: "Bab 1", hanzi: "孝", pinyin: "Rù Zé Xiào (入则孝)", title: "Bakti di Rumah", desc: "Penjelasan tentang cara si kecil merespons panggilan orang tua dengan sigap, menjaga nama baik agar keluarga tenang, serta bersikap sopan di dalam rumah.", example: "Si kecil belajar untuk menjawab panggilan mama dan papanya tanpa menunda-nunda.", img: "assets/images/budi-pekerti-cuci-kaki-orangtua.jpg" },
        { badge: "Bab 2", hanzi: "悌", pinyin: "Chū Zé Tì (出则悌)", title: "Etika Luar Rumah", desc: "Panduan praktis berinteraksi dengan saudara atau kerabat, serta menyapa orang yang lebih tua di lingkungan sosial dengan penuh keharmonisan.", example: "Si kecil terbiasa membungkuk sedikit sambil menyapa staf dan guru saat tiba di gerbang sekolah.", img: "assets/images/budi-pekerti-welas-asih.jpg" },
        { badge: "Bab 3", hanzi: "谨", pinyin: "Jǐn (谨)", title: "Kedisiplinan Hidup", desc: "Menanamkan kebiasaan manajemen waktu, bangun pagi, menjaga kerapian pakaian seragam, adab makan yang tidak berantakan, serta kehati-hatian melangkah.", example: "Si kecil mampu merapikan alat belajarnya sendiri setelah sesi metode Learning Corners selesai.", img: "assets/images/budi-pekerti-kedisiplinan.jpg" },
        { badge: "Bab 4", hanzi: "信", pinyin: "Xìn (信)", title: "Dapat Dipercaya", desc: "Melatih kejujuran lisan sejak dini, menghindari bualan atau kebohongan, menepati janji, dan membiasakan tanggung jawab atas barang pinjaman.", example: "Si kecil selalu mengembalikan krayon atau buku milik temannya tepat waktu dan mengucapkan terima kasih.", img: "assets/images/budi-pekerti-dapat-dipercaya.jpg" },
        { badge: "Bab 5", hanzi: "爱", pinyin: "Fàn Ài Zhòng (泛爱众)", title: "Cinta Kasih Sesama", desc: "Membangun empati untuk suka menolong, mencegah perilaku perundungan (bullying), dan bersikap adil terhadap teman tanpa membeda-bedakan.", example: "Si kecil mau berbagi bekal makanannya dan tidak ragu bermain dengan siapa saja di playground.", img: "assets/images/guru-sedaya-bintang.jpg" },
        { badge: "Bab 6", hanzi: "仁", pinyin: "Qīn Rén (亲仁)", title: "Mendekati yang Berbudi", desc: "Menumbuhkan kesadaran anak untuk mencari lingkungan pergaulan yang sehat, mendekati sosok panutan, dan menerima nasihat yang membangun.", example: "Si kecil menjadi lebih antusias meneladani kebiasaan membaca dari teman sebangkunya yang rajin.", img: "assets/images/program-workshop.jpg" },
        { badge: "Bab 7", hanzi: "文", pinyin: "Yú Lì Xué Wén (余力学文)", title: "Belajar Ilmu", desc: "Menegaskan metode belajar yang benar setelah fondasi etika kuat: belajar dengan sungguh-sungguh (mata, hati, mulut fokus) dan tidak mudah menyerah.", example: "Si kecil lebih gigih saat mencoba memecahkan blok teka-teki logika STEAM dan tidak mudah menangis saat gagal.", img: "assets/images/fasilitas-spacelab.jpg" }
    ];

    window.openDzgModal = function(index) {
        const dModal = document.getElementById('dzg-modal');
        if(!dModal) return;
        const data = window.dzgData[index];
        const mDBadge = document.getElementById('m-dzg-badge');
        document.getElementById('m-dzg-hanzi').innerText = data.hanzi;
        document.getElementById('m-dzg-pinyin').innerText = data.pinyin;
        document.getElementById('m-dzg-title').innerText = data.title;
        document.getElementById('m-dzg-desc').innerText = data.desc;
        document.getElementById('m-dzg-example').innerText = `"${data.example}"`;
        document.getElementById('m-dzg-img').src = data.img;
        mDBadge.innerText = data.badge;
        
        if(data.badge === 'Esensi') {
            mDBadge.classList.remove('bg-brand-yellow', 'text-brand-primary');
            mDBadge.classList.add('bg-brand-red', 'text-white');
        } else {
            mDBadge.classList.remove('bg-brand-red', 'text-white');
            mDBadge.classList.add('bg-brand-yellow', 'text-brand-primary');
        }

        dModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeDzgModal = function(e, force = false) {
        const dModal = document.getElementById('dzg-modal');
        if(!dModal) return;
        if (force || e.target === dModal) {
            dModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    };

    window.openVideoModal = function() {
        const vModal = document.getElementById('video-modal');
        const vFrame = document.getElementById('youtube-frame');
        if(!vModal || !vFrame) return;
        vFrame.src = "https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1"; 
        vModal.classList.add('show');
        document.body.style.overflow = 'hidden';
    };

    window.closeVideoModal = function(e, force = false) {
        const vModal = document.getElementById('video-modal');
        const vFrame = document.getElementById('youtube-frame');
        if(!vModal) return;
        if (force || e.target === vModal) {
            if(vFrame) vFrame.src = ""; 
            vModal.classList.remove('show');
            document.body.style.overflow = 'auto';
        }
    };

    /* --- 14. TRIBAHASA PROGRESS BARS --- */
    window.animateProgressBars = function() {
        const prog1 = document.getElementById('prog-1');
        const prog2 = document.getElementById('prog-2');
        if (!prog1 || !prog2) return;
        const rect1 = prog1.getBoundingClientRect();
        if (rect1.top < window.innerHeight && rect1.bottom >= 0) {
            prog1.style.width = '70%';
            prog2.style.width = '42%';
            window.removeEventListener('scroll', window.animateProgressBars);
        }
    };
    window.addEventListener('scroll', window.animateProgressBars);
    window.animateProgressBars();

    const principalData = [
        {
            name: "Dr. Ibu Kepala Sekolah",
            title: "Head of KB-TK, Sedaya Bintang",
            quote: '"Usia dini adalah masa emas untuk membentuk bahasa dan karakter anak — tugas kami mendampingi mereka di masa ini."',
            p1: "Pendidikan anak usia dini merupakan masa emas perkembangan otak. Pada masa ini, anak memiliki kelenturan tinggi untuk menyerap bahasa dan nilai kehidupan.",
            p2: "Kami menitikberatkan pendidikan Budi Pekerti berlandaskan Di Zi Gui dan 10 Nilai Moral, membekali trilingual secara interaktif, dan mengasah nalar kritis lewat STEAM.",
            img: "assets/images/head-of-school.jpg"
        },
        {
            name: "Bapak Kepala Sekolah",
            title: "Head of SD, Sedaya Bintang",
            quote: '"Karakter yang kuat dan cara berpikir yang kritis adalah bekal utama murid untuk masa depan."',
            p1: "Di tingkat dasar, kami membekali murid dengan kompetensi akademik yang kokoh tanpa meninggalkan nilai moral dan budi pekerti.",
            p2: "Kurikulum Nasional yang dipadukan dengan ACT (Attitude, Communication, Thinking) dan lingkungan Trilingual mempersiapkan anak untuk masa depan yang lebih luas.",
            img: "assets/images/guru-sedaya-bintang.jpg"
        }
    ];
    
    let currentPrincipalIndex = 0;
    const kepsekImgEl = document.getElementById("kepsek-img");
    const kepsekNameEl = document.getElementById("kepsek-name");
    const kepsekTitleEl = document.getElementById("kepsek-title");
    const kepsekQuoteEl = document.getElementById("kepsek-quote");
    const kepsekP1El = document.getElementById("kepsek-p1");
    const kepsekP2El = document.getElementById("kepsek-p2");
    const kepsekImgWrapper = document.getElementById("kepsek-img-wrapper");
    const kepsekTextWrapper = document.getElementById("kepsek-text-wrapper");

    if(kepsekImgEl && kepsekTextWrapper) {
        setInterval(() => {
            kepsekImgWrapper.style.opacity = '0';
            kepsekTextWrapper.style.opacity = '0';
            
            setTimeout(() => {
                currentPrincipalIndex = (currentPrincipalIndex + 1) % principalData.length;
                const data = principalData[currentPrincipalIndex];
                
                kepsekImgEl.src = data.img;
                kepsekNameEl.textContent = data.name;
                kepsekTitleEl.textContent = data.title;
                kepsekQuoteEl.textContent = data.quote;
                kepsekP1El.textContent = data.p1;
                kepsekP2El.textContent = data.p2;
                
                kepsekImgWrapper.style.opacity = '1';
                kepsekTextWrapper.style.opacity = '1';
            }, 500);
        }, 5000);
    }

});

/* --- KARIR LOGIC --- */

        // Data Lowongan Akademik
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
                desc: "Memberikan bimbingan psikologis, akademik, dan karir kepada murid, serta berkolaborasi dengan orang tua untuk perkembangan holistik murid.",
                req: ["Minimal S1 Bimbingan dan Konseling / Psikologi.", "Memiliki empati tinggi dan kemampuan komunikasi persuasif.", "Berpengalaman dalam menangani remaja.", "Memahami pendekatan konseling pendidikan modern."]
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

        // Data Lowongan Non-Akademik (Officer)
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
                req: ["Minimal S1 Desain Komunikasi Visual (DKV).", "Mahir menggunakan Adobe Creative Suite, Figma, dan tools desain modern.", "Memiliki portofolio desain yang kuat (sertakan link).", "Kreatif, update terhadap tren desain visual edukasi."]
            }
        ];

        // Fungsi Render HTML
        function generateJobsHTML(jobs) {
            return jobs.map((job, index) => `
                <div class="job-card bg-white border border-gray-100 rounded-xl lg:rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300">
                    <div class="job-header p-5 lg:p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center cursor-pointer gap-4 group" onclick="toggleAccordion(this)">
                        <div class="flex items-center gap-4 lg:gap-5">
                            <div class="w-12 h-12 rounded-full bg-brand-gray text-brand-primary flex items-center justify-center group-hover:bg-brand-yellow transition-colors shrink-0">
                                <i class="fa-solid ${job.icon} text-xl"></i>
                            </div>
                            <div>
                                <h3 class="font-bold text-brand-primary text-base lg:text-lg group-hover:text-[#15346b] transition-colors">${job.title}</h3>
                                <div class="flex items-center gap-3 mt-1.5 flex-wrap">
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                        <i class="fa-regular fa-clock"></i> ${job.type}
                                    </span>
                                    <span class="inline-flex items-center gap-1.5 text-xs font-medium text-gray-500 bg-gray-50 px-2.5 py-1 rounded-md border border-gray-100">
                                        <i class="fa-solid fa-location-dot"></i> ${job.location}
                                    </span>
                                </div>
                            </div>
                        </div>
                        <div class="sm:self-center self-end w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center group-hover:border-brand-primary text-gray-400 group-hover:text-brand-primary transition-all shrink-0 accordion-icon">
                            <i class="fa-solid fa-chevron-down text-sm transition-transform duration-300"></i>
                        </div>
                    </div>
                    
                    <!-- Area Accordion -->
                    <div class="job-accordion-content bg-gray-50">
                        <div class="job-accordion-inner">
                            <div class="p-5 lg:p-6 lg:pt-2 border-t border-gray-100">
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8 relative pb-20 lg:pb-0">
                                    <div>
                                        <h4 class="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2"><i class="fa-solid fa-bullseye text-brand-yellow"></i> Deskripsi Pekerjaan</h4>
                                        <p class="text-xs lg:text-sm text-gray-600 leading-relaxed">${job.desc}</p>
                                    </div>
                                    <div>
                                        <h4 class="text-sm font-bold text-brand-primary mb-2 flex items-center gap-2"><i class="fa-solid fa-list-check text-brand-yellow"></i> Kualifikasi</h4>
                                        <ul class="text-xs lg:text-sm text-gray-600 leading-relaxed list-disc list-outside ml-4 space-y-1">
                                            ${job.req.map(r => `<li>${r}</li>`).join('')}
                                        </ul>
                                    </div>
                                    
                                    <!-- Sticky Button Apply -->
                                    <div class="absolute bottom-0 right-0 left-0 md:static md:col-span-2 flex justify-end mt-4 pt-4 md:pt-6 md:border-t border-gray-200/60 sticky-footer-area">
                                        <button class="w-full md:w-auto bg-brand-primary text-white font-bold px-8 py-3 rounded-full hover:bg-[#15346b] transition-colors shadow-md text-sm">
                                            Apply Now
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            `).join('');
        }

        document.addEventListener('DOMContentLoaded', () => {
            const contentAkademik = document.getElementById('content-akademik');
            if (contentAkademik) { contentAkademik.innerHTML = generateJobsHTML(akademikJobs); }
            const contentOfficer = document.getElementById('content-officer');
            if (contentOfficer) { contentOfficer.innerHTML = generateJobsHTML(officerJobs); }
        });

        // Accordion Logic
        window.toggleAccordion = function(element) {
            const content = element.nextElementSibling;
            const icon = element.querySelector('.accordion-icon i');
            
            if (content.classList.contains('open')) {
                content.classList.remove('open');
                icon.style.transform = 'rotate(0deg)';
                element.classList.remove('bg-gray-50/50');
            } else {
                const allContents = element.closest('section').querySelectorAll('.job-accordion-content');
                const allIcons = element.closest('section').querySelectorAll('.accordion-icon i');
                const allHeaders = element.closest('section').querySelectorAll('.job-header');
                
                allContents.forEach(c => c.classList.remove('open'));
                allIcons.forEach(i => i.style.transform = 'rotate(0deg)');
                allHeaders.forEach(h => h.classList.remove('bg-gray-50/50'));
                content.classList.add('open');
                icon.style.transform = 'rotate(180deg)';
                element.classList.add('bg-gray-50/50');
            }
        };

    // TESTIMONIAL SLIDER LOGIC
    window.scrollTestimonial = function(direction) {
        const slider = document.getElementById('testimonial-slider');
        if (!slider) return;
        const scrollAmount = slider.clientWidth > 768 ? 400 + 24 : slider.clientWidth;
        if (direction === 'left') {
            slider.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
        } else {
            slider.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
    };

    // TESTIMONIAL VIDEO MODAL LOGIC
    window.openTestimonialModal = function(videoUrl) {
        const modal = document.getElementById('testimonial-video-modal');
        const modalContent = document.getElementById('video-modal-content');
        const player = document.getElementById('testimonial-video-player');
        if (!modal || !player) return;

        // Set video source
        player.src = videoUrl;

        // Show modal
        modal.classList.remove('hidden');
        modal.classList.add('flex');
        
        // Slight delay for animation
        setTimeout(() => {
            modal.classList.remove('opacity-0');
            modal.classList.add('opacity-100');
            modalContent.classList.remove('scale-95');
            modalContent.classList.add('scale-100');
            player.play();
        }, 10);

        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    };

    window.closeTestimonialModal = function() {
        const modal = document.getElementById('testimonial-video-modal');
        const modalContent = document.getElementById('video-modal-content');
        const player = document.getElementById('testimonial-video-player');
        if (!modal) return;

        // Hide animations
        modal.classList.remove('opacity-100');
        modal.classList.add('opacity-0');
        modalContent.classList.remove('scale-100');
        modalContent.classList.add('scale-95');
        
        // Pause video
        if (player) {
            player.pause();
            player.currentTime = 0;
        }

        // Remove from DOM after animation
        setTimeout(() => {
            modal.classList.add('hidden');
            modal.classList.remove('flex');
            if (player) player.src = ""; // Clear source
            document.body.style.overflow = '';
        }, 300);
    };

    // Close modal on ESC key
    window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
            const modal = document.getElementById('testimonial-video-modal');
            if (modal && !modal.classList.contains('hidden')) {
                window.closeTestimonialModal();
            }
        }
    });
