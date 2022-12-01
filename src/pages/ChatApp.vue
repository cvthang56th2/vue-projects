<script setup>
import { onMounted, ref } from 'vue';

const friends = ref([1, 2, 3, 4, 5])
const registering = ref(false)
const currentChat = ref(0)
const currentUser = ref(null)
const formLogin = ref({})
const formRegister = ref({})
const login = () => {}
const register = () => {}
onMounted(() => {
})
</script>
<template>
  <div class="h-full p-5 flex flex-col">
    <h1 class="text-center text-2xl">Chat App</h1>
    <div class="flex flex-1 overflow-y-auto">
      <template v-if="currentUser">
        <div class="w-1/5 h-full border-r-2 p-5">
          <div class="flex justify-between border-b-2 pb-2">
            <div class="flex items-center">
              <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
              <span class="ml-2 font-semibold">UserName</span>
            </div>
            <button class="rounded-sm bg-gray-200 text-sm px-2">Logout</button>
          </div>
          <div class="py-3">
            <div v-for="(item, iIndex) in friends" :key="`friend-${iIndex}`" class="flex justify-between border-b-2 py-3 cursor-pointer hover:bg-gray-100" @click="currentChat = iIndex">
              <div class="flex items-center">
                <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
                <span class="ml-2">Friend {{ item }}</span>
              </div>
            </div>
          </div>
        </div>
        <div class="w-4/5 p-5 pb-0 flex flex-col">
          <div class="flex-0 flex items-center border-b-2 py-3">
            <img src="https://via.placeholder.com/40" alt="avatar" class="rounded-full">
            <span class="ml-2">Friend {{friends[currentChat]}}</span>
          </div>
          <div class="flex-1 overflow-y-auto my-4">
            <div v-for="(message, mIndex) in [1, 2, 3, 4, 5, 6, 7]" class="flex mb-2 last:mb-0" :class="mIndex % 2 === 0 ? 'pr-20' : 'flex-row-reverse pl-20'">
              <div class="w-1/2 flex items-center">
                <img v-if="mIndex % 2 === 0" src="https://via.placeholder.com/25" alt="avatar" class="rounded-full mr-2">
                <div class="p-2 rounded-xl text-white" :class="mIndex % 2 === 0 ? 'bg-purple-400' : 'bg-blue-400'">Message - Lorem ipsum dolor sit amet consectetur adipisicing elit. Omnis eaque harum quo vel illo expedita perspiciatis quibusdam, sequi beatae odio a repellendus non blanditiis fugiat aliquid sapiente labore laboriosam odit.</div>
              </div>
            </div>
          </div>
          <form class="flex-0 flex items-center" @submit.stop>
            <input type="text" placeholder="Enter message..." class="py-2 px-4 w-full border-2">
            <button class="ml-4 bg-gray-300 py-2 px-4 rounded-md" type="submit">Send</button>
          </form>
        </div>
      </template>
      <div v-else class="flex justify-center items-center w-full">
        <form v-if="registering" class="p-10 rounded-md border-4 border-gray-700" @submit="register">
          <h1 class="mb-5 text-3xl">Register</h1>
          <div>
            <label for="reg-user-name"></label>
            <input id="reg-user-name" v-model="formRegister.userName" type="text" class="border-2 w-[500px] p-2 rounded-sm" placeholder="User Name">
          </div>
          <div class="mt-2">
            <label for="reg-password"></label>
            <input id="reg-password" v-model="formRegister.password" type="password" class="border-2 w-[500px] p-2 rounded-sm" placeholder="Password">
          </div>
          <div class="mt-2">
            <label for="reg-re-password"></label>
            <input id="reg-re-password" v-model="formRegister.rePassword" type="password" class="border-2 w-[500px] p-2 rounded-sm" placeholder="Re-Enter Password">
          </div>
          <div class="flex justify-between mt-5">
            <a class="py-2 rounded-md text-blue-500 underline cursor-pointer mr-2" @click="(registering = false)">Go to login</a>
            <button class="py-2 px-10 rounded-md bg-blue-400 text-white">Register</button>
          </div>
        </form>
        <form v-else class="p-10 rounded-md border-4 border-gray-700" @submit="login">
          <h1 class="mb-5 text-3xl">Login</h1>
          <div>
            <label for="userName"></label>
            <input id="userName" v-model="formLogin.userName" type="text" class="border-2 w-[500px] p-2 rounded-sm" placeholder="User Name">
          </div>
          <div class="mt-2">
            <label for="password"></label>
            <input id="password" v-model="formLogin.password" type="password" class="border-2 w-[500px] p-2 rounded-sm" placeholder="Password">
          </div>
          <div class="flex justify-between mt-5">
            <a class="py-2 rounded-md text-blue-500 underline cursor-pointer mr-2" @click="(registering = true)">Go to Register</a>
            <button class="py-2 px-10 rounded-md bg-blue-400 text-white">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>