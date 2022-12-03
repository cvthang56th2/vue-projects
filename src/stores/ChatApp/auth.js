import { defineStore } from 'pinia'
import { onMounted, ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const friends = ref([1, 2, 3, 4, 5])
  const currentChat = ref(0)
  const currentUser = ref(null)
  onMounted(() => {
  })

  return {
    friends,
    currentChat,
    currentUser
  }
})