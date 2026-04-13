import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Phone, CheckCircle, Clock, Star, TrendingUp } from 'lucide-react'

export default function TelecallerHistory() {
  const navigate = useNavigate()
  const [filter, setFilter] = useState('all')

  const callHistory = [
    {
      id: 1,
      business: 'Tech Startup',
      phone: '+91 98765 43210',
      goal: 'Leads',
      status: 'confirmed',
      rating: 5,
      date: '2024-01-15',
      time: '2:30 PM',
      duration: '12 min',
      plan: 'Standard',
      amount: 2499,
      earnings: 375,
    },
    {
      id: 2,
      business: 'Fashion Brand',
      phone: '+91 87654 32109',
      goal: 'Awareness',
      status: 'confirmed',
      rating: 4,
      date: '2024-01-15',
      time: '1:45 PM',
      duration: '8 min',
      plan: 'Basic',
      amount: 999,
      earnings: 150,
    },
    {
      id: 3,
      business: 'Cafe Business',
      phone: '+91 76543 21098',
      goal: 'Offer',
      status: 'interested',
      rating: 3,
      date: '2024-01-14',
      time: '4:15 PM',
      duration: '15 min',
      plan: 'Premium',
      amount: 4999,
      earnings: 0,
    },
    {
      id: 4,
      business: 'Fitness Center',
      phone: '+91 65432 10987',
      goal: 'Leads',
      status: 'not_interested',
      rating: 2,
      date: '2024-01-14',
      time: '3:00 PM',
      duration: '5 min',
      plan: 'Basic',
      amount: 0,
      earnings: 0,
    },
  ]

  const filteredCalls = filter === 'all' ? callHistory : callHistory.filter(c => c.status === filter)

  const stats = {
    total: callHistory.length,
    confirmed: callHistory.filter(c => c.status === 'confirmed').length,
    totalEarnings: callHistory.reduce((sum, c) => sum + c.earnings, 0),
    avgRating: (callHistory.reduce((sum, c) => sum + c.rating, 0) / callHistory.length).toFixed(1),
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmed':
        return 'bg-green-900/30 text-green-300 border-green-800'
      case 'interested':
        return 'bg-yellow-900/30 text-yellow-300 border-yellow-800'
      case 'not_interested':
        return 'bg-red-900/30 text-red-300 border-red-800'
      default:
        return 'bg-gray-800 text-gray-300'
    }
  }

  const getStatusLabel = (status) => {
    switch (status) {
      case 'confirmed':
        return 'Confirmed'
      case 'interested':
        return 'Interested'
      case 'not_interested':
        return 'Not Interested'
      default:
        return status
    }
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/telecaller')} className="p-2 hover:bg-gray-800 rounded-lg transition">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-black">Call History</h1>
            <p className="text-gray-400">Your completed calls and earnings</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-3">
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400">Total Calls</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-green-900/30 rounded-xl p-3 border border-green-800">
            <p className="text-xs text-green-400">Confirmed</p>
            <p className="text-2xl font-bold">{stats.confirmed}</p>
          </div>
          <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-800">
            <p className="text-xs text-purple-400">Earnings</p>
            <p className="text-2xl font-bold">₹{stats.totalEarnings}</p>
          </div>
          <div className="bg-yellow-900/30 rounded-xl p-3 border border-yellow-800">
            <p className="text-xs text-yellow-400">Avg Rating</p>
            <p className="text-2xl font-bold">{stats.avgRating}⭐</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="p-6 border-b border-gray-800">
        <div className="flex gap-2 overflow-x-auto pb-2">
          {[
            { value: 'all', label: 'All Calls' },
            { value: 'confirmed', label: 'Confirmed' },
            { value: 'interested', label: 'Interested' },
            { value: 'not_interested', label: 'Not Interested' },
          ].map(f => (
            <button
              key={f.value}
              onClick={() => setFilter(f.value)}
              className={`px-4 py-2 rounded-lg whitespace-nowrap transition ${
                filter === f.value
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* Call List */}
      <div className="p-6 space-y-3">
        {filteredCalls.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400">No calls found</p>
          </div>
        ) : (
          filteredCalls.map(call => (
            <div
              key={call.id}
              className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition"
            >
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h3 className="text-lg font-bold">{call.business}</h3>
                  <p className="text-sm text-gray-400 mt-1">{call.phone}</p>
                </div>
                <div className={`px-3 py-1 rounded-lg text-xs font-bold border ${getStatusColor(call.status)}`}>
                  {getStatusLabel(call.status)}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
                <div>
                  <p className="text-gray-500 text-xs">Date & Time</p>
                  <p className="font-semibold">{call.date} {call.time}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Duration</p>
                  <p className="font-semibold">{call.duration}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Plan</p>
                  <p className="font-semibold">{call.plan}</p>
                </div>
                <div>
                  <p className="text-gray-500 text-xs">Rating</p>
                  <p className="font-semibold flex items-center gap-1">
                    {call.rating}
                    <Star size={14} className="text-yellow-400" fill="currentColor" />
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-800">
                <div className="text-sm">
                  <p className="text-gray-500 text-xs">Amount</p>
                  <p className="font-bold">₹{call.amount}</p>
                </div>
                <div className={`text-right ${call.earnings > 0 ? 'text-green-400' : 'text-gray-500'}`}>
                  <p className="text-xs">Your Earnings</p>
                  <p className="text-lg font-bold">₹{call.earnings}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Summary Card */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800 rounded-xl p-6">
          <h3 className="font-bold mb-4">Performance Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Conversion Rate</span>
              <span className="font-bold text-green-400">
                {Math.round((stats.confirmed / stats.total) * 100)}%
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Avg Call Duration</span>
              <span className="font-bold">10 min</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Earnings</span>
              <span className="font-bold text-purple-400">₹{stats.totalEarnings}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
