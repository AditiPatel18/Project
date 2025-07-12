document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const questions = document.querySelectorAll('.question-card');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    const progressFill = document.getElementById('progressFill');
    const progressText = document.getElementById('progressText');
    
    let currentQuestion = 0;
    const totalQuestions = questions.length;
    const responses = {};
    
    // Initialize
    showQuestion(currentQuestion);
    updateProgress();
    
    // Navigation
    nextBtn.addEventListener('click', function() {
        if (!validateCurrentQuestion()) {
            alert('Please provide a response before continuing');
            return;
        }
        
        saveResponse();
        
        if (currentQuestion < totalQuestions - 1) {
            currentQuestion++;
            showQuestion(currentQuestion);
            updateNavigation();
        } else {
            submitAssessment();
        }
    });
    
    prevBtn.addEventListener('click', function() {
        if (currentQuestion > 0) {
            currentQuestion--;
            showQuestion(currentQuestion);
            updateNavigation();
        }
    });
    
    // Question Display
    function showQuestion(index) {
        questions.forEach((q, i) => {
            q.classList.toggle('active', i === index);
        });
    }
    
    // Progress Tracking
    function updateProgress() {
        const progress = ((currentQuestion + 1) / totalQuestions) * 100;
        progressFill.style.width = ${progress}%;
        progressText.textContent = Question ${currentQuestion + 1} of ${totalQuestions};
        
        if (currentQuestion === totalQuestions - 1) {
            nextBtn.innerHTML = '<i class="fas fa-paper-plane"></i> Submit';
        } else {
            nextBtn.innerHTML = 'Next <i class="fas fa-arrow-right"></i>';
        }
    }
    
    // Navigation State
    function updateNavigation() {
        prevBtn.classList.toggle('disabled', currentQuestion === 0);
        updateProgress();
    }
    
    // Response Validation
    function validateCurrentQuestion() {
        const currentQ = questions[currentQuestion];
        
        // For radio inputs
        const radioName = currentQ.querySelector('input[type="radio"]')?.name;
        if (radioName) {
            return !!currentQ.querySelector(input[name="${radioName}"]:checked);
        }
        
        // For textarea
        const textarea = currentQ.querySelector('textarea');
        if (textarea) {
            return textarea.value.trim().length > 10; // Minimum 10 chars
        }
        
        return true;
    }
    
    // Save Response
    function saveResponse() {
        const currentQ = questions[currentQuestion];
        const questionId = currentQ.id;
        const questionText = currentQ.querySelector('h2').textContent;
        
        // Radio button response
        const selectedRadio = currentQ.querySelector('input[type="radio"]:checked');
        if (selectedRadio) {
            responses[questionId] = {
                question: questionText,
                value: selectedRadio.value,
                label: selectedRadio.nextElementSibling.textContent.trim()
            };
            return;
        }
        
        // Textarea response
        const textarea = currentQ.querySelector('textarea');
        if (textarea) {
            responses[questionId] = {
                question: questionText,
                value: textarea.value.trim()
            };
        }
    }
    
    // Submit Assessment
    function submitAssessment() {
        console.log('User responses:', responses);
        
        // In a real app: Send to backend
        fetch('/api/chatbot-feedback', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responses)
        })
        .then(response => {
            if (response.ok) {
                window.location.href = '/thank-you'; // Redirect to confirmation
            } else {
                alert('Submission failed. Please try again.');
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('Network error. Please check your connection.');
        });
    }
    
    // Animation for selected options
    document.querySelectorAll('input[type="radio"]').forEach(radio => {
        radio.addEventListener('change', function() {
            // Remove all selected styles first
            document.querySelectorAll(input[name="${this.name}"] + label).forEach(label => {
                label.style.transform = 'scale(1)';
                label.style.fontWeight = 'normal';
            });
            
            // Highlight selected
            if (this.checked) {
                this.nextElementSibling.style.fontWeight = '600';
                
                // Special handling for emoji scale
                const emoji = this.nextElementSibling.querySelector('.emoji');
                if (emoji) {
                    emoji.style.transform = 'scale(1.3)';
                }
            }
        });
    });
});