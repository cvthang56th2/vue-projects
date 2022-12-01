<script setup>
import { ref } from 'vue';

const mode = ref('stopwatch')
</script>
<template>
  <div class="h-screen flex flex-col items-center justify-center">
    <div class="flex items-end">
      <button class="" :class="mode === 'stopwatch' ? 'text-3xl' : 'text-xl'" @click="mode = 'stopwatch'">Stopwatch</button>
      <button class=" ml-10" :class="mode === 'timer' ? 'text-3xl' : 'text-xl'" @click="mode = 'timer'">Timer</button>
    </div>
    <div class="my-10">
      <div v-if="mode === 'stopwatch'">
        Watch
      </div>
      <div v-else>
        H M S
      </div>
    </div>
    <div class="flex">
      <button class="rounded-md py-2 w-[150px] border-2">Reset</button>
      <button class="rounded-md py-2 w-[150px] border-2 ml-20">Start</button>
    </div>
  </div>
</template>