/**
 * Animation handlers for text effects, card animations, and visual elements
 * Includes rotating banners, card hover effects, and performance optimizations
 */

// Rotating Banner System (delegates to shared HeroRotator)
class RotatingBanners extends (window.HeroRotator || class {}) {
  constructor(opts) {
    super(opts);
    if (typeof this.init === 'function') {
      this.init();
    }
  }
}

// Card Animation Handler - Performance Optimized
class CardAnimations {
  constructor() {
    this.possibilityCards = document.querySelectorAll('.possibility-card');
    this.activeCardAnimations = new Set();
    this.maxConcurrentCardAnimations = 4; // Limit concurrent card animations
    this.init();
  }
  
  init() {
    this.possibilityCards.forEach((card, index) => {
      // Add containment for performance
      card.style.contain = 'layout paint';
      
      // Limit initial staggered animations to prevent overwhelming
      const shouldAnimate = index < this.maxConcurrentCardAnimations;
      if (shouldAnimate) {
        card.style.animationDelay = `${index * 100}ms`;
      } else {
        // Queue remaining cards for later animation
        card.style.animationDelay = `${this.maxConcurrentCardAnimations * 100}ms`;
      }
      
      // Performance-conscious hover behavior
      card.addEventListener('mouseenter', () => {
        this.handleCardHover(card, true);
      });
      
      card.addEventListener('mouseleave', () => {
        this.handleCardHover(card, false);
      });
    });
  }
  
  handleCardHover(card, isEntering) {
    // Check motion preference
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }
    
    // Limit concurrent hover animations
    if (isEntering && this.activeCardAnimations.size >= this.maxConcurrentCardAnimations) {
      return;
    }
    
    const vizElements = card.querySelectorAll('.step-visual.processed, .point.active, .milestone.active');
    
    if (isEntering) {
      this.activeCardAnimations.add(card);
      
      // Set will-change just before animation
      card.style.willChange = 'transform';
      
      vizElements.forEach(el => {
        el.style.willChange = 'transform, opacity';
        el.style.animationDuration = '1s';
      });
      
      // Remove will-change after animation
      setTimeout(() => {
        card.style.willChange = 'auto';
        vizElements.forEach(el => {
          el.style.willChange = 'auto';
        });
      }, 1000);
      
    } else {
      this.activeCardAnimations.delete(card);
      
      vizElements.forEach(el => {
        el.style.animationDuration = '2s';
        el.style.willChange = 'auto';
      });
      
      card.style.willChange = 'auto';
    }
  }
}

// Premium Text Animation Handler - Performance Optimized
class TextAnimations {
  constructor() {
    this.animatedElements = new Set();
    this.init();
  }
  
  init() {
    // Find and optimize text animations
    const textElements = document.querySelectorAll('.hero-title, .banner-text, .animate-fade-in, .animate-slide-in-left, .animate-slide-in-right');
    
    textElements.forEach(el => {
      // Add containment
      el.style.contain = 'layout paint';
      
      // Track animations
      this.animatedElements.add(el);
      
      // Set will-change only when needed
      this.setupWillChangeManagement(el);
    });
    
    // Clean up will-change properties after animations complete
    this.scheduleWillChangeCleanup();
  }
  
  setupWillChangeManagement(element) {
    // Only set will-change when animation is about to start
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          // Element about to animate
          element.style.willChange = 'transform, opacity';
          
          // Remove will-change after animation
          setTimeout(() => {
            element.style.willChange = 'auto';
          }, 2000); // Max expected animation duration
          
          observer.unobserve(element);
        }
      });
    }, {
      rootMargin: '50px' // Start will-change 50px before entering viewport
    });
    
    observer.observe(element);
  }
  
  scheduleWillChangeCleanup() {
    // Fallback cleanup for any remaining will-change properties
    setTimeout(() => {
      this.animatedElements.forEach(el => {
        el.style.willChange = 'auto';
      });
    }, 5000); // After all animations should definitely be complete
  }
}

// Animation Manager - coordinates all animations with performance monitoring
class AnimationManager {
  constructor() {
    this.rotatingBanners = null;
    this.cardAnimations = null;
    this.textAnimations = null;
    this.performanceMonitor = null;
    
    this.init();
  }
  
  init() {
    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    if (prefersReducedMotion) {
      console.log('Reduced motion preference detected - minimal animations enabled');
      // Still initialize but with reduced functionality
      this.initMinimalAnimations();
    } else {
      // Initialize full animation systems
      this.initFullAnimations();
    }
    
    // Set up performance monitoring
    this.setupPerformanceMonitoring();
  }
  
  initMinimalAnimations() {
    // Only initialize essential animations with reduced motion
    this.textAnimations = new TextAnimations();
    
    // Initialize banners but with minimal animation
    if (document.querySelector('.rotating-banners')) {
      this.rotatingBanners = new RotatingBanners();
    }
  }
  
  initFullAnimations() {
    // Initialize all animation systems
    this.rotatingBanners = new RotatingBanners();
    this.cardAnimations = new CardAnimations();
    this.textAnimations = new TextAnimations();
  }
  
  setupPerformanceMonitoring() {
    // Monitor animation performance
    if ('PerformanceObserver' in window) {
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 16.67) { // Longer than one frame at 60fps
            console.warn(`Animation frame took ${entry.duration.toFixed(2)}ms (target: <16.67ms)`);
          }
        });
      });
      
      try {
        observer.observe({ entryTypes: ['measure'] });
      } catch (e) {
        // Performance monitoring not supported
        console.log('Performance monitoring not available');
      }
    }
  }
  
  // Get performance metrics for debugging
  getMetrics() {
    const metrics = {
      reducedMotion: window.matchMedia('(prefers-reduced-motion: reduce)').matches,
      activeAnimations: {
        cards: this.cardAnimations ? this.cardAnimations.activeCardAnimations.size : 0,
        banners: this.rotatingBanners ? (this.rotatingBanners.isAnimating ? 1 : 0) : 0,
        text: this.textAnimations ? this.textAnimations.animatedElements.size : 0
      }
    };
    
    return metrics;
  }
}

// Export classes for use in other modules
window.RotatingBanners = RotatingBanners;
window.CardAnimations = CardAnimations;
window.TextAnimations = TextAnimations;
window.AnimationManager = AnimationManager;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new AnimationManager();
  });
} else {
  new AnimationManager();
}
