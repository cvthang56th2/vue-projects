<script setup>
import { ref } from 'vue';
import AuthServices from '../../firebase/auth/auth'

const emit = defineEmits(['loged'])

const registering = ref(false)
const formLogin = ref({
  email: 'cvthang56th2@gmail.com',
  password: '123456'
})
const formRegister = ref({
  userName: 'Thang',
  email: 'cvthang56th2@gmail.com',
  password: '123456',
  rePassword: '123456',
})
const login = async () => {
  try {
    const { email, password } = formLogin.value
    if (!email || !password) {
      alert('Empty input')
      return
    }
    await AuthServices.loginWithEmail(email, password)
    emit('loged')
  } catch (error) {
    alert(error)
  }
}
const register = async () => {
  try {
    const { userName, email, password, rePassword } = formRegister.value
    if (!userName || !email || !password || !rePassword) {
      alert('Empty input')
      return
    }
    if (password !== rePassword) {
      alert('Password and Re-password is not matching.')
      return
    }
    await AuthServices.register(email, password, { userName })
    registering.value = true
    formLogin.value.email = email
    formLogin.value.password = password
  } catch (error) {
    alert(error)
  }
}
</script>
<template>
  <div class="flex justify-center items-center w-full">
    <form
      v-if="registering"
      class="p-10 rounded-md border-4 border-gray-700"
      @submit.prevent="register"
    >
      <h1 class="mb-5 text-3xl">Register</h1>
      <div>
        <label for="reg-userName"></label>
        <input
          id="reg-userName"
          v-model="formRegister.userName"
          type="userName"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="User Name"
        />
      </div>
      <div class="mt-2">
        <label for="reg-email"></label>
        <input
          id="reg-email"
          v-model="formRegister.email"
          type="email"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="Email"
        />
      </div>
      <div class="mt-2">
        <label for="reg-password"></label>
        <input
          id="reg-password"
          v-model="formRegister.password"
          type="password"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="Password"
        />
      </div>
      <div class="mt-2">
        <label for="reg-re-password"></label>
        <input
          id="reg-re-password"
          v-model="formRegister.rePassword"
          type="password"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="Re-Enter Password"
        />
      </div>
      <div class="flex justify-between mt-5">
        <a
          class="py-2 rounded-md text-blue-500 underline cursor-pointer mr-2"
          @click="registering = false"
          >Go to login</a
        >
        <button class="py-2 px-10 rounded-md bg-blue-400 text-white">
          Register
        </button>
      </div>
    </form>
    <form
      v-else
      class="p-10 rounded-md border-4 border-gray-700"
      @submit.prevent="login"
    >
      <h1 class="mb-5 text-3xl">Login</h1>
      <div>
        <label for="email"></label>
        <input
          id="email"
          v-model="formLogin.email"
          type="text"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="Email"
        />
      </div>
      <div class="mt-2">
        <label for="password"></label>
        <input
          id="password"
          v-model="formLogin.password"
          type="password"
          class="border-2 w-[500px] p-2 rounded-sm"
          placeholder="Password"
        />
      </div>
      <div class="flex justify-between mt-5">
        <a
          class="py-2 rounded-md text-blue-500 underline cursor-pointer mr-2"
          @click="registering = true"
          >Go to Register</a
        >
        <button class="py-2 px-10 rounded-md bg-blue-400 text-white">
          Login
        </button>
      </div>
    </form>
  </div>
</template>