import {
  setDoc,
  doc,
  updateDoc,
} from 'firebase/firestore'
import { db } from '../../config'
import { uid } from 'uid'

const MESSAGEHISTORY = 'messageHistory'
const MESSAGE = 'message'

class messageServices {
  async createMessage(groupId, data) {
    if (!groupId) return
    const id = data.id || uid(20)
    try {
      const ref = doc(db, MESSAGEHISTORY, groupId, MESSAGE, id)
      data.id = id
      const result = await setDoc(ref, {
        ...data
      })
      return { id }
    } catch (err) {
      console.error('error create message', err)
    }
  }

  async updateMessage(groupId, messageId, data) {
    if (!groupId) return
    try {
      console.log('db, MESSAGEHISTORY, groupId, MESSAGE, messageId :>> ',  groupId, messageId, data);
      const ref = doc(db, MESSAGEHISTORY, groupId, MESSAGE, messageId)
      return updateDoc(ref, {
        ...data
      })
    } catch (err) {
      console.error('error update message', err)
    }
  }
}

export default new messageServices()
