import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, ArrowRight, Sparkles } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'

export default function Login() {
  const [step, setStep] = useState('phone')
  const [phone, setPhone] = useState('')
  const [otp, setOtp] = useState('')
  const navigate = useNavigate()
  const { login } = useContext(AuthContext)

  useEffect(() => {
    if (phone === '9182146476') {
      setStep('otp')
    }
  }, [phone])

  const handlePhoneSubmit = (e) => {
    e.preventDefault()
    if (phone.length === 10) {
      setStep('otp')
    }
  }

  const handleOtpSubmit = (e) => {
    e.preventDefault()
    if (otp.length === 6 || phone === '9182146476') {
      const userData = {
        token: 'dummy-token-' + phone,
        phone: phone,
        id: 'user-' + phone
      }
      login(userData)
      navigate('/home')
    }
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-purple-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-600 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" style={{ animationDelay: '2s' }}></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-500 to-blue-500 rounded-2xl mb-6 shadow-lg shadow-purple-500/50">
              <Sparkles size={32} className="text-white" />
            </div>
            <h1 className="text-4xl font-black mb-2 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Mentneo AI
            </h1>
            <p className="text-gray-400 text-lg">Create stunning videos in minutes</p>
          </div>

          {/* Main Card */}
          <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-3xl p-8 shadow-2xl backdrop-blur-xl">
            {step === 'phone' ? (
              <>
                <h2 className="text-2xl font-bold mb-2">Welcome Back</h2>
                <p className="text-gray-400 mb-8">Enter your phone number to get started</p>

                <form onSubmit={handlePhoneSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-300">Phone Number</label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500">+91</span>
                      <input
                        type="tel"
                        placeholder="98765 43210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value.slice(0, 10))}
                        className="w-full pl-12 pr-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 transition"
                        maxLength="10"
                        autoFocus
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Demo: 9182146476</p>
                  </div>

                  <button
                    type="submit"
                    disabled={phone.length !== 10}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Continue <ArrowRight size={20} />
                  </button>
                </form>

                {/* Divider */}
                <div className="my-8 flex items-center gap-4">
                  <div className="flex-1 h-px bg-gray-700"></div>
                  <span className="text-gray-500 text-sm">or</span>
                  <div className="flex-1 h-px bg-gray-700"></div>
                </div>

                {/* Google Login */}
                <button className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-800 transition flex items-center justify-center gap-3 font-semibold">
                  <Mail size={20} />
                  Continue with Google
                </button>
              </>
            ) : (
              <>
                <h2 className="text-2xl font-bold mb-2">Verify OTP</h2>
                <p className="text-gray-400 mb-8">We've sent a code to +91 {phone}</p>

                <form onSubmit={handleOtpSubmit} className="space-y-6">
                  <div>
                    <label className="block text-sm font-semibold mb-3 text-gray-300">Enter OTP</label>
                    <input
                      type="text"
                      placeholder="000000"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                      className="w-full px-4 py-4 bg-gray-800 border border-gray-700 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white text-center text-2xl tracking-widest placeholder-gray-500 transition"
                      maxLength="6"
                      autoFocus
                    />
                    <p className="text-xs text-gray-500 mt-2">Demo: Any 6 digits</p>
                  </div>

                  <button
                    type="submit"
                    disabled={otp.length !== 6 && phone !== '9182146476'}
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl hover:shadow-lg hover:shadow-purple-500/50 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                  >
                    Verify & Continue <ArrowRight size={20} />
                  </button>

                  <button
                    type="button"
                    onClick={() => setStep('phone')}
                    className="w-full py-4 border border-gray-700 rounded-xl hover:bg-gray-800 transition font-semibold"
                  >
                    Change Number
                  </button>
                </form>
              </>
            )}
          </div>

          {/* Footer */}
          <p className="text-center text-gray-500 text-sm mt-8">
            By continuing, you agree to our Terms & Privacy Policy
          </p>
          <p className="text-center text-gray-500 text-sm mt-4">
            Are you a telecaller?{' '}
            <button
              onClick={() => navigate('/telecaller-login')}
              className="text-purple-400 hover:text-purple-300 transition font-semibold"
            >
              Login here
            </button>
          </p>
          <p className="text-center text-gray-500 text-sm mt-2">
            Are you a video creator?{' '}
            <button
              onClick={() => navigate('/video-creator-login')}
              className="text-blue-400 hover:text-blue-300 transition font-semibold"
            >
              Login here
            </button>
          </p>
        </div>
      </div>
    </div>
  )
}
