import React, { createContext, useState, useEffect } from 'react'

export const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      // Restore user from localStorage
      const userPhone = localStorage.getItem('userPhone')
      const userEmail = localStorage.getItem('userEmail')
      const userRole = localStorage.getItem('userRole')
      
      setUser({
        token,
        phone: userPhone,
        email: userEmail,
        role: userRole || 'user',
        id: localStorage.getItem('userId')
      })
    }
    setLoading(false)
  }, [])

  const login = (userData) => {
    setUser(userData)
    localStorage.setItem('token', userData.token)
    localStorage.setItem('userId', userData.id)
    if (userData.phone) localStorage.setItem('userPhone', userData.phone)
    if (userData.email) localStorage.setItem('userEmail', userData.email)
    if (userData.role) localStorage.setItem('userRole', userData.role)
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('token')
    localStorage.removeItem('userId')
    localStorage.removeItem('userPhone')
    localStorage.removeItem('userEmail')
    localStorage.removeItem('userRole')
  }

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
