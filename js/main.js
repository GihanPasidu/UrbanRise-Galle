// Main functionality for UrbanRise Galle

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Galle-themed animation for cards
    const cards = document.querySelectorAll('.feature-card, .event-card, .issue-card, .forum-post');
    
    function animateCards() {
        cards.forEach((card, index) => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (cardPosition < screenHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
                
                // Add Galle-specific heritage effect
                if (card.classList.contains('feature-card')) {
                    setTimeout(() => {
                        card.style.boxShadow = '0 8px 25px rgba(141, 110, 99, 0.15)'; // Heritage color shadow
                    }, index * 100);
                }
            }
        });
    }
    
    // Set initial state with heritage-inspired transitions
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.8s ease, transform 0.8s ease, box-shadow 0.3s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateCards);
    animateCards(); // Initial check

    // Add Galle Fort inspired navigation highlighting
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('mouseenter', function() {
            this.style.backgroundColor = 'rgba(141, 110, 99, 0.1)'; // Heritage color
        });
        
        link.addEventListener('mouseleave', function() {
            if (!this.closest('li').classList.contains('active')) {
                this.style.backgroundColor = '';
            }
        });
    });

    // Add heritage-themed loading animation for images
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.addEventListener('load', function() {
            this.style.opacity = '1';
            this.style.filter = 'none';
        });
        
        // Set initial state
        img.style.opacity = '0';
        img.style.filter = 'blur(5px)';
        img.style.transition = 'opacity 0.6s ease, filter 0.6s ease';
    });

    // Galle-specific scroll effects for hero section
    const hero = document.querySelector('.hero');
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.pageYOffset;
            const rate = scrolled * -0.5;
            hero.style.transform = `translateY(${rate}px)`;
        });
    }

    // Add coastal breeze effect to certain elements
    const floatingElements = document.querySelectorAll('.feature-card i, .pillar-icon');
    floatingElements.forEach((element, index) => {
        // Subtle floating animation inspired by ocean breeze
        element.style.animation = `galleBreeze ${3 + (index % 2)}s ease-in-out infinite`;
    });

    // Add CSS for Galle-specific animations
    const galleStyles = document.createElement('style');
    galleStyles.textContent = `
        @keyframes galleBreeze {
            0%, 100% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-5px) rotate(2deg); }
        }
        
        .heritage-glow {
            box-shadow: 0 0 20px rgba(141, 110, 99, 0.3);
        }
        
        .coastal-shimmer {
            background: linear-gradient(45deg, 
                rgba(2, 119, 189, 0.1), 
                rgba(255, 248, 225, 0.1),
                rgba(2, 119, 189, 0.1));
            background-size: 200% 200%;
            animation: coastalShimmer 4s ease-in-out infinite;
        }
        
        @keyframes coastalShimmer {
            0%, 100% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
        }
    `;
    document.head.appendChild(galleStyles);

    // Add special effects for heritage elements
    const heritageElements = document.querySelectorAll('.feature-card, .about-image, .forum-post');
    heritageElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.classList.add('heritage-glow');
        });
        
        element.addEventListener('mouseleave', function() {
            this.classList.remove('heritage-glow');
        });
    });

    // Simulate gentle coastal environment sounds (visual feedback)
    let isCoastalMode = false;
    document.addEventListener('keydown', function(e) {
        if (e.key === 'c' && e.ctrlKey) { // Ctrl+C for coastal mode
            isCoastalMode = !isCoastalMode;
            document.body.classList.toggle('coastal-shimmer', isCoastalMode);
            
            if (isCoastalMode) {
                console.log('🌊 Galle coastal ambiance mode activated');
            } else {
                console.log('🏛️ Heritage mode activated');
            }
        }
    });
});
