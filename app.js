// Sound Synthesizer using Web Audio API
const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

function playTone(freq, type, duration, startTime = 0) {
  const osc = audioCtx.createOscillator();
  const gainNode = audioCtx.createGain();
  
  osc.type = type;
  osc.frequency.setValueAtTime(freq, audioCtx.currentTime + startTime);
  
  gainNode.gain.setValueAtTime(0.15, audioCtx.currentTime + startTime);
  gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + startTime + duration);
  
  osc.connect(gainNode);
  gainNode.connect(audioCtx.destination);
  
  osc.start(audioCtx.currentTime + startTime);
  osc.stop(audioCtx.currentTime + startTime + duration);
}

function playCoinSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(987.77, 'square', 0.08, 0);
  playTone(1318.51, 'square', 0.25, 0.08);
}

function playWarningSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(150, 'sawtooth', 0.25, 0);
}

function playLevelUpSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51, 1567.98, 2093.00];
  const duration = 0.12;
  notes.forEach((freq, index) => {
    playTone(freq, 'triangle', 0.2, index * duration);
  });
  
  setTimeout(() => {
    playTone(1046.50, 'sine', 0.6, 0);
    playTone(1318.51, 'sine', 0.6, 0.02);
    playTone(1567.98, 'sine', 0.6, 0.04);
  }, notes.length * duration * 1000);
}

function playHatchSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const duration = 0.05;
  for (let i = 0; i < 8; i++) {
    const freq = 400 + i * 150;
    playTone(freq, 'sine', 0.08, i * duration);
  }
  setTimeout(() => {
    playTone(1567.98, 'triangle', 0.4, 0);
    playTone(1975.53, 'sine', 0.5, 0.05);
  }, 8 * duration * 1000);
}

function playGachaSpinFastSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  playTone(1000 + Math.random() * 500, 'triangle', 0.03, 0);
}

function playGachaRevealSound() {
  if (audioCtx.state === 'suspended') audioCtx.resume();
  const arpeggio = [523.25, 659.25, 783.99, 987.77, 1046.50, 1318.51, 1567.98, 2093.00];
  arpeggio.forEach((freq, idx) => {
    playTone(freq, 'triangle', 0.18, idx * 0.06);
  });
  
  setTimeout(() => {
    playTone(1046.50, 'sine', 0.8, 0);
    playTone(1318.51, 'sine', 0.8, 0.03);
    playTone(1567.98, 'sine', 0.8, 0.06);
    playTone(2093.00, 'sine', 1.0, 0.09);
  }, arpeggio.length * 0.06 * 1000);
}

// Confetti Effect
let confettiParticles = [];
let confettiAnimationId = null;
const canvas = document.getElementById('confetti-canvas');
const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

window.addEventListener('resize', resizeCanvas);

class ConfettiParticle {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = Math.random() * canvas.height - canvas.height;
    this.size = Math.random() * 8 + 6;
    this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    this.speedX = Math.random() * 4 - 2;
    this.speedY = Math.random() * 5 + 4;
    this.rotation = Math.random() * 360;
    this.rotationSpeed = Math.random() * 10 - 5;
  }
  
  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.rotation += this.rotationSpeed;
  }
  
  draw() {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;
    ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
    ctx.restore();
  }
}

function startConfetti() {
  resizeCanvas();
  confettiParticles = [];
  for (let i = 0; i < 150; i++) {
    confettiParticles.push(new ConfettiParticle());
  }
  
  if (confettiAnimationId) cancelAnimationFrame(confettiAnimationId);
  animateConfetti();
}

function animateConfetti() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  
  let alive = false;
  confettiParticles.forEach((p) => {
    p.update();
    p.draw();
    if (p.y < canvas.height) {
      alive = true;
    }
  });
  
  if (alive) {
    confettiAnimationId = requestAnimationFrame(animateConfetti);
  } else {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
}

// Pixel Art Sprites Data (16x16 color grid)
const pixelSprites = {
  cat: {
    baby: [
      "................",
      "................",
      "................",
      "................",
      "....kkk....kkk..",
      "...kccck..kccck.",
      "..kcccckkkkcccck",
      "..kcycccccyccck.",
      ".kccykkkkkyccck.",
      ".kccykwkwkyccck.",
      "..kccccckcccck..",
      "...kccpckpcck...",
      "....kkkkkkkk....",
      ".....kcccck.....",
      "....kcccccck....",
      "....kkkkkkkk...."
    ],
    teen: [
      "................",
      ".......v........",
      "......vvv.......",
      ".....vvvvv......",
      "....vvvvvvv.....",
      "...kkkkkkkkk....",
      "..kcccckkkkcccck",
      "..kcycccccyccck.",
      ".kccykkkkkyccck.",
      ".kccykwkwkyccck.",
      "..kccccckcccck..",
      "...kccpckpcck...",
      "....kkkkkkkk....",
      ".....kcccck.....",
      "....kccrrcck....",
      "....kkkkkkkk...."
    ],
    legend: [
      "......yyy.......",
      "......y.y.......",
      ".....y.y.y......",
      "....kkkkkkk.....",
      "....kccck..kccck.",
      "..kcccckkkkcccck",
      "..kcycccccyccck.",
      ".kccykkkkkyccck.",
      ".kccykwkwkyccck.",
      "..kccccckcccck..",
      "...kccpckpcck...",
      "....kkkkkkkk....",
      ".....kcccck.....",
      "....kcrrrcck....",
      "...kccrrrccck...",
      "....kkkkkkkk...."
    ]
  },
  dog: {
    baby: [
      "................",
      "................",
      "................",
      "......kkkk......",
      "....kkeeekkk....",
      "...kkeeeeeekkk..",
      "..kkeewwweeeek..",
      "..kewwkkwwkeek..",
      "..kewwkwkweek...",
      "...kewwweeeek...",
      "....keeeeeek....",
      ".....kkkkkk.....",
      "....keeeeeek....",
      "...keeeeeeeek...",
      "..keekkkkkkeek..",
      "...kk......kk..."
    ],
    teen: [
      "................",
      "................",
      "......kkkk......",
      "....kkeeekkk....",
      "...kkeeeeeekkk..",
      "..kkeewwweeeek..",
      "..kewwkkwwkeek..",
      "..kewwkwkweek...",
      "...kewwweeeek...",
      "...kkbbbbbbkk...",
      "....keeeeeek....",
      "....keeeeeek....",
      "...keeeeeeeek...",
      "..keekkkkkkeek..",
      "...kk......kk...",
      "................"
    ],
    legend: [
      "......aaaa......",
      ".....aaaaaa.....",
      "....akkkkaaa....",
      "....kkeeekkk....",
      "...kkeeeeeekkk..",
      "..kkeewwweeeek..",
      "..kewwkkwwkeek..",
      "..kewwkwkweek...",
      "...kewwweeeek...",
      "...kkrrrrrrkk...",
      "....keeeeeek....",
      "....keeeeeek....",
      "...keeeeeeeek...",
      "..keekkkkkkeek..",
      "...kk......kk...",
      "................"
    ]
  },
  dragon: {
    baby: [
      "................",
      "................",
      "......kkk.......",
      ".....kgggk......",
      "....kgggggk.....",
      "...kggggggk.....",
      "..kggwggwggk....",
      "..kgwkgwkggk....",
      "..kgggggggk.....",
      "...kgggggk......",
      "....kkkkk.......",
      "....kgggk.......",
      "...kgggggk......",
      "..kgggggggk.....",
      "..kkgkkkgkk.....",
      "...k...k........"
    ],
    teen: [
      "................",
      "......kkk.......",
      ".....kgggk......",
      "....kgggggk.....",
      "...kggggggk.....",
      "..krrwrrwrrk....",
      "..krwkrwkrgk....",
      "..kgggggggk.....",
      "...kgggggk......",
      "....kkkkk.......",
      "....kgggk.......",
      "...kgggggk......",
      "..kgggggggk.....",
      "..kkgkkkgkk.....",
      "...k...k........",
      "................"
    ],
    legend: [
      ".....yyyyy......",
      ".....y.y.y......",
      "......kkk.......",
      ".....kgggk......",
      "....kgggggk.....",
      "...kggggggk.....",
      "..kggwggwggk....",
      "..kgwkgwkggk....",
      "..kgggggggk.....",
      "...kgggggk......",
      "....kkkkk.......",
      "...krrrrrk......",
      "..kgggggggk.....",
      "..kkgkkkgkk.....",
      "...k...k........",
      "................"
    ]
  },
  phoenix: {
    baby: [
      "................",
      "................",
      "......kkk.......",
      ".....kyyyk......",
      "....kyyyyyk.....",
      "...kyyyyyyyk....",
      "..kyykyykyyyk...",
      "..kywkywkyyyk...",
      "..kyyyyyyrrrk...",
      "...kyyyyykkk....",
      "....kyyyk.......",
      "....kyyyk.......",
      "...kyyyyyk......",
      "..kyyyyyyyk.....",
      "...kkykkyk......",
      "....k..k........"
    ],
    teen: [
      "................",
      "......kkk.......",
      ".....kyyyk......",
      "....kyyyyyk.....",
      "...kyyyyyyyk....",
      "..kbbkbbkyyyk...",
      "..kbwkbwkyyyk...",
      "..kyyyyyyrrrk...",
      "...kyyyyykkk....",
      "....kyyyk.......",
      "....kyyyk.......",
      "...kyyyyyk......",
      "..kyyyyyyyk.....",
      "...kkykkyk......",
      "....k..k........",
      "................"
    ],
    legend: [
      ".....rrrrr......",
      "....rrrrrrr.....",
      "......kkk.......",
      ".....kyyyk......",
      "....kyyyyyk.....",
      "...kyyyyyyyk....",
      "..kyykyykyyyk...",
      "..kywkywkyyyk...",
      "..kyyyyyyrrrk...",
      "...kyyyyykkk....",
      "....kyyyk.......",
      "...krrrrrk......",
      "..kyyyyyyyk.....",
      "...kkykkyk......",
      "....k..k........",
      "................"
    ]
  },
  slime: {
    baby: [
      "................",
      "................",
      "................",
      "................",
      "................",
      "......kkkk......",
      "....kkbbbbkk....",
      "...kbbbbbbbbk...",
      "..kbbwwbbwwbbk..",
      "..kbbwkwbkwkbbk.",
      "..kbbbbbbbbbbk..",
      "...kbbbbbbbbk...",
      "....kkbbbbkk....",
      "......kkkk......",
      "................",
      "................"
    ],
    teen: [
      "................",
      "................",
      "................",
      "................",
      "......kkkk......",
      "....kkbbbbkk....",
      "...kbbbbbbbbk...",
      "..kbbwwbbwwbbk..",
      "..kbbwkwbkwkbbk.",
      "..kbbbbbbbbbbk..",
      "...kbbbbbbbbk...",
      "....kkrrrrkk....",
      "......kkkk......",
      "................",
      "................",
      "................"
    ],
    legend: [
      "......yyy.......",
      "......y.y.......",
      ".....y.y.y......",
      "......kkkk......",
      "....kkbbbbkk....",
      "...kbbbbbbbbk...",
      "..kbbwwbbwwbbk..",
      "..kbbwkwbkwkbbk.",
      "..kbbbbbbbbbbk..",
      "...kbbbbbbbbk...",
      "....kkrrrrkk....",
      "......kkkk......",
      "................",
      "................",
      "................",
      "................"
    ]
  },
  panda: {
    baby: [
      "................",
      "....kk.....kk...",
      "....kkk...kkk...",
      "....kwkkkkkwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwwkkwwwkkwwk.",
      "..kwkkwkwkkwkwk.",
      "..kwwwwwwwwwwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwwwk...",
      ".....kkkkkkk....",
      "....kwwkkwk.....",
      "...kwwwwwwwk....",
      "..kkkwkkkwkkk...",
      "...kk.....kk...."
    ],
    teen: [
      "................",
      "....kk.....kk...",
      "....kkk...kkk...",
      "....kwkkkkkwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwkkkwwwkkkwk.",
      "..kwkkwkwkkwkwk.",
      "..kwwwwwwwwwwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwwwk...",
      ".....kkkkkkk....",
      "....kwwkkwk.....",
      "...kwwwwwwwk....",
      "..kkkwkkkwkkk...",
      "...kk.....kk...."
    ],
    legend: [
      ".....rrrrr......",
      "....kk.....kk...",
      "....kkk...kkk...",
      "....kwkkkkkwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwwkkwwwkkwwk.",
      "..kwkkwkwkkwkwk.",
      "..kwwwwwwwwwwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwwwk...",
      ".....kkkkkkk....",
      "....kwwkkwk.....",
      "...kcrrrrcwk....",
      "..kkcrrrrcwkk...",
      "...kk.....kk...."
    ]
  },
  rabbit: {
    baby: [
      ".....kk...kk....",
      "....kppk.kppk...",
      "....kwwk.kwwk...",
      "....kwwk.kwwk...",
      "....kwwkkkwwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwwkkwkwkkwwk.",
      "..kwwpwwpwwpwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwk.....",
      ".....kkkkk......",
      "....kwwwwwk.....",
      "...kwwwwwwwk....",
      "..kkkkkkkkkkk...",
      "................"
    ],
    teen: [
      ".....kk...kk....",
      "....kppk.kppk...",
      "....kwwk.kwwk...",
      "....kwwk.kwwk...",
      "....kwwkkkwwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwwkkwkwkkwwk.",
      "..kwwpwwpwwpwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwk.....",
      ".....krrrk......",
      "....kwwwwwk.....",
      "...kwwwwwwwk....",
      "..kkkkkkkkkkk...",
      "................"
    ],
    legend: [
      ".....vvvvvv.....",
      ".....vkkkkv.....",
      ".....vkkkkv.....",
      "....vvkkkkvv....",
      "....kwwkkkwwk...",
      "...kwwwwwwwwwk..",
      "..kwwwwwwwwwwwk.",
      "..kwwkkwkwkkwwk.",
      "..kwwpwwpwwpwwk.",
      "...kwwwwwwwwwk..",
      "....kwwwwwk.....",
      ".....krrrk......",
      "....kwwwwwk.....",
      "...kwwwwwwwk....",
      "..kkkkkkkkkkk...",
      "................"
    ]
  }
};

function renderPetPixelSVG(type, level) {
  if (type === null || type === undefined) {
    return '🥚';
  }
  
  const spriteGroup = pixelSprites[type];
  if (!spriteGroup) {
    return '🐾';
  }
  
  let key = 'baby';
  if (level >= 5) {
    key = 'legend';
  } else if (level >= 3) {
    key = 'teen';
  }
  
  const sprite = spriteGroup[key] || spriteGroup['baby'];
  const size = 16;
  const pixelSize = 4;
  let svg = `<svg class="pet-pixel-svg" width="${size * pixelSize}" height="${size * pixelSize}" viewBox="0 0 ${size * pixelSize} ${size * pixelSize}" xmlns="http://www.w3.org/2000/svg">`;
  
  const colors = {
    '.': 'transparent',
    'k': '#1a1a1a', // black outline
    'w': '#ffffff', // white highlight
    'c': type === 'cat' ? '#ffa726' : (type === 'dog' ? '#a1887f' : (type === 'dragon' ? '#66bb6a' : (type === 'phoenix' ? '#ffd54f' : (type === 'slime' ? '#42a5f5' : (type === 'panda' ? '#e0e0e0' : '#ffffff'))))),
    'd': type === 'cat' ? '#fb8c00' : (type === 'dog' ? '#795548' : (type === 'dragon' ? '#4caf50' : (type === 'phoenix' ? '#ffb300' : (type === 'slime' ? '#1e88e5' : (type === 'panda' ? '#9e9e9e' : '#e0e0e0'))))),
    'y': '#ffd700', // gold
    'r': '#e53935', // red
    'g': '#81c784', // green light
    'b': '#90caf9', // blue light
    'p': '#ff8a80', // pink
    'e': '#8d6e63', // brown
    'f': '#4e342e', // brown dark
    'a': '#cfd8dc', // silver armor
    'v': '#4a148c', // dark purple
  };
  
  for (let r = 0; r < size; r++) {
    for (let c = 0; c < size; c++) {
      const char = sprite[r][c];
      const color = colors[char] || 'transparent';
      if (color !== 'transparent') {
        svg += `<rect x="${c * pixelSize}" y="${r * pixelSize}" width="${pixelSize}" height="${pixelSize}" fill="${color}" />`;
      }
    }
  }
  svg += '</svg>';
  return svg;
}

// Game Settings & Data
const availablePets = [
  { type: 'cat', emoji: '🐱', label: 'ลูกแมวเหมียว' },
  { type: 'dog', emoji: '🐶', label: 'ตูบน้อย' },
  { type: 'dragon', emoji: '🐲', label: 'มังกรน้อย' },
  { type: 'phoenix', emoji: '🐤', label: 'ฟีนิกซ์น้อย' },
  { type: 'slime', emoji: '💧', label: 'สไลม์ดึ๋งๆ' },
  { type: 'panda', emoji: '🐼', label: 'หมีแพนด้า' },
  { type: 'rabbit', emoji: '🐰', label: 'กระต่ายปุย' },
  { type: 'hedgehog', emoji: '🦔', label: 'เม่น' }
];

const shopItems = {
  cookie: { name: 'คุกกี้เวทมนตร์ 🍪', price: 10, happyGain: 20, expGain: 5, desc: 'เพิ่มความสุข +20' },
  yarn: { name: 'ไหมพรมวิเศษ 🧶', price: 15, happyGain: 35, expGain: 10, desc: 'เพิ่มความสุข +35' },
  fruit: { name: 'ผลไม้ศักดิ์สิทธิ์ 🍎', price: 20, happyGain: 50, expGain: 25, desc: 'เพิ่มสุข +50, EXP สัตว์เลี้ยง +25' },
  bear: { name: 'ตุ๊กตาหมีอัศวิน 🧸', price: 30, happyGain: 70, expGain: 40, desc: 'เพิ่มสุข +70, EXP สัตว์เลี้ยง +40' },
  new_egg: { name: 'ไข่สัตว์เลี้ยงใหม่ 🥚', price: 100, happyGain: 0, expGain: 0, desc: 'ฟักตัวใหม่' }
};

const shopDecor = {
  bed: { name: 'เตียงนอนแสนอุ่น 🛏️', price: 15, emoji: '🛏️', desc: 'ตกแต่งเตียงแสนสบาย' },
  tree: { name: 'ต้นไม้จิ๋วแต่งบ้าน 🌳', price: 10, emoji: '🌳', desc: 'ปลูกต้นไม้ร่มรื่น' },
  castle: { name: 'ปราสาทของเล่น 🏰', price: 25, emoji: '🏰', desc: 'ปราสาทสไลเดอร์จิ๋ว' },
  bowl: { name: 'ชามทองคำ 🥣', price: 20, emoji: '🥣', desc: 'ชามอาหารสุดพรีเมียม' },
  picture: { name: 'กรอบรูปแห่งความทรงจำ 🖼️', price: 18, emoji: '🖼️', desc: 'ประดับผนังด้วยรูปแสนพิเศษ' },
  lamp: { name: 'โคมไฟเวทมนตร์ 🪔', price: 22, emoji: '🪔', desc: 'เติมแสงอบอุ่นให้บ้านสัตว์เลี้ยง' }
};

const defaultStudents = [
  { 
    id: 1, 
    name: "เจ้านาย", 
    number: 1, 
    class: "ผู้พิทักษ์ (Guardian)", 
    avatar: "Photos-3-001 (1)/เจ้านาย.jpg", 
    avatarReal: "Photos-3-001 (1)/เจ้านาย.jpg", 
    avatarAnime: "Photos-3-001 (1)/avatar_jaonai.png", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  },
  { 
    id: 2, 
    name: "ตุลา", 
    number: 2, 
    class: "จอมเวทย์ (Mage)", 
    avatar: "Photos-3-001 (1)/ตุลา.jpg", 
    avatarReal: "Photos-3-001 (1)/ตุลา.jpg", 
    avatarAnime: "Photos-3-001 (1)/avatar_tula.png", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  },
  { 
    id: 3, 
    name: "ใบข้าว", 
    number: 3, 
    class: "นักบวช (Cleric)", 
    avatar: "Photos-3-001 (1)/ใบข้าว.jpg", 
    avatarReal: "Photos-3-001 (1)/ใบข้าว.jpg", 
    avatarAnime: "", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  },
  { 
    id: 4, 
    name: "วันใหม่", 
    number: 4, 
    class: "นักธนู (Archer)", 
    avatar: "Photos-3-001 (1)/วันใหม่.jpg", 
    avatarReal: "Photos-3-001 (1)/วันใหม่.jpg", 
    avatarAnime: "", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  },
  { 
    id: 5, 
    name: "อลิซ", 
    number: 5, 
    class: "นักอัญเชิญ (Summoner)", 
    avatar: "Photos-3-001 (1)/อลิซ.jpg", 
    avatarReal: "Photos-3-001 (1)/อลิซ.jpg", 
    avatarAnime: "", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  },
  { 
    id: 6, 
    name: "กัปตัน", 
    number: 6, 
    class: "นักดาบเวทมนตร์ (Spellsword)", 
    avatar: "Photos-3-001 (1)/กัปตัน.jpg", 
    avatarReal: "Photos-3-001 (1)/กัปตัน.jpg", 
    avatarAnime: "", 
    useAnime: false, 
    level: 1, 
    exp: 0, 
    reading: 0, 
    math: 0,
    coins: 0,
    pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null }
  }
];

const defaultQuests = [
  { id: 1, title: "ส่งการบ้านวิชาภาษาไทย บทที่ 1 📖", expReward: 20, coinReward: 10, completedBy: [] },
  { id: 2, title: "ทำแบบฝึกหัดคณิตศาสตร์ หน้า 10 🧮", expReward: 25, coinReward: 15, completedBy: [] },
  { id: 3, title: "อ่านออกเสียงวิชาภาษาอังกฤษ 5 ประโยค 🗣️", expReward: 15, coinReward: 10, completedBy: [] }
];

let classroomTitle = 'ห้องเรียนนักผจญภัย ป.1';
let students = [];
let quests = [];
let isTeacherMode = false;
let currentEditingId = null;
let activePetStudentId = null;
let activePetSlot = 1;
let activeShopTab = 'items';

// Classroom Title Management
function updateClassroomTitleUI() {
  const savedTitle = localStorage.getItem('classroom_rpg_title');
  if (savedTitle) {
    classroomTitle = savedTitle;
  }
  const titleEl = document.getElementById('classroom-main-title');
  if (titleEl) {
    titleEl.textContent = classroomTitle;
  }
  const inputEl = document.getElementById('classroom-title-input');
  if (inputEl) {
    inputEl.value = classroomTitle;
  }
  document.title = `RPG Classroom Level Up - ${classroomTitle}`;
}

function saveClassroomTitle() {
  const inputEl = document.getElementById('classroom-title-input');
  if (!inputEl) return;
  const newTitle = inputEl.value.trim();
  if (!newTitle) {
    alert('กรุณากรอกชื่อห้องเรียน!');
    return;
  }
  classroomTitle = newTitle;
  localStorage.setItem('classroom_rpg_title', newTitle);
  updateClassroomTitleUI();
  playCoinSound();
  alert('บันทึกชื่อห้องเรียนเรียบร้อยแล้ว!');
}

// Small offline job characters shown beside each student's portrait
function getClassMiniCharacter(className = '') {
  const normalizedClass = String(className).toLowerCase();
  let job = {
    key: 'guardian',
    label: 'ผู้พิทักษ์จิ๋ว',
    character: '🧑',
    equipment: '🛡️',
    magic: '✦'
  };

  if (normalizedClass.includes('spellsword') || normalizedClass.includes('ดาบ')) {
    job = { key: 'spellsword', label: 'นักดาบเวทมนตร์จิ๋ว', character: '🧑', equipment: '⚔️', magic: '✧' };
  } else if (normalizedClass.includes('summoner') || normalizedClass.includes('อัญเชิญ')) {
    job = { key: 'summoner', label: 'นักอัญเชิญจิ๋ว', character: '🧙', equipment: '✨', magic: '◌' };
  } else if (normalizedClass.includes('archer') || normalizedClass.includes('ธนู')) {
    job = { key: 'archer', label: 'นักธนูจิ๋ว', character: '🧝', equipment: '🏹', magic: '➶' };
  } else if (normalizedClass.includes('cleric') || normalizedClass.includes('บวช')) {
    job = { key: 'cleric', label: 'นักบวชจิ๋ว', character: '🧑', equipment: '🌿', magic: '✚' };
  } else if (normalizedClass.includes('mage') || normalizedClass.includes('เวทย์') || normalizedClass.includes('เวท')) {
    job = { key: 'mage', label: 'จอมเวทย์จิ๋ว', character: '🧙', equipment: '🔮', magic: '✦' };
  }

  return `
    <span class="job-miniature job-${job.key}" role="img" aria-label="${job.label}" title="${job.label}">
      <span class="job-mini-magic">${job.magic}</span>
      <span class="job-mini-character">${job.character}</span>
      <span class="job-mini-equipment">${job.equipment}</span>
    </span>
  `;
}

// Costume layers stay on top of the original photo/avatar and upgrade by level.
function getLevelCostumeOverlay(className = '', level = 1) {
  const normalizedClass = String(className).toLowerCase();
  let job = { key: 'guardian', emblem: '◆', name: 'ผู้พิทักษ์' };

  if (normalizedClass.includes('spellsword') || normalizedClass.includes('ดาบ')) {
    job = { key: 'spellsword', emblem: '⚔', name: 'นักดาบเวทมนตร์' };
  } else if (normalizedClass.includes('summoner') || normalizedClass.includes('อัญเชิญ')) {
    job = { key: 'summoner', emblem: '◇', name: 'นักอัญเชิญ' };
  } else if (normalizedClass.includes('archer') || normalizedClass.includes('ธนู')) {
    job = { key: 'archer', emblem: '➶', name: 'นักธนู' };
  } else if (normalizedClass.includes('cleric') || normalizedClass.includes('บวช')) {
    job = { key: 'cleric', emblem: '✚', name: 'นักบวช' };
  } else if (normalizedClass.includes('mage') || normalizedClass.includes('เวทย์') || normalizedClass.includes('เวท')) {
    job = { key: 'mage', emblem: '✦', name: 'จอมเวทย์' };
  }

  const safeLevel = Math.max(1, Number(level) || 1);
  let tier = 1;
  let tierName = 'ชุดฝึกหัด';
  let rank = 'I';
  if (safeLevel >= 10) {
    tier = 4;
    tierName = 'ชุดระดับตำนาน';
    rank = 'MAX';
  } else if (safeLevel >= 5) {
    tier = 3;
    tierName = 'ชุดวีรชน';
    rank = 'III';
  } else if (safeLevel >= 3) {
    tier = 2;
    tierName = 'ชุดนักผจญภัย';
    rank = 'II';
  }

  const label = `${tierName}${job.name} เลเวล ${safeLevel}`;
  return `
    <span class="level-costume costume-${job.key} costume-tier-${tier}" role="img" aria-label="${label}" title="${label}">
      <span class="costume-aura"></span>
      <span class="costume-wing costume-wing-left"></span>
      <span class="costume-wing costume-wing-right"></span>
      <span class="costume-headpiece"></span>
      <span class="costume-shoulder costume-shoulder-left"></span>
      <span class="costume-shoulder costume-shoulder-right"></span>
      <span class="costume-emblem">${job.emblem}</span>
      <span class="costume-rank">${rank}</span>
    </span>
  `;
}

// 100% Offline SVG Avatar Generator
function generateDefaultAvatar(name, className = '') {
  const char = name ? name.trim().charAt(0) : '⭐';
  let icon = '🛡️';
  if (className.includes('Mage') || className.includes('เวทย์')) icon = '🔮';
  else if (className.includes('Cleric') || className.includes('บวช')) icon = '🌿';
  else if (className.includes('Archer') || className.includes('ธนู')) icon = '🏹';
  else if (className.includes('Summoner') || className.includes('อัญเชิญ')) icon = '✨';
  else if (className.includes('Spellsword') || className.includes('ดาบ')) icon = '⚔️';

  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="150" height="150" viewBox="0 0 150 150">
    <defs>
      <linearGradient id="avatar_bg_grad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stop-color="#2d1954"/>
        <stop offset="100%" stop-color="#130b28"/>
      </linearGradient>
    </defs>
    <rect width="150" height="150" rx="20" fill="url(#avatar_bg_grad)"/>
    <rect x="5" y="5" width="140" height="140" rx="16" fill="none" stroke="#ffd700" stroke-width="2.5" opacity="0.8"/>
    <text x="75" y="65" font-size="44" text-anchor="middle" dominant-baseline="central">${icon}</text>
    <text x="75" y="115" font-size="22" font-weight="bold" fill="#ffd700" text-anchor="middle" font-family="'Sarabun', sans-serif">${char}</text>
  </svg>`;
  return 'data:image/svg+xml;utf8,' + encodeURIComponent(svg);
}

// Initialize App
function init() {
  updateClassroomTitleUI();

  // Load Students
  const localStudents = localStorage.getItem('classroom_rpg_students');
  if (localStudents) {
    try {
      students = JSON.parse(localStudents);
      // Ensure all students have updated schema
      students.forEach(s => {
        if (s.coins === undefined) s.coins = 0;
        if (!s.pet) {
          s.pet = { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], expeditionEnd: null };
        }
        if (s.pet.decorations === undefined) s.pet.decorations = [];
        if (s.pet.decorLevels === undefined) s.pet.decorLevels = {};
        if (s.pet.expeditionEnd === undefined) s.pet.expeditionEnd = null;
        
        // Backfill levels for already owned items
        if (s.pet.decorations.length > 0) {
          s.pet.decorations.forEach(emoji => {
            const decorKey = Object.keys(shopDecor).find(k => shopDecor[k].emoji === emoji);
            if (decorKey && s.pet.decorLevels[decorKey] === undefined) {
              s.pet.decorLevels[decorKey] = 1;
            }
          });
        }

        // Schema migration for pet2 (if exists)
        if (s.pet2) {
          if (s.pet2.decorations === undefined) s.pet2.decorations = [];
          if (s.pet2.decorLevels === undefined) s.pet2.decorLevels = {};
          if (s.pet2.expeditionEnd === undefined) s.pet2.expeditionEnd = null;
          
          if (s.pet2.decorations.length > 0) {
            s.pet2.decorations.forEach(emoji => {
              const decorKey = Object.keys(shopDecor).find(k => shopDecor[k].emoji === emoji);
              if (decorKey && s.pet2.decorLevels[decorKey] === undefined) {
                s.pet2.decorLevels[decorKey] = 1;
              }
            });
          }
        }
      });
    } catch (e) {
      students = [...defaultStudents];
      saveData();
    }
  } else {
    students = [...defaultStudents];
    saveData();
  }

  // Load Quests
  const localQuests = localStorage.getItem('classroom_rpg_quests');
  if (localQuests) {
    try {
      quests = JSON.parse(localQuests);
    } catch (e) {
      quests = [...defaultQuests];
      saveQuests();
    }
  } else {
    quests = [...defaultQuests];
    saveQuests();
  }
  
  renderDashboard();
  renderQuests();
  setupEventListeners();
  
  // Set intervals for active expedition timers
  setInterval(updateExpeditionTimers, 1000);
}

function saveData() {
  try {
    localStorage.setItem('classroom_rpg_students', JSON.stringify(students));
  } catch (e) {
    console.error("Storage save failed:", e);
    alert("❌ ไม่สามารถบันทึกข้อมูลได้ เนื่องจากพื้นที่จัดเก็บข้อมูลเบราว์เซอร์เต็ม หรือขนาดไฟล์ภาพใหญ่เกินไป!");
  }
}

function saveQuests() {
  localStorage.setItem('classroom_rpg_quests', JSON.stringify(quests));
}

// Get Pet evolved emoji & class label based on type & level
function getPetEvolvedState(pet) {
  if (pet.status === 'egg') {
    return { emoji: '🥚', label: 'ไข่สะสมพลัง' };
  }
  
  const level = pet.level;
  const evolutions = {
    cat: {
      baby: { emoji: '🐱', label: 'ลูกแมวเหมียว' },
      teen: { emoji: '🐈', label: 'แมวนักผจญภัย' },
      legend: { emoji: '🐈‍⬛', label: 'พยัคฆ์เงารัตติกาล' }
    },
    dog: {
      baby: { emoji: '🐶', label: 'ตูบน้อย' },
      teen: { emoji: '🐕', label: 'สุนัขนักสำรวจ' },
      legend: { emoji: '🐩', label: 'หมาป่าขนเมฆา' }
    },
    dragon: {
      baby: { emoji: '🐲', label: 'มังกรน้อย' },
      teen: { emoji: '🦖', label: 'มังกรนักรบ' },
      legend: { emoji: '🐉', label: 'ราชันย์มังกรเพลิง' }
    },
    phoenix: {
      baby: { emoji: '🐣', label: 'ฟีนิกซ์แรกเกิด' },
      teen: { emoji: '🐦', label: 'วิหคปีกคราม' },
      legend: { emoji: '🦅', label: 'ฟีนิกซ์อินทรีเพลิง' }
    },
    slime: {
      baby: { emoji: '💧', label: 'สไลม์ดึ๋งๆ' },
      teen: { emoji: '🫧', label: 'สไลม์ฟองพราย' },
      legend: { emoji: '🪼', label: 'จักรพรรดิสไลม์ทะเลดาว' }
    },
    panda: {
      baby: { emoji: '🐼', label: 'หมีแพนด้า' },
      teen: { emoji: '🐻', label: 'หมีนักสู้พลังไผ่' },
      legend: { emoji: '🦍', label: 'มหาจอมยุทธ์พงไพร' }
    },
    rabbit: {
      baby: { emoji: '🐰', label: 'กระต่ายปุย' },
      teen: { emoji: '🐇', label: 'กระต่ายสายลม' },
      legend: { emoji: '🦌', label: 'กวางจันทราศักดิ์สิทธิ์' }
    },
    hedgehog: {
      baby: { emoji: '🦔', label: 'น้องเม่น' },
      teen: { emoji: '🦡', label: 'แบดเจอร์หนามเหล็ก' },
      legend: { emoji: '🦏', label: 'แรดหนามทองคำ' }
    }
  };
  
  const ev = evolutions[pet.type] || evolutions['cat'];
  if (level >= 5) {
    return { emoji: ev.legend.emoji, label: ev.legend.label };
  } else if (level >= 3) {
    return { emoji: ev.teen.emoji, label: ev.teen.label };
  } else {
    return { emoji: ev.baby.emoji, label: ev.baby.label };
  }
}

function renderSinglePetHtml(student, pet, slotNumber) {
  const petState = getPetEvolvedState(pet);
  let petHtml = '';
  
  if (pet.status === 'egg') {
    const progressPercent = Math.min(100, (pet.hatchProgress / 50) * 100);
    petHtml = `
      <div class="pet-card-section" style="margin-top: 8px;">
        <div class="pet-section-header">🥚 ไข่ตัวที่ ${slotNumber} (Hatching)</div>
        <div class="pet-display">
          <span class="pet-emoji-avatar">🥚</span>
          <div class="pet-bar-container" style="flex: 1;">
            <div class="pet-bar-text">
              <span>กำลังฟัก</span>
              <span>${pet.hatchProgress}/50</span>
            </div>
            <div class="pet-bar-bg">
              <div class="pet-bar-fill fill-hatch" style="width: ${progressPercent}%"></div>
            </div>
          </div>
        </div>
        <button class="btn-pet-action" onclick="feedEgg(${student.id}, ${slotNumber})">🪙 เร่งฟักไข่ (ใช้ 10)</button>
      </div>
    `;
  } else {
    // Check if pet is on expedition
    let petStatusClass = '';
    let isExploring = false;
    let petDisplayHTML = '';
    
    if (pet.expeditionEnd && (pet.expeditionEnd - Date.now()) > 0) {
      isExploring = true;
      petStatusClass = 'pet-exploring-anim';
      petDisplayHTML = `<span class="pet-emoji-avatar ${petStatusClass}" style="font-size: 3rem;">🗺️</span>`;
    } else {
      petDisplayHTML = `<span class="pet-emoji-avatar" style="font-size: 3rem; display: inline-block; line-height: 1;">${petState.emoji}</span>`;
    }
    
    petHtml = `
      <div class="pet-card-section" style="margin-top: 8px;">
        <div class="pet-section-header">🐾 คู่หูตัวที่ ${slotNumber}: ${petState.label}</div>
        <div class="pet-display">
          <div id="dashboard-pet-emoji-${student.id}-${slotNumber}" style="width: 64px; height: 64px; display: flex; align-items: center; justify-content: center;">
            ${petDisplayHTML}
          </div>
          <div class="pet-text-info" style="flex: 1; margin-left: 8px;">
            <span class="pet-name-label">${pet.name}</span>
            <span class="pet-level-label">เลเวล ${pet.level}</span>
          </div>
        </div>
        <div class="pet-bar-container" style="margin-bottom: 4px;">
          <div class="pet-bar-text">
            <span>ความสุข ❤️</span>
            <span>${pet.happiness}/100</span>
          </div>
          <div class="pet-bar-bg">
            <div class="pet-bar-fill fill-happy" style="width: ${pet.happiness}%"></div>
          </div>
        </div>
        <button class="btn-pet-action" id="dashboard-pet-btn-${student.id}-${slotNumber}" onclick="openPetCare(${student.id}, ${slotNumber})">
          ${isExploring ? '⏰ กำลังสำรวจ...' : `🍪 ดูแลตัวที่ ${slotNumber}`}
        </button>
      </div>
    `;
  }
  return petHtml;
}

// Render Student Grid
function renderDashboard() {
  const container = document.getElementById('classroom-grid');
  container.innerHTML = '';
  
  students.sort((a, b) => a.number - b.number);
  
  students.forEach(student => {
    const card = document.createElement('div');
    card.className = 'character-card';
    card.id = `student-card-${student.id}`;
    
    const avatarPath = student.useAnime && student.avatarAnime ? student.avatarAnime : student.avatarReal;
    
    // Resolve pet HTML section (supports up to 2 pets)
    let petHtml = renderSinglePetHtml(student, student.pet, 1);
    if (student.pet2) {
      petHtml += renderSinglePetHtml(student, student.pet2, 2);
    }
    
    card.innerHTML = `
      <div class="edit-overlay">
        <button class="btn-edit-small" onclick="openEditStudentModal(${student.id})" title="แก้ไขข้อมูล">✏️</button>
        <button class="btn-delete-small" onclick="deleteStudent(${student.id})" title="ลบนักเรียน">🗑️</button>
      </div>
      <div class="card-header">
        <span class="badge-level">LV ${student.level}</span>
        <span class="class-title">${student.class}</span>
      </div>
      <div class="avatar-frame">
        <img src="${avatarPath}" alt="${student.name}" class="avatar-image" onerror="this.onerror=null;this.src=generateDefaultAvatar('${student.name.replace(/'/g, "\\'")}', '${student.class}')">
        ${getLevelCostumeOverlay(student.class, student.level)}
        ${getClassMiniCharacter(student.class)}
        <div class="number-tag">${student.number}</div>
      </div>
      
      <div class="char-name-container">
        <h2 class="char-name">${student.name}</h2>
        <span class="badge-coins" title="เหรียญทองสะสม">🪙 ${student.coins}</span>
      </div>
      
      <div class="exp-container">
        <div class="exp-label">
          <span>EXP</span>
          <span>${student.exp}/100</span>
        </div>
        <div class="exp-bar-bg">
          <div class="exp-bar-fill" style="width: ${student.exp}%"></div>
        </div>
      </div>
      
      <div class="stats-container">
        <div class="stat-row">
          <div class="stat-info">
            <span class="stat-icon">📖</span>
            <span>ทักษะการอ่าน</span>
          </div>
          <span class="stat-value">${student.reading}</span>
        </div>
        <div class="stat-row">
          <div class="stat-info">
            <span class="stat-icon">🧮</span>
            <span>การคิดคำนวณ</span>
          </div>
          <span class="stat-value">${student.math}</span>
        </div>
      </div>
      
      ${petHtml}
      
      <div class="action-buttons">
        <button class="btn-action btn-reading" onclick="giveReward(${student.id}, 'reading')">+📖 อ่าน</button>
        <button class="btn-action btn-math" onclick="giveReward(${student.id}, 'math')">+🧮 คิดเลข</button>
        <button class="btn-action btn-star" onclick="giveReward(${student.id}, 'star')">+⭐ พฤติกรรม</button>
        <button class="btn-action btn-warn" onclick="giveReward(${student.id}, 'warn')">-💀 เตือน</button>
      </div>
    `;
    container.appendChild(card);
  });
  
  // Dashboard card for adding student
  const addCard = document.createElement('div');
  addCard.className = 'btn-add-student-dashboard';
  addCard.style.display = isTeacherMode ? 'flex' : 'none';
  addCard.onclick = () => openEditStudentModal(null);
  addCard.innerHTML = `
    <span style="font-size: 3rem;">➕</span>
    <span style="font-size: 1.1rem; font-weight: 700;">สร้างตัวละครใหม่</span>
  `;
  container.appendChild(addCard);
}

// Give reward/penalty to student
function giveReward(id, type) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  
  let expChange = 0;
  let coinChange = 0;
  let levelUpped = false;
  
  if (type === 'reading') {
    expChange = 10;
    coinChange = 5;
    student.reading += 1;
    playCoinSound();
  } else if (type === 'math') {
    expChange = 10;
    coinChange = 5;
    student.math += 1;
    playCoinSound();
  } else if (type === 'star') {
    expChange = 10;
    coinChange = 5;
    playCoinSound();
  } else if (type === 'warn') {
    expChange = -10;
    coinChange = -5;
    playWarningSound();
  }
  
  student.exp += expChange;
  student.coins = Math.max(0, student.coins + coinChange);
  
  // Handle level up
  if (student.exp >= 100) {
    student.level += 1;
    student.exp = student.exp - 100;
    levelUpped = true;
  }
  
  if (student.exp < 0) {
    student.exp = 0;
  }
  
  saveData();
  renderDashboard();
  renderQuests();
  
  if (levelUpped) {
    showLevelUpModal(student);
  }
}

// Level Up Modal
function showLevelUpModal(student) {
  const modal = document.getElementById('level-up-modal');
  document.getElementById('modal-title-header').textContent = 'LEVEL UP!';
  document.getElementById('modal-avatar').style.display = 'block';
  
  const emojiDiv = document.getElementById('modal-hatch-emoji');
  if (emojiDiv) emojiDiv.style.display = 'none';
  
  const avatarPath = student.useAnime && student.avatarAnime ? student.avatarAnime : student.avatarReal;
  document.getElementById('modal-avatar').src = avatarPath;
  const modalAvatarFrame = document.querySelector('.modal-avatar-frame');
  let costumeSlot = document.getElementById('modal-level-costume');
  if (!costumeSlot) {
    costumeSlot = document.createElement('div');
    costumeSlot.id = 'modal-level-costume';
    costumeSlot.className = 'modal-level-costume-slot';
    modalAvatarFrame.appendChild(costumeSlot);
  }
  costumeSlot.innerHTML = getLevelCostumeOverlay(student.class, student.level);
  costumeSlot.style.display = 'block';
  document.getElementById('modal-name').textContent = student.name;
  document.getElementById('modal-class').textContent = student.class;
  document.getElementById('modal-level-tag').textContent = `LEVEL ${student.level}`;
  
  modal.classList.add('active');
  playLevelUpSound();
  startConfetti();
}

function closeLevelUpModal() {
  const modal = document.getElementById('level-up-modal');
  modal.classList.remove('active');

  // Restore shared modal elements so both level-up and egg-hatch screens close cleanly.
  const emojiDiv = document.getElementById('modal-hatch-emoji');
  if (emojiDiv) emojiDiv.style.display = 'none';
  document.getElementById('modal-avatar').style.display = 'block';

  const costumeSlot = document.getElementById('modal-level-costume');
  if (costumeSlot) costumeSlot.style.display = 'none';

  if (confettiAnimationId) {
    cancelAnimationFrame(confettiAnimationId);
    confettiAnimationId = null;
  }
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Pet Egg Hatching
function feedEgg(id, slotNumber = 1) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  
  const pet = slotNumber === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  if (student.coins < 10) {
    alert(`เหรียญทองไม่พอ! (ต้องการ 10 🪙 ตอนนี้มี ${student.coins} 🪙)`);
    playWarningSound();
    return;
  }
  
  student.coins -= 10;
  pet.hatchProgress += 10;
  playCoinSound();
  
  // Check Hatch
  if (pet.hatchProgress >= 50) {
    pet.status = 'hatched';
    
    // Choose random pet
    const roll = Math.floor(Math.random() * availablePets.length);
    const chosen = availablePets[roll];
    
    pet.type = chosen.type;
    pet.emoji = chosen.emoji;
    pet.name = `น้อง${chosen.label}`;
    pet.happiness = 100;
    pet.level = 1;
    pet.exp = 0;
    pet.decorations = [];
    pet.decorLevels = {};
    pet.expeditionEnd = null;
    
    setTimeout(() => {
      showHatchCelebration(student, slotNumber);
    }, 400);
  }
  
  saveData();
  renderDashboard();
}

function showHatchCelebration(student, slotNumber = 1) {
  const pet = slotNumber === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  const modal = document.getElementById('level-up-modal');
  document.getElementById('modal-title-header').textContent = 'ไข่กะเทาะฟักแล้ว! 🎉';
  document.getElementById('modal-avatar').style.display = 'none';
  const costumeSlot = document.getElementById('modal-level-costume');
  if (costumeSlot) costumeSlot.style.display = 'none';
  
  const frame = document.querySelector('.modal-avatar-frame');
  let emojiDiv = document.getElementById('modal-hatch-emoji');
  if (!emojiDiv) {
    emojiDiv = document.createElement('div');
    emojiDiv.id = 'modal-hatch-emoji';
    emojiDiv.style.fontSize = '6.5rem';
    emojiDiv.style.position = 'absolute';
    emojiDiv.style.top = '50%';
    emojiDiv.style.left = '50%';
    emojiDiv.style.transform = 'translate(-50%, -50%)';
    frame.appendChild(emojiDiv);
  }
  
  emojiDiv.textContent = pet.emoji;
  emojiDiv.style.display = 'block';
  
  document.getElementById('modal-name').textContent = pet.name;
  document.getElementById('modal-class').textContent = `${student.name} ได้พบคู่หูตัวที่ ${slotNumber} ตัวใหม่!`;
  document.getElementById('modal-level-tag').textContent = `🐾 เลเวล 1`;
  
  modal.classList.add('active');
  playHatchSound();
  startConfetti();
}

function resetHatchModalSetup() {
  closeLevelUpModal();
}

// Edit Student Modal Controller
function openEditStudentModal(id) {
  const modal = document.getElementById('edit-student-modal');
  const title = document.getElementById('edit-modal-title');
  
  // File upload input reset
  document.getElementById('edit-avatar-file-input').value = '';
  
  if (id === null) {
    // Adding new student
    currentEditingId = null;
    title.textContent = '⚔️ สร้างตัวละครใหม่';
    document.getElementById('edit-student-id').value = '';
    document.getElementById('edit-student-name').value = '';
    document.getElementById('edit-student-number').value = students.length + 1;
    document.getElementById('edit-student-class').value = 'ผู้พิทักษ์ (Guardian)';
    document.getElementById('edit-student-level').value = '1';
    document.getElementById('edit-student-exp').value = '0';
    document.getElementById('edit-student-coins').value = '0';
    
    // Default avatar preview
    document.getElementById('edit-avatar-preview').src = 'https://placehold.co/150/1a1738/ffd700?text=NEW';
    document.getElementById('edit-avatar-preview').dataset.base64 = '';
    
    document.getElementById('btn-preset-anime').style.display = 'none';
  } else {
    // Editing existing student
    const student = students.find(s => s.id === id);
    if (!student) return;
    
    currentEditingId = id;
    title.textContent = `✏️ แก้ไขตัวละคร: ${student.name}`;
    document.getElementById('edit-student-id').value = student.id;
    document.getElementById('edit-student-name').value = student.name;
    document.getElementById('edit-student-number').value = student.number;
    document.getElementById('edit-student-class').value = student.class;
    document.getElementById('edit-student-level').value = student.level;
    document.getElementById('edit-student-exp').value = student.exp;
    document.getElementById('edit-student-coins').value = student.coins;
    
    const avatarPath = student.useAnime && student.avatarAnime ? student.avatarAnime : student.avatarReal;
    document.getElementById('edit-avatar-preview').src = avatarPath;
    document.getElementById('edit-avatar-preview').dataset.base64 = '';
    
    // Only show Anime Avatar preset button if student has anime path
    if (student.avatarAnime) {
      document.getElementById('btn-preset-anime').style.display = 'inline-block';
    } else {
      document.getElementById('btn-preset-anime').style.display = 'none';
    }
  }
  
  modal.classList.add('active');
}

function closeEditStudentModal() {
  document.getElementById('edit-student-modal').classList.remove('active');
}

function triggerEditAvatarUpload() {
  document.getElementById('edit-avatar-file-input').click();
}

function handleEditAvatarUpload(event) {
  const file = event.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    const img = new Image();
    img.onload = function() {
      const canvas = document.createElement('canvas');
      const max_size = 256;
      let width = img.width;
      let height = img.height;
      let size = Math.min(width, height);
      
      canvas.width = max_size;
      canvas.height = max_size;
      const ctx = canvas.getContext('2d');
      
      // Crop square and resize
      ctx.drawImage(
        img,
        (width - size) / 2, (height - size) / 2, size, size,
        0, 0, max_size, max_size
      );
      
      // Convert to compressed jpeg (only ~15-30KB)
      const compressedBase64 = canvas.toDataURL('image/jpeg', 0.85);
      
      document.getElementById('edit-avatar-preview').src = compressedBase64;
      document.getElementById('edit-avatar-preview').dataset.base64 = compressedBase64;
    };
    img.src = e.target.result;
  };
  reader.readAsDataURL(file);
}

function setPresetAvatar(type) {
  if (currentEditingId === null) return;
  const student = students.find(s => s.id === currentEditingId);
  if (!student) return;
  
  if (type === 'real') {
    document.getElementById('edit-avatar-preview').src = student.avatarReal;
    document.getElementById('edit-avatar-preview').dataset.base64 = 'use_real';
  } else if (type === 'anime') {
    if (student.avatarAnime) {
      document.getElementById('edit-avatar-preview').src = student.avatarAnime;
      document.getElementById('edit-avatar-preview').dataset.base64 = 'use_anime';
    }
  }
}

function handleEditStudentFormSubmit(e) {
  e.preventDefault();
  
  const idVal = document.getElementById('edit-student-id').value;
  const name = document.getElementById('edit-student-name').value.trim();
  const number = parseInt(document.getElementById('edit-student-number').value);
  const className = document.getElementById('edit-student-class').value;
  const level = parseInt(document.getElementById('edit-student-level').value);
  const exp = parseInt(document.getElementById('edit-student-exp').value);
  const coins = parseInt(document.getElementById('edit-student-coins').value);
  const base64Data = document.getElementById('edit-avatar-preview').dataset.base64;
  
  if (!name || isNaN(number) || isNaN(level) || isNaN(exp) || isNaN(coins)) {
    alert('กรุณากรอกข้อมูลตัวเลขให้ครบถ้วน!');
    return;
  }
  
  if (idVal) {
    // Edit student
    const student = students.find(s => s.id === parseInt(idVal));
    if (student) {
      student.name = name;
      student.number = number;
      student.class = className;
      student.level = level;
      student.exp = exp;
      student.coins = coins;
      
      // Update image
      if (base64Data === 'use_real') {
        student.useAnime = false;
        student.avatar = student.avatarReal;
      } else if (base64Data === 'use_anime') {
        student.useAnime = true;
        student.avatar = student.avatarAnime;
      } else if (base64Data && base64Data.startsWith('data:image')) {
        student.useAnime = false;
        student.avatarReal = base64Data;
        student.avatar = base64Data;
      }
    }
  } else {
    // Add student
    const newId = students.length > 0 ? Math.max(...students.map(s => s.id)) + 1 : 1;
    let finalAvatar = (base64Data && base64Data.startsWith('data:image')) 
      ? base64Data 
      : generateDefaultAvatar(name, className);
    
    students.push({
      id: newId,
      name: name,
      number: number,
      class: className,
      avatarReal: finalAvatar,
      avatarAnime: "",
      avatar: finalAvatar,
      useAnime: false,
      level: level,
      exp: exp,
      reading: 0,
      math: 0,
      coins: coins,
      pet: { status: 'egg', hatchProgress: 0, type: null, emoji: '🥚', name: 'ไข่สัตว์เลี้ยง', happiness: 100, level: 1, exp: 0, decorations: [], decorLevels: {}, expeditionEnd: null }
    });
  }
  
  saveData();
  renderDashboard();
  renderQuests();
  closeEditStudentModal();
  playCoinSound();
}

// Pet Care / Shop Modal & Wandering engine
let petWanderInterval = null;
let petWanderInterval2 = null;

function startPetWandering(studentId) {
  const student = students.find(s => s.id === studentId);
  if (!student) return;
  
  stopPetWandering();
  
  // Setup wandering for Pet 1
  if (student.pet && student.pet.status !== 'egg') {
    petWanderInterval = setupWander(document.getElementById('pet-room-actor'), document.getElementById('pet-room-floor-shadow'), 50);
  }
  
  // Setup wandering for Pet 2
  if (student.pet2 && student.pet2.status !== 'egg') {
    petWanderInterval2 = setupWander(document.getElementById('pet-room-actor2'), document.getElementById('pet-room-floor-shadow2'), 35);
  }
  
  function setupWander(actor, shadow, defaultX) {
    if (!actor || !shadow) return null;
    
    // Ensure display is block
    actor.style.display = 'block';
    shadow.style.display = 'block';
    
    let currentX = defaultX;
    let currentY = 30;
    
    actor.style.left = `${currentX}%`;
    actor.style.bottom = `${currentY}px`;
    actor.style.setProperty('--pet-direction', '1');
    actor.style.transform = 'translate(-50%, 0) scaleX(1)';
    shadow.style.left = `${currentX}%`;
    shadow.style.bottom = `${currentY - 5}px`;
    
    function makePetMove() {
      const freshStudent = students.find(s => s.id === studentId);
      if (!freshStudent) return;
      
      const pet = actor.id === 'pet-room-actor' ? freshStudent.pet : freshStudent.pet2;
      if (!pet || (pet.expeditionEnd && (pet.expeditionEnd - Date.now()) > 0)) {
        return; 
      }
      
      // 70% chance to walk
      if (Math.random() > 0.3) {
        const newX = Math.floor(Math.random() * 61) + 20; // 20% to 80%
        const newY = Math.floor(Math.random() * 41) + 15; // 15px to 55px
        
        const diffX = newX - currentX;
        let scaleX = 1;
        if (Math.abs(diffX) > 5) {
          scaleX = diffX < 0 ? -1 : 1;
        }
        
        actor.classList.add('pet-walking-bob');
        actor.classList.remove('pet-breathing');
        actor.style.setProperty('--pet-direction', String(scaleX));
        
        actor.style.left = `${newX}%`;
        actor.style.bottom = `${newY}px`;
        actor.style.transform = `translate(-50%, 0) scaleX(${scaleX})`;
        
        shadow.style.left = `${newX}%`;
        shadow.style.bottom = `${newY - 5}px`;
        
        currentX = newX;
        currentY = newY;
        
        setTimeout(() => {
          actor.classList.remove('pet-walking-bob');
          actor.classList.add('pet-breathing');
        }, 2500);
      }
    }
    
    return setInterval(makePetMove, 5000);
  }
}

function stopPetWandering() {
  if (petWanderInterval) {
    clearInterval(petWanderInterval);
    petWanderInterval = null;
  }
  if (petWanderInterval2) {
    clearInterval(petWanderInterval2);
    petWanderInterval2 = null;
  }
}

function openPetCare(studentId, slotNumber = 1) {
  const student = students.find(s => s.id === studentId);
  if (!student) return;
  
  // Clear any active wander interval first to prevent stacking
  stopPetWandering();
  
  activePetStudentId = studentId;
  activePetSlot = slotNumber;
  switchShopTab('items'); // default tab
  
  // Update select tabs UI
  const tabsContainer = document.getElementById('pet-selection-tabs');
  if (student.pet2) {
    tabsContainer.style.display = 'flex';
    if (activePetSlot === 1) {
      document.getElementById('tab-select-pet1').classList.add('active');
      document.getElementById('tab-select-pet2').classList.remove('active');
    } else {
      document.getElementById('tab-select-pet1').classList.remove('active');
      document.getElementById('tab-select-pet2').classList.add('active');
    }
  } else {
    tabsContainer.style.display = 'none';
  }
  
  updatePetCareModalUI();
  document.getElementById('pet-care-modal').classList.add('active');
  
  // Start wandering
  startPetWandering(studentId);
}

function switchActivePetSlot(slotNumber) {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  activePetSlot = slotNumber;
  
  if (activePetSlot === 1) {
    document.getElementById('tab-select-pet1').classList.add('active');
    document.getElementById('tab-select-pet2').classList.remove('active');
  } else {
    document.getElementById('tab-select-pet1').classList.remove('active');
    document.getElementById('tab-select-pet2').classList.add('active');
  }
  
  updatePetCareModalUI();
}

function closePetCareModal() {
  document.getElementById('pet-care-modal').classList.remove('active');
  stopPetWandering();
}

function switchShopTab(tab) {
  activeShopTab = tab;
  if (tab === 'items') {
    document.getElementById('tab-shop-items').classList.add('active');
    document.getElementById('tab-shop-decor').classList.remove('active');
    document.getElementById('shop-items-grid').style.display = 'grid';
    document.getElementById('shop-decor-grid').style.display = 'none';
  } else {
    document.getElementById('tab-shop-items').classList.remove('active');
    document.getElementById('tab-shop-decor').classList.add('active');
    document.getElementById('shop-items-grid').style.display = 'none';
    document.getElementById('shop-decor-grid').style.display = 'grid';
  }
  updatePetCareModalUI();
}

function updatePetCareModalUI() {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  // Resolve active pet for stats & shop panel
  const pet = activePetSlot === 1 ? student.pet : student.pet2;
  if (!pet) return; // slot 2 not owned yet
  
  const petState = getPetEvolvedState(pet);
  
  // Set modal details for active pet
  const petModalEmoji = document.getElementById('pet-modal-emoji');
  if (pet.status === 'egg') {
    petModalEmoji.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🥚</span>';
  } else {
    if (pet.expeditionEnd && (pet.expeditionEnd - Date.now()) > 0) {
      petModalEmoji.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🗺️</span>';
    } else {
      petModalEmoji.innerHTML = `<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; line-height: 1;">${petState.emoji}</span>`;
    }
  }
  
  document.getElementById('pet-modal-name-label').textContent = pet.name;
  document.getElementById('pet-modal-owner').textContent = `ผู้ดูแล: ${student.name} | 🪙 ${student.coins} เหรียญ`;
  document.getElementById('pet-modal-level').textContent = `เลเวล: ${pet.level} (EXP: ${pet.exp}/100)`;
  document.getElementById('pet-rename-input-field').value = pet.name;
  
  // Happiness bar
  document.getElementById('pet-modal-happy-bar').style.width = `${pet.happiness}%`;
  document.getElementById('pet-modal-happy-val').textContent = `${pet.happiness}/100`;
  
  // EXP bar
  document.getElementById('pet-modal-exp-bar').style.width = `${pet.exp}%`;
  document.getElementById('pet-modal-exp-val').textContent = `${pet.exp}/100`;

  // Render Pet 1 in bedroom
  const actor1 = document.getElementById('pet-room-actor');
  const shadow1 = document.getElementById('pet-room-floor-shadow');
  const petHouseEmoji = document.getElementById('pet-house-emoji');
  
  if (student.pet.status === 'egg') {
    petHouseEmoji.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🥚</span>';
    if (actor1) {
      actor1.style.left = '50%';
      actor1.style.bottom = '30px';
      actor1.style.transform = 'translate(-50%, 0)';
    }
    if (shadow1) {
      shadow1.style.left = '50%';
      shadow1.style.bottom = '25px';
    }
  } else {
    if (student.pet.expeditionEnd && (student.pet.expeditionEnd - Date.now()) > 0) {
      petHouseEmoji.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🗺️</span>';
    } else {
      const pet1State = getPetEvolvedState(student.pet);
      petHouseEmoji.innerHTML = `<span style="font-size: 4.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; line-height: 1;">${pet1State.emoji}</span>`;
    }
  }

  // Render Pet 2 in bedroom
  const actor2 = document.getElementById('pet-room-actor2');
  const shadow2 = document.getElementById('pet-room-floor-shadow2');
  const petHouseEmoji2 = document.getElementById('pet-house-emoji2');
  
  if (student.pet2) {
    if (actor2) actor2.style.display = 'block';
    if (shadow2) shadow2.style.display = 'block';
    
    if (student.pet2.status === 'egg') {
      petHouseEmoji2.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🥚</span>';
      if (actor2) {
        actor2.style.left = '35%';
        actor2.style.bottom = '30px';
        actor2.style.transform = 'translate(-50%, 0)';
      }
      if (shadow2) {
        shadow2.style.left = '35%';
        shadow2.style.bottom = '25px';
      }
    } else {
      if (student.pet2.expeditionEnd && (student.pet2.expeditionEnd - Date.now()) > 0) {
        petHouseEmoji2.innerHTML = '<span style="font-size: 3.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap;">🗺️</span>';
      } else {
        const pet2State = getPetEvolvedState(student.pet2);
        petHouseEmoji2.innerHTML = `<span style="font-size: 4.5rem; display: inline-flex; align-items: center; justify-content: center; white-space: nowrap; line-height: 1;">${pet2State.emoji}</span>`;
      }
    }
  } else {
    if (actor2) actor2.style.display = 'none';
    if (shadow2) shadow2.style.display = 'none';
  }
  
  // Render decorations list in pet house absolutely positioned
  const decorContainer = document.getElementById('pet-house-decorations-list');
  decorContainer.innerHTML = '';
  if (student.pet.decorations && student.pet.decorations.length > 0) {
    student.pet.decorations.forEach(emoji => {
      const decorKey = Object.keys(shopDecor).find(k => shopDecor[k].emoji === emoji);
      const decor = shopDecor[decorKey] || { emoji: emoji };
      const decorClass = decorKey ? `decor-${decorKey}` : 'decor-bowl';
      const level = decorKey ? (student.pet.decorLevels[decorKey] || 1) : 1;
      
      const wrapper = document.createElement('div');
      wrapper.className = `decor-item-wrapper ${decorClass}`;
      
      // Scale based on level (12% larger per level upgrade)
      if (level > 1) {
        wrapper.style.transform = `scale(${1 + (level - 1) * 0.12})`;
      }
      
      // Floating level stars above the item
      let stars = '';
      if (level > 1) {
        stars = `<div class="decor-level-stars">${'⭐'.repeat(level - 1)}</div>`;
      }
      
      wrapper.innerHTML = `
        ${stars}
        <span>${decor.emoji}</span>
        <div class="decor-item-shadow"></div>
      `;
      decorContainer.appendChild(wrapper);
    });
  }
  
  // Update Expedition Timer UI state (for active pet)
  const expBtn = document.getElementById('btn-pet-expedition');
  const timerText = document.getElementById('expedition-timer-text');
  const progressBar = document.getElementById('expedition-progress-bar');
  
  if (pet.expeditionEnd) {
    const rem = Math.max(0, Math.ceil((pet.expeditionEnd - Date.now()) / 1000));
    if (rem > 0) {
      // Exploring state
      expBtn.disabled = true;
      expBtn.style.opacity = '0.5';
      expBtn.style.cursor = 'not-allowed';
      expBtn.textContent = `🗺️ กำลังสำรวจ... (${rem}s)`;
      timerText.textContent = `กำลังผจญภัย... 🚶‍♂️`;
      const progressWidth = ((60 - rem) / 60) * 100;
      progressBar.style.width = `${progressWidth}%`;
      
      // Animate pet emoji on modal
      document.getElementById('pet-modal-emoji').classList.add('pet-exploring-anim');
      if (activePetSlot === 1) {
        document.getElementById('pet-house-emoji').classList.add('pet-exploring-anim');
      } else {
        document.getElementById('pet-house-emoji2').classList.add('pet-exploring-anim');
      }
    } else {
      // Ready to claim state
      expBtn.disabled = false;
      expBtn.style.opacity = '1';
      expBtn.style.cursor = 'pointer';
      expBtn.classList.add('expedition-claim');
      expBtn.textContent = `🎁 รับรางวัลผจญภัย!`;
      timerText.textContent = `กลับมาพร้อมของรางวัล! 🎉`;
      progressBar.style.width = '100%';
      
      document.getElementById('pet-modal-emoji').classList.remove('pet-exploring-anim');
      if (activePetSlot === 1) {
        document.getElementById('pet-house-emoji').classList.remove('pet-exploring-anim');
      } else {
        document.getElementById('pet-house-emoji2').classList.remove('pet-exploring-anim');
      }
    }
  } else {
    // Ready to start state
    expBtn.disabled = false;
    expBtn.style.opacity = '1';
    expBtn.style.cursor = 'pointer';
    expBtn.classList.remove('expedition-claim');
    expBtn.textContent = `🗺️ ส่งออกไปผจญภัย (1 นาที)`;
    timerText.textContent = `พร้อมออกเดินทาง!`;
    progressBar.style.width = '0%';
    
    document.getElementById('pet-modal-emoji').classList.remove('pet-exploring-anim');
    if (document.getElementById('pet-house-emoji')) document.getElementById('pet-house-emoji').classList.remove('pet-exploring-anim');
    if (document.getElementById('pet-house-emoji2')) document.getElementById('pet-house-emoji2').classList.remove('pet-exploring-anim');
  }
  
  // Enable/Disable shop buttons based on coins
  const itemsBuyButtons = document.querySelectorAll('#shop-items-grid .btn-buy');
  itemsBuyButtons.forEach(btn => {
    const itemKey = btn.dataset.item;
    const item = shopItems[itemKey];
    btn.disabled = student.coins < item.price;
    btn.style.opacity = student.coins < item.price ? '0.5' : '1';
    btn.style.cursor = student.coins < item.price ? 'not-allowed' : 'pointer';
  });
  
  const decorBuyButtons = document.querySelectorAll('#shop-decor-grid .btn-buy');
  decorBuyButtons.forEach(btn => {
    const decorKey = btn.dataset.item;
    const decor = shopDecor[decorKey];
    if (!decor) return;
    
    const currentLevel = student.pet.decorLevels[decorKey] || 0;
    const nextLevel = currentLevel + 1;
    const nextPrice = decor.price * nextLevel;
    
    btn.disabled = student.coins < nextPrice;
    btn.style.opacity = student.coins < nextPrice ? '0.5' : '1';
    btn.style.cursor = student.coins < nextPrice ? 'not-allowed' : 'pointer';
    
    if (currentLevel > 0) {
      btn.textContent = `⭐ อัปเกรด Lv.${nextLevel} (🪙 ${nextPrice})`;
    } else {
      btn.textContent = `🪙 ${decor.price} เหรียญ`;
    }
  });

  // Override buy new egg button state (for pet 2)
  const buyEggBtn = document.getElementById('btn-buy-new-egg');
  if (buyEggBtn) {
    if (student.pet.status === 'egg') {
      buyEggBtn.disabled = true;
      buyEggBtn.style.opacity = '0.5';
      buyEggBtn.style.cursor = 'not-allowed';
      buyEggBtn.textContent = 'มีไข่อยู่แล้ว';
    } else if (student.pet2) {
      buyEggBtn.disabled = true;
      buyEggBtn.style.opacity = '0.5';
      buyEggBtn.style.cursor = 'not-allowed';
      buyEggBtn.textContent = 'สัตว์เลี้ยงเต็ม';
    } else {
      buyEggBtn.disabled = student.coins < 100;
      buyEggBtn.style.opacity = student.coins < 100 ? '0.5' : '1';
      buyEggBtn.style.cursor = student.coins < 100 ? 'not-allowed' : 'pointer';
      buyEggBtn.textContent = '🪙 100 เหรียญ';
    }
  }
}

function buyPetItem(itemKey) {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  const item = shopItems[itemKey];
  if (!item) return;
  
  if (student.coins < item.price) {
    alert('เหรียญทองไม่พอ!');
    return;
  }
  
  const pet = activePetSlot === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  student.coins -= item.price;
  pet.happiness = Math.min(100, pet.happiness + item.happyGain);
  pet.exp += item.expGain;
  
  // Check pet level up
  if (pet.exp >= 100) {
    pet.level += 1;
    pet.exp -= 100;
    playLevelUpSound();
    alert(`🎉 สัตว์เลี้ยงวิวัฒนาการเลเวลอัพ! ตอนนี้เลเวล ${pet.level}`);
  } else {
    playTone(700, 'sine', 0.1, 0);
  }
  
  saveData();
  renderDashboard();
  updatePetCareModalUI();
}

function buyDecorItem(decorKey) {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  const decor = shopDecor[decorKey];
  if (!decor) return;
  
  if (!student.pet.decorations) student.pet.decorations = [];
  if (!student.pet.decorLevels) student.pet.decorLevels = {};
  
  const currentLevel = student.pet.decorLevels[decorKey] || 0;
  const nextLevel = currentLevel + 1;
  const price = decor.price * nextLevel;
  
  if (student.coins < price) {
    alert('เหรียญทองไม่พอ!');
    return;
  }
  
  student.coins -= price;
  
  if (currentLevel === 0) {
    student.pet.decorations.push(decor.emoji);
    student.pet.decorLevels[decorKey] = 1;
    alert(`🎉 ซื้อ ${decor.name} สำเร็จและนำไปวางในห้องแล้ว!`);
  } else {
    student.pet.decorLevels[decorKey] = nextLevel;
    alert(`🎉 อัปเกรด ${decor.name} เป็น เลเวล ${nextLevel} สำเร็จ!`);
  }
  
  student.pet.happiness = Math.min(100, student.pet.happiness + 10); // Upgrade gives +10 happiness!
  
  playCoinSound();
  saveData();
  renderDashboard();
  updatePetCareModalUI();
}

function renamePet() {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  const newName = document.getElementById('pet-rename-input-field').value.trim();
  if (!newName) {
    alert('กรุณากรอกชื่อสัตว์เลี้ยง!');
    return;
  }
  
  const pet = activePetSlot === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  pet.name = newName;
  saveData();
  renderDashboard();
  updatePetCareModalUI();
  playCoinSound();
}

function buyNewEgg() {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  if (student.coins < 100) {
    alert('เหรียญทองไม่พอ! (ต้องการ 100 เหรียญ)');
    return;
  }
  
  if (student.pet.status === 'egg') {
    alert('กรุณาฟักไข่ใบแรกให้สำเร็จก่อนที่จะเพิ่มสัตว์เลี้ยงตัวที่สอง!');
    return;
  }
  
  if (student.pet2) {
    alert('คุณมีสัตว์เลี้ยงครบ 2 ตัวเต็มแล้ว!');
    return;
  }
  
  const confirmBuy = confirm(`คุณแน่ใจหรือไม่ที่จะซื้อไข่สัตว์เลี้ยงใบใหม่ราคา 100 เหรียญทอง เพื่อเลี้ยงสัตว์เลี้ยงตัวที่ 2?`);
  if (!confirmBuy) return;
  
  student.coins -= 100;
  student.pet2 = {
    status: 'egg',
    hatchProgress: 0,
    type: null,
    emoji: '🥚',
    name: 'ไข่สัตว์เลี้ยง 2',
    happiness: 100,
    level: 1,
    exp: 0,
    decorations: [],
    decorLevels: {},
    expeditionEnd: null
  };
  
  activePetSlot = 2;
  
  // Show select tabs UI
  const tabsContainer = document.getElementById('pet-selection-tabs');
  tabsContainer.style.display = 'flex';
  document.getElementById('tab-select-pet1').classList.remove('active');
  document.getElementById('tab-select-pet2').classList.add('active');
  
  // Reset wandering
  stopPetWandering();
  startPetWandering(student.id);
  
  playCoinSound();
  saveData();
  renderDashboard();
  updatePetCareModalUI();
  
  alert('ซื้อไข่สัตว์เลี้ยงตัวที่ 2 เรียบร้อยแล้ว! 🥚 เริ่มป้อนอาหารเพื่อฟักตัวได้เลย!');
}

// Pet Expedition Actions
function handlePetExpeditionAction() {
  const student = students.find(s => s.id === activePetStudentId);
  if (!student) return;
  
  const pet = activePetSlot === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  if (!pet.expeditionEnd) {
    // Start expedition
    pet.expeditionEnd = Date.now() + 60000; // 1 minute from now
    playTone(523.25, 'sine', 0.15, 0);
    playTone(659.25, 'sine', 0.15, 0.1);
    
    saveData();
    renderDashboard();
    updatePetCareModalUI();
  } else {
    // Claim Reward
    const rem = Math.max(0, Math.ceil((pet.expeditionEnd - Date.now()) / 1000));
    if (rem === 0) {
      claimExpeditionReward(student, activePetSlot);
    }
  }
}

function claimExpeditionReward(student, slotNumber = 1) {
  const pet = slotNumber === 1 ? student.pet : student.pet2;
  if (!pet) return;
  
  // Clear expedition states
  pet.expeditionEnd = null;
  
  // Calculate reward
  // Roll 70% Coins, 30% Items
  const roll = Math.random();
  let rewardTitle = '';
  
  if (roll < 0.7) {
    const coinReward = Math.floor(Math.random() * 11) + 10; // 10 to 20 coins
    student.coins += coinReward;
    rewardTitle = `เหรียญทอง 🪙 +${coinReward} เหรียญ!`;
  } else {
    // Reward random item
    const items = ['cookie', 'yarn', 'fruit', 'bear'];
    const itemKey = items[Math.floor(Math.random() * items.length)];
    const item = shopItems[itemKey];
    
    pet.happiness = Math.min(100, pet.happiness + item.happyGain);
    pet.exp += item.expGain;
    
    rewardTitle = `ไอเทม ${item.name}! (นำไปเลี้ยงดูอัตโนมัติ: ความสุข +${item.happyGain})`;
    
    // Check level up
    if (pet.exp >= 100) {
      pet.level += 1;
      pet.exp -= 100;
    }
  }
  
  playHatchSound();
  alert(`📦 คู่หูตัวที่ ${slotNumber} นำของป่ากลับมาฝาก:\nคุณได้รับ ${rewardTitle}`);
  
  saveData();
  renderDashboard();
  updatePetCareModalUI();
}

function updateExpeditionTimers() {
  students.forEach(st => {
    // Check Pet 1
    if (st.pet && st.pet.expeditionEnd) {
      updateSinglePetTimer(st, st.pet, 1);
    }
    // Check Pet 2
    if (st.pet2 && st.pet2.expeditionEnd) {
      updateSinglePetTimer(st, st.pet2, 2);
    }
  });
  
  function updateSinglePetTimer(st, pet, slotNumber) {
    const rem = Math.max(0, Math.ceil((pet.expeditionEnd - Date.now()) / 1000));
    
    // Update dashboard button
    const dbBtn = document.getElementById(`dashboard-pet-btn-${st.id}-${slotNumber}`);
    const dbEmoji = document.getElementById(`dashboard-pet-emoji-${st.id}-${slotNumber}`);
    
    if (dbBtn) {
      if (rem > 0) {
        dbBtn.textContent = `⏰ สำรวจ... (${rem}s)`;
        if (dbEmoji) {
          dbEmoji.innerHTML = `<span class="pet-emoji-avatar pet-exploring-anim" style="font-size: 3rem;">🗺️</span>`;
        }
      } else {
        dbBtn.textContent = `🎁 รับของขวัญ!`;
        if (dbEmoji) {
          dbEmoji.innerHTML = `<span class="pet-emoji-avatar" style="font-size: 3rem;">📦</span>`;
        }
      }
    }
    
    if (activePetStudentId === st.id && activePetSlot === slotNumber) {
      updatePetCareModalUI();
    }
  }
}

// Quest Board Management
function renderQuests() {
  const container = document.getElementById('quest-grid');
  container.innerHTML = '';
  
  if (quests.length === 0) {
    container.innerHTML = `<div class="no-quests">📜 ไม่มีภารกิจการบ้านที่กำลังเปิดใช้งานอยู่</div>`;
    return;
  }
  
  const sortedStudents = [...students].sort((a, b) => a.number - b.number);
  
  quests.forEach(quest => {
    const card = document.createElement('div');
    card.className = 'quest-card';
    
    let studentsHtml = '';
    sortedStudents.forEach(st => {
      const isCompleted = quest.completedBy.includes(st.id);
      const completedClass = isCompleted ? 'completed' : '';
      const checkText = isCompleted ? '✓' : '+';
      
      studentsHtml += `
        <button class="btn-quest-student ${completedClass}" 
                onclick="completeQuestForStudent(${quest.id}, ${st.id})" 
                ${isCompleted ? 'disabled' : ''}>
          ${st.name} ${checkText}
        </button>
      `;
    });
    
    card.innerHTML = `
      <button class="btn-quest-delete" onclick="deleteQuest(${quest.id})" title="ลบภารกิจ">✕</button>
      <div class="quest-info-header">
        <h4 class="quest-title">${quest.title}</h4>
        <div class="quest-rewards">
          <span class="reward-badge reward-exp">+${quest.expReward} EXP</span>
          <span class="reward-badge reward-coin">+${quest.coinReward} 🪙</span>
        </div>
      </div>
      <div class="divider" style="margin: 8px 0;"></div>
      <div class="quest-completion-title">ส่งงานแล้ว:</div>
      <div class="quest-students-list">
        ${studentsHtml}
      </div>
    `;
    container.appendChild(card);
  });
}

function completeQuestForStudent(questId, studentId) {
  const quest = quests.find(q => q.id === questId);
  const student = students.find(s => s.id === studentId);
  
  if (!quest || !student) return;
  if (quest.completedBy.includes(studentId)) return;
  
  quest.completedBy.push(studentId);
  
  student.exp += quest.expReward;
  student.coins += quest.coinReward;
  
  let levelUpped = false;
  if (student.exp >= 100) {
    student.level += 1;
    student.exp = student.exp - 100;
    levelUpped = true;
  }
  
  playCoinSound();
  saveData();
  saveQuests();
  renderDashboard();
  renderQuests();
  
  if (levelUpped) {
    setTimeout(() => {
      showLevelUpModal(student);
    }, 300);
  }
}

function addQuest(title, expReward, coinReward) {
  const newId = quests.length > 0 ? Math.max(...quests.map(q => q.id)) + 1 : 1;
  quests.push({
    id: newId,
    title: title,
    expReward: parseInt(expReward) || 10,
    coinReward: parseInt(coinReward) || 5,
    completedBy: []
  });
  saveQuests();
  renderQuests();
  playCoinSound();
}

function deleteQuest(id) {
  if (confirm('คุณครูต้องการลบภารกิจนี้ใช่หรือไม่?')) {
    quests = quests.filter(q => q.id !== id);
    saveQuests();
    renderQuests();
    playWarningSound();
  }
}

// Teacher Mode Management
function toggleTeacherMode() {
  if (isTeacherMode) {
    isTeacherMode = false;
    document.body.classList.remove('body-teacher-mode');
    document.getElementById('btn-teacher-toggle').classList.remove('active');
    document.getElementById('btn-teacher-toggle').innerHTML = '<span>⚙️</span> เปิดระบบครู';
    closePanel();
    renderDashboard(); // hide add student card
  } else {
    document.getElementById('passcode-modal').classList.add('active');
    document.getElementById('passcode-input').value = '';
    document.getElementById('passcode-input').focus();
  }
}

function verifyPasscode() {
  const input = document.getElementById('passcode-input').value;
  if (input === '1234') {
    isTeacherMode = true;
    document.body.classList.add('body-teacher-mode');
    document.getElementById('btn-teacher-toggle').classList.add('active');
    document.getElementById('btn-teacher-toggle').innerHTML = '<span>🔓</span> ปิดระบบครู';
    document.getElementById('passcode-modal').classList.remove('active');
    renderDashboard(); // show add student card
    openPanel();
  } else {
    alert('รหัสผ่านไม่ถูกต้อง! (รหัสคือ 1234)');
    document.getElementById('passcode-input').value = '';
    document.getElementById('passcode-input').focus();
  }
}

function closePasscodeModal() {
  document.getElementById('passcode-modal').classList.remove('active');
}

// Teacher Control Panel Drawer (Quests and Backups only)
function openPanel() {
  document.getElementById('teacher-panel').classList.add('active');
  resetQuestForm();
}

function closePanel() {
  document.getElementById('teacher-panel').classList.remove('active');
}

function resetQuestForm() {
  document.getElementById('quest-title-input').value = '';
  document.getElementById('quest-exp-reward').value = '20';
  document.getElementById('quest-coin-reward').value = '10';
}

function handleQuestFormSubmit(e) {
  e.preventDefault();
  const title = document.getElementById('quest-title-input').value.trim();
  const exp = document.getElementById('quest-exp-reward').value;
  const coins = document.getElementById('quest-coin-reward').value;
  
  if (!title) {
    alert('กรุณากรอกชื่อภารกิจ!');
    return;
  }
  
  addQuest(title, exp, coins);
  resetQuestForm();
}

// Backup & Restore
function downloadBackup() {
  const data = {
    title: classroomTitle,
    students: students,
    quests: quests
  };
  const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(data, null, 2));
  const dlAnchorElem = document.createElement('a');
  dlAnchorElem.setAttribute("href", dataStr);
  dlAnchorElem.setAttribute("download", `classroom_rpg_full_backup_${new Date().toISOString().slice(0,10)}.json`);
  dlAnchorElem.click();
}

function triggerImportFile() {
  document.getElementById('import-file-input').click();
}

function handleImportFile(e) {
  const file = e.target.files[0];
  if (!file) return;
  
  const reader = new FileReader();
  reader.onload = function(e) {
    try {
      const imported = JSON.parse(e.target.result);
      if (imported.students && Array.isArray(imported.students)) {
        students = imported.students;
        quests = imported.quests || [];
        if (imported.title) {
          classroomTitle = imported.title;
          localStorage.setItem('classroom_rpg_title', classroomTitle);
          updateClassroomTitleUI();
        }
        saveData();
        saveQuests();
        renderDashboard();
        renderQuests();
        alert('กู้คืนข้อมูลห้องเรียนและกระดานภารกิจสำเร็จแล้ว!');
        playLevelUpSound();
      } else if (Array.isArray(imported)) {
        students = imported;
        saveData();
        renderDashboard();
        alert('กู้คืนข้อมูลนักเรียนสำเร็จแล้ว!');
        playLevelUpSound();
      } else {
        alert('รูปแบบไฟล์ไม่ถูกต้อง!');
      }
    } catch (err) {
      alert('เกิดข้อผิดพลาดในการอ่านไฟล์!');
    }
  };
  reader.readAsText(file);
}

function resetClassroom() {
  if (confirm('คุณต้องการรีเซ็ตข้อมูลทั้งหมดกลับสู่ค่าเริ่มต้นใช่หรือไม่? (ชื่อห้องเรียนและข้อมูลนักเรียนจะกลับสู่ค่าเดิม)')) {
    students = [...defaultStudents];
    quests = [...defaultQuests];
    classroomTitle = 'ห้องเรียนนักผจญภัย ป.1';
    localStorage.removeItem('classroom_rpg_title');
    updateClassroomTitleUI();
    saveData();
    saveQuests();
    renderDashboard();
    renderQuests();
    playWarningSound();
    alert('รีเซ็ตข้อมูลทั้งหมดเรียบร้อยแล้ว!');
  }
}

function deleteStudent(id) {
  const student = students.find(s => s.id === id);
  if (!student) return;
  
  if (confirm(`คุณแน่ใจหรือไม่ที่จะลบนักเรียน "${student.name}" ออกจากห้องเรียน? ข้อมูลการผจญภัยและสัตว์เลี้ยงของนักเรียนคนนี้จะถูกลบออกทั้งหมดและไม่สามารถกู้คืนได้`)) {
    students = students.filter(s => s.id !== id);
    saveData();
    renderDashboard();
    playWarningSound();
  }
}

// RPG Guild Themes for Group Randomizer
const rpgGuilds = [
  { name: 'กิลด์สิงโตเพลิง', en: 'Flame Lions', icon: '🦁', color: '#ff5252', bg: 'linear-gradient(135deg, rgba(211, 47, 47, 0.4), rgba(183, 28, 28, 0.6))', border: '#ff5252' },
  { name: 'กิลด์อินทรีสายฟ้า', en: 'Thunder Eagles', icon: '🦅', color: '#448aff', bg: 'linear-gradient(135deg, rgba(25, 118, 210, 0.4), rgba(13, 71, 161, 0.6))', border: '#448aff' },
  { name: 'กิลด์มังกรพฤกษา', en: 'Emerald Dragons', icon: '🐉', color: '#69f0ae', bg: 'linear-gradient(135deg, rgba(56, 142, 60, 0.4), rgba(27, 94, 32, 0.6))', border: '#69f0ae' },
  { name: 'กิลด์หมาป่าเงา', en: 'Shadow Wolves', icon: '🐺', color: '#e040fb', bg: 'linear-gradient(135deg, rgba(142, 36, 170, 0.4), rgba(74, 20, 140, 0.6))', border: '#e040fb' },
  { name: 'กิลด์ยูนิคอร์นศักดิ์สิทธิ์', en: 'Holy Unicorns', icon: '🦄', color: '#ffd700', bg: 'linear-gradient(135deg, rgba(245, 127, 23, 0.4), rgba(255, 179, 0, 0.6))', border: '#ffd700' },
  { name: 'กิลด์หมีเหล็กกล้า', en: 'Iron Bears', icon: '🐻', color: '#ff6e40', bg: 'linear-gradient(135deg, rgba(230, 74, 25, 0.4), rgba(191, 54, 12, 0.6))', border: '#ff6e40' },
  { name: 'กิลด์โลมาวารี', en: 'Aqua Dolphins', icon: '🐬', color: '#18ffff', bg: 'linear-gradient(135deg, rgba(0, 151, 167, 0.4), rgba(0, 96, 100, 0.6))', border: '#18ffff' },
  { name: 'กิลด์นกฮูกปราชญ์', en: 'Wise Owls', icon: '🦉', color: '#b388ff', bg: 'linear-gradient(135deg, rgba(81, 45, 168, 0.4), rgba(49, 27, 146, 0.6))', border: '#b388ff' }
];

// Gacha Student Picker & Team Generator Logic
let gachaInterval = null;
let currentGachaWinner = null;
let gachaSelectedIds = [];
let gachaActiveTab = 'single';
let gachaTeamCount = 4;
let currentGeneratedTeams = [];

function openGachaModal() {
  if (!students || students.length === 0) {
    alert('ยังไม่มีรายชื่อนักเรียนในห้องเรียน!');
    return;
  }
  
  // Clean invalid IDs or initialize if empty
  const currentStudentIds = students.map(s => s.id);
  gachaSelectedIds = gachaSelectedIds.filter(id => currentStudentIds.includes(id));
  if (gachaSelectedIds.length === 0) {
    gachaSelectedIds = [...currentStudentIds];
  }
  
  // Set smart default team count
  if (gachaSelectedIds.length <= 4) {
    gachaTeamCount = 2;
  } else if (gachaSelectedIds.length <= 9) {
    gachaTeamCount = 3;
  } else {
    gachaTeamCount = 4;
  }
  
  renderGachaStudentList();
  switchGachaTab(gachaActiveTab);
  resetGachaModalState();
  resetTeamGachaSetup();
  document.getElementById('gacha-modal').classList.add('active');
}

function closeGachaModal() {
  if (gachaInterval) {
    clearTimeout(gachaInterval);
    gachaInterval = null;
  }
  document.getElementById('gacha-modal').classList.remove('active');
}

function switchGachaTab(tab) {
  gachaActiveTab = tab;
  
  const singleTabBtn = document.getElementById('tab-gacha-single');
  const teamsTabBtn = document.getElementById('tab-gacha-teams');
  const soloContainer = document.getElementById('gacha-solo-container');
  const teamsContainer = document.getElementById('gacha-teams-container');
  const title = document.getElementById('gacha-modal-title');
  const subtitle = document.getElementById('gacha-subtitle');
  
  if (tab === 'single') {
    if (singleTabBtn) singleTabBtn.classList.add('active');
    if (teamsTabBtn) teamsTabBtn.classList.remove('active');
    if (soloContainer) soloContainer.style.display = 'block';
    if (teamsContainer) teamsContainer.style.display = 'none';
    if (title) title.textContent = '🎰 แท่นอัญเชิญผู้โชคดี (Solo Gacha)';
    if (subtitle) subtitle.textContent = 'สุ่มนักเรียนผู้โชคดีสำหรับทำภารกิจหรือตอบคำถาม!';
    resetGachaModalState();
  } else {
    if (singleTabBtn) singleTabBtn.classList.remove('active');
    if (teamsTabBtn) teamsTabBtn.classList.add('active');
    if (soloContainer) soloContainer.style.display = 'none';
    if (teamsContainer) teamsContainer.style.display = 'block';
    if (title) title.textContent = '⚔️ สุ่มจัดกลุ่ม / ปาร์ตี้ผจญภัย (Team Gacha)';
    if (subtitle) subtitle.textContent = 'สุ่มแบ่งทีมนักเรียนเข้ากิลด์ต่าง ๆ สำหรับทำกิจกรรมกลุ่ม!';
    updateTeamConfigUI();
  }
  
  updateGachaPoolStatus();
}

function renderGachaStudentList() {
  const container = document.getElementById('gacha-student-list');
  if (!container) return;
  
  container.innerHTML = '';
  const sorted = [...students].sort((a, b) => a.number - b.number);
  
  sorted.forEach(student => {
    const isSelected = gachaSelectedIds.includes(student.id);
    const chip = document.createElement('label');
    chip.className = `gacha-chip ${isSelected ? 'selected' : ''}`;
    chip.id = `gacha-chip-${student.id}`;
    
    chip.innerHTML = `
      <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleGachaStudent(${student.id}, event)">
      <span>#${student.number} ${student.name}</span>
    `;
    
    chip.addEventListener('click', (e) => {
      if (e.target.tagName !== 'INPUT') {
        const checkbox = chip.querySelector('input');
        checkbox.checked = !checkbox.checked;
        toggleGachaStudent(student.id, e);
      }
    });
    
    container.appendChild(chip);
  });
  
  updateGachaPoolStatus();
}

function toggleGachaStudent(studentId, event) {
  if (event) event.stopPropagation();
  
  const idx = gachaSelectedIds.indexOf(studentId);
  if (idx > -1) {
    gachaSelectedIds.splice(idx, 1);
  } else {
    gachaSelectedIds.push(studentId);
  }
  
  const chip = document.getElementById(`gacha-chip-${studentId}`);
  if (chip) {
    const isSelected = gachaSelectedIds.includes(studentId);
    chip.className = `gacha-chip ${isSelected ? 'selected' : ''}`;
    const checkbox = chip.querySelector('input');
    if (checkbox) checkbox.checked = isSelected;
  }
  
  updateGachaPoolStatus();
}

function toggleAllGachaStudents(selectAll) {
  if (selectAll) {
    gachaSelectedIds = students.map(s => s.id);
  } else {
    gachaSelectedIds = [];
  }
  renderGachaStudentList();
}

function updateGachaPoolStatus() {
  const poolLabel = document.getElementById('gacha-pool-label');
  const countText = document.getElementById('gacha-student-count-text');
  const spinBtn = document.getElementById('btn-start-gacha');
  const count = gachaSelectedIds.length;
  const total = students.length;
  
  if (poolLabel) {
    poolLabel.textContent = `🎯 ผู้มีสิทธิ์เข้าร่วมสุ่ม (${count}/${total} คน):`;
  }
  
  if (countText) {
    countText.textContent = `พร้อมสุ่มจากนักเรียนที่เลือก ${count}/${total} คน`;
  }
  
  if (spinBtn) {
    if (count === 0) {
      spinBtn.disabled = true;
      spinBtn.style.opacity = '0.5';
      spinBtn.style.cursor = 'not-allowed';
      spinBtn.textContent = '❌ กรุณาเลือกนักเรียนอย่างน้อย 1 คน';
    } else {
      spinBtn.disabled = false;
      spinBtn.style.opacity = '1';
      spinBtn.style.cursor = 'pointer';
      spinBtn.textContent = `✨ เริ่มอัญเชิญผู้โชคดี! (${count} คน)`;
    }
  }
  
  updateTeamConfigUI();
}

function changeGachaTeamCount(delta) {
  setGachaTeamCount(gachaTeamCount + delta);
}

function setGachaTeamCount(count) {
  const maxTeams = Math.min(8, Math.max(2, gachaSelectedIds.length || 2));
  gachaTeamCount = Math.max(2, Math.min(maxTeams, count));
  updateTeamConfigUI();
}

function updateTeamConfigUI() {
  const displayVal = document.getElementById('gacha-team-count-val');
  const hint = document.getElementById('gacha-team-calc-hint');
  const teamSpinBtn = document.getElementById('btn-start-team-gacha');
  const selectedCount = gachaSelectedIds.length;
  
  if (displayVal) {
    displayVal.textContent = gachaTeamCount;
  }
  
  // Highlight active preset button
  document.querySelectorAll('.btn-team-preset').forEach(btn => btn.classList.remove('active'));
  const activePreset = document.getElementById(`preset-team-${gachaTeamCount}`);
  if (activePreset) activePreset.classList.add('active');
  
  // Update calculation hint
  if (hint) {
    if (selectedCount === 0) {
      hint.textContent = '⚠️ ยังไม่ได้เลือกนักเรียนเข้าร่วมจัดทีม';
      hint.style.color = '#ef5350';
    } else if (selectedCount < gachaTeamCount) {
      hint.textContent = `⚠️ นักเรียนที่เลือก (${selectedCount} คน) น้อยกว่าจำนวนกลุ่ม (${gachaTeamCount} กลุ่ม)`;
      hint.style.color = '#ffab00';
    } else {
      const minPerTeam = Math.floor(selectedCount / gachaTeamCount);
      const maxPerTeam = Math.ceil(selectedCount / gachaTeamCount);
      const avgStr = minPerTeam === maxPerTeam ? `${minPerTeam} คน` : `~${minPerTeam}-${maxPerTeam} คน`;
      hint.textContent = `👥 มีผู้เข้าร่วม ${selectedCount} คน → แบ่ง ${gachaTeamCount} กลุ่ม (เฉลี่ยกลุ่มละ ${avgStr})`;
      hint.style.color = '#ffd700';
    }
  }
  
  if (teamSpinBtn) {
    if (selectedCount < 2) {
      teamSpinBtn.disabled = true;
      teamSpinBtn.style.opacity = '0.5';
      teamSpinBtn.style.cursor = 'not-allowed';
      teamSpinBtn.textContent = '❌ กรุณาเลือกนักเรียนอย่างน้อย 2 คน';
    } else if (selectedCount < gachaTeamCount) {
      teamSpinBtn.disabled = true;
      teamSpinBtn.style.opacity = '0.5';
      teamSpinBtn.style.cursor = 'not-allowed';
      teamSpinBtn.textContent = `❌ จำนวนนักเรียนน้อยกว่า ${gachaTeamCount} กลุ่ม`;
    } else {
      teamSpinBtn.disabled = false;
      teamSpinBtn.style.opacity = '1';
      teamSpinBtn.style.cursor = 'pointer';
      teamSpinBtn.textContent = `🎲 สุ่มจัดตั้งปาร์ตี้ (${selectedCount} คน / ${gachaTeamCount} กลุ่ม)`;
    }
  }
}

function resetGachaModalState() {
  if (gachaInterval) {
    clearTimeout(gachaInterval);
    gachaInterval = null;
  }
  
  document.getElementById('gacha-idle-view').style.display = 'flex';
  document.getElementById('gacha-spin-view').style.display = 'none';
  document.getElementById('gacha-result-view').style.display = 'none';
  
  const rewardBtn = document.getElementById('btn-gacha-reward');
  if (rewardBtn) {
    rewardBtn.disabled = false;
    rewardBtn.style.opacity = '1';
    rewardBtn.textContent = '⭐ ให้รางวัล (+10 EXP, +5 🪙)';
  }
  
  updateGachaPoolStatus();
  currentGachaWinner = null;
}

function resetTeamGachaSetup() {
  const setupBox = document.getElementById('gacha-team-setup-box');
  const animView = document.getElementById('gacha-teams-anim-view');
  const resultView = document.getElementById('gacha-teams-result-view');
  
  if (setupBox) setupBox.style.display = 'flex';
  if (animView) animView.style.display = 'none';
  if (resultView) resultView.style.display = 'none';
  
  updateTeamConfigUI();
}

function startGachaSpin() {
  if (!students || students.length === 0) return;
  
  const eligiblePool = students.filter(s => gachaSelectedIds.includes(s.id));
  if (eligiblePool.length === 0) {
    alert('กรุณาเลือกนักเรียนอย่างน้อย 1 คนก่อนทำการสุ่ม!');
    return;
  }
  
  // Pick winner randomly from eligible pool
  const winnerIndex = Math.floor(Math.random() * eligiblePool.length);
  currentGachaWinner = eligiblePool[winnerIndex];
  
  document.getElementById('gacha-idle-view').style.display = 'none';
  document.getElementById('gacha-spin-view').style.display = 'flex';
  document.getElementById('gacha-result-view').style.display = 'none';
  
  const reelAvatar = document.getElementById('gacha-reel-avatar');
  const reelName = document.getElementById('gacha-reel-name');
  const reelClass = document.getElementById('gacha-reel-class');
  const spinStatus = document.getElementById('gacha-spin-status');
  const spinAura = document.getElementById('gacha-spin-aura');
  
  spinStatus.textContent = '🌀 กำลังอัญเชิญผู้พิทักษ์...';
  spinAura.className = 'gacha-spin-aura aura-blue';
  
  let currentIdx = 0;
  let speed = 50; // ms per tick
  let elapsed = 0;
  const totalDuration = 3600; // 3.6s
  
  if (gachaInterval) clearTimeout(gachaInterval);
  
  function step() {
    elapsed += speed;
    currentIdx = (currentIdx + 1) % eligiblePool.length;
    const tempStudent = eligiblePool[currentIdx];
    
    const avatarPath = tempStudent.useAnime && tempStudent.avatarAnime ? tempStudent.avatarAnime : tempStudent.avatarReal;
    reelAvatar.src = avatarPath;
    reelName.textContent = tempStudent.name;
    reelClass.textContent = `${tempStudent.class} (เลขที่ ${tempStudent.number})`;
    
    playGachaSpinFastSound();
    
    // Change aura color as tension builds up
    if (elapsed > 1800 && elapsed <= 2800) {
      spinAura.className = 'gacha-spin-aura aura-purple';
      spinStatus.textContent = '✨ วงเวทตอบรับพลังอันยิ่งใหญ่!';
      speed = 100;
    } else if (elapsed > 2800 && elapsed <= 3300) {
      spinAura.className = 'gacha-spin-aura aura-gold';
      spinStatus.textContent = '🔥 แสงสีทองส่องสว่าง... ปรากฏผู้ถูกเลือก!';
      speed = 220;
    } else if (elapsed > 3300) {
      speed = 400;
    }
    
    if (elapsed < totalDuration) {
      gachaInterval = setTimeout(step, speed);
    } else {
      gachaInterval = null;
      showGachaWinner(currentGachaWinner);
    }
  }
  
  step();
}

function showGachaWinner(student) {
  document.getElementById('gacha-spin-view').style.display = 'none';
  document.getElementById('gacha-result-view').style.display = 'flex';
  
  const avatarPath = student.useAnime && student.avatarAnime ? student.avatarAnime : student.avatarReal;
  document.getElementById('gacha-winner-avatar').src = avatarPath;
  document.getElementById('gacha-winner-number').textContent = `#${student.number}`;
  document.getElementById('gacha-winner-name').textContent = student.name;
  document.getElementById('gacha-winner-class').textContent = student.class;
  document.getElementById('gacha-winner-level').textContent = `LV ${student.level}`;
  document.getElementById('gacha-winner-coins').textContent = `🪙 ${student.coins} เหรียญ`;
  
  // Pet display string
  let petStr = 'ไม่มี';
  if (student.pet && student.pet.status !== 'egg') {
    petStr = `${student.pet.name} (Lv.${student.pet.level})`;
  } else if (student.pet && student.pet.status === 'egg') {
    petStr = 'ไข่สะสมพลัง 🥚';
  }
  document.getElementById('gacha-winner-pet').textContent = `🐾 คู่หู: ${petStr}`;
  
  playGachaRevealSound();
  startConfetti();
}

function rewardGachaWinner() {
  if (!currentGachaWinner) return;
  
  currentGachaWinner.exp += 10;
  currentGachaWinner.coins += 5;
  
  if (currentGachaWinner.exp >= 100) {
    currentGachaWinner.level += 1;
    currentGachaWinner.exp -= 100;
    playLevelUpSound();
    alert(`🎉 ${currentGachaWinner.name} เลเวลอัพเป็น LV ${currentGachaWinner.level}!`);
  } else {
    playCoinSound();
  }
  
  saveData();
  renderDashboard();
  
  const rewardBtn = document.getElementById('btn-gacha-reward');
  if (rewardBtn) {
    rewardBtn.disabled = true;
    rewardBtn.style.opacity = '0.5';
    rewardBtn.textContent = '✅ มอบรางวัลแล้ว (+10 EXP, +5 🪙)';
  }
}

// Team Gacha Spin & Distribution
function startTeamGachaSpin() {
  const eligiblePool = students.filter(s => gachaSelectedIds.includes(s.id));
  if (eligiblePool.length < gachaTeamCount) {
    alert(`กรุณาเลือกนักเรียนอย่างน้อย ${gachaTeamCount} คนสำหรับแบ่ง ${gachaTeamCount} กลุ่ม!`);
    return;
  }
  
  // Show animation state
  document.getElementById('gacha-team-setup-box').style.display = 'none';
  document.getElementById('gacha-teams-result-view').style.display = 'none';
  const animView = document.getElementById('gacha-teams-anim-view');
  animView.style.display = 'flex';
  
  // Play sound ticks
  let tickCount = 0;
  const tickInterval = setInterval(() => {
    playGachaSpinFastSound();
    tickCount++;
    if (tickCount >= 10) clearInterval(tickInterval);
  }, 120);
  
  // Shuffle eligible students using Fisher-Yates
  const shuffled = [...eligiblePool];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  // Initialize team structures
  const teams = Array.from({ length: gachaTeamCount }, (_, i) => ({
    index: i,
    guild: rpgGuilds[i % rpgGuilds.length],
    members: []
  }));
  
  // Distribute members evenly
  shuffled.forEach((student, idx) => {
    teams[idx % gachaTeamCount].members.push(student);
  });
  
  // Sort members inside each team by student number
  teams.forEach(t => {
    t.members.sort((a, b) => a.number - b.number);
  });
  
  currentGeneratedTeams = teams;
  
  setTimeout(() => {
    clearInterval(tickInterval);
    animView.style.display = 'none';
    renderGachaTeamsResult(teams);
    playGachaRevealSound();
    startConfetti();
  }, 1600);
}

function renderGachaTeamsResult(teams) {
  const resultView = document.getElementById('gacha-teams-result-view');
  const grid = document.getElementById('gacha-teams-grid');
  if (!grid || !resultView) return;
  
  grid.innerHTML = '';
  
  teams.forEach((team, teamIdx) => {
    const card = document.createElement('div');
    card.className = 'gacha-team-card';
    card.style.borderColor = team.guild.border;
    card.style.background = team.guild.bg;
    
    let membersHtml = '';
    team.members.forEach(member => {
      const avatarPath = member.useAnime && member.avatarAnime ? member.avatarAnime : member.avatarReal;
      membersHtml += `
        <div class="gacha-team-member-item">
          <img src="${avatarPath}" alt="${member.name}" class="gacha-team-member-avatar" onerror="this.src='https://placehold.co/150/1a1738/ffd700?text=Hero'">
          <span class="gacha-team-member-name">#${member.number} ${member.name}</span>
          <span class="gacha-team-member-class">${member.class}</span>
        </div>
      `;
    });
    
    card.innerHTML = `
      <div class="gacha-team-card-header">
        <div class="gacha-team-title-group">
          <span class="gacha-team-icon">${team.guild.icon}</span>
          <h4 class="gacha-team-name">${team.guild.name}</h4>
        </div>
        <span class="gacha-team-badge-count">👥 ${team.members.length} คน</span>
      </div>
      <div class="gacha-team-members-list">
        ${membersHtml}
      </div>
      <button type="button" class="btn-team-reward" id="btn-team-reward-${teamIdx}" onclick="rewardGachaTeam(${teamIdx})">
        ⭐ มอบรางวัลทีม (+5 EXP, +3 🪙)
      </button>
    `;
    
    grid.appendChild(card);
  });
  
  resultView.style.display = 'flex';
}

function rewardGachaTeam(teamIdx) {
  const team = currentGeneratedTeams[teamIdx];
  if (!team || !team.members || team.members.length === 0) return;
  
  let levelUpStudents = [];
  
  team.members.forEach(member => {
    const student = students.find(s => s.id === member.id);
    if (student) {
      student.exp += 5;
      student.coins += 3;
      if (student.exp >= 100) {
        student.level += 1;
        student.exp -= 100;
        levelUpStudents.push(student.name);
      }
    }
  });
  
  saveData();
  renderDashboard();
  
  const rewardBtn = document.getElementById(`btn-team-reward-${teamIdx}`);
  if (rewardBtn) {
    rewardBtn.disabled = true;
    rewardBtn.textContent = '✅ มอบรางวัลทีมแล้ว (+5 EXP, +3 🪙)';
  }
  
  if (levelUpStudents.length > 0) {
    playLevelUpSound();
    alert(`🎉 สมาชิกในทีมเลเวลอัพ: ${levelUpStudents.join(', ')}!`);
  } else {
    playCoinSound();
  }
}

function copyGachaTeamsToClipboard() {
  if (!currentGeneratedTeams || currentGeneratedTeams.length === 0) return;
  
  let text = `🏰 รายชื่อการจัดกลุ่ม/ปาร์ตี้ ${classroomTitle} (${currentGeneratedTeams.length} กลุ่ม)\n`;
  text += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;
  
  currentGeneratedTeams.forEach((team, idx) => {
    text += `${team.guild.icon} ${team.guild.name} (จำนวน ${team.members.length} คน):\n`;
    team.members.forEach((m, mIdx) => {
      text += `  ${mIdx + 1}. #${m.number} ${m.name} (${m.class})\n`;
    });
    text += `\n`;
  });
  
  navigator.clipboard.writeText(text).then(() => {
    playCoinSound();
    alert('📋 คัดลอกรายชื่อทีมทั้งหมดลงในคลิปบอร์ดแล้ว! สามารถนำไปวางใน Line, Word หรือชีตสรุปได้เลยครับ');
  }).catch(err => {
    console.error('Clipboard copy failed:', err);
    alert('❌ ไม่สามารถคัดลอกลงคลิปบอร์ดได้อัตโนมัติ');
  });
}

// Setup Event Listeners
function setupEventListeners() {
  document.getElementById('btn-teacher-toggle').addEventListener('click', toggleTeacherMode);
  document.getElementById('passcode-submit').addEventListener('click', verifyPasscode);
  document.getElementById('passcode-input').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') verifyPasscode();
  });
  document.getElementById('passcode-close').addEventListener('click', closePasscodeModal);
  document.getElementById('btn-close-panel').addEventListener('click', closePanel);
  
  // Edit form submit
  document.getElementById('edit-student-form').addEventListener('submit', handleEditStudentFormSubmit);
  
  // Quest form
  document.getElementById('teacher-quest-form').addEventListener('submit', handleQuestFormSubmit);
  
  document.getElementById('btn-backup').addEventListener('click', downloadBackup);
  document.getElementById('btn-import').addEventListener('click', triggerImportFile);
  document.getElementById('import-file-input').addEventListener('change', handleImportFile);
  document.getElementById('btn-reset-all').addEventListener('click', resetClassroom);
}

// Run app
window.onload = init;
window.closeLevelUpModal = closeLevelUpModal;
window.feedEgg = feedEgg;
window.openPetCare = openPetCare;
window.switchActivePetSlot = switchActivePetSlot;
window.closePetCareModal = closePetCareModal;
window.buyPetItem = buyPetItem;
window.buyDecorItem = buyDecorItem;
window.buyNewEgg = buyNewEgg;
window.renamePet = renamePet;
window.handlePetExpeditionAction = handlePetExpeditionAction;
window.switchShopTab = switchShopTab;
window.completeQuestForStudent = completeQuestForStudent;
window.deleteQuest = deleteQuest;
window.openEditStudentModal = openEditStudentModal;
window.closeEditStudentModal = closeEditStudentModal;
window.triggerEditAvatarUpload = triggerEditAvatarUpload;
window.handleEditAvatarUpload = handleEditAvatarUpload;
window.setPresetAvatar = setPresetAvatar;
window.deleteStudent = deleteStudent;
window.openGachaModal = openGachaModal;
window.closeGachaModal = closeGachaModal;
window.startGachaSpin = startGachaSpin;
window.resetGachaModalState = resetGachaModalState;
window.rewardGachaWinner = rewardGachaWinner;
window.toggleAllGachaStudents = toggleAllGachaStudents;
window.toggleGachaStudent = toggleGachaStudent;
window.switchGachaTab = switchGachaTab;
window.changeGachaTeamCount = changeGachaTeamCount;
window.setGachaTeamCount = setGachaTeamCount;
window.startTeamGachaSpin = startTeamGachaSpin;
window.resetTeamGachaSetup = resetTeamGachaSetup;
window.rewardGachaTeam = rewardGachaTeam;
window.copyGachaTeamsToClipboard = copyGachaTeamsToClipboard;
window.saveClassroomTitle = saveClassroomTitle;
window.generateDefaultAvatar = generateDefaultAvatar;
