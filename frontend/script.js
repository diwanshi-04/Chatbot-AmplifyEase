const chatbotButton = document.getElementById("chatbot-button");
const chatbotContainer = document.getElementById("chatbot-container");
const closeBtn = document.getElementById("close-btn");
const messagesDiv = document.getElementById("chatbot-messages");
const optionsDiv = document.getElementById("chatbot-options");
const sendBtn = document.getElementById("send-btn");
const userInput = document.getElementById("user-input");
const themeToggle = document.getElementById("theme-toggle");

let isOpen = false;

/* Toggle chatbot open / close */
chatbotButton.onclick = () => {
  isOpen = !isOpen;
  chatbotContainer.classList.toggle("show");

  if (isOpen && messagesDiv.innerHTML === "") {
    botReply("Hi 👋 I'm AmplifyBot. How can I help you?");
    showOptions(["Pricing", "Product Info", "Contact Support"]);
  }
};

closeBtn.onclick = () => {
  chatbotContainer.classList.remove("show");
  isOpen = false;
};

/* Dark mode toggle */
themeToggle.onclick = () => {
  chatbotContainer.classList.toggle("dark");
  themeToggle.innerText = chatbotContainer.classList.contains("dark") ? "☀️" : "🌙";
};

/* Send message */
sendBtn.onclick = sendMessage;

function sendMessage() {
  const text = userInput.value.trim();
  if (!text) return;

  userMessage(text);
  userInput.value = "";
  handleConversation(text);
}

/* Handle conversation via backend */
function handleConversation(text) {
  typing(async () => {
    const reply = await sendToBackend(text);
    botReply(reply);
  });
}

/* Send message to Flask backend */
async function sendToBackend(message) {
  try {
    const response = await fetch("http://127.0.0.1:5000/chat", {
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
    return "⚠️ Server is not responding right now.";
  }
}

/* Show bot message */
function botReply(text) {
  const div = document.createElement("div");
  div.className = "bot-message";
  div.innerText = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* Show user message */
function userMessage(text) {
  const div = document.createElement("div");
  div.className = "user-message";
  div.innerText = text;
  messagesDiv.appendChild(div);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;
}

/* Show quick reply buttons */
function showOptions(options) {
  optionsDiv.innerHTML = "";
  options.forEach(option => {
    const btn = document.createElement("button");
    btn.innerText = option;
    btn.onclick = () => {
      userMessage(option);
      optionsDiv.innerHTML = "";
      handleConversation(option);
    };
    optionsDiv.appendChild(btn);
  });
}

/* Typing animation */
function typing(callback) {
  const typingDiv = document.createElement("div");
  typingDiv.className = "bot-message typing";
  typingDiv.innerText = "Typing...";
  messagesDiv.appendChild(typingDiv);
  messagesDiv.scrollTop = messagesDiv.scrollHeight;

  setTimeout(() => {
    messagesDiv.removeChild(typingDiv);
    callback();
  }, 800);
}
