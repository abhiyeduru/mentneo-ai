import React, { useState, useRef, useEffect } from 'react'
import { MessageCircle, X, Send, Loader } from 'lucide-react'
import axios from 'axios'

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: 'Hi! 👋 I\'m here to help. Ask me anything about Mentneo AI Video!',
      sender: 'bot',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (!input.trim()) return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      sender: 'user',
      timestamp: new Date(),
    }
    setMessages(prev => [...prev, userMessage])
    setInput('')
    setLoading(true)

    try {
      const response = await axios.post('/api/chat/message', {
        message: input,
      })

      const botMessage = {
        id: messages.length + 2,
        text: response.data.response,
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, botMessage])
    } catch (error) {
      const errorMessage = {
        id: messages.length + 2,
        text: 'Sorry, I encountered an error. Please try again or contact support@mentneo.com',
        sender: 'bot',
        timestamp: new Date(),
      }
      setMessages(prev => [...prev, errorMessage])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {/* Chatbot Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-24 right-6 w-14 h-14 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-full shadow-lg shadow-purple-500/50 hover:shadow-xl transition-all flex items-center justify-center z-40 md:bottom-8 md:right-8"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>

      {/* Chatbot Window */}
      {isOpen && (
        <div className="fixed bottom-40 right-6 w-96 max-w-[calc(100vw-2rem)] bg-gradient-to-br from-gray-900 to-black border border-gray-800 rounded-2xl shadow-2xl flex flex-col z-40 h-[600px] md:bottom-28 md:right-8 overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-4 rounded-t-2xl">
            <h3 className="font-bold text-lg">Mentneo Support 🤖</h3>
            <p className="text-sm text-purple-100">Powered by AI</p>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map(msg => (
              <div
                key={msg.id}
                className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-br-none'
                      : 'bg-gray-800 text-gray-100 rounded-bl-none border border-gray-700'
                  }`}
                >
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs opacity-70 mt-1 block">
                    {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="bg-gray-800 text-gray-100 px-4 py-2 rounded-lg rounded-bl-none flex items-center gap-2 border border-gray-700">
                  <Loader size={16} className="animate-spin" />
                  <span className="text-sm">Thinking...</span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="border-t border-gray-800 p-4 flex gap-2 bg-black">
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              placeholder="Ask me anything..."
              className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent text-white placeholder-gray-500 text-sm transition"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-2 rounded-lg hover:shadow-lg hover:shadow-purple-500/50 transition-all disabled:opacity-50"
            >
              <Send size={18} />
            </button>
          </form>
        </div>
      )}
    </>
  )
}
