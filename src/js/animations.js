/**
 * Animation handlers for text effects, card animations, and visual elements
 * Includes rotating banners, card hover effects, and performance optimizations
 */

// Rotating Banner System
class RotatingBanners {
  constructor() {
    // Build title-subtitle pairs from HTML data
    this.titleSubtitlePairs = this.buildPairsFromHTML();
    
    this.currentTitleIndex = 0;
    this.currentSubtitleIndex = 0;
    this.container = document.querySelector('.rotating-banners');
    this.titleElement = document.querySelector('.hero-content h1');
    this.isAnimating = false;
    this.glowTimeouts = [];
    
    this.init();
  }
  
  buildPairsFromHTML() {
    const heroData = document.querySelector('.hero-data');
    if (!heroData) {
      // Fallback to original data if HTML not found
      return [
        {
          title: 'Build AI that ships, not just talks.',
          subtitles: [
            'Zero-setup environments, smart model routing, and agents that keep context.',
            'Stop debugging prompts. Start shipping autonomous systems that work 24/7.',
            'Your competitors hire more humans. You deploy more agents.'
          ]
        }
      ];
    }
    
    const groups = heroData.querySelectorAll('.title-subtitle-group');
    const pairs = [];
    
    groups.forEach(group => {
      const titleElement = group.querySelector('.title');
      const subtitleElements = group.querySelectorAll('.subtitle');
      
      if (titleElement && subtitleElements.length > 0) {
        const pair = {
          title: titleElement.textContent.trim(),
          subtitles: Array.from(subtitleElements).map(el => el.textContent.trim())
        };
        pairs.push(pair);
      }
    });
    
    return pairs.length > 0 ? pairs : [
      {
        title: 'Build AI that ships, not just talks.',
        subtitles: ['Zero-setup environments, smart model routing, and agents that keep context.']
      }
    ];
  }
  
  init() {
    if (!this.container) {return;}
    
    // Create banner containers for the first title's subtitles
    const firstTitleSubtitles = this.titleSubtitlePairs[0].subtitles;
    firstTitleSubtitles.forEach((text, index) => {
      const bannerContainer = document.createElement('div');
      bannerContainer.className = 'banner-container';
      if (index === 0) {bannerContainer.classList.add('active');}
      
      const bannerText = document.createElement('span');
      bannerText.className = 'banner-text';
      bannerText.setAttribute('data-text', text);
      
      bannerContainer.appendChild(bannerText);
      this.container.appendChild(bannerContainer);
    });
    
    // Initialize title state
    if (this.titleElement) {
      this.titleElement.classList.add('normal');
    }
    
    // Start rotation cycles
    this.startRotation();
  }
  
  animateLetters(container, delay = 0) {
    const bannerText = container.querySelector('.banner-text');
    const text = bannerText.getAttribute('data-text');
    // Simple text display without letter-by-letter animation
    bannerText.textContent = text;
  }
  
  fadeOutContainer(container, callback) {
    // Start blur out animation
    container.classList.remove('normal');
    container.classList.add('blurring-out');
    
    // Call callback when blur animation completes - faster overlap
    setTimeout(() => {
      if (callback) {callback();}
    }, 400); // Reduced from 600ms for more overlap
  }
  
  fadeInContainer(container, delay = 0) {
    setTimeout(() => {
      container.classList.add('active', 'normal');
      this.animateLetters(container);
    }, delay);
  }
  
  updateTitle(newTitle) {
    if (this.titleElement) {
      this.titleElement.classList.remove('normal');
      this.titleElement.classList.add('changing');
      
      setTimeout(() => {
        this.titleElement.innerHTML = newTitle;
        this.titleElement.classList.remove('changing');
        this.titleElement.classList.add('normal');
      }, 200); // Reduced from 300ms for faster title transition
    }
  }
  
  rebuildSubtitleContainers(subtitles) {
    // Clear existing containers
    this.container.innerHTML = '';
    
    // Create new containers for new title's subtitles
    subtitles.forEach((text, index) => {
      const bannerContainer = document.createElement('div');
      bannerContainer.className = 'banner-container';
      if (index === 0) {bannerContainer.classList.add('active');}
      
      const bannerText = document.createElement('span');
      bannerText.className = 'banner-text';
      bannerText.setAttribute('data-text', text);
      
      bannerContainer.appendChild(bannerText);
      this.container.appendChild(bannerContainer);
    });
  }
  
  nextBanner() {
    if (this.isAnimating) {return;}
    
    this.isAnimating = true;
    const currentPair = this.titleSubtitlePairs[this.currentTitleIndex];
    const current = this.container.children[this.currentSubtitleIndex];
    
    // Move to next subtitle
    this.currentSubtitleIndex = (this.currentSubtitleIndex + 1) % currentPair.subtitles.length;
    
    // If we've cycled through all subtitles, move to next title
    if (this.currentSubtitleIndex === 0) {
      this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titleSubtitlePairs.length;
      const nextPair = this.titleSubtitlePairs[this.currentTitleIndex];
      
      // Start title transition early, during subtitle fade-out
      setTimeout(() => {
        this.updateTitle(nextPair.title);
      }, 200);
      
      // Fade out current subtitle container and letters
      this.fadeOutContainer(current, () => {
        // Rebuild subtitle containers for new title
        this.rebuildSubtitleContainers(nextPair.subtitles);
        
        // Fade in first subtitle of new title
        const firstNew = this.container.children[0];
        this.fadeInContainer(firstNew, 0);
        this.isAnimating = false;
      });
      return;
    }
    
    // Regular subtitle transition within same title
    const next = this.container.children[this.currentSubtitleIndex];
    
    // Fade out current subtitle container
    this.fadeOutContainer(current, () => {
      // Fade in next subtitle container
      this.fadeInContainer(next, 0);
      this.isAnimating = false;
    });
  }
  
  startRotation() {
    const rotationInterval = 5000; // 5 seconds per banner
    
    // Start the first banner animation immediately
    const firstContainer = this.container.children[0];
    if (firstContainer) {
      this.fadeInContainer(firstContainer, 500);
    }
    
    // Set up rotation timer
    setInterval(() => {
      this.nextBanner();
    }, rotationInterval);
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