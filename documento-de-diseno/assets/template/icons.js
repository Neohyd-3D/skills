/* Iconos del producto. Trazo 1.6 sobre retícula 24, terminaciones redondeadas, al estilo SF Symbols.
   Añade o quita iconos según el producto. SF (abajo) asocia cada icono con su equivalente nativo, si lo hay. */
(function () {
  const ICONS = {
    sidebar: '<rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M9 4.5v15"/>',
    inspector: '<rect x="3" y="4.5" width="18" height="15" rx="3"/><path d="M15 4.5v15"/>',
    plus: '<path d="M12 5v14M5 12h14"/>',
    minus: '<path d="M5 12h14"/>',
    photo: '<rect x="3" y="5" width="18" height="14" rx="2.5"/><circle cx="8.5" cy="10" r="1.6"/><path d="M21 16l-5-5-8 8"/>',
    video: '<rect x="3" y="6" width="13" height="12" rx="2.5"/><path d="M16 10.5l5-3v9l-5-3z"/>',
    link: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/>',
    music: '<path d="M9 18V6l11-2v12"/><circle cx="6.5" cy="18" r="2.5"/><circle cx="17.5" cy="16" r="2.5"/>',
    palette: '<path d="M12 3a9 9 0 1 0 0 18c1.1 0 1.6-.9 1.2-1.8-.5-1-.1-2.2 1.1-2.2H17a4 4 0 0 0 4-4c0-5.5-4-10-9-10z"/><circle cx="7.5" cy="11" r="1.1"/><circle cx="10" cy="7" r="1.1"/><circle cx="15" cy="7.5" r="1.1"/>',
    note: '<path d="M5 4h14v11l-5 5H5z"/><path d="M14 20v-5h5"/>',
    text: '<path d="M5 6h14M12 6v13M9 19h6"/>',
    type: '<path d="M3 19l5-14h1.5l5 14M5.2 13.5h7.6"/><path d="M16 12.5a2.6 2.6 0 0 1 5 1V19M21 16h-2.6a1.7 1.7 0 0 0 0 3.4c1.3 0 2.6-.8 2.6-2.4"/>',
    cursor: '<path d="M5.5 3.5l5.8 16.2 2.4-6.6 6.6-2.4z"/>',
    hand: '<path d="M8 13V6.5a1.5 1.5 0 0 1 3 0V12M11 11V4.5a1.5 1.5 0 0 1 3 0V11M14 11V5.5a1.5 1.5 0 0 1 3 0V13M17 9.5a1.5 1.5 0 0 1 3 0V15a6 6 0 0 1-6 6h-1.5a6 6 0 0 1-4.9-2.5L4.2 14a1.5 1.5 0 0 1 2.3-1.9L8 14"/>',
    share: '<path d="M12 14V3M8 7l4-4 4 4"/><path d="M7 10H6a2 2 0 0 0-2 2v7a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-7a2 2 0 0 0-2-2h-1"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2.5v2M12 19.5v2M4.6 4.6L6 6M18 18l1.4 1.4M2.5 12h2M19.5 12h2M4.6 19.4L6 18M18 6l1.4-1.4"/>',
    moon: '<path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/>',
    search: '<circle cx="11" cy="11" r="6.5"/><path d="M16 16l4.5 4.5"/>',
    sparkles: '<path d="M11 3.5l1.9 5 5 1.9-5 1.9-1.9 5-1.9-5-5-1.9 5-1.9z"/><path d="M18.5 15l.9 2.3 2.3.9-2.3.9-.9 2.3-.9-2.3-2.3-.9 2.3-.9z"/>',
    doc: '<path d="M6 3h8l4 4v14H6z"/><path d="M14 3v4h4M9 12h6M9 16h6"/>',
    chevron: '<path d="M9.5 6l6 6-6 6"/>',
    chevdown: '<path d="M6 9.5l6 6 6-6"/>',
    back: '<path d="M14.5 6l-6 6 6 6"/>',
    fit: '<path d="M4 9V4h5M20 9V4h-5M4 15v5h5M20 15v5h-5"/>',
    info: '<circle cx="12" cy="12" r="9"/><path d="M12 11v6M12 7.6v.2"/>',
    tag: '<path d="M3.5 12.2V4.5a1 1 0 0 1 1-1h7.7l8.3 8.3a1.4 1.4 0 0 1 0 2l-6.7 6.7a1.4 1.4 0 0 1-2 0z"/><circle cx="8" cy="8" r="1.3"/>',
    close: '<path d="M6.5 6.5l11 11M17.5 6.5l-11 11"/>',
    folder: '<path d="M3 7.5A2.5 2.5 0 0 1 5.5 5h3.6l2 2h7.4A2.5 2.5 0 0 1 21 9.5v8a2.5 2.5 0 0 1-2.5 2.5h-13A2.5 2.5 0 0 1 3 17.5z"/>',
    grid: '<rect x="4" y="4" width="7" height="7" rx="1.5"/><rect x="13" y="4" width="7" height="7" rx="1.5"/><rect x="4" y="13" width="7" height="7" rx="1.5"/><rect x="13" y="13" width="7" height="7" rx="1.5"/>',
    ellipsis: '<circle cx="6" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.3" fill="currentColor" stroke="none"/><circle cx="18" cy="12" r="1.3" fill="currentColor" stroke="none"/>',
    import: '<path d="M12 3v11M8 10l4 4 4-4"/><path d="M4 15v3.5A2.5 2.5 0 0 0 6.5 21h11a2.5 2.5 0 0 0 2.5-2.5V15"/>',
    globe: '<circle cx="12" cy="12" r="9"/><path d="M3 12h18M12 3c3 3.4 3 14.6 0 18M12 3c-3 3.4-3 14.6 0 18"/>',
    eye: '<path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12z"/><circle cx="12" cy="12" r="3"/>',
    trash: '<path d="M4 7h16M9.5 7V4.5h5V7M6.5 7l1 13h9l1-13"/>',
    layers: '<path d="M12 3.5l9 4.8-9 4.8-9-4.8z"/><path d="M3 12.5l9 4.8 9-4.8"/><path d="M3 16.5l9 4.8 9-4.8" opacity=".5"/>',
    list: '<path d="M9 6h11M9 12h11M9 18h11"/><circle cx="4.5" cy="6" r="1" fill="currentColor"/><circle cx="4.5" cy="12" r="1" fill="currentColor"/><circle cx="4.5" cy="18" r="1" fill="currentColor"/>',
    phone: '<rect x="7" y="2.5" width="10" height="19" rx="2.5"/><path d="M11 18.5h2"/>',
    desktop: '<rect x="2.5" y="4" width="19" height="13" rx="2"/><path d="M9 21h6M12 17v4"/>',
    clock: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
    refresh: '<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4.5V11h-6.5"/>',
    pen: '<path d="M4 20l4.2-1 10.6-10.6a2 2 0 0 0-3-3L5.2 16z"/><path d="M14 7l3 3"/>',
    lock: '<rect x="5" y="10.5" width="14" height="10" rx="2.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>',
    warning: '<path d="M12 4l9 16H3z"/><path d="M12 10v4.5M12 17.4v.2"/>',
    check: '<path d="M5 12.5l4.5 4.5L19 7.5"/>',
    checkcircle: '<circle cx="12" cy="12" r="9"/><path d="M8 12.3l2.8 2.8L16.2 9.6"/>',
    wifioff: '<path d="M3 3l18 18"/><path d="M8.5 16.2a5 5 0 0 1 7 0M5 12.6a10 10 0 0 1 4.2-2.4M19 12.6a10 10 0 0 0-3-2M2 9a14 14 0 0 1 4.5-2.9M22 9a14 14 0 0 0-10-3.9"/><circle cx="12" cy="19.5" r=".8" fill="currentColor"/>',
    play: '<path d="M8 5.5v13l10.5-6.5z" fill="currentColor"/>',
    pause: '<path d="M8.5 5.5v13M15.5 5.5v13" stroke-width="3"/>',
    gear: '<circle cx="12" cy="12" r="3"/><path d="M12 2.8v2.4M12 18.8v2.4M2.8 12h2.4M18.8 12h2.4M5.5 5.5l1.7 1.7M16.8 16.8l1.7 1.7M5.5 18.5l1.7-1.7M16.8 7.2l1.7-1.7"/>',
    key: '<circle cx="8" cy="15" r="4"/><path d="M11 12l8.5-8.5M16.5 6.5l2.5 2.5M14.5 8.5l2 2"/>',
    cpu: '<rect x="6" y="6" width="12" height="12" rx="2"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><path d="M9.5 3v3M14.5 3v3M9.5 18v3M14.5 18v3M3 9.5h3M3 14.5h3M18 9.5h3M18 14.5h3"/>',
    undo: '<path d="M9 14L4 9l5-5"/><path d="M4 9h10.5a5.5 5.5 0 0 1 0 11H11"/>',
    eyedropper: '<path d="M14.5 5.5l4 4M17 3.5a2 2 0 0 1 2.8 2.8l-2.3 2.3-2.8-2.8z"/><path d="M15.2 8.8L7 17l-3 1 1-3 8.2-8.2"/>',
    arrow: '<path d="M5 12h14M13 6l6 6-6 6"/>',
    external: '<path d="M14 4h6v6M20 4l-9 9"/><path d="M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10"/>',
    copy: '<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V5.5A1.5 1.5 0 0 0 14.5 4h-9A1.5 1.5 0 0 0 4 5.5v9A1.5 1.5 0 0 0 5.5 16H8"/>',
    diff: '<path d="M7 4v10M12 9H2M17 10v10M22 15h-10"/>',
    archive: '<rect x="3" y="4" width="18" height="5" rx="1.5"/><path d="M5 9v9.5A1.5 1.5 0 0 0 6.5 20h11a1.5 1.5 0 0 0 1.5-1.5V9M10 13h4"/>',
    filter: '<path d="M4 5h16l-6 7.5V19l-4-2v-4.5z"/>',
    accessibility: '<circle cx="12" cy="4.5" r="1.6"/><path d="M5 8.5l7 1.5 7-1.5M12 10v4.5M12 14.5L9 21M12 14.5l3 6.5"/>',
    keyboard: '<rect x="2.5" y="6" width="19" height="12" rx="2.5"/><path d="M6.5 10h.1M10 10h.1M13.5 10h.1M17 10h.1M8 14h8"/>',
    stack: '<rect x="4" y="9" width="16" height="11" rx="2.5"/><path d="M6.5 6h11M9 3h6"/>',
    broken: '<path d="M10 14a4 4 0 0 0 5.66 0l3-3a4 4 0 0 0-5.66-5.66l-1 1"/><path d="M14 10a4 4 0 0 0-5.66 0l-3 3a4 4 0 0 0 5.66 5.66l1-1"/><path d="M4 4l16 16"/>'
  };
  const icon = (name, cls) =>
    `<span class="ui-ico${cls ? ' ' + cls : ''}" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${ICONS[name] || ''}</svg></span>`;
  function hydrate(root) {
    (root || document).querySelectorAll('i[data-icon]').forEach(el => {
      const t = document.createElement('template');
      t.innerHTML = icon(el.dataset.icon, el.className);
      el.replaceWith(t.content.firstChild);
    });
  }
  // Equivalencias con SF Symbols (o Material Symbols); se muestran en la rejilla de iconos del documento
  const SF = { plus: 'plus', minus: 'minus', search: 'magnifyingglass', share: 'square.and.arrow.up', trash: 'trash', close: 'xmark', check: 'checkmark', warning: 'exclamationmark.triangle', info: 'info.circle', gear: 'gearshape', folder: 'folder', doc: 'doc', photo: 'photo', video: 'video', link: 'link', music: 'music.note', tag: 'tag', eye: 'eye', sun: 'sun.max', moon: 'moon', lock: 'lock', refresh: 'arrow.clockwise', undo: 'arrow.uturn.backward', chevron: 'chevron.right', chevdown: 'chevron.down', back: 'chevron.left', sparkles: 'sparkles', import: 'square.and.arrow.down', copy: 'doc.on.doc', clock: 'clock', key: 'key', wifioff: 'wifi.slash' };
  window.DocIcons = { ICONS, SF, icon, hydrate };
})();
