import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
import { getStorage } from 'firebase/storage'
import { getAnalytics } from 'firebase/analytics'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDMys0wMpQIJK-43TLgrY2LaJcSe-qEybc",
  authDomain: "mentneo-ai.firebaseapp.com",
  projectId: "mentneo-ai",
  storageBucket: "mentneo-ai.firebasestorage.app",
  messagingSenderId: "54893009505",
  appId: "1:54893009505:web:920133522ca8a4452ba820",
  measurementId: "G-VFCPQELM5P"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

// Initialize Firebase services
export const auth = getAuth(app)
export const db = getFirestore(app)
export const storage = getStorage(app)
export const analytics = getAnalytics(app)

export default app
