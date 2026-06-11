// Hero rotation handled by shared /js/hero-rotation.js
document.addEventListener('DOMContentLoaded', function() {

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
