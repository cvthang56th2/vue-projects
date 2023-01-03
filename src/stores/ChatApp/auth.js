import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const currentUser = ref(null)
  const showPopupAuthentication = ref(false)

  return {
    currentUser,
    showPopupAuthentication
  }
})