// ── Scroll reveal
const revealEls = document.querySelectorAll('.glass-card, .section-eyebrow, .section-title');
revealEls.forEach(el => el.classList.add('reveal'));
const observer = new IntersectionObserver(
  entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
  { threshold: 0.12 }
);
revealEls.forEach(el => observer.observe(el));

// Hero visible immediately
document.querySelectorAll('.hero-content > *').forEach(el => { el.style.opacity = 1; });

// ── Nav scroll
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.style.background = window.scrollY > 40
    ? 'rgba(7, 9, 15, 0.92)'
    : 'rgba(7, 9, 15, 0.72)';
});

// ── Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
});

// ── Panel system (supports multiple projects)
function openPanel(id) {
  document.getElementById('overlay-' + id).classList.add('open');
  document.getElementById('panel-' + id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closePanel(id) {
  document.getElementById('overlay-' + id).classList.remove('open');
  document.getElementById('panel-' + id).classList.remove('open');
  document.body.style.overflow = '';
}

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

// ── Keyboard close — closes any open panel or lightbox
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  closeLightbox();
  document.querySelectorAll('.panel.open').forEach(panel => {
    closePanel(panel.id.replace('panel-', ''));
  });
});
