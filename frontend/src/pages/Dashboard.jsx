import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { TrendingUp, Zap, CheckCircle } from 'lucide-react'
import BottomNav from '../components/BottomNav'
import StatusBadge from '../components/StatusBadge'

export default function Dashboard() {
  const navigate = useNavigate()
  const [requests] = useState([
    { id: 1, name: 'Tech Startup', status: 'completed', date: '2024-01-15', views: 2400 },
    { id: 2, name: 'Fashion Brand', status: 'processing', date: '2024-01-14', views: 1800 },
    { id: 3, name: 'Cafe Business', status: 'confirmed', date: '2024-01-13', views: 950 },
    { id: 4, name: 'Fitness Center', status: 'pending', date: '2024-01-12', views: 0 },
  ])

  const stats = [
    { label: 'Total Videos', value: '12', icon: Zap, color: 'from-purple-600 to-blue-600' },
    { label: 'Completed', value: '8', icon: CheckCircle, color: 'from-green-600 to-emerald-600' },
    { label: 'Total Views', value: '5.2K', icon: TrendingUp, color: 'from-orange-600 to-red-600' },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <h1 className="text-3xl font-black mb-6">Dashboard</h1>
        
        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => {
            const Icon = stat.icon
            return (
              <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-center shadow-lg`}>
                <Icon size={20} className="mx-auto mb-2 opacity-80" />
                <p className="text-2xl font-bold">{stat.value}</p>
                <p className="text-xs opacity-80 mt-1">{stat.label}</p>
              </div>
            )
          })}
        </div>
      </div>

      {/* Requests List */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">All Videos</h2>
        <div className="space-y-3">
          {requests.map((req) => (
            <div
              key={req.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition cursor-pointer"
              onClick={() => navigate(`/order/${req.id}`)}
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="font-semibold text-lg">{req.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{req.date}</p>
                </div>
                <StatusBadge status={req.status} />
              </div>
              
              {req.views > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-400">
                  <TrendingUp size={14} />
                  <span>{req.views.toLocaleString()} views</span>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
