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
        // Galle-specific event data
        const eventDetails = {
            'urban-gardening': {
                title: 'Heritage Garden Workshop',
                date: 'May 28, 2025',
                time: '9:00 AM - 12:00 PM',
                location: 'Dutch Hospital Complex, Galle Fort',
                description: 'Learn how to create traditional Sri Lankan gardens within Galle\'s historic architecture. This workshop focuses on heritage-appropriate gardening techniques using indigenous plants that complement the Fort\'s Dutch colonial aesthetic.',
                agenda: [
                    '9:00 AM - Welcome at Dutch Hospital courtyard',
                    '9:15 AM - Heritage gardening principles for Fort buildings',
                    '10:00 AM - Indigenous plant selection for coastal areas',
                    '10:45 AM - Break with traditional Sri Lankan refreshments',
                    '11:00 AM - Container gardening for Fort balconies',
                    '11:45 AM - Q&A with local heritage gardening experts'
                ],
                organizer: 'Galle Heritage Foundation',
                contact: 'gardens@galleheritage.lk',
                image: 'images/urban-gardening-workshop.jpg'
            },
            'beach-cleanup': {
                title: 'Galle Fort Lighthouse Beach Cleanup',
                date: 'June 5, 2025',
                time: '7:00 AM - 10:00 AM',
                location: 'Flag Rock Area, Galle Fort',
                description: 'Protect Galle\'s pristine coastline with a community cleanup along the Fort\'s ocean-facing ramparts. Help preserve the stunning views that make Galle a UNESCO World Heritage site while learning about marine conservation.',
                agenda: [
                    '7:00 AM - Meet at Flag Rock parking area',
                    '7:15 AM - Safety briefing and equipment distribution',
                    '7:30 AM - Cleanup along ramparts and Flag Rock beach',
                    '9:00 AM - Waste sorting demonstration',
                    '9:30 AM - Marine conservation talk by local experts',
                    '10:00 AM - Traditional breakfast at a Fort café'
                ],
                organizer: 'Galle Ocean Conservation Society',
                contact: 'cleanup@galleocean.lk',
                image: 'images/beach-cleanup.jpg'
            },
            'tech-expo': {
                title: 'Heritage-Smart City Technologies Expo',
                date: 'June 15, 2025',
                time: '10:00 AM - 6:00 PM',
                location: 'Galle International Cricket Stadium',
                description: 'Discover how cutting-edge technology can enhance historic cities without compromising heritage value. See demonstrations of heritage-sensitive smart lighting, tourism management systems, and coastal monitoring technologies specifically designed for Galle.',
                agenda: [
                    '10:00 AM - Exhibition opens with Galle Fort drone showcase',
                    '11:00 AM - Keynote: Smart Heritage Cities in the Digital Age',
                    '1:00 PM - Panel: Balancing Tourism and Local Life in Galle',
                    '3:00 PM - Demo: Heritage-Sensitive Street Lighting Systems',
                    '4:30 PM - Workshop: Coastal Monitoring Technology',
                    '6:00 PM - Exhibition closes with Fort sunset viewing'
                ],
                organizer: 'Galle Smart City Initiative',
                contact: 'expo@gallesmartcity.lk',
                image: 'images/smart-city-expo.jpg'
            },
            'hackathon': {
                title: 'Galle Heritage Innovation Hackathon',
                date: 'June 22, 2025',
                time: '9:00 AM - 9:00 PM',
                location: 'University of Ruhuna - Galle Campus',
                description: 'Create innovative digital solutions for Galle\'s unique challenges as both a heritage site and growing tourist destination. Focus on tourism management, heritage preservation, and sustainable development solutions.',
                agenda: [
                    '9:00 AM - Registration with traditional Galle breakfast',
                    '9:30 AM - Challenge announcement: Galle-specific problems',
                    '10:00 AM - Hackathon begins - Fort tour for inspiration',
                    '1:00 PM - Lunch featuring Galle\'s traditional cuisine',
                    '6:00 PM - Coding deadline and project submissions',
                    '6:30 PM - Presentations with Fort backdrop',
                    '8:30 PM - Awards ceremony and networking with local businesses'
                ],
                organizer: 'Galle Tech Community',
                contact: 'hackathon@galletech.lk',
                image: 'images/urban-hackathon.jpg'
            },
            'rainwater-workshop': {
                title: 'Monsoon Water Harvesting for Heritage Buildings',
                date: 'June 30, 2025',
                time: '2:00 PM - 5:00 PM',
                location: 'Galle Municipal Council Grounds',
                description: 'Learn heritage-appropriate rainwater collection methods suitable for Galle\'s colonial architecture. Discover how to harvest monsoon rains while preserving the integrity of historic buildings and dealing with coastal weather conditions.',
                agenda: [
                    '2:00 PM - Welcome with refreshing king coconut water',
                    '2:15 PM - Understanding Galle\'s monsoon patterns',
                    '2:45 PM - Heritage-friendly harvesting system demonstration',
                    '3:30 PM - Break with traditional Galle sweets',
                    '3:45 PM - Coastal adaptation and salt-resistant systems',
                    '4:30 PM - Q&A with local water conservation experts'
                ],
                organizer: 'Galle Water Conservation Network',
                contact: 'water@galleconservation.lk',
                image: 'images/rain-water-workshop.jpg'
            },
            'canal-cleanup': {
                title: 'Galle Moat and Drainage System Restoration',
                date: 'July 8, 2025',
                time: '8:00 AM - 12:00 PM',
                location: 'Historic Moat Area, Galle Fort',
                description: 'Help restore Galle\'s historic Dutch-built drainage system and moat areas. Learn about the ingenious 17th-century water management while contributing to flood prevention and heritage preservation.',
                agenda: [
                    '8:00 AM - Meet at the old Fort gate',
                    '8:15 AM - Historical overview of Dutch water management',
                    '8:30 AM - Cleanup of historic drainage channels',
                    '10:00 AM - Traditional Sri Lankan breakfast break',
                    '10:30 AM - Restoration of moat area vegetation',
                    '11:30 AM - Future plans presentation by heritage experts',
                    '12:00 PM - Wrap-up with views from the ramparts'
                ],
                organizer: 'Galle Heritage Restoration Society',
                contact: 'moat@galleheritage.lk',
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
