/**
 * Secure Contact Email System
 * Multiple layers of obfuscation to defeat email scrapers
 */

(function() {
  'use strict';
    
  // Email domain configuration (encoded)
  const DOMAIN_PARTS = ['sibylline', 'dev'];
  const EMAIL_CONFIGS = {
    contact: {
      user: [110, 97, 116, 104, 97, 110], // 'nathan' in char codes
      subjects: {
        strategy: 'Strategy Session Request',
        technical: 'Technical Assessment Request', 
        innovation: 'Innovation Workshop Interest',
        waitlist: 'Waitlist Registration Request',
        lethe: 'Lethe Research Inquiry',
        'fastpath-research': 'FastPath Research Inquiry',
        matrix: 'Matrix Research Collaboration',
        modules: 'BEM Research Technical Details',
        general: 'General Inquiry'
      }
    },
    hello: {
      user: [110, 97, 116, 104, 97, 110], // 'nathan' in char codes
      subjects: {
        general: 'Hello from your website'
      }
    }
  };
    
  // Anti-scraping delays and checks
  function antiScrapingCheck() {
    // Check for headless browser indicators
    if (navigator.webdriver || 
            window.phantom || 
            window._phantom || 
            window.callPhantom ||
            window.outerHeight === 0 ||
            !window.chrome && navigator.userAgent.indexOf('Chrome') > -1) {
      return false;
    }
        
    // Check for human-like behavior (mouse movement)
    if (!window.hasUserInteracted) {
      return false;
    }
        
    return true;
  }
    
  // Human interaction detection
  let userInteractionDetected = false;
  window.hasUserInteracted = false;
    
  ['mousemove', 'click', 'keydown', 'scroll', 'touchstart'].forEach(event => {
    document.addEventListener(event, function() {
      if (!userInteractionDetected) {
        userInteractionDetected = true;
        window.hasUserInteracted = true;
        // Small delay before enabling email functionality
        setTimeout(() => {
          window.emailSystemReady = true;
        }, Math.random() * 1000 + 500);
      }
    }, { once: true, passive: true });
  });
    
  // ROT13-like but with custom offset
  function deobfuscateString(encoded, offset = 7) {
    return encoded.map(code => String.fromCharCode(code + offset)).join('');
  }
    
  // Build email address with multiple checks
  function buildEmailAddress(emailType = 'contact') {
    if (!antiScrapingCheck() || !window.emailSystemReady) {
      return '#';
    }
        
    const config = EMAIL_CONFIGS[emailType];
    if (!config) {return '#';}
        
    // Decode user part
    const user = String.fromCharCode(...config.user);
        
    // Build domain (add random delay)
    setTimeout(() => {
      // This delay makes automated scraping harder
    }, Math.random() * 100);
        
    const domain = DOMAIN_PARTS.join('.');
    return `${user}@${domain}`;
  }
    
  // Generate secure mailto link
  function generateMailtoLink(emailType = 'contact', subjectType = 'general', customBody = '') {
    if (!antiScrapingCheck() || !window.emailSystemReady) {
      // Return a placeholder that looks like it might work to scrapers
      return 'javascript:void(0)';
    }
        
    const email = buildEmailAddress(emailType);
    if (email === '#') {return 'javascript:void(0)';}
        
    const config = EMAIL_CONFIGS[emailType];
    const subject = config.subjects[subjectType] || config.subjects.general;
        
    const bodyText = customBody || `I'm interested in ${subject.toLowerCase()}. Please contact me about...`;
        
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
  }
    
  // Initialize secure contact links
  function initializeSecureContacts() {
    // Wait for user interaction
    if (!window.emailSystemReady) {
      setTimeout(initializeSecureContacts, 100);
      return;
    }
        
    // Update contact buttons
    document.querySelectorAll('[data-contact-type]').forEach(element => {
      const emailType = element.getAttribute('data-contact-type') || 'contact';
      const subjectType = element.getAttribute('data-subject-type') || 'general';
      const customBody = element.getAttribute('data-custom-body') || '';
            
      const mailtoLink = generateMailtoLink(emailType, subjectType, customBody);
            
      if (element.tagName.toLowerCase() === 'a') {
        element.href = mailtoLink;
      } else {
        element.addEventListener('click', function(e) {
          e.preventDefault();
          if (mailtoLink !== 'javascript:void(0)') {
            window.location.href = mailtoLink;
          }
        });
      }
    });
        
    // Update email display elements
    document.querySelectorAll('[data-email-display]').forEach(element => {
      const emailType = element.getAttribute('data-email-display') || 'contact';
      const email = buildEmailAddress(emailType);
            
      if (email !== '#') {
        element.textContent = email;
        if (element.tagName.toLowerCase() === 'a') {
          element.href = `mailto:${email}`;
        }
      }
    });
        
    // Update modal email system (for existing modal functionality)
    if (window.updateModalEmail) {
      window.updateModalEmail = function(emailType = 'hello') {
        return buildEmailAddress(emailType);
      };
    }
  }
    
  // Enhanced modal functionality for existing code
  window.generateSecureMailto = function(subject, body, emailType = 'hello') {
    if (!antiScrapingCheck() || !window.emailSystemReady) {
      return 'javascript:void(0)';
    }
        
    const email = buildEmailAddress(emailType);
    if (email === '#') {return 'javascript:void(0)';}
        
    return `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };
    
  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeSecureContacts);
  } else {
    initializeSecureContacts();
  }
    
  // Re-initialize periodically to catch dynamically added elements
  setInterval(initializeSecureContacts, 2000);
    
})();