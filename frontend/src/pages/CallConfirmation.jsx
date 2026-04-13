import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Phone, CheckCircle, ArrowRight, User } from 'lucide-react'

export default function CallConfirmation() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('standard')
  const [notes, setNotes] = useState('')

  const plans = {
    basic: { name: 'Basic', price: 999, videos: 1 },
    standard: { name: 'Standard', price: 2499, videos: 3 },
    premium: { name: 'Premium', price: 4999, videos: 10 },
  }

  const handleConfirm = () => {
    navigate('/payment')
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <h1 className="text-3xl font-black mb-2">Call Confirmed ✅</h1>
        <p className="text-gray-400">Our team has reviewed your request</p>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Telecaller Info */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Your Telecaller</h2>

          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
              <User size={32} />
            </div>
            <div>
              <h3 className="font-bold text-lg">Rajesh Kumar</h3>
              <p className="text-sm text-gray-400">Senior Video Consultant</p>
              <p className="text-xs text-green-400 mt-1">✓ Verified</p>
            </div>
          </div>

          <div className="space-y-3 text-sm border-t border-gray-800 pt-4">
            <div className="flex justify-between">
              <span className="text-gray-400">Call Duration</span>
              <span className="font-semibold">12 minutes</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Call Time</span>
              <span className="font-semibold">Today, 2:30 PM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Status</span>
              <span className="text-green-400 font-semibold">Completed</span>
            </div>
          </div>
        </div>

        {/* Call Notes */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
          <h2 className="text-lg font-bold mb-4">Call Notes</h2>
          <div className="bg-gray-800 rounded-xl p-4 text-sm text-gray-300 space-y-2">
            <p>✓ Discussed your video requirements</p>
            <p>✓ Reviewed your business details</p>
            <p>✓ Confirmed delivery timeline</p>
            <p>✓ Explained editing options</p>
          </div>
        </div>

        {/* Plan Selection */}
        <div>
          <h2 className="text-lg font-bold mb-4">Recommended Plan</h2>
          <div className="space-y-3">
            {Object.entries(plans).map(([key, plan]) => (
              <label
                key={key}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                  selectedPlan === key
                    ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="plan"
                  value={key}
                  checked={selectedPlan === key}
                  onChange={(e) => setSelectedPlan(e.target.value)}
                  className="w-4 h-4"
                />
                <div className="flex-1">
                  <p className="font-semibold">{plan.name}</p>
                  <p className="text-sm text-gray-400">{plan.videos} videos included</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-lg">₹{plan.price}</p>
                  <p className="text-xs text-gray-400">+ 18% GST</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Additional Notes */}
        <div>
          <label className="block text-sm font-semibold mb-3">Additional Notes (Optional)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special requests or preferences..."
            className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition resize-none h-24"
          />
        </div>

        {/* Price Breakdown */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-400">{plans[selectedPlan].name} Plan</span>
            <span>₹{plans[selectedPlan].price}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">GST (18%)</span>
            <span>₹{Math.round(plans[selectedPlan].price * 0.18)}</span>
          </div>
          <div className="border-t border-gray-700 pt-2 flex justify-between font-bold">
            <span>Total</span>
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              ₹{Math.round(plans[selectedPlan].price * 1.18)}
            </span>
          </div>
        </div>

        {/* CTA Buttons */}
        <div className="space-y-3">
          <button
            onClick={handleConfirm}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition flex items-center justify-center gap-2"
          >
            Proceed to Payment <ArrowRight size={20} />
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
