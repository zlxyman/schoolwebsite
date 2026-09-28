// --- GAME DATA ---
const gameQuestions = [
    { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Food/Shallow%20Pan%20of%20Food.png", word: "PIRING", options: ["瓶子 (Píngzi)", "盘子 (Pánzi)", "杯子 (Bēizi)"], correct: 1 },
    { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Objects/Open%20Book.png", word: "BUKU", options: ["书 (Shū)", "笔 (Bǐ)", "纸 (Zhǐ)"], correct: 0 },
    { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Sun.png", word: "MATAHARI", options: ["月亮 (Yuèliàng)", "星星 (Xīngxīng)", "太阳 (Tàiyáng)"], correct: 2 },
    { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Animals/Cat%20Face.png", word: "KUCING", options: ["狗 (Gǒu)", "猫 (Māo)", "鸟 (Niǎo)"], correct: 1 },
    { img: "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Travel%20and%20places/Droplet.png", word: "AIR", options: ["牛奶 (Niúnǎi)", "水 (Shuǐ)", "果汁 (Guǒzhī)"], correct: 1 }
];

let currentIndex = 0;
let score = 0;
let isAnswering = false;
let streak = 0;

// UI Elements
const startScreen = document.getElementById('start-screen');
const gameScreen = document.getElementById('game-screen');
const endScreen = document.getElementById('end-screen');
const scoreDisplay = document.getElementById('score-display');
const qCard = document.getElementById('q-card');
const qImg = document.getElementById('q-img');
const qWord = document.getElementById('q-word');
const optionsGrid = document.getElementById('options-grid');
const progressBar = document.getElementById('progress-bar');
const currentQNum = document.getElementById('current-q-num');
const streakText = document.getElementById('streak-text');

function startGame() {
    startScreen.classList.add('hidden');
    endScreen.classList.add('hidden');
    gameScreen.classList.remove('hidden');
    gameScreen.classList.add('flex');
    
    currentIndex = 0;
    score = 0;
    streak = 0;
    scoreDisplay.innerText = 0;
    
    loadQuestion();
}
window.startGame = startGame;

function loadQuestion() {
    isAnswering = false;
    const q = gameQuestions[currentIndex];
    
    // Update Progress
    currentQNum.innerText = currentIndex + 1;
    progressBar.style.width = ((currentIndex) / gameQuestions.length * 100) + '%';
    
    // Animation reset
    qCard.classList.remove('slide-exit');
    void qCard.offsetWidth;
    qCard.classList.add('slide-enter');

    // Set Content
    qImg.src = q.img;
    qWord.innerText = q.word;
    
    // Generate Options
    optionsGrid.innerHTML = '';
    const prefixes = ['A', 'B', 'C'];
    
    q.options.forEach((opt, idx) => {
        const btn = document.createElement('button');
        btn.className = "option-btn bg-white/5 border-2 border-white/10 text-white font-bold py-4 px-6 rounded-2xl flex items-center justify-between group";
        btn.innerHTML = `<span class="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center text-sm font-black text-slate-300 group-hover:bg-blue-500 group-hover:text-white transition-colors">${prefixes[idx]}</span> <span class="text-lg">${opt}</span>`;
        btn.onclick = () => selectOption(idx, btn);
        optionsGrid.appendChild(btn);
    });
}

function selectOption(selectedIndex, btnElement) {
    if (isAnswering) return;
    isAnswering = true;
    
    const q = gameQuestions[currentIndex];
    const isCorrect = (selectedIndex === q.correct);
    const allBtns = optionsGrid.querySelectorAll('.option-btn');
    
    allBtns.forEach(b => b.style.pointerEvents = 'none');

    if (isCorrect) {
        btnElement.classList.add('btn-correct');
        streak++;
        score += 100 + (streak * 20); // Bonus for streak
        scoreDisplay.innerText = score;
        scoreDisplay.classList.add('animate-pulse');
        setTimeout(() => scoreDisplay.classList.remove('animate-pulse'), 500);
        
        if(streak > 1) {
            streakText.classList.remove('hidden');
            streakText.classList.add('animate-bounce');
        }
    } else {
        btnElement.classList.add('btn-wrong');
        allBtns[q.correct].classList.add('btn-correct');
        streak = 0;
        streakText.classList.add('hidden');
        streakText.classList.remove('animate-bounce');
    }

    setTimeout(() => {
        qCard.classList.remove('slide-enter');
        qCard.classList.add('slide-exit');
        optionsGrid.innerHTML = ''; // fade out options instantly
        
        setTimeout(() => {
            currentIndex++;
            if (currentIndex < gameQuestions.length) {
                loadQuestion();
            } else {
                showEndScreen();
            }
        }, 400);
    }, 1200);
}

function showEndScreen() {
    gameScreen.classList.remove('flex');
    gameScreen.classList.add('hidden');
    endScreen.classList.remove('hidden');
    
    progressBar.style.width = '100%';
    streakText.classList.add('hidden');
    
    document.getElementById('end-score').innerText = score;
    const title = document.getElementById('end-title');
    const sub = document.getElementById('end-subtitle');
    const emoji = document.getElementById('end-emoji');
    
    // Max score is 500 + 40 + 60 + 80 + 100 = 780
    if (score > 600) {
        title.innerText = "Luar Biasa!";
        title.className = "text-3xl font-black mb-2 text-game-accent";
        sub.innerText = "Kamu menguasai kosakata Mandarin dengan sangat baik.";
        emoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Activities/Trophy.png";
        fireConfetti();
    } else if (score > 300) {
        title.innerText = "Bagus Sekali!";
        title.className = "text-3xl font-black mb-2 text-blue-400";
        sub.innerText = "Sedikit lagi menuju sempurna. Terus berlatih!";
        emoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Star-Struck.png";
    } else {
        title.innerText = "Jangan Menyerah!";
        title.className = "text-3xl font-black mb-2 text-white";
        sub.innerText = "Perbanyak bacaan Mandarin dan coba lagi ya.";
        emoji.src = "https://raw.githubusercontent.com/Tarikul-Islam-Anik/Animated-Fluent-Emojis/master/Emojis/Smilies/Flexed%20Biceps.png";
    }
}

// --- SIMPLE CONFETTI ---
function fireConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const pieces = [];
    const colors = ['#f59e0b', '#3b82f6', '#10b981', '#ef4444', '#ffffff'];
    
    for(let i=0; i<100; i++) {
        pieces.push({
            x: canvas.width / 2,
            y: canvas.height / 2 + 100,
            vx: (Math.random() - 0.5) * 20,
            vy: (Math.random() - 1) * 20 - 5,
            size: Math.random() * 10 + 5,
            color: colors[Math.floor(Math.random() * colors.length)],
            rot: Math.random() * 360,
            rotSpeed: (Math.random() - 0.5) * 10
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        let active = false;
        
        pieces.forEach(p => {
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.5; // gravity
            p.rot += p.rotSpeed;
            
            if (p.y < canvas.height) active = true;
            
            ctx.save();
            ctx.translate(p.x, p.y);
            ctx.rotate(p.rot * Math.PI / 180);
            ctx.fillStyle = p.color;
            ctx.fillRect(-p.size/2, -p.size/2, p.size, p.size);
            ctx.restore();
        });
        
        if (active) requestAnimationFrame(animate);
        else ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
    
    animate();
}
