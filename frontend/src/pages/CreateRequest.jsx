import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Upload, ChevronLeft, CheckCircle2 } from 'lucide-react'
import BottomNav from '../components/BottomNav'

export default function CreateRequest() {
  const navigate = useNavigate()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    businessName: '',
    category: '',
    goal: '',
    location: '',
    images: [],
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    navigate('/request-submitted')
  }

  const steps = ['Details', 'Goals', 'Media']
  const isStepComplete = (stepNum) => {
    if (stepNum === 1) return formData.businessName && formData.category
    if (stepNum === 2) return formData.goal && formData.location
    return true
  }

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6 flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-gray-800 rounded-lg transition">
          <ChevronLeft size={24} />
        </button>
        <div className="flex-1">
          <h1 className="font-bold text-xl">Create Video Request</h1>
          <p className="text-sm text-gray-400">Step {step} of 3</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="h-1 bg-gray-800">
        <div className="h-full bg-gradient-to-r from-purple-600 to-blue-600 transition-all" style={{ width: `${(step / 3) * 100}%` }}></div>
      </div>

      {/* Steps Indicator */}
      <div className="px-6 py-6 flex justify-between">
        {steps.map((s, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
              idx < step ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white' :
              idx === step - 1 ? 'bg-purple-600 text-white' :
              'bg-gray-800 text-gray-400'
            }`}>
              {idx < step ? <CheckCircle2 size={20} /> : idx + 1}
            </div>
            <span className="text-xs text-gray-400">{s}</span>
          </div>
        ))}
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="px-6 space-y-6">
        {step === 1 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-3">Business Name</label>
              <input
                type="text"
                name="businessName"
                placeholder="Enter your business name"
                value={formData.businessName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white transition"
              >
                <option value="">Select category</option>
                <option value="ecommerce">E-commerce</option>
                <option value="saas">SaaS</option>
                <option value="service">Service</option>
                <option value="other">Other</option>
              </select>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold mb-3">Goal</label>
              <div className="space-y-2">
                {['Leads', 'Awareness', 'Offer'].map(goal => (
                  <label key={goal} className="flex items-center gap-3 p-4 border border-gray-800 rounded-xl cursor-pointer hover:bg-gray-900 hover:border-purple-500 transition">
                    <input
                      type="radio"
                      name="goal"
                      value={goal}
                      onChange={handleInputChange}
                      className="w-4 h-4"
                    />
                    <span className="font-medium">{goal}</span>
                  </label>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-3">Location</label>
              <input
                type="text"
                name="location"
                placeholder="City or region"
                value={formData.location}
                onChange={handleInputChange}
                className="w-full px-4 py-3 bg-gray-900 border border-gray-800 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
              />
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-4">
            <label className="block text-sm font-semibold mb-3">Upload Images/Videos</label>
            <div className="border-2 border-dashed border-gray-700 rounded-2xl p-12 text-center cursor-pointer hover:border-purple-500 hover:bg-gray-900 transition">
              <Upload className="mx-auto mb-3 text-gray-500" size={40} />
              <p className="font-semibold mb-1">Click to upload</p>
              <p className="text-sm text-gray-500">or drag and drop</p>
              <p className="text-xs text-gray-600 mt-2">PNG, JPG, MP4 up to 100MB</p>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex gap-3 pt-4">
          {step > 1 && (
            <button
              type="button"
              onClick={() => setStep(step - 1)}
              className="flex-1 py-4 border border-gray-700 rounded-xl hover:bg-gray-900 transition font-semibold"
            >
              Back
            </button>
          )}
          {step < 3 ? (
            <button
              type="button"
              onClick={() => setStep(step + 1)}
              disabled={!isStepComplete(step)}
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
          ) : (
            <button
              type="submit"
              className="flex-1 py-4 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition font-semibold"
            >
              Submit Request 🚀
            </button>
          )}
        </div>
      </form>

      <BottomNav />
    </div>
  )
}
