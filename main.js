js
const form = document.getElementById('chat-form');
const input = document.getElementById('user-input');
const chatBox = document.getElementById('chat-box');

const API_KEY = "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";

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const userText = input.value.trim();
  if (!userText) return;

  addMessage('You', userText, 'user');
  input.value = '';
  chatBox.scrollTop = chatBox.scrollHeight;

  try {
    const response = await fetch("https://api.openai.com/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: userText }]
      })
    });

    const data = await response.json();
    const aiText = data.choices?.[0]?.message?.content || "Something went wrong.";
    addMessage('Humble AI', aiText, 'ai');
    chatBox.scrollTop = chatBox.scrollHeight;
  } catch (err) {
addMessage('Humble AI', 'Error: Failed to connect to API.', 'ai');
  );
  
function addMessage(sender, text, type) 
  const messageEl = document.createElement('div');
  messageEl.classList.add('message');
  messageEl.innerHTML = `<span class="{type}">sender:</span>{text}`;
  chatBox.appendChild(messageEl);
}