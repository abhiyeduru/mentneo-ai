import express from 'express'
import jwt from 'jsonwebtoken'
import User from '../models/User.js'

const router = express.Router()

router.post('/login', async (req, res) => {
  try {
    const { phone } = req.body

    let user = await User.findOne({ phone })
    if (!user) {
      user = new User({ phone })
      await user.save()
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.post('/verify-otp', async (req, res) => {
  try {
    const { phone, otp } = req.body
    // In production, verify OTP from SMS service
    const user = await User.findOne({ phone })
    if (!user) {
      return res.status(404).json({ message: 'User not found' })
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' })
    res.json({ token, user })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
