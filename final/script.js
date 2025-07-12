<script>
        
        document.addEventListener('DOMContentLoaded', function() {
            const chatInput = document.querySelector('.chatbot-input input');
            const chatButton = document.querySelector('.chatbot-input button');
            const chatMessages = document.querySelector('.chatbot-messages');
            
            chatButton.addEventListener('click', sendMessage);
            chatInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') sendMessage();
            });
            
            function sendMessage() {
                const message = chatInput.value.trim();
                if (message) {
                    // Add user message
                    addMessage(message, 'user-message');
                    chatInput.value = '';
                    
                    // Simulate bot response
                    setTimeout(() => {
                        const responses = [
                            "Based on your skills, I recommend exploring Data Science or UX Design careers.",
                            "I can help you identify the skills needed for your target roles.",
                            "Would you like me to analyze your resume for optimization opportunities?",
                            "Let me show you some networking opportunities in your area."
                        ];
                        addMessage(responses[Math.floor(Math.random() * responses.length)], 'bot-message');
                    }, 1000);
                }
            }
            
            function addMessage(text, className) {
                const messageDiv = document.createElement('div');
                messageDiv.className = message ${className};
                messageDiv.textContent = text;
                chatMessages.appendChild(messageDiv);
                chatMessages.scrollTop = chatMessages.scrollHeight;
            }
        });
    </script>