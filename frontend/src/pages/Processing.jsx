import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Zap } from 'lucide-react'

export default function Processing() {
  const navigate = useNavigate()
  const [progress, setProgress] = useState(0)
  const steps = ['Script Generation', 'Video Editing', 'Finalizing']

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          // Auto-redirect to video delivery after completion
          setTimeout(() => navigate('/video-delivery'), 1500)
          return 100
        }
        return prev + 1.5
      })
    }, 300)
    return () => clearInterval(interval)
  }, [navigate])

  const currentStep = Math.floor((progress / 100) * steps.length)

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Animated Loader */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full shadow-lg shadow-purple-500/50 animate-pulse">
            <Zap size={48} className="text-white" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
          Creating Your Video ⏳
        </h1>
        <p className="text-gray-400 mb-8">Expected time: 3–4 hours</p>

        {/* Progress Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-8 mb-8">
          {/* Progress Bar */}
          <div className="mb-6">
            <div className="h-3 bg-gray-800 rounded-full overflow-hidden mb-3">
              <div
                className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
            <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              {Math.round(progress)}%
            </p>
          </div>

          {/* Steps */}
          <div className="space-y-4 text-left">
            {steps.map((step, idx) => (
              <div key={idx} className="flex items-center gap-4">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 transition ${
                  idx < currentStep ? 'bg-green-500 text-white' :
                  idx === currentStep ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white animate-pulse' :
                  'bg-gray-800 text-gray-500'
                }`}>
                  {idx < currentStep ? '✓' : idx + 1}
                </div>
                <div className="flex-1">
                  <p className={`font-semibold transition ${idx <= currentStep ? 'text-white' : 'text-gray-500'}`}>
                    {step}
                  </p>
                  {idx === currentStep && (
                    <p className="text-xs text-purple-400 mt-1">In progress...</p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {progress === 100 && (
          <div className="bg-green-900/20 border border-green-800 rounded-xl p-4 mb-8">
            <p className="text-green-300 font-semibold">✓ Video is ready!</p>
            <p className="text-sm text-green-400">Redirecting to delivery...</p>
          </div>
        )}

        <p className="text-gray-400 text-sm">
          💬 You'll get a notification when your video is ready
        </p>
      </div>
    </div>
  )
}
