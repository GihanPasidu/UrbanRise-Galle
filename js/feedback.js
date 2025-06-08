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
                    name: 'Dasun Perera',
                    date: new Date('2025-04-15T10:30:00'),
                    topic: 'traffic',
                    title: 'One-way system needed for Galle Road',
                    content: 'The traffic congestion along Galle Road, especially between Bambalapitiya and Wellawatte, has become unbearable during peak hours. I believe implementing a one-way system during peak hours (6-9 AM and 4-7 PM) could significantly improve traffic flow. What do others think about this suggestion?',
                    likes: 12,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Amali Fernando',
                            date: new Date('2025-04-15T11:45:00'),
                            content: 'I agree this could help! But we would need good alternative routes for the opposite direction. Maybe Marine Drive could be optimized for the reverse flow?',
                            likes: 8,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Roshan Silva',
                            date: new Date('2025-04-15T14:20:00'),
                            content: 'I\'m not sure this would work without substantial changes to connecting roads. The junctions at Bambalapitiya and Wellawatte would become bottlenecks. Perhaps we should consider a dedicated bus lane instead?',
                            likes: 5,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Priya Gunawardena',
                    date: new Date('2025-04-12T09:15:00'),
                    topic: 'waste',
                    title: 'Need for separated waste bins in public areas',
                    content: 'I\'ve noticed that most public waste bins in Colombo don\'t allow for separating recyclables from general waste. If we had bins with separate sections for plastic, paper, and general waste in high-traffic areas like parks and bus stops, it could greatly improve recycling rates. The municipality could then collect these pre-sorted materials more efficiently.',
                    likes: 20,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Nimal Jayasuriya',
                            date: new Date('2025-04-12T10:30:00'),
                            content: 'Great idea! I\'ve seen such bins in Singapore and they work very well. We should also have educational campaigns to teach people how to sort waste correctly.',
                            likes: 7,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Thilini Rajapakse',
                    date: new Date('2025-04-10T16:45:00'),
                    topic: 'energy',
                    title: 'Solar panels for government buildings',
                    content: 'With the frequent power outages and rising electricity costs, I think all government buildings should be equipped with solar panels. This would not only reduce their operational costs in the long run but also set an example for the private sector. Schools, hospitals, and administrative buildings have large roof areas that are perfect for solar installation.',
                    likes: 15,
                    userLiked: false,
                    replies: []
                },
                {
                    id: 4,
                    name: 'Kumara Bandara',
                    date: new Date('2025-04-08T15:20:00'),
                    topic: 'water',
                    title: 'Flood prevention through porous paving',
                    content: 'The flooding in Colombo during monsoon season is getting worse each year. One solution I\'ve researched is porous paving for sidewalks, parking lots, and less-trafficked roads. These surfaces allow rainwater to seep through to the ground below, reducing runoff and helping replenish groundwater. Could this be implemented in flood-prone areas of the city?',
                    likes: 18,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Sampath Perera',
                            date: new Date('2025-04-08T16:10:00'),
                            content: 'This is actually a great idea that\'s been implemented in several cities with heavy rainfall. The initial cost might be higher than traditional paving, but the reduced flood damage would make it worthwhile. Would need to ensure proper maintenance though, as these surfaces can get clogged with debris.',
                            likes: 6,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Dilini Fonseka',
                            date: new Date('2025-04-09T09:25:00'),
                            content: 'I work for an engineering firm and we\'ve been studying this. The challenge in Sri Lanka is the intensity of monsoon rains - we would need to combine porous paving with improved drainage systems and retention ponds to make a significant difference.',
                            likes: 9,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Malith Gunathilaka',
                    date: new Date('2025-04-05T11:05:00'),
                    topic: 'general',
                    title: 'Pedestrian-friendly city centers',
                    content: 'I recently visited several European cities where the central areas were pedestrian-only zones. This created vibrant spaces for community interaction, outdoor dining, and cultural activities. Could we implement something similar in parts of Colombo, perhaps starting with sections of Pettah or Fort on weekends?',
                    likes: 25,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Lakshmi Perera',
                            date: new Date('2025-04-05T12:30:00'),
                            content: 'I love this idea! The arcade area would be perfect for a pedestrian zone. It would boost local businesses and create a more pleasant environment for shoppers.',
                            likes: 8,
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
