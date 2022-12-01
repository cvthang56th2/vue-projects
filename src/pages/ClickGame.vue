<script setup>
import { ref } from 'vue';

const time = ref(0)
const clicked = ref(0)
let interval
const start = () => {
  clicked.value = 0
  time.value = 10
  clearInterval(interval)
  interval = setInterval(() => {
    time.value--
    if (time.value === 0) {
      clearInterval(interval)
    }
  }, 1000)
}
const onClick = () => {
  if (time.value > 0) {
    clicked.value++
  }
}
const reset = () => {
  clicked.value = 0
  time.value = 0
  clearInterval(interval)
}
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center">
    <div class="text-3xl">Timer: {{time}}</div>
    <div class="text-9xl mt-5">{{clicked}}</div>
    <div class="mt-20">
      <button class="bg-yellow-300 hover:bg-yellow-400 font-semibold py-2 w-[200px] rounded-md" @click="start">Start</button>
    </div>
    <div class="mt-5">
      <button class="bg-blue-300 hover:bg-blue-400 font-semibold py-2 w-[200px] rounded-md" @click="onClick">Click me</button>
    </div>
    <div class="mt-5">
      <button class="bg-purple-300 hover:bg-purple-400 font-semibold py-2 w-[200px] rounded-md" @click="reset">Reset</button>
    </div>
  </div>
</template>