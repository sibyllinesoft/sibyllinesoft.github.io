// Basic JavaScript for your site
document.addEventListener('DOMContentLoaded', function() {
    console.log('Sibylline Software site loaded successfully!');
    
    // Add any interactive features here
    // For example, smooth scrolling for anchor links
    const links = document.querySelectorAll('a[href^="#"]');
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });
});