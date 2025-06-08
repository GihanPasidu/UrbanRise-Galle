// Solutions page functionality including tab navigation and calculator

document.addEventListener('DOMContentLoaded', function() {
    // Tab navigation for solutions
    const tabButtons = document.querySelectorAll('.tab-btn');
    const solutionCategories = document.querySelectorAll('.solution-category');
    
    if (tabButtons.length > 0 && solutionCategories.length > 0) {
        tabButtons.forEach(button => {
            button.addEventListener('click', function() {
                // Remove active class from all buttons and categories
                tabButtons.forEach(btn => btn.classList.remove('active'));
                solutionCategories.forEach(category => category.classList.remove('active'));
                
                // Add active class to clicked button
                this.classList.add('active');
                
                // Get category from data attribute
                const category = this.getAttribute('data-category');
                
                // Find and show the corresponding solution category
                const targetCategory = document.getElementById(`${category}-solutions`);
                if (targetCategory) {
                    targetCategory.classList.add('active');
                }
            });
        });
    }
    
    // Smart Commute Calculator
    const calculateBtn = document.getElementById('calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', calculateCommuteImpact);
    }
    
    function calculateCommuteImpact() {
        // Get input values
        const distance = parseFloat(document.getElementById('distance').value) || 0;
        const transportType = document.getElementById('transport-type').value;
        const fuelType = document.getElementById('fuel-type').value;
        
        // Input validation
        if (distance <= 0 || isNaN(distance)) {
            alert('Please enter a valid distance.');
            return;
        }
        
        // Emission factors (kg CO2 per km)
        const emissionFactors = {
            car: {
                petrol: 0.192,
                diesel: 0.171,
                electric: 0.053,
                hybrid: 0.106
            },
            bus: {
                petrol: 0.105,
                diesel: 0.089,
                electric: 0.025,
                hybrid: 0.065,
                na: 0.089 // Default to diesel
            },
            train: {
                na: 0.041
            },
            motorcycle: {
                petrol: 0.103,
                electric: 0.025,
                na: 0.103 // Default to petrol
            },
            bicycle: {
                na: 0
            },
            walking: {
                na: 0
            }
        };
        
        // Average speeds (km/h) - considering Sri Lankan urban conditions
        const speeds = {
            car: 22,
            bus: 18,
            train: 35,
            motorcycle: 25,
            bicycle: 12,
            walking: 4
        };
        
        // Fuel costs per km (Rs.)
        const fuelCosts = {
            car: {
                petrol: 42,
                diesel: 24,
                electric: 10,
                hybrid: 28
            },
            bus: {
                petrol: 12,
                diesel: 10,
                electric: 5,
                hybrid: 8,
                na: 10 // Default to diesel
            },
            train: {
                na: 8
            },
            motorcycle: {
                petrol: 16,
                electric: 5,
                na: 16 // Default to petrol
            },
            bicycle: {
                na: 0
            },
            walking: {
                na: 0
            }
        };
        
        // Get applicable emission factor
        let emissionFactor = 0;
        if (emissionFactors[transportType]) {
            if (emissionFactors[transportType][fuelType]) {
                emissionFactor = emissionFactors[transportType][fuelType];
            } else if (emissionFactors[transportType]['na']) {
                emissionFactor = emissionFactors[transportType]['na'];
            }
        }
        
        // Get applicable fuel cost
        let costPerKm = 0;
        if (fuelCosts[transportType]) {
            if (fuelCosts[transportType][fuelType]) {
                costPerKm = fuelCosts[transportType][fuelType];
            } else if (fuelCosts[transportType]['na']) {
                costPerKm = fuelCosts[transportType]['na'];
            }
        }
        
        // Calculate monthly CO2 emissions (assuming 22 working days per month, round trip)
        const monthlyEmissions = 2 * distance * 22 * emissionFactor;
        
        // Calculate monthly fuel cost (assuming 22 working days per month, round trip)
        const monthlyCost = 2 * distance * 22 * costPerKm;
        
        // Calculate annual time spent commuting (hours)
        const speed = speeds[transportType] || 20;
        const annualTime = 2 * distance * 365 / speed;
        
        // Update results
        document.getElementById('carbon-result').textContent = `${monthlyEmissions.toFixed(2)} kg CO2`;
        document.getElementById('cost-result').textContent = `Rs. ${monthlyCost.toFixed(2)}`;
        document.getElementById('time-result').textContent = `${annualTime.toFixed(2)} hours`;
        
        // Generate recommendations
        generateRecommendations(transportType, distance, monthlyEmissions);
    }
    
    function generateRecommendations(currentMode, distance, emissions) {
        const alternativesList = document.getElementById('alternatives-list');
        if (!alternativesList) return;
        
        // Clear existing recommendations
        alternativesList.innerHTML = '';
        
        // Generate Galle-specific recommendations based on current mode and distance
        const recommendations = [];
        
        if (currentMode === 'car') {
            recommendations.push('Use the Galle-Matara railway line for longer commutes - it runs along the beautiful coastline.');
            recommendations.push('Consider carpooling with other residents to reduce traffic in the narrow historic Fort streets.');
            recommendations.push('For trips within Galle Fort, walking is often faster and helps protect the UNESCO heritage site.');
            
            if (distance <= 5) {
                recommendations.push('Short trips in Galle can be covered by the local three-wheeler network or cycling.');
            }
            
            recommendations.push('Park outside the Fort and walk to preserve the historic cobblestone streets.');
        } 
        else if (currentMode === 'motorcycle') {
            recommendations.push('Be mindful of pedestrian areas in Galle Fort where motorized vehicles are restricted.');
            recommendations.push('Consider the heritage-friendly electric scooter sharing program launching in Galle.');
            
            if (distance <= 8) {
                recommendations.push('For coastal routes to Unawatuna or Hikkaduwa, cycling offers beautiful ocean views.');
            }
            
            recommendations.push('Use designated parking areas outside the Fort to preserve heritage architecture.');
        }
        else if (currentMode === 'bus' || currentMode === 'train') {
            recommendations.push('Excellent choice! The Galle railway station connects directly to Colombo and coastal towns.');
            recommendations.push('Use local buses for trips to nearby beaches like Unawatuna and Jungle Beach.');
            recommendations.push('The coastal train route offers stunning ocean views while being eco-friendly.');
            
            if (distance >= 15) {
                recommendations.push('For longer coastal trips, the train is your best option with stations in Hikkaduwa, Bentota, and beyond.');
            }
        }
        else if (currentMode === 'bicycle' || currentMode === 'walking') {
            recommendations.push('Perfect for exploring Galle Fort\'s historic ramparts and narrow Dutch colonial streets!');
            recommendations.push('Check our map for the dedicated cycling path along Galle Face and to Unawatuna.');
            recommendations.push('Walking tours of Galle Fort help you discover hidden gems while being completely eco-friendly.');
            recommendations.push('The Fort\'s compact size makes it ideal for walking - you can reach any point within 15 minutes.');
        }
        
        // Add Galle-specific environmental recommendations
        if (emissions > 50) {
            recommendations.push('Your commute impacts Galle\'s UNESCO World Heritage air quality. Join our mangrove reforestation program.');
            recommendations.push('High emissions affect the coastal environment. Consider our electric tuk-tuk incentive program.');
        }
        
        // Add heritage and tourism considerations
        if (currentMode === 'car' && distance < 3) {
            recommendations.push('Short trips within Galle Fort are best done on foot to preserve the 400-year-old Dutch fortifications.');
        }
        
        // Add tourism season considerations
        recommendations.push('During peak tourist season (Dec-Mar), consider alternative routes via Akmeemana to avoid Fort congestion.');
        
        // Add coastal-specific recommendations
        if (currentMode !== 'walking' && currentMode !== 'bicycle') {
            recommendations.push('Experience Galle\'s coastal beauty by cycling or walking along the Fort ramparts facing the Indian Ocean.');
        }
        
        // Add recommendations to the list
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            alternativesList.appendChild(li);
        });
    }
});
