/**
 * Animation handlers for text effects, card animations, and visual elements
 * Includes rotating banners, card hover effects, and performance optimizations
 */

// Rotating Banner System
class RotatingBanners {
  constructor() {
    // Coordinated title-subtitle pairs
    this.titleSubtitlePairs = [
      {
        title: 'Stop Losing to Startups With Real AI Advantages',
        subtitles: [
          "Turn your data moat into autonomous agent systems that competitors can't copy",
          'Build AI-first workflows that eliminate manual processes entirely',
          'Deploy intelligent automation that learns and improves without human intervention'
        ]
      },
      {
        title: 'Enterprise AI That Actually Works in Production',
        subtitles: [
          'Architected for scale, security, and seamless integration with existing systems',
          'Built with enterprise governance, compliance, and risk management from day one',
          'Designed for reliability with comprehensive monitoring and automated failsafes'
        ]
      },
      {
        title: 'Custom AI Research That Drives Breakthrough Innovation',
        subtitles: [
          'Novel algorithms tailored to your unique data patterns and business constraints',
          'Advanced research partnerships that accelerate time-to-market for AI products',
          'Proprietary model development that creates sustainable competitive advantages'
        ]
      },
      {
        title: 'Strategic AI Implementation with Clear ROI',
        subtitles: [
          'Clear roadmaps from concept to competitive edge with measurable business impact',
          'Proven methodologies that minimize risk while maximizing transformation speed',
          'Executive-ready strategies that align AI initiatives with business objectives'
        ]
      }
    ];
    
    this.currentTitleIndex = 0;
    this.currentSubtitleIndex = 0;
    this.container = document.querySelector('.rotating-banners');
    this.titleElement = document.querySelector('.hero-content h1');
    this.isAnimating = false;
    this.glowTimeouts = [];
    
    this.init();
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
    
    // Call callback when blur animation completes
    setTimeout(() => {
      if (callback) {callback();}
    }, 600); // Match blur transition duration
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
      }, 300);
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

// Card Animation Handler
class CardAnimations {
  constructor() {
    this.possibilityCards = document.querySelectorAll('.possibility-card');
    this.init();
  }
  
  init() {
    this.possibilityCards.forEach(card => {
      // Add subtle animation delays for staggered loading
      const index = Array.from(this.possibilityCards).indexOf(card);
      card.style.animationDelay = `${index * 100}ms`;
      
      // Enhanced hover behavior with data visualization updates
      card.addEventListener('mouseenter', () => {
        // Trigger visualization animations
        const vizElements = card.querySelectorAll('.step-visual.processed, .point.active, .milestone.active');
        vizElements.forEach(el => {
          el.style.animationDuration = '1s';
        });
      });
      
      card.addEventListener('mouseleave', () => {
        // Reset animation timing
        const vizElements = card.querySelectorAll('.step-visual.processed, .point.active, .milestone.active');
        vizElements.forEach(el => {
          el.style.animationDuration = '2s';
        });
      });
    });
  }
}

// Premium Text Animation Handler
class TextAnimations {
  constructor() {
    this.init();
  }
  
  init() {
    // Performance optimization: remove will-change after animations complete
    setTimeout(() => {
      const animatedElements = document.querySelectorAll('.hero-title, .banner-text');
      animatedElements.forEach(el => {
        el.style.willChange = 'auto';
      });
    }, 4000); // After all animations should be complete
  }
}

// Animation Manager - coordinates all animations
class AnimationManager {
  constructor() {
    this.rotatingBanners = null;
    this.cardAnimations = null;
    this.textAnimations = null;
    
    this.init();
  }
  
  init() {
    // Initialize all animation systems
    this.rotatingBanners = new RotatingBanners();
    this.cardAnimations = new CardAnimations();
    this.textAnimations = new TextAnimations();
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