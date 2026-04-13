import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { LogOut, HelpCircle, CreditCard, User, Settings, Bell } from 'lucide-react'
import { AuthContext } from '../context/AuthContext'
import BottomNav from '../components/BottomNav'

export default function Profile() {
  const navigate = useNavigate()
  const { logout } = useContext(AuthContext)

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const menuItems = [
    { icon: CreditCard, label: 'Payment History', desc: 'View all transactions', color: 'text-purple-500' },
    { icon: Bell, label: 'Notifications', desc: 'Manage alerts', color: 'text-blue-500' },
    { icon: Settings, label: 'Settings', desc: 'Account preferences', color: 'text-green-500' },
    { icon: HelpCircle, label: 'Help & Support', desc: 'Contact our team', color: 'text-orange-500' },
  ]

  return (
    <div className="min-h-screen bg-black text-white pb-24">
      {/* Header */}
      <div className="bg-gradient-to-br from-gray-900 to-black border-b border-gray-800 p-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/50">
            <User size={32} />
          </div>
          <div>
            <h1 className="text-2xl font-bold">John Doe</h1>
            <p className="text-gray-400">+91 98765 43210</p>
          </div>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="p-6 grid grid-cols-2 gap-3">
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Account Status</p>
          <p className="text-lg font-bold text-green-400">Active</p>
        </div>
        <div className="bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4">
          <p className="text-xs text-gray-400 mb-2">Member Since</p>
          <p className="text-lg font-bold">Jan 2024</p>
        </div>
      </div>

      {/* Menu Items */}
      <div className="p-6 space-y-3">
        {menuItems.map((item, idx) => {
          const Icon = item.icon
          return (
            <button
              key={idx}
              className="w-full bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-xl p-4 hover:border-purple-500 transition flex items-center gap-4 text-left"
            >
              <div className={`p-3 bg-gray-800 rounded-lg ${item.color}`}>
                <Icon size={20} />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold">{item.label}</h3>
                <p className="text-xs text-gray-500">{item.desc}</p>
              </div>
            </button>
          )
        })}
      </div>

      {/* Logout Button */}
      <div className="p-6">
        <button
          onClick={handleLogout}
          className="w-full py-4 border border-red-500 border-opacity-50 rounded-xl hover:bg-red-500 hover:bg-opacity-10 transition font-semibold flex items-center justify-center gap-2 text-red-400 hover:text-red-300"
        >
          <LogOut size={20} />
          Logout
        </button>
      </div>

      <BottomNav />
    </div>
  )
}
