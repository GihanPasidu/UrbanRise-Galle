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
            recommendations.push('Consider using the Galle-Matara railway line for longer commutes to reduce traffic in the Fort area.');
            recommendations.push('Try carpooling with other residents to preserve the historic character of narrow Fort streets.');
            recommendations.push('For trips within Galle Fort, walking is often faster and helps protect the heritage site.');
        } 
        else if (currentMode === 'motorcycle') {
            recommendations.push('Be mindful of pedestrian areas in Galle Fort where motorized vehicles may be restricted.');
            recommendations.push('Consider the heritage-friendly electric scooter sharing program launching in Galle.');
        }
        else if (currentMode === 'bus' || currentMode === 'train') {
            recommendations.push('Excellent choice! The Galle railway station connects well to Colombo and southern coastal areas.');
            recommendations.push('Use the local bus network for short trips within Galle district.');
            recommendations.push('Consider the heritage tram project planned for Galle Fort area.');
        }
        else if (currentMode === 'bicycle' || currentMode === 'walking') {
            recommendations.push('Perfect for exploring Galle Fort and its narrow historic streets!');
            recommendations.push('Check our map for dedicated cycling paths along the coastal road.');
            recommendations.push('Walking tours of Galle Fort are an eco-friendly way to experience our heritage.');
            recommendations.push('On rainy days during monsoon, the covered walkways in Dutch Hospital area provide shelter.');
        }
        
        // Add Galle-specific recommendations
        if (emissions > 50) {
            recommendations.push('Your commute impacts Galle\'s UNESCO World Heritage status. Consider our carbon offset program supporting local reforestation.');
            recommendations.push('High emissions affect air quality around heritage sites. Explore our electric vehicle incentive program.');
        }
        
        // Add heritage preservation note
        if (currentMode === 'car' && distance < 3) {
            recommendations.push('Short trips within Galle can often be walked, helping preserve the Fort\'s historic stones and reducing wear on ancient streets.');
        }
        
        // Add recommendations to the list
        recommendations.forEach(recommendation => {
            const li = document.createElement('li');
            li.textContent = recommendation;
            alternativesList.appendChild(li);
        });
    }
});
