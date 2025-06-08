// Main JavaScript file for SmartSL Urban website

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Scroll to top button
    const scrollToTopBtn = document.createElement('button');
    scrollToTopBtn.innerHTML = '<i class="fas fa-arrow-up"></i>';
    scrollToTopBtn.className = 'scroll-top-btn';
    document.body.appendChild(scrollToTopBtn);

    // Show/hide scroll to top button based on scroll position
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollToTopBtn.classList.add('show');
        } else {
            scrollToTopBtn.classList.remove('show');
        }
        
        // Header shrink effect on scroll for professional look
        const header = document.querySelector('header');
        if (window.pageYOffset > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Scroll to top when button is clicked
    scrollToTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Add smooth scrolling to all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href !== "#") {
                e.preventDefault();
                
                document.querySelector(href).scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Add animation to elements when they come into view with stagger effect
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.feature-card, .pillar, .solution-card, .issue-card, .event-card');
        
        elements.forEach((element, index) => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight * 0.9) {
                // Add staggered delay for more professional animation
                setTimeout(() => {
                    element.classList.add('animate');
                }, index * 100); // 100ms stagger between elements
            }
        });
        
        // Animate section titles for professional appearance
        const sectionTitles = document.querySelectorAll('.section-title');
        sectionTitles.forEach(title => {
            const titlePosition = title.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (titlePosition < screenHeight * 0.9 && !title.classList.contains('animated')) {
                title.classList.add('animated');
                title.classList.add('fadeInUp');
            }
        });
    };

    // Initial check for elements in view
    animateOnScroll();
    
    // Check for elements in view on scroll
    window.addEventListener('scroll', animateOnScroll);
    
    // Add hover effect to cards for more professional interaction
    const cards = document.querySelectorAll('.feature-card, .pillar');
    cards.forEach(card => {
        card.classList.add('hover-lift');
    });

    // Add CSS for dynamic features with more professional styling
    const style = document.createElement('style');
    style.textContent = `
        .scroll-top-btn {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 45px;
            height: 45px;
            background-color: var(--primary-color);
            color: white;
            border: none;
            border-radius: 50%;
            font-size: 1.2rem;
            cursor: pointer;
            opacity: 0;
            visibility: hidden;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            z-index: 100;
            display: flex;
            justify-content: center;
            align-items: center;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        
        .scroll-top-btn.show {
            opacity: 1;
            visibility: visible;
        }
        
        .scroll-top-btn:hover {
            background-color: var(--primary-dark);
            transform: translateY(-5px);
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
        }
        
        .feature-card, .pillar, .solution-card, .issue-card, .event-card {
            opacity: 0;
            transform: translateY(30px);
            transition: opacity 0.6s cubic-bezier(0.25, 0.8, 0.25, 1), 
                        transform 0.6s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .feature-card.animate, .pillar.animate, .solution-card.animate, .issue-card.animate, .event-card.animate {
            opacity: 1;
            transform: translateY(0);
        }
        
        .section-title {
            opacity: 0;
            transform: translateY(20px);
        }
        
        .section-title.animated {
            opacity: 1;
            transform: translateY(0);
        }
        
        /* Professional header transition */
        header.scrolled .logo h1 {
            font-size: 1.6rem;
            transition: font-size 0.3s ease;
        }
        
        /* Professional hover effect for navigation */
        nav ul li a:hover {
            background-color: rgba(25, 118, 210, 0.1);
            transform: translateY(-2px);
        }
        
        /* Button press effect for professional interaction */
        .btn:active, .btn-alt:active {
            transform: scale(0.98);
        }
    `;
    document.head.appendChild(style);
    
    // Add Google Fonts for more professional typography
    const fontLink = document.createElement('link');
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700&family=Roboto:wght@300;400;500;700&display=swap';
    document.head.appendChild(fontLink);
});
