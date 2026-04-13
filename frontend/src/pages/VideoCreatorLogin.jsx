import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, Film } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function VideoCreatorLogin() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  const handleLogin = (e) => {
    e.preventDefault()
    if (email && password) {
      const userData = {
        token: 'videocreator-token-' + email,
        email: email,
        id: 'creator-' + email,
        role: 'video_creator'
      }
      login(userData)
      navigate('/video-creator')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg shadow-purple-500/50">
              <Film size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Video Creator
            </h1>
            <p className="text-gray-400 text-lg">Upload and manage videos</p>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            <h2 className="text-2xl font-bold mb-2">Creator Login</h2>
            <p className="text-gray-400 mb-8">Access your dashboard</p>

            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-300">Email Address</label>
                <input
                  type="email"
                  placeholder="creator@demo.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-3 text-gray-300">Password</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
              >
                Login <ArrowRight size={20} />
              </button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-8 pt-8 border-t border-gray-800">
              <p className="text-xs text-gray-500 mb-3">Demo Credentials:</p>
              <div className="bg-gray-800 rounded-lg p-3 space-y-2 text-xs">
                <p><span className="text-gray-400">Email:</span> <span className="text-purple-400 font-mono">creator@demo.com</span></p>
                <p><span className="text-gray-400">Password:</span> <span className="text-purple-400 font-mono">demo123</span></p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-8">
            <button
              onClick={() => navigate('/login')}
              className="text-purple-400 hover:text-purple-300 transition"
            >
              Back to User Login
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
