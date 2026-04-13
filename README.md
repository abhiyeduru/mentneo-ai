# Mentneo AI Video - Full Stack Application

A modern SaaS platform for AI-powered video creation built with React, Tailwind CSS, Node.js, and MongoDB.

## 🎯 Project Structure

```
ai app/
├── frontend/          # React + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Screen components
│   │   ├── context/       # Auth context
│   │   ├── App.jsx
│   │   └── index.css
│   ├── package.json
│   ├── vite.config.js
│   └── tailwind.config.js
├── backend/           # Node.js + Express + MongoDB
│   ├── models/        # MongoDB schemas
│   ├── routes/        # API endpoints
│   ├── middleware/    # Auth middleware
│   ├── server.js
│   └── package.json
└── README.md
```

## 🚀 Quick Start

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend runs on `http://localhost:3000`

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
npm run dev
```

Backend runs on `http://localhost:5000`

## 📱 Features Implemented

### User Screens
1. **Login/Signup** - Phone + OTP verification
2. **Home** - Feature cards and recent requests
3. **Create Request** - Multi-step form for video requests
4. **Request Submitted** - Success confirmation
5. **Processing** - Animated progress tracking
6. **Video Delivery** - Download, share, post to Instagram
7. **Dashboard** - All requests with stats
8. **Profile** - User info and settings

### Design System
- **Colors**: Purple/Blue gradient primary
- **Components**: Cards, badges, buttons, inputs
- **Responsive**: Mobile-first design
- **Animations**: Smooth transitions and micro-interactions

## 🔧 Tech Stack

### Frontend
- React 18
- React Router v6
- Tailwind CSS
- Vite
- Lucide Icons
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- JWT Authentication
- CORS enabled

## 📡 API Endpoints

### Auth
- `POST /api/auth/login` - User login
- `POST /api/auth/verify-otp` - OTP verification

### Requests
- `GET /api/requests` - Get all user requests
- `POST /api/requests` - Create new request
- `GET /api/requests/:id` - Get request details
- `PATCH /api/requests/:id` - Update request

## 🎨 Design Features

- Dark + Light theme support ready
- Rounded cards with soft shadows
- Status badges (Pending, Confirmed, Processing, Completed)
- Bottom navigation bar
- Smooth card-based layout
- Premium startup SaaS aesthetic

## 📝 Environment Variables

### Backend (.env)
```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/mentneo-ai-video
JWT_SECRET=your_jwt_secret_key_here
NODE_ENV=development
```

## 🔐 Authentication

- Phone-based OTP login
- JWT token-based sessions
- Protected routes with middleware
- 7-day token expiration

## 📦 Database Models

### User
- phone (unique)
- email
- name
- createdAt

### Request
- userId (ref)
- businessName
- category
- goal
- location
- status
- images
- videoUrl
- timestamps

### TelecallerRequest
- requestId (ref)
- telecallerId (ref)
- status
- notes
- selectedPlan
- price
- callDuration

## 🚀 Next Steps

1. Connect frontend to backend APIs
2. Implement file upload for images/videos
3. Add payment integration (UPI, Card, Net Banking)
4. Build telecaller admin panel
5. Implement video processing queue
6. Add real-time notifications
7. Deploy to production

## 📄 License

MIT
