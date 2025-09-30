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
  },
  agentic: {
    image: 'custom-visualization', // Special flag for custom visualization
    ctaText: 'Build Agent Systems',
    alt: 'Production pipeline visualization for autonomous agent systems',
    subject: 'Autonomous Agent Systems Development',
    body: 'Hi! I\'m interested in your Autonomous Agent Systems development services. Can we discuss how to build production-ready agent systems that scale safely?'
  },
  // Arbiter-specific services
  drift: {
    image: '/img/optimized/modal-quick-wins.webp',
    ctaText: 'Solve Requirements Drift',
    alt: 'Team collaboration addressing requirements drift challenges',
    subject: 'Requirements Drift Solution Inquiry',
    body: 'Hi! I\'m struggling with requirements drift in our projects. Can we discuss how Arbiter can help keep our specifications synchronized with evolving business needs?'
  },
  ambiguity: {
    image: '/img/optimized/modal-isolated.webp',
    ctaText: 'Eliminate Ambiguity',
    alt: 'Clear technical documentation and specifications',
    subject: 'Specification Ambiguity Resolution',
    body: 'Hello! Our team is dealing with interpretation ambiguity in our specifications. Can we explore how Arbiter can provide mathematical precision to eliminate confusion?'
  },
  validation: {
    image: '/img/optimized/modal-systemic.webp',
    ctaText: 'Implement Validation',
    alt: 'Automated validation and testing systems',
    subject: 'Automated Validation Implementation',
    body: 'Hi! We need automated ways to verify implementation compliance. Can we discuss how Arbiter can provide continuous validation mechanisms for our projects?'
  },
  'schema-validation': {
    image: 'https://images.unsplash.com/photo-1704964971025-e3ce2b8fdc91?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Show Live Mission Control',
    alt: 'Live mission control dashboard for agent progress and audits',
    subject: 'Live Mission Control Walkthrough',
    body: 'Hello! I\'d like to see how Arbiter\'s portal turns specs into live architecture diagrams, docs, and test telemetry so humans can audit agent work in real time. Could we schedule a walkthrough?',
    disableCta: true
  },
  'api-contracts': {
    image: 'https://images.unsplash.com/photo-1716391364025-aa44e51a535e?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Sync API Contracts',
    alt: 'Executable API contracts powering consistent implementations',
    subject: 'Executable API Contract Workflow',
    body: 'Hi! I want our API contracts, validation, and generated clients to stay in sync. Could we dive into how Arbiter uses shared types to drive consistent implementations across services?',
    disableCta: true
  },
  'full-system': {
    image: 'https://images.unsplash.com/photo-1552705906-adcf48ae889a?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Ship Systems from Specs',
    alt: 'Engineers reviewing generated services, infrastructure, and tests',
    subject: 'Spec-to-System Automation Inquiry',
    body: 'Hello! I want to see Arbiter turn a declarative spec into synchronized services, infrastructure manifests, tests, and docs. Could we walk through the CLI flow and how template overrides keep everything in lockstep?',
    disableCta: true
  },
  'github-integration': {
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Wire Up GitHub Ops',
    alt: 'GitHub checks and issues synchronized with Arbiter automation',
    subject: 'GitHub & CI Automation with Arbiter',
    body: 'Hi! I need merges blocked on spec drift and agent workflows mirrored into GitHub Issues and Checks. Could we cover the built-in integrations and how to extend them for our organization?',
    disableCta: true
  },
  'mathematical-correctness': {
    image: 'https://images.unsplash.com/photo-1646763342742-e15af86f2825?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Enforce Constraint Specs',
    alt: 'Constraint-backed specifications under review in Arbiter',
    subject: 'Constraint-Backed Spec Guardrails',
    body: 'Hello! I want Arbiter\'s CUE specs wired into our delivery pipeline so agents can only ship code that satisfies the constraints. Could we walk through constraint validation and drift detection in CI?',
    disableCta: true
  },
  'surgical-generation': {
    image: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Adopt Arbiter Incrementally',
    alt: 'Engineers evolving an existing codebase with Arbiter guidance',
    subject: 'Incremental Adoption Strategy',
    body: 'Hi! I want to bring Arbiter into a live codebase without losing handwritten logic. Could we cover how the importer seeds specs from real projects and how incremental regeneration keeps custom code intact?',
    disableCta: true
  },
  'constraint-backed-specs': {
    image: 'https://images.unsplash.com/photo-1646763342742-e15af86f2825?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Implement Constraint-Backed Specs',
    alt: 'Constraint-backed specifications and CI enforcement',
    subject: 'Constraint-Backed Specifications Implementation',
    body: 'Hello! I\'m interested in implementing constraint-backed specs with CI enforcement. Can we discuss how to build CUE specifications that generate immutable tests and prevent agent divergence?'
  },
  'full-stack-generation': {
    image: 'https://images.unsplash.com/photo-1552705906-adcf48ae889a?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Setup Full-Stack Generation',
    alt: 'Full-stack generation and synchronization',
    subject: 'Full-Stack Generation & Sync Implementation',
    body: 'Hi! I\'m interested in full-stack generation from specifications. Can we discuss how to generate services, infrastructure, tests, and docs from one spec with GitHub/GitLab sync?'
  },
  'vcs-ci-sync': {
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Setup VCS Integration',
    alt: 'Version control and CI synchronization',
    subject: 'VCS + CI Sync Implementation',
    body: 'Hello! I\'m interested in setting up VCS and CI integration with automated synchronization. Can we discuss GitHub/GitLab integration with spec enforcement and agent coordination?'
  },
  'live-docs-diagrams': {
    image: 'https://images.unsplash.com/photo-1704964971025-e3ce2b8fdc91?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Enable Live Documentation',
    alt: 'Live documentation and diagrams',
    subject: 'Live Documentation & Diagrams Setup',
    body: 'Hi! I\'m interested in implementing live documentation and diagrams that update in real-time. Can we discuss portal rendering of architectural diagrams and API docs as agents work?'
  },
  'agent-native-interfaces': {
    image: '/img/optimized/modal-integration.webp',
    ctaText: 'Setup Agent Interfaces',
    alt: 'Agent-native interfaces and webhooks',
    subject: 'Agent-Native Interfaces Implementation',
    body: 'Hello! I\'m interested in implementing agent-native interfaces with NDJSON and webhook events. Can we discuss APIs designed specifically for AI agent coordination and workflow automation?'
  },
  'incremental-adoption': {
    image: 'https://images.unsplash.com/photo-1716391364025-aa44e51a535e?q=80&w=500&h=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    ctaText: 'Start Incremental Adoption',
    alt: 'Incremental adoption and legacy integration',
    subject: 'Incremental Adoption Strategy',
    body: 'Hi! I\'m interested in incremental adoption for existing codebases. Can we discuss how to analyze existing repositories and generate baseline specifications for gradual agent enhancement?'
  }
};

class ModalManager {
  constructor() {
    this.modal = document.getElementById('service-modal');
    this.modalTitle = document.getElementById('modal-title');
    this.modalSummary = document.getElementById('modal-summary');
    this.modalDetails = document.getElementById('modal-details');
    this.modalImage = document.getElementById('modal-image');
    this.modalCtaButton = document.getElementById('modal-cta');
    this.modalCtaText = document.getElementById('modal-cta-text');
    this.modalCtaContainer = this.modalCtaButton?.closest('.modal-cta') || document.querySelector('.modal-cta');
    this.modalCtaDefaultDisplay = this.modalCtaContainer ? window.getComputedStyle(this.modalCtaContainer).display : '';
    this.serviceCards = document.querySelectorAll('.service-card');
    
    this.init();
  }
  
  init() {
    if (!this.modal) return;
    
    // Event delegation for service cards (no this binding issues)
    document.addEventListener('click', (e) => {
      const card = e.target.closest('.service-card');
      if (!card) return;
      e.preventDefault();
      
      // Always open modal for all screen sizes
      this.openModal(card);
    });

    // Modal close handlers (event delegation)
    this.modal.addEventListener('click', (e) => {
      if (e.target.classList.contains('modal-overlay') || e.target.closest('.modal-close')) {
        this.closeModal();
        this.modalDetails.replaceChildren(); // Clean up
        document.body.style.overflow = '';
      }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && this.modal.classList.contains('active')) {
        this.closeModal();
      }
    });

    // Set up intersection observer for automatic animations
    this.initIntersectionObserver();
    
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
    const disableCta = Boolean(serviceInfo.disableCta);
    
    // Populate modal content
    this.modalTitle.innerHTML = title;
    this.modalSummary.textContent = summary;
    
    // Surgical cloning of children (no wrapper nesting)
    if (details) {
      const frag = document.createDocumentFragment();
      for (const node of details.childNodes) {
        frag.appendChild(node.cloneNode(true));
      }
      
      // Remove duplicate IDs to prevent DOM conflicts
      frag.querySelectorAll?.('[id]').forEach(n => n.removeAttribute('id'));
      
      // Remove service-cta from cloned content
      const cta = frag.querySelector('.service-cta');
      if (cta) {
        cta.remove();
      }
      
      this.modalDetails.replaceChildren(frag);
    } else {
      this.modalDetails.replaceChildren();
    }
    
    // Set image and CTA - handle custom visualization for agentic service
    if (serviceType === 'agentic' && serviceInfo.image === 'custom-visualization') {
      // Hide the standard modal image and show the production pipeline instead
      this.modalImage.style.display = 'none';
      
      // Create or update custom visualization container
      let customVizContainer = this.modal.querySelector('.modal-custom-visualization');
      if (!customVizContainer) {
        customVizContainer = document.createElement('div');
        customVizContainer.className = 'modal-custom-visualization';
        this.modalImage.parentNode.insertBefore(customVizContainer, this.modalImage);
      }
      
      // Clone the production pipeline from the card
      const originalPipeline = card.querySelector('.production-pipeline');
      if (originalPipeline) {
        customVizContainer.innerHTML = originalPipeline.outerHTML;
        customVizContainer.style.display = 'block';
        
        // Trigger animations for the cloned pipeline
        setTimeout(() => {
          this.triggerModalPipelineAnimations(customVizContainer);
        }, 100);
      }
    } else {
      // Standard image display for other services
      this.modalImage.style.display = 'block';
      this.modalImage.src = serviceInfo.image;
      
      // Hide custom visualization if it exists
      const customVizContainer = this.modal.querySelector('.modal-custom-visualization');
      if (customVizContainer) {
        customVizContainer.style.display = 'none';
      }
    }
    
    this.modalImage.alt = serviceInfo.alt;
    
    if (this.modalCtaContainer) {
      if (disableCta) {
        this.modalCtaContainer.style.display = 'none';
      } else {
        this.modalCtaContainer.style.display = this.modalCtaDefaultDisplay;
      }
    }

    if (!disableCta && this.modalCtaButton && this.modalCtaText) {
      this.modalCtaText.textContent = serviceInfo.ctaText || 'Get Started';

      const subject = serviceInfo.subject;
      const body = serviceInfo.body;
      this.modalCtaButton.href = window.generateSecureMailto && subject && body ?
        window.generateSecureMailto(subject, body, 'hello') :
        'javascript:void(0)';
    } else if (this.modalCtaButton && this.modalCtaText) {
      this.modalCtaButton.href = 'javascript:void(0)';
      this.modalCtaText.textContent = '';
    }
    
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
  
  toggleInlineExpansion(card) {
    // Close any other expanded cards
    this.serviceCards.forEach(otherCard => {
      if (otherCard !== card && otherCard.classList.contains('expanded')) {
        otherCard.classList.remove('expanded');
      }
    });
    
    // Toggle expansion of clicked card
    const isExpanded = card.classList.contains('expanded');
    
    if (isExpanded) {
      card.classList.remove('expanded');
    } else {
      card.classList.add('expanded');
      
      // Trigger animations for service-visual elements
      setTimeout(() => {
        this.triggerServiceVisualAnimations(card);
      }, 100);
    }
  }
  
  initIntersectionObserver() {
    // Create an intersection observer to trigger animations when cards come into view
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const card = entry.target;
          const serviceVisual = card.querySelector('.service-visual');
          
          // Trigger a subtle version of animations for cards in view
          if (serviceVisual && !serviceVisual.classList.contains('auto-animated')) {
            serviceVisual.classList.add('auto-animated');
            this.triggerPreviewAnimations(card);
          }
        }
      });
    }, {
      threshold: 0.3, // Trigger when 30% of the card is visible
      rootMargin: '0px 0px -50px 0px' // Slight offset from bottom
    });

    // Observe all service cards
    this.serviceCards.forEach(card => {
      observer.observe(card);
    });
  }

  triggerPreviewAnimations(card) {
    const aiArchitecture = card.querySelector('.ai-first-architecture');
    if (aiArchitecture) {
      const layers = aiArchitecture.querySelectorAll('.arch-layer');
      
      // Subtle animation for preview - just fade in the layers
      layers.forEach((layer, index) => {
        setTimeout(() => {
          layer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
          layer.style.opacity = '1';
          layer.style.transform = 'translateY(0)';
        }, index * 200 + 500);
      });

      // Animate velocity multiplier after layers
      const velocityMultiplier = aiArchitecture.querySelector('.velocity-multiplier');
      if (velocityMultiplier) {
        setTimeout(() => {
          velocityMultiplier.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          velocityMultiplier.style.opacity = '1';
          velocityMultiplier.style.transform = 'scale(1)';
        }, layers.length * 200 + 800);
      }
    }
    
    // Also trigger production pipeline preview animations
    const serviceVisual = card.querySelector('.service-visual');
    const productionPipeline = serviceVisual?.querySelector('.production-pipeline');
    if (productionPipeline) {
      // Subtle flowing animation for preview
      const flowingElements = productionPipeline.querySelectorAll('.flowing');
      setTimeout(() => {
        flowingElements.forEach((element, index) => {
          element.style.opacity = '0.7';
          element.style.animation = 'pipelineFlow 4s infinite';
          element.style.animationDelay = `${index * 0.8}s`;
        });
      }, 1000);
    }
  }

  triggerServiceVisualAnimations(card) {
    const serviceVisual = card.querySelector('.service-visual');
    if (serviceVisual) {
      // Add a class to trigger animations
      serviceVisual.classList.add('animate');
      
      // Force reflow to ensure animations play
      serviceVisual.offsetHeight;
      
      // Restart animations by temporarily removing and re-adding animation styles
      const animatedElements = serviceVisual.querySelectorAll('.arch-layer, .milestone-marker, .network-node, .skill-level');
      
      // Trigger production pipeline animations
      const productionPipeline = serviceVisual.querySelector('.production-pipeline');
      if (productionPipeline) {
        // Activate flowing elements
        const flowingElements = productionPipeline.querySelectorAll('.flowing');
        flowingElements.forEach((element, index) => {
          setTimeout(() => {
            element.style.opacity = '1';
            element.style.animation = 'pipelineFlow 3s infinite';
            element.style.animationDelay = `${index * 0.5}s`;
          }, index * 200 + 300);
        });
        
        // Trigger agent scaling animations
        const agentInstances = productionPipeline.querySelectorAll('.agent-instance');
        agentInstances.forEach((instance, index) => {
          setTimeout(() => {
            instance.style.animation = 'agentScale 2s infinite';
            instance.style.animationDelay = `${index * 0.3}s`;
          }, 800);
        });
      }
      animatedElements.forEach((el, index) => {
        // Reset the element to initial state
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.animation = 'none';
        el.offsetHeight; // Force reflow
        
        // Re-apply animation with staggered delays
        setTimeout(() => {
          el.style.animation = '';
          if (el.classList.contains('arch-layer')) {
            el.style.animationDelay = `${index * 0.15}s`;
          }
        }, 10);
      });

      // Trigger specific animations for AI architecture elements
      const aiArchitecture = serviceVisual.querySelector('.ai-first-architecture');
      if (aiArchitecture) {
        const layers = aiArchitecture.querySelectorAll('.arch-layer');
        layers.forEach((layer, index) => {
          layer.style.opacity = '0';
          layer.style.transform = 'translateY(20px)';
          
          setTimeout(() => {
            layer.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
            layer.style.opacity = '1';
            layer.style.transform = 'translateY(0)';
          }, index * 100 + 200);
        });

        // Animate velocity multiplier
        const velocityMultiplier = aiArchitecture.querySelector('.velocity-multiplier');
        if (velocityMultiplier) {
          velocityMultiplier.style.opacity = '0';
          velocityMultiplier.style.transform = 'scale(0.8)';
          setTimeout(() => {
            velocityMultiplier.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
            velocityMultiplier.style.opacity = '1';
            velocityMultiplier.style.transform = 'scale(1)';
          }, 800);
        }
      }
    }
  }

  triggerModalPipelineAnimations(container) {
    const productionPipeline = container.querySelector('.production-pipeline');
    if (!productionPipeline) return;

    // Reset and animate pipeline stages
    const pipelineStages = productionPipeline.querySelectorAll('.pipeline-stage');
    pipelineStages.forEach((stage, index) => {
      stage.style.opacity = '0';
      stage.style.transform = 'translateY(10px)';
      
      setTimeout(() => {
        stage.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        stage.style.opacity = '1';
        stage.style.transform = 'translateY(0)';
      }, index * 150 + 200);
    });

    // Animate uptime indicator
    const uptimeIndicator = productionPipeline.querySelector('.uptime-indicator');
    if (uptimeIndicator) {
      uptimeIndicator.style.opacity = '0';
      setTimeout(() => {
        uptimeIndicator.style.transition = 'opacity 0.8s ease-out';
        uptimeIndicator.style.opacity = '1';
        
        // Add pulsing animation for uptime
        setTimeout(() => {
          uptimeIndicator.style.animation = 'statusPulse 2s infinite';
        }, 500);
      }, 800);
    }

    // Animate agent swarm and scaling indicator
    const agentSwarm = productionPipeline.querySelector('.agent-swarm');
    if (agentSwarm) {
      const scalingIndicator = agentSwarm.querySelector('.scaling-indicator');
      if (scalingIndicator) {
        scalingIndicator.style.opacity = '0';
        scalingIndicator.style.transform = 'scale(0.8)';
        
        setTimeout(() => {
          scalingIndicator.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
          scalingIndicator.style.opacity = '1';
          scalingIndicator.style.transform = 'scale(1)';
          
          // Add scaling animation
          setTimeout(() => {
            scalingIndicator.style.animation = 'agentScale 2s infinite';
          }, 300);
        }, 1000);
      }

      // Animate agent instances
      const agentInstances = agentSwarm.querySelectorAll('.agent-instance');
      agentInstances.forEach((instance, index) => {
        instance.style.opacity = '0';
        instance.style.transform = 'scale(0.5)';
        
        setTimeout(() => {
          instance.style.transition = 'opacity 0.4s ease-out, transform 0.4s ease-out';
          instance.style.opacity = '1';
          instance.style.transform = 'scale(1)';
          
          // Add individual scaling animations
          setTimeout(() => {
            instance.style.animation = 'agentScale 2s infinite';
            instance.style.animationDelay = `${index * 0.3}s`;
          }, 200);
        }, 1200 + index * 100);
      });
    }

    // Add flowing animation to the entire pipeline after initial animations
    setTimeout(() => {
      const flowingElements = productionPipeline.querySelectorAll('.flowing, .pipeline-stage');
      flowingElements.forEach((element, index) => {
        if (!element.style.animation || element.style.animation === 'none') {
          element.style.animation = `pipelineFlow 4s infinite`;
          element.style.animationDelay = `${index * 0.6}s`;
        }
      });
    }, 1500);
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
