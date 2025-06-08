// Minimal JavaScript for UrbanRise Galle - All functionality in one file

document.addEventListener('DOMContentLoaded', function() {
    
    // Mobile menu toggle
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('nav ul');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('show');
        });
    }

    // Simple traffic display
    const heatmapElement = document.getElementById('traffic-heatmap');
    const cityButtons = document.querySelectorAll('.city-btn');
    
    if (heatmapElement) {
        function showTraffic(city) {
            heatmapElement.innerHTML = `
                <div style="padding: 20px; text-align: center;">
                    <h4>${city.charAt(0).toUpperCase() + city.slice(1)} Traffic</h4>
                    <div style="margin: 10px 0; padding: 10px; background: green; color: white;">Low Traffic</div>
                    <div style="margin: 10px 0; padding: 10px; background: orange; color: white;">Medium Traffic</div>
                    <div style="margin: 10px 0; padding: 10px; background: red; color: white;">High Traffic</div>
                </div>
            `;
        }
        
        cityButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                cityButtons.forEach(b => b.classList.remove('active'));
                this.classList.add('active');
                showTraffic(this.dataset.city);
            });
        });
        
        showTraffic('galle');
    }

    // Event filtering
    const filterButtons = document.querySelectorAll('.filter-btn');
    const eventCards = document.querySelectorAll('.event-card');
    
    filterButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            filterButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const filter = this.dataset.filter;
            eventCards.forEach(card => {
                card.style.display = (filter === 'all' || card.dataset.category === filter) ? 'block' : 'none';
            });
        });
    });

    // Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            const distance = document.getElementById('distance').value || 10;
            const transport = document.getElementById('transport-type').value;
            
            const emissions = { car: 20, bus: 10, train: 5, motorcycle: 15, bicycle: 0, walking: 0 };
            const costs = { car: 500, bus: 100, train: 50, motorcycle: 200, bicycle: 0, walking: 0 };
            
            document.getElementById('carbon-result').textContent = emissions[transport] + ' kg CO2';
            document.getElementById('cost-result').textContent = 'Rs. ' + costs[transport];
            document.getElementById('time-result').textContent = (distance * 2) + ' hours';
            
            const tips = ['Use public transport', 'Try cycling', 'Walk for short trips'];
            document.getElementById('alternatives-list').innerHTML = 
                tips.map(tip => `<li>${tip}</li>`).join('');
        });
    }

    // Solution tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            tabButtons.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            alert('Showing ' + this.textContent + ' solutions');
        });
    });

    // Registration buttons
    const registerButtons = document.querySelectorAll('.register-btn');
    registerButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            alert('Thank you for your interest! This is a demo.');
        });
    });

    // Event details modal
    const detailButtons = document.querySelectorAll('.details-btn');
    const modal = document.getElementById('event-details-modal');
    
    if (modal) {
        detailButtons.forEach(btn => {
            btn.addEventListener('click', function() {
                const eventCard = this.closest('.event-card');
                const title = eventCard.querySelector('h3').textContent;
                
                modal.querySelector('.modal-body').innerHTML = `
                    <h2>${title}</h2>
                    <p><strong>Location:</strong> Galle</p>
                    <p>This is a community event. Join us!</p>
                    <button onclick="alert('Registration coming soon!')">Register</button>
                `;
                modal.style.display = 'flex';
            });
        });
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.style.display = 'none';
        });
        
        window.addEventListener('click', (e) => {
            if (e.target === modal) modal.style.display = 'none';
        });
    }

    // Simple forum
    const forumContainer = document.getElementById('feedback-app');
    if (forumContainer) {
        const posts = [
            { name: 'John', title: 'Traffic in Galle Fort', content: 'Too many cars in the narrow streets.' },
            { name: 'Mary', title: 'Beach cleanup needed', content: 'We need more cleanup events.' }
        ];
        
        let html = '<div style="max-width: 800px; margin: 0 auto; padding: 20px;">';
        html += '<h3>Community Posts</h3>';
        
        posts.forEach(post => {
            html += `
                <div style="border: 1px solid #ddd; padding: 15px; margin: 10px 0; border-radius: 5px;">
                    <h4>${post.title}</h4>
                    <p><strong>By:</strong> ${post.name}</p>
                    <p>${post.content}</p>
                    <button onclick="alert('Liked!')">Like</button>
                </div>
            `;
        });
        
        html += '</div>';
        forumContainer.innerHTML = html;
    }
});
