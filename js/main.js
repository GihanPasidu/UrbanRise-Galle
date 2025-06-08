// Simple main functionality

document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('show');
        });
    }

    // Simple animation for cards
    const cards = document.querySelectorAll('.feature-card, .event-card, .issue-card, .forum-post');
    
    function animateCards() {
        cards.forEach(card => {
            const cardPosition = card.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (cardPosition < screenHeight * 0.8) {
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial state
    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Animate on scroll
    window.addEventListener('scroll', animateCards);
    animateCards(); // Initial check
});
