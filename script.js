// This file can be used for any interactive elements across the website.
// For example, handling form submissions (though actual login/signup needs backend),
// dynamic content loading, animations, etc.

document.addEventListener('DOMContentLoaded', () => {
    // --- Chatbot message sending (frontend simulation) ---
    const chatInput = document.getElementById('chat-input');
    const sendMessageBtn = document.getElementById('send-message-btn');
    const chatMessages = document.getElementById('chat-messages');

    if (sendMessageBtn && chatInput && chatMessages) {
        sendMessageBtn.addEventListener('click', () => {
            const messageText = chatInput.value.trim();
            if (messageText) {
                // Add user message
                const userMsgDiv = document.createElement('div');
                userMsgDiv.classList.add('message', 'user-message');
                userMsgDiv.textContent = messageText;
                chatMessages.appendChild(userMsgDiv);
                chatInput.value = ''; // Clear input

                // Simulate bot response (in a real app, this would come from the backend)
                setTimeout(() => {
                    const botMsgDiv = document.createElement('div');
                    botMsgDiv.classList.add('message', 'bot-message');
                    botMsgDiv.textContent = "Thank you for your message. I'm an AI assistant. How else can I help you today?";
                    chatMessages.appendChild(botMsgDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight; // Scroll to bottom
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

    // --- Forum post submission (frontend simulation) ---
    const postTitleInput = document.getElementById('post-title');
    const postContentTextarea = document.getElementById('post-content');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const forumPostsContainer = document.getElementById('forum-posts');

    if (submitPostBtn && postTitleInput && postContentTextarea && forumPostsContainer) {
        submitPostBtn.addEventListener('click', () => {
            const title = postTitleInput.value.trim();
            const content = postContentTextarea.value.trim();

            if (title && content) {
                const newPostHTML = `
                    <div class="post-card">
                        <div class="post-header">
                            <h3 class="post-title">${title}</h3>
                            <span class="post-meta">Posted by Anonymous on ${new Date().toLocaleDateString()}</span>
                        </div>
                        <p class="post-content">${content}</p>
                        <div class="post-footer">
                            <span>0 comments</span>
                        </div>
                    </div>
                `;
                // Prepend new post to the top
                forumPostsContainer.insertAdjacentHTML('afterbegin', newPostHTML);
                postTitleInput.value = '';
                postContentTextarea.value = '';
                alert('Post submitted! (Frontend simulation only)');
            } else {
                alert('Please enter both a title and content for your post.');
            }
        });
    }

    // --- PSS-10 Test Scoring Logic ---
    const pss10Form = document.getElementById('pss10-test-form');
    if (pss10Form) {
        pss10Form.addEventListener('submit', (e) => {
            e.preventDefault(); // Prevent default form submission

            let totalScore = 0;
            const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];

            let allAnswered = true;
            questions.forEach(qName => {
                const selectedOption = document.querySelector(`input[name="${qName}"]:checked`);
                if (selectedOption) {
                    totalScore += parseInt(selectedOption.value);
                } else {
                    allAnswered = false;
                }
            });

            if (!allAnswered) {
                alert('Please answer all questions before calculating your score.');
                return;
            }

            // Display score and interpretation
            const scoreDisplay = document.getElementById('score-display');
            const scoreInterpretation = document.getElementById('score-interpretation');
            const testResultsDiv = document.getElementById('test-results');

            scoreDisplay.textContent = totalScore;
            
            let interpretationText = '';
            if (totalScore >= 0 && totalScore <= 13) {
                interpretationText = 'Your stress level appears to be low.';
            } else if (totalScore >= 14 && totalScore <= 26) {
                interpretationText = 'Your stress level appears to be moderate. Consider exploring stress management techniques.';
            } else if (totalScore >= 27 && totalScore <= 40) {
                interpretationText = 'Your stress level appears to be high. It might be beneficial to seek professional support.';
            } else {
                interpretationText = 'Could not interpret score. Please ensure all answers are valid.';
            }
            scoreInterpretation.textContent = interpretationText;
            testResultsDiv.style.display = 'block'; // Show results
            testResultsDiv.scrollIntoView({ behavior: 'smooth' }); // Scroll to results
        });
    }
});