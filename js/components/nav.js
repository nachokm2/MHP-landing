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

  // Hamburger toggle
  const burger = document.getElementById('navBurger');
  if (burger) {
    burger.addEventListener('click', () => {
      const isOpen = nav.classList.toggle('open');
      burger.setAttribute('aria-expanded', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    nav.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', e => {
      if (nav.classList.contains('open') && !nav.contains(e.target)) {
        nav.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Active page link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href && href === page) link.classList.add('active');
  });
}
