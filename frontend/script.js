const chatbotButton = document.getElementById("chatbot-button");
const chatbotContainer = document.getElementById("chatbot-container");
const closeBtn = document.getElementById("close-btn");
const messagesDiv = document.getElementById("chatbot-messages");
const optionsDiv = document.getElementById("chatbot-options");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");

let isOpen = false;
let chatHistory = [];

/* ================================
   UI TOGGLE CONTROLS
================================ */

chatbotButton.onclick = () => {
  toggleChatWindow();
};

closeBtn.onclick = () => {
  closeChatWindow();
};

themeToggle.onclick = () => {
  toggleTheme();
};

/* ================================
   INPUT HANDLING
================================ */

sendBtn.onclick = () => {
  processUserInput();
};

userInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    processUserInput();
  }
});

/* ================================
   CORE CHAT FUNCTIONS
================================ */

function processUserInput() {
  const text = userInput.value.trim();
  if (text === "") return;

  addUserMessage(text);
  saveMessage("user", text);
  userInput.value = "";

  handleConversation(text);
}

function handleConversation(text) {
  showTypingIndicator(async () => {
    const reply = await sendToBackend(text);
    addBotMessage(reply);
    saveMessage("bot", reply);
  });
}

/* ================================
   BACKEND COMMUNICATION
================================ */

async function sendToBackend(message) {
  try {
    const response = await fetch("https://chatbot-amplifyease.onrender.com", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ message: message })
    });

    const data = await response.json();
    return data.reply;
  } catch (error) {
    console.error("Backend error:", error);
    return "⚠️ Unable to connect to server. Please try again later.";
  }
}

/* ================================
   MESSAGE RENDERING
================================ */

function addBotMessage(text) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerText = formatWithTimestamp(text);
  messagesDiv.appendChild(div);
  scrollToBottom();
}

function addUserMessage(text) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.innerText = formatWithTimestamp(text);
  messagesDiv.appendChild(div);
  scrollToBottom();
}

function showTypingIndicator(callback) {
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-message typing";
  typingDiv.innerText = "Typing...";
  messagesDiv.appendChild(typingDiv);
  scrollToBottom();

  setTimeout(() => {
    messagesDiv.removeChild(typingDiv);
    callback();
  }, 900);
}

/* ================================
   UI UTILITIES
================================ */

function toggleChatWindow() {
  isOpen = !isOpen;
  chatbotContainer.classList.toggle("show");

  if (isOpen && messagesDiv.innerHTML === "") {
    addBotMessage("Hi 👋 I'm AmplifyBot. How can I help you?");
    showOptions(["Pricing", "Product Info", "Contact Support"]);
  }
}

function closeChatWindow() {
  chatbotContainer.classList.remove("show");
  isOpen = false;
}

function toggleTheme() {
  chatbotContainer.classList.toggle("dark");
  themeToggle.innerText = chatbotContainer.classList.contains("dark") ? "☀️" : "🌙";
}

function showOptions(options) {
  optionsDiv.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      addUserMessage(option);
      saveMessage("user", option);
      optionsDiv.innerHTML = "";
      handleConversation(option);
    };
    optionsDiv.appendChild(btn);
  });
}

function scrollToBottom() {
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* ================================
   DATA & HELPERS
================================ */

function saveMessage(sender, text) {
  const entry = {
    sender: sender,
    text: text,
    time: new Date().toLocaleTimeString()
  };
  chatHistory.push(entry);
}

function formatWithTimestamp(text) {
  const time = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  return `${text}\n🕒 ${time}`;
}

/* ================================
   EXTRA CONTROLS (OPTIONAL)
================================ */

function clearChat() {
  messagesDiv.innerHTML = "";
  chatHistory = [];
  addBotMessage("Chat cleared 🧹 How can I help you again?");
}

