// Simple traffic heatmap

document.addEventListener('DOMContentLoaded', function() {
    const heatmapElement = document.getElementById('traffic-heatmap');
    const cityButtons = document.querySelectorAll('.city-btn');
    
    if (!heatmapElement || cityButtons.length === 0) return;

    function renderHeatmap(area) {
        heatmapElement.innerHTML = `
            <div class="simple-heatmap">
                <h3>Traffic Status: ${getAreaName(area)}</h3>
                <div class="traffic-areas">
                    <div class="area ${getTrafficLevel(area, 'main')}">Main Roads - ${getTrafficText(area, 'main')}</div>
                    <div class="area ${getTrafficLevel(area, 'residential')}">Residential Areas - ${getTrafficText(area, 'residential')}</div>
                    <div class="area ${getTrafficLevel(area, 'tourist')}">Tourist Areas - ${getTrafficText(area, 'tourist')}</div>
                </div>
                <p>Last updated: ${new Date().toLocaleTimeString()}</p>
            </div>
        `;
    }
    
    function getAreaName(area) {
        const areas = {
            'galle-fort': 'Galle Fort Area',
            'galle-main': 'Galle Main City',
            'galle-unawatuna': 'Unawatuna Road'
        };
        return areas[area] || area;
    }
    
    function getTrafficLevel(area, type) {
        // Simulate different traffic levels for different areas
        if (area === 'galle-fort') {
            return type === 'tourist' ? 'high' : type === 'main' ? 'medium' : 'low';
        } else if (area === 'galle-main') {
            return type === 'main' ? 'high' : 'medium';
        } else {
            return type === 'tourist' ? 'medium' : 'low';
        }
    }
    
    function getTrafficText(area, type) {
        const level = getTrafficLevel(area, type);
        return level === 'high' ? 'Heavy Traffic' : level === 'medium' ? 'Medium Traffic' : 'Light Traffic';
    }
    
    cityButtons.forEach(button => {
        button.addEventListener('click', function() {
            cityButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const area = this.getAttribute('data-city');
            renderHeatmap(area);
        });
    });
    
    // Initial render
    renderHeatmap('galle-fort');
    
    // Add simple styles
    const style = document.createElement('style');
    style.textContent = `
        .simple-heatmap {
            padding: 20px;
            text-align: center;
        }
        
        .traffic-areas {
            margin: 20px 0;
        }
        
        .area {
            padding: 10px;
            margin: 5px 0;
            border-radius: 5px;
            color: white;
        }
        
        .area.high { background-color: #f44336; }
        .area.medium { background-color: #ff9800; }
        .area.low { background-color: #4caf50; }
    `;
    document.head.appendChild(style);
});
