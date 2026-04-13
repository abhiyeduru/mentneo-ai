import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { ChevronLeft, CheckCircle, Star } from 'lucide-react'

export default function TelecallerFeedback() {
  const navigate = useNavigate()
  const { requestId } = useParams()
  const [rating, setRating] = useState(5)
  const [feedback, setFeedback] = useState('')
  const [confirmed, setConfirmed] = useState(false)

  const requestData = {
    business: 'Tech Startup',
    phone: '+91 98765 43210',
    goal: 'Leads',
    plan: 'Standard',
    price: 2499,
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setConfirmed(true)
    setTimeout(() => {
      navigate('/telecaller')
    }, 2000)
  }

  if (confirmed) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center p-4">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full shadow-lg shadow-green-500/50 mb-6">
            <CheckCircle size={48} className="text-white" />
          </div>
          <h1 className="text-3xl font-black mb-2">Confirmed! ✅</h1>
          <p className="text-gray-400 mb-4">Call details saved successfully</p>
          <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-xl">Call Feedback</h1>
          <p className="text-sm text-gray-400">Save call details and confirm plan</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Request Summary */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Request Summary</h2>
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-gray-400">Business</span>
              <span className="font-semibold">{requestData.business}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Phone</span>
              <span className="font-semibold">{requestData.phone}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Goal</span>
              <span className="font-semibold">{requestData.goal}</span>
            </div>
            <div className="border-t border-gray-700 pt-3 flex justify-between">
              <span className="text-gray-400">Selected Plan</span>
              <span className="font-semibold text-purple-400">{requestData.plan}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Amount</span>
              <span className="font-bold text-lg">₹{requestData.price}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div>
          <label className="block text-sm font-semibold mb-3">Call Quality Rating</label>
          <div className="flex gap-2 justify-center">
            {[1, 2, 3, 4, 5].map(star => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className={`p-3 rounded-lg transition ${
                  star <= rating
                    ? 'bg-yellow-500 text-white shadow-lg shadow-yellow-500/50'
                    : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                }`}
              >
                <Star size={24} fill={star <= rating ? 'currentColor' : 'none'} />
              </button>
            ))}
          </div>
          <p className="text-center text-sm text-gray-400 mt-2">{rating}/5 Stars</p>
        </div>

        {/* Feedback */}
        <div>
          <label className="block text-sm font-semibold mb-3">Detailed Feedback</label>
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="Share your feedback about the call, customer response, and any notes..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 resize-none h-32"
          />
        </div>

        {/* Call Checklist */}
        <div>
          <label className="block text-sm font-semibold mb-3">Call Checklist</label>
          <div className="space-y-2">
            {[
              'Discussed requirements',
              'Explained pricing',
              'Confirmed timeline',
              'Answered questions',
              'Customer interested',
            ].map((item, idx) => (
              <label key={idx} className="flex items-center gap-3 p-3 bg-gray-900 border border-gray-800 rounded-lg hover:border-purple-500 cursor-pointer transition">
                <input type="checkbox" defaultChecked className="w-4 h-4" />
                <span className="text-sm">{item}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Conversion Status */}
        <div>
          <label className="block text-sm font-semibold mb-3">Conversion Status</label>
          <div className="space-y-2">
            {['Confirmed', 'Interested', 'Not Interested', 'Follow-up Later'].map(status => (
              <label key={status} className="flex items-center gap-3 p-3 border border-gray-800 rounded-lg hover:bg-gray-900 cursor-pointer transition">
                <input type="radio" name="status" value={status} defaultChecked={status === 'Confirmed'} className="w-4 h-4" />
                <span className="text-sm font-semibold">{status}</span>
              </label>
            ))}
          </div>
        </div>

        {/* Earnings Preview */}
        <div className="bg-gradient-to-br from-purple-900/20 to-blue-900/20 border border-purple-800 rounded-xl p-4">
          <p className="text-sm text-gray-400 mb-2">Estimated Earnings</p>
          <p className="text-2xl font-bold text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
            ₹{Math.round(requestData.price * 0.15)}
          </p>
          <p className="text-xs text-gray-500 mt-1">15% commission on confirmed calls</p>
        </div>

        {/* Submit Button */}
        <form onSubmit={handleSubmit} className="space-y-3">
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition"
          >
            Confirm & Save
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold"
          >
            Back
          </button>
        </form>
      </div>
    </div>
  )
}
