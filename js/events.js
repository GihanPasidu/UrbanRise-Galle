// Events page functionality including filtering and modal interactions

document.addEventListener('DOMContentLoaded', function() {
    // Event filter functionality
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    if (filterButtons.length > 0 && eventCards.length > 0) {
        filterButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons
                filterButtons.forEach(btn => btn.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get filter value
                const filter = this.getAttribute('data-filter');
                
                // Filter events
                eventCards.forEach(card => {
                    if (filter === 'all' || card.getAttribute('data-category') === filter) {
                        card.style.display = 'block';
                    } else {
                        card.style.display = 'none';
                    }
                });
            });
        });
    }
    
    // Event details modal functionality
    const detailButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('event-details-modal');
    const modalBody = modal ? modal.querySelector('.modal-body') : null;
    const closeModal = modal ? modal.querySelector('.close-modal') : null;
    
    if (detailButtons.length > 0 && modal && modalBody && closeModal) {
        // Event data - normally this would come from a server
        const eventDetails = {
            'heritage-walk': {
                title: 'Galle Fort Heritage Walk & Tech Integration',
                date: 'May 28, 2025',
                time: '9:00 AM - 12:00 PM',
                location: 'Galle Fort, Galle',
                description: 'Explore how modern technology can enhance heritage tourism while preserving the authentic character of Galle Fort. Learn about digital heritage documentation systems, visitor flow management, and smart lighting solutions that respect our UNESCO World Heritage status.',
                agenda: [
                    '9:00 AM - Welcome at Galle Fort Main Gate',
                    '9:15 AM - Historical overview and heritage challenges',
                    '10:00 AM - Digital documentation demonstration',
                    '10:45 AM - Break with traditional Sri Lankan refreshments',
                    '11:00 AM - Smart tourism management systems',
                    '11:45 AM - Q&A session with heritage experts'
                ],
                organizer: 'Galle Heritage Foundation',
                contact: 'heritage@gallefort.org',
                image: 'images/galle-fort-heritage-walk.jpg'
            },
            'beach-cleanup': {
                title: 'Unawatuna Beach Cleanup Drive',
                date: 'June 5, 2025',
                time: '7:00 AM - 10:00 AM',
                location: 'Unawatuna Beach, Galle',
                description: 'Join us for a coastal conservation initiative at one of Galle\'s most beautiful beaches. This event combines environmental action with education about marine ecosystem protection and sustainable tourism practices.',
                agenda: [
                    '7:00 AM - Registration at Unawatuna Beach entrance',
                    '7:15 AM - Safety briefing and team formation',
                    '7:30 AM - Beach cleanup activity',
                    '9:00 AM - Marine conservation education session',
                    '9:30 AM - Waste sorting and recycling demonstration',
                    '10:00 AM - Conclusion with king coconut refreshments'
                ],
                organizer: 'Galle Environmental Network',
                contact: 'cleanup@gallegreen.lk',
                image: 'images/unawatuna-beach-cleanup.jpg'
            },
            'tech-expo': {
                title: 'Galle Smart Heritage Tech Expo',
                date: 'June 15, 2025',
                time: '10:00 AM - 6:00 PM',
                location: 'Galle International Conference Hall',
                description: 'Discover cutting-edge technologies specifically designed for heritage cities. Experience interactive demonstrations of IoT solutions for historic preservation, smart tourism management, and coastal monitoring systems.',
                agenda: [
                    '10:00 AM - Exhibition opens',
                    '11:00 AM - Keynote: Technology in UNESCO Heritage Sites',
                    '1:00 PM - Panel: Sustainable Tourism in Historic Cities',
                    '3:00 PM - Demo: Heritage-Compatible Smart Lighting',
                    '4:30 PM - Workshop: Coastal Monitoring Systems',
                    '6:00 PM - Exhibition closes'
                ],
                organizer: 'Galle Tech Innovation Hub',
                contact: 'expo@galletech.lk',
                image: 'images/galle-tech-workshop.jpg'
            },
            'hackathon': {
                title: 'Urban Innovation Hackathon',
                date: 'June 22, 2025',
                time: '9:00 AM - 9:00 PM',
                location: 'University of Colombo',
                description: 'A full-day coding challenge for developers, designers, and urban planners to create innovative solutions for Colombo\'s urban challenges. Form teams and compete for prizes while making a positive impact on your city.',
                agenda: [
                    '9:00 AM - Registration and team formation',
                    '9:30 AM - Challenge announcement and rules',
                    '10:00 AM - Hackathon begins',
                    '1:00 PM - Lunch break and progress check',
                    '6:00 PM - Coding ends',
                    '6:30 PM - Project presentations',
                    '8:30 PM - Judging and awards ceremony'
                ],
                organizer: 'Code for Sri Lanka',
                contact: 'hackathon@example.com',
                image: 'images/urban-hackathon.jpg'
            },
            'rainwater-workshop': {
                title: 'Rainwater Harvesting Workshop',
                date: 'June 30, 2025',
                time: '2:00 PM - 5:00 PM',
                location: 'Diyatha Uyana, Battaramulla',
                description: 'Learn practical techniques for collecting, storing, and using rainwater. This workshop will cover different harvesting systems suitable for homes and small businesses, helping to conserve water and reduce bills.',
                agenda: [
                    '2:00 PM - Welcome and introduction',
                    '2:15 PM - Benefits of rainwater harvesting',
                    '2:45 PM - Simple harvesting systems demonstration',
                    '3:30 PM - Break with refreshments',
                    '3:45 PM - Advanced filtration and storage methods',
                    '4:30 PM - Q&A session'
                ],
                organizer: 'Water Conservation Network',
                contact: 'waterconservation@example.com',
                image: 'images/rain-water-workshop.jpg'
            },
            'canal-cleanup': {
                title: 'Dehiwala Canal Restoration Project',
                date: 'July 8, 2025',
                time: '8:00 AM - 12:00 PM',
                location: 'Dehiwala Canal, Colombo',
                description: 'Help clean and restore the Dehiwala Canal, an important urban waterway for flood control. This community event will focus on removing debris, education about waterway health, and planting along the canal banks.',
                agenda: [
                    '8:00 AM - Registration and equipment distribution',
                    '8:15 AM - Safety briefing and team formation',
                    '8:30 AM - Cleanup and debris removal',
                    '10:30 AM - Break with refreshments',
                    '11:00 AM - Bank stabilization and planting activity',
                    '12:00 PM - Conclusion and next steps'
                ],
                organizer: 'Urban Waterways Initiative',
                contact: 'canalrestoration@example.com',
                image: 'images/canal-cleanup.jpg'
            }
        };
        
        // Open modal with event details
        detailButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventId = this.getAttribute('data-event');
                const eventData = eventDetails[eventId];
                
                if (eventData) {
                    // Populate modal with event details
                    modalBody.innerHTML = `
                        <div class="modal-event-header">
                            <img src="${eventData.image}" alt="${eventData.title}">
                            <div class="modal-event-title">
                                <h2>${eventData.title}</h2>
                                <div class="modal-event-meta">
                                    <p><i class="fas fa-calendar"></i> ${eventData.date}</p>
                                    <p><i class="fas fa-clock"></i> ${eventData.time}</p>
                                    <p><i class="fas fa-map-marker-alt"></i> ${eventData.location}</p>
                                </div>
                            </div>
                        </div>
                        <div class="modal-event-description">
                            <h3>About This Event</h3>
                            <p>${eventData.description}</p>
                            
                            <h3>Event Schedule</h3>
                            <ul class="modal-event-agenda">
                                ${eventData.agenda.map(item => `<li>${item}</li>`).join('')}
                            </ul>
                            
                            <div class="modal-event-organizer">
                                <h3>Organizer</h3>
                                <p>${eventData.organizer}</p>
                                <p><i class="fas fa-envelope"></i> ${eventData.contact}</p>
                            </div>
                            
                            <div class="modal-event-actions">
                                <button class="btn register-now-btn" data-event="${eventId}">Register Now</button>
                                <button class="btn-alt add-calendar-btn">Add to Calendar</button>
                            </div>
                        </div>
                    `;
                    
                    // Show modal
                    modal.style.display = 'flex';
                    
                    // Add event listeners for buttons inside modal
                    const registerNowBtn = modalBody.querySelector('.register-now-btn');
                    const addCalendarBtn = modalBody.querySelector('.add-calendar-btn');
                    
                    if (registerNowBtn) {
                        registerNowBtn.addEventListener('click', function() {
                            alert('Registration functionality would be implemented with a backend. This is a frontend demo only.');
                        });
                    }
                    
                    if (addCalendarBtn) {
                        addCalendarBtn.addEventListener('click', function() {
                            alert('Calendar integration would be implemented with a backend. This is a frontend demo only.');
                        });
                    }
                }
            });
        });
        
        // Close modal on click
        closeModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
        
        // Close modal when clicking outside content
        window.addEventListener('click', function(event) {
            if (event.target === modal) {
                modal.style.display = 'none';
            }
        });
    }
    
    // Register button functionality
    const registerButtons = document.querySelectorAll('.register-btn');
    if (registerButtons.length > 0) {
        registerButtons.forEach(button => {
            button.addEventListener('click', function() {
                const eventName = this.closest('.event-card').querySelector('h3').textContent;
                
                alert(`Thank you for your interest in "${eventName}"! Registration functionality would be implemented with a backend. This is a frontend demo only.`);
            });
        });
    }
    
    // Past events slider functionality
    const slider = document.querySelector('.slider-container');
    const prevBtn = document.querySelector('.slider-btn.prev');
    const nextBtn = document.querySelector('.slider-btn.next');
    const slides = document.querySelectorAll('.slide');
    
    if (slider && prevBtn && nextBtn && slides.length > 0) {
        let currentIndex = 0;
        
        // Set initial position
        updateSliderPosition();
        
        // Previous button click
        prevBtn.addEventListener('click', function() {
            currentIndex = (currentIndex > 0) ? currentIndex - 1 : slides.length - 1;
            updateSliderPosition();
        });
        
        // Next button click
        nextBtn.addEventListener('click', function() {
            currentIndex = (currentIndex < slides.length - 1) ? currentIndex + 1 : 0;
            updateSliderPosition();
        });
        
        function updateSliderPosition() {
            slider.style.transform = `translateX(-${currentIndex * 100}%)`;
        }
        
        // Add style for slider transitions
        const style = document.createElement('style');
        style.textContent = `
            .slider-container {
                transition: transform 0.5s ease;
            }
            
            .modal-event-header {
                margin-bottom: 20px;
            }
            
            .modal-event-header img {
                width: 100%;
                height: 250px;
                object-fit: cover;
                border-radius: 8px;
                margin-bottom: 15px;
            }
            
            .modal-event-title h2 {
                font-size: 1.8rem;
                margin-bottom: 10px;
                color: var(--primary-dark);
            }
            
            .modal-event-meta {
                display: flex;
                flex-wrap: wrap;
                gap: 15px;
                margin-bottom: 20px;
            }
            
            .modal-event-meta p {
                font-size: 1rem;
                color: var(--text-medium);
                display: flex;
                align-items: center;
                gap: 8px;
            }
            
            .modal-event-description h3 {
                font-size: 1.3rem;
                margin: 20px 0 10px;
                color: var(--primary-dark);
            }
            
            .modal-event-agenda {
                list-style-type: none;
                padding: 0;
                margin-bottom: 20px;
            }
            
            .modal-event-agenda li {
                padding: 8px 0;
                border-bottom: 1px solid var(--background-dark);
                font-size: 0.95rem;
                color: var(--text-medium);
            }
            
            .modal-event-organizer {
                padding: 15px;
                background-color: var(--background-medium);
                border-radius: 8px;
                margin: 20px 0;
            }
            
            .modal-event-actions {
                display: flex;
                gap: 15px;
                margin-top: 20px;
            }
            
            @media (max-width: 768px) {
                .modal-event-meta {
                    flex-direction: column;
                    gap: 8px;
                }
                
                .modal-event-actions {
                    flex-direction: column;
                }
                
                .modal-event-actions button {
                    width: 100%;
                }
            }
        `;
        document.head.appendChild(style);
    }
});
