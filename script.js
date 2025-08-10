document.addEventListener('DOMContentLoaded', function() {
    // Animation observer for individual elements
    const animateOnScroll = () => {
        const elements = document.querySelectorAll('.animate-item');
        const windowHeight = window.innerHeight;
        const triggerOffset = windowHeight * 0.15;
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            
            if (elementPosition < windowHeight - triggerOffset) {
                element.classList.add('visible');
            }
        });
    };
    
    // Initial check on load
    animateOnScroll();
    
    // Check on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Scroll-based navbar behavior
    const navbar = document.querySelector('.navbar');
    let lastScrollY = window.scrollY;
    let ticking = false;
    
    const updateNavbar = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY <= 0) {
            navbar.classList.remove('hide');
        } else if (currentScrollY > lastScrollY + 100) {
            navbar.classList.add('hide');
        } else if (currentScrollY < lastScrollY - 10) {
            navbar.classList.remove('hide');
        }
        
        lastScrollY = currentScrollY;
        ticking = false;
    };
    
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateNavbar);
            ticking = true;
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - navbarHeight;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Parallax effect
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', () => {
            hero.style.backgroundPositionY = `${window.scrollY * 0.5}px`;
        });
    }
    
    // Contact form handling
    const subscribeForm = document.getElementById('subscribeForm');
    if (subscribeForm) {
        subscribeForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const emailInput = this.querySelector('input[type="email"]');
            const button = this.querySelector('button');
            
            if (emailInput.checkValidity()) {
                button.disabled = true;
                button.textContent = "Subscribing...";
                
                // Simulate async submission
                setTimeout(() => {
                    button.textContent = "Subscribed!";
                    button.style.backgroundColor = "#4CAF50";
                    
                    setTimeout(() => {
                        button.textContent = "Subscribe";
                        button.style.backgroundColor = "#005f99";
                        button.disabled = false;
                        emailInput.value = "";
                    }, 2000);
                }, 800);
            }
        });
    }
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.navbar nav');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
        
        // Close menu when clicking links
        document.querySelectorAll('.navbar nav a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('show');
            });
        });
    }
    
    // Close menu when clicking outside
    document.addEventListener('click', (e) => {
        if (!navbar.contains(e.target) && navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }
    });
});
