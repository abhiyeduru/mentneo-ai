import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { CheckCircle, ArrowRight, Clock } from 'lucide-react'
import StatusBadge from '../components/StatusBadge'

export default function RequestSubmitted() {
  const navigate = useNavigate()
  const [animate, setAnimate] = useState(false)
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    setAnimate(true)
    
    // Auto-redirect after 5 seconds
    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          navigate('/call-confirmation')
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [navigate])

  return (
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
      <div className="w-full max-w-md text-center">
        {/* Animated Checkmark */}
        <div className={`mb-8 transition-all duration-700 ${animate ? 'scale-100 opacity-100' : 'scale-0 opacity-0'}`}>
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/50">
            <CheckCircle size={48} className="text-white" />
          </div>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-black mb-3 bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
          Request Submitted! 🎉
        </h1>
        <p className="text-gray-400 mb-8 text-lg">Our team will review and call you shortly</p>

        {/* Status Card */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6 mb-8 space-y-4">
          <div>
            <p className="text-sm text-gray-400 mb-2">Current Status</p>
            <StatusBadge status="pending" />
          </div>
          <div className="text-left space-y-3 text-sm border-t border-gray-800 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Request ID</span>
              <span className="font-semibold text-purple-400">#REQ123456</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Expected Call</span>
              <span className="font-semibold">Within 2 hours</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Video Ready</span>
              <span className="font-semibold">3-4 hours</span>
            </div>
          </div>
        </div>

        {/* Auto-redirect Info */}
        <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4 mb-8 flex items-center gap-3">
          <Clock size={20} className="text-blue-400 flex-shrink-0" />
          <div className="text-left">
            <p className="text-sm text-blue-300">Redirecting in <span className="font-bold">{countdown}s</span></p>
            <p className="text-xs text-blue-400">to call confirmation</p>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={() => navigate('/call-confirmation')}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
          >
            Go to Call Confirmation <ArrowRight size={20} />
          </button>
          <button
            onClick={() => navigate('/home')}
            className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
