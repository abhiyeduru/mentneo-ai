import mongoose from 'mongoose'

const telecallerRequestSchema = new mongoose.Schema({
  requestId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Request',
    required: true,
  },
  telecallerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Telecaller',
  },
  status: {
    type: String,
    enum: ['pending', 'accepted', 'rejected', 'completed'],
    default: 'pending',
  },
  notes: String,
  selectedPlan: {
    type: String,
    enum: ['basic', 'standard', 'premium'],
  },
  price: Number,
  callDuration: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

export default mongoose.model('TelecallerRequest', telecallerRequestSchema)
