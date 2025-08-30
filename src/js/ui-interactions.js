/**
 * UI interaction handlers for general user interface elements
 * Handles click handlers, hover effects, icon initialization, and general UI interactions
 */

class UIInteractions {
  constructor() {
    this.init();
  }
  
  init() {
    this.initIconSystem();
    this.initScrollEffects();
    this.initGeneralClickHandlers();
    this.initHoverEffects();
    this.initKeyboardInteractions();
  }
  
  /**
   * Initialize Lucide icon system
   */
  initIconSystem() {
    // Initialize Lucide icons when available
    if (window.lucide) {
      lucide.createIcons();
    } else {
      // Wait for Lucide to load if not immediately available
      const checkLucide = setInterval(() => {
        if (window.lucide) {
          lucide.createIcons();
          clearInterval(checkLucide);
        }
      }, 100);
      
      // Clear interval after 5 seconds to prevent infinite checking
      setTimeout(() => clearInterval(checkLucide), 5000);
    }
  }
  
  /**
   * Initialize scroll-based effects
   */
  initScrollEffects() {
    // Add scroll-based animations or effects here
    let ticking = false;
    
    const handleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          this.updateScrollEffects();
          ticking = false;
        });
        ticking = true;
      }
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
  }
  
  updateScrollEffects() {
    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    
    // Add scroll-based animations here
    // Example: parallax effects, fade-ins, etc.
    
    // Update elements based on scroll position
    const elements = document.querySelectorAll('[data-scroll-effect]');
    elements.forEach(element => {
      const rect = element.getBoundingClientRect();
      const isVisible = rect.top < windowHeight && rect.bottom > 0;
      
      if (isVisible) {
        element.classList.add('in-viewport');
      } else {
        element.classList.remove('in-viewport');
      }
    });
  }
  
  /**
   * Initialize general click handlers for interactive elements
   */
  initGeneralClickHandlers() {
    // Handle all buttons with data-action attributes
    document.addEventListener('click', (e) => {
      const button = e.target.closest('[data-action]');
      if (button) {
        const action = button.getAttribute('data-action');
        this.handleButtonAction(action, button, e);
      }
    });
    
    // Handle external links
    const externalLinks = document.querySelectorAll('a[href^="http"]:not([href*="' + location.hostname + '"])');
    externalLinks.forEach(link => {
      link.setAttribute('target', '_blank');
      link.setAttribute('rel', 'noopener noreferrer');
    });
  }
  
  /**
   * Handle button actions based on data-action attribute
   */
  handleButtonAction(action, button, event) {
    switch (action) {
    case 'scroll-to':
      const target = button.getAttribute('data-target');
      this.scrollToElement(target);
      break;
    case 'toggle':
      const toggleTarget = button.getAttribute('data-target');
      this.toggleElement(toggleTarget);
      break;
    case 'copy':
      const copyText = button.getAttribute('data-copy') || button.textContent;
      this.copyToClipboard(copyText, button);
      break;
    default:
      console.log('Unknown action:', action);
    }
  }
  
  /**
   * Smooth scroll to element
   */
  scrollToElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      });
    }
  }
  
  /**
   * Toggle element visibility
   */
  toggleElement(selector) {
    const element = document.querySelector(selector);
    if (element) {
      element.classList.toggle('hidden');
      element.classList.toggle('visible');
    }
  }
  
  /**
   * Copy text to clipboard
   */
  async copyToClipboard(text, button) {
    try {
      await navigator.clipboard.writeText(text);
      
      // Visual feedback
      const originalText = button.textContent;
      button.textContent = 'Copied!';
      button.classList.add('copied');
      
      setTimeout(() => {
        button.textContent = originalText;
        button.classList.remove('copied');
      }, 2000);
    } catch (err) {
      console.error('Failed to copy text:', err);
      
      // Fallback for older browsers
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
    }
  }
  
  /**
   * Initialize hover effects for interactive elements
   */
  initHoverEffects() {
    // Add hover effects to buttons and interactive elements
    const interactiveElements = document.querySelectorAll('.btn, .card, .interactive');
    
    interactiveElements.forEach(element => {
      element.addEventListener('mouseenter', () => {
        element.classList.add('hovered');
      });
      
      element.addEventListener('mouseleave', () => {
        element.classList.remove('hovered');
      });
    });
    
    // Add ripple effect for buttons
    const buttons = document.querySelectorAll('.btn, button');
    buttons.forEach(button => {
      button.addEventListener('click', this.createRippleEffect.bind(this));
    });
  }
  
  /**
   * Create ripple effect on button click
   */
  createRippleEffect(e) {
    const button = e.currentTarget;
    const ripple = document.createElement('span');
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;
    
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';
    ripple.classList.add('ripple');
    
    button.appendChild(ripple);
    
    // Remove ripple after animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
  
  /**
   * Initialize keyboard interactions
   */
  initKeyboardInteractions() {
    // Handle keyboard navigation
    document.addEventListener('keydown', (e) => {
      // Focus management for accessibility
      if (e.key === 'Tab') {
        document.body.classList.add('keyboard-navigation');
      }
    });
    
    document.addEventListener('mousedown', () => {
      document.body.classList.remove('keyboard-navigation');
    });
    
    // Handle escape key for closing overlays
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllOverlays();
      }
    });
  }
  
  /**
   * Close all open overlays (tooltips, dropdowns, etc.)
   */
  closeAllOverlays() {
    const overlays = document.querySelectorAll('.overlay.active, .dropdown.open, .tooltip.visible');
    overlays.forEach(overlay => {
      overlay.classList.remove('active', 'open', 'visible');
    });
  }
  
  /**
   * Reinitialize icons (useful after dynamic content loading)
   */
  reinitializeIcons() {
    if (window.lucide) {
      lucide.createIcons();
    }
  }
  
  /**
   * Add loading state to element
   */
  setLoadingState(element, isLoading = true) {
    if (isLoading) {
      element.classList.add('loading');
      element.setAttribute('aria-busy', 'true');
    } else {
      element.classList.remove('loading');
      element.removeAttribute('aria-busy');
    }
  }
  
  /**
   * Show toast notification
   */
  showToast(message, type = 'info', duration = 3000) {
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.textContent = message;
    
    // Add to page
    const toastContainer = document.querySelector('.toast-container') || document.body;
    toastContainer.appendChild(toast);
    
    // Animate in
    setTimeout(() => toast.classList.add('visible'), 10);
    
    // Remove after duration
    setTimeout(() => {
      toast.classList.remove('visible');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }
}

// Initialize UI interactions
window.UIInteractions = UIInteractions;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new UIInteractions();
  });
} else {
  new UIInteractions();
}