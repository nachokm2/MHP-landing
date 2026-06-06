/**
 * Nav scroll effect + active link highlighting based on current page filename.
 */
export function initNav() {
  const nav = document.getElementById('nav');
  if (!nav) return;

  // Scroll glassmorphism
  if (nav.dataset.static !== undefined) {
    nav.classList.add('sc');
  } else {
    const SCROLL_THRESHOLD = 80;
    const update = () => nav.classList.toggle('sc', window.scrollY > SCROLL_THRESHOLD);
    window.addEventListener('scroll', update, { passive: true });
    update();
  }

  // Hamburger + mobile overlay
  const burger = document.getElementById('navBurger');
  if (burger) {
    // Crear overlay a nivel del body (evita problemas con backdrop-filter del nav)
    const overlay = document.createElement('div');
    overlay.className = 'mobile-overlay';
    const sourceLinks = nav.querySelector('.nav-links');
    if (sourceLinks) overlay.appendChild(sourceLinks.cloneNode(true));
    document.body.appendChild(overlay);

    const close = () => {
      nav.classList.remove('open');
      overlay.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    };

    burger.addEventListener('click', () => {
      const isOpen = !overlay.classList.contains('open');
      nav.classList.toggle('open', isOpen);
      overlay.classList.toggle('open', isOpen);
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    overlay.querySelectorAll('a').forEach(link => link.addEventListener('click', close));
    document.addEventListener('keydown', e => { if (e.key === 'Escape') close(); });
  }

  // Active page link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href && href === page) link.classList.add('active');
  });
}
