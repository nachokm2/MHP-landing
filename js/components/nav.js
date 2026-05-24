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

  // Active page link
  const page = window.location.pathname.split('/').pop() || 'index.html';
  nav.querySelectorAll('.nav-links a').forEach(link => {
    const href = (link.getAttribute('href') || '').split('#')[0];
    if (href && href === page) link.classList.add('active');
  });
}
