import {
  collection,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  onSnapshot
} from 'firebase/firestore'
import { db } from '../config/firebase'

// Add document
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(db, collectionName), {
      ...data,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    return docRef.id
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get document by ID
export const getDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(db, collectionName, docId)
    const docSnap = await getDoc(docRef)
    
    if (docSnap.exists()) {
      return { id: docSnap.id, ...docSnap.data() }
    } else {
      return null
    }
  } catch (error) {
    throw new Error(error.message)
  }
}

// Get all documents from collection
export const getDocuments = async (collectionName) => {
  try {
    const querySnapshot = await getDocs(collection(db, collectionName))
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw new Error(error.message)
  }
}

// Query documents
export const queryDocuments = async (collectionName, conditions) => {
  try {
    let q = collection(db, collectionName)
    
    if (conditions.where) {
      q = query(q, where(conditions.where.field, conditions.where.operator, conditions.where.value))
    }
    
    if (conditions.orderBy) {
      q = query(q, orderBy(conditions.orderBy.field, conditions.orderBy.direction || 'asc'))
    }
    
    if (conditions.limit) {
      q = query(q, limit(conditions.limit))
    }
    
    const querySnapshot = await getDocs(q)
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
  } catch (error) {
    throw new Error(error.message)
  }
}

// Update document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(db, collectionName, docId)
    await updateDoc(docRef, {
      ...data,
      updatedAt: new Date()
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Delete document
export const deleteDocument = async (collectionName, docId) => {
  try {
    await deleteDoc(doc(db, collectionName, docId))
  } catch (error) {
    throw new Error(error.message)
  }
}

// Real-time listener
export const onDocumentChange = (collectionName, docId, callback) => {
  try {
    const docRef = doc(db, collectionName, docId)
    return onSnapshot(docRef, (doc) => {
      if (doc.exists()) {
        callback({ id: doc.id, ...doc.data() })
      }
    })
  } catch (error) {
    throw new Error(error.message)
  }
}

// Real-time collection listener
export const onCollectionChange = (collectionName, callback) => {
  try {
    return onSnapshot(collection(db, collectionName), (snapshot) => {
      const docs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }))
      callback(docs)
    })
  } catch (error) {
    throw new Error(error.message)
  }
}
