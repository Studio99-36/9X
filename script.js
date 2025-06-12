// Hero-Slider mit 5 Slides (Logo + 4 Bilder)
const images = [
  {
    src: "images/Studio 9X Graublau Weiß Minimalistisch Geometrisch Technik Quadrat Logo.png",
    title: "STUDIO 9X",
    subtitle: "CREATIVE PHOTO STUDIO"
  },
  {
    src: "images/image00030.jpeg",
    title: "STUDIO 9X",
    subtitle: "CREATIVE PHOTO STUDIO"
  },
  {
    src: "images/Deslit Stephen smiling.jpg",
    title: "STUDIO 9X",
    subtitle: "CREATIVE PHOTO STUDIO"
  },
  {
    src: "images/whatsapp-image-2.jpg",
    title: "STUDIO 9X",
    subtitle: "CREATIVE PHOTO STUDIO"
  },
  {
    src: "images/image00031.jpeg",
    title: "STUDIO 9X",
    subtitle: "CREATIVE PHOTO STUDIO"
  }
];

let current = 0;

function updateHero() {
  const img = document.querySelector('.hero-bg');
  const title = document.querySelector('.hero-title');
  const subtitle = document.querySelector('.hero-subtitle');
  img.src = images[current].src;
  title.textContent = images[current].title;
  subtitle.textContent = images[current].subtitle;
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
  // Alle Sections
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