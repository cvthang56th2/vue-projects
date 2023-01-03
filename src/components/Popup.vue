<script setup>

const props = defineProps({
  modelValue: Boolean,
  hideButtons: Boolean,
  showOnClickOutside: Boolean,
  showOnClickOk: Boolean,
  title: String
})
const emit = defineEmits(['ok', 'update:modelValue'])

const close = () => {
  emit('update:modelValue', false)
}
const onOk = () =>{ 
  emit('ok')
  if (!props.showOnClickOk) {
    close()
  }
}
</script>
<template>
  <div v-if="modelValue" class="fixed bg-[rgba(0,0,0,0.5)] inset-0 flex justify-center items-center z-[2]" @click="!showOnClickOutside && close()">
    <div class="bg-white p-5 rounded-lg shadow-lg flex flex-col w-[80%] max-h-full" @click.stop>
      <div class="flex-1 overflow-y-auto">
        <slot name="title">
          <h2 class="text-xl font-bold mb-5">{{ title }}</h2>
        </slot>
        <slot></slot>
      </div>
      <div v-if="!hideButtons" class="flex justify-end mt-5">
        <button class="font-bold py-1 px-3 rounded-md bg-gray-300 text-white mr-4" @click="close">Cancel</button>
        <button class="font-bold py-1 px-3 rounded-md bg-green-400 text-white" @click="onOk">Ok</button>
      </div>
    </div>
  </div>
</template>
