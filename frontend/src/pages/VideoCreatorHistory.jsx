import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Play, Download, Eye } from 'lucide-react'

export default function VideoCreatorHistory() {
  const navigate = useNavigate()
  const [uploadedVideos] = useState([
    {
      id: 1,
      business: 'Cafe Business',
      title: 'Cafe Promotional Video',
      description: 'Professional promotional video for cafe',
      uploadDate: '2024-01-13',
      uploadTime: '3:45 PM',
      duration: '2:45',
      size: '245MB',
      userId: 'user_003',
      status: 'delivered',
      views: 1240,
    },
    {
      id: 2,
      business: 'Restaurant Chain',
      title: 'Menu Showcase Video',
      description: 'Showcasing new menu items',
      uploadDate: '2024-01-12',
      uploadTime: '2:15 PM',
      duration: '3:20',
      size: '312MB',
      userId: 'user_004',
      status: 'delivered',
      views: 856,
    },
    {
      id: 3,
      business: 'Fitness Studio',
      title: 'Class Highlights',
      description: 'Fitness class highlights and testimonials',
      uploadDate: '2024-01-11',
      uploadTime: '1:30 PM',
      duration: '2:15',
      size: '198MB',
      userId: 'user_005',
      status: 'delivered',
      views: 2103,
    },
  ])

  const stats = {
    total: uploadedVideos.length,
    totalViews: uploadedVideos.reduce((sum, v) => sum + v.views, 0),
    avgViews: Math.round(uploadedVideos.reduce((sum, v) => sum + v.views, 0) / uploadedVideos.length),
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="flex items-center gap-4 mb-6">
          <button onClick={() => navigate('/video-creator')} className="p-2 hover:bg-gray-800 rounded-lg transition">
            <ChevronLeft size={24} />
          </button>
          <div className="flex-1">
            <h1 className="text-3xl font-black">Upload History</h1>
            <p className="text-gray-400">All uploaded videos</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-gray-800 rounded-xl p-3 border border-gray-700">
            <p className="text-xs text-gray-400">Total Videos</p>
            <p className="text-2xl font-bold">{stats.total}</p>
          </div>
          <div className="bg-purple-900/30 rounded-xl p-3 border border-purple-800">
            <p className="text-xs text-purple-400">Total Views</p>
            <p className="text-2xl font-bold">{stats.totalViews.toLocaleString()}</p>
          </div>
          <div className="bg-blue-900/30 rounded-xl p-3 border border-blue-800">
            <p className="text-xs text-blue-400">Avg Views</p>
            <p className="text-2xl font-bold">{stats.avgViews.toLocaleString()}</p>
          </div>
        </div>
      </div>

      {/* Videos List */}
      <div className="p-6 space-y-3">
        {uploadedVideos.map(video => (
          <div
            key={video.id}
            className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition"
          >
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1">
                <h3 className="text-lg font-bold">{video.title}</h3>
                <p className="text-sm text-gray-400 mt-1">{video.business}</p>
                <p className="text-sm text-gray-500 mt-1">{video.description}</p>
              </div>
              <div className="text-right">
                <div className="inline-flex items-center gap-1 px-3 py-1 bg-green-900/30 border border-green-800 rounded-lg text-xs font-bold text-green-300">
                  <Play size={12} />
                  Delivered
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3 text-sm">
              <div>
                <p className="text-gray-500 text-xs">Upload Date</p>
                <p className="font-semibold">{video.uploadDate}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">Duration</p>
                <p className="font-semibold">{video.duration}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">File Size</p>
                <p className="font-semibold">{video.size}</p>
              </div>
              <div>
                <p className="text-gray-500 text-xs">User ID</p>
                <p className="font-semibold text-purple-400">{video.userId}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-800">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm">
                  <Eye size={16} className="text-blue-400" />
                  <span className="font-semibold">{video.views.toLocaleString()} views</span>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-semibold flex items-center gap-1">
                  <Play size={14} />
                  Preview
                </button>
                <button className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg transition text-sm font-semibold flex items-center gap-1">
                  <Download size={14} />
                  Download
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary Card */}
      <div className="p-6">
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800 rounded-xl p-6">
          <h3 className="font-bold mb-4">Performance Summary</h3>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Total Videos Uploaded</span>
              <span className="font-bold">{stats.total}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Total Views</span>
              <span className="font-bold text-purple-400">{stats.totalViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Average Views per Video</span>
              <span className="font-bold text-blue-400">{stats.avgViews.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Engagement Rate</span>
              <span className="font-bold text-green-400">85%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
