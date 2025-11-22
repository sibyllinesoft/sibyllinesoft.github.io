// Rotating Banner System for Valknut (with title rotation like home page)
document.addEventListener('DOMContentLoaded', function() {
  class ValknutRotatingBanners {
    constructor() {
      // Title-subtitle pairs like home page
      this.titleSubtitlePairs = [
        {
          title: "Valknut gives your agents refactoring superpowers",
          subtitles: ["Agents Are Lost Without Direction—VALKNUT Gives Them Purpose"]
        },
        {
          title: "Static Analysis That Guides, Not Just Reports", 
          subtitles: ["Turn code complexity into a precise refactoring roadmap"]
        },
        {
          title: "Stop AI Agents From Hunting Blindly",
          subtitles: ["From thousands of files to a prioritized list of actionable insights"]
        }
      ];
      
      this.currentTitleIndex = 0;
      this.currentSubtitleIndex = 0;
      this.container = document.querySelector('.rotating-banners');
      this.titleElement = document.querySelector('.hero-title');
      this.isAnimating = false;
      this.rotationInterval = null;
      this.isVisible = true; // Assume visible initially

      this.init();
    }
    
    init() {
      if (!this.container) return;
      
      // Clear existing banners and create new ones for first title
      this.rebuildSubtitleContainers(this.titleSubtitlePairs[0].subtitles);
      
      // Initialize title state
      if (this.titleElement) {
        this.titleElement.classList.add('normal');
      }
      
      // Start with first subtitle
      this.fadeInContainer(this.container.children[0], 0);

      // Setup visibility observer
      this.setupVisibilityObserver();

      // Start rotation cycles (will be managed by visibility observer)
      this.startRotation();
    }

    setupVisibilityObserver() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          this.isVisible = entry.isIntersecting;
          if (this.isVisible && !this.rotationInterval) {
            // Resume rotation when becoming visible
            this.startRotation();
          } else if (!this.isVisible && this.rotationInterval) {
            // Pause rotation when not visible
            this.stopRotation();
          }
        });
      }, { threshold: 0 }); // Fire as soon as any part is visible

      if (this.container) {
        observer.observe(this.container);
      }
    }

    stopRotation() {
      if (this.rotationInterval) {
        clearInterval(this.rotationInterval);
        this.rotationInterval = null;
      }
    }
    
    rebuildSubtitleContainers(subtitles) {
      this.container.innerHTML = '';
      
      subtitles.forEach((text, index) => {
        const bannerContainer = document.createElement('div');
        bannerContainer.className = 'banner-container';
        
        const bannerText = document.createElement('span');
        bannerText.className = 'banner-text';
        bannerText.setAttribute('data-text', text);
        bannerText.textContent = text;
        
        bannerContainer.appendChild(bannerText);
        this.container.appendChild(bannerContainer);
      });
    }
    
    fadeOutContainer(container, callback) {
      container.classList.remove('normal');
      container.classList.add('blurring-out');
      
      setTimeout(() => {
        if (callback) callback();
      }, 400); // Reduced from 600ms for more overlap
    }
    
    fadeInContainer(container, delay = 0) {
      container.classList.add('blurring-in');
      
      setTimeout(() => {
        container.classList.remove('blurring-in');
        container.classList.add('normal', 'active');
      }, 100);
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
        }, 200);
      }, 500); // Reduced from 700ms for faster title transition
    }
    
    startRotation() {
      // Clear existing interval if any
      this.stopRotation();

      // Only start if visible
      if (!this.isVisible) return;

      this.rotationInterval = setInterval(() => {
        this.rotateToNext();
      }, 8000);
    }
    
    rotateToNext() {
      if (this.isAnimating) return;
      this.isAnimating = true;
      
      const currentPair = this.titleSubtitlePairs[this.currentTitleIndex];
      const current = this.container.children[this.currentSubtitleIndex];
      
      // Move to next subtitle within current title
      this.currentSubtitleIndex = (this.currentSubtitleIndex + 1) % currentPair.subtitles.length;
      
      // If we've cycled through all subtitles, move to next title
      if (this.currentSubtitleIndex === 0) {
        this.currentTitleIndex = (this.currentTitleIndex + 1) % this.titleSubtitlePairs.length;
        const nextPair = this.titleSubtitlePairs[this.currentTitleIndex];
        
        // Start title transition early
        setTimeout(() => {
          this.updateTitle(nextPair.title);
        }, 200);
        
        // Fade out current and rebuild
        this.fadeOutContainer(current, () => {
          this.rebuildSubtitleContainers(nextPair.subtitles);
          this.fadeInContainer(this.container.children[0], 0);
          this.isAnimating = false;
        });
      } else {
        // Regular subtitle transition within same title
        const next = this.container.children[this.currentSubtitleIndex];
        
        this.fadeOutContainer(current, () => {
          this.fadeInContainer(next, 0);
          this.isAnimating = false;
        });
      }
    }
  }
  
  new ValknutRotatingBanners();

  // Service data for Valknut modals
  const serviceData = {
    'quick-wins': {
      image: '/img/optimized/modal-quick-wins.webp',
      ctaText: 'Try Urgency Analysis',
      alt: 'Abstract geometric pattern representing code complexity analysis',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'systemic': {
      image: '/img/optimized/modal-systemic.webp', 
      ctaText: 'Explore Impact Packs',
      alt: 'Network visualization representing systemic code relationships',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'integration': {
      image: '/img/optimized/modal-integration.webp',
      ctaText: 'Setup MCP Integration',
      alt: 'Technology network visualization representing AI integration workflows',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'wandering': {
      image: '/img/optimized/modal-wandering.webp',
      ctaText: 'Learn More',
      alt: 'Abstract visualization representing aimless code exploration',
      ctaLink: '/products/'
    },
    'isolated': {
      image: '/img/optimized/modal-isolated.webp',
      ctaText: 'Learn More', 
      alt: 'Fragmented connections representing isolated code changes',
      ctaLink: '/products/'
    },
    'overload': {
      image: '/img/optimized/modal-overload.webp',
      ctaText: 'Learn More',
      alt: 'Complex data visualization representing system overload',
      ctaLink: '/products/'
    },
    'analysis': {
      image: '/img/optimized/modal-data-visualization.webp',
      ctaText: 'View Analysis Features',
      alt: 'Deep code analysis visualization',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'scoring': {
      image: '/img/optimized/modal-analytics-dashboard.webp',
      ctaText: 'See Scoring Algorithm', 
      alt: 'Urgency scoring dashboard',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'integration-detail': {
      image: '/img/optimized/modal-computer-code.webp',
      ctaText: 'Setup Integration',
      alt: 'MCP protocol integration setup',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    },
    'comprehensive': {
      image: '/img/optimized/modal-comprehensive.webp',
      ctaText: 'Get Comprehensive Analysis',
      alt: 'Cat wrapped in blanket representing comprehensive coverage and comfort',
      ctaLink: 'https://github.com/sibyllinesoft/valknut'
    }
  };

  // Initialize service card modals
  const serviceCards = document.querySelectorAll('.service-card');
  const modal = document.getElementById('service-modal');
  const modalTitle = document.getElementById('modal-title');
  const modalSummary = document.getElementById('modal-summary');
  const modalDetails = document.getElementById('modal-details');
  const modalImage = document.getElementById('modal-image');
  const modalCtaButton = document.getElementById('modal-cta');
  const modalCtaText = document.getElementById('modal-cta-text');
  const modalClose = document.querySelector('.modal-close');
  
  function openModal(card) {
    // Get card content and service type
    const serviceType = card.getAttribute('data-service');
    const title = card.querySelector('h3').innerHTML;
    const summary = card.querySelector('.service-summary p').textContent;
    const details = card.querySelector('.service-details');
    
    // Get service info or use default
    const serviceInfo = serviceData[serviceType] || serviceData['quick-wins'];
    
    // Populate modal content
    modalTitle.innerHTML = title;
    modalSummary.textContent = ''; // Don't repeat the card summary
    modalDetails.innerHTML = details ? details.innerHTML : '';
    
    // Set image only (no CTA for Valknut modals)
    modalImage.src = serviceInfo.image;
    modalImage.alt = serviceInfo.alt;
    
    // Hide CTA button for Valknut modals
    if (modalCtaButton) {
      modalCtaButton.style.display = 'none';
    }
    
    // Show modal
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Apply syntax highlighting
    applySyntaxHighlighting();
    
    // Re-initialize Lucide icons for the new content
    setTimeout(() => {
      lucide.createIcons();
    }, 100);
  }
  
  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
  
  function applySyntaxHighlighting() {
    // No-op: Server-side Prism highlighting is already applied during build.
    // The cloned content already has proper tokenization, so we don't need
    // to modify or re-highlight anything here.
    return;
  }
  
  function applyManualHighlighting() {
    const codeBlocks = modal.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
      const text = block.textContent.trim();
      
      // Check if it looks like bash/shell commands
      if (text.includes('#') || text.includes('cargo') || text.includes('valknut') || 
          text.includes('git') || text.includes('npm') || text.includes('cd') ||
          text.includes('install') || text.includes('clone') || text.includes('./') ||
          text.includes('analyze') || text.includes('mcp-stdio') || text.includes('--')) {
        
        // Apply manual bash syntax highlighting
        const highlighted = text
          .replace(/^(#.*$)/gm, '<span style="color: #6a9955; font-style: italic;">$1</span>') // Comments
          .replace(/\b(cargo|valknut|git|npm|cd|ls|mkdir|chmod|sudo|install|clone|init|serve|analyze)\b/g, '<span style="color: #569cd6; font-weight: 600;">$1</span>') // Commands
          .replace(/\s(--?\w+(?:-\w+)*)/g, ' <span style="color: #c586c0;">$1</span>') // Flags
          .replace(/\$\w+/g, '<span style="color: #4ec9b0;">$&</span>'); // Variables
        
        block.innerHTML = highlighted;
      }
    });
  }
  
  function loadPrismJS() {
    // Load Prism CSS (dark theme)
    const prismCSS = document.createElement('link');
    prismCSS.rel = 'stylesheet';
    prismCSS.href = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-tomorrow.min.css';
    document.head.appendChild(prismCSS);
    
    // Load Prism JS
    const prismJS = document.createElement('script');
    prismJS.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/prism.min.js';
    prismJS.onload = () => {
      // Load JSON and Bash language support
      const jsonScript = document.createElement('script');
      jsonScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-json.min.js';
      
      const bashScript = document.createElement('script');
      bashScript.src = 'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-bash.min.js';
      
      jsonScript.onload = () => {
        bashScript.onload = () => {
          // Now apply highlighting
          applySyntaxHighlighting();
        };
        document.head.appendChild(bashScript);
      };
      document.head.appendChild(jsonScript);
    };
    document.head.appendChild(prismJS);
  }
  
  serviceCards.forEach(card => {
    card.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(card);
    });
  });
  
  // Close modal handlers
  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }
  
  if (modal) {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }
  
  // Close modal with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('active')) {
      closeModal();
    }
  });
  
  // CTA button click handler
  if (modalCtaButton) {
    modalCtaButton.addEventListener('click', (e) => {
      // Let the link work naturally, then close modal
      setTimeout(() => {
        closeModal();
      }, 100);
    });
  }
});