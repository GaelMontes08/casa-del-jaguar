// Retreat Calendar Functionality
(function() {
  'use strict';
  
  function initRetreatCalendar() {
    const calendar = document.querySelector('.retreat-calendar');
    if (!calendar) return;

    // Handle retreat selection
    calendar.addEventListener('click', function(e) {
      const day = e.target.closest('.day');
      if (!day || day.classList.contains('empty') || day.classList.contains('past')) {
        return;
      }

      // Remove previous selections
      calendar.querySelectorAll('.day.selected').forEach(d => {
        d.classList.remove('selected');
      });

      if (day.classList.contains('retreat-day')) {
        const retreatId = day.dataset.retreatId;
        const retreatDays = calendar.querySelectorAll(`[data-retreat-id="${retreatId}"]`);
        
        retreatDays.forEach(retreatDay => {
          retreatDay.classList.add('selected');
        });

        const monthCalendar = day.closest('.month-calendar');
        const retreatStartElement = monthCalendar?.querySelector(`[data-retreat-id="${retreatId}"].retreat-start`);
        
        const event = new CustomEvent('retreatSelected', {
          detail: {
            retreatId: retreatId,
            startDate: retreatStartElement?.dataset.date || '',
            dates: Array.from(retreatDays).map(d => d.dataset.date)
          }
        });
        
        calendar.dispatchEvent(event);
      }
    });

    // Handle hover effects
    calendar.addEventListener('mouseenter', function(e) {
      const day = e.target.closest('.day.retreat-day');
      if (!day) return;

      const retreatId = day.dataset.retreatId;
      const retreatDays = calendar.querySelectorAll(`[data-retreat-id="${retreatId}"]`);
      
      retreatDays.forEach(retreatDay => {
        retreatDay.classList.add('hover-group');
      });
    }, true);

    calendar.addEventListener('mouseleave', function(e) {
      const day = e.target.closest('.day.retreat-day');
      if (!day) return;

      calendar.querySelectorAll('.day.hover-group').forEach(d => {
        d.classList.remove('hover-group');
      });
    }, true);
  }

  // Initialize when DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initRetreatCalendar);
  } else {
    initRetreatCalendar();
  }
})();
