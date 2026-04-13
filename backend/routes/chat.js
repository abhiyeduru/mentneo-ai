import express from 'express'
import { getChatbotResponse } from '../services/chatbot.js'

const router = express.Router()

router.post('/message', async (req, res) => {
  try {
    const { message } = req.body

    if (!message || message.trim().length === 0) {
      return res.status(400).json({ error: 'Message cannot be empty' })
    }

    const response = await getChatbotResponse(message)
    res.json({ response })
  } catch (error) {
    console.error('Chat error:', error)
    res.status(500).json({ error: error.message || 'Failed to process message' })
  }
})

export default router
