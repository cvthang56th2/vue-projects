<script setup>
import { ref } from 'vue';

const inputTag = ref('')
const tags = ref([])
const createNewTag = () => {
  if (inputTag.value) {
    if (!tags.value.includes(inputTag.value)) {
      tags.value.push(inputTag.value)
    }
    inputTag.value = ''
  }
}
const removeTag = tIndex => {
  tags.value.splice(tIndex, 1)
}
const onBlur = () => {
  createNewTag()
}
const onKeydown = e => {
  if (['Enter', 'Tab'].includes(e.key)) {
    createNewTag()
    e.preventDefault();
  }
}
</script>
<template>
  <div class="h-full flex flex-col items-center justify-center">
    <form class="p-10 rounded-md border-4 border-gray-700" @submit.stop @submit.prevent>
      <h1 class="mb-5 text-3xl">Input Tags</h1>
      <div class="mb-5">
        <div
          v-for="(tag, tIndex) in tags" :key="`tag-${tIndex}`"
          class="mr-2 mb-2 rounded-md bg-gray-800 text-white px-4 py-1 inline-flex items-center"
        >
          {{ tag }}
          <span class="ml-2 cursor-pointer" @click="removeTag(tIndex)">&#10005</span>
        </div>
      </div>
      <div>
        <label for="inputTag"></label>
        <input id="inputTag" v-model="inputTag" type="text" class="border-2 w-[500px] p-2 rounded-sm" placeholder="Enter tag..." @blur="onBlur" @keydown="onKeydown">
      </div>
    </form>
  </div>
</template>