import { auth } from '@/firebase/config'
import {
  RecaptchaVerifier,
  signInWithPhoneNumber,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInAnonymously,
  onAuthStateChanged,
  signOut,
  sendEmailVerification,
} from 'firebase/auth'
class AuthServices {
  onAuthStateChanged(cb) {
    return onAuthStateChanged(auth, cb)
  }
  async register(email, password) {
    const res = await createUserWithEmailAndPassword(auth, email, password)
    await sendEmailVerification(res.user).then(res => console.log('test')).catch('send verify')
    return res
  }

  loginWithPhoneNumber(phoneNumber) {
    try {
      const verify = new RecaptchaVerifier(
        'recaptcha-container',
        {
          size: 'invisible'
        },
        auth
      )
      return signInWithPhoneNumber(auth, phoneNumber, verify)
    } catch (err) {
      console.error('loginWithPhoneNumber', err)
    }
  }

  loginWithEmail(email, password) {
    return signInWithEmailAndPassword(auth, email, password)
  }

  loginWithAnonymous() {
    return signInAnonymously(auth)
  }

  resetPassword(email) {
    return sendPasswordResetEmail(auth, email)
  }

  async logout() {
    return signOut(auth)
  }
}

export default new AuthServices()
