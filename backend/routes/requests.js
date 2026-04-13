import express from 'express'
import Request from '../models/Request.js'
import { verifyToken } from '../middleware/auth.js'

const router = express.Router()

router.post('/', verifyToken, async (req, res) => {
  try {
    const { businessName, category, goal, location, images } = req.body

    const newRequest = new Request({
      userId: req.userId,
      businessName,
      category,
      goal,
      location,
      images,
    })

    await newRequest.save()
    res.status(201).json(newRequest)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/', verifyToken, async (req, res) => {
  try {
    const requests = await Request.find({ userId: req.userId }).sort({ createdAt: -1 })
    res.json(requests)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.get('/:id', verifyToken, async (req, res) => {
  try {
    const request = await Request.findById(req.params.id)
    if (!request) {
      return res.status(404).json({ message: 'Request not found' })
    }
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

router.patch('/:id', verifyToken, async (req, res) => {
  try {
    const request = await Request.findByIdAndUpdate(req.params.id, req.body, { new: true })
    res.json(request)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

export default router
