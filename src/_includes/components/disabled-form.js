window.customElements.define(
  'disabled-form',
  class extends HTMLElement {
    connectedCallback() {
      for(const el of this.querySelectorAll('[disabled]')) {
        el.removeAttribute('disabled');
      }
    }
  }
);
