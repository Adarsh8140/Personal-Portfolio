// Skills section functionality
document.addEventListener('DOMContentLoaded', function() {
  // Get all skill tabs and content areas
  const skillTabs = document.querySelectorAll('.skills__tab');
  const skillAreas = document.querySelectorAll('.skills__area');
  
  // Add click event to each tab
  skillTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      // Remove active class from all tabs
      skillTabs.forEach(t => t.classList.remove('active'));
      
      // Add active class to clicked tab
      this.classList.add('active');
      
      // Get target content area
      const target = this.getAttribute('data-target');
      
      // Hide all content areas
      skillAreas.forEach(area => area.classList.remove('active'));
      
      // Show target content area
      document.querySelector(target).classList.add('active');
    });
  });
  
  // Initialize skills animation
  function initSkillsAnimation() {
    // Animate soft skills circles
    const softSkillCircles = document.querySelectorAll('.skills__soft-circle-fill');
    softSkillCircles.forEach(circle => {
      const percentage = circle.getAttribute('data-percentage');
      const circumference = 2 * Math.PI * 15.9155; // Based on the SVG path
      const strokeDasharray = (percentage * circumference) / 100;
      
      circle.style.strokeDasharray = `${strokeDasharray} ${circumference}`;
    });
    
    // Animate skill bars
    const skillBars = document.querySelectorAll('.skills__bar');
    skillBars.forEach(bar => {
      bar.style.width = '0%';
      setTimeout(() => {
        bar.style.width = bar.classList.contains('skills__network') ? '85%' : 
                         bar.classList.contains('skills__vuln') ? '80%' : 
                         bar.classList.contains('skills__pentest') ? '75%' : 
                         bar.classList.contains('skills__crypto') ? '78%' :
                         bar.classList.contains('skills__python') ? '80%' :
                         bar.classList.contains('skills__cpp') ? '85%' :
                         bar.classList.contains('skills__web') ? '75%' :
                         bar.classList.contains('skills__sql') ? '70%' : '0%';
      }, 200);
    });
  }
  
  // Initialize skills animation when the skills section is in view
  const skillsSection = document.getElementById('skills');
  if (skillsSection) {
    const skillsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          initSkillsAnimation();
          skillsObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });
    
    skillsObserver.observe(skillsSection);
  }
});
