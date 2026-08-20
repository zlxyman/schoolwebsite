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
    const floatingHomeBtn = document.getElementById('floating-home-btn');
    const header = document.getElementById('main-header');
    
    window.addEventListener('scroll', () => {
        // Floating button
        if(floatingHomeBtn) {
            if (window.scrollY > 350) {
                floatingHomeBtn.classList.remove('translate-y-20', 'opacity-0', 'pointer-events-none');
                floatingHomeBtn.classList.add('translate-y-0', 'opacity-100', 'pointer-events-auto');
            } else {
                floatingHomeBtn.classList.remove('translate-y-0', 'opacity-100', 'pointer-events-auto');
                floatingHomeBtn.classList.add('translate-y-20', 'opacity-0', 'pointer-events-none');
            }
        }
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
            "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=800"
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
            { title: "Pembentukan Karakter Melalui Pendidikan Budi Pekerti", img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=1200", desc: "Sekolah Terpadu Sedaya Bintang menekankan pendidikan karakter yang mengacu pada Di Zi Gui, penguasaan trilingual, dan pengembangan daya berpikir kritis melalui STEAM." },
            { title: "Lingkungan Belajar yang Menyenangkan", img: "https://images.pexels.com/photos/289737/pexels-photo-289737.jpeg?auto=compress&cs=tinysrgb&w=1200", desc: "Fasilitas modern yang dirancang khusus untuk merangsang kreativitas dan minat belajar anak. Ruang kelas interaktif memastikan setiap siswa mendapatkan perhatian optimal." },
            { title: "Kolaborasi dan Inovasi Sejak Dini", img: "https://images.pexels.com/photos/892654/pexels-photo-892654.jpeg?auto=compress&cs=tinysrgb&w=1200", desc: "Melalui kurikulum STEAM, siswa kami dilatih untuk memecahkan masalah, bekerja sama dalam tim, dan berinovasi menciptakan solusi untuk masa depan." }
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
        { icon: "fa-user-tie", title: "Etika / Sopan Santun", desc: "Penerapan tata krama pergaulan, adab makan, cara duduk yang baik, serta etika berbicara secara santun dalam interaksi sosial sehari-hari.", example: "Si kecil dibiasakan mengucapkan 'tolong' dan 'terima kasih', serta merapikan tempat makannya sendiri.", img: "https://images.pexels.com/photos/8612918/pexels-photo-8612918.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-person-cane", title: "Hormat kepada yang Tua", desc: "Membiasakan anak bersikap sopan dan penuh penghargaan di hadapan guru, kakak kelas, staf sekolah, serta anggota masyarakat yang lebih tua.", example: "Anak-anak belajar untuk menyapa guru di pagi hari dan mendahulukan orang yang lebih tua saat mengantre.", img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-hand-holding-heart", title: "Welas Asih", desc: "Membangun kepekaan emosional anak agar peduli terhadap kesulitan sesama teman dan memperlakukan setiap makhluk hidup dengan kasih sayang.", example: "Si kecil tidak ragu membantu temannya yang terjatuh atau meminjamkan alat tulisnya tanpa diminta.", img: "https://images.pexels.com/photos/8613303/pexels-photo-8613303.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-hand-sparkles", title: "Bersih dan Jujur", desc: "Menjaga keselarasan antara kebersihan fisik (tubuh, pakaian, lingkungan) dengan kejujuran hati dalam setiap perkataan dan tindakan.", example: "Si kecil berani berkata jujur jika tidak sengaja menumpahkan air, lalu bertanggung jawab membersihkannya.", img: "https://images.pexels.com/photos/8613089/pexels-photo-8613089.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-face-flushed", title: "Perasaan Malu", desc: "Menanamkan kepekaan pada diri anak agar memiliki rasa enggan dan malu apabila melakukan perbuatan yang melanggar kesepakatan kelas.", example: "Si kecil akan merasa tidak nyaman jika menyela pembicaraan orang lain dan berusaha untuk menunggu gilirannya.", img: "https://images.pexels.com/photos/3862283/pexels-photo-3862283.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-handshake", title: "Terpercaya", desc: "Membentuk integritas pribadi anak agar perkataannya selalu selaras dengan tindakan, serta dapat diandalkan dalam tugas kecil.", example: "Jika si kecil berjanji akan mengembalikan buku cerita ke raknya, ia akan menepatinya tanpa perlu diingatkan.", img: "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-house-chimney-user", title: "Bakti kepada Orang Tua", desc: "Menumbuhkan rasa cinta kasih, empati, dan kepatuhan yang tulus terhadap arahan serta kasih sayang orang tua di rumah.", example: "Si kecil menyambut hangat orang tuanya sepulang sekolah dan menceritakan harinya dengan antusias.", img: "https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-lightbulb", title: "Bijaksana / Arif", desc: "Melatih kemampuan anak sejak dini untuk memilah mana hal yang membawa kebaikan bersama, serta belajar mengambil keputusan dengan tenang.", example: "Si kecil mampu memilih mainan secara adil bersama teman kelompoknya tanpa perlu merebut paksa.", img: "https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-scale-balanced", title: "Kebenaran & Keadilan", desc: "Melatih sikap objektif, proporsional, menjunjung tinggi hak teman lain, dan berani membela kebenaran secara damai dan sopan.", example: "Si kecil tahu kapan harus meminta maaf jika salah, dan berani membela temannya yang diperlakukan tidak adil.", img: "https://images.pexels.com/photos/8197545/pexels-photo-8197545.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { icon: "fa-shield-heart", title: "Kesetiaan", desc: "Memiliki keteguhan terhadap prinsip kebenaran, serta belajar peduli untuk menjaga nama baik keluarga, sekolah, dan persahabatannya.", example: "Si kecil menjaga rahasia teman baiknya dan selalu hadir memberikan dukungan saat temannya bersedih.", img: "https://images.pexels.com/photos/8612920/pexels-photo-8612920.jpeg?auto=compress&cs=tinysrgb&w=600" }
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
        { badge: "Esensi", hanzi: "总", pinyin: "Zǒng Xù (总叙)", title: "Pendahuluan", desc: "Memaparkan urutan prioritas yang ideal: bakti dan rasa hormat ditempatkan paling utama, diikuti sikap hati-hati, cinta kasih universal, barulah mempelajari ilmu pengetahuan akademis.", example: "Guru kami selalu memastikan si kecil paham cara bersikap baik sebelum memulai pelajaran kognitif yang berat.", img: "https://images.pexels.com/photos/5212345/pexels-photo-5212345.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 1", hanzi: "孝", pinyin: "Rù Zé Xiào (入则孝)", title: "Bakti di Rumah", desc: "Penjelasan tentang cara si kecil merespons panggilan orang tua dengan sigap, menjaga nama baik agar keluarga tenang, serta bersikap sopan di dalam rumah.", example: "Si kecil belajar untuk menjawab panggilan mama dan papanya tanpa menunda-nunda.", img: "https://images.pexels.com/photos/5212321/pexels-photo-5212321.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 2", hanzi: "悌", pinyin: "Chū Zé Tì (出则悌)", title: "Etika Luar Rumah", desc: "Panduan praktis berinteraksi dengan saudara atau kerabat, serta menyapa orang yang lebih tua di lingkungan sosial dengan penuh keharmonisan.", example: "Si kecil terbiasa membungkuk sedikit sambil menyapa staf dan guru saat tiba di gerbang sekolah.", img: "https://images.pexels.com/photos/8613303/pexels-photo-8613303.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 3", hanzi: "谨", pinyin: "Jǐn (谨)", title: "Kedisiplinan Hidup", desc: "Menanamkan kebiasaan manajemen waktu, bangun pagi, menjaga kerapian pakaian seragam, adab makan yang tidak berantakan, serta kehati-hatian melangkah.", example: "Si kecil mampu merapikan alat belajarnya sendiri setelah sesi metode Learning Corners selesai.", img: "https://images.pexels.com/photos/3862283/pexels-photo-3862283.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 4", hanzi: "信", pinyin: "Xìn (信)", title: "Dapat Dipercaya", desc: "Melatih kejujuran lisan sejak dini, menghindari bualan atau kebohongan, menepati janji, dan membiasakan tanggung jawab atas barang pinjaman.", example: "Si kecil selalu mengembalikan krayon atau buku milik temannya tepat waktu dan mengucapkan terima kasih.", img: "https://images.pexels.com/photos/1001914/pexels-photo-1001914.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 5", hanzi: "爱", pinyin: "Fàn Ài Zhòng (泛爱众)", title: "Cinta Kasih Sesama", desc: "Membangun empati untuk suka menolong, mencegah perilaku perundungan (bullying), dan bersikap adil terhadap teman tanpa membeda-bedakan.", example: "Si kecil mau berbagi bekal makanannya dan tidak ragu bermain dengan siapa saja di playground.", img: "https://images.pexels.com/photos/8612920/pexels-photo-8612920.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 6", hanzi: "仁", pinyin: "Qīn Rén (亲仁)", title: "Mendekati yang Berbudi", desc: "Menumbuhkan kesadaran anak untuk mencari lingkungan pergaulan yang sehat, mendekati sosok panutan, dan menerima nasihat yang membangun.", example: "Si kecil menjadi lebih antusias meneladani kebiasaan membaca dari teman sebangkunya yang rajin.", img: "https://images.pexels.com/photos/3862365/pexels-photo-3862365.jpeg?auto=compress&cs=tinysrgb&w=600" },
        { badge: "Bab 7", hanzi: "文", pinyin: "Yú Lì Xué Wén (余力学文)", title: "Belajar Ilmu", desc: "Menegaskan metode belajar yang benar setelah fondasi etika kuat: belajar dengan sungguh-sungguh (mata, hati, mulut fokus) dan tidak mudah menyerah.", example: "Si kecil lebih gigih saat mencoba memecahkan blok teka-teki logika STEAM dan tidak mudah menangis saat gagal.", img: "https://images.pexels.com/photos/8197545/pexels-photo-8197545.jpeg?auto=compress&cs=tinysrgb&w=600" }
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

    /* --- 15. TRIBAHASA MINI GAME --- */
    window.gameQuestions = [
        { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Shallow%20Pan%20of%20Food.png", word: "PIRING", options: ["瓶子 (Píngzi)", "盘子 (Pánzi)", "杯子 (Bēizi)"], correct: 1 },
        { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20Book.png", word: "BUKU", options: ["书 (Shū)", "笔 (Bǐ)", "纸 (Zhǐ)"], correct: 0 },
        { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun.png", word: "MATAHARI", options: ["月亮 (Yuèliàng)", "星星 (Xīngxīng)", "太阳 (Tàiyáng)"], correct: 2 },
        { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png", word: "KUCING", options: ["狗 (Gǒu)", "猫 (Māo)", "鸟 (Niǎo)"], correct: 1 },
        { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Droplet.png", word: "AIR", options: ["牛奶 (Niúnǎi)", "水 (Shuǐ)", "果汁 (Guǒzhī)"], correct: 1 }
    ];
    window.currentQIndex = 0;
    window.currentScore = 0;
    window.isAnswering = false;

    window.initGame = function() {
        window.currentQIndex = 0;
        window.currentScore = 0;
        const pointText = document.getElementById('current-point');
        if(pointText) pointText.innerText = '0';
        
        const startScreen = document.getElementById('start-screen');
        const countdownScreen = document.getElementById('countdown-screen');
        const gameHeader = document.getElementById('game-header');
        const qContainer = document.getElementById('question-container');
        const resultModal = document.getElementById('result-modal');

        if(startScreen) {
            startScreen.classList.remove('hidden');
            startScreen.classList.add('flex');
        }
        if(countdownScreen) {
            countdownScreen.classList.remove('flex');
            countdownScreen.classList.add('hidden');
        }
        if(gameHeader) {
            gameHeader.classList.remove('flex');
            gameHeader.classList.add('hidden');
        }
        if(qContainer) {
            qContainer.classList.remove('flex', 'question-slide-out', 'question-slide-in');
            qContainer.classList.add('hidden');
        }
        if(resultModal) {
            resultModal.classList.add('hidden');
            resultModal.classList.remove('show');
        }
        document.body.style.overflow = 'auto'; 
    };

    window.startCountdown = function() {
        const startScreen = document.getElementById('start-screen');
        const countdownScreen = document.getElementById('countdown-screen');
        const cdNumber = document.getElementById('countdown-number');
        if(!countdownScreen) return;

        startScreen.classList.remove('flex');
        startScreen.classList.add('hidden');
        
        countdownScreen.classList.remove('hidden');
        countdownScreen.classList.add('flex');
        
        let count = 3;
        cdNumber.innerText = count;
        
        cdNumber.classList.remove('animate-countdown');
        void cdNumber.offsetWidth; 
        cdNumber.classList.add('animate-countdown');

        const interval = setInterval(() => {
            count--;
            if(count > 0) {
                cdNumber.innerText = count;
                cdNumber.classList.remove('animate-countdown');
                void cdNumber.offsetWidth; 
                cdNumber.classList.add('animate-countdown');
            } else if(count === 0) {
                cdNumber.innerText = "GO!";
                cdNumber.classList.remove('animate-countdown');
                void cdNumber.offsetWidth; 
                cdNumber.classList.add('animate-countdown');
            } else {
                clearInterval(interval);
                countdownScreen.classList.remove('flex');
                countdownScreen.classList.add('hidden');
                window.startGame();
            }
        }, 1000);
    };

    window.startGame = function() {
        document.getElementById('game-header').classList.remove('hidden');
        document.getElementById('game-header').classList.add('flex');
        document.getElementById('question-container').classList.remove('hidden');
        document.getElementById('question-container').classList.add('flex');
        window.renderQuestion();
        window.updateDots();
    };

    window.updateDots = function() {
        const dotsContainer = document.getElementById('game-dots');
        if(!dotsContainer) return;
        dotsContainer.innerHTML = '';
        for(let i=0; i<window.gameQuestions.length; i++) {
            const dot = document.createElement('div');
            if(i < window.currentQIndex) {
                dot.className = "w-2.5 h-2.5 rounded-full bg-brand-primary transition-all";
            } else if (i === window.currentQIndex) {
                dot.className = "w-3 h-3 rounded-full bg-brand-yellow shadow-glow-yellow transition-all scale-110";
            } else {
                dot.className = "w-2.5 h-2.5 rounded-full bg-gray-300 transition-all";
            }
            dotsContainer.appendChild(dot);
        }
    };

    window.renderQuestion = function() {
        const qContainer = document.getElementById('question-container');
        const qImg = document.getElementById('q-img');
        const qWord = document.getElementById('q-word');
        const qOptionsContainer = document.getElementById('q-options');
        const q = window.gameQuestions[window.currentQIndex];
        
        qContainer.classList.remove('question-slide-out');
        void qContainer.offsetWidth; 
        qContainer.classList.add('question-slide-in');

        qImg.src = q.img;
        qWord.innerText = `"${q.word}"`;
        qOptionsContainer.innerHTML = '';
        
        const prefixes = ['A', 'B', 'C'];
        q.options.forEach((opt, index) => {
            const btn = document.createElement('button');
            btn.className = "game-btn w-[calc(50%-0.25rem)] sm:w-[calc(50%-0.5rem)] flex-initial bg-white border-2 border-brand-primary text-brand-primary font-bold py-3 sm:py-4 rounded-xl shadow-sm hover:bg-brand-primary hover:text-white transition-colors text-sm sm:text-base";
            btn.innerText = `${prefixes[index]}. ${opt}`;
            btn.onclick = () => window.handleAnswer(index, btn);
            qOptionsContainer.appendChild(btn);
        });
        window.isAnswering = false;
    };

    window.handleAnswer = function(selectedIndex, btnElement) {
        if(window.isAnswering) return;
        window.isAnswering = true;
        
        const qContainer = document.getElementById('question-container');
        const correctPopup = document.getElementById('correct-popup');
        const isCorrect = (selectedIndex === window.gameQuestions[window.currentQIndex].correct);
        const allBtns = document.querySelectorAll('.game-btn');

        allBtns.forEach(b => b.style.pointerEvents = 'none');

        if(isCorrect) {
            window.currentScore++;
            document.getElementById('current-point').innerText = window.currentScore * 20; 
            btnElement.classList.add('animate-correct');
            correctPopup.classList.add('show');
        } else {
            btnElement.classList.add('animate-shake');
            allBtns[window.gameQuestions[window.currentQIndex].correct].classList.add('animate-correct');
        }

        setTimeout(() => {
            correctPopup.classList.remove('show');
            qContainer.classList.remove('question-slide-in');
            qContainer.classList.add('question-slide-out');

            setTimeout(() => {
                window.currentQIndex++;
                if(window.currentQIndex < window.gameQuestions.length) {
                    window.updateDots();
                    window.renderQuestion();
                } else {
                    window.showEndScreen();
                }
            }, 400); 
        }, 1200); 
    };

    window.showEndScreen = function() {
        const resultModal = document.getElementById('result-modal');
        resultModal.classList.remove('hidden');
        setTimeout(() => {
            resultModal.classList.add('show');
            document.body.style.overflow = 'hidden';
        }, 10);
        
        document.getElementById('final-correct').innerText = window.currentScore;
        document.getElementById('final-score-text').innerText = window.currentScore * 20;
        
        if (window.currentScore >= 3) {
            document.getElementById('result-msg').innerHTML = `Luar Biasa! Kamu berhasil menjawab <span class="text-brand-yellow font-extrabold text-lg">${window.currentScore}</span> dari 5 soal.`;
            document.getElementById('result-trophy').src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png";
            window.fireConfettiDual();
        } else {
            document.getElementById('result-msg').innerHTML = `Jangan Menyerah! Kamu menjawab <span class="text-brand-yellow font-extrabold text-lg">${window.currentScore}</span> dari 5 soal.`;
            document.getElementById('result-trophy').src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Crying%20Face.png";
        }
    };

    window.closeResultModal = function() {
        const resultModal = document.getElementById('result-modal');
        resultModal.classList.remove('show');
        setTimeout(() => {
            resultModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            window.initGame(); 
        }, 300);
    };

    window.resetGame = function() {
        const resultModal = document.getElementById('result-modal');
        resultModal.classList.remove('show');
        setTimeout(() => {
            resultModal.classList.add('hidden');
            document.body.style.overflow = 'auto';
            window.currentQIndex = 0;
            window.currentScore = 0;
            document.getElementById('current-point').innerText = '0';
            window.startCountdown(); 
        }, 300);
    };

    window.fireConfettiDual = function() {
        const container = document.getElementById('confetti-container');
        if(!container) return;
        container.style.display = 'block';
        container.innerHTML = ''; 
        
        const colors = ['#ffcb05', '#1d4486', '#d2232a', '#10b981', '#3b82f6', '#ffffff'];
        const confettiCount = 80; 
        
        for (let i = 0; i < confettiCount; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti-piece');
            confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
            
            const animDuration = Math.random() * 1.5 + 2; 
            const animDelay = Math.random() * 0.5; 
            
            if(i % 2 === 0) {
                confetti.style.left = '-10px';
                confetti.style.bottom = '10%'; 
                confetti.style.animation = `shootLeft ${animDuration}s cubic-bezier(.25, .8, .25, 1) ${animDelay}s forwards`;
            } else {
                confetti.style.right = '-10px';
                confetti.style.bottom = '10%';
                confetti.style.animation = `shootRight ${animDuration}s cubic-bezier(.25, .8, .25, 1) ${animDelay}s forwards`;
            }
            
            container.appendChild(confetti);
        }
        
        setTimeout(() => {
            container.style.display = 'none';
            container.innerHTML = '';
        }, 4500);
    };

    // Initialize game if we are on the tribahasa page
    if(document.getElementById('start-screen')) {
        window.initGame();
    }
});