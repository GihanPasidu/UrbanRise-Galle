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
        
        // Generate recommendations based on current mode and distance
        const recommendations = [];
        
        if (currentMode === 'car') {
            recommendations.push('Use the Smart Public Transport System to reduce your carbon footprint by up to 75%.');
            recommendations.push('Consider carpooling with colleagues to share fuel costs and reduce emissions.');
            
            if (distance <= 10) {
                recommendations.push('For your short distance commute, consider cycling using the new bike-sharing service.');
            }
            
            recommendations.push('Work from home if possible, even 1-2 days per week can significantly reduce your emissions.');
        } 
        else if (currentMode === 'motorcycle') {
            recommendations.push('Consider an electric scooter to reduce emissions and fuel costs.');
            
            if (distance <= 8) {
                recommendations.push('For your distance, cycling could be a healthy alternative on good weather days.');
            }
            
            recommendations.push('The Smart Public Transport System covers most major routes with real-time tracking.');
        }
        else if (currentMode === 'bus' || currentMode === 'train') {
            recommendations.push('You\'re already using a lower-emission transport option. Great job!');
            recommendations.push('Check the Smart Public Transport app for optimal routes and less crowded times.');
            
            if (distance >= 15) {
                recommendations.push('For long commutes, consider living closer to your workplace if possible.');
            }
        }
        else if (currentMode === 'bicycle' || currentMode === 'walking') {
            recommendations.push('You\'re using zero-emission transport. Excellent choice for the environment!');
            recommendations.push('Check our map for dedicated cycling lanes and pedestrian paths in your area.');
            recommendations.push('On rainy days, the Smart Public Transport System is your best alternative.');
        }
        
        // Add general recommendation
        if (emissions > 50) {
            recommendations.push('Your current commute has a significant carbon footprint. Consider our carbon offset program.');
        }
        
        // Add recommendations to the list
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            alternativesList.appendChild(li);
        });
    }
});
