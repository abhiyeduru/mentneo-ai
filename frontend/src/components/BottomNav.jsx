import React from 'react'
import { Home, ShoppingBag, User } from 'lucide-react'
import { Link, useLocation } from 'react-router-dom'

export default function BottomNav() {
  const location = useLocation()

  const isActive = (path) => location.pathname === path

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-black border-t border-gray-800 px-4 py-3 flex justify-around md:hidden backdrop-blur-xl">
      <Link
        to="/home"
        className={`flex flex-col items-center gap-1 transition ${
          isActive('/home') ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        <Home size={24} />
        <span className="text-xs">Home</span>
      </Link>
      <Link
        to="/orders"
        className={`flex flex-col items-center gap-1 transition ${
          isActive('/orders') ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        <ShoppingBag size={24} />
        <span className="text-xs">Orders</span>
      </Link>
      <Link
        to="/profile"
        className={`flex flex-col items-center gap-1 transition ${
          isActive('/profile') ? 'text-purple-500' : 'text-gray-500 hover:text-gray-300'
        }`}
      >
        <User size={24} />
        <span className="text-xs">Profile</span>
      </Link>
    </nav>
  )
}
