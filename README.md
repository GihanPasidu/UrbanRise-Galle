# SmartSL Urban - UrbanRise Galle

A comprehensive smart city platform for Sri Lankan urban areas, focusing on sustainable development, community engagement, and innovative technology solutions.

## 🌟 Overview

SmartSL Urban is a web-based platform designed to address urban challenges in Sri Lankan cities through technology-driven solutions and community collaboration. The platform serves as a hub for citizens, urban planners, and policymakers to explore local issues, discover smart solutions, participate in community events, and share feedback.

## 🚀 Features

### 🏠 Homepage
- Interactive hero section with city skyline imagery
- Smart city features showcase
- Live traffic heatmap for major Sri Lankan cities (Colombo, Kandy, Galle)
- Professional animations and responsive design

### 🚧 Local Issues
- Comprehensive overview of urban challenges
- Statistical data visualization
- Detailed issue analysis with impact assessment
- Community-reported problems section

### 💡 Solutions
- Smart traffic management systems
- IoT-enabled waste management
- Renewable energy initiatives
- Water management solutions
- Interactive carbon footprint calculator
- Implementation status tracking

### 📅 Community Events
- Upcoming workshops and clean-up drives
- Tech expos and hackathons
- Event registration and detailed information
- Past events gallery
- Community event hosting opportunities

### 💬 Feedback Forum
- Vue.js powered interactive discussion platform
- Topic-based conversations
- Search and filtering capabilities
- Real-time like and reply system
- Community guidelines and moderation

## 🛠️ Technologies Used

### Frontend
- **HTML5** - Semantic markup and structure
- **CSS3** - Modern styling with CSS Grid, Flexbox, and animations
- **JavaScript (ES6+)** - Interactive functionality and DOM manipulation
- **Vue.js 2.6** - Reactive components for the feedback forum

### Design & UX
- **Font Awesome** - Icon library
- **Google Fonts** - Professional typography (Poppins, Roboto)
- **Responsive Design** - Mobile-first approach
- **CSS Custom Properties** - Consistent theming system

### Development Tools
- **Git** - Version control
- **Modern Browser APIs** - Local storage, Fetch API, etc.

## 📁 Project Structure

```
UrbanRise-Galle/
├── css/
│   └── style.css                 # Main stylesheet with comprehensive styling
├── js/
│   ├── main.js                   # Core JavaScript functionality
│   ├── solutions.js              # Calculator and solutions logic
│   ├── heatmap.js               # Traffic heatmap functionality
│   ├── feedback.js              # Vue.js forum application
│   └── events.js                # Event management and modals
├── images/                      # Image assets (not included in repository)
│   ├── colombo-skyline.jpg
│   ├── smart-solutions.jpg
│   ├── community-event.jpg
│   └── ...
├── index.html                   # Homepage
├── local-issues.html           # Urban challenges page
├── solutions.html              # Smart solutions showcase
├── community-events.html      # Events and workshops
├── feedback.html               # Community forum
├── README.md                   # Project documentation
└── .gitattributes             # Git configuration
```

## 🚀 Getting Started

### Prerequisites
- Modern web browser (Chrome, Firefox, Safari, Edge)
- Local web server (optional, for development)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/UrbanRise-Galle.git
   cd UrbanRise-Galle
   ```

2. **Set up local development server (optional)**
   ```bash
   # Using Python 3
   python -m http.server 8000

   # Using Node.js
   npx serve .

   # Using PHP
   php -S localhost:8000
   ```

3. **Open in browser**
   - Direct file access: Open `index.html` in your browser
   - Local server: Navigate to `http://localhost:8000`

### Adding Images

The project references several images that are not included in the repository. Create an `images/` folder and add the following:

**Required Images:**
- `colombo-skyline.jpg` - Hero background
- `smart-solutions.jpg` - Solutions page banner
- `community-event.jpg` - Events page banner
- `feedback.jpg` - Feedback page banner
- `traffic-congestion.jpg` - Local issues illustrations
- `waste-management.jpg`
- `energy-consumption.jpg`
- `water-management.jpg`

**Event Images:**
- `urban-gardening-workshop.jpg`
- `beach-cleanup.jpg`
- `smart-city-expo.jpg`
- `urban-hackathon.jpg`
- `rain-water-workshop.jpg`
- `canal-cleanup.jpg`

## 🎨 Customization

### Color Scheme
The project uses CSS custom properties for easy theming. Modify the `:root` section in `css/style.css`:

```css
:root {
    --primary-color: #1976D2;      /* Main brand color */
    --secondary-color: #388E3C;    /* Accent color */
    --text-dark: #263238;          /* Primary text */
    --background-light: #FFFFFF;   /* Light backgrounds */
    /* ... more variables */
}
```

### Adding New Solutions
1. Update the solutions data in `js/solutions.js`
2. Add corresponding HTML in `solutions.html`
3. Include relevant images in the `images/` folder

### Extending the Forum
The feedback forum is built with Vue.js. To add new features:
1. Modify the Vue component in `js/feedback.js`
2. Update the template in `feedback.html`
3. Add styling in the `forumStyles` section

## 📱 Browser Support

- Chrome 60+
- Firefox 55+
- Safari 12+
- Edge 79+

## 🤝 Contributing

We welcome contributions to improve SmartSL Urban! Here's how you can help:

### Development Workflow
1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Make your changes
4. Test thoroughly
5. Commit your changes: `git commit -m "Add feature description"`
6. Push to the branch: `git push origin feature-name`
7. Submit a pull request

### Contribution Guidelines
- Follow the existing code style and structure
- Test your changes across different browsers
- Ensure responsive design compatibility
- Update documentation for new features
- Keep commits focused and descriptive

### Areas for Contribution
- **Accessibility improvements** - ARIA labels, keyboard navigation
- **Performance optimization** - Image optimization, code minification
- **New features** - Additional calculators, more interactive elements
- **Content updates** - New event types, solution categories
- **Bug fixes** - Cross-browser compatibility, responsive issues

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact & Support

- **Project Repository:** [GitHub](https://github.com/yourusername/UrbanRise-Galle)
- **Issues & Bug Reports:** [GitHub Issues](https://github.com/yourusername/UrbanRise-Galle/issues)
- **Discussions:** Use the feedback forum on the website

## 🙏 Acknowledgments

- Sri Lankan urban development initiatives for inspiration
- Open source community for tools and resources
- Contributors and community members for feedback and improvements

## 🔄 Version History

### v1.0.0 (Current)
- Initial release with core functionality
- Complete responsive design
- Interactive forum system
- Traffic heatmap integration
- Carbon footprint calculator

---

**Built with ❤️ for Sri Lankan smart cities**

