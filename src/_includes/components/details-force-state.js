class DetailsForceState extends HTMLElement {
  forceState(details, forceClosed) {
    let isSectionActive;
    if(forceClosed) {
      isSectionActive = false;
    } else {
      // Start all sections collapsed by default
      isSectionActive = false;
      const titleNode = details.previousElementSibling;
      if(document.location.pathname === '/' && !titleNode) {
        isSectionActive = true;
      }
      // Keep sections collapsed even if they contain active pages
      // Users can manually expand sections they need
    }

    if (isSectionActive) {
      if(!details.open) {
        details.setAttribute('open', 'open');
      }
    } else {
      if(details.open) {
        details.removeAttribute('open');
      }
    }
  }

  connectedCallback() {
    const details = this.querySelectorAll(':scope details');
    const forceClosed = this.getAttribute('data-force-closed');
    for(const d of details) {
      const mm1 = window.matchMedia(forceClosed);
      this.forceState(d, mm1.matches);
      mm1.addListener(e => {
        this.forceState(d, e.matches);
      });
    }
  }
}

if ('customElements' in window) {
  customElements.define('details-force-state', DetailsForceState);
}
