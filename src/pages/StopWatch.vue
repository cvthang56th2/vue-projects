<script setup>
import { computed, ref } from 'vue';

const running = ref(false)
const mode = ref('stopwatch')
const stopTime = ref(0)
const stopData = computed(() => {
  const centiseconds = parseInt(stopTime.value / 10)
  const seconds = parseInt(stopTime.value / 100)
  const minutes = parseInt(seconds / 60)
  return {
    centiseconds,
    seconds,
    minutes
  }
})
let interval
const toggleStart = () => {
  running.value = !running.value
  clearInterval(interval)
  if (running.value) {
    interval = setInterval(() => {
      stopTime.value++
    }, 10);
  }
}
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="flex items-end">
      <button class="" :class="mode === 'stopwatch' ? 'text-3xl' : 'text-xl'" @click="mode = 'stopwatch'">Stopwatch</button>
      <button class=" ml-10" :class="mode === 'timer' ? 'text-3xl' : 'text-xl'" @click="mode = 'timer'">Timer</button>
    </div>
    <div class="my-10">
      <div v-if="mode === 'stopwatch'" class="rounded-full text-4xl">
        {{ stopData.minutes || '00' }}:{{ stopData.seconds || '00' }}:{{ stopData.centiseconds || '00' }}
      </div>
      <div v-else>
        H M S
      </div>
    </div>
    <div class="flex">
      <button class="rounded-md py-2 w-[150px] border-2">Reset</button>
      <button class="rounded-md py-2 w-[150px] border-2 ml-20" @click="toggleStart">{{ running ? 'Stop' : 'Start' }}</button>
    </div>
  </div>
</template>