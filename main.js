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