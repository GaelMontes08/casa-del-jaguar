document.addEventListener('DOMContentLoaded', function() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
        
        if (entry.target.querySelector('.grid')) {
          setTimeout(() => {
            const grid = entry.target.querySelector('.grid');
            if (grid) grid.classList.add('animate-in');
          }, 200);
        }

        if (entry.target.classList.contains('testimonial-section')) {
          setTimeout(() => {
            const image = entry.target.querySelector('.testimonial-image');
            const text = entry.target.querySelector('.testimonial-text');
            if (image) image.classList.add('animate-in');
            if (text) text.classList.add('animate-in');
          }, 200);
        }
      }
    });
  }, observerOptions);

  const animateElements = document.querySelectorAll('.scroll-animate');
  animateElements.forEach(el => observer.observe(el));
});
