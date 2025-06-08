// Traffic Heatmap visualization for homepage

document.addEventListener('DOMContentLoaded', function() {
    // Traffic heatmap functionality
    const heatmapElement = document.getElementById('traffic-heatmap');
    const cityButtons = document.querySelectorAll('.city-btn');
    
    if (!heatmapElement || cityButtons.length === 0) {
        return; // Exit if elements don't exist
    }

    // Map data for different cities
    const heatmapData = {
        colombo: [
            // Format: [x%, y%, intensity(1-10)]
            [10, 20, 8],  // Pettah
            [15, 30, 9],  // Fort
            [25, 25, 7],  // Union Place
            [35, 15, 10], // Borella
            [40, 35, 6],  // Bambalapitiya
            [55, 30, 8],  // Wellawatte
            [65, 25, 5],  // Dehiwala
            [75, 35, 3],  // Mount Lavinia
            [30, 55, 7],  // Maradana
            [45, 50, 8],  // Thimbirigasyaya
            [60, 45, 4],  // Nugegoda
            [50, 65, 3],  // Battaramulla
            [25, 75, 2],  // Pelawatte
            [35, 85, 1],  // Malabe
            [85, 15, 2],  // Ratmalana
            [90, 25, 1],  // Moratuwa
        ],
        kandy: [
            [20, 30, 7], // Kandy City Center
            [30, 35, 8], // Dalada Veediya
            [40, 25, 6], // Peradeniya Road
            [35, 45, 7], // Railway Station
            [50, 30, 5], // Katugastota
            [60, 40, 4], // Ampitiya
            [70, 35, 3], // Polgolla
            [45, 55, 5], // Mahanuwara
            [55, 65, 3], // Digana
            [65, 60, 2], // Kundasale
        ],
        galle: [
            [25, 40, 6], // Galle Fort
            [35, 35, 7], // Main Street
            [45, 30, 5], // Lighthouse Street
            [30, 50, 6], // Bus Station
            [50, 45, 4], // Unawatuna Road
            [60, 35, 3], // Hirimbura Cross Road
            [40, 60, 4], // Magalle
            [55, 55, 2], // Walahanduwa
            [70, 50, 1], // Baddegama Road
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
        
        // Different city outlines
        if (city === 'colombo') {
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
        } else {
            // Galle
            cityOutline.setAttribute("d", "M30,30 L70,30 L80,50 L70,70 L30,70 L20,50 Z");
            cityOutline.setAttribute("fill", "#f0f0f0");
            cityOutline.setAttribute("stroke", "#ccc");
            cityOutline.setAttribute("stroke-width", "1");
            
            // Add water body (sea)
            const sea = document.createElementNS(svgNS, "path");
            sea.setAttribute("d", "M0,30 L30,30 L20,50 L30,70 L0,70 Z");
            sea.setAttribute("fill", "#e6f7ff");
            svg.appendChild(sea);
            
            // Add main roads
            addRoad(svg, svgNS, "M30,50 L70,50", "#ddd", 3);
            addRoad(svg, svgNS, "M50,30 L50,70", "#ddd", 3);
            addRoad(svg, svgNS, "M30,30 L70,70", "#ddd", 3);
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
        
        // Add some landmarks
        if (city === 'colombo') {
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
    
    // Initial render for default city (Colombo)
    renderHeatmap('colombo');
    
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
    
    // Simulate live traffic updates
    setInterval(() => {
        const activeCity = document.querySelector('.city-btn.active').getAttribute('data-city');
        // Slightly modify some data points to simulate changing traffic conditions
        heatmapData[activeCity].forEach(point => {
            // Random fluctuation between -1 and +1 for intensity
            const fluctuation = Math.floor(Math.random() * 3) - 1;
            point[2] = Math.max(1, Math.min(10, point[2] + fluctuation));
        });
        // Re-render the active city
        renderHeatmap(activeCity);
    }, 30000); // Update every 30 seconds
});
