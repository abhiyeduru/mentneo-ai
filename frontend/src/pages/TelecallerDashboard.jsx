import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, X, CheckCircle, Clock, TrendingUp, LogOut } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function TelecallerDashboard() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)
  const [requests, setRequests] = useState([
    { id: 1, business: 'Tech Startup', goal: 'Leads', phone: '+91 98765 43210', status: 'pending', priority: 'high' },
    { id: 2, business: 'Fashion Brand', goal: 'Awareness', phone: '+91 87654 32109', status: 'pending', priority: 'medium' },
    { id: 3, business: 'Cafe Business', goal: 'Offer', phone: '+91 76543 21098', status: 'pending', priority: 'high' },
    { id: 4, business: 'Fitness Center', goal: 'Leads', phone: '+91 65432 10987', status: 'pending', priority: 'low' },
  ])

  const [selectedRequest, setSelectedRequest] = useState(null)
  const [showCallModal, setShowCallModal] = useState(false)

  const stats = [
    { label: 'Calls Today', value: '12', icon: '☎️', color: 'from-blue-600 to-cyan-600' },
    { label: 'Conversions', value: '8', icon: '✓', color: 'from-green-600 to-emerald-600' },
    { label: 'Earnings', value: '₹2,400', icon: '💰', color: 'from-purple-600 to-pink-600' },
  ]

  const handleAccept = (id) => {
    setSelectedRequest(requests.find(r => r.id === id))
    setShowCallModal(true)
  }

  const handleReject = (id) => {
    setRequests(requests.filter(r => r.id !== id))
  }

  const handleCompleteCall = () => {
    setShowCallModal(false)
    navigate(`/telecaller/feedback/${selectedRequest.id}`)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-black">Telecaller Dashboard</h1>
            <p className="text-gray-400">Manage incoming requests</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={() => navigate('/telecaller/history')}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-semibold"
            >
              Call History
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/telecaller-login')
              }}
              className="px-4 py-2 bg-red-900/30 hover:bg-red-900/50 border border-red-800 rounded-lg transition text-sm font-semibold text-red-400 flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          {stats.map((stat, idx) => (
            <div key={idx} className={`bg-gradient-to-br ${stat.color} rounded-xl p-4 text-center shadow-lg`}>
              <p className="text-2xl mb-1">{stat.icon}</p>
              <p className="text-2xl font-bold">{stat.value}</p>
              <p className="text-xs opacity-80 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Incoming Requests */}
      <div className="p-6">
        <h2 className="text-xl font-bold mb-4">Incoming Requests ({requests.length})</h2>

        {requests.length === 0 ? (
          <div className="bg-gray-900 border border-gray-800 rounded-xl p-12 text-center">
            <p className="text-gray-400 text-lg">No pending requests</p>
            <p className="text-gray-500 text-sm mt-2">All requests have been handled</p>
          </div>
        ) : (
          <div className="space-y-3">
            {requests.map((req) => (
              <div
                key={req.id}
                className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition"
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold">{req.business}</h3>
                    <p className="text-sm text-gray-400 mt-1">Goal: {req.goal}</p>
                    <p className="text-sm text-gray-400">Phone: {req.phone}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                    req.priority === 'high' ? 'bg-red-900/30 text-red-300 border border-red-800' :
                    req.priority === 'medium' ? 'bg-yellow-900/30 text-yellow-300 border border-yellow-800' :
                    'bg-blue-900/30 text-blue-300 border border-blue-800'
                  }`}>
                    {req.priority.toUpperCase()}
                  </div>
                </div>

                <div className="flex gap-2">
                  <button
                    onClick={() => handleAccept(req.id)}
                    className="flex-1 py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <Phone size={16} />
                    Accept Call
                  </button>
                  <button
                    onClick={() => handleReject(req.id)}
                    className="flex-1 py-2 border border-gray-700 rounded-lg hover:bg-gray-900 transition font-semibold flex items-center justify-center gap-2"
                  >
                    <X size={16} />
                    Reject
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Call Modal */}
      {showCallModal && selectedRequest && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl max-w-md w-full p-6 space-y-6">
            {/* Header */}
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-green-600 to-emerald-600 rounded-full mb-4 shadow-lg shadow-green-500/50">
                <Phone size={32} className="text-white" />
              </div>
              <h2 className="text-2xl font-bold">{selectedRequest.business}</h2>
              <p className="text-gray-400 mt-1">{selectedRequest.phone}</p>
            </div>

            {/* Call Info */}
            <div className="bg-gray-800 rounded-xl p-4 space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-400">Goal</span>
                <span className="font-semibold">{selectedRequest.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Priority</span>
                <span className="font-semibold capitalize text-yellow-400">{selectedRequest.priority}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Call Status</span>
                <span className="font-semibold text-green-400">Connected</span>
              </div>
            </div>

            {/* Notes Section */}
            <div>
              <label className="block text-sm font-semibold mb-2">Call Notes</label>
              <textarea
                placeholder="Add notes about the call..."
                className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent text-white placeholder-gray-500 resize-none h-24"
              />
            </div>

            {/* Plan Selection */}
            <div>
              <label className="block text-sm font-semibold mb-2">Recommended Plan</label>
              <div className="space-y-2">
                {['Basic', 'Standard', 'Premium'].map(plan => (
                  <label key={plan} className="flex items-center gap-3 p-3 border border-gray-700 rounded-lg hover:bg-gray-800 cursor-pointer transition">
                    <input type="radio" name="plan" value={plan} defaultChecked={plan === 'Standard'} className="w-4 h-4" />
                    <span className="font-semibold">{plan}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <button
                onClick={() => setShowCallModal(false)}
                className="flex-1 py-3 border border-gray-700 rounded-lg hover:bg-gray-900 transition font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleCompleteCall}
                className="flex-1 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg hover:shadow-lg hover:shadow-green-500/50 transition font-semibold"
              >
                Complete Call
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
