// Shared rotating hero banner controller
// Uses HTML-provided `.hero-data` content but keeps the richer
// blur/fade timing from the homepage variant.
(function() {
  // Guard against double-init when multiple scripts load
  if (window.__heroRotatorInitialized) return;
  window.__heroRotatorInitialized = true;

  class HeroRotator {
    constructor(opts = {}) {
      this.container = document.querySelector(opts.containerSelector || '.rotating-banners');
      this.titleElement = document.querySelector(opts.titleSelector || '.hero-content h1, .hero-title');
      this.rotationInterval = null;
      this.isAnimating = false;
      this.currentTitleIndex = 0;
      this.currentSubtitleIndex = 0;
      this.titleSubtitlePairs = this.buildPairsFromHTML();
      this.rotationMs = this.getRotationInterval();
    }

    getRotationInterval() {
      // Allow per-page override via data attribute on the container
      if (this.container && this.container.dataset && this.container.dataset.rotationInterval) {
        const parsed = parseInt(this.container.dataset.rotationInterval, 10);
        if (!Number.isNaN(parsed) && parsed > 0) return parsed;
      }
      return 4000; // default 4s between subtitle swaps (2 subtitles => 8s per title)
    }

    buildPairsFromHTML() {
      const heroData = document.querySelector('.hero-data');
      if (!heroData) return [];

      const groups = heroData.querySelectorAll('.title-subtitle-group');
      const pairs = [];

      groups.forEach(group => {
        const titleEl = group.querySelector('.title');
        const subtitleEls = group.querySelectorAll('.subtitle');
        const title = titleEl ? titleEl.textContent.trim() : '';
        const rawSubtitles = subtitleEls.length
          ? Array.from(subtitleEls).map(el => el.textContent.trim()).filter(Boolean)
          : [];
        // Ensure at least two subtitles so titles don't advance every tick when only one is provided
        const subtitles = rawSubtitles.length === 1
          ? [rawSubtitles[0], rawSubtitles[0]]
          : rawSubtitles;

        if (title && subtitles.length) {
          pairs.push({ title, subtitles });
        }
      });

      return pairs;
    }

    init() {
      if (!this.container || !this.titleSubtitlePairs.length) return;

      const firstPair = this.titleSubtitlePairs[0];

      // Build initial banners from first title
      this.rebuildSubtitleContainers(firstPair.subtitles);

      // Initialize title state
      if (this.titleElement) {
        // Start with the first title from the HTML data, not whatever was pre-rendered
        this.titleElement.textContent = firstPair.title;
        this.titleElement.classList.remove('blurring-in', 'blurring-out');
        this.titleElement.classList.add('normal');
      }

      // Start with first subtitle visible
      this.fadeInContainer(this.container.children[0]);

      // Begin rotation
      this.startRotation();
    }

    rebuildSubtitleContainers(subtitles) {
      this.container.innerHTML = '';

      subtitles.forEach((text, index) => {
        const bannerContainer = document.createElement('div');
        bannerContainer.className = 'banner-container';
        bannerContainer.style.display = index === 0 ? 'flex' : 'none';
        if (index === 0) bannerContainer.classList.add('active');

        const bannerText = document.createElement('span');
        bannerText.className = 'banner-text';
        bannerText.setAttribute('data-text', text);
        bannerContainer.appendChild(bannerText);

        this.container.appendChild(bannerContainer);
      });
    }

    animateLetters(container) {
      const bannerText = container.querySelector('.banner-text');
      if (!bannerText) return;
      const text = bannerText.getAttribute('data-text');
      bannerText.textContent = text;
    }

    fadeOutContainer(container, callback) {
      if (!container) return;
      container.style.display = 'flex'; // keep layout stable during fade
      container.classList.remove('normal');
      container.classList.add('blurring-out');

      setTimeout(() => {
        if (callback) callback();
        container.style.display = 'none'; // fully remove from layout after fade
      }, 1050); // match title blur-out
    }

    fadeInContainer(container) {
      if (!container) return;
      container.style.display = 'flex';
      this.animateLetters(container);
      container.classList.add('blurring-in');

      setTimeout(() => {
        container.classList.remove('blurring-in');
        container.classList.add('normal');
      }, 300); // match title blur-in
    }

    updateTitle(newTitle) {
      if (!this.titleElement) return;

      this.titleElement.classList.remove('normal');
      this.titleElement.classList.add('blurring-out');

      setTimeout(() => {
        this.titleElement.textContent = newTitle;
        this.titleElement.classList.remove('blurring-out');
        this.titleElement.classList.add('blurring-in');

        setTimeout(() => {
          this.titleElement.classList.remove('blurring-in');
          this.titleElement.classList.add('normal');
        }, 300);
      }, 1050);
    }

    nextBanner() {
      if (this.isAnimating) return;
      this.isAnimating = true;

      const currentPair = this.titleSubtitlePairs[this.currentTitleIndex];
      const current = this.container.children[this.currentSubtitleIndex];

      // Move to next subtitle
      this.currentSubtitleIndex = (this.currentSubtitleIndex + 1) % currentPair.subtitles.length;

      // If subtitles wrapped, advance title
      if (this.currentSubtitleIndex === 0) {
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titleSubtitlePairs.length;
        const nextPair = this.titleSubtitlePairs[this.currentTitleIndex];

        // Transition title during subtitle fade
        setTimeout(() => this.updateTitle(nextPair.title), 200);

        this.fadeOutContainer(current, () => {
          this.rebuildSubtitleContainers(nextPair.subtitles);
          this.fadeInContainer(this.container.children[0]);
          this.isAnimating = false;
        });
        return;
      }

      // Same title: just swap subtitle
      const next = this.container.children[this.currentSubtitleIndex];
      this.fadeOutContainer(current, () => {
        this.fadeInContainer(next);
        this.isAnimating = false;
      });
    }

    startRotation() {
      if (this.rotationInterval || !this.container) return;
      this.rotationInterval = setInterval(() => this.nextBanner(), this.rotationMs);
    }
  }

  // Expose for other scripts
  window.HeroRotator = HeroRotator;

  // Auto-init when DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    if (document.querySelector('.rotating-banners')) {
      const rotator = new HeroRotator();
      rotator.init();
      window.__heroRotatorInstance = rotator;
    }
  });
})();
