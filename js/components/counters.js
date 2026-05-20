/**
 * Animated counters for .stats-bar sections.
 * Triggers on IntersectionObserver — counts up once when visible.
 */

export function initCounters() {
  const bars = document.querySelectorAll('.stats-bar');
  if (!bars.length) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      observer.unobserve(entry.target);
      entry.target.querySelectorAll('.stat-n').forEach(animateCounter);
    });
  }, { threshold: 0.4 });

  bars.forEach(bar => observer.observe(bar));
}

function animateCounter(el) {
  const raw = el.textContent.trim();
  // Match optional prefix like "+", digits, optional suffix like "+"
  const m = raw.match(/^([^0-9]*)(\d+)([^0-9]*)$/);
  if (!m) return;

  const [, pre, numStr, suf] = m;
  const target   = parseInt(numStr, 10);
  const duration = 1600;
  const t0       = performance.now();

  el.textContent = pre + '0' + suf;

  function step(now) {
    const p = Math.min((now - t0) / duration, 1);
    const e = 1 - Math.pow(1 - p, 3); // ease-out cubic
    el.textContent = pre + Math.round(e * target) + suf;
    if (p < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}
