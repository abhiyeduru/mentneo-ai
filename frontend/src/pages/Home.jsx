import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap, TrendingUp, Play, Clock, Sparkles } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import StatusBadge from '../components/StatusBadge'

export default function Home() {
  const navigate = useNavigate()
  const [requests] = useState([
    { id: 1, name: 'Tech Startup', status: 'completed', date: '2024-01-15', progress: 100 },
    { id: 2, name: 'Fashion Brand', status: 'processing', date: '2024-01-14', progress: 65 },
    { id: 3, name: 'Cafe Business', status: 'confirmed', date: '2024-01-13', progress: 30 },
  ])

  const startDemo = () => {
    navigate('/create')
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <p className="text-gray-400 text-sm mb-2">Welcome back 👋</p>
        <h1 className="text-3xl font-black mb-4">Create Your Next Video</h1>
        
        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400">Videos Created</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400">In Progress</p>
            <p className="text-2xl font-bold">2</p>
          </div>
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400">This Month</p>
            <p className="text-2xl font-bold">8</p>
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="p-6 space-y-4">
        <button
          onClick={startDemo}
          className="w-full bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-6 hover:shadow-lg hover:shadow-purple-500/50 transition group"
        >
          <div className="flex items-center justify-between">
            <div className="text-left">
              <h3 className="text-xl font-bold mb-1">Create New Video</h3>
              <p className="text-purple-200 text-sm">Start creating in seconds</p>
            </div>
            <div className="bg-white bg-opacity-20 p-3 rounded-xl group-hover:scale-110 transition">
              <Zap size={24} />
            </div>
          </div>
        </button>

        {/* Demo Flow Info */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800 rounded-xl p-4">
          <div className="flex items-start gap-3">
            <Sparkles size={20} className="text-purple-400 flex-shrink-0 mt-1" />
            <div className="text-sm">
              <p className="font-semibold text-purple-300 mb-1">Try the Full Demo Flow</p>
              <p className="text-purple-200 text-xs">Create → Call Confirmation → Payment → Processing → Video Delivery</p>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition cursor-pointer">
            <TrendingUp className="text-purple-500 mb-2" size={24} />
            <p className="text-xs text-gray-400">Avg Views</p>
            <p className="text-2xl font-bold">2.4K</p>
          </div>
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-blue-500 transition cursor-pointer">
            <Play className="text-blue-500 mb-2" size={24} />
            <p className="text-xs text-gray-400">Engagement</p>
            <p className="text-2xl font-bold">34%</p>
          </div>
        </div>
      </div>

      {/* Recent Videos */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Recent Videos</h2>
          <button onClick={() => navigate('/orders')} className="text-purple-400 text-sm hover:text-purple-300">
            View All
          </button>
        </div>

        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gray-900 border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition cursor-pointer"
              onClick={() => navigate(`/order/${req.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-semibold">{req.name}</h3>
                  <p className="text-xs text-gray-500 flex items-center gap-1 mt-1">
                    <Clock size={12} /> {req.date}
                  </p>
                </div>
                <StatusBadge status={req.status} />
              </div>
              <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all"
                  style={{ width: `${req.progress}%` }}
                ></div>
              </div>
              <p className="text-xs text-gray-400 mt-2">{req.progress}% complete</p>
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
