import mongoose from 'mongoose'

const requestSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  businessName: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    enum: ['ecommerce', 'saas', 'service', 'other'],
    required: true,
  },
  goal: {
    type: String,
    enum: ['Leads', 'Awareness', 'Offer'],
    required: true,
  },
  location: String,
  status: {
    type: String,
    enum: ['pending', 'confirmed', 'processing', 'completed'],
    default: 'pending',
  },
  images: [String],
  videoUrl: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('Request', requestSchema)
