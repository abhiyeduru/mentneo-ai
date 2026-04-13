# Chatbot Setup Guide

## Getting Groq API Key

The chatbot uses Groq's API for intelligent responses. Follow these steps:

### 1. Create Groq Account
- Visit [console.groq.com](https://console.groq.com)
- Sign up with your email or Google account
- Verify your email

### 2. Get API Key
- Go to API Keys section in your dashboard
- Click "Create API Key"
- Copy the API key

### 3. Add to Environment
- Open `backend/.env`
- Add your API key:
  ```
  GROQ_API_KEY=your_api_key_here
  ```

### 4. Restart Backend
```bash
# Stop the current backend process
# Then restart it
npm run dev
```

## Features

The chatbot can help with:
- How to create AI videos
- Pricing and plans
- Video delivery and downloads
- Account management
- Technical issues
- General FAQ

## Testing

1. Log in with phone: `9182146476`
2. Click the chat bubble (bottom right)
3. Ask any question about the platform

## Example Questions

- "How do I create a video?"
- "What are your pricing plans?"
- "How long does video creation take?"
- "Can I download my videos?"
- "How do I share videos to Instagram?"

## Troubleshooting

If the chatbot doesn't respond:
1. Check if `GROQ_API_KEY` is set in `.env`
2. Verify the API key is valid
3. Check backend logs for errors
4. Ensure backend is running on port 5001

## API Endpoint

- **POST** `/api/chat/message`
- **Body**: `{ "message": "your question" }`
- **Response**: `{ "response": "bot answer" }`
