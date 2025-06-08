// Feedback page with Vue.js to create an interactive forum

document.addEventListener('DOMContentLoaded', function() {
    // Create Vue application for the feedback forum
    new Vue({
        el: '#feedback-app',
        data: {
            // Search and filtering
            searchQuery: '',
            currentTopic: 'all',
            sortOption: 'newest',
            
            // New post data
            newPost: {
                name: '',
                topic: 'general',
                title: '',
                content: ''
            },
            
            // For reply functionality
            replyingTo: null,
            newReply: {
                name: '',
                content: ''
            },
            
            // Sample posts (would normally come from a server)
            posts: [
                {
                    id: 1,
                    name: 'Kumara Dissanayake',
                    date: new Date('2025-04-15T10:30:00'),
                    topic: 'traffic',
                    title: 'Heritage-sensitive traffic management in Galle Fort',
                    content: 'The narrow colonial streets of Galle Fort were never designed for modern vehicle traffic. During peak tourist season, the congestion threatens both visitor experience and the historic stone pavements. I suggest implementing time-restricted vehicle access during certain hours, with electric shuttle services for tourists and residents.',
                    likes: 15,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Sanduni Fernando',
                            date: new Date('2025-04-15T11:45:00'),
                            content: 'Excellent idea! We could also consider designated parking areas outside the Fort walls with pedestrian-friendly walkways. The cobblestone streets are already showing wear from heavy vehicles.',
                            likes: 8,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Roshan Perera',
                            date: new Date('2025-04-15T14:20:00'),
                            content: 'As a local business owner, I support this but we need to ensure delivery access for shops. Perhaps early morning hours could be reserved for deliveries before tourist activities begin.',
                            likes: 6,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Nimalka Jayawardena',
                    date: new Date('2025-04-12T09:15:00'),
                    topic: 'waste',
                    title: 'Smart waste management for heritage tourism areas',
                    content: 'Galle Fort generates significant tourist waste, but traditional large bins disrupt the historic aesthetic. We need heritage-appropriate waste solutions - perhaps underground pneumatic systems or decorative bins that blend with colonial architecture while enabling efficient collection.',
                    likes: 22,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Chaminda Silva',
                            date: new Date('2025-04-12T10:30:00'),
                            content: 'Great point! I\'ve seen heritage cities in Europe use bins designed to look like period-appropriate features. We could also increase recycling education for tourists at entry points.',
                            likes: 9,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Pradeep Gunaratne',
                    date: new Date('2025-04-10T16:45:00'),
                    topic: 'energy',
                    title: 'Solar integration respecting heritage guidelines',
                    content: 'While solar panels could significantly reduce energy costs for Galle Fort businesses, UNESCO heritage guidelines restrict visible modern installations. We need creative solutions - perhaps solar tiles that mimic traditional clay roof tiles, or community solar farms outside the heritage zone.',
                    likes: 18,
                    userLiked: false,
                    replies: []
                },
                {
                    id: 4,
                    name: 'Dilini Wickramasinghe',
                    date: new Date('2025-04-08T15:20:00'),
                    topic: 'water',
                    title: 'Coastal flood management and heritage preservation',
                    content: 'Rising sea levels increasingly threaten Galle Fort\'s foundation walls during monsoons. We need smart drainage solutions that protect the ancient Dutch engineering while managing modern stormwater. Traditional channels could be enhanced with IoT monitoring without visual impact.',
                    likes: 20,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Arjuna Ranasinghe',
                            date: new Date('2025-04-08T16:10:00'),
                            content: 'The original Dutch drainage system was remarkable for its time. Modern sensors could help us understand water flow patterns and enhance the existing infrastructure rather than replacing it.',
                            likes: 7,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Malini Fonseka',
                            date: new Date('2025-04-09T09:25:00'),
                            content: 'As an engineer working on coastal projects, I can confirm that heritage-compatible solutions exist. We should also consider traditional Sri Lankan water management techniques from ancient cities.',
                            likes: 11,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Tharaka Bandara',
                    date: new Date('2025-04-05T11:05:00'),
                    topic: 'general',
                    title: 'Balancing tourism growth with local community needs',
                    content: 'Galle\'s tourism success brings economic benefits but also challenges for local residents. Housing costs are rising, traditional businesses are displaced by tourist shops, and infrastructure strain affects daily life. How can we ensure tourism development serves the community?',
                    likes: 28,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Upul Rajapakse',
                            date: new Date('2025-04-05T12:30:00'),
                            content: 'We need policies that require tourism businesses to employ local residents and support traditional crafts. Revenue sharing from tourism taxes could fund community infrastructure improvements.',
                            likes: 12,
                            userLiked: false
                        }
                    ]
                }
            ]
        },
        computed: {
            // Filtered and sorted posts based on user selection
            filteredPosts() {
                let result = this.posts;
                
                // Filter by topic
                if (this.currentTopic !== 'all') {
                    result = result.filter(post => post.topic === this.currentTopic);
                }
                
                // Filter by search query
                if (this.searchQuery.trim() !== '') {
                    const query = this.searchQuery.toLowerCase();
                    result = result.filter(post => 
                        post.title.toLowerCase().includes(query) || 
                        post.content.toLowerCase().includes(query)
                    );
                }
                
                // Sort posts
                if (this.sortOption === 'newest') {
                    result = result.sort((a, b) => b.date - a.date);
                } else if (this.sortOption === 'oldest') {
                    result = result.sort((a, b) => a.date - b.date);
                } else if (this.sortOption === 'popular') {
                    result = result.sort((a, b) => b.likes - a.likes);
                }
                
                return result;
            },
            
            // Validation for new post
            isValidPost() {
                return this.newPost.name.trim() !== '' && 
                       this.newPost.title.trim() !== '' && 
                       this.newPost.content.trim() !== '';
            },
            
            // Validation for reply
            isValidReply() {
                return this.newReply.name.trim() !== '' && 
                       this.newReply.content.trim() !== '';
            }
        },
        methods: {
            // Format date for display
            formatDate(date) {
                const options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' };
                return new Date(date).toLocaleDateString('en-US', options);
            },
            
            // Get readable topic name
            getTopicName(topicCode) {
                const topics = {
                    'traffic': 'Traffic Management',
                    'waste': 'Waste Management',
                    'energy': 'Energy Solutions',
                    'water': 'Water Management',
                    'general': 'General Discussion'
                };
                
                return topics[topicCode] || topicCode;
            },
            
            // Submit a new post
            submitPost() {
                if (!this.isValidPost) return;
                
                // Create new post object
                const newPost = {
                    id: this.posts.length + 1,
                    name: this.newPost.name,
                    date: new Date(),
                    topic: this.newPost.topic,
                    title: this.newPost.title,
                    content: this.newPost.content,
                    likes: 0,
                    userLiked: false,
                    replies: []
                };
                
                // Add post to posts array
                this.posts.unshift(newPost);
                
                // Clear form
                this.newPost = {
                    name: '',
                    topic: 'general',
                    title: '',
                    content: ''
                };
                
                // Show success message
                alert('Your post has been submitted successfully!');
            },
            
            // Start replying to a post
            replyTo(post) {
                this.replyingTo = post;
                
                // Scroll to the reply form
                setTimeout(() => {
                    const replyForm = document.querySelector('.post-form');
                    if (replyForm) {
                        replyForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 100);
            },
            
            // Submit a reply
            submitReply() {
                if (!this.replyingTo || !this.isValidReply) return;
                
                // Create new reply object
                const newReply = {
                    id: (this.replyingTo.replies.length + 1),
                    name: this.newReply.name,
                    date: new Date(),
                    content: this.newReply.content,
                    likes: 0,
                    userLiked: false
                };
                
                // Add reply to post
                this.replyingTo.replies.push(newReply);
                
                // Clear form and reset replying state
                this.newReply = { name: '', content: '' };
                this.replyingTo = null;
                
                // Show success message
                alert('Your reply has been submitted successfully!');
            },
            
            // Cancel replying
            cancelReply() {
                this.replyingTo = null;
                this.newReply = { name: '', content: '' };
            },
            
            // Like a post
            likePost(post) {
                if (post.userLiked) {
                    post.likes--;
                    post.userLiked = false;
                } else {
                    post.likes++;
                    post.userLiked = true;
                }
            },
            
            // Like a reply
            likeReply(post, reply) {
                if (reply.userLiked) {
                    reply.likes--;
                    reply.userLiked = false;
                } else {
                    reply.likes++;
                    reply.userLiked = true;
                }
            }
        },
        mounted() {
            // Add professional fade-in animation to posts when loaded
            setTimeout(() => {
                const posts = document.querySelectorAll('.forum-post');
                posts.forEach((post, index) => {
                    setTimeout(() => {
                        post.classList.add('fade-in');
                    }, index * 100);
                });
            }, 300);
        }
    });
    
    // Add CSS updates for the Vue.js forum with more professional styling
    const forumStyles = document.createElement('style');
    forumStyles.textContent = `
        .fa-heart {
            color: var(--error-color);
        }
        
        .fa-heart-o {
            color: var(--text-light);
        }
        
        [v-cloak] {
            display: none;
        }
        
        .like-btn, .reply-btn {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .like-btn:hover, .reply-btn:hover {
            background-color: var(--background-dark);
            transform: translateY(-2px);
        }
        
        .like-btn:active, .reply-btn:active {
            transform: scale(0.98);
        }
        
        .post-form {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            border: 1px solid rgba(0,0,0,0.05);
        }
        
        .forum-post {
            opacity: 0;
            transform: translateY(20px);
            transition: opacity 0.6s ease, transform 0.6s ease;
            box-shadow: 0 1px 3px rgba(0,0,0,0.08);
            border: 1px solid rgba(0,0,0,0.05);
        }
        
        .forum-post.fade-in {
            opacity: 1;
            transform: translateY(0);
        }
        
        .forum-post:hover {
            box-shadow: 0 3px 6px rgba(0,0,0,0.12);
            border-color: rgba(25, 118, 210, 0.1);
        }
        
        .post-title {
            font-family: var(--font-heading);
            letter-spacing: -0.01em;
        }
        
        .form-group input:focus,
        .form-group textarea:focus,
        .form-group select:focus {
            border-color: var(--primary-color);
            outline: none;
            box-shadow: 0 0 0 3px rgba(25, 118, 210, 0.2);
        }
        
        .form-actions .btn {
            position: relative;
            overflow: hidden;
        }
        
        .form-actions .btn::after {
            content: '';
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: -100%;
            background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
            transition: all 0.6s ease;
        }
        
        .form-actions .btn:hover::after {
            left: 100%;
        }
        
        .reply {
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
        }
        
        .reply:hover {
            box-shadow: 0 2px 5px rgba(0,0,0,0.1);
        }
        
        .guidelines-list li {
            transition: transform 0.3s ease;
        }
        
        .guidelines-list li:hover {
            transform: translateX(5px);
        }
    `;
    document.head.appendChild(forumStyles);
});
