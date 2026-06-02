/* ============================================================
   PORTFOLIO v3 — script.js
   Developer-grade interactions
   ============================================================ */

'use strict';

// ── Utility ───────────────────────────────────────────────────
const $ = (sel) => document.querySelector(sel);
const $$ = (sel) => [...document.querySelectorAll(sel)];
const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
const lerp = (a, b, t) => a + (b - a) * t;

// ═══════════════════════════════════════════════════════════════
//  PRELOADER — Terminal boot sequence
// ═══════════════════════════════════════════════════════════════
(function Preloader() {
  const el      = $('#preloader');
  const body    = $('#termBody');
  const bar     = $('#preloaderProgress');
  const cursor  = $('#termCursor');
  if (!el) return;

  const lines = [
    '> Initializing portfolio...',
    '> Loading modules: react, node, mongodb',
    '> Compiling experience.json',
    '> Building project manifests',
    '> Running performance checks',
    '> Optimizing assets              ✓',
    '> All systems ready.',
    '',
    '> Welcome. — Rahul Kumar',
  ];

  let lineIdx = 0;
  let charIdx = 0;
  let progress = 0;
  let printed = '';

  function printNext() {
    if (lineIdx >= lines.length) {
      setTimeout(dismiss, 500);
      return;
    }

    const line = lines[lineIdx];

    if (charIdx < line.length) {
      printed += line[charIdx];
      charIdx++;
      body.textContent = printed;
      setTimeout(printNext, line.startsWith('>') ? 28 : 18);
    } else {
      printed += '\n';
      body.textContent = printed;
      lineIdx++;
      charIdx = 0;

      const p = Math.round((lineIdx / lines.length) * 100);
      progress = p;
      bar.style.width = p + '%';

      const delay = lineIdx === lines.length ? 200 : 120;
      setTimeout(printNext, delay);
    }
  }

  function dismiss() {
    cursor.style.display = 'none';
    el.classList.add('gone');
    setTimeout(() => {
      el.remove();
      document.body.style.overflow = '';
    }, 700);
  }

  document.body.style.overflow = 'hidden';
  setTimeout(printNext, 300);
})();

// ═══════════════════════════════════════════════════════════════
//  CANVAS — Particle network (hero background)
// ═══════════════════════════════════════════════════════════════
(function ParticleNetwork() {
  const canvas = $('#heroCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  let W, H, particles, mouse = { x: -9999, y: -9999 };
  const COUNT = window.innerWidth > 768 ? 90 : 40;
  const MAX_DIST = 130;
  const MOUSE_DIST = 160;

  class Particle {
    constructor() { this.reset(); }
    reset() {
      this.x  = Math.random() * W;
      this.y  = Math.random() * H;
      this.vx = (Math.random() - 0.5) * 0.35;
      this.vy = (Math.random() - 0.5) * 0.35;
      this.r  = Math.random() * 1.5 + 0.5;
      this.alpha = Math.random() * 0.5 + 0.2;
    }
    update() {
      this.x += this.vx;
      this.y += this.vy;
      if (this.x < 0 || this.x > W) this.vx *= -1;
      if (this.y < 0 || this.y > H) this.vy *= -1;
    }
    draw() {
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0, 229, 255, ${this.alpha})`;
      ctx.fill();
    }
  }

  function resize() {
    W = canvas.width  = canvas.offsetWidth;
    H = canvas.height = canvas.offsetHeight;
  }

  function init() {
    particles = Array.from({ length: COUNT }, () => new Particle());
  }

  function drawConnections() {
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < MAX_DIST) {
          const alpha = (1 - dist / MAX_DIST) * 0.25;
          ctx.beginPath();
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.strokeStyle = `rgba(0, 229, 255, ${alpha})`;
          ctx.lineWidth = 0.6;
          ctx.stroke();
        }
      }
    }
  }

  function drawMouseConnections() {
    particles.forEach(p => {
      const dx = p.x - mouse.x;
      const dy = p.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < MOUSE_DIST) {
        const alpha = (1 - dist / MOUSE_DIST) * 0.5;
        ctx.beginPath();
        ctx.moveTo(p.x, p.y);
        ctx.lineTo(mouse.x, mouse.y);
        ctx.strokeStyle = `rgba(139, 92, 246, ${alpha})`;
        ctx.lineWidth = 0.8;
        ctx.stroke();
      }
    });
  }

  function animate() {
    ctx.clearRect(0, 0, W, H);
    drawConnections();
    drawMouseConnections();
    particles.forEach(p => { p.update(); p.draw(); });
    requestAnimationFrame(animate);
  }

  canvas.addEventListener('mousemove', e => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = e.clientX - rect.left;
    mouse.y = e.clientY - rect.top;
  });
  canvas.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; });

  window.addEventListener('resize', () => { resize(); init(); });

  resize();
  init();
  animate();
})();

// ═══════════════════════════════════════════════════════════════
//  CUSTOM CURSOR
// ═══════════════════════════════════════════════════════════════
(function Cursor() {
  const ring   = $('#cursor');
  const dot    = $('#cursorDot');
  const trail  = $('#cursorTrail');
  if (!ring || !dot || window.matchMedia('(pointer: coarse)').matches) return;

  let mx = 0, my = 0;
  let rx = 0, ry = 0;

  document.addEventListener('mousemove', e => {
    mx = e.clientX;
    my = e.clientY;
    dot.style.left  = mx + 'px';
    dot.style.top   = my + 'px';
    trail.style.left = mx + 'px';
    trail.style.top  = my + 'px';
  });

  function followRing() {
    rx = lerp(rx, mx, 0.12);
    ry = lerp(ry, my, 0.12);
    ring.style.left = rx + 'px';
    ring.style.top  = ry + 'px';
    requestAnimationFrame(followRing);
  }
  followRing();

  const interactives = $$('a, button, [data-tilt], .skill-card, .clink, .nav-link');
  interactives.forEach(el => {
    el.addEventListener('mouseenter', () => ring.classList.add('hovering'));
    el.addEventListener('mouseleave', () => ring.classList.remove('hovering'));
  });

  document.addEventListener('mouseleave', () => {
    ring.style.opacity = '0';
    dot.style.opacity  = '0';
  });
  document.addEventListener('mouseenter', () => {
    ring.style.opacity = '1';
    dot.style.opacity  = '1';
  });
})();

// ═══════════════════════════════════════════════════════════════
//  TYPED TEXT (Hero role)
// ═══════════════════════════════════════════════════════════════
(function TypedText() {
  const el = $('#typedText');
  if (!el) return;

  const roles = [
    'Software Developer',
    'MERN Stack Engineer',
    'React Native Developer',
    'FastAPI + Python',
    'B.Sc. IT Graduate \'26',
    'Open to Opportunities',
  ];

  let ri = 0, ci = 0, del = false, paused = false;

  function tick() {
    if (paused) return;
    const word = roles[ri];

    if (!del) {
      el.textContent = word.substring(0, ++ci);
      if (ci === word.length) {
        paused = true;
        setTimeout(() => { paused = false; del = true; tick(); }, 2000);
        return;
      }
      setTimeout(tick, 70);
    } else {
      el.textContent = word.substring(0, --ci);
      if (ci === 0) {
        del = false;
        ri = (ri + 1) % roles.length;
        setTimeout(tick, 400);
        return;
      }
      setTimeout(tick, 40);
    }
  }

  setTimeout(tick, 1200);
})();

// ═══════════════════════════════════════════════════════════════
//  SCROLL PROGRESS BAR
// ═══════════════════════════════════════════════════════════════
(function ScrollProgress() {
  const bar = $('#scrollProgress');
  if (!bar) return;

  window.addEventListener('scroll', () => {
    const max = document.body.scrollHeight - window.innerHeight;
    bar.style.width = (window.scrollY / max * 100) + '%';
  }, { passive: true });
})();

// ═══════════════════════════════════════════════════════════════
//  NAV — Scroll behaviour + active section
// ═══════════════════════════════════════════════════════════════
(function Nav() {
  const navbar = $('#navbar');
  const links  = $$('.nav-link[data-section]');
  const sections = $$('section[id]');
  const burger = $('#navBurger');
  const navLinks = $('#navLinks');

  // Scrolled style
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 40);

    // Active link
    const sy = window.scrollY + 100;
    sections.forEach(sec => {
      if (sy >= sec.offsetTop && sy < sec.offsetTop + sec.offsetHeight) {
        links.forEach(l => l.classList.toggle('active', l.dataset.section === sec.id));
      }
    });

    // Scroll cue fade
    const cue = $('.hero-scroll-cue');
    if (cue) cue.style.opacity = window.scrollY > 150 ? '0' : '1';
  }, { passive: true });

  // Mobile burger
  if (burger && navLinks) {
    burger.addEventListener('click', () => {
      burger.classList.toggle('open');
      navLinks.classList.toggle('open');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    });
    navLinks.querySelectorAll('.nav-link').forEach(l => {
      l.addEventListener('click', () => {
        burger.classList.remove('open');
        navLinks.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }
})();

// ═══════════════════════════════════════════════════════════════
//  SMOOTH SCROLL
// ═══════════════════════════════════════════════════════════════
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const top = target.getBoundingClientRect().top + window.scrollY - 68;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ═══════════════════════════════════════════════════════════════
//  REVEAL ON SCROLL (IntersectionObserver)
// ═══════════════════════════════════════════════════════════════
(function Reveal() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        // Trigger skill bar
        const fill = e.target.querySelector('.skill-fill');
        if (fill) {
          setTimeout(() => {
            fill.style.width = fill.dataset.width + '%';
          }, 200);
        }
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  $$('.reveal-up').forEach(el => io.observe(el));
})();

// ═══════════════════════════════════════════════════════════════
//  STAT COUNTER ANIMATION
// ═══════════════════════════════════════════════════════════════
(function CountUp() {
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1400;
      const start = performance.now();

      function update(now) {
        const t = clamp((now - start) / dur, 0, 1);
        const ease = 1 - Math.pow(1 - t, 3);
        el.textContent = Math.round(ease * target);
        if (t < 1) requestAnimationFrame(update);
        else el.textContent = target;
      }
      requestAnimationFrame(update);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  $$('[data-count]').forEach(el => io.observe(el));
})();

// ═══════════════════════════════════════════════════════════════
//  3D TILT EFFECT (project cards, exp card, skill cards)
// ═══════════════════════════════════════════════════════════════
(function Tilt() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('[data-tilt]').forEach(el => {
    el.addEventListener('mousemove', e => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const rx = clamp((e.clientY - cy) / (rect.height / 2), -1, 1);
      const ry = clamp((e.clientX - cx) / (rect.width / 2),  -1, 1);
      el.style.transform = `
        perspective(900px)
        rotateX(${-rx * 6}deg)
        rotateY(${ry * 6}deg)
        scale3d(1.015, 1.015, 1.015)
      `;
    });
    el.addEventListener('mouseleave', () => {
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale3d(1,1,1)';
      setTimeout(() => el.style.transition = '', 500);
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
//  MAGNETIC BUTTONS
// ═══════════════════════════════════════════════════════════════
(function MagneticButtons() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.mag-btn').forEach(btn => {
    const text = btn.querySelector('.mag-btn-text');

    btn.addEventListener('mousemove', e => {
      const rect = btn.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top  + rect.height / 2;
      const dx = (e.clientX - cx) * 0.35;
      const dy = (e.clientY - cy) * 0.35;
      btn.style.transform  = `translate(${dx}px, ${dy}px)`;
      if (text) text.style.transform = `translate(${dx * 0.3}px, ${dy * 0.3}px)`;
    });

    btn.addEventListener('mouseleave', () => {
      btn.style.transition  = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
      btn.style.transform   = '';
      if (text) {
        text.style.transition = 'transform 0.5s cubic-bezier(0.16,1,0.3,1)';
        text.style.transform  = '';
      }
      setTimeout(() => {
        btn.style.transition  = '';
        if (text) text.style.transition = '';
      }, 500);
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
//  GLITCH — Occasional random glitch on hero name
// ═══════════════════════════════════════════════════════════════
(function GlitchRandom() {
  const glitches = $$('.glitch');
  setInterval(() => {
    const g = glitches[Math.floor(Math.random() * glitches.length)];
    if (!g) return;
    g.setAttribute('data-glitch', 'on');
    setTimeout(() => g.removeAttribute('data-glitch'), 280);
  }, 4500);
})();

// ═══════════════════════════════════════════════════════════════
//  SKILL CARD — Glow follows mouse
// ═══════════════════════════════════════════════════════════════
(function SkillCardGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.skill-card').forEach(card => {
    const glow = card.querySelector('.skill-card-glow');
    if (!glow) return;
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      glow.style.left = (e.clientX - rect.left - 60) + 'px';
      glow.style.top  = (e.clientY - rect.top  - 60) + 'px';
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
//  PROJECT CARD — Glow follows mouse
// ═══════════════════════════════════════════════════════════════
(function ProjectCardGlow() {
  if (window.matchMedia('(pointer: coarse)').matches) return;

  $$('.project-card, .exp-card').forEach(card => {
    card.addEventListener('mousemove', e => {
      const rect = card.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width  * 100).toFixed(1);
      const y = ((e.clientY - rect.top)  / rect.height * 100).toFixed(1);
      card.style.setProperty('--mx', x + '%');
      card.style.setProperty('--my', y + '%');
    });
  });
})();

// ═══════════════════════════════════════════════════════════════
//  ZIPPYCART — Open two links
// ═══════════════════════════════════════════════════════════════
function openTwoLinks(e) {
  e.preventDefault();
  window.open('https://zippy-cart-backend.onrender.com', '_blank');
  setTimeout(() => window.open('https://zippy-cart-frontend.onrender.com', '_blank'), 2500);
}

// ═══════════════════════════════════════════════════════════════
//  PAGE LOAD — Body class
// ═══════════════════════════════════════════════════════════════
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
