/**
 * Interactive Background Mesh & Particle Canvas
 * Provides a subtle, responsive, interactive starfield & neural constellation effect.
 */

class InteractiveBackground {
  constructor(canvasId = "ambient-canvas") {
    this.canvas = document.getElementById(canvasId);
    if (!this.canvas) return;
    this.ctx = this.canvas.getContext("2d");
    this.particles = [];
    this.mouse = { x: null, y: null, radius: 140 };
    this.animationFrameId = null;
    this.isRunning = true;
    this.primaryColor = { r: 0, g: 240, b: 255 }; // Default cyan

    this.init();
  }

  init() {
    this.resize();
    this.createParticles();
    this.addEventListeners();
    this.updateThemeColors();
    this.loop();
  }

  updateThemeColors() {
    const computed = getComputedStyle(document.documentElement);
    const accentHex = computed.getPropertyValue("--accent-hex").trim() || "#00f0ff";
    this.primaryColor = this.hexToRgb(accentHex) || { r: 0, g: 240, b: 255 };
  }

  hexToRgb(hex) {
    const cleanHex = hex.replace("#", "");
    if (cleanHex.length === 3) {
      const r = parseInt(cleanHex[0] + cleanHex[0], 16);
      const g = parseInt(cleanHex[1] + cleanHex[1], 16);
      const b = parseInt(cleanHex[2] + cleanHex[2], 16);
      return { r, g, b };
    }
    if (cleanHex.length === 6) {
      const r = parseInt(cleanHex.substring(0, 2), 16);
      const g = parseInt(cleanHex.substring(2, 4), 16);
      const b = parseInt(cleanHex.substring(4, 6), 16);
      return { r, g, b };
    }
    return null;
  }

  resize() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.canvas.width = this.width * dpr;
    this.canvas.height = this.height * dpr;
    this.canvas.style.width = `${this.width}px`;
    this.canvas.style.height = `${this.height}px`;

    this.ctx.scale(dpr, dpr);
  }

  createParticles() {
    this.particles = [];
    // Dynamic density based on screen size
    const count = Math.floor((this.width * this.height) / 16000);
    const clampedCount = Math.min(Math.max(count, 35), 85);

    for (let i = 0; i < clampedCount; i++) {
      this.particles.push({
        x: Math.random() * this.width,
        y: Math.random() * this.height,
        vx: (Math.random() - 0.5) * 0.45,
        vy: (Math.random() - 0.5) * 0.45,
        radius: Math.random() * 1.8 + 0.8,
        baseAlpha: Math.random() * 0.5 + 0.25,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        pulseAngle: Math.random() * Math.PI * 2
      });
    }
  }

  addEventListeners() {
    window.addEventListener("resize", () => {
      this.resize();
      this.createParticles();
    });

    window.addEventListener("mousemove", (e) => {
      this.mouse.x = e.clientX;
      this.mouse.y = e.clientY;
    });

    window.addEventListener("mouseleave", () => {
      this.mouse.x = null;
      this.mouse.y = null;
    });

    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        this.isRunning = false;
        cancelAnimationFrame(this.animationFrameId);
      } else {
        this.isRunning = true;
        this.loop();
      }
    });

    // Listen for theme switch events
    window.addEventListener("themeChanged", () => {
      this.updateThemeColors();
    });
  }

  draw() {
    this.ctx.clearRect(0, 0, this.width, this.height);

    const { r, g, b } = this.primaryColor;

    // Draw connecting lines between nearby particles
    for (let i = 0; i < this.particles.length; i++) {
      for (let j = i + 1; j < this.particles.length; j++) {
        const dx = this.particles[i].x - this.particles[j].x;
        const dy = this.particles[i].y - this.particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 130) {
          const alpha = (1 - dist / 130) * 0.18;
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${alpha})`;
          this.ctx.lineWidth = 0.8;
          this.ctx.beginPath();
          this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
          this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
          this.ctx.stroke();
        }
      }
    }

    // Update and draw each particle
    for (let i = 0; i < this.particles.length; i++) {
      const p = this.particles[i];

      // Mouse interaction (gentle attraction/repulsion)
      if (this.mouse.x !== null && this.mouse.y !== null) {
        const dx = p.x - this.mouse.x;
        const dy = p.y - this.mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < this.mouse.radius) {
          const force = (this.mouse.radius - dist) / this.mouse.radius;
          p.x += (dx / dist) * force * 1.8;
          p.y += (dy / dist) * force * 1.8;

          // Mouse link line
          const lineAlpha = (1 - dist / this.mouse.radius) * 0.35;
          this.ctx.strokeStyle = `rgba(${r}, ${g}, ${b}, ${lineAlpha})`;
          this.ctx.lineWidth = 1;
          this.ctx.beginPath();
          this.ctx.moveTo(p.x, p.y);
          this.ctx.lineTo(this.mouse.x, this.mouse.y);
          this.ctx.stroke();
        }
      }

      // Movement
      p.x += p.vx;
      p.y += p.vy;

      // Wrap around bounds
      if (p.x < -10) p.x = this.width + 10;
      if (p.x > this.width + 10) p.x = -10;
      if (p.y < -10) p.y = this.height + 10;
      if (p.y > this.height + 10) p.y = -10;

      // Pulse alpha
      p.pulseAngle += p.pulseSpeed;
      const currentAlpha = p.baseAlpha + Math.sin(p.pulseAngle) * 0.2;

      // Draw particle glow
      this.ctx.beginPath();
      this.ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${Math.max(0.1, currentAlpha)})`;
      this.ctx.shadowBlur = 8;
      this.ctx.shadowColor = `rgba(${r}, ${g}, ${b}, 0.5)`;
      this.ctx.fill();
      this.ctx.shadowBlur = 0; // Reset
    }
  }

  loop() {
    if (!this.isRunning) return;
    this.draw();
    this.animationFrameId = requestAnimationFrame(() => this.loop());
  }
}

// Instantiate once DOM is ready
document.addEventListener("DOMContentLoaded", () => {
  window.ambientCanvas = new InteractiveBackground("ambient-canvas");
});
