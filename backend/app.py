from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Backend is running!"

@app.route("/chat", methods=["GET", "POST"])
def chat():
    if request.method == "GET":
        return jsonify({"reply": "Chat API is working. Use POST request."})

    data = request.json
    user_message = data.get("message", "").lower()

    if "hi" in user_message or "hello" in user_message:
        reply = (
            "Hi there 👋 Welcome to AmplifyEase!\n"
            "How can I help you today?\n"
            "You can ask me about:\n"
            "👉 Pricing\n"
            "👉 Product\n"
        )

    elif "price" in user_message or "pricing" in user_message:
        reply = (
            "Great question! 💰\n"
            "Our plans start from just $9 per month.\n"
            "Would you like me to connect you with our support team?"
        )

    elif "product" in user_message:
        reply = (
            "Sure! 😊 Let me explain our product in simple words.\n\n"
            "AmplifyEase provides AI-powered customer engagement tools "
            "that help businesses chat with their users automatically 🤖.\n\n"
            "Would you like to know about pricing or talk to support?"
        )

    elif "contact" in user_message or "support" in user_message:
        reply = (
            "No problem 👍\n\n"
            "Please share your email address and a short message, "
            "and our support team will get back to you soon 📧."
        )

    elif "email" in user_message:
        reply = (
            "Thanks for sharing your email 😊\n"
            "Our team will reach out to you shortly.\n\n"
            "Is there anything else I can help you with today?"
        )

    else:
        reply = (
            "Thanks for your message! 😊\n"
            "I have shared your query with our team.\n\n"
        )

    return jsonify({"reply": reply})

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)
