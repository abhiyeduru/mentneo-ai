import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile,
  sendPasswordResetEmail,
  updateEmail,
  updatePassword
} from 'firebase/auth'
import { auth } from '../config/firebase'

// Create user account
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    
    // Update profile with display name
    if (displayName) {
      await updateProfile(userCredential.user, {
        displayName: displayName
      })
    }
    
    return userCredential.user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Sign in user
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    return userCredential.user
  } catch (error) {
    throw new Error(error.message)
  }
}

// Sign out user
export const logoutUser = async () => {
  try {
    await signOut(auth)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get current user
export const getCurrentUser = () => {
  return auth.currentUser
}

// Listen to auth state changes
export const onAuthChange = (callback) => {
  return onAuthStateChanged(auth, callback)
}

// Send password reset email
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update user email
export const updateUserEmail = async (newEmail) => {
  try {
    await updateEmail(auth.currentUser, newEmail)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update user password
export const updateUserPassword = async (newPassword) => {
  try {
    await updatePassword(auth.currentUser, newPassword)
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update user profile
export const updateUserProfile = async (updates) => {
  try {
    await updateProfile(auth.currentUser, updates)
  } catch (error) {
    throw new Error(error.message)
  }
}
