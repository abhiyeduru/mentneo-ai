# Chatbot Quick Start

## ✅ What's Installed

- Groq SDK integrated in backend
- AI-powered chatbot component in frontend
- Chat API endpoint at `/api/chat/message`
- Chatbot appears on all authenticated pages

## 🚀 How to Use

### 1. Get Groq API Key (Free)
- Go to [console.groq.com](https://console.groq.com)
- Sign up (takes 2 minutes)
- Create API key in dashboard
- Copy the key

### 2. Add to Backend
- Open `backend/.env`
- Replace `GROQ_API_KEY=gsk_test_placeholder_key` with your actual key
- Backend will auto-reload

### 3. Test the Chatbot
- Open http://localhost:3000
- Login with: `9182146476` (any OTP)
- Click the chat bubble (bottom right)
- Ask a question!

## 💬 Example Questions

- "How do I create a video?"
- "What's the pricing?"
- "How long does it take?"
- "Can I download videos?"
- "How do I share to Instagram?"

## 🔧 Current Status

- ✅ Frontend chatbot UI ready
- ✅ Backend chat API ready
- ⏳ Needs Groq API key to work
- ✅ Graceful error handling if key missing

## 📝 Files Added

```
backend/
├── services/chatbot.js       # Groq integration
└── routes/chat.js            # Chat API endpoint

frontend/
└── src/components/Chatbot.jsx # Chat UI component
```

## 🎯 Next Steps

1. Get free Groq API key
2. Add to `.env`
3. Restart backend
4. Start chatting!

## ❓ FAQ

**Q: Is Groq free?**
A: Yes! Free tier includes 30 requests/minute.

**Q: What if I don't have API key?**
A: Chatbot will show error message. Get key from console.groq.com

**Q: Can I use different AI?**
A: Yes, modify `backend/services/chatbot.js` to use OpenAI, Claude, etc.

**Q: How many messages can I send?**
A: Unlimited with free Groq tier (rate limited to 30/min)
