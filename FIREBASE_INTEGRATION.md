# 🔥 Firebase Integration Guide

## Overview

Firebase has been integrated into your Mentneo AI platform for:
- ✅ Authentication (Email/Password, Phone, Social)
- ✅ Firestore Database (Real-time data)
- ✅ Cloud Storage (Video uploads)
- ✅ Analytics (User tracking)

---

## Firebase Configuration

### Your Firebase Project
- **Project ID:** mentneo-ai
- **Auth Domain:** mentneo-ai.firebaseapp.com
- **Storage Bucket:** mentneo-ai.firebasestorage.app
- **API Key:** AIzaSyDMys0wMpQIJK-43TLgrY2LaJcSe-qEybc

### Configuration Files
- **Frontend Config:** `frontend/src/config/firebase.js`
- **Environment File:** `frontend/.env.firebase`

---

## Installation

Firebase SDK is already installed. If you need to reinstall:

```bash
cd frontend
npm install firebase
```

---

## Services Available

### 1. Authentication Service
**File:** `frontend/src/services/firebaseAuth.js`

```javascript
import {
  registerUser,
  loginUser,
  logoutUser,
  getCurrentUser,
  onAuthChange,
  resetPassword,
  updateUserEmail,
  updateUserPassword,
  updateUserProfile
} from '@/services/firebaseAuth'

// Register new user
const user = await registerUser('email@example.com', 'password123', 'John Doe')

// Login user
const user = await loginUser('email@example.com', 'password123')

// Logout user
await logoutUser()

// Get current user
const user = getCurrentUser()

// Listen to auth changes
const unsubscribe = onAuthChange((user) => {
  if (user) {
    console.log('User logged in:', user)
  } else {
    console.log('User logged out')
  }
})

// Reset password
await resetPassword('email@example.com')

// Update email
await updateUserEmail('newemail@example.com')

// Update password
await updateUserPassword('newPassword123')

// Update profile
await updateUserProfile({
  displayName: 'New Name',
  photoURL: 'https://example.com/photo.jpg'
})
```

### 2. Firestore Database Service
**File:** `frontend/src/services/firebaseDb.js`

```javascript
import {
  addDocument,
  getDocument,
  getDocuments,
  queryDocuments,
  updateDocument,
  deleteDocument,
  onDocumentChange,
  onCollectionChange
} from '@/services/firebaseDb'

// Add document
const docId = await addDocument('users', {
  name: 'John Doe',
  email: 'john@example.com',
  role: 'user'
})

// Get document by ID
const user = await getDocument('users', docId)

// Get all documents
const users = await getDocuments('users')

// Query documents
const activeUsers = await queryDocuments('users', {
  where: {
    field: 'status',
    operator: '==',
    value: 'active'
  },
  orderBy: {
    field: 'createdAt',
    direction: 'desc'
  },
  limit: 10
})

// Update document
await updateDocument('users', docId, {
  status: 'inactive'
})

// Delete document
await deleteDocument('users', docId)

// Real-time listener for single document
const unsubscribe = onDocumentChange('users', docId, (user) => {
  console.log('User updated:', user)
})

// Real-time listener for collection
const unsubscribe = onCollectionChange('users', (users) => {
  console.log('Users updated:', users)
})
```

### 3. Cloud Storage Service
**File:** `frontend/src/services/firebaseStorage.js`

```javascript
import {
  uploadFile,
  uploadFileWithProgress,
  getFileURL,
  deleteFile,
  listFiles
} from '@/services/firebaseStorage'

// Upload file
const url = await uploadFile('videos/my-video.mp4', file)

// Upload with progress tracking
const url = await uploadFileWithProgress(
  'videos/my-video.mp4',
  file,
  (progress) => {
    console.log(`Upload progress: ${progress}%`)
  }
)

// Get file URL
const url = await getFileURL('videos/my-video.mp4')

// Delete file
await deleteFile('videos/my-video.mp4')

// List files in directory
const files = await listFiles('videos/')
// Returns: [{ name, path, url }, ...]
```

---

## Database Structure

### Collections

#### users
```javascript
{
  id: 'user123',
  email: 'user@example.com',
  displayName: 'John Doe',
  phone: '9182146476',
  role: 'user', // 'user', 'telecaller', 'creator'
  status: 'active',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### videoRequests
```javascript
{
  id: 'request123',
  userId: 'user123',
  title: 'Product Demo Video',
  description: 'Create a demo video for our product',
  plan: 'standard', // 'basic', 'standard', 'premium'
  status: 'pending', // 'pending', 'in_progress', 'completed'
  videoUrl: 'https://...',
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### telecallerRequests
```javascript
{
  id: 'tcrequest123',
  requestId: 'request123',
  telecallerId: 'telecaller123',
  status: 'completed', // 'pending', 'in_progress', 'completed'
  rating: 5,
  feedback: 'Great service!',
  earnings: 150,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

#### videos
```javascript
{
  id: 'video123',
  creatorId: 'creator123',
  requestId: 'request123',
  title: 'Product Demo',
  description: 'Demo video for product',
  videoUrl: 'https://...',
  status: 'available', // 'available', 'taken', 'completed'
  earnings: 500,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

---

## Usage Examples

### Example 1: User Registration & Login

```javascript
import { registerUser, loginUser, onAuthChange } from '@/services/firebaseAuth'
import { addDocument } from '@/services/firebaseDb'

// Register user
const handleRegister = async (email, password, name) => {
  try {
    const user = await registerUser(email, password, name)
    
    // Add user to Firestore
    await addDocument('users', {
      uid: user.uid,
      email: user.email,
      displayName: name,
      role: 'user',
      status: 'active'
    })
    
    console.log('User registered successfully')
  } catch (error) {
    console.error('Registration failed:', error.message)
  }
}

// Login user
const handleLogin = async (email, password) => {
  try {
    const user = await loginUser(email, password)
    console.log('User logged in:', user.email)
  } catch (error) {
    console.error('Login failed:', error.message)
  }
}

// Listen to auth state
onAuthChange((user) => {
  if (user) {
    console.log('User is logged in:', user.uid)
  } else {
    console.log('User is logged out')
  }
})
```

### Example 2: Create Video Request

```javascript
import { addDocument } from '@/services/firebaseDb'
import { getCurrentUser } from '@/services/firebaseAuth'

const handleCreateRequest = async (title, description, plan) => {
  try {
    const user = getCurrentUser()
    
    const requestId = await addDocument('videoRequests', {
      userId: user.uid,
      title: title,
      description: description,
      plan: plan,
      status: 'pending'
    })
    
    console.log('Request created:', requestId)
    return requestId
  } catch (error) {
    console.error('Failed to create request:', error.message)
  }
}
```

### Example 3: Upload Video

```javascript
import { uploadFileWithProgress } from '@/services/firebaseStorage'
import { updateDocument } from '@/services/firebaseDb'

const handleVideoUpload = async (file, requestId) => {
  try {
    const videoUrl = await uploadFileWithProgress(
      `videos/${requestId}/${file.name}`,
      file,
      (progress) => {
        console.log(`Upload progress: ${progress.toFixed(2)}%`)
      }
    )
    
    // Update request with video URL
    await updateDocument('videoRequests', requestId, {
      videoUrl: videoUrl,
      status: 'completed'
    })
    
    console.log('Video uploaded successfully')
  } catch (error) {
    console.error('Upload failed:', error.message)
  }
}
```

### Example 4: Real-time Updates

```javascript
import { onCollectionChange } from '@/services/firebaseDb'
import { getCurrentUser } from '@/services/firebaseAuth'

const handleRealtimeUpdates = () => {
  const user = getCurrentUser()
  
  // Listen to user's video requests
  const unsubscribe = onCollectionChange('videoRequests', (requests) => {
    const userRequests = requests.filter(req => req.userId === user.uid)
    console.log('User requests updated:', userRequests)
  })
  
  // Cleanup on unmount
  return () => unsubscribe()
}
```

---

## Security Rules

### Firestore Security Rules

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Users collection
    match /users/{userId} {
      allow read, write: if request.auth.uid == userId;
    }
    
    // Video requests
    match /videoRequests/{requestId} {
      allow read, write: if request.auth.uid == resource.data.userId;
      allow read: if request.auth.uid == resource.data.telecallerId;
    }
    
    // Videos
    match /videos/{videoId} {
      allow read: if true;
      allow write: if request.auth.uid == resource.data.creatorId;
    }
  }
}
```

### Storage Security Rules

```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Videos folder
    match /videos/{allPaths=**} {
      allow read: if true;
      allow write: if request.auth != null;
    }
    
    // User profiles
    match /profiles/{userId}/{allPaths=**} {
      allow read, write: if request.auth.uid == userId;
    }
  }
}
```

---

## Environment Variables

Add to `frontend/.env`:

```env
VITE_FIREBASE_API_KEY=AIzaSyDMys0wMpQIJK-43TLgrY2LaJcSe-qEybc
VITE_FIREBASE_AUTH_DOMAIN=mentneo-ai.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=mentneo-ai
VITE_FIREBASE_STORAGE_BUCKET=mentneo-ai.firebasestorage.app
VITE_FIREBASE_MESSAGING_SENDER_ID=54893009505
VITE_FIREBASE_APP_ID=1:54893009505:web:920133522ca8a4452ba820
VITE_FIREBASE_MEASUREMENT_ID=G-VFCPQELM5P
```

---

## Integration with Existing Auth

Your existing AuthContext can be enhanced with Firebase:

```javascript
// frontend/src/context/AuthContext.jsx
import { onAuthChange } from '@/services/firebaseAuth'

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthChange((firebaseUser) => {
      if (firebaseUser) {
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          token: firebaseUser.accessToken
        })
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  )
}
```

---

## Deployment

### Firebase Hosting

```bash
# Install Firebase CLI
npm install -g firebase-tools

# Login to Firebase
firebase login

# Initialize Firebase
firebase init hosting

# Deploy
npm run build
firebase deploy
```

---

## Troubleshooting

### Issue: "Firebase is not defined"
**Solution:** Make sure to import Firebase config in your component:
```javascript
import app from '@/config/firebase'
```

### Issue: "Permission denied" errors
**Solution:** Check your Firestore security rules and make sure they allow the operation

### Issue: "Storage bucket not found"
**Solution:** Verify the storage bucket name in your Firebase config

### Issue: "Auth/invalid-api-key"
**Solution:** Make sure your API key is correct and enabled in Firebase Console

---

## Next Steps

1. ✅ Firebase SDK installed
2. ✅ Configuration files created
3. ✅ Services implemented
4. ⏭️ Integrate with existing pages
5. ⏭️ Set up Firestore collections
6. ⏭️ Configure security rules
7. ⏭️ Deploy to Firebase Hosting

---

## Resources

- [Firebase Documentation](https://firebase.google.com/docs)
- [Firebase Console](https://console.firebase.google.com)
- [Firebase SDK Reference](https://firebase.google.com/docs/reference)
- [Firestore Documentation](https://firebase.google.com/docs/firestore)
- [Cloud Storage Documentation](https://firebase.google.com/docs/storage)

---

**Firebase Integration Complete!** 🎉

Your Mentneo AI platform now has enterprise-grade backend services ready to scale.
