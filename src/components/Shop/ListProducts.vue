<script setup>
defineProps({
  products: Array
})
</script>

<template>
  <div class="flex flex-wrap -mx-2">
    <div
      v-for="(productObj, pIndex) in products" :key="`product-${pIndex}`"
      class="w-full md:w-1/2 lg:w-1/4 px-2 mb-4"
    >
      <div class="border-2 shadow-lg rounded-lg">
        <div class="w-full pb-[320px] relative overflow-hidden">
          <img :src="productObj.image" :alt="productObj.title" class="absolute inset-0 object-cover h-full w-full">
        </div>
        <div class="px-4">
          <div class="text-lg font-semibold text-center my-2">
            {{ productObj.title }}
          </div>
          <div class="text-md text-center mb-2">
            ${{ productObj.price }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>