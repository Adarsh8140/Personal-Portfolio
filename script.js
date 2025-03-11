
/* MENU SHOW */ 
const showMenu = (toggleId, navId) => {
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', () => {
            nav.classList.toggle('show')
        })
    }
}

showMenu('nav-toggle', 'nav-menu')

/* ACTIVE LINKS */
const navLinks = document.querySelectorAll('.nav__link')

function linkAction() {
    // Active link
    navLinks.forEach(n => n.classList.remove('active'))
    this.classList.add('active')
    
    // Remove menu mobile
    const navMenu = document.getElementById('nav-menu')
    navMenu.classList.remove('show')
}

navLinks.forEach(n => n.addEventListener('click', linkAction))

/* SCROLL REVEAL ANIMATION */
const scroll = ScrollReveal({
    origin: 'top',
    distance: '80px',
    duration: 2000,
    reset: true
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

// Form submission handling
const contactForm = document.querySelector('.contact__form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form values
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const message = this.querySelector('textarea').value;
        
        // You would normally send these values to a server
        console.log("Form submitted:", { name, email, message });
        
        // Show success message
        alert('Thank you for your message! I will get back to you soon.');
        
        // Reset form
        this.reset();
    });
}
