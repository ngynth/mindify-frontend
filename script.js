document.addEventListener('DOMContentLoaded', () => {
    // --- Backend Base URL ---
    const backendURL = "https://mindify-backend-06la.onrender.com";

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
                chatInput.value = '';

                // Simulate bot response
                setTimeout(() => {
                    const botMsgDiv = document.createElement('div');
                    botMsgDiv.classList.add('message', 'bot-message');
                    botMsgDiv.textContent = "Thank you for your message. I'm an AI assistant. How else can I help you today?";
                    chatMessages.appendChild(botMsgDiv);
                    chatMessages.scrollTop = chatMessages.scrollHeight;
                }, 1000);
            }
        });

        chatInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                sendMessageBtn.click();
            }
        });
    }

// --- Forum post submission (REAL backend) ---
    const postTitleInput = document.getElementById('post-title');
    const postContentTextarea = document.getElementById('post-content');
    const submitPostBtn = document.getElementById('submit-post-btn');
    const forumPostsContainer = document.getElementById('forum-posts');

    if (submitPostBtn && postTitleInput && postContentTextarea && forumPostsContainer) {
        async function loadPosts() {
            try {
                const response = await fetch(`${backendURL}/posts`);
                const posts = await response.json();
                forumPostsContainer.innerHTML = "";

                posts.forEach(post => {
                    const postCard = document.createElement("div");
                    postCard.className = "post-card";
                    postCard.innerHTML = `
                        <div class="post-header">
                            <h3 class="post-title">${post.title}</h3>
                            <span class="post-meta">Posted by ${post.anonymousId || "Anonymous"} on ${new Date(post.timestamp).toLocaleDateString()}</span>
                        </div>
                        <p class="post-content">${post.content}</p>
                        <div class="post-footer">
                            <span>${(post.replies || []).length} comments</span>
                        </div>
                    `;
                    forumPostsContainer.appendChild(postCard);
                });
            } catch (err) {
                console.error("Failed to load posts:", err);
            }
        }

        submitPostBtn.addEventListener('click', async () => {
            const title = postTitleInput.value.trim();
            const content = postContentTextarea.value.trim();
            const anonymousId = "Guest_" + Math.floor(Math.random() * 10000);

            if (!title || !content) {
                alert('Please enter both a title and content for your post.');
                return;
            }

            const newPost = { title, content, anonymousId };

            try {
                const res = await fetch(${backendURL}/posts, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(newPost),
                });

                if (!res.ok) throw new Error("Failed to submit post.");
                postTitleInput.value = '';
                postContentTextarea.value = '';
                loadPosts();
            } catch (err) {
                console.error("Error submitting post:", err);
                alert("Something went wrong while submitting your post.");
            }
        });

        loadPosts();
    }
    // --- PSS-10 Test Scoring Logic ---
    const pss10Form = document.getElementById('pss10-test-form');
    if (pss10Form) {
        pss10Form.addEventListener('submit', (e) => {
            e.preventDefault();

            let totalScore = 0;
            const questions = ['q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10'];
            let allAnswered = true;

            questions.forEach(qName => {
                const selectedOption = document.querySelector(input[name="${qName}"]:checked);
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

            const scoreDisplay = document.getElementById('score-display');
            const scoreInterpretation = document.getElementById('score-interpretation');
            const testResultsDiv = document.getElementById('test-results');

            scoreDisplay.textContent = totalScore;

            let interpretationText = '';
            if (totalScore <= 13) {
                interpretationText = 'Your stress level appears to be low.';
            } else if (totalScore <= 26) {
                interpretationText = 'Your stress level appears to be moderate. Consider exploring stress management techniques.';
            } else if (totalScore <= 40) {
                interpretationText = 'Your stress level appears to be high. It might be beneficial to seek professional support.';
            } else {
                interpretationText = 'Could not interpret score. Please ensure all answers are valid.';
            }

            scoreInterpretation.textContent = interpretationText;
            testResultsDiv.style.display = 'block';
            testResultsDiv.scrollIntoView({ behavior: 'smooth' });
        });
    }
});
