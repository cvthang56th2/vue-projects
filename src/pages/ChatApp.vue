<script setup>
import { ref, onMounted } from 'vue'
import Login from '../components/ChatApp/Login.vue';
import { useAuthStore } from '../stores/ChatApp/auth';
import AuthServices from '../firebase/auth/auth'
import UserServices from '../firebase/user/user'

const authStore = useAuthStore()
const isMounted = ref(false)
const logout = () => {
  AuthServices.logout()
  authStore.currentUser = null
}
onMounted(() => {
  AuthServices.onAuthStateChanged(async (res) => {
    const { uid } = res || {}
    if (uid) {
      const userInfo = await UserServices.getUserById(uid)
      if (userInfo) {
        authStore.currentUser = userInfo
      }
    }
    isMounted.value = true
  })
})
</script>
<template>
  <div v-if="isMounted" class="h-full p-5 flex flex-col">
    <h1 class="text-center text-2xl">Chat App</h1>
    <div class="flex flex-1 overflow-y-auto">
      <template v-if="authStore.currentUser">
        <div class="w-1/5 h-full border-r-2 p-5 flex flex-col">
          <div class="flex justify-between border-b-2 pb-2">
            <div class="flex items-center">
              <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
              <span class="ml-2 font-semibold">{{ authStore.currentUser.userName }}</span>
            </div>
          </div>
          <div class="py-3 flex-1 overflow-auto">
            <div v-for="(item, iIndex) in authStore.friends" :key="`friend-${iIndex}`" class="flex justify-between border-b-2 py-3 cursor-pointer hover:bg-gray-100" @click="authStore.currentChat = iIndex">
              <div class="flex items-center">
                <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
                <span class="ml-2">Friend {{ item }}</span>
              </div>
            </div>
          </div>
          <div class="pt-2 border-t-2">
            <button class="rounded-md bg-purple-400 px-5 py-2" @click="logout">Logout</button>
          </div>
        </div>
        <div class="w-4/5 p-5 pb-0 flex flex-col">
          <div class="flex-0 flex items-center border-b-2 py-3">
            <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
            <span class="ml-2">Friend {{authStore.friends[authStore.currentChat]}}</span>
          </div>
          <div class="flex-1 overflow-y-auto my-4">
            <div v-for="(message, mIndex) in [1, 2, 3, 4, 5, 6, 7]" :key="`message-${mIndex}`" class="flex mb-2 last:mb-0" :class="mIndex % 2 === 0 ? 'pr-20' : 'flex-row-reverse pl-20'">
              <div class="w-1/2 flex items-center">
                <img v-if="mIndex % 2 === 0" src="https://via.placeholder.com/25" alt="avatar" class="rounded-full mr-2">
                <div class="p-2 rounded-xl text-white" :class="mIndex % 2 === 0 ? 'bg-purple-400' : 'bg-blue-400'">Message {{message}} - Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eaque harum quo vel illo expedita perspiciatis quibusdam, sequi beatae odio a repellendus non blanditiis fugiat aliquid sapiente labore laboriosam odit.</div>
              </div>
            </div>
          </div>
          <form class="flex-0 flex items-center" @submit.stop>
            <input type="text" placeholder="Enter message..." class="py-2 px-4 w-full border-2">
            <button class="ml-4 bg-gray-300 py-2 px-4 rounded-md" type="submit">Send</button>
          </form>
        </div>
      </template>
      <Login v-else />
    </div>
  </div>
</template>