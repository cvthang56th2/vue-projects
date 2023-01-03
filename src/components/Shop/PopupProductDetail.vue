<script setup>
import Popup from '../Popup.vue'

const props = defineProps({
  modelValue: Boolean,
  product: Object
})
</script>

<template>
  <Popup :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)" :title="`Product: ${product.name}`" hide-buttons>
    <div class="pb-[300px] relative">
      <img src="https://via.placeholder.com/1000" :alt="product.name" class="w-full h-full object-cover absolute inset-0">
    </div>
    <div class="text-lg">
      Price: <span class="font-semibold">${{ product.price }}</span>
    </div>
    <div class="text-md">
      Category: {{ product.categoryName }}
    </div>
    <div class="whitespace-pre">
      {{ product.description }}
    </div>
  </Popup>
</template>