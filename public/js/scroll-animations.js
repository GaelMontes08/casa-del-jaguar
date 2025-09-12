// Minimal Scroll Animations - Optimized for performance
(function() {
  'use strict';

  function initScrollAnimations() {
    const animatedElements = document.querySelectorAll('.scroll-animate, [data-animate]');
    if (!animatedElements.length) return;

    let ticking = false;

    function animateOnScroll() {
      animatedElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        
        if (isVisible && !element.classList.contains('animate-in')) {
          element.classList.add('animate-in');
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

    window.addEventListener('scroll', requestTick, { passive: true });
    animateOnScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initScrollAnimations);
  } else {
    initScrollAnimations();
  }
})();
