// --- DATA HANZI ---
const hanziQuestions = [
    { char: '星', pinyin: 'Xīng', meaning: 'Bintang' },
    { char: '爱', pinyin: 'Ài', meaning: 'Cinta / Kasih Sayang' },
    { char: '学', pinyin: 'Xué', meaning: 'Belajar' },
    { char: '师', pinyin: 'Shī', meaning: 'Guru' },
    { char: '友', pinyin: 'Yǒu', meaning: 'Teman' }
];

// Palet warna NEON untuk goresan
const strokeColors = [
    '#38bdf8', '#a78bfa', '#f472b6', '#fbbf24', '#34d399', 
    '#f87171', '#60a5fa', '#c084fc', '#818cf8', '#2dd4bf'
];
// Warna magic untuk hook CSS (Warna background canvas agar awalnya tak terlihat)
const magicColor = '#123456';

let currentQuestionIndex = 0;
let mainWriter = null;
let expectedStroke = 0;
let totalStrokes = 0;
let charStrokeData = [];

function playSound(id) {
    const audio = document.getElementById(id);
    if(audio) {
        audio.currentTime = 0;
        audio.play().catch(e => console.log('Audio blocked'));
    }
}

async function buildHanziGame() {
    const q = hanziQuestions[currentQuestionIndex];
    const mainTarget = document.getElementById('hanzi-main-canvas');
    const hintContainer = document.getElementById('hanzi-hint-overlay');
    const optionsContainer = document.getElementById('hanzi-stroke-options');
    const successArea = document.getElementById('hanzi-success-area');
    const playingArea = document.getElementById('hanzi-playing-area');
    const startScreen = document.getElementById('hanzi-start-screen');
    const progressIndicator = document.getElementById('progress-indicator');
    const successCard = document.getElementById('success-card');

    if (!mainTarget || typeof HanziWriter === 'undefined') return;

    expectedStroke = 0;
    optionsContainer.innerHTML = '';
    hintContainer.innerHTML = '';
    mainTarget.innerHTML = '';
    
    // Tutup Modal Sukses
    successArea.style.opacity = '0';
    setTimeout(() => {
        successArea.classList.add('hidden'); 
        successArea.classList.remove('flex');
        successCard.classList.remove('scale-100');
        successCard.classList.add('scale-95');
    }, 500);
    
    // Buka Area Bermain
    playingArea.classList.remove('hidden');
    playingArea.classList.add('flex');
    setTimeout(() => { playingArea.style.opacity = '1'; }, 50);
    
    // Tutup Layar Awal
    if (startScreen && !startScreen.classList.contains('hidden')) { 
        startScreen.style.opacity = '0';
        setTimeout(() => {
            startScreen.classList.add('hidden'); 
            startScreen.classList.remove('flex');
        }, 500);
    }

    if (progressIndicator) {
        progressIndicator.innerHTML = `<i class="fa-solid fa-layer-group"></i> ${currentQuestionIndex + 1}/${hanziQuestions.length}`;
    }

    // Inisialisasi HanziWriter (Dark Mode Config)
    mainWriter = HanziWriter.create('hanzi-main-canvas', q.char, {
        width: mainTarget.clientWidth || 250,
        height: mainTarget.clientHeight || 250,
        padding: 24,
        strokeColor: '#ffffff',
        showOutline: true,
        outlineColor: '#334155', // Warna outline abu-gelap
        showCharacter: false,
        strokeAnimationSpeed: 2,
    });

    try {
        // Ambil data karakter mentah (path SVG)
        const charData = await HanziWriter.loadCharacterData(q.char);
        charStrokeData = charData.strokes;
        totalStrokes = charStrokeData.length;

        generateStrokeButtons();
        showHint(expectedStroke);
    } catch (error) {
        console.error('Gagal memuat karakter:', error);
    }
}

// Tampilkan goresan bantuan yang berkedip
function showHint(index) {
    const hintContainer = document.getElementById('hanzi-hint-overlay');
    if (!hintContainer) return;
    if (index >= totalStrokes) { hintContainer.innerHTML = ''; return; }

    const color = strokeColors[index % strokeColors.length];
    hintContainer.innerHTML = `
        <svg viewBox="0 0 1024 1024" class="w-full h-full p-[24px]" style="color:${color}">
            <g transform="scale(1, -1) translate(0, -900)">
                <path d="${charStrokeData[index]}" fill="${color}" class="hint-glow"></path>
            </g>
        </svg>
    `;
}

// Buat kotak-kotak opsi bentuk goresan (diacak)
function generateStrokeButtons() {
    const optionsContainer = document.getElementById('hanzi-stroke-options');
    if (!optionsContainer) return;
    optionsContainer.innerHTML = '';

    let indices = [];
    for (let i = 0; i < totalStrokes; i++) indices.push(i);
    // Acak urutan tombol
    indices.sort(() => Math.random() - 0.5);

    indices.forEach(index => {
        const btn = document.createElement('button');
        btn.className = 'hanzi-stroke-btn';
        const color = strokeColors[index % strokeColors.length];
        
        // Masukkan SVG path
        btn.innerHTML = `
            <svg viewBox="0 0 1024 1024" class="w-12 h-12 lg:w-16 lg:h-16">
                <g transform="scale(1, -1) translate(0, -900)">
                    <path d="${charStrokeData[index]}" fill="${color}" filter="drop-shadow(0 0 3px ${color})"></path>
                </g>
            </svg>
        `;
        optionsContainer.appendChild(btn);
        btn.addEventListener('click', () => handleStrokeClick(btn, index));
    });
}

function handleStrokeClick(buttonElement, clickedIndex) {
    // Jika benar
    if (clickedIndex === expectedStroke) {
        playSound('sfx-correct');
        const hintContainer = document.getElementById('hanzi-hint-overlay');
        if (hintContainer) hintContainer.innerHTML = '';

        buttonElement.classList.add('disabled');

        mainWriter.animateStroke(expectedStroke, {
            onComplete: () => {
                expectedStroke++;
                if (expectedStroke === totalStrokes) {
                    setTimeout(showSuccess, 500);
                } else {
                    showHint(expectedStroke);
                }
            }
        });
    } else {
        // Jika salah
        playSound('sfx-wrong');
        buttonElement.classList.add('shake-error');
        setTimeout(() => {
            buttonElement.classList.remove('shake-error');
        }, 300);
    }
}

function showSuccess() {
    playSound('sfx-win');
    fireConfetti();
    
    const q = hanziQuestions[currentQuestionIndex];
    const successArea = document.getElementById('hanzi-success-area');
    const successCard = document.getElementById('success-card');
    
    if (successArea) { 
        successArea.classList.remove('hidden'); 
        successArea.classList.add('flex');
        setTimeout(() => {
            successArea.style.opacity = '1';
            successCard.classList.remove('scale-95');
            successCard.classList.add('scale-100');
        }, 50);
    }

    const resultChar = document.getElementById('hanzi-result-char');
    resultChar.innerHTML = '';
    
    const size = window.innerWidth >= 1024 ? 128 : 96;
    HanziWriter.create('hanzi-result-char', q.char, {
        width: size,
        height: size,
        padding: 0,
        strokeColor: '#ffffff',
        showOutline: false,
        showCharacter: true
    });
    
    document.getElementById('hanzi-result-pinyin').textContent = q.pinyin;
    document.getElementById('hanzi-result-meaning').textContent = q.meaning;

    const nextBtn = document.getElementById('hanzi-next-btn');
    const isLast = currentQuestionIndex >= hanziQuestions.length - 1;
    
    if(isLast) {
        nextBtn.innerHTML = '<i class="fa-solid fa-rotate-right"></i> Main Lagi dari Awal';
    } else {
        nextBtn.innerHTML = 'Lanjut Kata Berikutnya <i class="fa-solid fa-arrow-right"></i>';
    }
}

function nextHanziWord() {
    playSound('sfx-click');
    if (currentQuestionIndex >= hanziQuestions.length - 1) {
        currentQuestionIndex = 0;
    } else {
        currentQuestionIndex++;
    }
    buildHanziGame();
}
window.nextHanziWord = nextHanziWord;

function startHanziGame() {
    playSound('sfx-click');
    currentQuestionIndex = 0;
    buildHanziGame();
}
window.startHanziGame = startHanziGame;

function fireConfetti() {
    const container = document.getElementById('confetti-canvas');
    if(!container) return;
    container.innerHTML = '';
    
    for(let i=0; i<60; i++) {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti-piece');
        confetti.style.width = Math.random() * 8 + 4 + 'px';
        confetti.style.height = Math.random() * 8 + 4 + 'px';
        confetti.style.backgroundColor = strokeColors[Math.floor(Math.random() * strokeColors.length)];
        confetti.style.left = '50%';
        confetti.style.top = '50%';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '2px';
        confetti.style.boxShadow = `0 0 10px ${confetti.style.backgroundColor}`; // Neon glow
        
        const tx = (Math.random() - 0.5) * 600;
        const ty = (Math.random() - 0.5) * 600 - 100;
        const rot = Math.random() * 360;
        
        confetti.animate([
            { transform: 'translate(-50%, -50%) scale(0) rotate(0deg)', opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty}px)) scale(1.5) rotate(${rot}deg)`, opacity: 1 },
            { transform: `translate(calc(-50% + ${tx}px), calc(-50% + ${ty + 200}px)) scale(1) rotate(${rot + 180}deg)`, opacity: 0 }
        ], {
            duration: 2000 + Math.random() * 1500,
            easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
            fill: 'forwards'
        });
        
        container.appendChild(confetti);
    }
}

// Handle resize
window.addEventListener('resize', () => {
    if (mainWriter) {
        const canvas = document.getElementById('hanzi-main-canvas');
        if (canvas && canvas.clientWidth > 0) {
            mainWriter.updateDimensions({
                width: canvas.clientWidth,
                height: canvas.clientHeight
            });
        }
    }
});
