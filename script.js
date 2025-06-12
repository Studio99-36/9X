// Hero-Slider mit 5 Slides (Logo + 4 Bilder)
const images = [
  {
    src: "1.png",
    showLogo: true
  },
  {
    src: "images/image00030.jpeg",
    showLogo: false
  },
  {
    src: "images/Deslit Stephen smiling.jpg",
    showLogo: false
  },
  {
    src: "images/whatsapp-image-2.jpg",
    showLogo: false
  },
  {
    src: "images/image00031.jpeg",
    showLogo: false
  }
];

let current = 0;

function updateHero() {
  const img = document.querySelector('.hero-bg');
  const logo = document.querySelector('.hero-logo-center');
  img.src = images[current].src;
  if (images[current].showLogo) {
    logo.style.display = "block";
  } else {
    logo.style.display = "none";
  }
}
document.querySelector('.arrow-left').addEventListener('click', () => {
  current = (current - 1 + images.length) % images.length;
  updateHero();
});
document.querySelector('.arrow-right').addEventListener('click', () => {
  current = (current + 1) % images.length;
  updateHero();
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
// On load: nur Hero anzeigen
showSection('hero-section');
updateHero();

// Fade-In on Scroll
function handleScrollFadeIn() {
  const fadeEls = document.querySelectorAll('.fadein-on-scroll');
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
