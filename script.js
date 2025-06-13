// Hero-Slider mit 5 Slides (Logo + 4 Bilder)
const images = [
  { src: "1.png" },
  { src: "images/image00030.jpeg" },
  { src: "images/Deslit Stephen smiling.jpg" },
  { src: "images/whatsapp-image-2.jpg" },
  { src: "images/image00031.jpeg" }
];

let current = 0;
let sliderInterval = null;

function updateHero() {
  const img = document.querySelector('.hero-bg');
  img.src = images[current].src;
}

function nextSlide() {
  current = (current + 1) % images.length;
  updateHero();
}
function prevSlide() {
  current = (current - 1 + images.length) % images.length;
  updateHero();
}

// Auto-Slideshow alle 3 Sekunden
function startAutoSlide() {
  if (sliderInterval) clearInterval(sliderInterval);
  sliderInterval = setInterval(() => {
    nextSlide();
  }, 3000);
}

// Arrow button handlers
document.querySelector('.arrow-left').addEventListener('click', () => {
  prevSlide();
  startAutoSlide();
});
document.querySelector('.arrow-right').addEventListener('click', () => {
  nextSlide();
  startAutoSlide();
});

// Swipe support for mobile (iOS/Android)
let touchStartX = null;
let touchEndX = null;
const heroContainer = document.querySelector('.hero-image-container');
heroContainer.addEventListener('touchstart', function(e) {
  if (e.touches.length === 1) touchStartX = e.touches[0].clientX;
});
heroContainer.addEventListener('touchmove', function(e) {
  if (e.touches.length === 1) touchEndX = e.touches[0].clientX;
});
heroContainer.addEventListener('touchend', function() {
  if (touchStartX !== null && touchEndX !== null) {
    if (touchEndX < touchStartX - 50) {
      nextSlide();
      startAutoSlide();
    }
    if (touchEndX > touchStartX + 50) {
      prevSlide();
      startAutoSlide();
    }
  }
  touchStartX = null;
  touchEndX = null;
});

// SPA Navigation
function showSection(sectionId) {
  const sections = [
    document.getElementById('hero-section'),
    document.getElementById('about'),
    document.getElementById('gallery'),
    document.getElementById('contact')
  ];
  sections.forEach(sec => sec.classList.add('hidden'));
  document.getElementById(sectionId).classList.remove('hidden');
  window.scrollTo({top: 0, behavior: 'smooth'});
}
document.querySelectorAll('.nav-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showSection(btn.getAttribute('data-section'));
  });
});
document.querySelectorAll('.back-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    showSection(btn.getAttribute('data-section'));
  });
});

showSection('hero-section');
updateHero();
startAutoSlide();

// Fade-In on Scroll
function handleScrollFadeIn() {
  const fadeEls = document.querySelectorAll('.fadein-on-scroll, .feature');
  fadeEls.forEach(el => {
    const rect = el.getBoundingClientRect();
    if (rect.top < window.innerHeight - 40) {
      el.classList.add('visible');
    }
  });
}
window.addEventListener('scroll', handleScrollFadeIn);
window.addEventListener('resize', handleScrollFadeIn);
window.addEventListener('DOMContentLoaded', handleScrollFadeIn);
