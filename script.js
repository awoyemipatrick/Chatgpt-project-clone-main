// document.getElementById('chatDetail').innerHTML = "Hello ChatGPT!  Lorem ipsum dolor sit amet, consectetur adipisicing";

const chatInput = document.querySelector("#chat-input");
const sendBtn = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY = ''

const createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add = ("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = () => {
    const API_URL = 'https://api.openai.com/v1/completions';
    const requestOptions= {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${API_KEY}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            engine: 'davinci',
            prompt: `User: ${userText}\nChatBot:`,
            max_tokens: 2048,
            temperature: 0.7,
            stop: null,
            n: 1,
            // frequency_penalty: 0.0,
            // presence_penalty: 0.0,
        })
    }
}

const showTypingAnimation = () => {
  const html = `
    <div class="chat-content">
          <div class="chat-details">
            <img src="images/chatbot.jpg" alt="user-img" />
            <div class="typing-animation">
              <div class="typing-dot" style="--delay: 0.2s"></div>
              <div class="typing-dot" style="--delay: 0.3s"></div>
              <div class="typing-dot" style="--delay: 0.4s"></div>
            </div>
          </div>
          <span class="material-icons">content_copy</span>
        </div>
`;
  const outgoingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(outgoingChatDiv);
  getChatResponse();
};

const handleOutgoingChat = () => {
  userText = chatInput.value.trim();
  chatInput.value = "";
  const html = `
        <div class="chat-content">
          <div class="chat-details">
            <img src="images/user.jpg" alt="user-img" />
            <p id="chatDetail">
              ${userText}
            </p>
          </div>
        </div>
    `;
  const outgoingChatDiv = createElement(html, "outgoing");
  chatContainer.appendChild(outgoingChatDiv);
  setTimeout(showTypingAnimation, 500);
};

sendBtn.addEventListener("click", handleOutgoingChat);
