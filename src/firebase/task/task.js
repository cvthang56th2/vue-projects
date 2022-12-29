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

const TASK = 'task'
const TASK_GROUP = 'task_group'

class taskServices {
  async createTask(data) {
    const id = data.id || uid(20)
    try {
      const today = new Date()
      const ref = doc(db, TASK, id)
      data.id = id
      await setDoc(ref, {
        updatedAt: Timestamp.fromDate(today),
        createdAt: Timestamp.fromDate(today),
        ...data
      })
      return { id }
    } catch (err) {
      console.error('error create task', err)
    }
  }

  async updateTask(taskId, data) {
    try {
      const today = new Date()
      const ref = doc(db, TASK, taskId)
      return updateDoc(ref, {
        updatedAt: Timestamp.fromDate(today),
        ...data
      })
    } catch (err) {
      console.error('error update task', err)
    }
  }

  async deleteTask(taskId) {
    try {
      const ref = doc(db, TASK, taskId)
      return deleteDoc(ref)
    } catch (err) {
      console.error('error delete task', err)
    }
  }

  getTasks(callback) {
    const q = query(collection(db, TASK), orderBy("createdAt"))
    if (typeof this.unsubscribeTasks === 'function') {
      this.unsubscribeTasks()
    }
    this.unsubscribeTasks = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function')  {
        callback(snapshotToArray(querySnapshot))
      }
    });
  }

  async createTaskGroup(data) {
    const id = data.id || uid(20)
    try {
      const today = new Date()
      const ref = doc(db, TASK_GROUP, id)
      data.id = id
      await setDoc(ref, {
        updatedAt: Timestamp.fromDate(today),
        createdAt: Timestamp.fromDate(today),
        ...data
      })
      return { id }
    } catch (err) {
      console.error('error create task', err)
    }
  }

  async updateTaskGroup(taskGroupId, data) {
    try {
      const today = new Date()
      const ref = doc(db, TASK_GROUP, taskGroupId)
      return updateDoc(ref, {
        updatedAt: Timestamp.fromDate(today),
        ...data
      })
    } catch (err) {
      console.error('error update task', err)
    }
  }

  getTaskGroups(callback) {
    const q = query(collection(db, TASK_GROUP), orderBy("createdAt"))
    if (typeof this.unsubscribeTaskGroups === 'function') {
      this.unsubscribeTaskGroups()
    }
    this.unsubscribeTaskGroups = onSnapshot(q, querySnapshot => {
      if (typeof callback === 'function')  {
        callback(snapshotToArray(querySnapshot))
      }
    });
  }
}

export default new taskServices()
