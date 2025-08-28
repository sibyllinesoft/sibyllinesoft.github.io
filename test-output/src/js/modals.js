/**
 * Modal functionality for service cards
 * Handles modal opening/closing, content population, and email generation
 */

// Service data for modals
const serviceData = {
  startup: {
    image: '/img/optimized/modal-office-meeting.webp',
    ctaText: 'Start Your AI Journey',
    alt: 'Modern coding environment with AI development tools',
    subject: 'Startup AI Architecture & Strategy Inquiry',
    body: 'Hi there! I\'m interested in learning more about your Startup AI Architecture & Strategy services. Could we schedule a time to discuss how you can help build robust AI infrastructure for my startup?'
  },
  enterprise: {
    image: '/img/optimized/modal-building-architecture.webp', 
    ctaText: 'Transform Your Enterprise',
    alt: 'Enterprise building with advanced architectural systems',
    subject: 'Enterprise AI Architecture Consultation',
    body: 'Hello! I\'m interested in your Enterprise AI Architecture services. Can we discuss how to build scalable, production-ready AI systems for our organization?'
  },
  research: {
    image: '/img/optimized/modal-team-meeting.webp',
    ctaText: 'Advance Your Research',
    alt: 'Advanced data visualization and analytics dashboard',
    subject: 'Applied AI Research Partnership',
    body: 'Hi! I\'d like to explore your Applied AI Research services. Could we schedule a consultation to discuss how you can help accelerate our research initiatives?'
  },
  strategic: {
    image: '/img/optimized/modal-team-meeting.webp',
    ctaText: 'Plan Your Strategy',
    alt: 'Strategic team meeting with AI implementation planning',
    subject: 'Strategic AI Implementation Consultation',
    body: 'Hello! I\'d like to discuss Strategic Implementation services to create clear roadmaps from concept to competitive edge. Can we schedule a consultation?'
  }
};

class ModalManager {
  constructor() {
    this.serviceCards = document.querySelectorAll('.service-card');
    this.modal = document.getElementById('service-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalSummary = document.getElementById('modal-summary');
    this.modalDetails = document.getElementById('modal-details');
    this.modalImage = document.getElementById('modal-image');
    this.modalCtaButton = document.getElementById('modal-cta');
    this.modalCtaText = document.getElementById('modal-cta-text');
    this.modalClose = document.querySelector('.modal-close');
    
    this.init();
  }
  
  init() {
    if (!this.modal) {return;}
    
    // Add click listeners to service cards
    this.serviceCards.forEach(card => {
      card.addEventListener('click', (e) => {
        e.preventDefault();
        this.openModal(card);
      });
    });
    
    // Add close modal listeners
    if (this.modalClose) {
      this.modalClose.addEventListener('click', () => this.closeModal());
    }
    
    this.modal.addEventListener('click', (e) => {
      if (e.target === this.modal) {
        this.closeModal();
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });
    
    // CTA button click handler
    if (this.modalCtaButton) {
      this.modalCtaButton.addEventListener('click', (e) => {
        // Let the mailto link work naturally, then close modal
        setTimeout(() => {
          this.closeModal();
        }, 100);
      });
    }
  }
  
  openModal(card) {
    // Get card content and service type
    const serviceType = card.getAttribute('data-service');
    const title = card.querySelector('h3').innerHTML;
    const summary = card.querySelector('.service-summary p').textContent;
    const details = card.querySelector('.service-details');
    const serviceInfo = serviceData[serviceType] || serviceData.startup;
    
    // Populate modal content
    this.modalTitle.innerHTML = title;
    this.modalSummary.textContent = summary;
    this.modalDetails.innerHTML = details ? details.innerHTML : '';
    
    // Set image and CTA
    this.modalImage.src = serviceInfo.image;
    this.modalImage.alt = serviceInfo.alt;
    this.modalCtaText.textContent = serviceInfo.ctaText;
    
    // Create secure mailto link
    const subject = serviceInfo.subject;
    const body = serviceInfo.body;
    this.modalCtaButton.href = window.generateSecureMailto ? 
      window.generateSecureMailto(subject, body, 'hello') : 
      'javascript:void(0)';
    
    // Show modal
    this.modal.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Re-initialize Lucide icons for the new CTA icon
    setTimeout(() => {
      if (window.lucide) {
        lucide.createIcons();
      }
    }, 100);
  }
  
  closeModal() {
    this.modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}

// Export for use in other modules
window.ModalManager = ModalManager;

// Initialize when DOM is ready
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    new ModalManager();
  });
} else {
  new ModalManager();
}