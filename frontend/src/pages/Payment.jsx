import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ChevronLeft, Check, Lock } from 'lucide-react'

export default function Payment() {
  const navigate = useNavigate()
  const [selectedPlan, setSelectedPlan] = useState('standard')
  const [paymentMethod, setPaymentMethod] = useState('upi')
  const [processing, setProcessing] = useState(false)

  const plans = {
    basic: {
      name: 'Basic',
      price: 999,
      duration: '1 Video',
      features: ['1 AI Video', 'HD Quality', '24hr Delivery', 'Basic Editing'],
    },
    standard: {
      name: 'Standard',
      price: 2499,
      duration: '3 Videos',
      features: ['3 AI Videos', '1080p Quality', '12hr Delivery', 'Advanced Editing', 'Priority Support'],
      popular: true,
    },
    premium: {
      name: 'Premium',
      price: 4999,
      duration: '10 Videos',
      features: ['10 AI Videos', '4K Quality', '4hr Delivery', 'Full Customization', '24/7 Support', 'Revisions'],
    },
  }

  const handlePayment = async (e) => {
    e.preventDefault()
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setProcessing(false)
      navigate('/processing')
    }, 2000)
  }

  const currentPlan = plans[selectedPlan]

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-xl">Payment</h1>
          <p className="text-sm text-gray-400">Complete your order</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-6 space-y-6">
        {/* Plan Selection */}
        <div>
          <h2 className="text-lg font-bold mb-4">Select Plan</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Object.entries(plans).map(([key, plan]) => (
              <button
                key={key}
                onClick={() => setSelectedPlan(key)}
                className={`relative p-6 rounded-2xl border-2 transition text-left ${
                  selectedPlan === key
                    ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600 px-4 py-1 rounded-full text-xs font-bold">
                    Most Popular
                  </div>
                )}

                <h3 className="text-xl font-bold mb-2">{plan.name}</h3>
                <div className="mb-4">
                  <span className="text-3xl font-black">₹{plan.price}</span>
                  <p className="text-sm text-gray-400 mt-1">{plan.duration}</p>
                </div>

                <ul className="space-y-2 text-sm">
                  {plan.features.map((feature, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-gray-300">
                      <Check size={16} className="text-green-400" />
                      {feature}
                    </li>
                  ))}
                </ul>

                {selectedPlan === key && (
                  <div className="absolute top-4 right-4 w-6 h-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                    <Check size={16} className="text-white" />
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl p-6">
          <h3 className="text-lg font-bold mb-4">Order Summary</h3>

          <div className="space-y-3 mb-4 pb-4 border-b border-gray-800">
            <div className="flex justify-between">
              <span className="text-gray-400">{currentPlan.name} Plan</span>
              <span className="font-semibold">₹{currentPlan.price}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">GST (18%)</span>
              <span className="font-semibold">₹{Math.round(currentPlan.price * 0.18)}</span>
            </div>
          </div>

          <div className="flex justify-between text-lg font-bold">
            <span>Total Amount</span>
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text">
              ₹{Math.round(currentPlan.price * 1.18)}
            </span>
          </div>
        </div>

        {/* Payment Method */}
        <div>
          <h2 className="text-lg font-bold mb-4">Payment Method</h2>
          <div className="space-y-3">
            {[
              { id: 'upi', name: 'UPI', icon: '📱', desc: 'Google Pay, PhonePe, Paytm' },
              { id: 'card', name: 'Credit/Debit Card', icon: '💳', desc: 'Visa, Mastercard, Amex' },
              { id: 'netbanking', name: 'Net Banking', icon: '🏦', desc: 'All major banks' },
            ].map(method => (
              <label
                key={method.id}
                className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition ${
                  paymentMethod === method.id
                    ? 'border-purple-500 bg-gradient-to-br from-purple-900/20 to-blue-900/20'
                    : 'border-gray-800 hover:border-gray-700'
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  value={method.id}
                  checked={paymentMethod === method.id}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-4 h-4"
                />
                <span className="text-2xl">{method.icon}</span>
                <div className="flex-1">
                  <p className="font-semibold">{method.name}</p>
                  <p className="text-sm text-gray-400">{method.desc}</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Trust Badges */}
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4 flex items-center justify-center gap-6">
          <div className="flex items-center gap-2 text-sm">
            <Lock size={16} className="text-green-400" />
            <span>256-bit SSL Encrypted</span>
          </div>
          <div className="w-px h-6 bg-gray-700"></div>
          <div className="text-sm">
            <span className="text-gray-400">Secured by</span>
            <p className="font-semibold">Razorpay</p>
          </div>
        </div>

        {/* Pay Button */}
        <form onSubmit={handlePayment} className="space-y-4">
          <button
            type="submit"
            disabled={processing}
            className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
          >
            {processing ? (
              <>
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Processing...
              </>
            ) : (
              <>
                <Lock size={20} />
                Pay ₹{Math.round(currentPlan.price * 1.18)}
              </>
            )}
          </button>

          <button
            type="button"
            onClick={() => navigate(-1)}
            className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold"
          >
            Back
          </button>
        </form>

        {/* Info */}
        <p className="text-center text-sm text-gray-500">
          Your payment is secure and encrypted. We never store your card details.
        </p>
      </div>
    </div>
  )
}
