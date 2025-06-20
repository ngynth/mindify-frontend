//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

document.addEventListener('DOMContentLoaded', () => {
  const backendURL = "https://mindify-backend-06la.onrender.com";

  // --- Chatbot ---
  const chatInput = document.getElementById('chat-input');
  const sendMessageBtn = document.getElementById('send-message-btn');
  const chatMessages = document.getElementById('chat-messages');

if (chatInput && sendMessageBtn && chatMessages) {
  sendMessageBtn.addEventListener('click', () => {
    const messageText = chatInput.value.trim();
    if (messageText) {
      const userMsgDiv = document.createElement('div');
      userMsgDiv.classList.add('message', 'user-message');
      userMsgDiv.textContent = messageText;
      chatMessages.appendChild(userMsgDiv);
      chatInput.value = '';

      // Replaced static bot message with real backend call
      fetch(`${backendURL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: messageText })
      })
        .then(res => res.json())
        .then(data => {
          const botMsgDiv = document.createElement('div');
          botMsgDiv.classList.add('message', 'bot-message');
          botMsgDiv.textContent = data.reply || "Sorry, I didn't get a response.";
          chatMessages.appendChild(botMsgDiv);
          chatMessages.scrollTop = chatMessages.scrollHeight;
        })
        .catch(err => {
          console.error("Chat error:", err);
          const errorDiv = document.createElement('div');
          errorDiv.classList.add('message', 'bot-message');
          errorDiv.textContent = "There was an error getting a response.";
          chatMessages.appendChild(errorDiv);
        });
    }
  });

  chatInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') sendMessageBtn.click();
  });
}

  // --- Forum post submission ---
  const postTitleInput = document.getElementById('post-title');
  const postContentTextarea = document.getElementById('post-content');
  const submitPostBtn = document.getElementById('submit-post-btn');
  const forumPostsContainer = document.getElementById('forum-posts');

  if (postTitleInput && postContentTextarea && submitPostBtn && forumPostsContainer) {
    async function loadPosts() {
      try {
        const res = await fetch(`${backendURL}/posts`);
        const posts = await res.json();
        forumPostsContainer.innerHTML = '';

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
      if (!title || !content) {
        alert('Please enter both a title and content.');
        return;
      }

      try {
        const res = await fetch(`${backendURL}/posts`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ title, content })
        });

        if (!res.ok) throw new Error("Post failed.");
        postTitleInput.value = '';
        postContentTextarea.value = '';
        loadPosts();
      } catch (err) {
        console.error("Submit error:", err);
        alert("Could not submit post.");
      }
    });

    loadPosts();
  }

  // --- PSS-10 Scoring ---
  const pss10Form = document.getElementById('pss10-test-form');
  if (pss10Form) {
    pss10Form.addEventListener('submit', (e) => {
      e.preventDefault();
      const questions = ['q1','q2','q3','q4','q5','q6','q7','q8','q9','q10'];
      let totalScore = 0;
      let allAnswered = true;

      questions.forEach(qName => {
        const selected = document.querySelector(`input[name="${qName}"]:checked`);
        if (selected) totalScore += parseInt(selected.value);
        else allAnswered = false;
      });

      if (!allAnswered) {
        alert("Please answer all questions.");
        return;
      }

      const scoreDisplay = document.getElementById('score-display');
      const scoreInterpretation = document.getElementById('score-interpretation');
      const testResultsDiv = document.getElementById('test-results');

      scoreDisplay.textContent = totalScore;

      let result = '';
      if (totalScore <= 13) result = 'Your stress level appears to be low.';
      else if (totalScore <= 26) result = 'Your stress level appears to be moderate.';
      else result = 'Your stress level appears to be high. Consider professional help.';

      scoreInterpretation.textContent = result;
      testResultsDiv.style.display = 'block';
      testResultsDiv.scrollIntoView({ behavior: 'smooth' });
    });
  }
});
