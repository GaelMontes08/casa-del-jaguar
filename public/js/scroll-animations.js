// Enhanced Scroll Animations - Optimized for performance
(function() {
  'use strict';

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, [data-animate]');
    
    if (!animatedElements.length) return;

    let ticking = false;

    function animateOnScroll() {
      animatedElements.forEach((element, index) => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.85 && rect.bottom > 0;
        
        if (isVisible && !element.classList.contains('animate-in')) {
          // Add a small delay for staggered animations
          setTimeout(() => {
            element.classList.add('animate-in');
          }, index * 100);
        }
      });
      
      ticking = false;
    }

    function requestTick() {
      if (!ticking) {
        requestAnimationFrame(animateOnScroll);
        ticking = true;
      }
    }

    // Initial check for elements already in view
    animateOnScroll();
    
    // Add scroll event listener
    window.addEventListener('scroll', requestTick, { passive: true });
    
    // Also check on resize
    window.addEventListener('resize', requestTick, { passive: true });
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
