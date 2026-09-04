/**
 * Maximalist College Student Portfolio Main Application Logic
 * Integrates procedural lo-fi dorm beats, draggable sticker physics,
 * scroll progress trackers, cyber spark confetti, soundboard toys,
 * hackathon trophy shelf, and caffeine meter.
 */

// Enhanced Procedural Web Audio Synthesizer
class SoundFX {
  constructor() {
    this.ctx = null;
    this.muted = localStorage.getItem("portfolio_sound_muted") === "true";
    this.isPlayingBeats = false;
    this.beatsTimer = null;
    this.beatStep = 0;
  }

  initContext() {
    if (!this.ctx && (window.AudioContext || window.webkitAudioContext)) {
      this.ctx = new (window.AudioContext || window.webkitAudioContext)();
    }
  }

  playBeep(freq = 600, duration = 0.05, type = "sine") {
    if (this.muted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      if (this.ctx.state === "suspended") this.ctx.resume();

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = type;
      osc.frequency.setValueAtTime(freq, this.ctx.currentTime);

      gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + duration);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  // Procedural Lo-Fi Synth Beats Generator
  toggleDormBeats() {
    this.initContext();
    if (this.ctx && this.ctx.state === "suspended") this.ctx.resume();

    this.isPlayingBeats = !this.isPlayingBeats;
    const widget = document.getElementById("dorm-beats-widget");
    const playIcon = document.getElementById("beats-play-icon");
    const pauseIcon = document.getElementById("beats-pause-icon");

    if (this.isPlayingBeats) {
      if (widget) widget.classList.add("playing");
      if (playIcon) playIcon.style.display = "none";
      if (pauseIcon) pauseIcon.style.display = "block";
      this.startBeatsLoop();
      showToast("🎶 3 AM Dorm Beats Playing (Web Audio Lo-Fi)");
    } else {
      if (widget) widget.classList.remove("playing");
      if (playIcon) playIcon.style.display = "block";
      if (pauseIcon) pauseIcon.style.display = "none";
      this.stopBeatsLoop();
      showToast("Dorm Beats Paused");
    }
    return this.isPlayingBeats;
  }

  startBeatsLoop() {
    // Lo-fi chord sequence: Am9 -> Fmaj7 -> Cmaj7 -> Gsus4
    const chords = [
      [220, 261.63, 329.63, 392], // A3, C4, E4, G4
      [174.61, 220, 261.63, 329.63], // F3, A3, C4, E4
      [130.81, 164.81, 196, 246.94], // C3, E3, G3, B3
      [196, 246.94, 293.66, 392]     // G3, B3, D4, G4
    ];

    const stepInterval = 650; // ms per chord step

    this.beatsTimer = setInterval(() => {
      if (!this.isPlayingBeats) return;
      const currentChord = chords[this.beatStep % chords.length];
      this.beatStep++;

      try {
        currentChord.forEach((f, idx) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();

          osc.type = "sine";
          // Gentle detuning for lush lo-fi warmth
          osc.frequency.setValueAtTime(f + (idx % 2 === 0 ? 0.8 : -0.8), this.ctx.currentTime);

          gain.gain.setValueAtTime(0.012, this.ctx.currentTime);
          gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.6);

          osc.connect(gain);
          gain.connect(this.ctx.destination);

          osc.start();
          osc.stop(this.ctx.currentTime + 0.6);
        });

        // Subtle soft kick pulse on beat 1 & 3
        if (this.beatStep % 2 === 1) {
          this.playBeep(75, 0.18, "sine");
        }
      } catch (e) {
        // Safe fail
      }
    }, stepInterval);
  }

  stopBeatsLoop() {
    if (this.beatsTimer) {
      clearInterval(this.beatsTimer);
      this.beatsTimer = null;
    }
  }

  toggleMute() {
    this.muted = !this.muted;
    localStorage.setItem("portfolio_sound_muted", this.muted);
    if (this.muted && this.isPlayingBeats) {
      this.toggleDormBeats();
    }
    return this.muted;
  }
}

window.soundFX = new SoundFX();

// Theme Controller
const THEMES = {
  cyan: { hex: "#00f0ff", rgb: "0, 240, 255", glow: "rgba(0, 240, 255, 0.45)" },
  violet: { hex: "#a855f7", rgb: "168, 85, 247", glow: "rgba(168, 85, 247, 0.45)" },
  emerald: { hex: "#10b981", rgb: "16, 185, 129", glow: "rgba(16, 185, 129, 0.45)" },
  amber: { hex: "#f59e0b", rgb: "245, 158, 11", glow: "rgba(245, 158, 11, 0.45)" }
};

window.setTheme = function(themeKey) {
  const theme = THEMES[themeKey] || THEMES.cyan;
  const root = document.documentElement;

  root.style.setProperty("--accent-color", theme.hex);
  root.style.setProperty("--accent-hex", theme.hex);
  root.style.setProperty("--accent-rgb", theme.rgb);
  root.style.setProperty("--accent-glow", theme.glow);

  localStorage.setItem("portfolio_theme", themeKey);

  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.classList.toggle("active", btn.dataset.theme === themeKey);
  });

  window.dispatchEvent(new CustomEvent("themeChanged", { detail: themeKey }));
};

// Application Main Initialization
document.addEventListener("DOMContentLoaded", () => {
  const data = window.PORTFOLIO_DATA;
  if (!data) return;

  // Initialize saved theme
  const savedTheme = localStorage.getItem("portfolio_theme") || "cyan";
  window.setTheme(savedTheme);

  // Setup Theme Switcher Buttons
  document.querySelectorAll(".theme-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const theme = btn.dataset.theme;
      window.setTheme(theme);
      window.soundFX.playBeep(800, 0.05);
      showToast(`Neon Palette Switched: ${theme.toUpperCase()}`);
    });
  });

  // Setup Sound Toggle
  const soundToggleBtn = document.getElementById("sound-toggle-btn");
  if (soundToggleBtn) {
    const updateSoundIcon = (muted) => {
      soundToggleBtn.innerHTML = muted
        ? `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="1" y1="1" x2="23" y2="23"/><path d="M9 9v3a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"/><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"/><line x1="12" y1="19" x2="12" y2="23"/><line x1="8" y1="23" x2="16" y2="23"/></svg>`
        : `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`;
      soundToggleBtn.title = muted ? "Unmute Audio" : "Mute Audio";
    };

    updateSoundIcon(window.soundFX.muted);

    soundToggleBtn.addEventListener("click", () => {
      const muted = window.soundFX.toggleMute();
      updateSoundIcon(muted);
      if (!muted) window.soundFX.playBeep(650, 0.08);
      showToast(muted ? "Sound Effects Muted" : "Sound Effects Enabled");
    });
  }

  // Setup Dorm Beats Toggle
  const beatsBtn = document.getElementById("beats-toggle-btn");
  if (beatsBtn) {
    beatsBtn.addEventListener("click", () => {
      window.soundFX.toggleDormBeats();
    });
  }

  // Render Hero
  renderHero(data);

  // Setup Draggable Hacker Stickers
  renderStickers(data.stickers);

  // Setup Caffeine Meter & Refill Button
  setupCaffeineGauge(data.caffeineGauge);

  // Populate Stats Counter
  renderStats(data.stats);

  // Populate Coursework
  renderCoursework(data.bento.coursework);

  // Populate Tech Stack Ticker
  renderTechStackTicker(data.bento.techStackSummary);

  // Populate Hackathon Trophies
  renderTrophies(data.trophies);

  // Populate Skills
  renderSkills(data.skills);

  // Populate Projects
  renderProjects(data.projects);

  // Populate Experience
  renderExperience(data.experience);

  // Setup Soundboard Shelf
  renderSoundboard(data.soundboard);

  // Project Filtering
  setupProjectFilters(data.projects);

  // Interactive 3D Card Tilts
  setupCardTiltEffects();

  // Project Modal Logic
  setupProjectModal(data.projects);

  // Contact Module
  setupContactModule(data.personal);

  // Scroll Progress & Nav
  setupScrollTracking();
  setupNavigation();

  // Global Click Cyber Sparks Confetti
  setupCyberSparks();

  // Scroll Animations
  setupScrollReveals();
});

// 1. Render Hero Content
function renderHero(data) {
  const p = data.personal;
  const heroName = document.getElementById("hero-name");
  const heroRole = document.getElementById("hero-role");
  const heroBio = document.getElementById("hero-bio");
  const heroBadge = document.getElementById("hero-badge");

  if (heroName) heroName.textContent = `${p.name} ${p.surname}`;
  if (heroRole) heroRole.textContent = p.role;
  if (heroBio) heroBio.textContent = p.bio;
  if (heroBadge) {
    heroBadge.innerHTML = `
      <span class="status-indicator"></span>
      <span>${p.availability}</span>
    `;
  }
}

// 2. Interactive Tossable / Draggable Hacker Stickers
function renderStickers(stickers) {
  const board = document.getElementById("sticker-board");
  if (!board || !stickers) return;

  board.innerHTML = stickers.map(s => `
    <div class="hacker-sticker" id="${s.id}" style="
      border-color: ${s.color};
      color: ${s.color};
      background: ${s.color}15;
      transform: rotate(${s.rotation}deg);
      top: ${s.top !== undefined ? s.top + '%' : 'auto'};
      bottom: ${s.bottom !== undefined ? s.bottom + '%' : 'auto'};
      left: ${s.left !== undefined ? s.left + '%' : 'auto'};
      right: ${s.right !== undefined ? s.right + '%' : 'auto'};
    ">
      <span>${s.text}</span>
    </div>
  `).join("");

  // Setup simple drag & toss physics
  document.querySelectorAll(".hacker-sticker").forEach(stk => {
    let isDragging = false;
    let startX, startY, origX, origY;

    stk.addEventListener("pointerdown", (e) => {
      isDragging = true;
      stk.setPointerCapture(e.pointerId);
      startX = e.clientX;
      startY = e.clientY;
      const rect = stk.getBoundingClientRect();
      origX = rect.left;
      origY = rect.top;

      window.soundFX.playBeep(880, 0.04, "square");
      stk.style.transition = "none";
      stk.style.position = "fixed";
      stk.style.left = `${origX}px`;
      stk.style.top = `${origY}px`;
      stk.style.bottom = "auto";
      stk.style.right = "auto";
    });

    stk.addEventListener("pointermove", (e) => {
      if (!isDragging) return;
      const dx = e.clientX - startX;
      const dy = e.clientY - startY;
      stk.style.left = `${origX + dx}px`;
      stk.style.top = `${origY + dy}px`;
    });

    stk.addEventListener("pointerup", (e) => {
      if (!isDragging) return;
      isDragging = false;
      stk.releasePointerCapture(e.pointerId);
      stk.style.transition = "transform 0.2s cubic-bezier(0.175, 0.885, 0.32, 1.275)";
      window.soundFX.playBeep(440, 0.05, "triangle");
      showToast(`Tossed sticker: "${stk.textContent.trim()}"`);
    });
  });
}

// 3. Caffeine Fuel Battery Gauge
function setupCaffeineGauge(gaugeData) {
  const fill = document.getElementById("caffeine-bar-fill");
  const statusText = document.getElementById("caffeine-status-text");
  const chugBtn = document.getElementById("chug-coffee-btn");

  let currentLevel = (gaugeData && gaugeData.initialPercent) || 88;

  if (chugBtn && fill) {
    chugBtn.addEventListener("click", () => {
      currentLevel = 100;
      fill.style.width = "100%";
      fill.style.boxShadow = "0 0 30px #f59e0b, 0 0 50px #ec4899";

      if (statusText) {
        statusText.textContent = "⚡ 100% OVERCLOCKED NITRO COLD BREW!";
        statusText.style.color = "#00f0ff";
      }

      window.soundFX.playBeep(1200, 0.2, "sawtooth");
      showToast("☕ GULP! Nitro cold brew injected! 3 AM power restored to 100%!");

      // Trigger sparks
      triggerSparksAtElement(chugBtn);
    });
  }
}

// 4. Render Stats Counter
function renderStats(stats) {
  const container = document.getElementById("stats-grid");
  if (!container || !stats) return;

  container.innerHTML = stats.map(s => `
    <div class="stat-card glass-panel">
      <div class="stat-number">
        <span class="counter" data-target="${s.value}">0</span>${s.suffix}
      </div>
      <div class="stat-label">${s.label}</div>
    </div>
  `).join("");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCounters();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.3 });

  observer.observe(container);
}

function animateCounters() {
  document.querySelectorAll(".counter").forEach(c => {
    const target = +c.getAttribute("data-target");
    const duration = 1200;
    const stepTime = 20;
    const steps = duration / stepTime;
    const increment = target / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        c.textContent = target;
        clearInterval(timer);
      } else {
        c.textContent = Math.floor(current);
      }
    }, stepTime);
  });
}

// 5. Render Academic Coursework
function renderCoursework(courses) {
  const container = document.getElementById("coursework-grid");
  if (!container || !courses) return;

  container.innerHTML = courses.map(c => `
    <div class="coursework-item">
      <span>${c}</span>
    </div>
  `).join("");
}

// 6. Render Tech Stack Carousel
function renderTechStackTicker(techs) {
  const track = document.getElementById("tech-ticker-track");
  if (!track || !techs) return;

  const list = techs.concat(techs);
  track.innerHTML = list.map(tech => `
    <div class="tech-pill">
      <span class="tech-dot"></span>
      <span>${tech}</span>
    </div>
  `).join("");
}

// 7. Render Hackathon Trophy Shelf
function renderTrophies(trophies) {
  const container = document.getElementById("trophy-grid");
  if (!container || !trophies) return;

  container.innerHTML = trophies.map(t => `
    <div class="trophy-item glass-panel">
      <div class="trophy-header">
        <span class="trophy-prize">🏆 ${t.prize}</span>
        <span class="tag-pill">${t.date}</span>
      </div>
      <h3 class="trophy-title">${t.title}</h3>
      <p class="trophy-desc">${t.description}</p>
      <div class="project-tags">
        ${t.tags.map(tag => `<span class="tag-pill">${tag}</span>`).join("")}
      </div>
    </div>
  `).join("");
}

// Custom Interactive Visual SVG generators for Project Cards
function getProjectSvgVisual(type, accent) {
  switch (type) {
    case "ai-mesh":
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g-ai" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accent}" stop-opacity="0.9"/>
              <stop offset="100%" stop-color="#ec4899" stop-opacity="0.4"/>
            </linearGradient>
            <radialGradient id="g-glow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="${accent}" stop-opacity="0.4"/>
              <stop offset="100%" stop-color="transparent"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="#0a0d16"/>
          <circle cx="190" cy="100" r="80" fill="url(#g-glow)"/>
          <line x1="70" y1="100" x2="140" y2="60" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <line x1="70" y1="100" x2="140" y2="140" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <line x1="140" y1="60" x2="230" y2="70" stroke="${accent}" stroke-opacity="0.7" stroke-width="2"/>
          <line x1="140" y1="140" x2="230" y2="130" stroke="${accent}" stroke-opacity="0.7" stroke-width="2"/>
          <line x1="230" y1="70" x2="310" y2="100" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <line x1="230" y1="130" x2="310" y2="100" stroke="${accent}" stroke-opacity="0.5" stroke-width="2"/>
          <circle cx="70" cy="100" r="8" fill="${accent}"/>
          <circle cx="140" cy="60" r="7" fill="${accent}"/>
          <circle cx="140" cy="140" r="7" fill="${accent}"/>
          <circle cx="230" cy="70" r="9" fill="url(#g-ai)"/>
          <circle cx="230" cy="130" r="8" fill="${accent}"/>
          <circle cx="310" cy="100" r="10" fill="${accent}"/>
          <text x="190" y="180" fill="#94a3b8" font-size="12" font-family="monospace" text-anchor="middle">DAG Autonomous Agent Pipeline</text>
        </svg>
      `;

    case "finance-chart":
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g-fin" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stop-color="${accent}" stop-opacity="0.7"/>
              <stop offset="100%" stop-color="${accent}" stop-opacity="0.0"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#0a0d14"/>
          <line x1="40" y1="40" x2="340" y2="40" stroke="#1e293b" stroke-width="1"/>
          <line x1="40" y1="80" x2="340" y2="80" stroke="#1e293b" stroke-width="1"/>
          <line x1="40" y1="120" x2="340" y2="120" stroke="#1e293b" stroke-width="1"/>
          <line x1="40" y1="160" x2="340" y2="160" stroke="#1e293b" stroke-width="1"/>
          <path d="M 40 140 Q 80 150 110 110 T 170 115 T 230 70 T 290 85 T 340 45 L 340 170 L 40 170 Z" fill="url(#g-fin)"/>
          <path d="M 40 140 Q 80 150 110 110 T 170 115 T 230 70 T 290 85 T 340 45" fill="none" stroke="${accent}" stroke-width="3"/>
          <circle cx="230" cy="70" r="5" fill="#ffffff"/>
          <circle cx="230" cy="70" r="11" fill="none" stroke="${accent}" stroke-width="2" opacity="0.9"/>
          <text x="50" y="30" fill="${accent}" font-size="12" font-weight="bold" font-family="monospace">CODECLASH LIVE DUEL</text>
          <text x="330" y="30" fill="#10b981" font-size="12" font-family="monospace" text-anchor="end">15-MIN BLITZ</text>
        </svg>
      `;

    case "3d-spatial":
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <defs>
            <linearGradient id="g-cube" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stop-color="${accent}" stop-opacity="0.85"/>
              <stop offset="100%" stop-color="#064e3b" stop-opacity="0.4"/>
            </linearGradient>
          </defs>
          <rect width="100%" height="100%" fill="#090f15"/>
          <g transform="translate(190, 95)">
            <polygon points="0,0 55,-32 55,32 0,64" fill="url(#g-cube)" stroke="${accent}" stroke-width="1.5"/>
            <polygon points="0,0 55,-32 0,-64 -55,-32" fill="${accent}" fill-opacity="0.5" stroke="${accent}" stroke-width="1.5"/>
            <polygon points="0,0 -55,-32 -55,32 0,64" fill="#042f2e" stroke="${accent}" stroke-width="1.5"/>
          </g>
          <circle cx="100" cy="65" r="14" fill="${accent}" fill-opacity="0.6"/>
          <circle cx="280" cy="135" r="10" fill="${accent}" fill-opacity="0.4"/>
          <text x="190" y="180" fill="#6ee7b7" font-size="12" font-family="monospace" text-anchor="middle">WebGL Shader Raymarching (120 FPS)</text>
        </svg>
      `;

    case "security-shield":
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <rect width="100%" height="100%" fill="#110d08"/>
          <circle cx="190" cy="95" r="60" fill="none" stroke="${accent}" stroke-dasharray="6,4" stroke-width="1.5" opacity="0.5"/>
          <circle cx="190" cy="95" r="35" fill="none" stroke="${accent}" stroke-width="1.5" opacity="0.8"/>
          <path d="M 190 60 L 220 75 L 220 105 Q 190 135 190 140 Q 190 135 160 105 L 160 75 Z" fill="${accent}" fill-opacity="0.3" stroke="${accent}" stroke-width="2"/>
          <path d="M 178 95 L 186 103 L 202 87" fill="none" stroke="#ffffff" stroke-width="3" stroke-linecap="round"/>
          <text x="190" y="175" fill="${accent}" font-size="12" font-family="monospace" text-anchor="middle">Continuous Threat Defense Active</text>
        </svg>
      `;

    case "cloud-edge":
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <rect width="100%" height="100%" fill="#0a0f1c"/>
          <ellipse cx="190" cy="100" rx="140" ry="50" fill="none" stroke="${accent}" stroke-opacity="0.3" stroke-dasharray="4,6"/>
          <ellipse cx="190" cy="100" rx="100" ry="35" fill="none" stroke="${accent}" stroke-opacity="0.4"/>
          <circle cx="80" cy="100" r="7" fill="${accent}"/>
          <circle cx="150" cy="70" r="6" fill="${accent}"/>
          <circle cx="230" cy="130" r="6" fill="${accent}"/>
          <circle cx="300" cy="100" r="7" fill="${accent}"/>
          <circle cx="190" cy="100" r="10" fill="#ffffff"/>
          <line x1="80" y1="100" x2="190" y2="100" stroke="${accent}" stroke-width="2"/>
          <line x1="300" y1="100" x2="190" y2="100" stroke="${accent}" stroke-width="2"/>
          <line x1="150" y1="70" x2="190" y2="100" stroke="${accent}" stroke-width="2"/>
          <line x1="230" y1="130" x2="190" y2="100" stroke="${accent}" stroke-width="2"/>
          <text x="190" y="175" fill="#93c5fd" font-size="12" font-family="monospace" text-anchor="middle">Campus P2P WebRTC Mesh Radar</text>
        </svg>
      `;

    default: // sound-wave
      return `
        <svg viewBox="0 0 380 200" class="project-mockup-svg" preserveAspectRatio="xMidYMid slice">
          <rect width="100%" height="100%" fill="#140a16"/>
          <g transform="translate(60, 100)">
            <line x1="0" y1="-15" x2="0" y2="15" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="20" y1="-35" x2="20" y2="35" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="40" y1="-15" x2="40" y2="15" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="60" y1="-55" x2="60" y2="55" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="80" y1="-70" x2="80" y2="70" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="100" y1="-40" x2="100" y2="40" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="120" y1="-60" x2="120" y2="60" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="140" y1="-25" x2="140" y2="25" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="160" y1="-65" x2="160" y2="65" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="180" y1="-45" x2="180" y2="45" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="200" y1="-20" x2="200" y2="20" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="220" y1="-50" x2="220" y2="50" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="240" y1="-30" x2="240" y2="30" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
            <line x1="260" y1="-10" x2="260" y2="10" stroke="${accent}" stroke-width="4" stroke-linecap="round"/>
          </g>
          <text x="190" y="180" fill="#f472b6" font-size="12" font-family="monospace" text-anchor="middle">Generative Web Audio Synthesizer</text>
        </svg>
      `;
  }
}

// 8. Render Skills Matrix
function renderSkills(skillsData) {
  const container = document.getElementById("skills-container");
  if (!container || !skillsData) return;

  container.innerHTML = skillsData.categories.map(cat => `
    <div class="skill-category-card glass-panel">
      <div class="category-header">
        <div class="category-icon-box">${cat.icon}</div>
        <h3 class="category-title">${cat.title}</h3>
      </div>
      <div class="skill-list">
        ${cat.items.map(item => `
          <div class="skill-item">
            <div class="skill-info">
              <span class="skill-name">${item.name}</span>
              <span class="skill-percent">${item.level}%</span>
            </div>
            <div class="skill-bar-track">
              <div class="skill-bar-fill" style="width: 0%" data-level="${item.level}%"></div>
            </div>
          </div>
        `).join("")}
      </div>
    </div>
  `).join("");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.querySelectorAll(".skill-bar-fill").forEach(bar => {
          bar.style.width = bar.getAttribute("data-level");
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.25 });

  container.querySelectorAll(".skill-category-card").forEach(card => observer.observe(card));
}

// 9. Render Projects Grid
function renderProjects(projects) {
  const container = document.getElementById("projects-grid");
  if (!container || !projects) return;

  container.innerHTML = projects.map(p => `
    <div class="project-card glass-panel" data-category="${p.category}" data-id="${p.id}">
      <div class="project-spotlight"></div>
      
      <div class="project-preview-wrap">
        ${getProjectSvgVisual(p.illustrationType, p.accentColor)}
        <div class="project-preview-badge">
          <span>${p.stats.metric}</span>
          <span class="preview-badge-sub">${p.stats.label}</span>
        </div>
      </div>

      <div class="project-content">
        <div class="project-meta-row">
          <span class="project-category-tag" style="color: ${p.accentColor}; border-color: ${p.accentColor}44;">
            ${p.categoryLabel}
          </span>
          ${p.featured ? `<span class="project-featured-badge">★ Hackathon Build</span>` : ""}
        </div>

        <h3 class="project-title">${p.title}</h3>
        <p class="project-description">${p.description}</p>

        <div class="project-tags">
          ${p.tags.slice(0, 4).map(t => `<span class="tag-pill">${t}</span>`).join("")}
          ${p.tags.length > 4 ? `<span class="tag-pill tag-more">+${p.tags.length - 4}</span>` : ""}
        </div>

        <div class="project-actions">
          <button class="btn btn-sm btn-ghost view-project-btn" data-id="${p.id}">
            Inspect Hack
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
          </button>
          <div class="project-links">
            <a href="${p.githubUrl}" target="_blank" rel="noreferrer" class="icon-link" title="GitHub Repository">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
            </a>
            <a href="${p.liveUrl}" target="_blank" rel="noreferrer" class="icon-link" title="Live Preview">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  `).join("");
}

// 10. Filter Pills
function setupProjectFilters(projects) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".project-card");

  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      window.soundFX.playBeep(720, 0.04);
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");

      const filter = btn.dataset.filter;

      cards.forEach(card => {
        if (filter === "all" || card.dataset.category === filter) {
          card.style.display = "flex";
          card.style.opacity = "0";
          card.style.transform = "scale(0.95)";
          setTimeout(() => {
            card.style.transition = "opacity 0.35s ease, transform 0.35s ease";
            card.style.opacity = "1";
            card.style.transform = "scale(1)";
          }, 30);
        } else {
          card.style.display = "none";
        }
      });
    });
  });
}

// 11. 3D Tilt Effect on Project Cards
function setupCardTiltEffects() {
  const cards = document.querySelectorAll(".project-card");

  cards.forEach(card => {
    const spotlight = card.querySelector(".project-spotlight");

    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const centerX = rect.width / 2;
      const centerY = rect.height / 2;

      const rotateX = ((y - centerY) / centerY) * -8;
      const rotateY = ((x - centerX) / centerX) * 8;

      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) scale3d(1.02, 1.02, 1.02)`;

      if (spotlight) {
        spotlight.style.background = `radial-gradient(400px circle at ${x}px ${y}px, rgba(255, 255, 255, 0.12), transparent 40%)`;
      }
    });

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)";
      if (spotlight) {
        spotlight.style.background = "transparent";
      }
    });
  });
}

// 12. Project Detail Modal
function setupProjectModal(projects) {
  const modal = document.getElementById("project-modal");
  const modalBody = document.getElementById("modal-body-content");
  const closeBtn = document.getElementById("modal-close-btn");

  if (!modal || !modalBody || !closeBtn) return;

  function openModal(projectId) {
    const project = projects.find(p => p.id === projectId);
    if (!project) return;

    window.soundFX.playBeep(520, 0.06);

    modalBody.innerHTML = `
      <div class="modal-project-header">
        <div class="modal-visual-wrap">
          ${getProjectSvgVisual(project.illustrationType, project.accentColor)}
        </div>
        <div class="modal-header-meta">
          <span class="project-category-tag" style="color: ${project.accentColor}; border-color: ${project.accentColor}44;">
            ${project.categoryLabel}
          </span>
          <h2 class="modal-title">${project.title}</h2>
          <p class="modal-lead">${project.description}</p>
        </div>
      </div>

      <div class="modal-details-grid">
        <div class="modal-section">
          <h4 class="modal-section-title">Architectural Innovations &amp; Hacks</h4>
          <ul class="modal-highlights-list">
            ${project.highlights.map(h => `
              <li>
                <span class="highlight-bullet" style="background: ${project.accentColor};"></span>
                <span>${h}</span>
              </li>
            `).join("")}
          </ul>
        </div>

        <div class="modal-section">
          <h4 class="modal-section-title">Stack &amp; Frameworks</h4>
          <div class="modal-tags">
            ${project.tags.map(t => `<span class="tag-pill tag-glow">${t}</span>`).join("")}
          </div>

          <div class="modal-stat-box glass-panel">
            <div class="modal-stat-val" style="color: ${project.accentColor};">${project.stats.metric}</div>
            <div class="modal-stat-lbl">${project.stats.label}</div>
          </div>
        </div>
      </div>

      <div class="modal-footer-actions">
        <a href="${project.liveUrl}" target="_blank" rel="noreferrer" class="btn btn-primary">
          <span>Launch Demo</span>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
        </a>
        <a href="${project.githubUrl}" target="_blank" rel="noreferrer" class="btn btn-secondary">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
          <span>GitHub Code</span>
        </a>
      </div>
    `;

    modal.classList.add("open");
    document.body.style.overflow = "hidden";
  }

  function closeModal() {
    modal.classList.remove("open");
    document.body.style.overflow = "";
  }

  document.addEventListener("click", (e) => {
    const btn = e.target.closest(".view-project-btn");
    if (btn) {
      e.stopPropagation();
      openModal(btn.dataset.id);
      return;
    }

    const card = e.target.closest(".project-card");
    if (card && !e.target.closest(".icon-link")) {
      openModal(card.dataset.id);
    }
  });

  closeBtn.addEventListener("click", closeModal);
  modal.addEventListener("click", (e) => { if (e.target === modal) closeModal(); });
  document.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });
}

// 13. Render Experience Timeline
function renderExperience(experience) {
  const container = document.getElementById("experience-timeline");
  if (!container || !experience) return;

  container.innerHTML = experience.map(exp => `
    <div class="timeline-item">
      <div class="timeline-node">
        <div class="timeline-dot"></div>
        <div class="timeline-line"></div>
      </div>
      <div class="timeline-card glass-panel">
        <div class="timeline-header">
          <div>
            <span class="timeline-period">${exp.period}</span>
            <h3 class="timeline-role">${exp.role}</h3>
            <div class="timeline-company">${exp.company}</div>
          </div>
          <span class="timeline-badge">${exp.badge}</span>
        </div>
        <p class="timeline-desc">${exp.description}</p>
        <ul class="timeline-achievements">
          ${exp.achievements.map(a => `<li>${a}</li>`).join("")}
        </ul>
        <div class="timeline-skills">
          ${exp.skills.map(s => `<span class="tag-pill">${s}</span>`).join("")}
        </div>
      </div>
    </div>
  `).join("");
}

// 14. Render Interactive Soundboard Shelf
function renderSoundboard(soundboard) {
  const shelf = document.getElementById("soundboard-shelf");
  if (!shelf || !soundboard) return;

  shelf.innerHTML = soundboard.map(s => `
    <button class="soundboard-btn" data-id="${s.id}">
      <span>🔊</span>
      <span>${s.label}</span>
    </button>
  `).join("");

  shelf.querySelectorAll(".soundboard-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const soundItem = soundboard.find(s => s.id === btn.dataset.id);
      if (soundItem) {
        window.soundFX.playBeep(soundItem.freq, soundItem.duration, soundItem.type);
        triggerSparksAtElement(btn);
        showToast(`Sound FX: ${soundItem.label}`);
      }
    });
  });
}

// 15. Scroll-Driven Progress Bar & Percentage Readout
function setupScrollTracking() {
  const bar = document.getElementById("scroll-progress-bar");
  const readout = document.getElementById("scroll-percentage");

  window.addEventListener("scroll", () => {
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollY = window.scrollY;
    const progress = totalHeight > 0 ? (scrollY / totalHeight) * 100 : 0;
    const clampedProgress = Math.min(Math.max(progress, 0), 100);

    if (bar) bar.style.width = `${clampedProgress}%`;
    if (readout) readout.textContent = `[SCROLL ${Math.round(clampedProgress)}%]`;
  }, { passive: true });
}

// 16. Cyber Sparks & Confetti Burst Effect on Click
function setupCyberSparks() {
  document.addEventListener("click", (e) => {
    // Avoid creating sparks on form inputs
    if (["INPUT", "TEXTAREA"].includes(e.target.tagName)) return;
    spawnSparksAt(e.clientX, e.clientY);
  });
}

function triggerSparksAtElement(el) {
  const rect = el.getBoundingClientRect();
  spawnSparksAt(rect.left + rect.width / 2, rect.top + rect.height / 2);
}

function spawnSparksAt(x, y) {
  const colors = ["#00f0ff", "#a855f7", "#ec4899", "#f59e0b", "#10b981", "#ffffff"];
  const count = 12;

  for (let i = 0; i < count; i++) {
    const spark = document.createElement("div");
    spark.className = "cyber-spark";

    const angle = (Math.PI * 2 * i) / count + (Math.random() - 0.5);
    const distance = Math.random() * 55 + 30;
    const tx = Math.cos(angle) * distance;
    const ty = Math.sin(angle) * distance;
    const rot = Math.random() * 360;
    const size = Math.random() * 5 + 3;
    const color = colors[Math.floor(Math.random() * colors.length)];

    spark.style.width = `${size}px`;
    spark.style.height = `${size}px`;
    spark.style.backgroundColor = color;
    spark.style.boxShadow = `0 0 10px ${color}`;
    spark.style.left = `${x}px`;
    spark.style.top = `${y}px`;
    spark.style.setProperty("--tx", `${tx}px`);
    spark.style.setProperty("--ty", `${ty}px`);
    spark.style.setProperty("--rot", `${rot}deg`);

    document.body.appendChild(spark);

    setTimeout(() => {
      if (spark.parentNode) spark.parentNode.removeChild(spark);
    }, 700);
  }
}

// 17. Contact Module
function setupContactModule(personal) {
  const copyBtn = document.getElementById("copy-email-btn");
  const emailDisplay = document.getElementById("contact-email-text");
  const form = document.getElementById("contact-form");
  const formSubmitBtn = document.getElementById("contact-submit-btn");

  if (emailDisplay) emailDisplay.textContent = personal.email;

  if (copyBtn) {
    copyBtn.addEventListener("click", () => {
      navigator.clipboard.writeText(personal.email).then(() => {
        window.soundFX.playBeep(900, 0.08);
        showToast("Email address copied to clipboard!");
        copyBtn.innerHTML = `
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="#10b981" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>
          <span style="color: #10b981;">Copied!</span>
        `;
        setTimeout(() => {
          copyBtn.innerHTML = `
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
            <span>Copy Email</span>
          `;
        }, 2200);
      }).catch(() => {
        showToast("Clipboard access failed");
      });
    });
  }

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      window.soundFX.playBeep(700, 0.08);

      const name = document.getElementById("contact-name").value.trim();
      const email = document.getElementById("contact-email-input").value.trim();
      const message = document.getElementById("contact-msg").value.trim();

      if (!name || !email || !message) {
        showToast("Please complete all transmission fields.");
        return;
      }

      if (formSubmitBtn) {
        formSubmitBtn.disabled = true;
        formSubmitBtn.innerHTML = `
          <span class="spinner"></span>
          <span>Transmitting Payload...</span>
        `;
      }

      setTimeout(() => {
        window.soundFX.playBeep(950, 0.12);
        showToast(`Transmission received, ${name}! I'll respond before 3 AM!`);
        form.reset();
        if (formSubmitBtn) {
          formSubmitBtn.disabled = false;
          formSubmitBtn.innerHTML = `<span>Payload Dispatched! ✔</span>`;
          setTimeout(() => {
            formSubmitBtn.innerHTML = `
              <span>Send Transmission</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>
            `;
          }, 3000);
        }
      }, 1100);
    });
  }
}

// Toast Alert Manager
function showToast(message) {
  let toast = document.getElementById("portfolio-toast");
  if (!toast) {
    toast = document.createElement("div");
    toast.id = "portfolio-toast";
    toast.className = "portfolio-toast";
    document.body.appendChild(toast);
  }

  toast.textContent = message;
  toast.classList.add("show");

  clearTimeout(window._toastTimeout);
  window._toastTimeout = setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

// 18. Navigation ScrollSpy
function setupNavigation() {
  const navbar = document.getElementById("main-nav");
  const navLinks = document.querySelectorAll(".nav-link");
  const mobileToggle = document.getElementById("mobile-menu-toggle");
  const navMenu = document.getElementById("nav-links-wrap");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 40) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    const sections = document.querySelectorAll("section[id]");
    let currentId = "";

    sections.forEach(sec => {
      const top = sec.offsetTop - 120;
      const height = sec.offsetHeight;
      if (window.scrollY >= top && window.scrollY < top + height) {
        currentId = sec.getAttribute("id");
      }
    });

    navLinks.forEach(link => {
      link.classList.toggle("active", link.getAttribute("href") === `#${currentId}`);
    });
  });

  if (mobileToggle && navMenu) {
    mobileToggle.addEventListener("click", () => {
      navMenu.classList.toggle("open");
      mobileToggle.classList.toggle("open");
    });

    navLinks.forEach(link => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("open");
        mobileToggle.classList.remove("open");
      });
    });
  }
}

// 19. Scroll Reveal Observer
function setupScrollReveals() {
  const revealElements = document.querySelectorAll(".reveal-on-scroll");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("revealed");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => observer.observe(el));
}
