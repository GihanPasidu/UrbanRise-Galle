// Simple feedback forum with Vue.js

document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#feedback-app',
        data: {
            newPost: {
                name: '',
                topic: 'general',
                title: '',
                content: ''
            },
            posts: [
                {
                    id: 1,
                    name: 'Priya Fernando',
                    topic: 'traffic',
                    title: 'Better traffic management needed in Galle Fort',
                    content: 'The narrow roads in Galle Fort get very congested during tourist season. We need better traffic flow management.',
                    likes: 5
                },
                {
                    id: 2,
                    name: 'Kumara Silva',
                    topic: 'waste',
                    title: 'More recycling bins at Galle beaches',
                    content: 'Tourists and locals need more recycling bins along our beautiful beaches to keep them clean.',
                    likes: 8
                }
            ]
        },
        methods: {
            submitPost() {
                if (this.newPost.name && this.newPost.title && this.newPost.content) {
                    const newPost = {
                        id: this.posts.length + 1,
                        name: this.newPost.name,
                        topic: this.newPost.topic,
                        title: this.newPost.title,
                        content: this.newPost.content,
                        likes: 0
                    };
                    
                    this.posts.unshift(newPost);
                    
                    // Clear form
                    this.newPost = {
                        name: '',
                        topic: 'general',
                        title: '',
                        content: ''
                    };
                    
                    alert('Your post has been submitted!');
                } else {
                    alert('Please fill in all fields.');
                }
            },
            
            likePost(post) {
                post.likes++;
            }
        }
    });
});
