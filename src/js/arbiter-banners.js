// Arbiter Banner Rotation and Card Interaction Script

document.addEventListener('DOMContentLoaded', function() {
    // Initialize rotating banners
    initRotatingBanners();
    
    // Initialize service card interactions
    initServiceCards();
});

function initRotatingBanners() {
    const bannerTexts = document.querySelectorAll('.banner-text');
    const heroData = document.querySelector('.hero-data');
    
    if (!bannerTexts.length || !heroData) return;
    
    // Extract banner data from hidden div
    const titleSubtitleGroups = heroData.querySelectorAll('.title-subtitle-group');
    const bannerData = Array.from(titleSubtitleGroups).map(group => {
        const title = group.querySelector('.title')?.textContent || '';
        const subtitle = group.querySelector('.subtitle')?.textContent || '';
        return { title, subtitle };
    });
    
    let currentIndex = 0;
    
    function updateBanners() {
        // Hide all banners
        bannerTexts.forEach(banner => {
            banner.classList.remove('active');
        });
        
        // Update banner content and show active ones
        if (bannerData[currentIndex]) {
            const currentData = bannerData[currentIndex];
            
            // Update hero title
            const heroTitle = document.querySelector('.hero-title');
            if (heroTitle && currentData.title) {
                heroTitle.textContent = currentData.title;
            }
            
            // Update and show banners with subtitle content
            bannerTexts.forEach((banner, index) => {
                if (index < bannerData.length - 1) { // Exclude title from banners
                    const bannerIndex = (currentIndex + index + 1) % bannerData.length;
                    const bannerContent = bannerData[bannerIndex]?.subtitle || '';
                    banner.textContent = bannerContent;
                    banner.setAttribute('data-text', bannerContent);
                    
                    // Show banner with delay
                    setTimeout(() => {
                        banner.classList.add('active');
                    }, index * 200);
                }
            });
        }
        
        // Move to next set
        currentIndex = (currentIndex + 1) % bannerData.length;
    }
    
    // Initial display
    updateBanners();
    
    // Rotate banners every 4 seconds
    setInterval(updateBanners, 4000);
}

function initServiceCards() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const summary = card.querySelector('.service-summary');
        const details = card.querySelector('.service-details');
        
        if (!summary || !details) return;
        
        // Add click listener to the entire card
        card.addEventListener('click', function(e) {
            // Prevent default if clicking on links
            if (e.target.tagName === 'A') return;
            
            toggleCard(card, details);
        });
        
        // Add keyboard support
        card.setAttribute('tabindex', '0');
        card.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                toggleCard(card, details);
            }
        });
    });
}

function toggleCard(card, details) {
    const isExpanded = details.classList.contains('expanded');
    
    // Close all other cards first
    document.querySelectorAll('.service-card').forEach(otherCard => {
        if (otherCard !== card) {
            const otherDetails = otherCard.querySelector('.service-details');
            if (otherDetails) {
                otherDetails.classList.remove('expanded');
                otherCard.classList.remove('expanded');
                otherCard.setAttribute('aria-expanded', 'false');
            }
        }
    });
    
    // Toggle current card
    if (isExpanded) {
        details.classList.remove('expanded');
        card.classList.remove('expanded');
        card.setAttribute('aria-expanded', 'false');
    } else {
        details.classList.add('expanded');
        card.classList.add('expanded');
        card.setAttribute('aria-expanded', 'true');
        
        // Smooth scroll to card if needed
        setTimeout(() => {
            const cardRect = card.getBoundingClientRect();
            const viewportHeight = window.innerHeight;
            
            // If card is not fully visible, scroll it into view
            if (cardRect.bottom > viewportHeight || cardRect.top < 100) {
                card.scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start',
                    inline: 'nearest'
                });
            }
        }, 150);
    }
}

// Add modal functionality for service cards if needed
function addServiceModal() {
    // This can be extended if you want modal popups instead of inline expansion
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach(card => {
        const serviceType = card.getAttribute('data-service');
        if (!serviceType) return;
        
        // Add data attributes for potential modal integration
        card.setAttribute('data-modal-target', `arbiter-${serviceType}-modal`);
    });
}

// Utility function to handle smooth animations
function animateHeight(element, startHeight, endHeight, duration = 300) {
    const startTime = performance.now();
    
    function animate(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Easing function for smooth animation
        const easeProgress = 1 - Math.pow(1 - progress, 3);
        
        const currentHeight = startHeight + (endHeight - startHeight) * easeProgress;
        element.style.height = `${currentHeight}px`;
        
        if (progress < 1) {
            requestAnimationFrame(animate);
        } else {
            element.style.height = endHeight === 0 ? '0' : 'auto';
        }
    }
    
    requestAnimationFrame(animate);
}

// Enhanced accessibility features
function enhanceAccessibility() {
    const serviceCards = document.querySelectorAll('.service-card');
    
    serviceCards.forEach((card, index) => {
        // Add proper ARIA labels
        const heading = card.querySelector('h3');
        const summary = card.querySelector('.service-summary');
        const details = card.querySelector('.service-details');
        
        if (heading && summary && details) {
            const headingId = `arbiter-service-heading-${index}`;
            const summaryId = `arbiter-service-summary-${index}`;
            const detailsId = `arbiter-service-details-${index}`;
            
            heading.id = headingId;
            summary.id = summaryId;
            details.id = detailsId;
            
            card.setAttribute('aria-labelledby', headingId);
            card.setAttribute('aria-describedby', summaryId);
            card.setAttribute('aria-expanded', 'false');
            card.setAttribute('role', 'button');
            
            details.setAttribute('aria-hidden', 'true');
        }
    });
}

// Initialize enhanced features
document.addEventListener('DOMContentLoaded', function() {
    enhanceAccessibility();
    
    // Add focus management
    document.addEventListener('keydown', function(e) {
        // Handle Escape key to close expanded cards
        if (e.key === 'Escape') {
            const expandedCards = document.querySelectorAll('.service-card.expanded');
            expandedCards.forEach(card => {
                const details = card.querySelector('.service-details');
                if (details) {
                    details.classList.remove('expanded');
                    card.classList.remove('expanded');
                    card.setAttribute('aria-expanded', 'false');
                    card.focus();
                }
            });
        }
    });
});

// Performance optimization: Debounced resize handler
let resizeTimeout;
window.addEventListener('resize', function() {
    clearTimeout(resizeTimeout);
    resizeTimeout = setTimeout(function() {
        // Handle any resize-specific logic here
        const expandedDetails = document.querySelectorAll('.service-details.expanded');
        expandedDetails.forEach(details => {
            // Reset height calculation on resize
            details.style.height = 'auto';
        });
    }, 250);
});

// Export functions for testing or external use
window.ArbiterBanners = {
    initRotatingBanners,
    initServiceCards,
    toggleCard,
    enhanceAccessibility
};