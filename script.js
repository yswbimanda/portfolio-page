// ── Scroll reveal
const revealEls = document.querySelectorAll(
  '.glass-card, .section-eyebrow, .section-title, .hero-content > *'
);
revealEls.forEach(el => el.classList.add('reveal'));

const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// Hero elements visible immediately
document.querySelectorAll('.hero-content > *').forEach(el => {
  el.classList.add('visible');
});

// ── Nav scroll shadow
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(7, 9, 15, 0.92)'
    : 'rgba(7, 9, 15, 0.72)';
});

// ── Smooth scroll for nav links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});

// ── Lightbox
function openLightbox(figure) {
  const img = figure.querySelector('img');
  const caption = figure.querySelector('figcaption');
  document.getElementById('lightboxImg').src = img.src;
  document.getElementById('lightboxImg').alt = img.alt;
  document.getElementById('lightboxCaption').textContent = caption ? caption.textContent : '';
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
