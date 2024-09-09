// document.getElementById('chatDetail').innerHTML = "Hello ChatGPT!  Lorem ipsum dolor sit amet, consectetur adipisicing";

const chatInput = document.querySelector("#chat-input");
const sendBtn = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");

let userText = null;
const API_KEY =
  "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";

const createElement = (html, className) => {
  const chatDiv = document.createElement("div");
  chatDiv.classList.add = ("chat", className);
  chatDiv.innerHTML = html;
  return chatDiv;
};

const getChatResponse = async () => {
  const API_URL = "https://api.openai.com/v1/completions";
  const pElement = document.createElement('p');
  
  // Define the data and properties for the API request
  const requestOptions = {
    method: "POST",
    headers: {
      Authorization: `Bearer ${API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      engine: "text-davinci-003",
      prompt: `User: ${userText}\nChatBot:`,
      max_tokens: 2048,
      temperature: 0.2,
      stop: null,
      //
      // model: "gpt-3.5-turbo-instruct",
      // prompt: "Say this is a test",
      // max_tokens: 7,
      // temperature: 0,
    }),
  };

  // Send post request to API, get response and set the response as paragraph element text
  try {
    const response = await (await fetch(API_URL, requestOptions)).json();
    pElement.textContent = response.choices[0].text.trim();
    // if (!response.ok) {
    //   throw new Error(`HTTP error! status: ${response.status}`);
    // }
    // const data = await response.json();
    // const chatResponse = data.choices[0].text.trim();
    // const html = `
    //     <div class="chat-content">
    //       <div class="chat-details">
    //         <img src="images/chatbot.jpg" alt="user-img" />
    //         <p id="chatDetail">${chatResponse}</p>
    //       </div>
    //       <span class="material-icons">content_copy</span>
    //     </div>
    // `;
    // const incomingChatDiv = createElement(html, "incoming");
    // chatContainer.appendChild(incomingChatDiv);
    // showTypingAnimation();
  } catch (error) {
    console.log(error);
  }

  incomingChatDiv.querySelector('.typing-animation').remove();
  incomingChatDiv.querySelector('.chat-details').appendChild(pElement);
};

const showTypingAnimation = () => {
  const html = `
    <div class="chat-content">
          <div class="chat-details">
            <img src="images/chatbot.jpg" alt="user-img" />
            <div class="typing-animation">
              <span class="typing-dot" style="--delay: 0.2s"></span>
              <span class="typing-dot" style="--delay: 0.3s"></span>
              <span class="typing-dot" style="--delay: 0.4s"></span>
            </div>
          </div>
          <span class="material-icons">content_copy</span>
        </div>
`;

// Create an incoming chat div with typing animation and append it to chat container
  const incomingChatDiv = createElement(html, "incoming");
  chatContainer.appendChild(oincomingChatDiv);
  getChatResponse(incomingChatDiv);
};

const handleOutgoingChat = () => {
  userText = chatInput.value.text.trim();
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
