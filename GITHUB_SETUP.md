# Mentneo AI - GitHub Setup Instructions

## To Push to GitHub:

### 1. Create a new repository on GitHub
- Go to https://github.com/new
- Repository name: `mentneo-ai`
- Description: "AI-Powered Video Creation Platform"
- Choose Public or Private
- **Do NOT** initialize with README, .gitignore, or license
- Click "Create repository"

### 2. Add remote and push
```bash
cd "ai app"
git remote add origin https://github.com/YOUR_USERNAME/mentneo-ai.git
git branch -M main
git push -u origin main
```

Replace `YOUR_USERNAME` with your GitHub username.

### 3. Verify
Visit `https://github.com/YOUR_USERNAME/mentneo-ai` to see your repository

---

## Project Structure

```
mentneo-ai/
├── backend/              # Node.js/Express API
│   ├── server.js        # Main server
│   ├── routes/          # API routes
│   ├── models/          # Database models
│   ├── middleware/      # Auth middleware
│   ├── services/        # Chatbot service
│   └── package.json
├── frontend/            # React/Vite app
│   ├── src/
│   │   ├── pages/       # All page components
│   │   ├── components/  # Reusable components
│   │   ├── context/     # Auth context
│   │   └── App.jsx      # Main app
│   └── package.json
└── README.md
```

---

## Quick Start

### Backend
```bash
cd backend
npm install
npm run dev
# Runs on http://localhost:5001
```

### Frontend
```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

---

## Features

✅ **User Portal** - 11 pages (Login, Home, Create Request, Payment, Video Delivery, etc.)
✅ **Telecaller Portal** - 4 pages (Dashboard, Feedback, History)
✅ **Video Creator Portal** - 3 pages (Dashboard, History)
✅ **AI Chatbot** - Groq-powered chatbot on all authenticated pages
✅ **Authentication** - JWT-based auth with session persistence
✅ **Payment System** - 3 plans with multiple payment methods
✅ **Modern UI** - Dark theme with indigo/cyan gradients, glassmorphism effects
✅ **Mobile Responsive** - Works on all devices

---

## Login Credentials (Demo)

**User:**
- Phone: `9182146476`
- OTP: Any 6-digit number

**Telecaller:**
- Email: `telecaller@demo.com`
- Password: `demo123`

**Video Creator:**
- Email: `creator@demo.com`
- Password: `demo123`

---

## Environment Variables

Create `.env` files in both backend and frontend directories.

**Backend (.env):**
```
PORT=5001
GROQ_API_KEY=your_groq_api_key_here
```

**Frontend (.env):**
```
VITE_API_URL=http://localhost:5001
```

---

## Technologies Used

- **Frontend:** React, Vite, Tailwind CSS, Lucide Icons
- **Backend:** Node.js, Express, JWT
- **AI:** Groq API
- **Database:** MongoDB (optional for demo)
- **Deployment:** Ready for Vercel (frontend) & Heroku/Railway (backend)

---

## Support

For issues or questions, create an issue on GitHub.
