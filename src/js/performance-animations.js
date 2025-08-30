/**
 * Performance-optimized animation system
 * Implements viewport gating, concurrent animation limits, and motion preference respect
 */

class PerformanceAnimationManager {
  constructor() {
    // Track active animations to limit concurrency
    this.activeAnimations = new Set();
    this.maxConcurrentAnimations = 6; // Limit from TODO.md: 4-8 at a time
    this.animationQueue = [];
    
    // IntersectionObserver for viewport gating
    this.intersectionObserver = null;
    this.motionReducedPreference = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    
    // Performance monitoring
    this.performanceMetrics = {
      animationsStarted: 0,
      animationsCompleted: 0,
      averageFrameTime: 0,
      droppedFrames: 0
    };
    
    this.init();
  }
  
  init() {
    this.setupIntersectionObserver();
    this.setupMotionPreferenceListener();
    this.setupPerformanceMonitoring();
    this.processExistingAnimations();
  }
  
  /**
   * Set up IntersectionObserver for viewport-based animation gating
   */
  setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '100px', // Start animations 100px before entering viewport
      threshold: 0.1 // Trigger when 10% visible
    };
    
    this.intersectionObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const element = entry.target;
        
        if (entry.isIntersecting) {
          // Element is visible - enable animations
          this.enableElementAnimations(element);
        } else {
          // Element is not visible - pause animations
          this.pauseElementAnimations(element);
        }
      });
    }, options);
  }
  
  /**
   * Listen for motion preference changes
   */
  setupMotionPreferenceListener() {
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    motionQuery.addListener((e) => {
      this.motionReducedPreference = e.matches;
      if (this.motionReducedPreference) {
        this.disableAllAnimations();
      } else {
        this.enableAllAnimations();
      }
    });
  }
  
  /**
   * Set up performance monitoring using PerformanceObserver
   */
  setupPerformanceMonitoring() {
    if ('PerformanceObserver' in window) {
      // Monitor long tasks (over 50ms) that could indicate animation performance issues
      const observer = new PerformanceObserver((list) => {
        list.getEntries().forEach((entry) => {
          if (entry.duration > 50) {
            console.warn(`Long task detected during animation: ${entry.duration}ms`);
            this.performanceMetrics.droppedFrames++;
          }
        });
      });
      
      observer.observe({ entryTypes: ['longtask'] });
    }
  }
  
  /**
   * Process existing animated elements on the page
   */
  processExistingAnimations() {
    // Find all elements with animation classes
    const animatedElements = document.querySelectorAll([
      '.animate-fade-in',
      '.animate-slide-in-left', 
      '.animate-slide-in-right',
      '.animate-scale-in',
      '.animate-bounce',
      '.animate-pulse',
      '.animate-float',
      '.animate-rotate',
      '.animate-glow',
      '.animate-on-scroll',
      '.stagger-animation > *',
      '.neural-node',
      '.neural-connection',
      '.neural-data-flow'
    ].join(', '));
    
    animatedElements.forEach(element => {
      // Add containment for performance
      element.style.contain = 'layout paint';
      
      // Initially pause animations if motion is reduced
      if (this.motionReducedPreference) {
        this.pauseElementAnimations(element);
      } else {
        // Observe for viewport intersection
        this.intersectionObserver.observe(element);
        
        // Initially pause until in viewport (except for already visible elements)
        const rect = element.getBoundingClientRect();
        const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
        
        if (!isInViewport) {
          this.pauseElementAnimations(element);
        }
      }
    });
  }
  
  /**
   * Enable animations for an element when it enters viewport
   */
  enableElementAnimations(element) {
    if (this.motionReducedPreference) return;
    
    // Check if we're at the concurrent animation limit
    if (this.activeAnimations.size >= this.maxConcurrentAnimations) {
      this.animationQueue.push(element);
      return;
    }
    
    // Set will-change just before animation
    element.style.willChange = 'transform, opacity';
    
    // Enable CSS animations
    element.style.animationPlayState = 'running';
    element.style.transitionPlayState = 'running';
    
    // Add to active set
    this.activeAnimations.add(element);
    this.performanceMetrics.animationsStarted++;
    
    // Remove will-change after animation completes
    const removeWillChange = () => {
      element.style.willChange = 'auto';
      this.activeAnimations.delete(element);
      this.performanceMetrics.animationsCompleted++;
      
      // Process queue
      this.processAnimationQueue();
      
      element.removeEventListener('animationend', removeWillChange);
      element.removeEventListener('transitionend', removeWillChange);
    };
    
    element.addEventListener('animationend', removeWillChange);
    element.addEventListener('transitionend', removeWillChange);
    
    // Fallback removal after max expected duration (4s)
    setTimeout(removeWillChange, 4000);
  }
  
  /**
   * Pause animations for an element when it leaves viewport
   */
  pauseElementAnimations(element) {
    element.style.animationPlayState = 'paused';
    element.style.transitionPlayState = 'paused';
    element.style.willChange = 'auto';
    this.activeAnimations.delete(element);
  }
  
  /**
   * Process queued animations when slots become available
   */
  processAnimationQueue() {
    while (this.animationQueue.length > 0 && this.activeAnimations.size < this.maxConcurrentAnimations) {
      const element = this.animationQueue.shift();
      
      // Check if element is still in viewport
      const rect = element.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight + 100 && rect.bottom > -100;
      
      if (isInViewport) {
        this.enableElementAnimations(element);
      }
    }
  }
  
  /**
   * Disable all animations (for reduced motion preference)
   */
  disableAllAnimations() {
    document.documentElement.style.setProperty('--animation-duration', '0.01ms');
    document.documentElement.style.setProperty('--transition-duration', '0.01ms');
    
    // Clear active animations
    this.activeAnimations.clear();
    this.animationQueue.length = 0;
  }
  
  /**
   * Re-enable animations (when reduced motion is turned off)
   */
  enableAllAnimations() {
    document.documentElement.style.removeProperty('--animation-duration');
    document.documentElement.style.removeProperty('--transition-duration');
    
    // Re-process existing animations
    this.processExistingAnimations();
  }
  
  /**
   * Get performance metrics
   */
  getPerformanceMetrics() {
    return {
      ...this.performanceMetrics,
      activeAnimations: this.activeAnimations.size,
      queuedAnimations: this.animationQueue.length,
      concurrencyLimit: this.maxConcurrentAnimations,
      motionReduced: this.motionReducedPreference
    };
  }
  
  /**
   * Manually trigger animation for specific element (with performance checks)
   */
  triggerAnimation(element, animationClass) {
    if (this.motionReducedPreference) return;
    
    // Check performance constraints
    if (this.activeAnimations.size >= this.maxConcurrentAnimations) {
      console.warn('Animation limit reached, queueing animation');
      this.animationQueue.push(element);
      return;
    }
    
    element.classList.add(animationClass);
    this.enableElementAnimations(element);
  }
}

// Content visibility optimization utility
class ContentVisibilityOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Add content-visibility to off-screen sections
    const sections = document.querySelectorAll('section, article, .card, .possibility-card');
    
    sections.forEach(section => {
      // Skip sections that are initially in viewport
      const rect = section.getBoundingClientRect();
      const isInViewport = rect.top < window.innerHeight && rect.bottom > 0;
      
      if (!isInViewport) {
        section.style.contentVisibility = 'auto';
        section.style.containIntrinsicSize = '1000px'; // Rough estimate to prevent layout shift
      }
    });
  }
}

// Initialize performance animation system
let performanceAnimationManager;
let contentVisibilityOptimizer;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    performanceAnimationManager = new PerformanceAnimationManager();
    contentVisibilityOptimizer = new ContentVisibilityOptimizer();
  });
} else {
  performanceAnimationManager = new PerformanceAnimationManager();
  contentVisibilityOptimizer = new ContentVisibilityOptimizer();
}

// Export for debugging and external use
window.PerformanceAnimationManager = PerformanceAnimationManager;
window.ContentVisibilityOptimizer = ContentVisibilityOptimizer;
window.performanceAnimationManager = performanceAnimationManager;