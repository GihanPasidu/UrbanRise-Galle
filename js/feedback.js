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
            
            // Sample posts focused on Galle city
            posts: [
                {
                    id: 1,
                    name: 'Thilina Rathnayake',
                    date: new Date('2025-04-15T10:30:00'),
                    topic: 'traffic',
                    title: 'Tourism traffic congestion in Galle Fort during weekends',
                    content: 'The narrow streets of Galle Fort become extremely congested on weekends when tour buses and private vehicles try to enter. Church Street and Hospital Street are particularly affected. I suggest implementing a park-and-ride system at the Galle Cricket Stadium with shuttle services to the Fort entrance.',
                    likes: 18,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Priyanka Fernando',
                            date: new Date('2025-04-15T11:45:00'),
                            content: 'Great idea! The Fort\'s UNESCO status requires us to protect these historic streets. A shuttle service would also give tourists a better experience without the stress of parking.',
                            likes: 12,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Roshan Perera',
                            date: new Date('2025-04-15T14:20:00'),
                            content: 'I work in the Dutch Hospital area and see this daily. Maybe we could also have time restrictions - no vehicles in the Fort core from 10 AM to 4 PM on weekends?',
                            likes: 8,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 2,
                    name: 'Amali Gunasekara',
                    date: new Date('2025-04-12T09:15:00'),
                    topic: 'waste',
                    title: 'Beach waste management along Galle\'s coastline',
                    content: 'The beautiful beaches around Galle, especially near the lighthouse and towards Unawatuna, are getting polluted with plastic waste from both locals and tourists. We need more frequent cleanup drives and better waste bins along the coastal walking path. The ocean currents also bring waste from other areas.',
                    likes: 25,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Kasun Silva',
                            date: new Date('2025-04-12T10:30:00'),
                            content: 'I participate in monthly beach cleanups. We also need to educate tourists about not leaving waste on the beaches. Maybe signs in multiple languages?',
                            likes: 9,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 3,
                    name: 'Dilshan Jayawardena',
                    date: new Date('2025-04-10T16:45:00'),
                    topic: 'energy',
                    title: 'Solar panels for Galle\'s historic buildings',
                    content: 'With Galle\'s abundant sunshine and high tourism energy demands, we should install solar panels on non-heritage buildings. The new hotels and guesthouses outside the Fort could lead by example. We need to balance heritage preservation with modern energy needs.',
                    likes: 16,
                    userLiked: false,
                    replies: []
                },
                {
                    id: 4,
                    name: 'Nelum Bandara',
                    date: new Date('2025-04-08T15:20:00'),
                    topic: 'water',
                    title: 'Monsoon flooding in Galle\'s low-lying areas',
                    content: 'Every monsoon season, areas like Hirimbura and parts of Magalle experience flooding. The old Dutch drainage systems in the Fort work well, but newer areas lack proper drainage. We need modern drainage systems that complement the historic infrastructure.',
                    likes: 22,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Samanthi Perera',
                            date: new Date('2025-04-08T16:10:00'),
                            content: 'The drainage canals built by the Dutch are still functional after 400 years! We should study their design and adapt it for modern Galle. Maybe combine it with rainwater harvesting.',
                            likes: 11,
                            userLiked: false
                        },
                        {
                            id: 2,
                            name: 'Mahesh Fonseka',
                            date: new Date('2025-04-09T09:25:00'),
                            content: 'I work in urban planning. The challenge is that Galle is built on different elevation levels. We need a comprehensive water management plan that considers both heritage areas and new developments.',
                            likes: 7,
                            userLiked: false
                        }
                    ]
                },
                {
                    id: 5,
                    name: 'Sachini Wijeratne',
                    date: new Date('2025-04-05T11:05:00'),
                    topic: 'general',
                    title: 'Preserving Galle\'s heritage while embracing modernity',
                    content: 'As a Galle resident, I love our city\'s history but we also need modern amenities. How can we introduce smart city features like free WiFi, digital information boards, and modern lighting while respecting the UNESCO guidelines? Other heritage cities worldwide have managed this balance.',
                    likes: 31,
                    userLiked: false,
                    replies: [
                        {
                            id: 1,
                            name: 'Ravi Kumarasiri',
                            date: new Date('2025-04-05T12:30:00'),
                            content: 'I visited Dubrovnik in Croatia - they have a similar fort city with modern amenities integrated sensitively. Underground cables, heritage-style street lighting, and discreet WiFi points work well.',
                            likes: 14,
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
            
            // Get readable topic name - Updated for Galle context
            getTopicName(topicCode) {
                const topics = {
                    'traffic': 'Traffic & Tourism Management',
                    'waste': 'Waste & Beach Management',
                    'energy': 'Energy & Heritage',
                    'water': 'Water & Coastal Management',
                    'general': 'General Galle Development'
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
