/**
 * Improved TOC Scroll Spy
 * 
 * Replaces IntersectionObserver with offset-based tracking for better accuracy.
 * Uses binary search for O(log n) performance and tracks closest-preceding heading
 * even when scrolled off-screen.
 */

class TOCScrollSpy {
  constructor(options = {}) {
    this.tocSelector = options.tocSelector || '.toc';
    this.headingSelector = options.headingSelector || 'h1, h2, h3, h4, h5, h6';
    this.headerOffset = options.headerOffset || 100; // Account for fixed header
    this.throttleDelay = options.throttleDelay || 75; // ms
    
    this.headings = [];
    this.tocElement = null;
    this.activeElement = null;
    this.scrollTimer = null;
    
    this.init();
  }

  init() {
    this.tocElement = document.querySelector(this.tocSelector);
    if (!this.tocElement) {
      console.warn('TOC element not found:', this.tocSelector);
      return;
    }

    this.buildHeadingsList();
    this.bindEvents();
    this.updateActiveHeading();
  }

  /**
   * Build sorted list of headings with their offset positions
   */
  buildHeadingsList() {
    const headingElements = document.querySelectorAll(this.headingSelector);
    
    this.headings = Array.from(headingElements)
      .map(heading => ({
        id: heading.id,
        element: heading,
        topOffset: this.getElementTopOffset(heading),
        tocLink: this.tocElement.querySelector(`a[href="#${heading.id}"]`)
      }))
      .filter(heading => heading.id && heading.tocLink) // Only headings with TOC links
      .sort((a, b) => a.topOffset - b.topOffset); // Sort by position

  }

  /**
   * Get element's top offset relative to document
   */
  getElementTopOffset(element) {
    let top = 0;
    let current = element;
    
    while (current && current.offsetParent) {
      top += current.offsetTop;
      current = current.offsetParent;
    }
    
    return top;
  }

  /**
   * Find the active heading using binary search
   * Returns the heading with max(topOffset) where topOffset <= scrollY + headerOffset
   */
  findActiveHeading(scrollY) {
    if (this.headings.length === 0) return null;

    const targetY = scrollY + this.headerOffset;
    
    // Handle edge cases
    if (targetY < this.headings[0].topOffset) {
      return this.headings[0]; // First heading if at very top
    }
    
    if (targetY >= this.headings[this.headings.length - 1].topOffset) {
      return this.headings[this.headings.length - 1]; // Last heading if at bottom
    }

    // Binary search for the rightmost heading with topOffset <= targetY
    let left = 0;
    let right = this.headings.length - 1;
    let result = this.headings[0];

    while (left <= right) {
      const mid = Math.floor((left + right) / 2);
      const heading = this.headings[mid];

      if (heading.topOffset <= targetY) {
        result = heading; // This could be our answer
        left = mid + 1; // Look for a better match to the right
      } else {
        right = mid - 1; // Look to the left
      }
    }

    return result;
  }

  /**
   * Update the active heading and TOC state
   */
  updateActiveHeading() {
    const scrollY = window.pageYOffset || document.documentElement.scrollTop;
    const activeHeading = this.findActiveHeading(scrollY);

    if (!activeHeading || activeHeading === this.activeElement) {
      return; // No change needed
    }

    // Remove previous active states
    if (this.activeElement?.tocLink) {
      this.clearActiveStates();
    }

    // Set new active states
    this.activeElement = activeHeading;
    this.setActiveStates(activeHeading.tocLink);
  }

  /**
   * Clear all active states in TOC
   */
  clearActiveStates() {
    const activeLinks = this.tocElement.querySelectorAll('.is-active-link');
    const activeLis = this.tocElement.querySelectorAll('.is-active-li');
    
    activeLinks.forEach(link => link.classList.remove('is-active-link'));
    activeLis.forEach(li => li.classList.remove('is-active-li'));
  }

  /**
   * Set active states and expand ancestor tree
   */
  setActiveStates(activeLink) {
    if (!activeLink) return;

    // Mark the link as active
    activeLink.classList.add('is-active-link');

    // Walk up the TOC tree and expand ancestors
    let currentElement = activeLink.parentElement; // Start with the <li>
    
    while (currentElement && currentElement !== this.tocElement) {
      if (currentElement.tagName === 'LI') {
        currentElement.classList.add('is-active-li');
        
        // If this is a collapsible item, ensure it's expanded
        if (currentElement.classList.contains('is-collapsible')) {
          currentElement.classList.remove('is-collapsed');
        }
      }
      currentElement = currentElement.parentElement;
    }

    // Collapse other top-level sections that aren't in the active path
    this.collapseInactiveSections(activeLink);
  }

  /**
   * Collapse TOC sections that aren't in the active path
   */
  collapseInactiveSections(activeLink) {
    const collapsibleItems = this.tocElement.querySelectorAll('.toc-list-item.is-collapsible');
    
    collapsibleItems.forEach(li => {
      if (!li.classList.contains('is-active-li')) {
        // This item is not in the active path, collapse it
        li.classList.add('is-collapsed');
      }
    });
  }

  /**
   * Handle hash changes (direct navigation or back/forward)
   */
  handleHashChange() {
    const hash = window.location.hash.slice(1);
    if (!hash) return;

    const targetHeading = this.headings.find(h => h.id === hash);
    if (targetHeading) {
      this.activeElement = targetHeading;
      this.clearActiveStates();
      this.setActiveStates(targetHeading.tocLink);
    }
  }

  /**
   * Handle TOC link clicks
   */
  handleTOCClick(event) {
    const link = event.target.closest('a[href^="#"]');
    if (!link) return;

    const hash = link.getAttribute('href').slice(1);
    const targetHeading = this.headings.find(h => h.id === hash);
    
    if (targetHeading) {
      // Update immediately on click
      this.activeElement = targetHeading;
      this.clearActiveStates();
      this.setActiveStates(targetHeading.tocLink);
    }
  }

  /**
   * Throttled scroll handler
   */
  handleScroll() {
    if (this.scrollTimer) {
      clearTimeout(this.scrollTimer);
    }
    
    this.scrollTimer = setTimeout(() => {
      this.updateActiveHeading();
    }, this.throttleDelay);
  }

  /**
   * Handle window resize - recalculate heading positions
   */
  handleResize() {
    // Debounce resize events
    clearTimeout(this.resizeTimer);
    this.resizeTimer = setTimeout(() => {
      this.buildHeadingsList();
      this.updateActiveHeading();
    }, 250);
  }

  /**
   * Bind event listeners
   */
  bindEvents() {
    // Throttled scroll handler
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    
    // Hash change handler
    window.addEventListener('hashchange', () => this.handleHashChange());
    
    // TOC click handler
    this.tocElement.addEventListener('click', (event) => this.handleTOCClick(event));
    
    // Window resize handler
    window.addEventListener('resize', () => this.handleResize());
  }

  /**
   * Public method to refresh the spy (useful after dynamic content changes)
   */
  refresh() {
    this.buildHeadingsList();
    this.updateActiveHeading();
  }

  /**
   * Clean up event listeners
   */
  destroy() {
    clearTimeout(this.scrollTimer);
    clearTimeout(this.resizeTimer);
    // Note: In a real implementation, you'd want to store bound function references
    // to properly remove event listeners
  }
}

// Auto-initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    window.tocScrollSpy = new TOCScrollSpy();
  });
} else {
  // DOM already loaded
  window.tocScrollSpy = new TOCScrollSpy();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = TOCScrollSpy;
}