const chatInput = document.querySelector("#chat-input");
const sendButton = document.querySelector("#send-btn");
const chatContainer = document.querySelector(".chat-container");
const themeButton = document.querySelector("#theme-btn");
const deleteButton = document.querySelector("#delete-btn");

let userText = null;
const API_KEY = "sk-Eyee-fmTI0BdAxbxSrDZHQQfcuXd969LJ1rjMhc-ibT3BlbkFJNIDTBUgnNIJ7SqtcSMVMlwCKmLPMjSoF0YRcV3abkA"; // this is a key

const initialHeight = chatInput.scrollHeight;

const loadDataFromLocalstorage = () => {
    const themecolor = localStorage.getItem("light-theme");

    document.body.classList.toggle("light-mode", themecolor === "light_mode");
    themeButton.innerText = document.body.classList.contains("light-mode") ? "dark_mode" : "light_mode";

    const defaultText = `<div class="default-text">
                            <h1> CHAT GPT PROJECT</h1>
                            <p>Start a conversation and explore the power of A.I <br> your chat history will display as you chat </p>
                        </div>`

    chatContainer.innerHTML = localStorage.getItem("all-chats") || defaultText ;
    chatContainer.scrollTo(0, chatContainer.scrollHeight);

}

loadDataFromLocalstorage();

const createElement = (html, className) => {
    const chatDiv = document.createElement("div");
    chatDiv.classList.add("chat", className);
    chatDiv.innerHTML = html;
    return chatDiv // return the created chat div
}

// Function to get chat response
const getChatResponse = async (incomingChatDiv) => {
    const API_URL = "https://api.openai.com/v1/chat/completions";
    const pElement = document.createElement("p");
    // Define the properties and data for the API request
    const requestOptions = {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Authorization": Bearer ${API_KEY}
        },
        body: JSON.stringify({
            model: "gpt-4o-mini",
            prompt: userText,
            max_tokens: 2048,
            temperature: 0.2,
            n: 1,
            stop: null
        })
    }

 // Send POST request to API, get response and set the reponse as paragraph element text
    try {
        const response = await (await fetch(API_URL, requestOptions)).json();
        pElement.textContent = response.choices[0].text.trim();
    } catch (error) { // Add error class to the paragraph element and set error text
        pElement.classList.add("error");
        pElement.textContent = "Oops! Something went wrong while retrieving the response. Please try again.";
    }
// Remove the typing animation, append the paragraph element and save the chats to local storage
    incomingChatDiv.querySelector(".typing-animation").remove();
    incomingChatDiv.querySelector(".chat-details").appendChild(pElement);
    localStorage.setItem("all-chats", chatContainer.innerHTML);
    chatContainer.scrollTo(0, chatContainer.scrollHeight);
}


