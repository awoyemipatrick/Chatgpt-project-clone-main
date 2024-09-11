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
