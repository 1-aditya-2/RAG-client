# Frontend - RAG Chatbot

This is the **frontend** of the RAG Chatbot project, built with **React + Vite + SCSS**.

---

## 🚀 Features
- Chat interface with conversation history
- Connects to backend API for responses
- Minimal clean UI
- Local session management

---

## 📦 Tech Stack
- **React 18**
- **Vite**
- **SCSS**
- **Axios** (for API calls)

---

## 🔧 Setup Instructions

1. Clone the repo:
   ```bash
   git clone <your-repo-url>
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create `.env` file in the frontend directory:
   ```env
   VITE_API_URL=http://localhost:5000
   ```

4. Run development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

---

## 📂 Project Structure
```
frontend/
 ├── src/
 │   ├── App.jsx
 │   ├── components/
 │   └── styles/
 ├── public/
 └── vite.config.js
```

---

## 🌐 API Connection
Make sure the backend is running at the same time.  
The API base URL is set in `.env` as `VITE_API_URL`.
