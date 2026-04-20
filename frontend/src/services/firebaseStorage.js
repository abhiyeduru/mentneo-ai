import {
  ref,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL,
  deleteObject,
  listAll
} from 'firebase/storage'
import { storage } from '../config/firebase'

// Upload file
export const uploadFile = async (path, file) => {
  try {
    const storageRef = ref(storage, path)
    await uploadBytes(storageRef, file)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    throw new Error(error.message)
  }
}

// Upload file with progress
export const uploadFileWithProgress = async (path, file, onProgress) => {
  try {
    const storageRef = ref(storage, path)
    const uploadTask = uploadBytesResumable(storageRef, file)
    
    return new Promise((resolve, reject) => {
      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
          onProgress(progress)
        },
        (error) => {
          reject(error)
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref)
          resolve(downloadURL)
        }
      )
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get download URL
export const getFileURL = async (path) => {
  try {
    const storageRef = ref(storage, path)
    const downloadURL = await getDownloadURL(storageRef)
    return downloadURL
  } catch (error) {
    throw new Error(error.message)
  }
}

// Delete file
export const deleteFile = async (path) => {
  try {
    const storageRef = ref(storage, path)
    await deleteObject(storageRef)
  } catch (error) {
    throw new Error(error.message)
  }
}

// List files in directory
export const listFiles = async (path) => {
  try {
    const storageRef = ref(storage, path)
    const result = await listAll(storageRef)
    
    const files = await Promise.all(
      result.items.map(async (item) => {
        const url = await getDownloadURL(item)
        return {
          name: item.name,
          path: item.fullPath,
          url: url
        }
      })
    )
    
    return files
  } catch (error) {
    throw new Error(error.message)
  }
}
