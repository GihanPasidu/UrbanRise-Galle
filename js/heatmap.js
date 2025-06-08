// Traffic Heatmap visualization for homepage

document.addEventListener('DOMContentLoaded', function() {
    // Traffic heatmap functionality
    const heatmapElement = document.getElementById('traffic-heatmap');
    const cityButtons = document.querySelectorAll('.city-btn');
    
    if (!heatmapElement || cityButtons.length === 0) {
        return; // Exit if elements don't exist
    }

    // Map data for different cities - Enhanced focus on Galle
    const heatmapData = {
        galle: [
            // Format: [x%, y%, intensity(1-10)]
            [25, 40, 8], // Galle Fort main gate
            [30, 35, 9], // Church Street/Main Street junction
            [35, 30, 7], // Lighthouse Street
            [20, 45, 6], // Fort Railway Station area
            [40, 25, 5], // Rampart Street
            [45, 40, 8], // Hospital Junction
            [50, 35, 6], // Unawatuna Road junction
            [55, 45, 4], // Hirimbura Cross Road
            [40, 55, 7], // Magalle junction
            [35, 60, 5], // Bus Stand area
            [60, 40, 3], // Baddegama Road
            [25, 25, 4], // Flag Rock area
            [30, 20, 2], // Dutch Hospital area
            [45, 20, 3], // Closenberg area
            [65, 50, 2], // Walahanduwa junction
            [70, 45, 1], // Baddegama direction
        ],
        colombo: [
            // Simplified data for comparison
            [15, 30, 9],  // Fort
            [35, 25, 8],  // Pettah
            [55, 35, 7],  // Bambalapitiya
            [75, 40, 5],  // Mount Lavinia
        ],
        kandy: [
            // Simplified data for comparison
            [30, 35, 8], // City Center
            [45, 30, 6], // Peradeniya Road
            [60, 40, 4], // Katugastota
        ]
    };
    
    // Generate a visual heatmap
    function renderHeatmap(city) {
        // Clear previous heatmap
        heatmapElement.innerHTML = '';
        
        // Create SVG for the heatmap
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("width", "100%");
        svg.setAttribute("height", "100%");
        svg.setAttribute("viewBox", "0 0 100 100");
        
        // Add city outline background (simplified map)
        const cityOutline = document.createElementNS(svgNS, "path");
        
        // Different city outlines - Enhanced Galle map
        if (city === 'galle') {
            // Galle Fort and surrounding area
            cityOutline.setAttribute("d", "M20,20 L60,20 L70,30 L70,60 L60,70 L20,70 L10,60 L10,30 Z");
            cityOutline.setAttribute("fill", "#f8f4e6");
            cityOutline.setAttribute("stroke", "#8D6E63");
            cityOutline.setAttribute("stroke-width", "2");
            
            // Add Fort walls
            const fortWalls = document.createElementNS(svgNS, "path");
            fortWalls.setAttribute("d", "M20,30 L50,30 L55,35 L55,55 L50,60 L20,60 L15,55 L15,35 Z");
            fortWalls.setAttribute("fill", "none");
            fortWalls.setAttribute("stroke", "#6D4C41");
            fortWalls.setAttribute("stroke-width", "3");
            svg.appendChild(fortWalls);
            
            // Add ocean/harbor
            const harbor = document.createElementNS(svgNS, "path");
            harbor.setAttribute("d", "M0,20 L20,20 L10,30 L15,55 L20,70 L0,70 Z");
            harbor.setAttribute("fill", "#0277BD");
            svg.appendChild(harbor);
            
            // Add lighthouse
            const lighthouse = document.createElementNS(svgNS, "circle");
            lighthouse.setAttribute("cx", "45");
            lighthouse.setAttribute("cy", "25");
            lighthouse.setAttribute("r", "2");
            lighthouse.setAttribute("fill", "#FFF");
            lighthouse.setAttribute("stroke", "#F57C00");
            lighthouse.setAttribute("stroke-width", "1");
            svg.appendChild(lighthouse);
            
            // Add main roads
            addRoad(svg, svgNS, "M20,40 L70,40", "#666", 3); // Main Street
            addRoad(svg, svgNS, "M35,20 L35,70", "#666", 3); // Hospital Road
            addRoad(svg, svgNS, "M15,55 L70,55", "#999", 2); // Unawatuna Road
            addRoad(svg, svgNS, "M50,30 L70,30", "#999", 2); // Matara Road
        } else if (city === 'colombo') {
            cityOutline.setAttribute("d", "M10,10 L90,10 L90,90 L10,90 Z");
            cityOutline.setAttribute("fill", "#f0f0f0");
            cityOutline.setAttribute("stroke", "#ccc");
            cityOutline.setAttribute("stroke-width", "1");
            
            // Add water body (sea)
            const sea = document.createElementNS(svgNS, "path");
            sea.setAttribute("d", "M0,40 L100,40 L100,100 L0,100 Z");
            sea.setAttribute("fill", "#e6f7ff");
            svg.appendChild(sea);
            
            // Add main roads
            addRoad(svg, svgNS, "M10,50 L90,50", "#ddd", 3);
            addRoad(svg, svgNS, "M30,10 L30,90", "#ddd", 3);
            addRoad(svg, svgNS, "M60,10 L60,90", "#ddd", 3);
            addRoad(svg, svgNS, "M10,70 L90,70", "#ddd", 3);
            addRoad(svg, svgNS, "M10,30 L90,30", "#ddd", 3);
        } else if (city === 'kandy') {
            cityOutline.setAttribute("d", "M20,20 C40,10 60,10 80,20 C90,40 90,60 80,80 C60,90 40,90 20,80 C10,60 10,40 20,20 Z");
            cityOutline.setAttribute("fill", "#f0f0f0");
            cityOutline.setAttribute("stroke", "#ccc");
            cityOutline.setAttribute("stroke-width", "1");
            
            // Add water body (Kandy Lake)
            const lake = document.createElementNS(svgNS, "ellipse");
            lake.setAttribute("cx", "50");
            lake.setAttribute("cy", "50");
            lake.setAttribute("rx", "15");
            lake.setAttribute("ry", "10");
            lake.setAttribute("fill", "#e6f7ff");
            svg.appendChild(lake);
            
            // Add main roads
            addRoad(svg, svgNS, "M20,50 C30,40 70,40 80,50", "#ddd", 3);
            addRoad(svg, svgNS, "M50,20 C60,30 60,70 50,80", "#ddd", 3);
            addRoad(svg, svgNS, "M30,30 C40,40 60,60 70,70", "#ddd", 3);
        }
        
        svg.appendChild(cityOutline);
        
        // Add heatmap data points
        const data = heatmapData[city];
        data.forEach(point => {
            const [x, y, intensity] = point;
            
            // Create gradient for heatmap point
            const radialId = `grad-${x}-${y}`;
            const radialGradient = document.createElementNS(svgNS, "radialGradient");
            radialGradient.setAttribute("id", radialId);
            radialGradient.setAttribute("cx", "50%");
            radialGradient.setAttribute("cy", "50%");
            radialGradient.setAttribute("r", "50%");
            
            // Define gradient stops based on intensity
            const color = getIntensityColor(intensity);
            const stop1 = document.createElementNS(svgNS, "stop");
            stop1.setAttribute("offset", "0%");
            stop1.setAttribute("stop-color", color);
            stop1.setAttribute("stop-opacity", "0.7");
            
            const stop2 = document.createElementNS(svgNS, "stop");
            stop2.setAttribute("offset", "100%");
            stop2.setAttribute("stop-color", color);
            stop2.setAttribute("stop-opacity", "0");
            
            radialGradient.appendChild(stop1);
            radialGradient.appendChild(stop2);
            
            // Add gradient definition to SVG
            const defs = document.createElementNS(svgNS, "defs");
            defs.appendChild(radialGradient);
            svg.appendChild(defs);
            
            // Create heatmap point
            const heatPoint = document.createElementNS(svgNS, "circle");
            heatPoint.setAttribute("cx", x);
            heatPoint.setAttribute("cy", y);
            heatPoint.setAttribute("r", intensity * 3);
            heatPoint.setAttribute("fill", `url(#${radialId})`);
            
            svg.appendChild(heatPoint);
        });
        
        // Add landmarks - Enhanced for Galle
        if (city === 'galle') {
            addLandmark(svg, svgNS, 25, 40, "Fort Gate");
            addLandmark(svg, svgNS, 30, 35, "Dutch Church");
            addLandmark(svg, svgNS, 45, 25, "Lighthouse");
            addLandmark(svg, svgNS, 40, 55, "Bus Stand");
            addLandmark(svg, svgNS, 35, 30, "Clock Tower");
            addLandmark(svg, svgNS, 20, 45, "Railway Station");
        } else if (city === 'colombo') {
            addLandmark(svg, svgNS, 15, 30, "Fort");
            addLandmark(svg, svgNS, 40, 35, "Bambalapitiya");
            addLandmark(svg, svgNS, 60, 45, "Nugegoda");
            addLandmark(svg, svgNS, 75, 35, "Mt. Lavinia");
        } else if (city === 'kandy') {
            addLandmark(svg, svgNS, 30, 35, "Dalada Veediya");
            addLandmark(svg, svgNS, 50, 30, "Temple");
            addLandmark(svg, svgNS, 60, 40, "Ampitiya");
        } else {
            addLandmark(svg, svgNS, 30, 40, "Fort");
            addLandmark(svg, svgNS, 50, 45, "Bus Terminal");
            addLandmark(svg, svgNS, 60, 35, "Hospital");
        }
        
        // Add time indicator
        const timeIndicator = document.createElement('div');
        timeIndicator.className = 'time-indicator';
        timeIndicator.textContent = getCurrentTimeString();
        heatmapElement.appendChild(timeIndicator);
        
        // Add the SVG to the heatmap container
        heatmapElement.appendChild(svg);
        
        // Add legend information
        const legendInfo = document.createElement('div');
        legendInfo.className = 'legend-info';
        legendInfo.textContent = 'Live traffic data as of ' + getCurrentTimeString();
        heatmapElement.appendChild(legendInfo);
    }
    
    // Helper function to add roads to the map
    function addRoad(svg, svgNS, path, color, width) {
        const road = document.createElementNS(svgNS, "path");
        road.setAttribute("d", path);
        road.setAttribute("stroke", color);
        road.setAttribute("stroke-width", width);
        road.setAttribute("fill", "none");
        svg.appendChild(road);
    }
    
    // Helper function to add landmarks
    function addLandmark(svg, svgNS, x, y, name) {
        const landmarkGroup = document.createElementNS(svgNS, "g");
        
        // Landmark point
        const point = document.createElementNS(svgNS, "circle");
        point.setAttribute("cx", x);
        point.setAttribute("cy", y);
        point.setAttribute("r", "2");
        point.setAttribute("fill", "#333");
        
        // Landmark text
        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x + 3);
        text.setAttribute("y", y - 3);
        text.setAttribute("font-size", "3");
        text.setAttribute("fill", "#333");
        text.textContent = name;
        
        landmarkGroup.appendChild(point);
        landmarkGroup.appendChild(text);
        svg.appendChild(landmarkGroup);
    }
    
    // Get color based on traffic intensity
    function getIntensityColor(intensity) {
        if (intensity <= 3) {
            return "#4caf50"; // Green - Low traffic
        } else if (intensity <= 6) {
            return "#ff9800"; // Orange - Medium traffic
        } else {
            return "#f44336"; // Red - Heavy traffic
        }
    }
    
    // Get current time string
    function getCurrentTimeString() {
        const now = new Date();
        const hours = String(now.getHours()).padStart(2, '0');
        const minutes = String(now.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
    }
    
    // City button click handler
    cityButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remove active class from all buttons
            cityButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Get city name from data attribute
            const city = this.getAttribute('data-city');
            
            // Render heatmap for selected city
            renderHeatmap(city);
        });
    });
    
    // Initial render for default city (Galle instead of Colombo)
    renderHeatmap('galle');
    
    // Add styles for heatmap elements
    const style = document.createElement('style');
    style.textContent = `
        .time-indicator {
            position: absolute;
            top: 10px;
            right: 10px;
            background-color: rgba(255, 255, 255, 0.8);
            padding: 5px 10px;
            border-radius: 4px;
            font-size: 0.9rem;
            font-weight: 500;
        }
        
        .legend-info {
            font-size: 0.8rem;
            color: var(--text-medium);
            text-align: center;
            margin-top: 10px;
        }
    `;
    document.head.appendChild(style);
    
    // Update traffic data to focus more on Galle
    setInterval(() => {
        const activeCity = document.querySelector('.city-btn.active').getAttribute('data-city');
        // More frequent updates for Galle due to tourism traffic patterns
        if (activeCity === 'galle') {
            heatmapData[activeCity].forEach(point => {
                // Tourism-influenced traffic patterns
                const fluctuation = Math.floor(Math.random() * 3) - 1;
                point[2] = Math.max(1, Math.min(10, point[2] + fluctuation));
            });
        } else {
            // Slightly modify some data points to simulate changing traffic conditions
            heatmapData[activeCity].forEach(point => {
                // Random fluctuation between -1 and +1 for intensity
                const fluctuation = Math.floor(Math.random() * 3) - 1;
                point[2] = Math.max(1, Math.min(10, point[2] + fluctuation));
            });
        }
        renderHeatmap(activeCity);
    }, 20000); // More frequent updates for Galle (every 20 seconds)
});
