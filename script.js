/* MENU SHOW */ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId);
    const nav = document.getElementById(navId);

    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show');
            // Change toggle icon
            const icon = toggle.querySelector('ion-icon');
            if (nav.classList.contains('show')) {
                icon.setAttribute('name', 'close');
            } else {
                icon.setAttribute('name', 'menu');
            }
        });
    }
}

showMenu('nav-toggle', 'nav-menu');

/* ACTIVE LINKS */
const navLinks = document.querySelectorAll('.nav__link');
const sections = document.querySelectorAll('section[id]');

function linkAction() {
    // Active link
    navLinks.forEach(n => n.classList.remove('active'));
    this.classList.add('active');
    
    // Remove menu mobile
    const navMenu = document.getElementById('nav-menu');
    navMenu.classList.remove('show');
    
    // Reset toggle icon
    const toggle = document.getElementById('nav-toggle');
    const icon = toggle.querySelector('ion-icon');
    icon.setAttribute('name', 'menu');
}

navLinks.forEach(n => n.addEventListener('click', linkAction));

/* SCROLL ACTIVE LINK */
function scrollActive() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 50;
        const sectionId = current.getAttribute('id');
        
        if(scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.add('active');
        } else {
            document.querySelector('.nav__link[href*=' + sectionId + ']').classList.remove('active');
        }
    });
}

window.addEventListener('scroll', scrollActive);
function scrollHeader(){
    const header = document.getElementById('header')
    // When the scroll is greater than 50 viewport height, add the scroll-header class to the header tag
    if(this.scrollY >= 50) header.classList.add('scroll-header'); else header.classList.remove('scroll-header')
}
window.addEventListener('scroll', scrollHeader)

/* SCROLL TOP */ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top')
    // When the scroll is higher than 560 viewport height, add the show-scroll class to the a tag with the scroll-top class
    if(this.scrollY >= 560) scrollTop.classList.add('show-scroll'); else scrollTop.classList.remove('show-scroll')
}
window.addEventListener('scroll', scrollTop)

/* PROJECT FILTERING */
const filterButtons = document.querySelectorAll('.projects__filter-btn');
const projectItems = document.querySelectorAll('.projects__box');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {
        // Set active button
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');
        
        const filterValue = button.getAttribute('data-filter');
        
        projectItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                item.style.display = 'block';
                setTimeout(() => {
                    item.style.opacity = '1';
                    item.style.transform = 'scale(1)';
                }, 200);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                }, 300);
            }
        });
    });
});

/* SCROLL REVEAL ANIMATION */
const scroll = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    delay: 200,
    reset: true,
    easing: 'ease-in-out'
})

/* SCROLL HOME */
scroll.reveal('.home__title', {})
scroll.reveal('.home__information', {delay: 200})
scroll.reveal('.home__img', {delay: 400})
scroll.reveal('.home__social-icon', {interval: 200})

/* SCROLL ABOUT */
scroll.reveal('.about__img', {})
scroll.reveal('.about__subtitle', {delay: 200})
scroll.reveal('.about__text', {delay: 400})
scroll.reveal('.skills__data', {interval: 200})

/* SCROLL SERVICES */
scroll.reveal('.services__box', {interval: 200})

/* SCROLL PROJECTS */
scroll.reveal('.projects__box', {interval: 200})

/* SCROLL CONTACT */
scroll.reveal('.contact__input', {interval: 200})
scroll.reveal('.contact__button', {delay: 400})
scroll.reveal('.contact__information', {interval: 200})

/*----- ANIMATE -----*/
// OVERLAY
gsap.to(".first", 1.5, {delay: .5, top: "-100%", ease: Expo.easeInOut});
gsap.to(".second", 1.5, {delay: .7, top: "-100%", ease: Expo.easeInOut});
gsap.to(".third", 1.5, {delay: .9, top: "-100%", ease: Expo.easeInOut});

// IMG
gsap.from('.home__img', {opacity: 0, duration: 2, delay: 2, x: 60})

// INFORMATION
gsap.from('.home__information', {opacity: 0, duration: 3, delay: 2.3, y: 25})
gsap.from('.anime-text', {opacity: 0, duration: 3, delay: 2.3, y: 25, ease:'expo.out', stagger: .3})

// NAV ITEM
gsap.from('.nav__logo', {opacity:0, duration: 3, delay: 3.2, y: 25, ease:'expo.out'});
gsap.from('.nav__item', {opacity: 0, duration: 3, delay: 3.2, y: 25, ease:'expo.out', stagger: .2})

// SOCIAL
gsap.from('.home__social-icon', {opacity: 0, duration: 3, delay: 4, y: 25, ease:'expo.out', stagger: .2})

// Form submission handling with email functionality
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault(); // Prevent the default form submission
        
        // Get form values
        const formData = new FormData(this);
        
        // Form validation
        let isValid = true;
        const inputs = this.querySelectorAll('.contact__input');
        
        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = 'var(--danger-color)';
                input.classList.add('error');
            } else {
                input.style.borderColor = 'var(--first-color)';
                input.classList.remove('error');
            }
        });
        
        if (!isValid) {
            formStatus.textContent = 'Please fill all fields';
            formStatus.className = 'form__status error';
            return false;
        }
        
        // Show loading state
        const button = this.querySelector('.contact__button');
        const buttonText = button.querySelector('.button__text');
        const originalText = buttonText.textContent;
        buttonText.textContent = 'Sending...';
        button.disabled = true;
        
        // Send form data using Fetch API to Formspree
        fetch(this.action, {
            method: 'POST',
            body: formData,
            headers: {
                'Accept': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) {
                // Success
                formStatus.textContent = 'Message sent successfully!';
                formStatus.className = 'form__status success';
                
                // Create a success notification
                const notification = document.createElement('div');
                notification.className = 'form-notification success';
                notification.innerHTML = `
                    <ion-icon name="checkmark-circle-outline"></ion-icon>
                    <p>Thank you! Your message has been sent successfully.</p>
                    <button class="notification-close">
                        <ion-icon name="close-outline"></ion-icon>
                    </button>
                `;
                document.body.appendChild(notification);
                
                // Add event listener to close button
                notification.querySelector('.notification-close').addEventListener('click', () => {
                    notification.classList.add('hide');
                    setTimeout(() => notification.remove(), 300);
                });
                
                // Auto remove after 5 seconds
                setTimeout(() => {
                    notification.classList.add('hide');
                    setTimeout(() => notification.remove(), 300);
                }, 5000);
                
                // Reset the form
                this.reset();
            } else {
                // Error
                response.json().then(data => {
                    if (Object.hasOwnProperty.call(data, 'errors')) {
                        formStatus.textContent = data.errors.map(error => error.message).join(', ');
                    } else {
                        formStatus.textContent = 'Oops! There was a problem sending your message';
                    }
                    formStatus.className = 'form__status error';
                });
            }
        })
        .catch(error => {
            // Network error
            formStatus.textContent = 'Network error, please try again';
            formStatus.className = 'form__status error';
        })
        .finally(() => {
            // Reset button state
            buttonText.textContent = originalText;
            button.disabled = false;
            
            // Hide status message after 5 seconds
            setTimeout(() => {
                formStatus.className = 'form__status';
            }, 5000);
        });
    });
    
    // Real-time validation
    const inputs = contactForm.querySelectorAll('.contact__input');
    inputs.forEach(input => {
        input.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = 'var(--first-color)';
                this.classList.remove('error');
            }
        });
    });
}

// Create scroll to top button
document.body.insertAdjacentHTML('beforeend', 
    `<a href="#" class="scrolltop" id="scroll-top">
        <ion-icon name="arrow-up-outline" class="scrolltop__icon"></ion-icon>
    </a>`
);

// Intersection Observer for skills animation
const skillsBars = document.querySelectorAll('.skills__bar');
const skillsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.width = entry.target.classList.contains('skills__sec') ? '85%' : 
                                      entry.target.classList.contains('skills__pen') ? '75%' : 
                                      entry.target.classList.contains('skills__threat') ? '90%' : '0%';
        } else {
            entry.target.style.width = '0%';
        }
    });
}, { threshold: 0.5 });

skillsBars.forEach(bar => {
    bar.style.width = '0%';
    skillsObserver.observe(bar);
});
/* SCROLL TOP */ 
function scrollTop(){
    const scrollTop = document.getElementById('scroll-top');
    // When the scroll is higher than 560 viewport height, add the show-scroll class
    if(this.scrollY >= 560) {
        scrollTop.classList.add('show-scroll');
    } else {
        scrollTop.classList.remove('show-scroll');
    }
}
window.addEventListener('scroll', scrollTop);

/* SCROLL HEADER */ 
function scrollHeader(){
    const header = document.getElementById('header');
    // When the scroll is greater than 50 viewport height, add the scroll-header class
    if(this.scrollY >= 50) {
        header.classList.add('scroll-header');
    } else {
        header.classList.remove('scroll-header');
    }
}
window.addEventListener('scroll', scrollHeader);
/* SKILLS TABS */
document.addEventListener('DOMContentLoaded', function() {
    const skillsTabs = document.querySelectorAll('.skills__tab');
    const skillsAreas = document.querySelectorAll('.skills__area');

    function skillsTabsToggle() {
        const target = this.getAttribute('data-target');
        
        // Remove active class from all tabs
        skillsTabs.forEach(tab => tab.classList.remove('active'));
        
        // Add active class to current tab
        this.classList.add('active');
        
        // Hide all skill areas
        skillsAreas.forEach(area => {
            area.classList.remove('active');
        });
        
        // Show the selected skill area
        document.querySelector(target).classList.add('active');
    }

    skillsTabs.forEach(tab => {
        tab.addEventListener('click', skillsTabsToggle);
    });

    /* SKILLS ANIMATION */
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

// Fix for skills tabs not being clickable
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOM fully loaded');
  
  // Get all skill tabs and content areas
  const skillTabs = document.querySelectorAll('.skills__tab');
  const skillAreas = document.querySelectorAll('.skills__area');
  
  console.log('Found tabs:', skillTabs.length);
  console.log('Found areas:', skillAreas.length);
  
  // Add click event to each tab
  skillTabs.forEach(tab => {
    tab.addEventListener('click', function() {
      console.log('Tab clicked:', this.getAttribute('data-target'));
      
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
});
