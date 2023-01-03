import {
  setDoc,
  doc,
  query,
  orderBy,
  collection,
  onSnapshot,
  Timestamp,
  updateDoc,
  deleteDoc
} from 'firebase/firestore'
import { db } from '../config'
import { uid } from 'uid'
import { snapshotToArray } from '../../utils/utils'

const PRODUCT = 'product'
const CATEGORY = 'category'

class productServices {
  async createProduct(data) {
    return new Promise(function(resolve, reject) {
      try {
        const id = data.id || uid(20)
        const today = new Date()
        const ref = doc(db, PRODUCT, id)
        data.id = id
        return resolve(setDoc(ref, {
          updatedAt: Timestamp.fromDate(today),
          createdAt: Timestamp.fromDate(today),
          ...data
        }))
      } catch (err) {
        console.error('error create product', err)
        reject(err)
      }
    });
  }

  async updateProduct(productId, data) {
    return new Promise(function(resolve, reject) {
      try {
        const today = new Date()
        const ref = doc(db, PRODUCT, productId)
        return resolve(updateDoc(ref, {
          updatedAt: Timestamp.fromDate(today),
          ...data
        }))
      } catch (err) {
        console.error('error update product', err)
        reject(err)
      }
    })
  }

  async deleteProduct(productId) {
    return new Promise(function(resolve, reject) {
      try {
        const ref = doc(db, PRODUCT, productId)
        return resolve(deleteDoc(ref))
      } catch (err) {
        console.error('error delete product', err)
        reject(err)
      }
    })
  }

  getProducts(callback) {
    const q = query(collection(db, PRODUCT), orderBy("createdAt"))
    if (typeof this.unsubscribeProducts === 'function') {
      this.unsubscribeProducts()
    }
    this.unsubscribeProducts = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function')  {
        callback(snapshotToArray(querySnapshot))
      }
    });
  }

  async createCategory(data) {
    return new Promise(function(resolve, reject) {
      try {
        const id = data.id || uid(20)
        const today = new Date()
        const ref = doc(db, CATEGORY, id)
        data.id = id
        return resolve(setDoc(ref, {
          updatedAt: Timestamp.fromDate(today),
          createdAt: Timestamp.fromDate(today),
          ...data
        }))
      } catch (err) {
        console.error('error create product', err)
        reject(err)
      }
    })
  }

  async updateCategory(categoryId, data) {
    return new Promise(function(resolve, reject) {
      try {
        const today = new Date()
        const ref = doc(db, CATEGORY, categoryId)
        return resolve(updateDoc(ref, {
          updatedAt: Timestamp.fromDate(today),
          ...data
        }))
      } catch (err) {
        console.error('error update product', err)
        reject(err)
      }
    })
  }

  getCategories(callback) {
    const q = query(collection(db, CATEGORY), orderBy("createdAt"))
    if (typeof this.unsubscribeCategorys === 'function') {
      this.unsubscribeCategorys()
    }
    this.unsubscribeCategorys = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function')  {
        callback(snapshotToArray(querySnapshot))
      }
    });
  }

  async deleteCategory(categoryId) {
    return new Promise(function(resolve, reject) {
      try {
        const ref = doc(db, CATEGORY, categoryId)
        return resolve(deleteDoc(ref))
      } catch (err) {
        console.error('error delete product category', err)
        reject(err)
      }
    })
  }
}

export default new productServices()
