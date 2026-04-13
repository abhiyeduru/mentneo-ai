import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  phone: {
    type: String,
    required: true,
    unique: true,
  },
  email: String,
  name: String,
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcryptjs.hash(this.password, 10)
  next()
})

export default mongoose.model('User', userSchema)
