import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// --- SOUND EFFECTS (Web Audio API) ---
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
function playSound(type) {
    if(audioCtx.state === 'suspended') audioCtx.resume();
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    osc.connect(gain);
    gain.connect(audioCtx.destination);
    const now = audioCtx.currentTime;

    if (type === 'click') {
        osc.type = 'sine';
        osc.frequency.setValueAtTime(800, now);
        osc.frequency.exponentialRampToValueAtTime(1200, now + 0.05);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.1);
        osc.start(now); osc.stop(now + 0.1);
    } else if (type === 'jump') {
        osc.type = 'square';
        osc.frequency.setValueAtTime(150, now);
        osc.frequency.linearRampToValueAtTime(400, now + 0.3);
        gain.gain.setValueAtTime(0.05, now);
        gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
        osc.start(now); osc.stop(now + 0.3);
    } else if (type === 'fall') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(300, now);
        osc.frequency.exponentialRampToValueAtTime(30, now + 0.8);
        gain.gain.setValueAtTime(0.1, now);
        gain.gain.linearRampToValueAtTime(0.01, now + 0.8);
        osc.start(now); osc.stop(now + 0.8);
    } else if (type === 'win') {
        osc.type = 'sine';
        [400, 500, 600, 800].forEach((freq, i) => {
            const oscW = audioCtx.createOscillator();
            const gainW = audioCtx.createGain();
            oscW.type = 'sine';
            oscW.frequency.value = freq;
            oscW.connect(gainW);
            gainW.connect(audioCtx.destination);
            gainW.gain.setValueAtTime(0, now + i*0.1);
            gainW.gain.linearRampToValueAtTime(0.1, now + i*0.1 + 0.05);
            gainW.gain.linearRampToValueAtTime(0, now + i*0.1 + 0.3);
            oscW.start(now + i*0.1); oscW.stop(now + i*0.1 + 0.3);
        });
    }
}

// --- 1. GAME LOGIC & LEVEL PROGRESSION ---
const levels = [
    { size: 3, steps: 4, start: {c:0, r:0}, end: {c:2, r:2}, map: [[1,1,0], [0,1,1], [0,0,1]] },
    { size: 3, steps: 4, start: {c:0, r:0}, end: {c:2, r:2}, map: [[1,0,0], [1,1,0], [0,1,1]] },
    { size: 4, steps: 6, start: {c:0, r:0}, end: {c:3, r:3}, map: [[1,1,0,0], [0,1,1,0], [0,0,1,0], [0,0,1,1]] },
    { size: 4, steps: 6, start: {c:0, r:0}, end: {c:3, r:3}, map: [[1,0,0,0], [1,1,0,0], [0,1,1,1], [0,0,0,1]] },
    { size: 5, steps: 8, start: {c:0, r:0}, end: {c:4, r:4}, map: [[1,1,1,0,0], [0,0,1,0,0], [0,0,1,1,0], [0,0,0,1,1], [0,0,0,0,1]] }
];

let currentLevelIndex = parseInt(sessionStorage.getItem('astroLevel')) || 0;
if (currentLevelIndex >= levels.length) currentLevelIndex = 0;

const levelData = levels[currentLevelIndex];
const GRID_SIZE = levelData.size;
const MAX_STEPS = levelData.steps;
const mapGrid = levelData.map;
const startPos = levelData.start;
const finishPos = levelData.end;

const TILE_SIZE = 2.5; 
const gridCenterX = (GRID_SIZE - 1) * TILE_SIZE / 2;
const gridCenterZ = (GRID_SIZE - 1) * TILE_SIZE / 2;

let characterMoves = [];
let isExecuting = false;

// --- 2. THREE.JS SCENE SETUP ---
const container = document.getElementById('canvas-container');
const scene = new THREE.Scene();
scene.background = new THREE.Color(0x070913); // Deep space dark
scene.fog = new THREE.FogExp2(0x070913, 0.02);

// Add Dense Multi-colored Galaxy Stars
function createStars() {
    const starGeo = new THREE.BufferGeometry();
    const starCount = 2000;
    const starPos = new Float32Array(starCount * 3);
    const starColors = new Float32Array(starCount * 3);
    const colorObj = new THREE.Color();
    for(let i=0; i<starCount; i++) {
        starPos[i*3] = (Math.random() - 0.5) * 300;
        starPos[i*3+1] = (Math.random() - 0.5) * 300;
        starPos[i*3+2] = (Math.random() - 0.5) * 200 - 50;
        const randColor = Math.random();
        if(randColor > 0.8) colorObj.setHex(0x00f3ff);
        else if(randColor > 0.6) colorObj.setHex(0xffaa00);
        else colorObj.setHex(0xffffff);
        starColors[i*3] = colorObj.r;
        starColors[i*3+1] = colorObj.g;
        starColors[i*3+2] = colorObj.b;
    }
    starGeo.setAttribute('position', new THREE.BufferAttribute(starPos, 3));
    starGeo.setAttribute('color', new THREE.BufferAttribute(starColors, 3));
    const starMat = new THREE.PointsMaterial({ size: 0.3, vertexColors: true, transparent: true, opacity: 0.8 });
    return new THREE.Points(starGeo, starMat);
}
const stars = createStars();
scene.add(stars);

const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 150);
const IDLE_CAM_POS = new THREE.Vector3();
const IDLE_CAM_LOOK = new THREE.Vector3();

function updateCameraForScreen() {
    const aspect = window.innerWidth / window.innerHeight;
    const scaleFactor = GRID_SIZE / 3;
    if (aspect < 0.6) {
        // Sempit (Mobile)
        IDLE_CAM_POS.set(gridCenterX, 18 * scaleFactor, gridCenterZ + 20 * scaleFactor);
        IDLE_CAM_LOOK.set(gridCenterX, 0, gridCenterZ + (1.5 * scaleFactor)); // Look slightly lower to push grid UP
    } else if (aspect < 1) {
        // Tablet
        IDLE_CAM_POS.set(gridCenterX, 14 * scaleFactor, gridCenterZ + 16 * scaleFactor);
        IDLE_CAM_LOOK.set(gridCenterX, 0, gridCenterZ + (1 * scaleFactor));
    } else {
        // Desktop
        IDLE_CAM_POS.set(gridCenterX, 10 * scaleFactor, gridCenterZ + 11 * scaleFactor);
        IDLE_CAM_LOOK.set(gridCenterX, 0, gridCenterZ + (0.5 * scaleFactor));
    }
    if(!isExecuting) {
        camera.position.copy(IDLE_CAM_POS);
        camera.lookAt(IDLE_CAM_LOOK);
    }
}
updateCameraForScreen();

const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
// TONE MAPPING VITAL UNTUK VISUAL YANG CERAH DAN REALISTIS
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.3;
container.appendChild(renderer.domElement);

// Pencahayaan Dramatis Sci-Fi (Diperkuat)
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444499, 0.6);
scene.add(hemiLight);

const dirLight = new THREE.DirectionalLight(0xffffff, 2.5);
dirLight.position.set(10, 20, 10);
dirLight.castShadow = true;
dirLight.shadow.mapSize.width = 2048;
dirLight.shadow.mapSize.height = 2048;
dirLight.shadow.camera.near = 0.5;
dirLight.shadow.camera.far = 50;
dirLight.shadow.camera.left = -15;
dirLight.shadow.camera.right = 15;
dirLight.shadow.camera.top = 15;
dirLight.shadow.camera.bottom = -15;
dirLight.shadow.bias = -0.0005;
scene.add(dirLight);

// Spotlight khusus menyorot papan catur agar sangat cerah
const spotLight = new THREE.SpotLight(0xffffff, 150);
spotLight.position.set(gridCenterX, 15, gridCenterZ + 5);
spotLight.target.position.set(gridCenterX, 0, gridCenterZ);
spotLight.angle = Math.PI / 3;
spotLight.penumbra = 0.5;
spotLight.decay = 2;
spotLight.distance = 50;
spotLight.castShadow = true;
scene.add(spotLight);
scene.add(spotLight.target);

// --- 3. MODEL LOADING & NORMALIZATION ---
const loader = new GLTFLoader();
let characterModel, mixer;
let animations = {};

// Helper: Memastikan ukuran semua model seragam (2x2) & posisinya di atas tanah
function normalizeModel(gltfScene, targetWidth) {
    const box = new THREE.Box3().setFromObject(gltfScene);
    const size = box.getSize(new THREE.Vector3());
    const center = box.getCenter(new THREE.Vector3());
    const max = Math.max(size.x, size.z);
    const scale = targetWidth / max;
    gltfScene.scale.set(scale, scale, scale);
    // Geser agar Y=0 tepat di bawah telapak kaki, dan X/Z di tengah
    gltfScene.position.set(-center.x * scale, -box.min.y * scale, -center.z * scale);
    const wrapper = new THREE.Group();
    wrapper.add(gltfScene);
    return wrapper;
}

const trapObjects = {};

// 1. Render Papan (Grid)
Promise.all([
    new Promise(res => loader.load('assets/3d_models/platform.glb', res)),
    new Promise(res => loader.load('assets/3d_models/indicator-special-cross.glb', res))
]).then(([platformGltf, crossGltf]) => {
    const baseBlock = platformGltf.scene;
    baseBlock.traverse(c => { if(c.isMesh) { c.receiveShadow = true; c.castShadow = true; }});
    const normalizedBlock = normalizeModel(baseBlock, TILE_SIZE * 0.95);
    
    const crossBlock = crossGltf.scene;
    crossBlock.traverse(c => { 
        if(c.isMesh) { 
            c.receiveShadow = true;
            if(c.material) {
                c.material = c.material.clone();
                c.material.color.setHex(0xffaa00);
            }
        }
    });
    const normalizedCross = normalizeModel(crossBlock, TILE_SIZE * 0.95);
    
    for(let r = 0; r < GRID_SIZE; r++) {
        for(let c = 0; c < GRID_SIZE; c++) {
            if(mapGrid[r][c] === 1) {
                // Daratan Aman
                const block = normalizedBlock.clone();
                block.position.set(c * TILE_SIZE, -0.5, r * TILE_SIZE);
                scene.add(block);
            } else {
                // Jebakan Lubang (Hanya menggunakan indicator-special-cross)
                const trapGroup = new THREE.Group();
                
                const cross = normalizedCross.clone();
                cross.position.y = -0.5;
                trapGroup.add(cross);
                
                trapGroup.position.set(c * TILE_SIZE, 0, r * TILE_SIZE);
                scene.add(trapGroup);
                trapObjects[`${c}-${r}`] = trapGroup;
            }
        }
    }
});

// 2. Render Finish Star
let targetStar;
function createStar() {
    const shape = new THREE.Shape();
    const outerRadius = 0.8;
    const innerRadius = 0.35;
    const spikes = 5;
    for (let i = 0; i < spikes * 2; i++) {
        const radius = i % 2 === 0 ? outerRadius : innerRadius;
        const angle = (Math.PI * i) / spikes;
        if (i === 0) shape.moveTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
        else shape.lineTo(Math.sin(angle) * radius, Math.cos(angle) * radius);
    }
    shape.closePath();
    const extrudeSettings = { depth: 0.2, bevelEnabled: true, bevelThickness: 0.05, bevelSize: 0.05, bevelSegments: 2 };
    const geometry = new THREE.ExtrudeGeometry(shape, extrudeSettings);
    // Emissive intensity ditingkatkan ke 2.5 agar bersinar sangat terang (glowing)
    const material = new THREE.MeshStandardMaterial({ color: 0xffaa00, emissive: 0xff8800, emissiveIntensity: 2.5, roughness: 0.2, metalness: 0.5 });
    const starMesh = new THREE.Mesh(geometry, material);
    
    geometry.computeBoundingBox();
    const yOffset = -0.5 * (geometry.boundingBox.max.y - geometry.boundingBox.min.y);
    const zOffset = -0.5 * (geometry.boundingBox.max.z - geometry.boundingBox.min.z);
    geometry.translate(0, yOffset, zOffset);
    
    const starGroup = new THREE.Group();
    starGroup.add(starMesh);
    
    const starLight = new THREE.PointLight(0xffea00, 1.5, 6);
    starGroup.add(starLight);
    return starGroup;
}

targetStar = createStar();
targetStar.position.set(finishPos.c * TILE_SIZE, 1.5, finishPos.r * TILE_SIZE);
scene.add(targetStar);

// 2.5 Render Realistic Background Planets & Asteroids
let bgPlanet1, bgPlanet2;
function createEnvironment() {
    const textureLoader = new THREE.TextureLoader();
    
    // Planet 1: Realistic Earth-like Planet
    const earthTex = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/earth_atmos_2048.jpg');
    const planet1Geo = new THREE.SphereGeometry(22, 64, 64);
    const planet1Mat = new THREE.MeshStandardMaterial({ map: earthTex, roughness: 0.6, metalness: 0.1 });
    bgPlanet1 = new THREE.Mesh(planet1Geo, planet1Mat);
    bgPlanet1.position.set(-45, -15, -45);
    bgPlanet1.rotation.z = 0.3;
    scene.add(bgPlanet1);

    // Planet 2: Realistic Mars/Moon-like Planet
    const marsTex = textureLoader.load('https://raw.githubusercontent.com/mrdoob/three.js/master/examples/textures/planets/mars_1k_color.jpg');
    const planet2Geo = new THREE.SphereGeometry(12, 64, 64);
    const planet2Mat = new THREE.MeshStandardMaterial({ map: marsTex, roughness: 0.9, metalness: 0.0 });
    bgPlanet2 = new THREE.Mesh(planet2Geo, planet2Mat);
    bgPlanet2.position.set(45, 25, -60);
    bgPlanet2.rotation.z = -0.2;
    scene.add(bgPlanet2);

    // Asteroids Field (High density, nice gray tones)
    for(let i=0; i<35; i++) {
        const astGeo = new THREE.DodecahedronGeometry(Math.random() * 2 + 0.5);
        const grayTone = 0.3 + Math.random() * 0.4;
        const astMat = new THREE.MeshStandardMaterial({ color: new THREE.Color(grayTone, grayTone, grayTone), flatShading: true, roughness: 0.9 });
        const asteroid = new THREE.Mesh(astGeo, astMat);
        const sideX = (Math.random() - 0.5) * 120;
        asteroid.position.set(
            sideX,
            (Math.random() - 0.5) * 60,
            -20 - Math.random() * 60
        );
        // Jauhkan asteroid dari tengah agar tidak menutupi arena
        if (Math.abs(asteroid.position.x) < 20) asteroid.position.x = 20 * Math.sign(asteroid.position.x || 1);
        
        asteroid.rotation.set(Math.random(), Math.random(), Math.random());
        asteroid.userData = { 
            isAsteroid: true,
            rotSpeed: new THREE.Vector3(Math.random()*0.02, Math.random()*0.02, Math.random()*0.02),
            floatSpeed: (Math.random() - 0.5) * 0.05
        };
        scene.add(asteroid);
    }
}
createEnvironment();

// 3. Render Character
loader.load('assets/3d_models/character.glb', (gltf) => {
    // Skala karakter sedikit lebih kecil dari ubin (TILE_SIZE)
    characterModel = normalizeModel(gltf.scene, TILE_SIZE * 0.6);
    characterModel.traverse(c => { if(c.isMesh) c.castShadow = true; });
    
    resetCharacter();
    scene.add(characterModel);
    
    mixer = new THREE.AnimationMixer(gltf.scene); // Mixer ke internal scene
    gltf.animations.forEach((clip) => {
        animations[clip.name.toLowerCase()] = mixer.clipAction(clip);
    });
    playAnim('idle');
});

function resetCharacter() {
    characterModel.position.set(startPos.c * TILE_SIZE, 0, startPos.r * TILE_SIZE);
    characterModel.rotation.y = Math.PI / 2; // Menghadap kanan (Sumbu X positif)
}

function playAnim(name) {
    if(!mixer) return;
    Object.values(animations).forEach(action => action.stop());
    const found = Object.keys(animations).find(k => k.includes(name));
    const anim = animations[found] || Object.values(animations)[0];
    if(anim) { anim.reset(); anim.play(); }
}

// --- 4. UI INTERACTION ---
document.getElementById('level-indicator').innerText = `LEVEL ${currentLevelIndex + 1} / ${levels.length}`;
const slotPanel = document.getElementById('slot-panel');
const slots = [];
for (let i = 0; i < MAX_STEPS; i++) {
    const div = document.createElement('div');
    div.className = 'slot';
    div.setAttribute('title', `Langkah ${i + 1}`);
    slotPanel.appendChild(div);
    slots.push(div);
}

const dirIcons = {
    'up': '<i class="fa-solid fa-arrow-up"></i>',
    'down': '<i class="fa-solid fa-arrow-down"></i>',
    'left': '<i class="fa-solid fa-arrow-left"></i>',
    'right': '<i class="fa-solid fa-arrow-right"></i>'
};

function updateUI() {
    for(let i=0; i<MAX_STEPS; i++) {
        if(i < characterMoves.length) {
            slots[i].innerHTML = dirIcons[characterMoves[i]];
            slots[i].classList.add('filled');
            slots[i].classList.remove('executing', 'completed-step');
        } else {
            slots[i].innerHTML = '';
            slots[i].classList.remove('filled', 'executing', 'completed-step');
            slots[i].style.borderColor = '';
            slots[i].style.transform = '';
            slots[i].style.boxShadow = '';
        }
    }
    const isFull = (characterMoves.length === MAX_STEPS);
    document.getElementById('btn-go').disabled = (!isFull || isExecuting);

    const instructionEl = document.getElementById('slot-instruction');
    if (instructionEl) {
        if (isExecuting) {
            instructionEl.innerHTML = `<span class="text-green-400 font-bold animate-pulse"><i class="fa-solid fa-person-walking mr-1"></i> Astronot menjalankan instruksi...</span>`;
        } else if (isFull) {
            instructionEl.innerHTML = `<span class="text-yellow-300 font-bold"><i class="fa-solid fa-circle-check mr-1 text-green-400"></i> Rute ${MAX_STEPS} langkah siap! Tekan <strong class="text-white underline">JALAN!</strong></span>`;
        } else if (characterMoves.length === 0) {
            instructionEl.innerHTML = `Tekan tombol panah di bawah untuk mengisi <span class="text-cyan-300 font-bold">${MAX_STEPS} langkah</span> rute`;
        } else {
            const remaining = MAX_STEPS - characterMoves.length;
            instructionEl.innerHTML = `Langkah <span class="text-cyan-300 font-bold">${characterMoves.length}</span> / ${MAX_STEPS} &bull; Sisa <span class="text-yellow-300 font-bold">${remaining} langkah</span> lagi`;
        }
    }
}

document.querySelectorAll('.ctrl-btn[data-dir]').forEach(btn => {
    btn.addEventListener('click', () => {
        if(isExecuting || characterMoves.length >= MAX_STEPS) return;
        playSound('click');
        characterMoves.push(btn.getAttribute('data-dir'));
        updateUI();
    });
});

document.getElementById('btn-undo').addEventListener('click', () => {
    if(isExecuting || characterMoves.length === 0) return;
    playSound('click');
    characterMoves.pop();
    updateUI();
});

document.getElementById('btn-go').addEventListener('click', () => {
    if(characterMoves.length === MAX_STEPS && !isExecuting) {
        playSound('click');
        isExecuting = true;
        document.getElementById('btn-go').disabled = true;
        
        const instructionEl = document.getElementById('slot-instruction');
        if (instructionEl) {
            instructionEl.innerHTML = `<span class="text-green-400 font-bold animate-pulse"><i class="fa-solid fa-person-walking mr-1"></i> Astronot menjalankan instruksi...</span>`;
        }

        // Sembunyikan kontrol bawah sementara agar papan 3D leluasa dilihat
        const bottomControls = document.getElementById('bottom-controls');
        if(bottomControls) {
            bottomControls.style.opacity = '0';
            bottomControls.style.transform = 'translate(-50%, 150%)';
            bottomControls.style.pointerEvents = 'none';
        }
        
        executeMoves();
    }
});

// Dukungan Keyboard untuk Pengguna Laptop / Komputer
window.addEventListener('keydown', (e) => {
    if (isExecuting) return;
    if (e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') {
        e.preventDefault();
        if (characterMoves.length < MAX_STEPS) { playSound('click'); characterMoves.push('up'); updateUI(); }
    } else if (e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') {
        e.preventDefault();
        if (characterMoves.length < MAX_STEPS) { playSound('click'); characterMoves.push('down'); updateUI(); }
    } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
        e.preventDefault();
        if (characterMoves.length < MAX_STEPS) { playSound('click'); characterMoves.push('left'); updateUI(); }
    } else if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
        e.preventDefault();
        if (characterMoves.length < MAX_STEPS) { playSound('click'); characterMoves.push('right'); updateUI(); }
    } else if (e.key === 'Backspace' || e.key === 'z' || e.key === 'Z') {
        e.preventDefault();
        if (characterMoves.length > 0) { playSound('click'); characterMoves.pop(); updateUI(); }
    } else if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        if (characterMoves.length === MAX_STEPS) {
            document.getElementById('btn-go').click();
        }
    }
});

document.getElementById('btn-retry-level').addEventListener('click', () => {
    playSound('click');
    window.location.reload();
});
document.getElementById('btn-back-home').addEventListener('click', () => {
    playSound('click');
    sessionStorage.setItem('astroLevel', 0);
    window.location.reload();
});

// --- 5. TWEENS & ANIMATIONS ---
function tweenCamera(targetPos, targetLook, durationMs) {
    return new Promise(resolve => {
        const startPos = camera.position.clone();
        const camDir = new THREE.Vector3(); camera.getWorldDirection(camDir);
        const startLook = camera.position.clone().add(camDir);
        
        const startTime = Date.now();
        function update() {
            const progress = Math.min((Date.now() - startTime) / durationMs, 1);
            const ease = progress < 0.5 ? 2 * progress * progress : 1 - Math.pow(-2 * progress + 2, 2) / 2;
            camera.position.lerpVectors(startPos, targetPos, ease);
            const currentLook = new THREE.Vector3().lerpVectors(startLook, targetLook, ease);
            camera.lookAt(currentLook);
            if(progress < 1) requestAnimationFrame(update); else resolve();
        }
        requestAnimationFrame(update);
    });
}

function tweenJump(startVec, endVec, durationMs) {
    return new Promise(resolve => {
        const startTime = Date.now();
        function update() {
            const progress = Math.min((Date.now() - startTime) / durationMs, 1);
            characterModel.position.x = startVec.x + (endVec.x - startVec.x) * progress;
            characterModel.position.z = startVec.z + (endVec.z - startVec.z) * progress;
            // Parabolic Jump
            characterModel.position.y = startVec.y + Math.sin(progress * Math.PI) * (TILE_SIZE * 0.6);
            if(progress < 1) requestAnimationFrame(update);
            else { characterModel.position.copy(endVec); resolve(); }
        }
        requestAnimationFrame(update);
    });
}

function tweenFall(startVec, durationMs) {
    return new Promise(resolve => {
        const startTime = Date.now();
        function update() {
            const progress = Math.min((Date.now() - startTime) / durationMs, 1);
            characterModel.position.y = startVec.y - (15 * progress * progress); // Accelerate down
            characterModel.rotation.z += 0.15; // Tumble
            characterModel.rotation.x += 0.1;
            if(progress < 1) requestAnimationFrame(update); else resolve();
        }
        requestAnimationFrame(update);
    });
}

function tweenHoleTrap(c, r, durationMs) {
    return new Promise(resolve => {
        const startPos = characterModel.position.clone();
        const startRot = characterModel.rotation.clone();
        const startTime = Date.now();
        
        function update() {
            const progress = Math.min((Date.now() - startTime) / durationMs, 1);
            
            if (progress < 0.2) {
                // Flail / wobble slightly before falling
                characterModel.position.x = startPos.x + (Math.random() - 0.5) * 0.15;
                characterModel.position.z = startPos.z + (Math.random() - 0.5) * 0.15;
                characterModel.rotation.z = startRot.z + (Math.random() - 0.5) * 0.5;
                characterModel.rotation.x = startRot.x + (Math.random() - 0.5) * 0.5;
            } else {
                // Fall straight down through the hole
                const fallProg = (progress - 0.2) / 0.8;
                const easeInQuad = fallProg * fallProg;
                
                characterModel.position.x = startPos.x;
                characterModel.position.z = startPos.z;
                characterModel.position.y = startPos.y - (easeInQuad * 20); // fall very deep
                
                // Spin wildly while falling
                characterModel.rotation.y = startRot.y + easeInQuad * Math.PI * 4;
                characterModel.rotation.x = startRot.x + easeInQuad * Math.PI * 2;
                characterModel.rotation.z = startRot.z + easeInQuad * Math.PI * 2;
                
                // Scale down as they fall away
                const scale = Math.max(0, 1 - easeInQuad);
                characterModel.scale.setScalar(scale * 0.5); // Assuming original was 0.5
            }
            
            if(progress < 1) {
                requestAnimationFrame(update);
            } else {
                // Reset properties
                characterModel.rotation.copy(startRot);
                characterModel.scale.setScalar(0.5);
                characterModel.visible = false;
                resolve();
            }
        }
        requestAnimationFrame(update);
    });
}

function restoreUIMode() {
    const bottomControls = document.getElementById('bottom-controls');
    if(bottomControls) {
        bottomControls.style.opacity = '1';
        bottomControls.style.transform = 'translate(-50%, 0)';
        bottomControls.style.pointerEvents = 'auto';
    }
    isExecuting = false;
    slots.forEach(s => s.classList.remove('executing', 'completed-step'));
    updateUI();
}

async function executeMoves() {
    let currC = startPos.c;
    let currR = startPos.r;
    
    // Camera zooms in to follow player
    await tweenCamera(
        new THREE.Vector3((currC * TILE_SIZE) - 4, 6, (currR * TILE_SIZE) + 6), 
        new THREE.Vector3(currC * TILE_SIZE, 0, currR * TILE_SIZE), 
        800
    );
    
    for(let i=0; i<characterMoves.length; i++) {
        const move = characterMoves[i];
        let nextC = currC; let nextR = currR;
        
        // Highlight Slot UI aktif secara elegan
        slots.forEach((s, idx) => {
            s.classList.remove('executing');
            if (idx < i) {
                s.classList.add('completed-step');
            } else {
                s.classList.remove('completed-step');
            }
        });
        slots[i].classList.add('executing');
        
        // Rotation
        let targetRot = characterModel.rotation.y;
        if(move === 'right') { targetRot = Math.PI / 2; nextC++; }
        else if(move === 'left') { targetRot = -Math.PI / 2; nextC--; }
        else if(move === 'down') { targetRot = 0; nextR++; }
        else if(move === 'up') { targetRot = Math.PI; nextR--; }
        
        characterModel.rotation.set(0, targetRot, 0);
        
        playSound('jump');
        playAnim('jump');
        
        const startVec = characterModel.position.clone();
        const endVec = new THREE.Vector3(nextC * TILE_SIZE, 0, nextR * TILE_SIZE);
        
        const pJump = tweenJump(startVec, endVec, 500);
        const pCam = tweenCamera(
            new THREE.Vector3(endVec.x - 4, 6, endVec.z + 6), 
            endVec, 
            500
        );
        
        await Promise.all([pJump, pCam]);
        
        // Check Land or Hole
        let isOnLand = false;
        let isOnTrap = false;
        if(nextR >= 0 && nextR < GRID_SIZE && nextC >= 0 && nextC < GRID_SIZE) {
            if(mapGrid[nextR][nextC] === 1) {
                isOnLand = true;
            } else if(mapGrid[nextR][nextC] === 0) {
                isOnTrap = true;
            }
        }
        
        if(!isOnLand) {
            playSound('fall');
            playAnim('idle'); 
            
            if (isOnTrap) {
                // Stepped on Trap Platform
                document.getElementById('lose-modal').querySelector('h2').innerText = "TERPEROSOK KE LUBANG!";
                document.getElementById('lose-modal').querySelector('p').innerText = "Kamu masuk ke dalam lubang jebakan! Perhatikan pola tanda silang dan cari jalan yang aman.";
                await tweenHoleTrap(nextC, nextR, 1000);
            } else {
                // Fell out of bounds
                document.getElementById('lose-modal').querySelector('h2').innerText = "JATUH KE LUBANG!";
                document.getElementById('lose-modal').querySelector('p').innerText = "Rute instruksi kamu salah dan astronot tergelincir ke ruang angkasa. Susun ulang logikamu!";
                await tweenFall(endVec, 800);
            }
            
            restoreUIMode();
            document.getElementById('lose-modal').style.display = 'flex';
            return;
        }
        
        // Safe
        currC = nextC; currR = nextR;
        
        if (currC === finishPos.c && currR === finishPos.r) {
            break;
        }
        
        playAnim('idle');
        await new Promise(r => setTimeout(r, 400));
    }
    
    // Check Win condition
    if(currC === finishPos.c && currR === finishPos.r) {
        playSound('win');
        
        // Star disappear animation
        const pStar = new Promise(resolve => {
            const startTime = Date.now();
            const startScale = targetStar.scale.x;
            function updateStar() {
                const progress = Math.min((Date.now() - startTime) / 400, 1);
                const scale = startScale * (1 - progress);
                targetStar.scale.set(scale, scale, scale);
                if(progress < 1) requestAnimationFrame(updateStar);
                else {
                    targetStar.visible = false;
                    resolve();
                }
            }
            requestAnimationFrame(updateStar);
        });

        const jumpAnimName = Object.keys(animations).find(k => k.includes('jump'));
        if (jumpAnimName && animations[jumpAnimName]) {
            animations[jumpAnimName].setLoop(THREE.LoopRepeat, Infinity);
        }
        playAnim('jump');

        await Promise.all([
            pStar,
            tweenCamera(
                new THREE.Vector3((currC * TILE_SIZE) + 4, 4, (currR * TILE_SIZE) + 6), 
                new THREE.Vector3(currC * TILE_SIZE, 0, currR * TILE_SIZE), 
                1000
            )
        ]);

        restoreUIMode();

        setTimeout(() => {
            const winModal = document.getElementById('win-modal');
            if (currentLevelIndex === levels.length - 1) {
                document.getElementById('win-title').innerText = "TAMAT!";
                document.getElementById('win-desc').innerText = "Luar biasa! Kamu telah menyelesaikan semua level Astro Logic secara sempurna!";
                document.getElementById('btn-next-level').innerText = "MAIN DARI AWAL (LEVEL 1)";
                document.getElementById('btn-next-level').onclick = () => {
                    playSound('click');
                    sessionStorage.setItem('astroLevel', 0);
                    window.location.reload();
                };
                document.getElementById('btn-replay-level').style.display = 'none';
            } else {
                document.getElementById('win-title').innerText = "LEVEL SELESAI!";
                document.getElementById('win-desc').innerText = "Kerja bagus! Siap untuk tantangan selanjutnya?";
                document.getElementById('btn-next-level').innerText = "LANJUT LEVEL " + (currentLevelIndex + 2);
                document.getElementById('btn-next-level').onclick = () => {
                    playSound('click');
                    sessionStorage.setItem('astroLevel', currentLevelIndex + 1);
                    window.location.reload();
                };
                document.getElementById('btn-replay-level').style.display = 'block';
                document.getElementById('btn-replay-level').onclick = () => {
                    playSound('click');
                    window.location.reload();
                };
            }
            winModal.style.display = 'flex';
        }, 2000);
    } else {
        // Survived but didn't reach finish
        restoreUIMode();
        document.getElementById('lose-modal').querySelector('h2').innerText = "TIDAK SAMPAI!";
        document.getElementById('lose-modal').querySelector('p').innerText = "Kamu selamat, tapi tidak mencapai bintang tujuan.";
        document.getElementById('lose-modal').style.display = 'flex';
    }
}

// --- 6. RENDER LOOP ---
const clock = new THREE.Clock();
function animate() {
    requestAnimationFrame(animate);
    const delta = clock.getDelta();
    const time = clock.getElapsedTime();
    
    if (mixer) mixer.update(delta);
    
    if(typeof targetStar !== 'undefined' && targetStar.visible) {
        targetStar.rotation.y = time * 2;
        targetStar.position.y = 1.5 + Math.sin(time * 3) * 0.2;
    }

    // Rotate Realistic Planets
    if(bgPlanet1) bgPlanet1.rotation.y += 0.001;
    if(bgPlanet2) bgPlanet2.rotation.y += 0.002;

    // Animate Trap Particles, Asteroids & Stars
    scene.traverse(c => {
        if(c.userData) {
            if(c.userData.isAsteroid) {
                c.rotation.x += c.userData.rotSpeed.x;
                c.rotation.y += c.userData.rotSpeed.y;
                c.position.y += Math.sin(time + c.id) * c.userData.floatSpeed;
            }
        }
    });
    stars.rotation.y = time * 0.02;

    renderer.render(scene, camera);
}
animate();

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    updateCameraForScreen();
});

updateUI();
