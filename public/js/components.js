// Data Template Navbar Global
const navbarTemplate = `
    <!-- HEADER & NAVBAR MODERN MINIMALIS -->
    <header class="bg-white/95 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all duration-300" id="main-header">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 lg:h-24 relative flex justify-between items-center">
            
            <div class="flex-shrink-0 flex items-center">
                <a href="index.html" class="logo-home-link group relative flex items-center gap-2.5 focus:outline-none transition-transform duration-200 active:scale-95" title="Kembali ke Beranda">
                    <img src="logo-horizontal-sekolah.png" onerror="this.src='https://placehold.co/400x120/ffffff/1d4486?text=SEDAYA+BINTANG'" alt="Logo Sedaya Bintang" class="h-10 lg:h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-[1.02]">
                    <span class="logo-tooltip absolute -bottom-7 left-0 bg-gray-900 text-white text-[10px] font-semibold px-2.5 py-1 rounded-md shadow-md whitespace-nowrap pointer-events-none">Kembali ke Beranda</span>
                </a>
            </div>

            <nav class="hidden lg:flex flex-1 justify-center space-x-8 h-full items-center z-50">
                <div class="nav-item group h-full flex items-center cursor-pointer">
                    <div id="nav-about" class="relative h-full flex items-center">
                        <a href="about.html" class="text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">About</a>
                        <span class="nav-underline"></span>
                    </div>
                </div>
                
                <div class="nav-item group h-full flex items-center cursor-pointer">
                    <div id="nav-admissions" class="relative h-full flex items-center gap-1.5 text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">
                        Admissions <i class="fa-solid fa-angle-down text-[11px] mt-0.5 transition-transform duration-300 group-hover:rotate-180"></i>
                        <span class="nav-underline"></span>
                    </div>
                    <div class="mega-menu absolute top-[100%] left-1/2 w-[1000px] max-w-[90vw] bg-white shadow-2xl rounded-b-2xl border border-gray-100 overflow-hidden pt-2 pb-6">
                        <div class="px-8 pt-4 grid grid-cols-5 gap-4">
                            <a href="#" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-pen-to-square text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Apply</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Pendaftaran murid baru.</div>
                            </a>
                            <a href="#" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-file-invoice-dollar text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">School Fee</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Informasi biaya pendidikan.</div>
                            </a>
                            <a href="#" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-school text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">School Visit</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Jadwalkan kunjungan sekolah.</div>
                            </a>
                            <a href="#" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-vr-cardboard text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">360 Virtual Akses</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Lihat fasilitas secara virtual.</div>
                            </a>
                            <a href="admissions.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-book-open-reader text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Admission Guideline</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Panduan pendaftaran.</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nav-item group h-full flex items-center cursor-pointer">
                    <div id="nav-academics" class="relative h-full flex items-center gap-1.5 text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">
                        Academics <i class="fa-solid fa-angle-down text-[11px] mt-0.5 transition-transform duration-300 group-hover:rotate-180"></i>
                        <span class="nav-underline"></span>
                    </div>
                    <div class="mega-menu absolute top-[100%] left-1/2 w-[800px] max-w-[90vw] bg-white shadow-2xl rounded-b-2xl border border-gray-100 overflow-hidden pt-2 pb-6">
                        <div class="px-8 pt-4 grid grid-cols-4 gap-4">
                            <a href="preschool.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-cubes-stacked text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Preschool & Kiddy</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Pendidikan anak usia dini.</div>
                            </a>
                            <a href="primary.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-child-reaching text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Primary School</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Pendidikan dasar terpadu.</div>
                            </a>
                            <div class="block opacity-60 cursor-not-allowed p-4 rounded-2xl border border-transparent">
                                <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-gray-400"><i class="fa-solid fa-user-graduate text-lg"></i></div>
                                <div class="font-bold text-gray-500 mb-1">Junior High <span class="text-[9px] bg-brand-yellow text-brand-primary px-1.5 py-0.5 rounded-full ml-1 font-bold">SOON</span></div>
                                <div class="text-[11px] text-gray-400 leading-tight">Rencana pengembangan.</div>
                            </div>
                            <div class="block opacity-60 cursor-not-allowed p-4 rounded-2xl border border-transparent">
                                <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-gray-400"><i class="fa-solid fa-graduation-cap text-lg"></i></div>
                                <div class="font-bold text-gray-500 mb-1">Senior High <span class="text-[9px] bg-brand-yellow text-brand-primary px-1.5 py-0.5 rounded-full ml-1 font-bold">SOON</span></div>
                                <div class="text-[11px] text-gray-400 leading-tight">Rencana pengembangan.</div>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="nav-item group h-full flex items-center cursor-pointer">
                    <div id="nav-programs" class="relative h-full flex items-center gap-1.5 text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">
                        Programs <i class="fa-solid fa-angle-down text-[11px] mt-0.5 transition-transform duration-300 group-hover:rotate-180"></i>
                        <span class="nav-underline"></span>
                    </div>
                    <div class="mega-menu absolute top-[100%] left-1/2 w-[1100px] max-w-[90vw] bg-white shadow-2xl rounded-b-2xl border border-gray-100 overflow-hidden pt-2 pb-6">
                        <div class="px-8 pt-4 grid grid-cols-6 gap-4">
                            <a href="kurikulum.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-book-bookmark text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Kurikulum</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Integrasi kurikulum unggulan.</div>
                            </a>
                            <a href="budi-pekerti.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-heart text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Budi Pekerti</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Pendidikan Budi Pekerti.</div>
                            </a>
                            <a href="tribahasa.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-earth-asia text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Tribahasa</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Pembelajaran interaktif.</div>
                            </a>
                            <a href="steam.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-flask text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">STEAM</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Science, Technology, dsb.</div>
                            </a>
                            <a href="fasilitas.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-building text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Fasilitas</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Lingkungan fisik sekolah.</div>
                            </a>
                            <a href="games.html" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-gamepad text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Mini Games</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Belajar interaktif.</div>
                            </a>
                        </div>
                    </div>
                </div>

                <div class="nav-item group h-full flex items-center cursor-pointer">
                    <div id="nav-campus" class="relative h-full flex items-center gap-1.5 text-sm font-bold text-gray-700 group-hover:text-brand-primary transition-colors">
                        Campus <i class="fa-solid fa-angle-down text-[11px] mt-0.5 transition-transform duration-300 group-hover:rotate-180"></i>
                        <span class="nav-underline"></span>
                    </div>
                    <div class="mega-menu absolute top-[100%] left-1/2 w-[600px] max-w-[90vw] bg-white shadow-2xl rounded-b-2xl border border-gray-100 overflow-hidden pt-2 pb-6">
                        <div class="px-8 pt-4 grid grid-cols-2 gap-4">
                            <a href="#" class="block group/link p-4 rounded-2xl border border-transparent hover:border-gray-100 hover:bg-gray-50 transition-all duration-300">
                                <div class="w-10 h-10 bg-brand-gray rounded-xl flex items-center justify-center mb-3 group-hover/link:bg-brand-primary group-hover/link:text-white text-brand-primary transition-all"><i class="fa-solid fa-map-location-dot text-lg"></i></div>
                                <div class="font-bold text-brand-primary mb-1 group-hover/link:text-brand-yellow transition-colors">Summarecon Bandung</div>
                                <div class="text-[11px] text-gray-500 leading-tight">Kampus utama kawasan Summarecon.</div>
                            </a>
                            <div class="block opacity-60 cursor-not-allowed p-4 rounded-2xl border border-transparent">
                                <div class="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center mb-3 text-gray-400"><i class="fa-solid fa-map-location-dot text-lg"></i></div>
                                <div class="font-bold text-gray-500 mb-1">Summarecon Bogor <span class="text-[9px] bg-brand-yellow text-brand-primary px-1.5 py-0.5 rounded-full ml-1 font-bold">SOON</span></div>
                                <div class="text-[11px] text-gray-400 leading-tight">Segera hadir.</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <div class="hidden lg:flex items-center gap-3">
                <a href="index.html" class="w-11 h-11 rounded-full bg-gray-50 hover:bg-brand-primary text-gray-600 hover:text-brand-yellow transition-all duration-300 flex items-center justify-center border border-gray-100 shadow-xs" title="Beranda">
                    <i class="fa-solid fa-house text-sm"></i>
                </a>
                <a href="#form-section" class="bg-brand-yellow text-brand-primary font-extrabold px-7 py-3 rounded-full hover:bg-brand-primary hover:text-white transition-all duration-300 shadow-sm text-sm">
                    Registrasi Sekarang
                </a>
            </div>

            <!-- Hamburger -->
            <div class="lg:hidden flex items-center">
                <button id="mobile-menu-btn" aria-label="Buka Menu" class="w-11 h-11 rounded-xl bg-gray-50 hover:bg-brand-primary hover:text-white text-brand-primary border border-gray-100 flex items-center justify-center focus:outline-none transition-all duration-300 active:scale-95">
                    <i id="hamburger-icon" class="fa-solid fa-bars text-xl transition-transform duration-300 ease-in-out"></i>
                </button>
            </div>
        </div>
    </header>

    <!-- MOBILE DRAWER & BACKDROP TERGABUNG DI SINI -->
    <div id="mobile-backdrop" class="fixed inset-0 bg-black/40 backdrop-blur-xs z-50 opacity-0 pointer-events-none transition-opacity duration-300 lg:hidden"></div>
    
    <aside id="mobile-drawer" class="fixed top-0 right-0 h-full w-[88vw] max-w-[380px] bg-white shadow-2xl z-50 transform translate-x-full transition-transform duration-400 cubic-bezier(0.16, 1, 0.3, 1) flex flex-col lg:hidden border-l border-gray-100">
        <div class="flex items-center justify-between px-6 h-20 border-b border-gray-100 bg-white/90 shrink-0">
            <a href="index.html" onclick="closeMobileMenu()" class="flex items-center gap-2">
                <img src="logo-horizontal-sekolah.png" onerror="this.src='https://placehold.co/300x90/ffffff/1d4486?text=SEDAYA+BINTANG'" class="h-8 w-auto">
            </a>
            <button id="close-drawer-btn" class="w-10 h-10 rounded-xl bg-gray-50 hover:bg-brand-primary hover:text-white text-gray-500 border border-gray-100 flex items-center justify-center transition-all duration-300 active:scale-95">
                <i class="fa-solid fa-xmark text-lg"></i>
            </button>
        </div>

        <div class="flex-1 overflow-y-auto px-6 py-6 space-y-2">
            <a href="index.html" id="mnav-home" onclick="closeMobileMenu()" class="mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-gray transition-all duration-200">
                <span class="mobile-nav-icon w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-sm"><i class="fa-solid fa-house"></i></span>
                <span>Beranda Utama</span>
            </a>
            <a href="about.html" id="mnav-about" onclick="closeMobileMenu()" class="mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-gray transition-all duration-200">
                <span class="mobile-nav-icon w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-sm"><i class="fa-solid fa-circle-info"></i></span>
                <span>About</span>
            </a>
            
            <div class="rounded-xl border border-gray-100 overflow-hidden bg-white">
                <button id="mnav-admissions" class="mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 font-bold text-gray-700 hover:text-brand-primary transition-all duration-200" onclick="toggleMobileAccordion('admissions-mobile')">
                    <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-lg bg-brand-gray text-brand-primary flex items-center justify-center text-sm"><i class="fa-solid fa-address-card"></i></span><span>Admissions</span></div>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-300" id="admissions-mobile-icon"></i>
                </button>
                <div id="admissions-mobile" class="mobile-accordion-content bg-gray-50/80 px-3 pb-3 space-y-1.5 border-t border-gray-100/60">
                    <a href="admissions.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-book-open-reader w-5 text-center text-brand-yellow"></i> Admission Guideline</a>
                </div>
            </div>

            <div class="rounded-xl border border-gray-100 overflow-hidden bg-white">
                <button id="mnav-academics" class="mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 font-bold text-gray-700 hover:text-brand-primary transition-all duration-200" onclick="toggleMobileAccordion('academics-mobile')">
                    <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-lg bg-brand-gray text-brand-primary flex items-center justify-center text-sm"><i class="fa-solid fa-graduation-cap"></i></span><span>Academics</span></div>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-300" id="academics-mobile-icon"></i>
                </button>
                <div id="academics-mobile" class="mobile-accordion-content bg-gray-50/80 px-3 pb-3 space-y-1.5 border-t border-gray-100/60">
                     <a href="preschool.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-cubes-stacked w-5 text-center text-brand-yellow"></i> Preschool & Kiddy</a>
                     <a href="primary.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-child-reaching w-5 text-center text-brand-yellow"></i> Primary School</a>
                </div>
            </div>

            <div class="rounded-xl border border-gray-100 overflow-hidden bg-white">
                <button id="mnav-programs" class="mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 font-bold text-gray-700 hover:text-brand-primary transition-all duration-200" onclick="toggleMobileAccordion('programs-mobile')">
                    <div class="flex items-center gap-3"><span class="w-8 h-8 rounded-lg bg-brand-gray text-brand-primary flex items-center justify-center text-sm"><i class="fa-solid fa-layer-group"></i></span><span>Programs</span></div>
                    <i class="fa-solid fa-chevron-down text-xs text-gray-400 transition-transform duration-300" id="programs-mobile-icon"></i>
                </button>
                <div id="programs-mobile" class="mobile-accordion-content bg-gray-50/80 px-3 pb-3 space-y-1.5 border-t border-gray-100/60">
                     <a href="kurikulum.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-book-bookmark w-5 text-center text-brand-yellow"></i> Kurikulum</a>
                     <a href="budi-pekerti.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-heart w-5 text-center text-brand-yellow"></i> Budi Pekerti</a>
                     <a href="tribahasa.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-earth-asia w-5 text-center text-brand-yellow"></i> Tribahasa</a>
                     <a href="steam.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-flask w-5 text-center text-brand-yellow"></i> STEAM</a>
                     <a href="fasilitas.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-building w-5 text-center text-brand-yellow"></i> Fasilitas</a>
                     <a href="games.html" class="text-xs font-semibold text-gray-600 hover:text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg hover:bg-white transition-colors"><i class="fa-solid fa-gamepad w-5 text-center text-brand-yellow"></i> Mini Games</a>
                </div>
            </div>
            
            <a href="karir.html" id="mnav-karir" onclick="closeMobileMenu()" class="mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-bold text-gray-700 hover:text-brand-primary hover:bg-brand-gray transition-all duration-200">
                <span class="mobile-nav-icon w-8 h-8 rounded-lg bg-gray-100 text-gray-500 flex items-center justify-center text-sm"><i class="fa-solid fa-briefcase"></i></span>
                <span>Karir</span>
            </a>
        </div>

        <div class="p-6 border-t border-gray-100 bg-gray-50/50 shrink-0">
            <a href="#form-section" onclick="closeMobileMenu()" class="flex items-center justify-center gap-2.5 w-full bg-brand-yellow text-brand-primary font-extrabold px-6 py-4 rounded-full shadow-md hover:bg-brand-primary hover:text-white transition-all duration-300 text-sm">
                <span>Registrasi Sekarang</span> <i class="fa-solid fa-arrow-right"></i>
            </a>
        </div>
    </aside>
`;

// Data Template Footer & Floating Elements
const footerTemplate = `
    <!-- FOOTER -->
    <footer class="bg-brand-primary text-white pt-16 lg:pt-20 pb-8 lg:pb-10 mt-0">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
                <div class="lg:col-span-1">
                    <div class="bg-white p-2.5 rounded-xl inline-block mb-4 lg:mb-6">
                        <img src="logo-horizontal-sekolah.png" onerror="this.src='https://placehold.co/400x120/ffffff/1d4486?text=SEDAYA+BINTANG'" alt="Logo Sedaya Bintang" class="h-8 lg:h-10 w-auto">
                    </div>
                    <p class="text-gray-300 text-xs lg:text-sm leading-relaxed mb-6">-</p>
                    <div class="flex space-x-4">
                        <a href="#" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-primary transition-colors text-sm"><i class="fa-brands fa-instagram"></i></a>
                        <a href="#" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-primary transition-colors text-sm"><i class="fa-brands fa-youtube"></i></a>
                        <a href="#" class="w-8 h-8 lg:w-10 lg:h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-brand-yellow hover:text-brand-primary transition-colors text-sm"><i class="fa-brands fa-facebook-f"></i></a>
                    </div>
                </div>
                <div>
                    <h4 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Tautan Cepat</h4>
                    <ul class="space-y-2 lg:space-y-3 text-xs lg:text-sm text-gray-300">
                        <li><a href="index.html" class="hover:text-white transition">Beranda Utama</a></li>
                        <li><a href="about.html" class="hover:text-white transition">Tentang Kami</a></li>
                        <li><a href="admissions.html" class="hover:text-white transition">Alur Pendaftaran</a></li>
                        <li><a href="#" class="hover:text-white transition">Biaya Sekolah</a></li>
                        <li><a href="karir.html" class="hover:text-white transition">Karir</a></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Kampus Bandung</h4>
                    <ul class="space-y-2 lg:space-y-3 text-xs lg:text-sm text-gray-300">
                        <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot mt-1 text-brand-red"></i><span>Jl. Boulevard Summarecon Bandung No. 1</span></li>
                        <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-brand-red"></i><span>+62 22 1234 5678</span></li>
                    </ul>
                </div>
                <div>
                    <h4 class="text-brand-yellow font-bold text-base lg:text-lg mb-4 lg:mb-6">Kampus Bogor</h4>
                    <ul class="space-y-2 lg:space-y-3 text-xs lg:text-sm text-gray-300">
                        <li class="flex items-start gap-3"><i class="fa-solid fa-location-dot mt-1 text-brand-red"></i><span>Jl. Boulevard Summarecon Bogor No. 8</span></li>
                        <li class="flex items-center gap-3"><i class="fa-solid fa-phone text-brand-red"></i><span>+62 251 8765 4321</span></li>
                    </ul>
                </div>
            </div>
            <div class="border-t border-white/20 pt-6 lg:pt-8 flex flex-col md:flex-row justify-between items-center text-xs lg:text-sm text-gray-400 gap-4">
                <p>&copy; 2026 Sekolah Terpadu Sedaya Bintang. All rights reserved.</p>
                <div class="space-x-4"><a href="#" class="hover:text-white transition">Privacy Policy</a></div>
            </div>
        </div>
    </footer>`;

const easyTouchTemplate = `
    <!-- EASY TOUCH FAB -->
    <div id="easy-touch-backdrop" class="fixed inset-0 bg-black/60 backdrop-blur-sm z-[90] opacity-0 pointer-events-none transition-opacity duration-300"></div>
    <div id="easy-touch-wrapper" class="fixed bottom-4 right-4 md:bottom-6 md:right-6 flex items-center justify-center w-14 h-14 transform transition-all duration-300 origin-bottom-right" style="z-index: 9999; position: fixed !important;">
        
        <div id="easy-touch-menu" class="absolute inset-0 z-0 pointer-events-none">
            <!-- Item 1: Top (WhatsApp) -->
            <a href="https://wa.me/6281234567890" target="_blank" class="easy-item absolute top-1 left-1 w-12 h-12 bg-white text-blue-500 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center transform transition-all duration-300 opacity-0 scale-50 pointer-events-none group" data-tx="" data-ty="-translate-y-16">
                <i class="fa-brands fa-whatsapp text-xl"></i>
                <span class="absolute right-14 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">WhatsApp</span>
            </a>
            <!-- Item 2: Top Left (Mini Games) -->
            <a href="games.html" class="easy-item absolute top-1 left-1 w-12 h-12 bg-white text-blue-500 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center transform transition-all duration-300 opacity-0 scale-50 pointer-events-none group" data-tx="-translate-x-12" data-ty="-translate-y-12">
                <i class="fa-solid fa-gamepad text-xl"></i>
                <span class="absolute right-14 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Mini Games</span>
            </a>
            <!-- Item 3: Left (Beranda) -->
            <a href="index.html" class="easy-item absolute top-1 left-1 w-12 h-12 bg-white text-blue-500 rounded-full shadow-[0_4px_15px_rgba(0,0,0,0.15)] border border-gray-100 flex items-center justify-center transform transition-all duration-300 opacity-0 scale-50 pointer-events-none group" data-tx="-translate-x-16" data-ty="">
                <i class="fa-solid fa-house text-xl"></i>
                <span class="absolute right-14 bg-white text-slate-800 px-3 py-1.5 rounded-lg text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">Beranda</span>
            </a>
        </div>
        
        <button id="easy-touch-btn" class="w-14 h-14 bg-brand-primary text-white rounded-full shadow-[0_10px_25px_rgba(0,0,0,0.3)] border-2 border-white flex items-center justify-center hover:scale-105 active:scale-95 transition-all duration-300 relative overflow-hidden group z-10">
            <i class="fa-solid fa-layer-group text-xl transition-transform duration-300 relative z-10" id="easy-touch-icon"></i>
            <div class="absolute inset-0 bg-white/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-300 origin-center z-0"></div>
        </button>
    </div>

    <!-- MODAL SUCCESS GLOBAL -->
    <div id="success-modal" class="fixed inset-0 z-[100] hidden items-center justify-center bg-black/50 backdrop-blur-xs opacity-0 transition-opacity duration-300">
        <div class="bg-white rounded-3xl p-8 max-w-sm w-full mx-4 shadow-2xl transform scale-95 transition-transform duration-300 relative overflow-hidden">
            <div class="absolute top-0 left-0 w-full h-2 bg-brand-primary"></div>
            <div class="w-16 h-16 bg-green-50 text-green-500 rounded-full flex items-center justify-center mx-auto mb-5"><i class="fa-solid fa-check text-3xl"></i></div>
            <h3 class="text-xl font-extrabold text-center text-brand-primary mb-2">Pesan Diterima!</h3>
            <p class="text-center text-gray-600 mb-8 text-sm">Formulir pendaftaran berhasil dikirim. Tim kami akan segera menghubungi Anda melalui WhatsApp yang didaftarkan.</p>
            <button onclick="closeModal()" class="w-full bg-brand-primary text-white font-bold py-3.5 rounded-xl hover:bg-[#15346b] transition-all hover:shadow-lg hover:-translate-y-0.5">Mengerti</button>
        </div>
    </div>`;

// FUNGSI INJEKSI
function loadComponents() {
    const navbarDiv = document.getElementById('app-navbar');
    const footerDiv = document.getElementById('app-footer');
    
    if (navbarDiv) navbarDiv.innerHTML = navbarTemplate;
    if (footerDiv) footerDiv.innerHTML = footerTemplate;

    // Inject Easy Touch globally directly into body
    document.body.insertAdjacentHTML('beforeend', easyTouchTemplate);

    // LOGIKA ACTIVE STATE OTOMATIS
    // Mengecek atribut data-page pada tag body, contoh: <body data-page="about">
    const currentPage = document.body.getAttribute('data-page');

    // LOGIKA ACTIVE STATE OTOMATIS UNTUK MOBILE
    if (currentPage) {
        const activeMNav = document.getElementById('mnav-' + currentPage);
        if (activeMNav) {
            if (activeMNav.tagName === 'BUTTON') {
                activeMNav.className = "mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 rounded-xl font-extrabold text-brand-primary bg-brand-yellow/15 border border-brand-yellow/30 transition-all duration-300";
            } else {
                activeMNav.className = "mobile-nav-link flex items-center gap-3 py-3.5 px-4 rounded-xl font-extrabold text-brand-primary bg-brand-yellow/15 border border-brand-yellow/30 hover:bg-brand-primary hover:text-white transition-all duration-300";
            }
            const iconSpan = activeMNav.querySelector('span.w-8.h-8') || activeMNav.querySelector('.mobile-nav-icon');
            if (iconSpan) {
                iconSpan.className = "mobile-nav-icon w-8 h-8 rounded-lg bg-brand-yellow text-brand-primary flex items-center justify-center text-sm font-bold";
            }
        }
        
        // Also check if there's any active sub-menu link
        const currentFileName = window.location.pathname.split('/').pop() || 'index.html';
        const mLinks = document.querySelectorAll('.mobile-accordion-content a');
        mLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === currentFileName || (currentPage === 'home' && href === 'index.html')) {
                link.className = "text-xs font-bold text-brand-primary flex items-center gap-3 py-2.5 px-3 rounded-lg bg-brand-primary/5 transition-colors";
                
                // Open the parent accordion automatically
                const parentAccordion = link.closest('.mobile-accordion-content');
                if (parentAccordion) {
                    parentAccordion.classList.add('active');
                    const iconId = parentAccordion.id + '-icon';
                    const icon = document.getElementById(iconId);
                    if(icon) {
                        icon.classList.add('rotate-180');
                    }
                    
                    // highlight the parent accordion button if it's not already
                    const parentBtn = parentAccordion.previousElementSibling;
                    if(parentBtn && parentBtn.tagName === 'BUTTON') {
                        parentBtn.className = "mobile-nav-link w-full flex justify-between items-center py-3.5 px-4 rounded-xl font-extrabold text-brand-primary bg-brand-yellow/15 border border-brand-yellow/30 transition-all duration-300";
                        const pIcon = parentBtn.querySelector('span.w-8.h-8');
                        if (pIcon) pIcon.className = "mobile-nav-icon w-8 h-8 rounded-lg bg-brand-yellow text-brand-primary flex items-center justify-center text-sm font-bold";
                    }
                }
            }
        });
    }

    if (currentPage) {
        const activeNav = document.getElementById('nav-' + currentPage);
        if (activeNav) {
            // Ubah class agar ada garis bawah biru aktifnya sesuai desain ori
            activeNav.className = "relative h-full flex items-center gap-1.5 text-sm font-bold text-brand-primary transition-colors";
            
            // Fix text color for child elements (a tags, icons)
            const children = activeNav.querySelectorAll('*');
            children.forEach(child => {
                if (child.classList.contains('text-gray-700')) {
                    child.classList.remove('text-gray-700');
                    child.classList.add('text-brand-primary');
                }
            });

            // Ubah span underline
            const span = activeNav.querySelector('span.nav-underline');
            if (span) {
                span.className = "absolute bottom-0 left-1/2 !w-full h-[3px] bg-brand-primary -translate-x-1/2 rounded-t-sm nav-underline";
            }
        }
    }

    // INIT EASY TOUCH FAB
    const easyBtn = document.getElementById('easy-touch-btn');
    const easyBackdrop = document.getElementById('easy-touch-backdrop');
    const easyIcon = document.getElementById('easy-touch-icon');
    
    if(easyBtn && easyBackdrop && easyIcon) {
        let isEasyOpen = false;
        
        function toggleEasyTouch() {
            isEasyOpen = !isEasyOpen;
            const items = document.querySelectorAll('.easy-item');
            
            if(isEasyOpen) {
                easyBackdrop.classList.remove('opacity-0', 'pointer-events-none');
                easyBackdrop.classList.add('opacity-100', 'pointer-events-auto');
                
                easyIcon.classList.remove('fa-layer-group');
                easyIcon.classList.add('fa-xmark', 'rotate-90');
                
                items.forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.remove('opacity-0', 'scale-50', 'pointer-events-none');
                        item.classList.add('opacity-100', 'scale-100', 'pointer-events-auto');
                        if(item.dataset.tx) item.classList.add(item.dataset.tx);
                        if(item.dataset.ty) item.classList.add(item.dataset.ty);
                    }, index * 50);
                });
            } else {
                easyBackdrop.classList.add('opacity-0', 'pointer-events-none');
                easyBackdrop.classList.remove('opacity-100', 'pointer-events-auto');
                
                easyIcon.classList.remove('fa-xmark', 'rotate-90');
                easyIcon.classList.add('fa-layer-group');
                
                Array.from(items).reverse().forEach((item, index) => {
                    setTimeout(() => {
                        item.classList.add('opacity-0', 'scale-50', 'pointer-events-none');
                        item.classList.remove('opacity-100', 'scale-100', 'pointer-events-auto');
                        if(item.dataset.tx) item.classList.remove(item.dataset.tx);
                        if(item.dataset.ty) item.classList.remove(item.dataset.ty);
                    }, index * 50);
                });
            }
        }

        easyBtn.addEventListener('click', toggleEasyTouch);
        easyBackdrop.addEventListener('click', () => {
            if(isEasyOpen) toggleEasyTouch();
        });
    }
}

// Jalankan Injeksi secara sinkron langsung ketika file ini dipanggil!
loadComponents();
