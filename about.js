// About section functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all about tabs and content areas
  const aboutTabs = document.querySelectorAll('.about__tab');
  const aboutContents = document.querySelectorAll('.about__tab-content');
  
  // Add click event to each tab
  aboutTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Get target content area
      const target = this.getAttribute('data-tab');
      
      // Remove active class from all tabs
      aboutTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Hide all content areas
      aboutContents.forEach(content => content.classList.remove('active'));
      
      // Show target content area
      document.getElementById(target).classList.add('active');
    });
  });
  
  // Add animation to education timeline
  const educationItems = document.querySelectorAll('.about__education-item');
  
  const educationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.5 });
  
  educationItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    educationObserver.observe(item);
  });
  
  // Add animation to interest items
  const interestItems = document.querySelectorAll('.about__interest-item');
  
  const interestObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
      }
    });
  }, { threshold: 0.5 });
  
  interestItems.forEach(item => {
    item.style.opacity = '0';
    item.style.transform = 'translateY(20px)';
    item.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    interestObserver.observe(item);
  });
});
