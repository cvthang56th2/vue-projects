<script setup>
import { ref } from 'vue';

const formData = ref({})
const onSubmit = () => {
  alert(`
    User Name: ${formData.value.userName || ''}
    Password: ${formData.value.password || ''}
  `)
}
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <form class="p-10 rounded-md border-4 border-gray-700" @submit="onSubmit">
      <h1 class="mb-5 text-3xl">Login</h1>
      <div>
        <label for="userName"></label>
        <input id="userName" v-model="formData.userName" type="text" class="border-2 w-[500px] p-2 rounded-sm" placeholder="User Name">
      </div>
      <div class="mt-2">
        <label for="password"></label>
        <input id="password" v-model="formData.password" type="password" class="border-2 w-[500px] p-2 rounded-sm" placeholder="Password">
      </div>
      <div class="text-right mt-5">
        <button class="py-2 px-10 rounded-md bg-blue-400 text-white">Submit</button>
      </div>
    </form>
  </div>
</template>