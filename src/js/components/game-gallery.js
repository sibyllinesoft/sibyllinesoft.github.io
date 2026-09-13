/* A progressively enhanced gallery; image links also work without JavaScript. */
document.querySelectorAll('[data-game-gallery]').forEach((gallery) => {
  const thumbs = [...gallery.querySelectorAll('[data-gallery-thumb]')];
  const stage = gallery.querySelector('[data-gallery-open]');
  const image = gallery.querySelector('[data-gallery-image]');
  const dialog = gallery.querySelector('[data-gallery-dialog]');
  const dialogImage = gallery.querySelector('[data-dialog-image]');
  let current = 0;
  let touchStart = null;
  let previousOverflow = '';

  function select(index) {
    current = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[current];
    const src = thumb.href;
    const alt = thumb.querySelector('img').alt;
    stage.href = src;
    image.src = src;
    image.alt = alt;
    gallery.querySelector('[data-gallery-title]').textContent = thumb.dataset.title;
    gallery.querySelector('[data-gallery-caption]').textContent = thumb.dataset.caption;
    gallery.querySelector('[data-gallery-count]').textContent = `${current + 1} / ${thumbs.length}`;
    thumbs.forEach((item, i) => {
      if (i === current) item.setAttribute('aria-current', 'true');
      else item.removeAttribute('aria-current');
    });
    if (dialog.open) updateDialog();
  }

  function updateDialog() {
    dialogImage.src = thumbs[current].href;
    dialogImage.alt = image.alt;
    gallery.querySelector('[data-dialog-title]').textContent = thumbs[current].dataset.title;
    gallery.querySelector('[data-dialog-caption]').textContent = thumbs[current].dataset.caption;
    gallery.querySelector('[data-dialog-count]').textContent = `${current + 1} / ${thumbs.length}`;
  }

  thumbs.forEach((thumb, index) => thumb.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    event.preventDefault();
    select(index);
  }));
  gallery.querySelector('[data-gallery-controls]').hidden = false;
  gallery.querySelectorAll('[data-gallery-prev]').forEach((button) =>
    button.addEventListener('click', () => select(current - 1)));
  gallery.querySelectorAll('[data-gallery-next]').forEach((button) =>
    button.addEventListener('click', () => select(current + 1)));
  gallery.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      select(current + (event.key === 'ArrowRight' ? 1 : -1));
    }
  });

  if (typeof dialog.showModal === 'function') {
    stage.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
      event.preventDefault();
      dialog.showModal();
      updateDialog();
      previousOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
    });
    gallery.querySelector('[data-gallery-close]').addEventListener('click', () => dialog.close());
    dialog.addEventListener('click', (event) => {
      if (event.target === dialog) {
        const bounds = dialog.getBoundingClientRect();
        if (event.clientX < bounds.left || event.clientX > bounds.right ||
            event.clientY < bounds.top || event.clientY > bounds.bottom) dialog.close();
      }
    });
    dialog.addEventListener('close', () => {
      document.body.style.overflow = previousOverflow;
      stage.focus({ preventScroll: true });
    });
  }

  [stage, dialogImage].forEach((surface) => {
    surface.addEventListener('touchstart', (event) => {
      const touch = event.touches[0];
      touchStart = event.touches.length === 1 ? { x: touch.clientX, y: touch.clientY } : null;
    }, { passive: true });
    surface.addEventListener('touchend', (event) => {
      if (!touchStart) return;
      const touch = event.changedTouches[0];
      const dx = touch.clientX - touchStart.x;
      const dy = touch.clientY - touchStart.y;
      touchStart = null;
      if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) select(current + (dx < 0 ? 1 : -1));
    }, { passive: true });
    surface.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
  });
});
