
#  Chatbot Widget for AmplifyEase
## Live Demo

A modern and embeddable chatbot widget built using **HTML, CSS, JavaScript** (frontend) and **Python Flask REST API** (backend).  
The chatbot provides interactive responses, dark mode support, typing animation, and can be embedded into any website.

This project was created as part of the assignment for the **Software Development Internship at AmplifyEase**.

## ✨ Features

- 💬 Floating chatbot widget
- 🔁 Open / Close animation
- 🌙 Dark mode toggle
- ⌨️ Typing indicator
- 🔌 Flask REST API backend
- 🎨 Clean UI/UX
- 📦 Embeddable design
- ⚡ Frontend ↔ Backend communication

---
## 🛠️ Tech Stack

### Frontend
- HTML  
- CSS  
- JavaScript  

### Backend
- Python  
- Flask  
- Flask-CORS  





## Project Structure

```
Chatbot-AmplifyEase/
│
├── backend/
│ ├── app.py
│ └── requirements.txt
│
├── frontend/
│ ├── index.html
│ ├── style.css
│ └── script.js
│
└── README.md


```


```

## 🔄 Project Flow (How the chatbot works)
User opens website
│
▼
Clicks chatbot button
│
▼
User types message (Frontend - JavaScript)
│
▼
Frontend sends message using fetch()
│
▼
Flask Backend (/chat API)
│
▼
Backend processes message
│
▼
Backend sends JSON response
│
▼
Frontend displays bot reply



```

---

## 🚀 How to Run the Project Locally

### ✅ Step 1: Clone the repository

```bash
git clone https://github.com/diwanshi-04/Chatbot-AmplifyEase.git
cd Chatbot-AmplifyEase
```
# Step 2: Setup Backend (Flask)

Go to backend folder
```
cd backend
Install dependencies: pip install -r requirements.txt
Run the Flask server: python app.py
Backend will run at: http://127.0.0.1:5000


```
# Step 3: Setup Frontend
Open a new terminal window and go to frontend folder:
```
cd frontend
Run frontend server: python -m http.server 5500
Open browser and go to: http://127.0.0.1:5500/index.html


```
# Sample Messages to Try
```
hi
product
pricing
contact support
```

