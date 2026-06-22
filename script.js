/* ═══════════════════════════════════════════════════════════
   NAV — mobile toggle + scroll shadow
═══════════════════════════════════════════════════════════ */
const navToggle = document.getElementById('navToggle');
const navLinks  = document.getElementById('navLinks');
const header    = document.querySelector('.site-header');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.classList.toggle('open', isOpen);
  navToggle.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  });
});

// Sticky header shadow on scroll
window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });


/* ═══════════════════════════════════════════════════════════
   SCROLL REVEAL
═══════════════════════════════════════════════════════════ */
const revealElements = document.querySelectorAll(
  '.project-card, .stat-card, .skill-group, .about__content, .hero__text, .hero__visual, .contact__link'
);

revealElements.forEach(el => el.classList.add('reveal'));

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger children within grids
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, (entry.target.dataset.delay || 0));
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

// Add stagger delays to grid children
document.querySelectorAll('.projects__grid, .skills__grid, .about__stats').forEach(grid => {
  Array.from(grid.children).forEach((child, i) => {
    child.dataset.delay = i * 80;
  });
});

revealElements.forEach(el => revealObserver.observe(el));


/* ═══════════════════════════════════════════════════════════
   ACTIVE NAV LINK on scroll
═══════════════════════════════════════════════════════════ */
const sections = document.querySelectorAll('section[id]');
const navAnchors = document.querySelectorAll('.nav__links a');

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        navAnchors.forEach(a => a.classList.remove('active'));
        const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
        if (active) active.classList.add('active');
      }
    });
  },
  { rootMargin: '-40% 0px -55% 0px' }
);

sections.forEach(s => sectionObserver.observe(s));


/* ═══════════════════════════════════════════════════════════
   CURRENT YEAR in footer
═══════════════════════════════════════════════════════════ */
document.querySelectorAll('footer p').forEach(p => {
  p.innerHTML = p.innerHTML.replace('2026', new Date().getFullYear());
});
