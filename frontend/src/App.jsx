import React, { useContext } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, AuthContext } from './context/AuthContext'
import Chatbot from './components/Chatbot'
import Landing from './pages/Landing'
import Login from './pages/Login'
import TelecallerLogin from './pages/TelecallerLogin'
import VideoCreatorLogin from './pages/VideoCreatorLogin'
import Home from './pages/Home'
import CreateRequest from './pages/CreateRequest'
import RequestSubmitted from './pages/RequestSubmitted'
import CallConfirmation from './pages/CallConfirmation'
import Payment from './pages/Payment'
import Processing from './pages/Processing'
import VideoDelivery from './pages/VideoDelivery'
import Dashboard from './pages/Dashboard'
import Profile from './pages/Profile'
import TelecallerDashboard from './pages/TelecallerDashboard'
import TelecallerFeedback from './pages/TelecallerFeedback'
import TelecallerHistory from './pages/TelecallerHistory'
import VideoCreatorDashboard from './pages/VideoCreatorDashboard'
import VideoCreatorHistory from './pages/VideoCreatorHistory'

function ProtectedRoute({ children }) {
  const { user, loading } = useContext(AuthContext)

  if (loading) return <div className="flex items-center justify-center h-screen">Loading...</div>
  return user ? children : <Navigate to="/login" />
}

function AppRoutes() {
  const { user } = useContext(AuthContext)

  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/telecaller-login" element={<TelecallerLogin />} />
        <Route path="/video-creator-login" element={<VideoCreatorLogin />} />
        
        {/* User Routes */}
        <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/create" element={<ProtectedRoute><CreateRequest /></ProtectedRoute>} />
        <Route path="/request-submitted" element={<ProtectedRoute><RequestSubmitted /></ProtectedRoute>} />
        <Route path="/call-confirmation" element={<ProtectedRoute><CallConfirmation /></ProtectedRoute>} />
        <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
        <Route path="/processing" element={<ProtectedRoute><Processing /></ProtectedRoute>} />
        <Route path="/video-delivery" element={<ProtectedRoute><VideoDelivery /></ProtectedRoute>} />
        <Route path="/orders" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />

        {/* Telecaller Routes */}
        <Route path="/telecaller" element={<ProtectedRoute><TelecallerDashboard /></ProtectedRoute>} />
        <Route path="/telecaller/feedback/:requestId" element={<ProtectedRoute><TelecallerFeedback /></ProtectedRoute>} />
        <Route path="/telecaller/history" element={<ProtectedRoute><TelecallerHistory /></ProtectedRoute>} />

        {/* Video Creator Routes */}
        <Route path="/video-creator" element={<ProtectedRoute><VideoCreatorDashboard /></ProtectedRoute>} />
        <Route path="/video-creator/history" element={<ProtectedRoute><VideoCreatorHistory /></ProtectedRoute>} />
      </Routes>
      {user && <Chatbot />}
    </>
  )
}

export default function App() {
  return (
    <Router>
      <AuthProvider>
        <AppRoutes />
      </AuthProvider>
    </Router>
  )
}
