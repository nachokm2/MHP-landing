/**
 * MONCON Dashboard — live sensor simulation.
 */

const SENSORS = [
  { base: 86.2,  range: 3,     dec: 1, suffix: '' },
  { base: 72,    range: 6,     dec: 1, suffix: '°C', greenMax: 78 },
  { base: 68,    range: 7,     dec: 0, suffix: '%' },
  { base: 0.872, range: 0.008, dec: 3, suffix: '' },
  { iso: true,   base: [18, 9, 6] },
  { base: 5.0,   range: 1.2,   dec: 1, suffix: ' Bar' },
];

export function initDashboard() {
  const dashes = document.querySelectorAll('.dash');
  console.log('[MONCON] initDashboard — found', dashes.length, 'dashboard(s)');
  dashes.forEach(initDash);
}

function initDash(dash) {
  const items = Array.from(dash.querySelectorAll('.mc'));
  console.log('[MONCON] items found:', items.length);
  if (!items.length) return;

  const state = items.map((mc, i) => {
    const cfg = SENSORS[i] || {};
    const el  = mc.querySelector('.mc-v');
    return {
      el,
      cfg,
      val: cfg.iso ? cfg.base.slice() : (cfg.base || 0),
    };
  });

  // First tick after 1s so user sees it quickly
  setTimeout(() => tickSensors(state), 1000);
  setInterval(() => tickSensors(state), 1800);

  animateWave(dash);
}

/* ── Sensor tick ─────────────────────────────────── */

function tickSensors(state) {
  state.forEach(s => {
    if (!s.el) return;
    // Always update every tick for clear visibility
    flashEl(s.el);

    if (s.cfg.iso) {
      s.val = s.val.map(v =>
        clamp(v + (Math.random() < 0.5 ? 1 : -1), 14, 22)
      );
      s.el.textContent = s.val.join('/');
    } else {
      const next = walk(s.val, s.cfg.base, s.cfg.range);
      countTo(s.el, s.val, next, s.cfg.dec, s.cfg.suffix || '');
      s.val = next;

      if (s.cfg.greenMax != null) {
        const hot = next > s.cfg.greenMax;
        s.el.classList.toggle('g', !hot);
        s.el.classList.toggle('mc-warn', hot);
      }
    }
  });
}

/* ── Flash animation ─────────────────────────────── */

function flashEl(el) {
  el.style.transition = 'none';
  el.style.opacity = '0.4';
  el.style.transform = 'translateY(-3px) scale(1.07)';

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      el.style.transition = 'opacity 0.4s ease, transform 0.4s cubic-bezier(.22,.68,0,1.2)';
      el.style.opacity = '1';
      el.style.transform = 'translateY(0) scale(1)';
    });
  });
}

/* ── Smooth counter ──────────────────────────────── */

function countTo(el, from, to, dec, suffix) {
  const t0 = performance.now();
  const dur = 700;

  function step(now) {
    const p = Math.min((now - t0) / dur, 1);
    const e = 1 - Math.pow(1 - p, 3);
    el.textContent = (from + (to - from) * e).toFixed(dec) + suffix;
    if (p < 1) requestAnimationFrame(step);
  }

  requestAnimationFrame(step);
}

/* ── SVG waveform ────────────────────────────────── */

function animateWave(dash) {
  const paths = dash.querySelectorAll('.wl');
  if (!paths.length) return;

  let t0 = null;

  function frame(now) {
    if (!t0) t0 = now;
    const s = (now - t0) / 1000;

    paths.forEach((path, pi) => {
      const spd = pi === 0 ? 0.7 : 1.15;
      const amp = pi === 0 ? 10  : 7;
      path.setAttribute('d', buildPath(s, spd, amp));
    });

    requestAnimationFrame(frame);
  }

  requestAnimationFrame(frame);
}

function buildPath(s, spd, amp) {
  const N  = 14;
  const dx = 600 / N;
  const pts = [];

  for (let i = 0; i <= N; i++) {
    const x = i * dx;
    const y = 26
      + Math.sin(x * 0.015 + s * spd) * amp
      + Math.sin(x * 0.028 + s * spd * 1.6) * (amp * 0.35);
    pts.push([x, y]);
  }

  let d = 'M' + pts[0][0].toFixed(1) + ',' + pts[0][1].toFixed(1);
  for (let i = 1; i < pts.length; i++) {
    const [px, py] = pts[i - 1];
    const [cx, cy] = pts[i];
    d += ' C' + (px + dx / 3).toFixed(1) + ',' + py.toFixed(1)
       + ' ' + (cx - dx / 3).toFixed(1) + ',' + cy.toFixed(1)
       + ' ' + cx.toFixed(1) + ',' + cy.toFixed(1);
  }

  return d;
}

/* ── Helpers ─────────────────────────────────────── */

function clamp(v, lo, hi) { return Math.max(lo, Math.min(hi, v)); }

function walk(val, base, range) {
  const next = val + (Math.random() - 0.5) * range * 0.8;
  return clamp(next, base - range, base + range);
}
