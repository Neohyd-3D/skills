/* Documento de diseño · comportamiento: tema, índice, maquetas a escala, escenarios y tablas de tokens.
   Genérico: lo propio del producto va en scenes.js (escenarios de maqueta) y en tokens.json. */
(function () {
  const I = window.DocIcons, ic = I.icon, T = window.DOC_TOKENS || {};
  const $ = (s, r) => (r || document).querySelector(s), $$ = (s, r) => [...(r || document).querySelectorAll(s)];
  const root = document.documentElement;

  /* ---------- Tema ---------- */
  try { const t = localStorage.getItem('doc-theme'); if (t) root.dataset.theme = t; } catch (e) { /* sin almacenamiento */ }
  const isDark = () => root.dataset.theme ? root.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
  function paintToggles() { $$('[data-theme-toggle]').forEach(b => { b.innerHTML = ic(isDark() ? 'sun' : 'moon'); b.title = isDark() ? 'Modo día' : 'Modo noche'; }); }
  function setTheme(t) { root.dataset.theme = t; try { localStorage.setItem('doc-theme', t); } catch (e) { /* nada */ } paintToggles(); renderContrast(); }

  /* ---------- Escenarios de maqueta (definidos en scenes.js) ---------- */
  function buildScenes() {
    const S = window.DOC_SCENES || {};
    $$('.ui-app[data-scene]').forEach(app => {
      const fn = S[app.dataset.scene];
      if (!fn) { console.warn('Escenario sin definir en scenes.js:', app.dataset.scene); return; }
      app.insertAdjacentHTML('afterbegin', fn(app, app.dataset, { icon: ic, isDark }));
    });
  }

  /* ---------- Maquetas a escala ---------- */
  function fitScreens() {
    $$('.scr').forEach(s => {
      const app = s.querySelector(':scope > .ui-app'); if (!app) return;
      const W = parseFloat(app.style.width) || 1000, H = parseFloat(app.style.height) || 625;
      const k = s.clientWidth / W;
      app.style.transform = `scale(${k})`;
      s.style.height = H * k + 'px';
    });
  }

  /* ---------- Tablas de tokens (se leen de tokens.json vía tokens.js) ---------- */
  const modes = node => (node.$extensions && node.$extensions.mode) || {};
  const entries = o => Object.entries(o || {}).filter(([k, v]) => !k.startsWith('$') && v && typeof v === 'object');
  function renderTokens() {
    const c = $('#tok-color');
    if (c && T.color) {
      c.innerHTML = entries(T.color).filter(([, v]) => v.$value).map(([k, v]) => {
        const d = modes(v).dark || v.$value;
        return `<tr><td><span class="sw2"><i style="background:${v.$value}"></i><i style="background:${d}"></i></span></td><td><code>--${k}</code></td><td class="mono">${v.$value}<br>${modes(v).dark || '—'}</td><td>${v.$description || ''}</td></tr>`;
      }).join('');
    }
    const g = $('#tok-groups');
    if (g && T.color) {
      g.innerHTML = entries(T.color).filter(([, v]) => !v.$value).map(([grp, v]) => `<h4>${grp}</h4>${v.$description ? `<p class="small muted">${v.$description}</p>` : ''}<div class="catsws">${entries(v).map(([k, t]) => `<div class="catsw" style="--c:${t.$value}"><div class="catbg"><span>${k}</span></div><code>--${grp}-${k}</code><span class="mono">${t.$value}</span></div>`).join('')}</div>`).join('');
    }
    const size = T.size || {};
    const ty = $('#tok-type');
    if (ty) ty.innerHTML = entries(size.text).map(([k, v]) => `<tr><td><code>--text-${k}</code></td><td class="mono">${v.$value}</td><td><span style="font-size:${v.$value};line-height:1.1">${k === 'display' || k === 'large' ? '<span style="font-family:var(--font-display)">Aa Bb Cc</span>' : 'El texto de ejemplo'}</span></td><td>${v.$description || ''}</td></tr>`).join('');
    const sp = $('#tok-space');
    if (sp) sp.innerHTML = entries(size.space).map(([k, v]) => `<div class="spc"><i style="width:${v.$value}"></i><code>--space-${k}</code><span class="mono">${v.$value}</span></div>`).join('');
    const ra = $('#tok-radius');
    if (ra) ra.innerHTML = entries(size.radius).map(([k, v]) => `<div class="rad"><i style="border-radius:${v.$value}"></i><code>--radius-${k}</code><span>${v.$description || v.$value}</span></div>`).join('');
    const sh = $('#tok-shadow');
    if (sh) sh.innerHTML = entries(T.shadow).map(([k, v]) => `<div class="shd"><i style="box-shadow:var(--shadow-${k})"></i><code>--shadow-${k}</code><span>${v.$description || ''}</span></div>`).join('');
    const mo = $('#tok-motion'), m = T.motion || {};
    if (mo) mo.innerHTML = [...entries(m.duration).map(e => ['dur', ...e]), ...entries(m.ease).map(e => ['ease', ...e])].map(([p, k, v]) => `<tr><td><code>--${p}-${k}</code></td><td class="mono">${Array.isArray(v.$value) ? 'cubic-bezier(' + v.$value.join(', ') + ')' : v.$value}</td><td>${v.$description || ''}</td></tr>`).join('');
  }

  /* ---------- Contraste en vivo con el tema activo ---------- */
  function hexOf(str) {
    str = (str || '').trim();
    if (str.startsWith('#')) return str.length === 4 ? '#' + [...str.slice(1)].map(c => c + c).join('') : str.slice(0, 7);
    const mm = str.match(/rgba?\(([^)]+)\)/); if (!mm) return null;
    return '#' + mm[1].split(',').slice(0, 3).map(x => Math.round(parseFloat(x)).toString(16).padStart(2, '0')).join('');
  }
  function lum(h) { const c = [1, 3, 5].map(i => parseInt(h.slice(i, i + 2), 16) / 255).map(v => v <= 0.03928 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4); return 0.2126 * c[0] + 0.7152 * c[1] + 0.0722 * c[2]; }
  const ratio = (a, b) => { const x = lum(a), y = lum(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
  function renderContrast() {
    const box = $('#contrast'); if (!box) return;
    const pairs = ((T.$extensions || {}).doc || {}).contrast || [];
    requestAnimationFrame(() => {
      const cs = getComputedStyle(root), v = n => hexOf(cs.getPropertyValue('--' + n.replace('.', '-')));
      box.innerHTML = pairs.map(([f, b, min]) => {
        const fv = v(f), bv = v(b); if (!fv || !bv) return '';
        const r = ratio(fv, bv), ok = r >= min;
        return `<tr><td><span class="cpair" style="color:${fv};background:${bv}">Aa</span></td><td><code>--${f}</code> sobre <code>--${b}</code></td><td class="mono">${r.toFixed(2)} : 1</td><td>≥ ${min}${min < 4.5 ? ' (no texto)' : ' (texto)'}</td><td class="${ok ? 'ok' : 'ko'}">${ok ? 'Pasa' : 'No pasa'}</td></tr>`;
      }).join('');
      const mode = $('#contrast-mode'); if (mode) mode.textContent = isDark() ? 'modo noche' : 'modo día';
    });
  }

  /* ---------- Iconos ---------- */
  function renderIcons() {
    const box = $('#icons'); if (!box) return;
    box.innerHTML = Object.keys(I.ICONS).sort().map(k => `<div class="icn">${ic(k)}<code>${k}</code><span>${(I.SF || {})[k] || '—'}</span></div>`).join('');
  }

  /* ---------- Índice lateral ---------- */
  function spy() {
    const links = $$('.toc a[href^="#"]'), map = new Map(links.map(a => [a.getAttribute('href').slice(1), a]));
    const obs = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting) { links.forEach(a => a.classList.remove('on')); const a = map.get(e.target.id); if (a) a.classList.add('on'); }
    }), { rootMargin: '-10% 0px -80% 0px' });
    map.forEach((a, id) => { const el = document.getElementById(id); if (el) obs.observe(el); });
  }

  document.addEventListener('DOMContentLoaded', () => {
    buildScenes();
    I.hydrate();
    paintToggles();
    $$('[data-theme-toggle]').forEach(b => b.addEventListener('click', () => setTheme(isDark() ? 'light' : 'dark')));
    renderTokens(); renderIcons(); renderContrast();
    fitScreens(); spy();
    // Las maquetas cambian de alto al escalarse: recolocar el ancla del enlace (#S-12…)
    if (location.hash) { const t = document.getElementById(decodeURIComponent(location.hash.slice(1))); if (t) requestAnimationFrame(() => t.scrollIntoView({ behavior: 'instant' })); }
    new ResizeObserver(fitScreens).observe(document.body);
    matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => { paintToggles(); renderContrast(); });
    const tg = $('#toc-toggle'); if (tg) tg.onclick = () => document.body.classList.toggle('toc-open');
    $$('.toc a').forEach(a => a.addEventListener('click', () => document.body.classList.remove('toc-open')));
  });
})();
