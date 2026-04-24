// script.js - interactive particle field, shock mode, contact form, smooth scroll
(function() {
  // ----- PARTICLE FIELD CANVAS -----
  const canvas = document.getElementById('particle-field');
  let ctx = canvas.getContext('2d');
  let w, h;
  let particlesArray = [];

  function resizeCanvas() {
    w = window.innerWidth;
    h = window.innerHeight;
    canvas.width = w;
    canvas.height = h;
  }

  class DynamicParticle {
    constructor() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 0.45;
      this.vy = (Math.random() - 0.5) * 0.25;
      this.radius = Math.random() * 1.8 + 0.6;
      this.alpha = Math.random() * 0.6 + 0.2;
      this.hue = 170 + Math.random() * 50;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0) this.x = w;
      if (this.x > w) this.x = 0;
      if (this.y < 0) this.y = h;
      if (this.y > h) this.y = 0;
      this.alpha = 0.3 + Math.sin(Date.now() * 0.0012 * this.radius) * 0.2;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
      ctx.fillStyle = `hsla(${this.hue}, 85%, 65%, ${this.alpha})`;
      ctx.shadowBlur = 4;
      ctx.shadowColor = '#0ff';
      ctx.fill();
    }
  }

  function initParticles(count = 190) {
    particlesArray = [];
    for (let i = 0; i < count; i++) particlesArray.push(new DynamicParticle());
  }

  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, w, h);
    ctx.shadowBlur = 0;
    for (let p of particlesArray) {
      p.update();
      p.draw();
    }
    requestAnimationFrame(animateParticles);
  }

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles(200);
  });
  resizeCanvas();
  initParticles(210);
  animateParticles();

  // ----- SHOCK MODE (GLITCH REALITY) -----
  const shockBtn = document.getElementById('shockSurprise');
  if (shockBtn) {
    shockBtn.addEventListener('click', (e) => {
      e.preventDefault();
      // Flash effect
      document.body.style.transition = '0.08s';
      document.body.style.backgroundColor = '#0affd0';
      document.body.style.color = '#000000';
      setTimeout(() => {
        document.body.style.backgroundColor = '';
        document.body.style.color = '';
      }, 180);
      
      // Glitch text on headings
      const allHead = document.querySelectorAll('h1, .section-title, .card-supernova h3');
      allHead.forEach(el => {
        const original = el.innerText;
        if (original.length > 2) {
          const glitched = original.split('').map(c => Math.random() > 0.92 ? '⬚' : c).join('');
          el.innerText = glitched;
          setTimeout(() => { el.innerText = original; }, 200);
        }
      });
      
      // Radial shockwave
      const waveDiv = document.createElement('div');
      waveDiv.style.position = 'fixed';
      waveDiv.style.top = '50%';
      waveDiv.style.left = '50%';
      waveDiv.style.width = '20px';
      waveDiv.style.height = '20px';
      waveDiv.style.background = 'radial-gradient(circle, cyan, transparent)';
      waveDiv.style.borderRadius = '50%';
      waveDiv.style.transform = 'translate(-50%, -50%)';
      waveDiv.style.pointerEvents = 'none';
      waveDiv.style.zIndex = '9999';
      document.body.appendChild(waveDiv);
      let scaleVal = 1;
      let intervalShock = setInterval(() => {
        scaleVal += 32;
        waveDiv.style.width = scaleVal + 'px';
        waveDiv.style.height = scaleVal + 'px';
        waveDiv.style.opacity = 1 - scaleVal / 750;
        if (scaleVal > 700) {
          clearInterval(intervalShock);
          waveDiv.remove();
        }
      }, 16);
    });
  }

  // ----- CONTACT FORM HANDLER -----
  const sendWaveBtn = document.getElementById('submitWaveBtn');
  const feedbackSpan = document.getElementById('messageFeedback');
  if (sendWaveBtn) {
    sendWaveBtn.addEventListener('click', () => {
      const name = document.getElementById('userName')?.value.trim();
      const email = document.getElementById('userMail')?.value.trim();
      const msg = document.getElementById('userMsg')?.value.trim();
      if (name && email && msg) {
        feedbackSpan.innerHTML = `✨ Thanks ${name}, your quantum message reached Sailendra. He'll reply within 24h across dimensions. ✨`;
        feedbackSpan.style.color = '#7affdd';
        document.getElementById('userName').value = '';
        document.getElementById('userMail').value = '';
        document.getElementById('userMsg').value = '';
      } else {
        feedbackSpan.innerHTML = '⚠️ Please fill name, email & message to initiate hyperlink ⚠️';
        feedbackSpan.style.color = '#ffbc7a';
      }
      setTimeout(() => {
        if(feedbackSpan) setTimeout(() => feedbackSpan.style.opacity = '0.9', 1800);
      }, 200);
    });
  }

  // ----- SMOOTH SCROLL NAVIGATION -----
  document.querySelectorAll('.quantum-dock a, .btn-neon').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href !== '#' && href.startsWith('#')) {
        e.preventDefault();
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);
        if (targetElement) {
          targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });

  // ----- MOUSE TRAIL (micro-interaction) -----
  let mouseTrailTimeout;
  document.addEventListener('mousemove', (e) => {
    // throttle trail a bit
    if (mouseTrailTimeout) return;
    mouseTrailTimeout = setTimeout(() => {
      const dot = document.createElement('div');
      dot.style.position = 'fixed';
      dot.style.left = e.clientX + 'px';
      dot.style.top = e.clientY + 'px';
      dot.style.width = '5px';
      dot.style.height = '5px';
      dot.style.background = 'radial-gradient(ellipse, cyan, #0affaa)';
      dot.style.borderRadius = '50%';
      dot.style.pointerEvents = 'none';
      dot.style.zIndex = '99999';
      dot.style.filter = 'blur(1px)';
      document.body.appendChild(dot);
      setTimeout(() => dot.remove(), 100);
      mouseTrailTimeout = null;
    }, 20);
  });

  // subtle dynamic year update (optional)
  const footer = document.querySelector('footer span');
  if (footer) {
    const currentYear = new Date().getFullYear();
    if (!footer.innerText.includes('2025')) {
      footer.innerText = footer.innerText.replace('2025', currentYear);
    }
  }
  
  console.log('⚡ Sailendra Khatiwada Portfolio — Fully modular | Projects integrated: E‑comm, Dashboard, Blog, Music Player, TextUtils, MindCare, Personal details loaded');
})();