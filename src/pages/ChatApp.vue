<script setup>
import { ref, onMounted, computed } from 'vue'
import Login from '../components/ChatApp/Login.vue';
import { useAuthStore } from '../stores/ChatApp/auth';
import AuthServices from '../firebase/auth/auth'
import UserServices from '../firebase/user/user'
import MessageServices from '../firebase/message/message'

const authStore = useAuthStore()
const isMounted = ref(false)
const contacts = ref([])
const messages = ref([])
const currentContact = ref(null)
const inputMessage = ref('')
const currentGroupId = computed(() => `personal-${[currentContact.value?.uid, authStore.currentUser?.uid].filter(Boolean).sort().join('-')}`)

const formattedMessages = computed(() => messages.value.map(e => ({
  ...e,
  isSender: e.senderUid === authStore.currentUser?.uid
})))

const logout = () => {
  AuthServices.logout()
  authStore.currentUser = null
  currentContact.value = null
  contacts.value = []
  if (typeof UserServices.unsubscribeUsers === 'function') {
    UserServices.unsubscribeUsers()
  }
}
let timeoutScroll
const scrollToBottom = el => {
  if (el) {
    clearTimeout(timeoutScroll)
    timeoutScroll = setTimeout(() => {
      el.scrollTop = el.scrollHeight
    }, 100);
  }
}
const sendMessage = async () => {
  try {
    if (!inputMessage.value || !authStore.currentUser || !currentContact.value) {
      return
    }
    const messageObj = {
      content: inputMessage.value,
      senderUid: authStore.currentUser.uid
    }
    await MessageServices.createMessage(currentGroupId.value, messageObj)
    inputMessage.value = ''
  } catch (error) {
    console.log('error', error)    
  }
}
const changeCurrentContact = async contact => {
  currentContact.value = contact
  messages.value = []
  MessageServices.getGroupMessages(currentGroupId.value, groupMessages => {
    messages.value = groupMessages
    scrollToBottom(document.querySelector('#wrap-messages'))
  })
}
onMounted(() => {
  AuthServices.onAuthStateChanged(async (res) => {
    const { uid } = res || {}
    if (uid) {
      const userInfo = await UserServices.getUserById(uid)
      if (userInfo) {
        authStore.currentUser = userInfo
        UserServices.snapshotUsers(users => {
          contacts.value = users.filter(e => e.uid != authStore.currentUser?.uid)
          if (contacts.value.length && !currentContact.value) {
            changeCurrentContact(contacts.value[0])
          }
        })
      }
    }
    isMounted.value = true
  })
})
</script>
<template>
  <div v-show="isMounted" class="h-full p-5 flex flex-col">
    <h1 class="text-center text-2xl">Chat App</h1>
    <div class="flex flex-1 overflow-y-auto shadow-lg p-2">
      <template v-if="authStore.currentUser">
        <div class="w-1/5 h-full border-r-2 p-2 flex flex-col">
          <div class="flex justify-between border-b-2 border-gray-800 pb-2">
            <div class="flex items-center">
              <div class="w-[40px] h-[40px] relative rounded-full overflow-hidden">
                <img src="https://via.placeholder.com/40" alt="avatar" class="object-cover absolute inset-0 h-full w-full">
              </div>
              <span class="ml-2 font-semibold">{{ authStore.currentUser.userName }}</span>
            </div>
          </div>
          <div class="py-3 flex-1 overflow-auto">
            <h2 class="pb-2 border-b-2 border-blue-500 font-semibold">Contacts</h2>
            <div v-for="(item, iIndex) in contacts" :key="`contact-${iIndex}`" class="flex justify-between border-b-2 py-3 px-1 cursor-pointer hover:bg-gray-100" :class="(currentContact && currentContact.uid === item.uid ? 'bg-blue-50' : '')" @click="changeCurrentContact(item)">
              <div class="flex items-center">
                <div class="w-[25px] h-[25px] relative rounded-full overflow-hidden">
                  <img src="https://via.placeholder.com/40" alt="avatar" class="object-cover absolute inset-0 h-full w-full">
                </div>
                <span class="ml-2 text-sm">{{ item.userName }}</span>
              </div>
            </div>
          </div>
          <div class="pt-2 border-t-2">
            <button class="rounded-md bg-purple-400 px-5 py-2" @click="logout">Logout</button>
          </div>
        </div>
        <div v-if="currentContact" class="w-4/5 p-2 pb-0 flex flex-col">
          <div class="flex-0 flex items-center border-b-2 py-3">
            <div class="w-[40px] h-[40px] relative rounded-full overflow-hidden">
              <img src="https://via.placeholder.com/40" alt="avatar" class="object-cover absolute inset-0 h-full w-full">
            </div>
            <span class="ml-2">{{currentContact.userName}}</span>
          </div>
          <div id="wrap-messages" class="flex-1 overflow-y-auto my-4">
            <div v-for="(message, mIndex) in formattedMessages" :key="`message-${mIndex}`" class="flex mb-2 last:mb-0" :class="message.isSender ? 'flex-row-reverse pl-20' : 'pr-20'">
              <div class="w-1/2 flex items-center" :class="message.isSender ? 'justify-end' : ''">
                <div v-if="!message.isSender" class="w-[25px] h-[25px] relative rounded-full overflow-hidden mr-2">
                  <img src="https://via.placeholder.com/40" alt="avatar" class="object-cover absolute inset-0 h-full w-full">
                </div>
                <div class="p-2 rounded-xl text-white" :class="message.isSender ? 'bg-blue-400' : 'bg-purple-400'">{{ message.content }}</div>
              </div>
            </div>
          </div>
          <form class="flex-0 flex items-center" @submit.stop="sendMessage">
            <input v-model="inputMessage" type="text" placeholder="Enter message..." class="py-2 px-4 w-full border-2">
            <button class="ml-4 bg-gray-300 py-2 px-4 rounded-md" type="submit">Send</button>
          </form>
        </div>
      </template>
      <Login v-else />
    </div>
  </div>
</template>