/* ═══════════════════════════════════════════════════════
   STUDIO 9X — Script
   ═══════════════════════════════════════════════════════ */

// ── Dark Mode Toggle ──
(function () {
  const toggle = document.querySelector('[data-theme-toggle]');
  const root = document.documentElement;
  const moonIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
  const sunIcon = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`;

  let theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  root.setAttribute('data-theme', theme);
  if (toggle) toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;

  if (toggle) {
    toggle.addEventListener('click', () => {
      theme = theme === 'dark' ? 'light' : 'dark';
      root.setAttribute('data-theme', theme);
      toggle.innerHTML = theme === 'dark' ? sunIcon : moonIcon;
      toggle.setAttribute('aria-label', 'Switch to ' + (theme === 'dark' ? 'light' : 'dark') + ' mode');
    });
  }
})();

// ── SPA Navigation ──
const pages = document.querySelectorAll('.page');
const navBtns = document.querySelectorAll('.nav-btn');

function showPage(id) {
  pages.forEach(p => p.classList.remove('active'));
  navBtns.forEach(b => b.classList.remove('active'));
  const target = document.getElementById(id);
  if (target) {
    target.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Re-trigger reveal for newly shown sections
    setTimeout(checkReveal, 100);
  }
  navBtns.forEach(b => {
    if (b.getAttribute('data-section') === id) b.classList.add('active');
  });
}

navBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    showPage(btn.getAttribute('data-section'));
    // Close mobile menu
    navLinksEl.classList.remove('open');
    hamburger.classList.remove('open');
  });
});

showPage('home');

// ── Mobile Hamburger ──
const hamburger = document.getElementById('hamburger');
const navLinksEl = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksEl.classList.toggle('open');
});

// ── Header scroll effect ──
const header = document.getElementById('site-header');
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 40);
}, { passive: true });

// ── Hero Slider ──
const slides = document.querySelectorAll('.hero-slide');
const dotsContainer = document.getElementById('hero-dots');
let currentSlide = 0;
let slideTimer;

// Build dots
slides.forEach((_, i) => {
  const dot = document.createElement('button');
  dot.className = 'hero-dot' + (i === 0 ? ' active' : '');
  dot.setAttribute('aria-label', `Slide ${i + 1}`);
  dot.addEventListener('click', () => goToSlide(i));
  dotsContainer.appendChild(dot);
});

function goToSlide(n) {
  slides[currentSlide].classList.remove('active');
  document.querySelectorAll('.hero-dot')[currentSlide]?.classList.remove('active');
  currentSlide = (n + slides.length) % slides.length;
  slides[currentSlide].classList.add('active');
  document.querySelectorAll('.hero-dot')[currentSlide]?.classList.add('active');
}

function startSlider() {
  clearInterval(slideTimer);
  slideTimer = setInterval(() => goToSlide(currentSlide + 1), 4500);
}

startSlider();

// Touch swipe on hero
const heroEl = document.querySelector('.hero');
let touchX = null;
heroEl.addEventListener('touchstart', e => { touchX = e.touches[0].clientX; }, { passive: true });
heroEl.addEventListener('touchend', e => {
  if (touchX === null) return;
  const dx = e.changedTouches[0].clientX - touchX;
  if (Math.abs(dx) > 50) {
    goToSlide(currentSlide + (dx < 0 ? 1 : -1));
    startSlider();
  }
  touchX = null;
}, { passive: true });

// ── Scroll Reveal ──
function checkReveal() {
  const els = document.querySelectorAll('.page.active .reveal-fade:not(.visible)');
  const vp = window.innerHeight;
  els.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < vp - 60) el.classList.add('visible');
  });
}

window.addEventListener('scroll', checkReveal, { passive: true });
window.addEventListener('resize', checkReveal, { passive: true });
checkReveal();

// ── Impressum Toggle ──
const impressumToggle = document.querySelector('.impressum-toggle');
const impressumContent = document.getElementById('impressum-content');
if (impressumToggle && impressumContent) {
  impressumToggle.addEventListener('click', () => {
    const open = !impressumContent.classList.contains('hidden');
    impressumContent.classList.toggle('hidden', open);
    impressumToggle.setAttribute('aria-expanded', String(!open));
    if (!open) impressumContent.focus();
  });
}
