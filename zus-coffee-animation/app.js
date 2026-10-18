/**
 * ZUS COFFEE | Interactive JavaScript Animation Website
 * Pure Vanilla JavaScript: 3D Tilt, Canvas Particle Physics, Web Audio Synthesizer,
 * Dynamic Flavor Radar, and Beverage Customizer.
 */

// ============================================================================
// 1. DATA DEFINITIONS FOR 4 SIGNATURE DRINKS
// ============================================================================
const DRINK_DATABASE = {
  'thai-tea': {
    id: 'thai-tea',
    title: 'THAI TEA LATTE',
    thaiTitle: 'ชาไทยลาเต้พรีเมียม สูตรเข้มข้นกลมกล่อม',
    category: 'Crafted Tea & Milk',
    calories: '185 kcal',
    price: 85,
    subtitle: 'CRAFTED SPECIALTY',
    description: 'ชาไทยรสเข้มข้นสกัดพิเศษ ผสานนมสดหอมมันหวานกำลังดี ตกแต่งด้วยกลิ่นอายส้มสดชื่นและใบชาซีลอนคั่วหอม อร่อยสดชื่นแบบพรีเมียมในทุกหยด',
    tags: ['Bold Ceylon Tea', 'Velvety Condensed Milk', 'Citrus Peel Note'],
    imgSrc: 'assets/cup_thai_tea.png',
    cutoutSrc: 'assets/cup_thai_tea_cutout.png',
    theme: {
      primary: '#e65c00',
      secondary: '#f9a03f',
      glow: 'rgba(230, 92, 0, 0.35)',
      particleColors: ['#ff9f1c', '#f77f00', '#d62828', '#ffe49e'],
      particleType: 'tea-amber'
    },
    radar: {
      labels: ['Tea Boldness', 'Creaminess', 'Sweetness', 'Aroma', 'Freshness'],
      values: [95, 88, 75, 92, 60]
    }
  },
  'strawberry': {
    id: 'strawberry',
    title: 'STRAWBERRY CREAM',
    thaiTitle: 'สตรอว์เบอร์รีครีมละมุน ซอสเบอร์รีโฮมเมด',
    category: 'Fruity Sweet Frappe',
    calories: '210 kcal',
    price: 95,
    subtitle: 'VELVET INDULGENCE',
    description: 'สตรอว์เบอร์รีฉ่ำสดผสานนมสดและวิปครีมเนื้อนุ่มละมุน โรยด้วยสตรอว์เบอร์รีครัมเบิลกรุบกรอบ รสชาติเปรี้ยวหวานลงตัว ให้ความสดชื่นราวกับฤดูร้อน',
    tags: ['Fresh Berry Purée', 'Sweet Cream Cloud', 'Crispy Crumbles'],
    imgSrc: 'assets/cup_strawberry.png',
    cutoutSrc: 'assets/cup_strawberry_cutout.png',
    theme: {
      primary: '#e63946',
      secondary: '#ff758f',
      glow: 'rgba(230, 57, 70, 0.35)',
      particleColors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff'],
      particleType: 'berry-cream'
    },
    radar: {
      labels: ['Berry Sweet', 'Creaminess', 'Tartness', 'Aroma', 'Texture'],
      values: [85, 96, 68, 90, 85]
    }
  },
  'mint-lime': {
    id: 'mint-lime',
    title: 'MINT LIME SODA',
    thaiTitle: 'มิ้นต์มะนาวโซดา ปลุกพลังความซ่าสดชื่น',
    category: 'Sparkling Mineral Refresher',
    calories: '95 kcal',
    price: 80,
    subtitle: 'ULTRA REFRESHING',
    description: 'ใบสะระแหน่บดสด ผสานน้ำมะนาวแท้คั้นสดและสปาร์กลิ้งโซดาสุดซ่า เสิร์ฟพร้อมน้ำแข็งคริสตัลใส ให้ความสดชื่นตื่นตัว คลายร้อนได้ทันที',
    tags: ['Garden Fresh Mint', 'Zesty Key Lime', 'Sparkling Mineral Soda'],
    imgSrc: 'assets/cup_mint_lime.png',
    cutoutSrc: 'assets/cup_mint_lime_cutout.png',
    theme: {
      primary: '#00b488',
      secondary: '#2ec4b6',
      glow: 'rgba(0, 180, 136, 0.35)',
      particleColors: ['#06d6a0', '#2ec4b6', '#a7f3d0', '#ffffff'],
      particleType: 'fizzy-bubbles'
    },
    radar: {
      labels: ['Carbonation', 'Lime Acidity', 'Mint Cool', 'Crispness', 'Sweetness'],
      values: [100, 92, 95, 98, 45]
    }
  },
  'blueberry': {
    id: 'blueberry',
    title: 'BLUEBERRY LEMON SODA',
    thaiTitle: 'บลูเบอร์รีเลมอนโซดา ระเบิดสีสันกาแล็กซี',
    category: 'Galaxy Sparkling Fizz',
    calories: '110 kcal',
    price: 90,
    subtitle: 'COSMIC REFRESHMENT',
    description: 'ซอสบลูเบอร์รีป่าเข้มข้น เลเยอร์ตัดกับเลมอนคั้นสดและโซดาซ่าสะใจ ไล่เฉดสีม่วงครามกาแล็กซีสุดไอคอนิก สดชื่น เปรี้ยวหวาน มีชีวิตชีวา',
    tags: ['Wild Blueberry Burst', 'Sun Lemon Twist', 'Electric Purple Fizz'],
    imgSrc: 'assets/cup_blueberry_lemon.png',
    cutoutSrc: 'assets/cup_blueberry_lemon_cutout.png',
    theme: {
      primary: '#4361ee',
      secondary: '#7209b7',
      glow: 'rgba(67, 97, 238, 0.35)',
      particleColors: ['#4361ee', '#7209b7', '#b5179e', '#4cc9f0'],
      particleType: 'galaxy-fizz'
    },
    radar: {
      labels: ['Berry Depth', 'Lemon Fizz', 'Sweet Balance', 'Color Visual', 'Tangy Note'],
      values: [92, 98, 65, 100, 88]
    }
  }
};

// ============================================================================
// 2. STATE MANAGEMENT
// ============================================================================
const state = {
  activeDrinkId: 'thai-tea',
  isAudioEnabled: false,
  cart: [],
  radarCurrentValues: [0, 0, 0, 0, 0],
  radarTargetValues: [95, 88, 75, 92, 60],
  radarLabels: ['Tea Boldness', 'Creaminess', 'Sweetness', 'Aroma', 'Freshness']
};

// ============================================================================
// 3. SYNTHESIZED WEB AUDIO ENGINE (Pure Code, No External Audio Files)
// ============================================================================
class SensoryAudioEngine {
  constructor() {
    this.ctx = null;
    this.initialized = false;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      this.ctx = new AudioCtx();
      this.initialized = true;
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Sparkling Soda Fizz Sound
  playSodaFizz() {
    if (!state.isAudioEnabled) return;
    this.init();

    const bufferSize = this.ctx.sampleRate * 0.45; // 450ms
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);

    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1; // White noise
    }

    const noiseNode = this.ctx.createBufferSource();
    noiseNode.buffer = buffer;

    // Highpass filter for fizz
    const filter = this.ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.setValueAtTime(3200, this.ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(1800, this.ctx.currentTime + 0.4);

    // Gain envelope
    const gainNode = this.ctx.createGain();
    gainNode.gain.setValueAtTime(0.01, this.ctx.currentTime);
    gainNode.gain.linearRampToValueAtTime(0.2, this.ctx.currentTime + 0.05);
    gainNode.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.42);

    noiseNode.connect(filter);
    filter.connect(gainNode);
    gainNode.connect(this.ctx.destination);

    noiseNode.start();
    noiseNode.stop(this.ctx.currentTime + 0.45);
  }

  // Ice Cube Clink Chime Sound
  playIceClink() {
    if (!state.isAudioEnabled) return;
    this.init();

    const frequencies = [2400, 3800, 5200];
    const now = this.ctx.currentTime;

    frequencies.forEach((freq, idx) => {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq + (Math.random() * 80 - 40), now);

      gain.gain.setValueAtTime(0, now);
      gain.gain.linearRampToValueAtTime(0.12 / (idx + 1), now + 0.005);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.35 + (idx * 0.05));

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start(now);
      osc.stop(now + 0.45);
    });
  }

  // Liquid Splash Swish
  playLiquidSplash() {
    if (!state.isAudioEnabled) return;
    this.init();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(140, now);
    osc.frequency.exponentialRampToValueAtTime(420, now + 0.15);
    osc.frequency.exponentialRampToValueAtTime(90, now + 0.35);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(600, now);

    gain.gain.setValueAtTime(0.01, now);
    gain.gain.linearRampToValueAtTime(0.18, now + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.38);
  }

  // Clean UI Click Pop
  playClick() {
    if (!state.isAudioEnabled) return;
    this.init();

    const now = this.ctx.currentTime;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, now);
    osc.frequency.exponentialRampToValueAtTime(1200, now + 0.06);

    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.07);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start(now);
    osc.stop(now + 0.08);
  }
}

const audio = new SensoryAudioEngine();

// ============================================================================
// 4. CANVAS LIQUID & PARTICLE PHYSICS ENGINE
// ============================================================================
class ParticleEngine {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.mouse = { x: -1000, y: -1000, isDown: false, speedX: 0, speedY: 0 };
    this.lastMouse = { x: 0, y: 0 };
    this.ripples = [];

    this.resize();
    window.addEventListener('resize', () => this.resize());
    this.setupMouseEvents();
    this.populate();
    this.animate();
  }

  resize() {
    this.width = this.canvas.width = window.innerWidth;
    this.height = this.canvas.height = window.innerHeight;
  }

  setupMouseEvents() {
    window.addEventListener('mousemove', (e) => {
      this.mouse.speedX = e.clientX - this.lastMouse.x;
      this.mouse.speedY = e.clientY - this.lastMouse.y;
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
      this.lastMouse.x = e.clientX;
      this.lastMouse.y = e.clientY;

      // Subtle bubble trail on movement
      if (Math.hypot(this.mouse.speedX, this.mouse.speedY) > 8 && Math.random() < 0.25) {
        this.addParticle(this.mouse.x, this.mouse.y, true);
      }
    });

    window.addEventListener('click', (e) => {
      this.createBurst(e.clientX, e.clientY);
    });
  }

  createBurst(x, y) {
    audio.playSodaFizz();
    audio.playIceClink();

    // Add ripple
    this.ripples.push({
      x: x,
      y: y,
      radius: 5,
      maxRadius: 180,
      alpha: 0.6,
      color: DRINK_DATABASE[state.activeDrinkId].theme.primary
    });

    // Add burst particles
    for (let i = 0; i < 16; i++) {
      const angle = (Math.PI * 2 * i) / 16;
      const speed = Math.random() * 6 + 2;
      this.particles.push({
        x: x,
        y: y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 1.5,
        radius: Math.random() * 6 + 3,
        color: this.getRandomDrinkColor(),
        alpha: 0.85,
        life: 1,
        decay: Math.random() * 0.02 + 0.015,
        type: 'spark'
      });
    }
  }

  getRandomDrinkColor() {
    const colors = DRINK_DATABASE[state.activeDrinkId].theme.particleColors;
    return colors[Math.floor(Math.random() * colors.length)];
  }

  populate() {
    this.particles = [];
    const count = window.innerWidth < 768 ? 35 : 65;
    for (let i = 0; i < count; i++) {
      this.addParticle();
    }
  }

  addParticle(x = null, y = null, isInteractive = false) {
    const activeDrink = DRINK_DATABASE[state.activeDrinkId];
    const isFizzy = activeDrink.theme.particleType.includes('fizz') || activeDrink.theme.particleType.includes('bubbles');

    this.particles.push({
      x: x !== null ? x : Math.random() * this.width,
      y: y !== null ? y : Math.random() * this.height,
      vx: (Math.random() - 0.5) * (isInteractive ? 4 : 1.2),
      vy: isFizzy ? -(Math.random() * 1.8 + 0.8) : (Math.random() * 0.8 - 0.4),
      radius: Math.random() * (isFizzy ? 8 : 12) + 3,
      baseRadius: Math.random() * 6 + 4,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: Math.random() * 0.05 + 0.02,
      alpha: Math.random() * 0.5 + 0.25,
      color: this.getRandomDrinkColor(),
      life: 1,
      decay: isInteractive ? Math.random() * 0.03 + 0.01 : 0,
      type: isInteractive ? 'interactive' : 'ambient'
    });
  }

  updateDrinkTheme() {
    this.particles.forEach(p => {
      p.color = this.getRandomDrinkColor();
    });
  }

  animate() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw Expanding Ripples
    for (let i = this.ripples.length - 1; i >= 0; i--) {
      const r = this.ripples[i];
      r.radius += 4;
      r.alpha -= 0.015;

      this.ctx.beginPath();
      this.ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
      this.ctx.strokeStyle = r.color;
      this.ctx.lineWidth = 2;
      this.ctx.globalAlpha = Math.max(0, r.alpha);
      this.ctx.stroke();

      if (r.alpha <= 0 || r.radius >= r.maxRadius) {
        this.ripples.splice(i, 1);
      }
    }

    // 2. Update and Draw Particles
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];

      // Interactive Decay
      if (p.decay > 0) {
        p.life -= p.decay;
        p.alpha = p.life;
        if (p.life <= 0) {
          this.particles.splice(i, 1);
          continue;
        }
      }

      // Wobble oscillation
      p.wobble += p.wobbleSpeed;
      const wobbleOffsetX = Math.sin(p.wobble) * 0.9;

      // Mouse Proximity Physics (Gentle push)
      const dx = this.mouse.x - p.x;
      const dy = this.mouse.y - p.y;
      const dist = Math.hypot(dx, dy);
      if (dist < 120 && dist > 0) {
        const force = (120 - dist) / 120;
        p.x -= (dx / dist) * force * 3;
        p.y -= (dy / dist) * force * 3;
      }

      p.x += p.vx + wobbleOffsetX;
      p.y += p.vy;

      // Wrap-around screen bounds
      if (p.y < -30) p.y = this.height + 20;
      if (p.y > this.height + 30) p.y = -20;
      if (p.x < -30) p.x = this.width + 20;
      if (p.x > this.width + 30) p.x = -20;

      // Draw particle (bubble with glass highlight)
      this.ctx.save();
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;

      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fill();

      // Specular highlight dot for fizzy carbonation bubbles
      this.ctx.beginPath();
      this.ctx.arc(p.x - p.radius * 0.3, p.y - p.radius * 0.3, p.radius * 0.28, 0, Math.PI * 2);
      this.ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
      this.ctx.fill();

      this.ctx.restore();
    }

    requestAnimationFrame(() => this.animate());
  }
}

// ============================================================================
// 5. 3D PARALLAX TILT ENGINE (Smooth Lerp + Specular Sheen)
// ============================================================================
class ParallaxTiltEngine {
  constructor() {
    this.stage = document.getElementById('stage3D');
    this.cupCard = document.getElementById('cupCard');
    this.cupImg = document.getElementById('activeCupImg');
    this.splashAura = document.getElementById('splashAura');
    this.cupSheen = document.querySelector('.cup-sheen');

    this.bounds = null;
    this.targetRotateX = 0;
    this.targetRotateY = 0;
    this.currentRotateX = 0;
    this.currentRotateY = 0;
    this.lerpFactor = 0.08;

    this.isHovering = false;
    this.init();
  }

  init() {
    if (!this.stage) return;

    this.updateBounds();
    window.addEventListener('resize', () => this.updateBounds());

    this.stage.addEventListener('mouseenter', () => {
      this.isHovering = true;
      audio.playLiquidSplash();
    });

    this.stage.addEventListener('mousemove', (e) => {
      if (!this.bounds) this.updateBounds();
      const x = e.clientX - this.bounds.left;
      const y = e.clientY - this.bounds.top;

      const normX = (x / this.bounds.width) * 2 - 1; // -1 to 1
      const normY = (y / this.bounds.height) * 2 - 1;

      // 3D rotation angles
      this.targetRotateX = -normY * 18; // Max 18 deg
      this.targetRotateY = normX * 18;

      // Dynamic specular sheen reflection
      const sheenX = ((normX + 1) / 2) * 100;
      const sheenY = ((normY + 1) / 2) * 100;
      if (this.cupSheen) {
        this.cupSheen.style.background = `radial-gradient(circle at ${sheenX}% ${sheenY}%, rgba(255,255,255,0.6) 0%, transparent 60%)`;
      }
    });

    this.stage.addEventListener('mouseleave', () => {
      this.isHovering = false;
      this.targetRotateX = 0;
      this.targetRotateY = 0;
    });

    // Cup click event: bounce + audio
    this.cupCard.addEventListener('click', () => {
      this.triggerCupBounce();
    });

    // Mobile Gyroscope Support
    if (window.DeviceOrientationEvent) {
      window.addEventListener('deviceorientation', (e) => {
        if (e.gamma !== null && e.beta !== null) {
          const gamma = Math.min(Math.max(e.gamma, -30), 30); // Left/Right
          const beta = Math.min(Math.max(e.beta - 45, -30), 30); // Up/Down
          this.targetRotateY = (gamma / 30) * 16;
          this.targetRotateX = (-beta / 30) * 16;
        }
      });
    }

    this.renderLoop();
  }

  updateBounds() {
    this.bounds = this.stage.getBoundingClientRect();
  }

  triggerCupBounce() {
    audio.playIceClink();
    audio.playSodaFizz();

    this.cupImg.style.transition = 'transform 0.15s cubic-bezier(0.16, 1, 0.3, 1)';
    this.cupImg.style.transform = 'scale(0.92) rotate(-2deg)';

    setTimeout(() => {
      this.cupImg.style.transition = 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)';
      this.cupImg.style.transform = 'scale(1.08) rotate(2deg)';
    }, 150);

    setTimeout(() => {
      this.cupImg.style.transition = '';
      this.cupImg.style.transform = '';
    }, 550);
  }

  renderLoop() {
    // Lerp smoothing
    this.currentRotateX += (this.targetRotateX - this.currentRotateX) * this.lerpFactor;
    this.currentRotateY += (this.targetRotateY - this.currentRotateY) * this.lerpFactor;

    if (this.cupCard) {
      this.cupCard.style.transform = `perspective(1000px) rotateX(${this.currentRotateX.toFixed(2)}deg) rotateY(${this.currentRotateY.toFixed(2)}deg)`;
    }

    if (this.splashAura) {
      // Inverse parallax for depth
      const auraX = -this.currentRotateY * 1.5;
      const auraY = -this.currentRotateX * 1.5;
      this.splashAura.style.transform = `translate(${auraX.toFixed(1)}px, ${auraY.toFixed(1)}px)`;
    }

    requestAnimationFrame(() => this.renderLoop());
  }
}

// ============================================================================
// 6. DYNAMIC SENSORY RADAR CHART
// ============================================================================
class SensoryRadarChart {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext('2d');
    this.width = this.canvas.width;
    this.height = this.canvas.height;
    this.centerX = this.width / 2;
    this.centerY = this.height / 2;
    this.radius = 52;
    this.numAxes = 5;

    this.animating = false;
    this.render();
  }

  update(targetValues, labels, themeColor) {
    state.radarTargetValues = [...targetValues];
    state.radarLabels = [...labels];
    this.themeColor = themeColor;

    if (!this.animating) {
      this.animating = true;
      this.animateTransition();
    }
  }

  animateTransition() {
    let completed = true;
    for (let i = 0; i < state.radarCurrentValues.length; i++) {
      const diff = state.radarTargetValues[i] - state.radarCurrentValues[i];
      if (Math.abs(diff) > 0.5) {
        state.radarCurrentValues[i] += diff * 0.12;
        completed = false;
      } else {
        state.radarCurrentValues[i] = state.radarTargetValues[i];
      }
    }

    this.render();

    if (!completed) {
      requestAnimationFrame(() => this.animateTransition());
    } else {
      this.animating = false;
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    // 1. Draw web grid rings
    const rings = 3;
    for (let r = 1; r <= rings; r++) {
      const currentRadius = (this.radius / rings) * r;
      this.ctx.beginPath();
      for (let i = 0; i < this.numAxes; i++) {
        const angle = (Math.PI * 2 / this.numAxes) * i - Math.PI / 2;
        const x = this.centerX + Math.cos(angle) * currentRadius;
        const y = this.centerY + Math.sin(angle) * currentRadius;
        if (i === 0) this.ctx.moveTo(x, y);
        else this.ctx.lineTo(x, y);
      }
      this.ctx.closePath();
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.08)';
      this.ctx.lineWidth = 1;
      this.ctx.stroke();
    }

    // 2. Draw axis lines
    for (let i = 0; i < this.numAxes; i++) {
      const angle = (Math.PI * 2 / this.numAxes) * i - Math.PI / 2;
      const x = this.centerX + Math.cos(angle) * this.radius;
      const y = this.centerY + Math.sin(angle) * this.radius;

      this.ctx.beginPath();
      this.ctx.moveTo(this.centerX, this.centerY);
      this.ctx.lineTo(x, y);
      this.ctx.strokeStyle = 'rgba(0, 0, 0, 0.06)';
      this.ctx.stroke();

      // Axis label abbreviations
      const labelDist = this.radius + 14;
      const lx = this.centerX + Math.cos(angle) * labelDist;
      const ly = this.centerY + Math.sin(angle) * labelDist;
      this.ctx.font = '9px "Plus Jakarta Sans", sans-serif';
      this.ctx.fillStyle = '#64748b';
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';
      const shortLabel = state.radarLabels[i] ? state.radarLabels[i].split(' ')[0] : '';
      this.ctx.fillText(shortLabel, lx, ly);
    }

    // 3. Draw radar data polygon
    this.ctx.beginPath();
    for (let i = 0; i < this.numAxes; i++) {
      const angle = (Math.PI * 2 / this.numAxes) * i - Math.PI / 2;
      const val = (state.radarCurrentValues[i] || 0) / 100;
      const x = this.centerX + Math.cos(angle) * (this.radius * val);
      const y = this.centerY + Math.sin(angle) * (this.radius * val);
      if (i === 0) this.ctx.moveTo(x, y);
      else this.ctx.lineTo(x, y);
    }
    this.ctx.closePath();

    const activeDrink = DRINK_DATABASE[state.activeDrinkId];
    this.ctx.fillStyle = activeDrink.theme.glow;
    this.ctx.fill();
    this.ctx.strokeStyle = activeDrink.theme.primary;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();

    // 4. Draw vertex dots
    for (let i = 0; i < this.numAxes; i++) {
      const angle = (Math.PI * 2 / this.numAxes) * i - Math.PI / 2;
      const val = (state.radarCurrentValues[i] || 0) / 100;
      const x = this.centerX + Math.cos(angle) * (this.radius * val);
      const y = this.centerY + Math.sin(angle) * (this.radius * val);

      this.ctx.beginPath();
      this.ctx.arc(x, y, 3, 0, Math.PI * 2);
      this.ctx.fillStyle = activeDrink.theme.primary;
      this.ctx.fill();
    }
  }
}

// ============================================================================
// 7. DRINK SWITCHER CONTROLLER
// ============================================================================
function switchDrink(drinkId, triggerAudio = true) {
  if (!DRINK_DATABASE[drinkId]) return;

  const prevId = state.activeDrinkId;
  state.activeDrinkId = drinkId;
  const drink = DRINK_DATABASE[drinkId];

  if (triggerAudio) {
    audio.playLiquidSplash();
    audio.playSodaFizz();
  }

  // Update Body Theme Attribute
  document.body.setAttribute('data-drink', drinkId);

  // Update Dock items
  document.querySelectorAll('.dock-item').forEach(item => {
    item.classList.toggle('active', item.dataset.id === drinkId);
  });

  // Animated Cup Image Change
  const cupImg = document.getElementById('activeCupImg');
  if (cupImg) {
    cupImg.style.opacity = '0';
    cupImg.style.transform = 'translateY(20px) scale(0.9)';

    setTimeout(() => {
      cupImg.src = drink.imgSrc;
      cupImg.style.opacity = '1';
      cupImg.style.transform = 'translateY(0) scale(1)';
    }, 200);
  }

  // Update Typography with smooth fade
  const elements = {
    title: document.getElementById('drinkTitle'),
    thai: document.getElementById('drinkThaiTitle'),
    sub: document.getElementById('drinkSubtitle'),
    desc: document.getElementById('drinkDescription'),
    category: document.getElementById('drinkCategory'),
    cal: document.getElementById('drinkCalories'),
    price: document.getElementById('drinkPrice')
  };

  if (elements.title) elements.title.innerText = drink.title;
  if (elements.thai) elements.thai.innerText = drink.thaiTitle;
  if (elements.sub) elements.sub.innerText = drink.subtitle;
  if (elements.desc) elements.desc.innerText = drink.description;
  if (elements.category) elements.category.innerText = drink.category;
  if (elements.cal) elements.cal.innerText = drink.calories;
  if (elements.price) elements.price.innerText = drink.price;

  // Update Tags
  const tagsContainer = document.getElementById('flavorTags');
  if (tagsContainer) {
    tagsContainer.innerHTML = drink.tags.map(t => `<span class="flavor-tag">${t}</span>`).join('');
  }

  // Update Radar Chart
  if (radarChart) {
    radarChart.update(drink.radar.values, drink.radar.labels, drink.theme.primary);
  }

  // Update Particles Theme
  if (particleEngine) {
    particleEngine.updateDrinkTheme();
  }
}

// ============================================================================
// 8. TOAST NOTIFICATION HELPER
// ============================================================================
function showToast(message, icon = '✨') {
  const toast = document.getElementById('toastNotification');
  const text = document.getElementById('toastText');
  const iconEl = toast.querySelector('.toast-icon');

  if (!toast || !text) return;
  text.innerText = message;
  if (iconEl) iconEl.innerText = icon;

  toast.classList.remove('hidden');

  setTimeout(() => {
    toast.classList.add('hidden');
  }, 2600);
}

// ============================================================================
// 9. INTERACTIVE CUSTOMIZER & CART SYSTEM
// ============================================================================
class CustomizerManager {
  constructor() {
    this.modal = document.getElementById('customizerModal');
    this.cartDrawer = document.getElementById('cartDrawer');
    this.btnCustomize = document.getElementById('btnCustomize');
    this.btnQuickAdd = document.getElementById('btnQuickAdd');
    this.btnCloseModal = document.getElementById('btnCloseModal');
    this.btnCancelModal = document.getElementById('btnCancelModal');
    this.btnConfirmCustom = document.getElementById('btnConfirmCustom');
    this.cartBtn = document.getElementById('cartBtn');
    this.btnCloseCart = document.getElementById('btnCloseCart');
    this.cartCountBadge = document.getElementById('cartCount');
    this.cartItemsList = document.getElementById('cartItemsList');
    this.cartGrandTotal = document.getElementById('cartGrandTotal');
    this.btnCheckout = document.getElementById('btnCheckout');

    // Customizer form controls
    this.iceLabel = document.getElementById('iceLabel');
    this.sweetLabel = document.getElementById('sweetLabel');
    this.basePriceDisplay = document.getElementById('basePriceDisplay');
    this.toppingsPriceDisplay = document.getElementById('toppingsPriceDisplay');
    this.customTotalPrice = document.getElementById('customTotalPrice');

    this.selectedIce = 'normal-ice';
    this.selectedSweet = '100';
    this.selectedToppings = [];

    this.init();
  }

  init() {
    // Open Customizer Modal
    if (this.btnCustomize) {
      this.btnCustomize.addEventListener('click', () => this.openModal());
    }

    // Quick Add
    if (this.btnQuickAdd) {
      this.btnQuickAdd.addEventListener('click', () => {
        const drink = DRINK_DATABASE[state.activeDrinkId];
        this.addToCart({
          drinkId: drink.id,
          name: drink.title,
          thaiName: drink.thaiTitle,
          price: drink.price,
          img: drink.imgSrc,
          ice: 'Normal Ice (100%)',
          sweet: '100% Sweet',
          toppings: []
        });
      });
    }

    // Modal Close
    [this.btnCloseModal, this.btnCancelModal].forEach(btn => {
      if (btn) btn.addEventListener('click', () => this.closeModal());
    });

    // Ice Level Chips
    document.querySelectorAll('#iceOptions .chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('#iceOptions .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedIce = chip.dataset.val;
        this.iceLabel.innerText = chip.innerText;
        audio.playIceClink();
      });
    });

    // Sweetness Chips
    document.querySelectorAll('#sweetOptions .chip').forEach(chip => {
      chip.addEventListener('click', (e) => {
        document.querySelectorAll('#sweetOptions .chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        this.selectedSweet = chip.dataset.val;
        this.sweetLabel.innerText = chip.innerText;
        audio.playClick();
      });
    });

    // Toppings Checkboxes
    document.querySelectorAll('#toppingsList input[type="checkbox"]').forEach(box => {
      box.addEventListener('change', () => {
        audio.playClick();
        this.calculatePrice();
      });
    });

    // Confirm Customization
    if (this.btnConfirmCustom) {
      this.btnConfirmCustom.addEventListener('click', () => {
        const drink = DRINK_DATABASE[state.activeDrinkId];
        const toppingsChecked = Array.from(document.querySelectorAll('#toppingsList input:checked')).map(cb => ({
          name: cb.closest('.topping-item').querySelector('.top-name').innerText,
          price: parseInt(cb.dataset.price, 10)
        }));

        const finalPrice = drink.price + toppingsChecked.reduce((sum, t) => sum + t.price, 0);

        this.addToCart({
          drinkId: drink.id,
          name: drink.title,
          thaiName: drink.thaiTitle,
          price: finalPrice,
          img: drink.imgSrc,
          ice: this.iceLabel.innerText,
          sweet: this.sweetLabel.innerText,
          toppings: toppingsChecked.map(t => t.name)
        });

        this.closeModal();
      });
    }

    // Cart Drawer Toggle
    if (this.cartBtn) {
      this.cartBtn.addEventListener('click', () => {
        audio.playClick();
        this.cartDrawer.classList.remove('hidden');
      });
    }

    if (this.btnCloseCart) {
      this.btnCloseCart.addEventListener('click', () => {
        this.cartDrawer.classList.add('hidden');
      });
    }

    if (this.btnCheckout) {
      this.btnCheckout.addEventListener('click', () => {
        if (state.cart.length === 0) {
          showToast('ไม่มีรายการในตะกร้า กรุณาเลือกเครื่องดื่มก่อน', '⚠️');
          return;
        }
        audio.playIceClink();
        audio.playSodaFizz();
        showToast('กำลังส่งคำสั่งซื้อไปยัง ZUS Coffee App... ขอบคุณครับ!', '☕');
        state.cart = [];
        this.updateCartUI();
        setTimeout(() => {
          this.cartDrawer.classList.add('hidden');
        }, 1200);
      });
    }
  }

  openModal() {
    audio.playClick();
    const drink = DRINK_DATABASE[state.activeDrinkId];
    document.getElementById('customModalDrinkTitle').innerText = `ปรับแต่ง ${drink.title}`;
    this.calculatePrice();
    this.modal.classList.remove('hidden');
  }

  closeModal() {
    this.modal.classList.add('hidden');
  }

  calculatePrice() {
    const drink = DRINK_DATABASE[state.activeDrinkId];
    const checked = Array.from(document.querySelectorAll('#toppingsList input:checked'));
    const toppingsTotal = checked.reduce((acc, el) => acc + parseInt(el.dataset.price, 10), 0);

    this.basePriceDisplay.innerText = `฿${drink.price}`;
    this.toppingsPriceDisplay.innerText = `+฿${toppingsTotal}`;
    this.customTotalPrice.innerText = `฿${drink.price + toppingsTotal}`;
  }

  addToCart(item) {
    state.cart.push(item);
    audio.playIceClink();
    audio.playLiquidSplash();
    this.updateCartUI();
    showToast(`เพิ่ม "${item.name}" ลงในรายการแล้ว!`, '🥤');
  }

  updateCartUI() {
    this.cartCountBadge.innerText = state.cart.length;

    if (state.cart.length === 0) {
      this.cartItemsList.innerHTML = `<p class="empty-cart-msg">ยังไม่มีเครื่องดื่มในตะกร้า ลองเลือกเครื่องดื่มแล้วกด "สั่งเลย" หรือ "ปรับแต่งรสชาติ"</p>`;
      this.cartGrandTotal.innerText = '฿0';
      return;
    }

    let grandTotal = 0;
    this.cartItemsList.innerHTML = state.cart.map((item, idx) => {
      grandTotal += item.price;
      const toppingText = item.toppings && item.toppings.length ? `<br>+ ${item.toppings.join(', ')}` : '';
      return `
        <div class="cart-item-card">
          <img src="${item.img}" alt="${item.name}" class="cart-item-img">
          <div class="cart-item-details">
            <div class="cart-item-name">${item.name}</div>
            <div class="cart-item-custom">${item.ice} · ${item.sweet}${toppingText}</div>
            <div class="cart-item-price">฿${item.price}</div>
          </div>
          <button class="cart-item-del" onclick="customizer.removeItem(${idx})" title="ลบรายการ">✕</button>
        </div>
      `;
    }).join('');

    this.cartGrandTotal.innerText = `฿${grandTotal}`;
  }

  removeItem(index) {
    state.cart.splice(index, 1);
    audio.playClick();
    this.updateCartUI();
  }
}

// ============================================================================
// 10. POSTER 2x2 GRID VIEW CONTROLLER
// ============================================================================
function setupPosterView() {
  const btnPosterMode = document.getElementById('btnPosterMode');
  const btnShowcaseView = document.getElementById('btnShowcaseView');
  const posterView = document.getElementById('posterView');
  const btnClosePoster = document.getElementById('btnClosePoster');

  function openPoster() {
    audio.playClick();
    btnPosterMode.classList.add('active');
    btnShowcaseView.classList.remove('active');
    posterView.classList.remove('hidden');
  }

  function closePoster() {
    audio.playClick();
    btnPosterMode.classList.remove('active');
    btnShowcaseView.classList.add('active');
    posterView.classList.add('hidden');
  }

  if (btnPosterMode) btnPosterMode.addEventListener('click', openPoster);
  if (btnShowcaseView) btnShowcaseView.addEventListener('click', closePoster);
  if (btnClosePoster) btnClosePoster.addEventListener('click', closePoster);

  // Clicking any quadrant in Poster View selects that drink and opens 3D Showcase!
  document.querySelectorAll('.poster-quadrant').forEach(quad => {
    quad.addEventListener('click', () => {
      const drinkId = quad.dataset.drink;
      switchDrink(drinkId);
      closePoster();
      showToast(`เปิดโหมด 3D Animation: ${DRINK_DATABASE[drinkId].title}`, '✨');
    });
  });
}

// ============================================================================
// 11. AUDIO TOGGLE & DOCK NAVIGATION SETUP
// ============================================================================
let particleEngine = null;
let tiltEngine = null;
let radarChart = null;
let customizer = null;

window.addEventListener('DOMContentLoaded', () => {
  // Initialize Engines
  particleEngine = new ParticleEngine('liquidCanvas');
  tiltEngine = new ParallaxTiltEngine();
  radarChart = new SensoryRadarChart('flavorRadar');
  customizer = new CustomizerManager();

  // Setup Dock items click
  document.querySelectorAll('.dock-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const drinkId = btn.dataset.id;
      switchDrink(drinkId);
    });
  });

  // Setup Audio Toggle Button
  const audioToggle = document.getElementById('audioToggle');
  if (audioToggle) {
    audioToggle.addEventListener('click', () => {
      state.isAudioEnabled = !state.isAudioEnabled;
      audioToggle.classList.toggle('active', state.isAudioEnabled);
      if (state.isAudioEnabled) {
        audio.init();
        audio.playSodaFizz();
        audio.playIceClink();
        showToast('เปิดระบบเสียง Sound FX (Fizzy Soda & Ice Chimes) แล้ว!', '🔊');
      } else {
        showToast('ปิดระบบเสียง Sound FX', '🔇');
      }
    });
  }

  // Setup Poster View
  setupPosterView();

  // Initial drink setup
  switchDrink('thai-tea', false);
});
