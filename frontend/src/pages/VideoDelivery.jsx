import React from 'react'
import { Download, Share2, Instagram, Copy, Check } from 'lucide-react'
import { useState } from 'react'
import BottomNav from '../components/BottomNav'

export default function VideoDelivery() {
  const [copied, setCopied] = useState(false)
  const [userVideos] = useState([
    {
      id: 1,
      title: 'Your AI Video',
      description: 'Professional AI-generated video for your business',
      duration: '2:45',
      resolution: '1080p',
      size: '245MB',
      uploadedBy: 'creator@demo.com',
      uploadDate: '2024-01-15',
      caption: 'Transform your business with AI-powered videos',
      hashtags: '#AIVideo #ContentCreation #MenteoAI',
      views: 1240,
    },
  ])

  const handleCopy = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Video Player */}
      <div className="bg-gray-900 aspect-video flex items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-600/20 to-blue-600/20"></div>
        <div className="text-center relative z-10">
          <div className="text-6xl mb-4">🎬</div>
          <p className="text-gray-300">Your Video is Ready!</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Video Info */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
          <h2 className="text-2xl font-bold mb-6">Video Details</h2>
          
          <div className="space-y-4">
            <div>
              <p className="text-sm text-gray-400 mb-2">Title</p>
              <p className="font-semibold text-lg">{userVideos[0].title}</p>
            </div>

            <div>
              <p className="text-sm text-gray-400 mb-2">Description</p>
              <p className="text-gray-300">{userVideos[0].description}</p>
            </div>
            
            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400 mb-2">Caption</p>
              <p className="font-semibold">{userVideos[0].caption}</p>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400 mb-2">Hashtags</p>
              <div className="flex flex-wrap gap-2">
                {userVideos[0].hashtags.split(' ').map((tag, idx) => (
                  <span key={idx} className="px-3 py-1 bg-gray-800 rounded-full text-sm text-purple-400">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400 mb-2">Video Stats</p>
              <div className="grid grid-cols-4 gap-3">
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Duration</p>
                  <p className="font-bold">{userVideos[0].duration}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Resolution</p>
                  <p className="font-bold">{userVideos[0].resolution}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Size</p>
                  <p className="font-bold">{userVideos[0].size}</p>
                </div>
                <div className="bg-gray-800 rounded-lg p-3 text-center">
                  <p className="text-xs text-gray-400">Views</p>
                  <p className="font-bold">{userVideos[0].views.toLocaleString()}</p>
                </div>
              </div>
            </div>

            <div className="border-t border-gray-800 pt-4">
              <p className="text-sm text-gray-400 mb-2">Creator Info</p>
              <div className="space-y-1 text-sm">
                <p><span className="text-gray-500">Uploaded by:</span> <span className="font-semibold">{userVideos[0].uploadedBy}</span></p>
                <p><span className="text-gray-500">Upload Date:</span> <span className="font-semibold">{userVideos[0].uploadDate}</span></p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3">
          <button className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2">
            <Download size={20} />
            Download Video
          </button>
          
          <button className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold flex items-center justify-center gap-2">
            <Share2 size={20} />
            Share Link
          </button>
          
          <button className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-pink-500/50 transition flex items-center justify-center gap-2">
            <Instagram size={20} />
            Post to Instagram
          </button>

          <button
            onClick={handleCopy}
            className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold flex items-center justify-center gap-2"
          >
            {copied ? (
              <>
                <Check size={20} className="text-green-400" />
                Copied!
              </>
            ) : (
              <>
                <Copy size={20} />
                Copy Caption
              </>
            )}
          </button>
        </div>
      </div>

      <BottomNav />
    </div>
  )
}
