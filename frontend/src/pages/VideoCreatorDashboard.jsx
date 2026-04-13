import React, { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, CheckCircle, Lock, LogOut, Film, Zap } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function VideoCreatorDashboard() {
  const navigate = useNavigate()
  const { logout, user } = useContext(AuthContext)
  const [confirmedCalls, setConfirmedCalls] = useState([
    {
      id: 1,
      business: 'Tech Startup',
      phone: '+91 98765 43210',
      goal: 'Leads',
      plan: 'Standard',
      amount: 2499,
      status: 'pending_video',
      date: '2024-01-15',
      userId: 'user_001',
      takenBy: null,
    },
    {
      id: 2,
      business: 'Fashion Brand',
      phone: '+91 87654 32109',
      goal: 'Awareness',
      plan: 'Basic',
      amount: 999,
      status: 'pending_video',
      date: '2024-01-14',
      userId: 'user_002',
      takenBy: null,
    },
    {
      id: 3,
      business: 'Cafe Business',
      phone: '+91 76543 21098',
      goal: 'Offer',
      plan: 'Premium',
      amount: 4999,
      status: 'video_uploaded',
      date: '2024-01-13',
      userId: 'user_003',
      takenBy: 'creator@demo.com',
    },
  ])

  const [selectedCall, setSelectedCall] = useState(null)
  const [showUploadModal, setShowUploadModal] = useState(false)
  const [videoFile, setVideoFile] = useState(null)
  const [videoTitle, setVideoTitle] = useState('')
  const [videoDescription, setVideoDescription] = useState('')

  const stats = {
    total: confirmedCalls.length,
    pending: confirmedCalls.filter(c => c.status === 'pending_video' && !c.takenBy).length,
    taken: confirmedCalls.filter(c => c.takenBy).length,
    completed: confirmedCalls.filter(c => c.status === 'video_uploaded').length,
  }

  const handleUploadClick = (call) => {
    setSelectedCall(call)
    setShowUploadModal(true)
  }

  const handleTakeVideo = (call) => {
    // Mark video as taken by current creator
    setConfirmedCalls(confirmedCalls.map(c =>
      c.id === call.id
        ? { ...c, takenBy: user?.email || 'creator@demo.com' }
        : c
    ))
  }

  const handleReleaseVideo = (call) => {
    // Release the video so other creators can take it
    setConfirmedCalls(confirmedCalls.map(c =>
      c.id === call.id
        ? { ...c, takenBy: null }
        : c
    ))
  }

  const handleVideoUpload = (e) => {
    e.preventDefault()
    if (videoFile && videoTitle) {
      // Update the call status
      setConfirmedCalls(confirmedCalls.map(c =>
        c.id === selectedCall.id
          ? { ...c, status: 'video_uploaded', videoTitle, videoDescription }
          : c
      ))
      setShowUploadModal(false)
      setVideoFile(null)
      setVideoTitle('')
      setVideoDescription('')
      setSelectedCall(null)
    }
  }

  const getStatusColor = (status, takenBy) => {
    if (takenBy) {
      return 'bg-blue-900/30 text-blue-300 border-blue-800'
    }
    return status === 'pending_video'
      ? 'bg-yellow-900/30 text-yellow-300 border-yellow-800'
      : 'bg-green-900/30 text-green-300 border-green-800'
  }

  const getStatusLabel = (status, takenBy) => {
    if (takenBy) {
      return `Taken by ${takenBy}`
    }
    return status === 'pending_video' ? 'Pending Video' : 'Video Uploaded'
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 backdrop-blur-xl bg-black/40 border-b border-gray-800/50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-gradient-to-br from-purple-600 to-blue-600 rounded-lg">
              <Film size={24} className="text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-black">Video Creator</h1>
              <p className="text-xs text-gray-400">Upload & Manage Videos</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate('/video-creator/history')}
              className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-white transition"
            >
              History
            </button>
            <button
              onClick={() => {
                logout()
                navigate('/video-creator-login')
              }}
              className="px-4 py-2 text-sm font-semibold text-red-400 hover:text-red-300 transition flex items-center gap-2"
            >
              <LogOut size={16} />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 border border-gray-700 rounded-2xl p-6 hover:border-gray-600 transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-gray-400 font-medium">Total Calls</p>
              <Zap size={20} className="text-purple-500" />
            </div>
            <p className="text-3xl font-black">{stats.total}</p>
          </div>

          <div className="bg-gradient-to-br from-yellow-900/20 to-yellow-900/10 border border-yellow-800/50 rounded-2xl p-6 hover:border-yellow-700 transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-yellow-400 font-medium">Available</p>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            </div>
            <p className="text-3xl font-black text-yellow-300">{stats.pending}</p>
          </div>

          <div className="bg-gradient-to-br from-blue-900/20 to-blue-900/10 border border-blue-800/50 rounded-2xl p-6 hover:border-blue-700 transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-blue-400 font-medium">Taken</p>
              <Lock size={20} className="text-blue-500" />
            </div>
            <p className="text-3xl font-black text-blue-300">{stats.taken}</p>
          </div>

          <div className="bg-gradient-to-br from-green-900/20 to-green-900/10 border border-green-800/50 rounded-2xl p-6 hover:border-green-700 transition">
            <div className="flex items-center justify-between mb-3">
              <p className="text-sm text-green-400 font-medium">Completed</p>
              <CheckCircle size={20} className="text-green-500" />
            </div>
            <p className="text-3xl font-black text-green-300">{stats.completed}</p>
          </div>
        </div>

        {/* Calls Section */}
        <div>
          <div className="mb-6">
            <h2 className="text-2xl font-black mb-2">Available Videos</h2>
            <p className="text-gray-400 text-sm">Click "Mark as Taken" to claim a video</p>
          </div>

          {confirmedCalls.length === 0 ? (
            <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-12 text-center">
              <Film size={48} className="mx-auto text-gray-700 mb-4" />
              <p className="text-gray-400 text-lg font-semibold">No videos available</p>
              <p className="text-gray-500 text-sm mt-2">Check back soon for new requests</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {confirmedCalls.map((call) => (
                <div
                  key={call.id}
                  className={`group relative rounded-2xl border transition-all duration-300 overflow-hidden ${
                    call.takenBy
                      ? 'bg-gray-900/50 border-gray-800 opacity-60'
                      : 'bg-gradient-to-br from-gray-800 to-gray-900 border-gray-700 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-500/10'
                  }`}
                >
                  {/* Card Content */}
                  <div className="p-6">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <h3 className="text-lg font-bold mb-1">{call.business}</h3>
                        <p className="text-xs text-gray-400">{call.phone}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-xs font-bold ${
                        call.takenBy
                          ? 'bg-blue-900/30 text-blue-300 border border-blue-800'
                          : call.status === 'video_uploaded'
                          ? 'bg-green-900/30 text-green-300 border border-green-800'
                          : 'bg-yellow-900/30 text-yellow-300 border border-yellow-800'
                      }`}>
                        {call.takenBy ? '🔒 Taken' : call.status === 'video_uploaded' ? '✓ Done' : '⏳ Open'}
                      </div>
                    </div>

                    {/* Details */}
                    <div className="space-y-2 mb-4 pb-4 border-b border-gray-700">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Goal</span>
                        <span className="font-semibold text-white">{call.goal}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Plan</span>
                        <span className="font-semibold text-purple-400">{call.plan}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">Amount</span>
                        <span className="font-semibold text-green-400">₹{call.amount}</span>
                      </div>
                    </div>

                    {/* User ID */}
                    <div className="mb-4 p-3 bg-gray-900/50 rounded-lg border border-gray-700">
                      <p className="text-xs text-gray-400 mb-1">User ID</p>
                      <p className="text-sm font-mono text-purple-400">{call.userId}</p>
                    </div>

                    {/* Actions */}
                    {call.status === 'pending_video' ? (
                      <div className="space-y-2">
                        {!call.takenBy ? (
                          <button
                            onClick={() => handleTakeVideo(call)}
                            className="w-full py-3 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/30 flex items-center justify-center gap-2"
                          >
                            ✓ Mark as Taken
                          </button>
                        ) : call.takenBy === (user?.email || 'creator@demo.com') ? (
                          <div className="space-y-2">
                            <button
                              onClick={() => handleUploadClick(call)}
                              className="w-full py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-lg font-semibold transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 flex items-center justify-center gap-2"
                            >
                              <Upload size={16} />
                              Upload Video
                            </button>
                            <button
                              onClick={() => handleReleaseVideo(call)}
                              className="w-full py-2 border border-gray-700 hover:border-gray-600 rounded-lg font-semibold text-gray-300 hover:text-white transition"
                            >
                              Release
                            </button>
                          </div>
                        ) : (
                          <div className="w-full py-3 bg-gray-800/50 border border-gray-700 rounded-lg font-semibold flex items-center justify-center gap-2 text-gray-500 cursor-not-allowed">
                            🔒 Taken by {call.takenBy.split('@')[0]}
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="w-full py-3 bg-green-900/30 border border-green-800 rounded-lg font-semibold flex items-center justify-center gap-2 text-green-300">
                        <CheckCircle size={16} />
                        Video Uploaded
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Upload Modal */}
      {showUploadModal && selectedCall && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl max-w-md w-full p-8 space-y-6 shadow-2xl">
            {/* Header */}
            <div>
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-600 to-blue-600 rounded-xl mb-4">
                <Upload size={24} className="text-white" />
              </div>
              <h2 className="text-2xl font-black">{selectedCall.business}</h2>
              <p className="text-gray-400 mt-2">Upload video for this request</p>
            </div>

            {/* Call Info */}
            <div className="bg-gray-800/50 border border-gray-700 rounded-2xl p-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-gray-400">Goal</span>
                <span className="font-semibold">{selectedCall.goal}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Plan</span>
                <span className="font-semibold text-purple-400">{selectedCall.plan}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">User ID</span>
                <span className="font-mono text-blue-400 text-xs">{selectedCall.userId}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleVideoUpload} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold mb-2">Video Title</label>
                <input
                  type="text"
                  placeholder="Enter video title"
                  value={videoTitle}
                  onChange={(e) => setVideoTitle(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Description</label>
                <textarea
                  placeholder="Video description..."
                  value={videoDescription}
                  onChange={(e) => setVideoDescription(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none h-20 transition"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2">Video File</label>
                <div className="border-2 border-dashed border-gray-700 rounded-xl p-6 text-center cursor-pointer hover:border-purple-500 hover:bg-purple-500/5 transition">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={(e) => setVideoFile(e.target.files?.[0])}
                    className="hidden"
                    id="video-input"
                    required
                  />
                  <label htmlFor="video-input" className="cursor-pointer block">
                    <Upload className="mx-auto mb-2 text-gray-400" size={32} />
                    <p className="font-semibold text-sm">{videoFile ? videoFile.name : 'Click to upload'}</p>
                    <p className="text-xs text-gray-500 mt-1">MP4, WebM, or MOV</p>
                  </label>
                </div>
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowUploadModal(false)}
                  className="flex-1 py-3 border border-gray-700 hover:border-gray-600 rounded-xl font-semibold transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={!videoFile || !videoTitle}
                  className="flex-1 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30"
                >
                  Upload Video
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  )
}
